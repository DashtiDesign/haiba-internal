import { createFileRoute } from "@tanstack/react-router";
import Basket from "@/haiba/screens/Basket";

export const Route = createFileRoute("/haiba/basket")({
  head: () => ({ meta: [{ title: "Haiba · Basket and codes" }] }),
  component: Basket,
});
