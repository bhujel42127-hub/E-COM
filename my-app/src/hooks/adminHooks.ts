import { useMutation } from "@tanstack/react-query";
import { mutator } from "../services/mutator";
import type { Admin } from "../Props";
import { queryClient } from "../lib/queryClient";
import { queryKey } from "../lib/queryKey";

export function useCreateAdmin() {
  return useMutation({
    mutationFn: (data: Admin) => mutator("POST", "/admins", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey?.user.admin] });
      console.log("AFTER CREATE ADMIN MUTATION FUNCTION SUCCESS!!");
    },
  });
}

export function useUpdateAdmin() {
  return useMutation({
    mutationFn: (data: Admin) => mutator("PUT", `admins/${data._id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey?.user.admin] });
      console.log("AFTER UPDATE ADMIN MUTATION FUNCTION SUCCESS!!");
    },
  });
}
export function useDeleteAdmin() {
  return useMutation({
    mutationFn: (id: string) => mutator("DELETE", `admins/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey?.user.admin] });
      console.log("AFTER DELETE ADMIN MUTATION FUNCTION SUCCESS!!");
    },
  });
}
