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
  }, []);

  useEffect(() => {
    const fetchComplaints = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
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
          upvotedBy: [],
        })),
      );
    };

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

  const toggleUpvote = (complaintId) => {
    if (!user) return; // Must be logged in to upvote

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          const hasUpvoted = c.upvotedBy.includes(user.id);
          return {
            ...c,
            upvotedBy: hasUpvoted
              ? c.upvotedBy.filter((id) => id !== user.id)
              : [...c.upvotedBy, user.id],
          };
        }
        return c;
      }),
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
