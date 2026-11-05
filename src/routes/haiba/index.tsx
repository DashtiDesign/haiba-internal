import { createFileRoute } from "@tanstack/react-router";
import Hub from "@/haiba/screens/Hub";
import { Navigate } from "@/haiba/nav";
import { useSession } from "@/haiba/journey/session";
import { pathFor } from "@/haiba/journey/actions";
import { Screen } from "@/haiba/journey/ui";

export const Route = createFileRoute("/haiba/")({
  head: () => ({ meta: [{ title: "Haiba · Member hub" }, { name: "description", content: "Your Haiba points, rewards, gifts and savings in one place." }, { property: "og:title", content: "Haiba · Member hub" }, { property: "og:description", content: "Your Haiba points, rewards, gifts and savings in one place." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: HaibaTab,
});

/** The Haiba tab: every student lands on the screen for their state. Members see the hub. */
function HaibaTab() {
  const s = useSession();
  if (!s.hb.ready || !s.valid) return <Screen>{null}</Screen>; // loading, or the safe error page
  const to = pathFor(s.journey.status);
  if (to !== "/haiba") return <Navigate to={to} replace />;
  return <Hub />;
}
