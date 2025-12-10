import { useMutation } from "@tanstack/react-query";
import { mutator } from "../services/mutator";
import type { User } from "../Props";
import { queryClient } from "../lib/queryClient";
import { queryKey } from "../lib/queryKey";

export function useCreateUser() {
  return useMutation({
    mutationFn: (data: User) => mutator("POST", "/auth/signup", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.auth.user] });
      console.log("AFTER CERATE USER MUTATION FUNCTION SUCCESS!!");
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data) => mutator("POST", "/auth/login", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });
}

export function useRefresh() {
  return useMutation({
    mutationFn: (data) => mutator("POST", "/auth/refresh", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["token"] });
    },
  });
}
