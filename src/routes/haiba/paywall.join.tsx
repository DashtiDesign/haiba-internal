import { createFileRoute } from "@tanstack/react-router";
import PlansConvert from "@/haiba/screens/PlansConvert";

// Join Haiba, optimised copy. Paywall A/B test. Open with ?price=20|22|24 (optional &name=Sara&shop=Wingman&state=Exit%20sheet).
export const Route = createFileRoute("/haiba/paywall/join")({
  head: () => ({ meta: [{ title: "Haiba" }, { name: "robots", content: "noindex" }] }),
  component: PlansConvert,
});
