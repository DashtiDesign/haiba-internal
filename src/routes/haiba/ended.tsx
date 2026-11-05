import { createFileRoute } from "@tanstack/react-router";
import { Ended } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/ended")({
  head: () => ({ meta: [{ title: "Haiba · Membership ended" }] }),
  component: Ended,
});
