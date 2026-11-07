import { createFileRoute } from "@tanstack/react-router";
import { Skeleton, useQuery } from "@/haiba/journey/Skeleton";
import Rewards from "@/haiba/screens/Rewards";

// Webview only: this Haiba page replaces the Haiba part of a core Unipal page, so core pages stay unchanged.
export const Route = createFileRoute("/haiba/rewards")({
  head: () => ({
    meta: [
      { title: "Haiba · Spend points" },
      { name: "description", content: "Free rewards for your Haiba points at Unipal shops." },
    ],
  }),
  component: Page,
});

function Page() {
  const q = useQuery();
  if (q["loading"] != null) return <Skeleton kind="points" />;
  return <Rewards />;
}
