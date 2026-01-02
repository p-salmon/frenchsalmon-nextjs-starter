import { useQuery as useReactQuery } from "@tanstack/react-query";

export function useQuery(key: string | string[]) {
  const keys = Array.isArray(key) ? key : [key];
  return useReactQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await fetch(`/api/${keys.join("/")}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${keys.join("/")}`);
      }
      return response.json();
    },
  });
}
