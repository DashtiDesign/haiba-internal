import { createFileRoute } from "@tanstack/react-router";
import Shop from "@/haiba/screens/Shop";

export const Route = createFileRoute("/shop/coffee-bean/")({
  head: () => ({ meta: [{ title: "The Coffee Bean & Tea Leaf" }] }),
  component: Shop,
});
