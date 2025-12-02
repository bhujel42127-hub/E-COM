import { axiosInstance } from "../api/axiosInstance";

export function mutator(method: string, url: string, data?: any) {
  return axiosInstance({
    method,
    url,
    data,
  }).then((res) => res.data);
}
