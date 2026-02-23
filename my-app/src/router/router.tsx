import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import {
  AddProduct,
  AdminViewProduct,
  ContactUs,
  HomeLayout,
  Kids,
  Login,
  Men,
  ProductDetails,
  Root,
  Shop,
  SignUp,
  SuperAdminLayout,
  UserDashboard,
  ViewAdmins,
  ViewCart,
  Women,
} from "./imports";
import { RequireAuth } from "../components/auth/RequireAuth";
import { RequireRole } from "../components/auth/RequireRole";
import SuspenseLoading from "../components/SuspenseLoading";

const Loading = () => <SuspenseLoading />;

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<Loading />}>
        <Root />
      </Suspense>
    ),
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
        element: (
          <RequireAuth>
            <RequireRole allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
              <SuperAdminLayout />
            </RequireRole>
          </RequireAuth>
        ),
        children: [
          {
            path: "admins",
            element: (
              <RequireRole allowedRoles={["SUPER_ADMIN"]}>
                <ViewAdmins />
              </RequireRole>
            ),
          },
          {
            path: "products",
            element: <AdminViewProduct />,
          },
          {
            path: "products/add",
            element: (
              <RequireRole allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
                <AddProduct />
              </RequireRole>
            ),
          },
          {
            path: "products/add/:id",
            element: (
              <RequireRole allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
                <AddProduct />
              </RequireRole>
            ),
          },
        ],
      },
      {
        path: "",
        element: (
          <RequireAuth>
             <UserDashboard />
          </RequireAuth>
        ),
        children: [
          {
            path: "/home",
            element: <HomeLayout />,
          },
          {
            path: "/products/:slug",
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
            element: <ViewCart />,
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
