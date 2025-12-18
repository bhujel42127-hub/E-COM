import { useMutation, useQuery } from "@tanstack/react-query";
import { mutator } from "../services/mutator";
import { queryClient } from "../lib/queryClient";
import { queryKey } from "../lib/queryKey";

export function useAddToCart() {
  return useMutation({
    mutationFn: (productId: string) => mutator("POST", "/cart", {id: productId}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey?.admin.product] });
      console.log("AFTER ADD TO CART MUTATION FUNCTION SUCCESS!!");
    },
  });
}
export function useGetCartItems() {
  return useQuery({
    queryKey: [queryKey?.admin.product],
    queryFn: () => mutator("GET", "/cart"),
  })
}