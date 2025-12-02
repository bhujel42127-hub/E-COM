import { axiosInstance } from "../api/axiosInstance";

export function fetcher(url: string) {
  return axiosInstance(url).then((res) => res.data);
}
// export function fetcher(url: string, params?: Record<string, any>) {
//   return axiosInstance(url, { params }).then((res) => res.data);
// }
