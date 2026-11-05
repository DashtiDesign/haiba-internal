import { createFileRoute } from "@tanstack/react-router";
import { Subscriptions } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/subscriptions")({
  head: () => ({ meta: [{ title: "Haiba · Member offers" }] }),
  component: Subscriptions,
});
