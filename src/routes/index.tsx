import { imagePreload } from "@/haiba/artwork";
import { createFileRoute } from "@tanstack/react-router";
import Home from "@/haiba/screens/Home";

// Stand-in for the Unipal home screen. Testers start here and find Haiba from the nav or the banner.
export const Route = createFileRoute("/")({
  head: () => ({ links: [imagePreload("/haiba/birds/04-peek.png")], meta: [{ title: "Unipal \u00b7 Home" }, { name: "description", content: "Explore Unipal offers and your Haiba membership." }, { property: "og:title", content: "Unipal \u00b7 Home" }, { property: "og:description", content: "Explore Unipal offers and your Haiba membership." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Home,
});
