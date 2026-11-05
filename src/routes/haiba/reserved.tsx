import { createFileRoute } from "@tanstack/react-router";
import Reserved from "@/haiba/journey/screens/Reserved";

export const Route = createFileRoute("/haiba/reserved")({
  head: () => ({ meta: [{ title: "Haiba · Your spot is reserved" }] }),
  component: Reserved,
});
