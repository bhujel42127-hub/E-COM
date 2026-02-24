import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { JSX } from "react";
import SuspenseLoading from "../SuspenseLoading";

type AllowedRole = "SUPER_ADMIN" | "ADMIN" | "USER";

interface RequireRoleProps {
  children: JSX.Element;
  allowedRoles: AllowedRole[];
}

export const RequireRole = ({ children, allowedRoles }: RequireRoleProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <SuspenseLoading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role as AllowedRole)) {
    return <Navigate to="/" replace />; 
  }

  return children;
};
