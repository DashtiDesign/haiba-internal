import { createFileRoute } from "@tanstack/react-router";
import Redeem from "@/haiba/screens/Redeem";

export const Route = createFileRoute("/shop/coffee-bean/redeem")({
  head: () => ({ meta: [{ title: "Haiba · Redeem at Coffee Bean" }, { name: "description", content: "Redeem your Coffee Bean offer and earn Haiba points." }, { property: "og:title", content: "Haiba · Redeem at Coffee Bean" }, { property: "og:description", content: "Redeem your Coffee Bean offer and earn Haiba points." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Redeem,
});
