import { useUser } from "./useGet";
import { getAccessToken } from "../utlis/handleToken"; 

export const useAuth = () => {
  const { data: user, isPending, isError, error } = useUser(); 

  const isAuthenticated = !!user;
  const role = user?.role;

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return {
    user,
    role,
    isAuthenticated,
    loading: isPending,
    isError,
    error,
    logout,
  };
};
