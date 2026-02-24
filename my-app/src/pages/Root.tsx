import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Root = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Only redirect from the top-level root path
  if (location.pathname === "/") {
    if (!user?.role) {
      return <Navigate to="/login" replace />;
    }

    if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") {
       return <Navigate to="/admin" replace />;
    } else {
       return <Navigate to="/home" replace />;
    }
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
