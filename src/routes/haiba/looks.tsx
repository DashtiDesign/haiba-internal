import { createFileRoute } from "@tanstack/react-router";
import BirdLooks from "@/haiba/screens/BirdLooks";

// 12 Nov: bird looks. Members spend points on looks for the hub bird and pick the one he wears.
export const Route = createFileRoute("/haiba/looks")({
  head: () => ({ meta: [{ title: "Bird looks" }, { name: "robots", content: "noindex" }] }),
  component: BirdLooks,
});
