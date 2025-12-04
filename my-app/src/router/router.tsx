import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../components/AdminLayout";
import { ViewAdmins } from "../pages/ViewAdmins";
import { ViewProducts } from "../pages/Products";
import { AdminDashboard } from "../pages/AdminDashboard";
import { PublicLayout } from "../components/PublicLayout";
import { UserDashboard } from "../pages/UserDashboard";
import { UserDashboardLayout } from "../components/UserDashboardLayout";
import { Login, RequireAdmin, Root, SignUp } from "./imports";
import { PublicRoute } from "../components/PublicRoute";

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
        path: "/home",
        element: <UserDashboardLayout />,
        children: [
          {
            path: "landing",
            element: <UserDashboard />,
          },
        ],
      },
    ],
  },
]);
