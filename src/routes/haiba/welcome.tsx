import { imagePreload } from "@/haiba/artwork";
import { createFileRoute } from "@tanstack/react-router";
import Welcome from "@/haiba/screens/Welcome";

export const Route = createFileRoute("/haiba/welcome")({
  head: () => ({ links: [imagePreload("/haiba/birds/07-phone.png")], meta: [{ title: "Haiba · How it works" }, { name: "description", content: "Explore your Haiba membership and first reward." }, { property: "og:title", content: "Haiba · How it works" }, { property: "og:description", content: "Explore your Haiba membership and first reward." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Welcome,
});
