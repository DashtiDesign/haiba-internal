import { createFileRoute } from "@tanstack/react-router";
import { Receipts } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/receipts")({
  head: () => ({ meta: [{ title: "Haiba · Receipts" }] }),
  component: Receipts,
});
