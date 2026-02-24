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
    mutationFn: (itemId: string) => mutator("DELETE", `/cart/${itemId}`),
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
export function useUpdateCartItem() {
  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) => 
      mutator("PUT", `/cart/${itemId}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey?.auth.cart] });
      console.log("AFTER UPDATE CART ITEM MUTATION FUNCTION SUCCESS!!");
    },
  });
}