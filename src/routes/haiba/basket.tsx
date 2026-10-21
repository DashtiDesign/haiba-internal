import { createFileRoute } from "@tanstack/react-router";
import Basket from "@/haiba/screens/Basket";

export const Route = createFileRoute("/haiba/basket")({
  head: () => ({ meta: [{ title: "Haiba · Basket and codes" }, { name: "description", content: "Review your rewards and show your Haiba codes at the shop." }, { property: "og:title", content: "Haiba · Basket and codes" }, { property: "og:description", content: "Review your rewards and show your Haiba codes at the shop." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Basket,
});
