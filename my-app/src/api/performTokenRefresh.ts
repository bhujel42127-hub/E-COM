import { setAccessToken, setRefreshToken } from "../utlis/handleToken";
import { axiosInstance } from "./axiosInstance";

const performTokenRefresh = async (refreshToken: string) => {
  debugger;
  try {
    console.log("Refresh token:", refreshToken);
    const { data } = await axiosInstance.post("/auth/refresh", {
      token: refreshToken,
    });

    if (data?.accessToken) {
      setAccessToken(data?.accessToken);
    }

    if (data?.refreshToken) {
      setRefreshToken(data?.refreshToken);
    }

    console.log("Perform refresh token data:", data);
  } catch (error) {
    console.log("Error refreshing token :", error);
    throw error;
  }
  return Promise.resolve(true);
};

export default performTokenRefresh;
