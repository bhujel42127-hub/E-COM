import { QueryClient } from "@tanstack/react-query";
import { handleError } from "../utlis/handleError";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 5,
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 400) {
          return false;
        }
        return failureCount < 1;
      },
    },
    mutations: {
      onError: (error) => handleError(error),
    },
  },
});
