import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import supabase from "./supabase";
import { useAuth } from "./AuthContext";

const ComplaintsContext = createContext(null);

// ─── Helper: map a DB row → UI complaint object ─────────────────────────────
const mapPost = (row, votedPostIds = new Set()) => ({
  id: row.id,
  title: row.title,
  location: row.location,
  category: row.category,
  description: row.description,
  imageUrl: row.image_url,
  status: row.status || "Pending",
  trackingId: row.tracking_id ? `CB-${row.tracking_id}` : `CB-${String(row.id).slice(0, 8)}`,
  createdAt: row.created_at,
  user_id: row.user_id,
  author: {
    name: row.author_name || "Citizen",
    initials: (() => {
      const n = row.author_name || "C";
      const parts = n.trim().split(/\s+/);
      return parts.length >= 2
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : n.slice(0, 2).toUpperCase();
    })(),
  },
  upvoteCount: row.upvote_count ?? 0,
  hasUpvoted: votedPostIds.has(row.id),
});

// ─── Provider ────────────────────────────────────────────────────────────────
export const ComplaintsProvider = ({ children }) => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votedPostIds, setVotedPostIds] = useState(new Set());

  // ── Fetch all complaints ──────────────────────────────────────────────────
  const fetchComplaints = useCallback(async () => {
    // 1. Fetch posts with vote counts
    //    We use a left join via Supabase's aggregate syntax if available,
    //    otherwise do a separate count query.
    const { data: postsData, error: postsError } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (postsError) {
      console.error("Error fetching posts:", postsError);
      setLoading(false);
      return;
    }

    // 2. Fetch vote counts for all posts
    const postIds = postsData.map((p) => p.id);
    let voteCounts = {};

    if (postIds.length > 0) {
      const { data: votesData, error: votesError } = await supabase
        .from("votes")
        .select("post_id");

      if (!votesError && votesData) {
        votesData.forEach((v) => {
          voteCounts[v.post_id] = (voteCounts[v.post_id] || 0) + 1;
        });
      }
    }

    // 3. Fetch which posts the current user has voted on
    let userVotedIds = new Set();
    if (user) {
      const { data: userVotes } = await supabase
        .from("votes")
        .select("post_id")
        .eq("user_id", user.id);

      if (userVotes) {
        userVotedIds = new Set(userVotes.map((v) => v.post_id));
      }
    }
    setVotedPostIds(userVotedIds);

    // 4. Map to UI format
    const mapped = postsData.map((row) =>
      mapPost(
        { ...row, upvote_count: voteCounts[row.id] || 0 },
        userVotedIds,
      ),
    );

    setComplaints(mapped);
    setLoading(false);
  }, [user]);

  // ── Initial fetch ─────────────────────────────────────────────────────────
  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  // ── Realtime subscription — new/updated/deleted posts ─────────────────────
  useEffect(() => {
    const channel = supabase
      .channel("posts-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newPost = mapPost(
              { ...payload.new, upvote_count: 0 },
              votedPostIds,
            );
            setComplaints((prev) => {
              // Avoid duplicates (we might have already added it locally)
              if (prev.some((c) => c.id === newPost.id)) return prev;
              return [newPost, ...prev];
            });
          } else if (payload.eventType === "UPDATE") {
            setComplaints((prev) =>
              prev.map((c) =>
                c.id === payload.new.id
                  ? mapPost(
                      { ...payload.new, upvote_count: c.upvoteCount },
                      votedPostIds,
                    )
                  : c,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setComplaints((prev) =>
              prev.filter((c) => c.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [votedPostIds]);

  // ── Add a new complaint ───────────────────────────────────────────────────
  const addComplaint = async (complaint) => {
    if (!user) throw new Error("Must be logged in to submit a complaint");

    const trackingId = Math.floor(100000 + Math.random() * 900000);

    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: complaint.title,
        location: complaint.location,
        category: complaint.category,
        description: complaint.description,
        image_url: complaint.imageUrl || null,
        status: "Pending",
        user_id: user.id,
        tracking_id: trackingId,
        author_name: user.name,
      })
      .select();

    if (error) {
      console.error("Insert error:", error);
      throw error;
    }

    // Optimistically add to local state (realtime will also fire but we de-dup)
    const newComplaint = mapPost(
      { ...data[0], upvote_count: 0 },
      votedPostIds,
    );
    setComplaints((prev) => [newComplaint, ...prev]);

    return newComplaint;
  };

  // ── Toggle upvote ─────────────────────────────────────────────────────────
  const toggleUpvote = async (postId) => {
    if (!user) return;

    const hasVoted = votedPostIds.has(postId);

    if (hasVoted) {
      // Remove vote
      const { error } = await supabase
        .from("votes")
        .delete()
        .eq("user_id", user.id)
        .eq("post_id", postId);

      if (error) {
        console.error("Remove vote error:", error);
        return;
      }

      setVotedPostIds((prev) => {
        const next = new Set(prev);
        next.delete(postId);
        return next;
      });
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === postId
            ? { ...c, upvoteCount: Math.max(0, c.upvoteCount - 1), hasUpvoted: false }
            : c,
        ),
      );
    } else {
      // Add vote
      const { error } = await supabase
        .from("votes")
        .insert({ user_id: user.id, post_id: postId });

      if (error) {
        console.error("Add vote error:", error);
        return;
      }

      setVotedPostIds((prev) => new Set(prev).add(postId));
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === postId
            ? { ...c, upvoteCount: c.upvoteCount + 1, hasUpvoted: true }
            : c,
        ),
      );
    }
  };

  return (
    <ComplaintsContext.Provider
      value={{ complaints, loading, addComplaint, toggleUpvote }}
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
