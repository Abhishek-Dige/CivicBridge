import React, { createContext, useContext, useState, useEffect } from "react";
import supabase from "./supabase";

const ComplaintsContext = createContext(null);

export const ComplaintsProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);

  // Notice we aren't enforcing the user exists in context, this is handled in logic
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  const fetchComplaints = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          votes (user_id)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setComplaints(
        data.map((c) => ({
          ...c,
          imageUrl: c.image_url,
          createdAt: c.created_at,
          author: {
            name: "Citizen",
            initials: "C",
          },
          upvotedBy: c.votes?.map(v => v.user_id) || [],
        })),
      );
    };
  useEffect(() => {
    

    fetchComplaints();
  }, []);
  const addComplaint = async (complaint) => {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: complaint.title,
        location: complaint.location,
        category: complaint.category,
        description: complaint.description,
        image_url: complaint.imageUrl,
        status: "Pending",
        user_id: user?.id,
      })
      .select();

    if (error) {
      console.error(error);
      return;
    }

    // 🔥 update UI with real DB data
    const newComplaint = {
  ...data[0],
  imageUrl: data[0].image_url,
  createdAt: data[0].created_at,
  author: {
    name: "Citizen",
    initials: "C",
  },
  upvotedBy: [],
};

setComplaints((prev) => [newComplaint, ...prev]);
  };

const toggleUpvote = (postId) => {
  if (!user) return;

  setComplaints((prev) =>
    prev.map((c) => {
      if (c.id !== postId) return c;

      const hasUpvoted = c.upvotedBy.includes(user.id);

      const updated = {
        ...c,
        upvotedBy: hasUpvoted
          ? c.upvotedBy.filter((id) => id !== user.id)
          : [...c.upvotedBy, user.id],
      };

      // 🔥 async DB (don’t block UI)
      if (hasUpvoted) {
        supabase
          .from("votes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);
      } else {
        supabase
          .from("votes")
          .insert({
            post_id: postId,
            user_id: user.id,
          });
      }

      return updated;
    })
  );
};

  return (
    <ComplaintsContext.Provider
      value={{ complaints, addComplaint, toggleUpvote }}
    >
      {children}
    </ComplaintsContext.Provider>
  );
};

export const useComplaints = () => {
  const ctx = useContext(ComplaintsContext);
  if (!ctx)
    throw new Error("useComplaints must be used inside ComplaintsProvider");
  return ctx;
};
