import { useMutation, useQuery } from "@tanstack/react-query";
import { mutator } from "../services/mutator";
import { queryClient } from "../lib/queryClient";
import { queryKey } from "../lib/queryKey";

export function useAddToCart() {
  return useMutation({
    mutationFn: (cartData: any) => mutator("POST", "/cart", {cartData: cartData}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey?.auth.cart] });
      console.log("AFTER ADD TO CART MUTATION FUNCTION SUCCESS!!");
    },
  });
}
export function useDeleteCartItem() {
  return useMutation({
    mutationFn: (productId: string) => mutator("DELETE", `/cart/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey?.auth.cart] });
      console.log("AFTER DELETE CART ITEM MUTATION FUNCTION SUCCESS!!");
    },
  });
}
export function useGetCartItems() {
  return useQuery({
    queryKey: [queryKey?.auth.cart],
    queryFn: () => mutator("GET", "/cart"),
  })
}