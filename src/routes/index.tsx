import { createFileRoute } from "@tanstack/react-router";
import Home from "@/haiba/screens/Home";

// Stand-in for the Unipal home screen. Testers start here and find Haiba from the nav or the banner.
export const Route = createFileRoute("/")({
  component: Home,
});
