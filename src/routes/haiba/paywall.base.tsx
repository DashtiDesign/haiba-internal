import { createFileRoute } from "@tanstack/react-router";
import PaywallBase from "@/haiba/screens/PaywallBase";

// Paywall 1, Baseline. Paywall A/B test. Open with ?price=20|22|24 (optional &name=Sara&shop=Wingman&state=Exit%20sheet).
export const Route = createFileRoute("/haiba/paywall/base")({
  head: () => ({ meta: [{ title: "Haiba" }, { name: "robots", content: "noindex" }] }),
  component: PaywallBase,
});
