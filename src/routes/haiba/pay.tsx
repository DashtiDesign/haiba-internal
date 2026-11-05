import { createFileRoute } from "@tanstack/react-router";
import { PayRest } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/pay")({
  head: () => ({ meta: [{ title: "Haiba · Pay the rest" }] }),
  component: PayRest,
});
