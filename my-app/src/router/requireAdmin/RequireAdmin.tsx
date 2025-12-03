import { AdminLayout } from "../../components/AdminLayout";
import { NotFound } from "../../components/NotFound";
import SuspenseLoading from "../../components/SuspenseLoading";
import { ADMIN } from "../../constants/useRoles";
import { useUser } from "../../hooks/useGet";

const RequireAdmin = () => {
  const user = useUser();
  console.log("User data: ", user);
  if (user.status === "pending") <SuspenseLoading />;
  else if (user.data?.role === ADMIN) return <AdminLayout />;
  else return <NotFound />;
};

export default RequireAdmin;
