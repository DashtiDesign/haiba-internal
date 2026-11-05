import { createFileRoute } from "@tanstack/react-router";
import { Membership } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/membership")({
  head: () => ({ meta: [{ title: "Haiba · Membership" }] }),
  component: Membership,
});
