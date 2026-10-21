import { createFileRoute } from "@tanstack/react-router";
import Points from "@/haiba/screens/Points";

export const Route = createFileRoute("/haiba/points")({
  head: () => ({ meta: [{ title: "Haiba · How points work" }] }),
  component: Points,
});
