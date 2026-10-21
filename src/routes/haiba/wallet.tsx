import { createFileRoute } from "@tanstack/react-router";
import Wallet from "@/haiba/screens/Wallet";

export const Route = createFileRoute("/haiba/wallet")({
  head: () => ({ meta: [{ title: "Haiba · Points wallet" }] }),
  component: Wallet,
});
