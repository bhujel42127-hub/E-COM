import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../components/AdminLayout";
import { ViewAdmins } from "../pages/ViewAdmins";
import { ViewProducts } from "../pages/Products";
import { UserDashboard } from "../pages/UserDashboard";
import { UserDashboardLayout } from "../components/UserDashboardLayout";
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
        element: <AdminLayout />,
        children: [
          {
            path: "admins",
            element: <ViewAdmins />,
          },
          {
            path: "products",
            element: <ViewProducts />,
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
        ],
      },
    ],
  },
]);
