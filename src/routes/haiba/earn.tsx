import { createFileRoute } from "@tanstack/react-router";
import Earn from "@/haiba/screens/Earn";

// Webview only: this Haiba page replaces the Haiba part of a core Unipal page, so core pages stay unchanged.
export const Route = createFileRoute("/haiba/earn")({
  head: () => ({
    meta: [
      { title: "Haiba · Earn points" },
      { name: "description", content: "Where your next Haiba bonus is waiting." },
    ],
  }),
  component: Earn,
});
