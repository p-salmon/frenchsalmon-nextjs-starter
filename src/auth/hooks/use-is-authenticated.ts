import { useSession } from "../auth-client";

export function useIsAuthenticated() {
  const { data: session } = useSession();
  const isAuthenticated = !!session;
  return { isAuthenticated };
}
