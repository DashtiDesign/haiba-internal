import { createFileRoute } from "@tanstack/react-router";
import PaywallPointsGifts from "@/haiba/screens/PaywallPointsGifts";

// 11 Nov: smaller Haiba test page. Points and a gift every month. Same price and reserve flow as the main promo page.
// Open with ?price=20|22|24 (optional &welcome=10000&shop=Wingman&state=Exit%20sheet).
export const Route = createFileRoute("/haiba/paywall/points-gifts")({
  head: () => ({ meta: [{ title: "Haiba" }, { name: "robots", content: "noindex" }] }),
  component: PaywallPointsGifts,
});
