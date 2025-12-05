import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../services/fetcher";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => fetcher("/auth/getUser"),
  });
}

export function useAdmin() {
  return useQuery({
    queryKey: ["admin"],
    queryFn: () => fetcher("/admins"),
  });
}
