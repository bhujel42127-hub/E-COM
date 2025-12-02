import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { AdminLayout } from "../components/AdminLayout";
import { ViewAdmins } from "../pages/ViewAdmins";
import { ViewProducts } from "../pages/Products";

export const router = createBrowserRouter([
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
]);
