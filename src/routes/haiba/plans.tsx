import { createFileRoute } from "@tanstack/react-router";
import Plans from "@/haiba/screens/Plans";

export const Route = createFileRoute("/haiba/plans")({
  head: () => ({ meta: [{ title: "Haiba · Choose your plan" }, { name: "description", content: "Compare Unipal Free and Haiba membership plans." }, { property: "og:title", content: "Haiba · Choose your plan" }, { property: "og:description", content: "Compare Unipal Free and Haiba membership plans." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Plans,
});
