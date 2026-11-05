import { createFileRoute } from "@tanstack/react-router";
import { HoldExpired } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/expired")({
  head: () => ({ meta: [{ title: "Haiba · Price hold ended" }] }),
  component: HoldExpired,
});
