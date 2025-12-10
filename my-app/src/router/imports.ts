import React from "react";

export const RequireAdmin = React.lazy(
  () => import("./requireAdmin/RequireAdmin")
);

export const Root = React.lazy(() => import("../pages/Root"));

export const SignUp = React.lazy(() => import("../pages/SignUp"));

export const Login = React.lazy(() => import("../pages/Login"));
