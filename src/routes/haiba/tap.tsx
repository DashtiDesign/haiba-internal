import { createFileRoute } from "@tanstack/react-router";
import Tap from "@/haiba/journey/screens/Tap";

export const Route = createFileRoute("/haiba/tap")({
  head: () => ({ meta: [{ title: "Haiba · Payment" }] }),
  component: Tap,
});
