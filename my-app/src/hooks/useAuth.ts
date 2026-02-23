import { useGetUser } from "./useGet";
import { getAccessToken } from "../utlis/handleToken"; // Fixed typo in path 'utlis' -> 'utils' if possible, but keeping existing structure
// Checking path: d:\ECOM\E-COM\my-app\src\utlis\handleToken.ts

export const useAuth = () => {
  const token = getAccessToken();
  const { data: user, isLoading, isError, error } = useGetUser(); // useGetUser no longer needs token

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
    loading: isLoading,
    isError,
    error,
    logout,
  };
};
