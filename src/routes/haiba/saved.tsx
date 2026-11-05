import { createFileRoute } from "@tanstack/react-router";
import { Saved } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/saved")({
  head: () => ({ meta: [{ title: "Haiba · You saved" }] }),
  component: Saved,
});
