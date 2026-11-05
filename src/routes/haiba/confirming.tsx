import { createFileRoute } from "@tanstack/react-router";
import Confirming from "@/haiba/journey/screens/Confirming";

export const Route = createFileRoute("/haiba/confirming")({
  head: () => ({ meta: [{ title: "Haiba · Confirming your payment" }] }),
  component: Confirming,
});
