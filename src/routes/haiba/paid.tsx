import { createFileRoute } from "@tanstack/react-router";
import { Paid } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/paid")({
  head: () => ({ meta: [{ title: "Haiba · You are a member" }] }),
  component: Paid,
});
