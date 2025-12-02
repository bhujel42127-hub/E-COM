import { useMutation } from "@tanstack/react-query";
import { mutator } from "../services/mutator";
import type { User } from "../Props";
import { queryClient } from "../lib/queryClient";

export function useCreateUser() {
  return useMutation({
    mutationFn: (data: User) => mutator("POST", "/auth/signup", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }),
        console.log("AFTER MUTATION FUNCTION SUCCESS!!");
    },
  });
}
