import { axiosInstance } from "../api/axiosInstance";

const handleLogout = async () => {
  console.log("Logout button clicked!!");
  try {
    console.log("handle logout try catch");
    await axiosInstance.post("/auth/logout");
    console.log("After logout post");
  } catch (error) {
    console.log("Logout error: ", error);
  }
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
