import { createFileRoute } from "@tanstack/react-router";
import Failed from "@/haiba/journey/screens/Failed";

export const Route = createFileRoute("/haiba/failed")({
  head: () => ({ meta: [{ title: "Haiba · Payment did not go through" }] }),
  component: Failed,
});
