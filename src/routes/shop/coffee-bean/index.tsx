import { createFileRoute } from "@tanstack/react-router";
import Shop from "@/haiba/screens/Shop";

export const Route = createFileRoute("/shop/coffee-bean/")({
  head: () => ({ meta: [{ title: "Haiba · The Coffee Bean & Tea Leaf" }, { name: "description", content: "Browse Coffee Bean offers and Haiba rewards." }, { property: "og:title", content: "Haiba · The Coffee Bean & Tea Leaf" }, { property: "og:description", content: "Browse Coffee Bean offers and Haiba rewards." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Shop,
});
