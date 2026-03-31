import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from './supabase';

const AuthContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // initial session check

  // Helper: extract a normalised user object from Supabase's auth user
  const normaliseUser = (sbUser) => {
    if (!sbUser) return null;
    return {
      id: sbUser.id,
      email: sbUser.email,
      name:
        sbUser.user_metadata?.name ||
        sbUser.user_metadata?.full_name ||
        sbUser.email?.split('@')[0] ||
        'Citizen',
      initials: (() => {
        const n =
          sbUser.user_metadata?.name ||
          sbUser.user_metadata?.full_name ||
          sbUser.email?.split('@')[0] ||
          'C';
        const parts = n.trim().split(/\s+/);
        return parts.length >= 2
          ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
          : n.slice(0, 2).toUpperCase();
      })(),
    };
  };

  // 1️⃣  Rehydrate session on mount
  useEffect(() => {
    const init = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(normaliseUser(session?.user ?? null));
      } catch (err) {
        console.error('Auth init error:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();

    // 2️⃣  Listen for auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(normaliseUser(session?.user ?? null));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Actions ───────────────────────────────────────────────────────────────
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    const u = normaliseUser(data.user);
    setUser(u);
    return u;
  };

  const signup = async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw error;
    const u = normaliseUser(data.user);
    setUser(u);
    return u;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
