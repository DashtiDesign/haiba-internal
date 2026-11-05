import { createFileRoute } from "@tanstack/react-router";
import { Join } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/join")({
  head: () => ({ meta: [{ title: "Haiba · Join Haiba" }] }),
  component: Join,
});
