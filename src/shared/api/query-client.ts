import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30 * 1,
      gcTime: 1000 * 60 * 4,
    }
  }
})