import axios from "axios";
import { getAccessToken, getRefreshToken } from "../utlis/handleToken";
import performTokenRefresh from "./performTokenRefresh";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any = null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();
    debugger;
    // Check if it's a 401 error and we haven't retried yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Perform token refresh
        const refreshed = await performTokenRefresh(refreshToken);

        if (refreshed) {
          const newAccessToken = getAccessToken();
          console.log("Access token refreshed11:", newAccessToken);
          // Update the original request with new token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          console.log("Original request:", originalRequest["Authorization"]);

          // Process queued requests with new token
          processQueue(null, newAccessToken);

          // Return the retried original request
          return axiosInstance(originalRequest);
        } else {
          // Refresh failed
          throw new Error("Token refresh failed");
        }
      } catch (refreshError) {
        console.error("Token refresh error:", refreshError);

        // Process queue with error
        processQueue(refreshError, null);

        // Clear tokens and redirect
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
