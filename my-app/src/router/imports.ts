import React from "react";

// Auth
export const Login = React.lazy(() => import("../pages/Login"));
export const SignUp = React.lazy(() => import("../pages/SignUp"));

// Admin
export const SuperAdminLayout = React.lazy(() =>
  import("../components/AdminLayout").then((module) => ({
    default: module.SuperAdminLayout,
  }))
);
export const ViewAdmins = React.lazy(() =>
  import("../pages/SuperAdmin/ViewAdmins").then((module) => ({
    default: module.ViewAdmins,
  }))
);
export const AdminViewProduct = React.lazy(() =>
  import("../pages/SuperAdmin/SuperAdminViewProduct").then((module) => ({
    default: module.AdminViewProduct,
  }))
);
export const AddProduct = React.lazy(() =>
  import("../pages/SuperAdmin/AddProducts")
);

// User
export const HomeLayout = React.lazy(() =>
  import("../components/UserPageLayout/HomeLayout").then((module) => ({
    default: module.HomeLayout,
  }))
);
export const UserDashboard = React.lazy(() =>
  import("../components/UserDashboard").then((module) => ({
    default: module.UserDashboard,
  }))
);
export const ProductDetails = React.lazy(() =>
  import(
    "../components/UserPageLayout/productDetailsPage/ProductDetailsLayout"
  ).then((module) => ({ default: module.ProductDetails }))
);
export const Men = React.lazy(() =>
  import("../pages/Men").then((module) => ({ default: module.Men }))
);
export const Women = React.lazy(() =>
  import("../pages/Women").then((module) => ({ default: module.Women }))
);
export const Kids = React.lazy(() =>
  import("../pages/Kids").then((module) => ({ default: module.Kids }))
);
export const Shop = React.lazy(() =>
  import("../pages/Shop").then((module) => ({ default: module.Shop }))
);
export const ContactUs = React.lazy(() =>
  import("../pages/ContactUs").then((module) => ({
    default: module.ContactUs,
  }))
);
export const ViewCart = React.lazy(() =>
  import("../components/UserPageLayout/addToCart/ViewCart").then((module) => ({
    default: module.ViewCart,
  }))
);
export const Root = React.lazy(() => import("../pages/Root"));
// export const RequireAdmin = React.lazy(
//   () => import("./requireAdmin/RequireAdmin")
// );
