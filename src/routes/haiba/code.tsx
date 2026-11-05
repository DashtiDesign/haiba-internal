import { createFileRoute } from "@tanstack/react-router";
import { Code } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/code")({
  head: () => ({ meta: [{ title: "Haiba · Your code" }] }),
  component: Code,
});
