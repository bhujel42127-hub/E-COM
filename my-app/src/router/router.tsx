import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../components/AdminLayout";
import { ViewAdmins } from "../pages/ViewAdmins";
import { ViewProducts } from "../pages/Products";
import { UserDashboard } from "../pages/UserDashboard";
import { UserDashboardLayout } from "../components/UserDashboardLayout";
import { Login, Root, SignUp } from "./imports";
import { Men } from "../pages/Men";
import { Women } from "../pages/Women";
import { Kids } from "../pages/Kids";
import { Shop } from "../pages/Shop";
import { ContactUs } from "../pages/ContactUs";

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
