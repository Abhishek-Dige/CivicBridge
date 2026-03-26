import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import supabase from "../context/supabase";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, []);

  // ⏳ wait for user check
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // ❌ not logged in → go to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ logged in → allow access
  return children;
};

export default ProtectedRoute;