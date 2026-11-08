import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import Home from "@/haiba/screens/Home";

// The real app always passes these when it opens Haiba. The stand in home adds them for testers.
const APP_DEFAULTS = { user_id: 100245, lang: "en", country: "bahrain" };

// The home banner starts loading with the page, in the size this screen needs (AVIF, 16 to 53 KB).
const bannerPreload = (r: "bh" | "sa") => ({
  rel: "preload",
  as: "image",
  type: "image/avif",
  imageSrcSet: [640, 960, 1290].map((w) => `/haiba/banners/home-${r}-${w}.avif ${w}w`).join(", "),
  imageSizes: "100vw",
  fetchPriority: "high" as const,
});

// Stand-in for the Unipal home screen. Testers start here and find Haiba from the nav or the banner.
export const Route = createFileRoute("/")({
  head: ({ match }) => ({
    links: [
      bannerPreload(
        (match.search as Record<string, unknown>)?.["country"] === "saudi" ? "sa" : "bh",
      ),
    ],
    meta: [
      { title: "Unipal \u00b7 Home" },
      { name: "description", content: "Explore Unipal offers and your Haiba membership." },
      { property: "og:title", content: "Unipal \u00b7 Home" },
      { property: "og:description", content: "Explore Unipal offers and your Haiba membership." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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
