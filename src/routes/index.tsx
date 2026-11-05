import { imagePreload } from "@/haiba/artwork";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import Home from "@/haiba/screens/Home";

// The real app always passes these when it opens Haiba. The stand in home adds them for testers.
const APP_DEFAULTS = { user_id: 100245, lang: "en", country: "bahrain" };

// Stand-in for the Unipal home screen. Testers start here and find Haiba from the nav or the banner.
export const Route = createFileRoute("/")({
  head: () => ({ links: [imagePreload("/haiba/birds/04-peek.png")], meta: [{ title: "Unipal \u00b7 Home" }, { name: "description", content: "Explore Unipal offers and your Haiba membership." }, { property: "og:title", content: "Unipal \u00b7 Home" }, { property: "og:description", content: "Explore Unipal offers and your Haiba membership." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: AppHome,
});

function AppHome() {
  const search = Route.useSearch() as Record<string, unknown>;
  const navigate = useNavigate();
  const missing = !("user_id" in search) && !("lang" in search) && !("country" in search);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (missing) navigate({ to: "/", search: APP_DEFAULTS as any, replace: true });
  }, [missing, navigate]);
  return <Home />;
}
