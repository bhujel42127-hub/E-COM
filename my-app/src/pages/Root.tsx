import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getAccessToken } from "../utlis/handleToken";

const Root = () => {
  // const accessToken = getAccessToken();
  // if (!accessToken) {
  //   return <Navigate to="/login" replace />;
  // }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
