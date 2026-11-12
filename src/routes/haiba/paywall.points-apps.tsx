import { createFileRoute } from "@tanstack/react-router";
import PaywallPointsApps from "@/haiba/screens/PaywallPointsApps";

// 11 Nov: smaller Haiba test page. Points and 2 apps. Same price and reserve flow as the main promo page.
// Open with ?price=20|22|24 (optional &welcome=10000&shop=Wingman&state=Exit%20sheet).
export const Route = createFileRoute("/haiba/paywall/points-apps")({
  head: () => ({ meta: [{ title: "Haiba" }, { name: "robots", content: "noindex" }] }),
  component: PaywallPointsApps,
});
