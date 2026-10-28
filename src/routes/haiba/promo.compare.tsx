import { createFileRoute } from "@tanstack/react-router";
import PromoCompare from "@/haiba/screens/PromoCompare";

// Promo page test (fake door). Open with ?price=18|20|22|25 (and for "year": &name=Sara&visits=4).
export const Route = createFileRoute("/haiba/promo/compare")({
  head: () => ({ meta: [{ title: "Haiba" }, { name: "robots", content: "noindex" }] }),
  component: PromoCompare,
});
