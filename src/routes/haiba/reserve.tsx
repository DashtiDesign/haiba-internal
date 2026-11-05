import { createFileRoute } from "@tanstack/react-router";
import Reserve from "@/haiba/journey/screens/Reserve";

export const Route = createFileRoute("/haiba/reserve")({
  head: () => ({ meta: [{ title: "Haiba · Reserve your spot" }] }),
  component: Reserve,
});
