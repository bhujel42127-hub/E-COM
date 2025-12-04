import { Navigate } from "react-router-dom";
import type { PublicRouteProp } from "../Props";

export const PublicRoute = ({ children }: PublicRouteProp) => {
  //   console.log("reached");    

  const isLogged = localStorage.getItem("accessToken");
  

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
