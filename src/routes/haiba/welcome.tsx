import { createFileRoute } from "@tanstack/react-router";
import Welcome from "@/haiba/screens/Welcome";

export const Route = createFileRoute("/haiba/welcome")({
  head: () => ({ meta: [{ title: "Haiba · How it works" }] }),
  component: Welcome,
});
