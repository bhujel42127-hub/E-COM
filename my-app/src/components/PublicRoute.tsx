import { Navigate } from "react-router-dom";

export const PublicRoute = () => {
  //   console.log("reached");

  const isLogged = localStorage.getItem("accessToken");

  if (isLogged) {
    return <Navigate to="/mm" replace />;
  }
};
