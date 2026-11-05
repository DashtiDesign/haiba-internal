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
  // A path can carry its own query, for example go("/haiba/tap?for=deposit").
  // lang, country and user_id stay in the URL on their own (see the root route).
  return (to: string) => {
    const [path, query] = to.split("?");
    const search: Record<string, string> = {};
    if (query) new URLSearchParams(query).forEach((v, k) => (search[k] = v));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to: path as any, search: search as any });
  };
}
