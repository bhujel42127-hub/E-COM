import { useMutation } from "@tanstack/react-query";
import type { Product } from "../Props";
import { mutator } from "../services/mutator";
import { queryClient } from "../lib/queryClient";
import { queryKey } from "../lib/queryKey";

export function useCreateProduct() {
  return useMutation({
    mutationFn: (data: Product) => mutator("POST", "/products", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey?.admin.product] });
      console.log("AFTER CREATE ADMIN MUTATION FUNCTION SUCCESS!!");
    },
  });
}
export function useUpdateProduct() {
  return useMutation({
    mutationFn: ({ data, id }: { data: Product; id: string }) =>
      mutator("PUT", `products/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey?.admin.product] });
      console.log("AFTER UPDATE PRODUCT MUTATION FUNCTION SUCCESS!!");
    },
  });
}
export function useDeleteProduct() {
  return useMutation({
    mutationFn: (id: string) => mutator("DELETE", `products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey?.admin.product] });
      console.log("AFTER DELETE PRODUCT MUTATION FUNCTION SUCCESS!!");
    },
  });
}
