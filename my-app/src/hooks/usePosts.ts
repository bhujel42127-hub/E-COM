import { useMutation } from "@tanstack/react-query";
import { mutator } from "../services/mutator";
import type { Product, User } from "../Props";
import { queryClient } from "../lib/queryClient";

export function useCreateUser() {
  return useMutation({
    mutationFn: (data: User) => mutator("POST", "/auth/signup", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      console.log("AFTER CERATE USER MUTATION FUNCTION SUCCESS!!");
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data) => mutator("POST", "/auth/login", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
