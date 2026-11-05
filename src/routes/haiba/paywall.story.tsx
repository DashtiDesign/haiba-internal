import { createFileRoute } from "@tanstack/react-router";
import PaywallStory from "@/haiba/screens/PaywallStory";

// Paywall 2, Story. Paywall A/B test. Open with ?price=20|22|24 (optional &name=Yusuf&shop=Wingman&state=Exit%20sheet).
export const Route = createFileRoute("/haiba/paywall/story")({
  head: () => ({ meta: [{ title: "Haiba" }, { name: "robots", content: "noindex" }] }),
  component: PaywallStory,
});
