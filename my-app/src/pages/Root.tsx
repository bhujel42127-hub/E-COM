import { Outlet } from "react-router-dom";

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
