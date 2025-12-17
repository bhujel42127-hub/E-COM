import { createBrowserRouter } from "react-router-dom";
import { SuperAdminLayout } from "../components/SuperAdminLayout";
import { ViewAdmins } from "../pages/SuperAdmin/ViewAdmins";
import { HomeLayout } from "../components/UserPageLayout/HomeLayout";
import { Login, Root, SignUp } from "./imports";
import { AdminViewProduct } from "../pages/SuperAdmin/SuperAdminViewProduct";
import { Men } from "../pages/Men";
import { Women } from "../pages/Women";
import { Kids } from "../pages/Kids";
import { Shop } from "../pages/Shop";
import { ContactUs } from "../pages/ContactUs";
import { ProductDetails } from "../components/UserPageLayout/productDetailsPage/ProductDetailsLayout";
import AddProduct from "../pages/SuperAdmin/AddProducts";
import { Cart } from "../components/UserPageLayout/addToCart/Cart";
import { UserDashboard } from "../components/UserDashboard";

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
          // {
          //   path: "products/add/:id?",
          //   element: <AddProduct />,
          // },
          {
            path: "products/add",
            element: <AddProduct />,
          },
          {
            path: "products/add/:id",
            element: <AddProduct />,
          },
        ],
      },
      {
        path: "",
        element: <UserDashboard />,
        children: [
          {
            path: "/home",
            element: <HomeLayout />,
          },
          {
            path: "/productDetails/:slug",
            element: <ProductDetails />,
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
            path: "/myCart",
            element: <Cart />
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
