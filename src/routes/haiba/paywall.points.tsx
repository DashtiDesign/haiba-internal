import { createFileRoute } from "@tanstack/react-router";
import PaywallPoints from "@/haiba/screens/PaywallPoints";

// 11 Nov: smaller Haiba test page. Points only. Same price and reserve flow as the main promo page.
// Open with ?price=20|22|24 (optional &welcome=10000&shop=Wingman&state=Exit%20sheet).
export const Route = createFileRoute("/haiba/paywall/points")({
  head: () => ({ meta: [{ title: "Haiba" }, { name: "robots", content: "noindex" }] }),
  component: PaywallPoints,
});
