// import { Navigate } from "react-router-dom";
// import { useUser } from "../../hooks/useGet";
// import { ADMIN } from "../../constants/useRoles";
// import { AdminLayout } from "../../components/AdminLayout";
// import { NotFound } from "../../components/NotFound";
// import SuspenseLoading from "../../components/SuspenseLoading";

// /**
//  * Legacy guard — kept for compatibility.
//  * For the main routing, AdminGuard is now used instead.
//  * Renders AdminLayout only for ADMIN role.
//  */
// const RequireAdmin = () => {
//   const { data, isPending } = useUser();

//   if (isPending) return <SuspenseLoading />;
//   if (data?.role === ADMIN) return <AdminLayout />;
//   return <NotFound />;
// };

// export default RequireAdmin;
