import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../services/fetcher";
import { queryKey } from "../lib/queryKey";

export function useGetUser() {
  return useQuery({
    queryKey: [queryKey?.auth.user],
    queryFn: () => fetcher("/auth/getUser"),
  });
}

export function useGetAdmin() {
  return useQuery({
    queryKey: [queryKey?.auth.admin],
    queryFn: () => fetcher("/admins"),
    staleTime: 0,
    refetchOnMount: "always",
  });
}

export function useGetAllProduct() {
  return useQuery({
    queryKey: [queryKey?.admin.product],
    queryFn: () => fetcher("/products"),
    staleTime: 0,
    refetchOnMount: "always",
  });
}
export function useGetProduct(id: string) {
  return useQuery({
    queryKey: [queryKey?.admin.product],
    queryFn: () => fetcher(`products/${id}`),
    staleTime: 0,
    refetchOnMount: "always",
  });
}
