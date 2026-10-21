import { createFileRoute } from "@tanstack/react-router";
import Plans from "@/haiba/screens/Plans";

export const Route = createFileRoute("/haiba/plans")({
  head: () => ({ meta: [{ title: "Haiba · Choose your plan" }] }),
  component: Plans,
});
