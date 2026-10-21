import { createFileRoute } from "@tanstack/react-router";
import Points from "@/haiba/screens/Points";

export const Route = createFileRoute("/haiba/points")({
  head: () => ({ meta: [{ title: "Haiba · How points work" }, { name: "description", content: "See how Haiba points are earned and used for rewards." }, { property: "og:title", content: "Haiba · How points work" }, { property: "og:description", content: "See how Haiba points are earned and used for rewards." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Points,
});
