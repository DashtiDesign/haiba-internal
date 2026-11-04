import { createFileRoute } from "@tanstack/react-router";
import PaywallTable from "@/haiba/screens/PaywallTable";

// Paywall 3, Table. Paywall A/B test. Open with ?price=20|22|24 (optional &name=Sara&shop=Wingman&state=Exit%20sheet).
export const Route = createFileRoute("/haiba/paywall/table")({
  head: () => ({ meta: [{ title: "Haiba" }, { name: "robots", content: "noindex" }] }),
  component: PaywallTable,
});
