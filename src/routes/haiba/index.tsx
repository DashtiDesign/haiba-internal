import { createFileRoute } from "@tanstack/react-router";
import Hub from "@/haiba/screens/Hub";
import { Navigate } from "@/haiba/nav";
import { useHaiba } from "@/haiba/store";

export const Route = createFileRoute("/haiba/")({
  head: () => ({ meta: [{ title: "Haiba · Member hub" }, { name: "description", content: "Your Haiba points, rewards, gifts and savings in one place." }, { property: "og:title", content: "Haiba · Member hub" }, { property: "og:description", content: "Your Haiba points, rewards, gifts and savings in one place." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: HaibaTab,
});

/** The Haiba tab: non members see the plans page, members see the hub. */
function HaibaTab() {
  const { ready, state } = useHaiba();
  if (!ready)
    return (
      <div style={{ minHeight: "100vh", maxWidth: 390, margin: "0 auto", background: "#D6C6FF" }} />
    );
  if (state.member === "none") return <Navigate to="/haiba/plans" replace />;
  return <Hub />;
}
