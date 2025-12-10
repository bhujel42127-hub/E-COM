import { createBrowserRouter } from "react-router-dom";
import { SuperAdminLayout } from "../components/SuperAdminLayout";
import { ViewAdmins } from "../pages/SuperAdmin/ViewAdmins";
import { UserDashboard } from "../pages/UserDashboard";
import { UserDashboardLayout } from "../components/UserPageLayout/UserDashboardLayout";
import { Login, Root, SignUp } from "./imports";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/admin",
        element: <SuperAdminLayout />,
        children: [
          {
            path: "admins",
            element: <ViewAdmins />,
          },
          {
            path: "products",
            element: <AdminViewProduct />,
          },
        ],
      },
      {
        path: "",
        element: <UserDashboard />,
        children: [
          {
            path: "/home",
            element: <UserDashboardLayout />,
          },
          {
            path: "/men",
            element: <Men />,
          },
          {
            path: "/women",
            element: <Women />,
          },

          {
            path: "/kids",
            element: <Kids />,
          },

          {
            path: "/shop",
            element: <Shop />,
          },

          {
            path: "/contactUs",
            element: <ContactUs />,
          },
        ],
      },
    ],
  },
]);
