import { createBrowserRouter } from "react-router-dom";
import { SuperAdminLayout } from "../components/SuperAdminLayout";
import { ViewAdmins } from "../pages/SuperAdmin/ViewAdmins";
import { UserDashboard } from "../pages/UserDashboard";
import { UserDashboardLayout } from "../components/UserPageLayout/UserDashboardLayout";
import { Login, Root, SignUp } from "./imports";
import { AdminViewProduct } from "../pages/SuperAdmin/SuperAdminViewProduct";
import { ProductDetails } from "../components/UserPageLayout/ProductDetails";

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
            path: "/productDetails",
            element: <ProductDetails />,
          },
        ],
      },
    ],
  },
]);
