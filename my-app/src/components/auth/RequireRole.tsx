import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { UserRole } from "../../../backend/src/models/user.model"; // Adjust import path if shared types exist
import type { JSX } from "react";

// Or define locally if backend types aren't sharable directly
type AllowedRole = "SUPER_ADMIN" | "ADMIN" | "USER";

interface RequireRoleProps {
  children: JSX.Element;
  allowedRoles: AllowedRole[];
}

export const RequireRole = ({ children, allowedRoles }: RequireRoleProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role as AllowedRole)) {
    return <Navigate to="/" replace />; // Redirect to home or unauthorized page
  }

  return children;
};
