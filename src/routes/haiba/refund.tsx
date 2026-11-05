import { createFileRoute } from "@tanstack/react-router";
import Refund from "@/haiba/journey/screens/Refund";

export const Route = createFileRoute("/haiba/refund")({
  head: () => ({ meta: [{ title: "Haiba · Refund" }] }),
  component: Refund,
});
