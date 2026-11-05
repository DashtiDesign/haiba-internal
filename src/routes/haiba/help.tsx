import { createFileRoute } from "@tanstack/react-router";
import { Help } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/help")({
  head: () => ({ meta: [{ title: "Haiba · Help" }] }),
  component: Help,
});
