import axios from "axios";
import { setAccessToken, setRefreshToken } from "../utlis/handleToken";

const performTokenRefresh = async (refreshToken: string) => {
  const { data } = await axios.post("http://localhost:3000/auth/refresh", {
    refreshToken: refreshToken,
  });
  if (data?.refreshToken) {
    setRefreshToken(data?.refreshToken);
  }
  if (data?.accessToken) {
    setAccessToken(data?.accessToken);
  }
  return Promise.resolve(true);
};

export default performTokenRefresh;
