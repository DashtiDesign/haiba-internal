import { createFileRoute } from "@tanstack/react-router";
import Redeem from "@/haiba/screens/Redeem";

export const Route = createFileRoute("/shop/coffee-bean/redeem")({
  head: () => ({ meta: [{ title: "Redeem · The Coffee Bean & Tea Leaf" }] }),
  component: Redeem,
});
