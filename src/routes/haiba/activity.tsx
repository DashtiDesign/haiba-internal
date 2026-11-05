import { createFileRoute } from "@tanstack/react-router";
import { ActivityPage } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/activity")({
  head: () => ({ meta: [{ title: "Haiba · Activity" }] }),
  component: ActivityPage,
});
