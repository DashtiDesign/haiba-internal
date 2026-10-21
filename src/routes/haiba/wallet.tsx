import { createFileRoute } from "@tanstack/react-router";
import Wallet from "@/haiba/screens/Wallet";

export const Route = createFileRoute("/haiba/wallet")({
  head: () => ({ meta: [{ title: "Haiba · Points wallet" }, { name: "description", content: "View your available Haiba points and reward activity." }, { property: "og:title", content: "Haiba · Points wallet" }, { property: "og:description", content: "View your available Haiba points and reward activity." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Wallet,
});
