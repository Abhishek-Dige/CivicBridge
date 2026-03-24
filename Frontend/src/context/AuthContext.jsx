import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// ─── Mock credential store ────────────────────────────────────────────────────
// Demo account that always works. Additional accounts created via sign-up are
// persisted in localStorage under "cb_users".
const DEMO_USER = {
  id: 'demo-001',
  name: 'Demo User',
  email: 'demo@civicbridge.in',
  password: 'demo1234',
};

const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem('cb_users') || '[]');
  } catch {
    return [];
  }
};

// ─── Auth service helpers (swap these for real fetch() calls later) ────────────
// To connect to a backend, replace the bodies of mockLogin / mockSignup with:
//   const res = await fetch('/api/auth/login', { method:'POST', body: JSON.stringify({email,password}) });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message);
//   return data.user;

const mockLogin = async (email, password) => {
  await new Promise((r) => setTimeout(r, 600)); // simulate network

  if (
    email === DEMO_USER.email &&
    password === DEMO_USER.password
  ) {
    const { password: _, ...safeUser } = DEMO_USER;
    return safeUser;
  }

  const users = getStoredUsers();
  const match = users.find((u) => u.email === email && u.password === password);
  if (match) {
    const { password: _, ...safeUser } = match;
    return safeUser;
  }

  throw new Error('Invalid email or password.');
};

const mockSignup = async (name, email, password) => {
  await new Promise((r) => setTimeout(r, 600)); // simulate network

  if (email === DEMO_USER.email) {
    throw new Error('An account with this email already exists.');
  }

  const users = getStoredUsers();
  if (users.find((u) => u.email === email)) {
    throw new Error('An account with this email already exists.');
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    password, // In real backend this would be hashed server-side
  };
  localStorage.setItem('cb_users', JSON.stringify([...users, newUser]));

  const { password: _, ...safeUser } = newUser;
  return safeUser;
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // initial session check

  // Rehydrate session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cb_session');
      if (stored) setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem('cb_session');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const loggedInUser = await mockLogin(email, password);
    localStorage.setItem('cb_session', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return loggedInUser;
  };

  const signup = async (name, email, password) => {
    const newUser = await mockSignup(name, email, password);
    localStorage.setItem('cb_session', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('cb_session');
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
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
