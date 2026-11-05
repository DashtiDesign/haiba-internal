import { createFileRoute } from "@tanstack/react-router";
import { Subscription } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/subscription")({
  head: () => ({ meta: [{ title: "Haiba · Member offer" }] }),
  component: Subscription,
});
