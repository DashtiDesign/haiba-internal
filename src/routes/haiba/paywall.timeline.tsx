import { createFileRoute } from "@tanstack/react-router";
import PaywallTimeline from "@/haiba/screens/PaywallTimeline";

// Paywall 4, Timeline. Paywall A/B test. Open with ?price=20|22|24 (optional &name=Yusuf&shop=Wingman&state=Exit%20sheet).
export const Route = createFileRoute("/haiba/paywall/timeline")({
  head: () => ({ meta: [{ title: "Haiba" }, { name: "robots", content: "noindex" }] }),
  component: PaywallTimeline,
});
