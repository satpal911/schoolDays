import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRole }) {
  const { token, role, loading } = useAuth();

  if (loading) {
    return <div className="spinner-loading">Loading session...</div>;
  }

  if (!token) {
    return <Navigate to={allowedRole ? `/${allowedRole}/login` : "/"} replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role ? `/${role}/dashboard` : `/${allowedRole}/login`} replace />;
  }

  return children || <Outlet />;
}