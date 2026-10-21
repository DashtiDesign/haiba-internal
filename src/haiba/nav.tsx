import {
  Link as RouterLink,
  Navigate as RouterNavigate,
  useNavigate as useRouterNavigate,
} from "@tanstack/react-router";

/**
 * Small wrapper over TanStack Router so the Haiba screens can link with a plain path,
 * for example <Link to="/haiba/wallet"> or go("/shop/coffee-bean").
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Link = RouterLink as any;
export const Navigate = RouterNavigate;

export function useNavigate() {
  const navigate = useRouterNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (to: string) => navigate({ to: to as any });
}
