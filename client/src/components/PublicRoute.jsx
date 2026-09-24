import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { token, role, loading } = useAuth();

  if (loading) {
    return <div className="spinner-loading">Loading...</div>;
  }

  if (token && role) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return children || <Outlet />;
}