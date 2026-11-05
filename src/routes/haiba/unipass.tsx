import { createFileRoute } from "@tanstack/react-router";
import { Unipass } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/unipass")({
  head: () => ({ meta: [{ title: "Haiba · Unipass gift" }] }),
  component: Unipass,
});
