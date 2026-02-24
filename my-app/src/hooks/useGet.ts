import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../services/fetcher";
import { queryKey } from "../lib/queryKey";
import { getAccessToken } from "../utlis/handleToken";

export function useUser() {
  const token = getAccessToken();
  return useQuery({
    queryKey: [queryKey.auth.user, token],
    queryFn: () => fetcher(`/auth/${token}`),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, 
    retry: false,
  });
}

export function useGetUser(token: string) {
  return useQuery({
    queryKey: [queryKey?.auth.user],
    queryFn: () => fetcher(`/auth/${token}`),
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
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: "always",
  });
}
export function useGetProductBySlug(slug: string) {
  return useQuery({
    queryKey: [queryKey?.admin.product],
    queryFn: () => fetcher(`products/slug/${slug}`),
    enabled: !!slug,
    staleTime: 0,
    refetchOnMount: "always",
  });
}
