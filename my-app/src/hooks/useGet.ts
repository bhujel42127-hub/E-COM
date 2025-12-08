import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../services/fetcher";
import { queryKey } from "../lib/queryKey";

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => fetcher("/auth/getUser"),
  });
}

export function useGetAdmin() {
  return useQuery({
    queryKey: [queryKey?.user.admin],
    queryFn: () => fetcher("/admins"),
  });
}
export function useGetProduct() {
  return useQuery({
    queryKey: [queryKey?.admin.product],
    queryFn: () => fetcher("/products"),
  });
}
