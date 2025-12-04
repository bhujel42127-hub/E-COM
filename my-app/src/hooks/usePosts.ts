import { useMutation } from "@tanstack/react-query";
import { mutator } from "../services/mutator";
import type { Admin, User } from "../Props";
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
export function useCreateAdmin() {
  return useMutation({
    mutationFn: (data: Admin) => mutator("POST", "/admin/createAdmin", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      console.log("AFTER CREATE ADMIN MUTATION FUNCTION SUCCESS!!");
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
export function useUpdateAdmin() {
  return useMutation({
    mutationFn: (data: Admin) =>
      mutator("PUT", `admin/updateAdmin/${data._id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      console.log("AFTER UPDATE ADMIN MUTATION FUNCTION SUCCESS!!");
    },
  });
}
export function useDeleteAdmin() {
  return useMutation({
    mutationFn: (data: string) =>
      mutator("DELETE", `admin/deleteAdmin/${data}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      console.log("AFTER DELETE ADMIN MUTATION FUNCTION SUCCESS!!");
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
