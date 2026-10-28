import { createFileRoute } from "@tanstack/react-router";
import PromoValue from "@/haiba/screens/PromoValue";

// Promo page test (fake door). Open with ?price=18|20|22|25 (and for "year": &name=Sara&visits=4).
export const Route = createFileRoute("/haiba/promo/value")({
  head: () => ({ meta: [{ title: "Haiba" }, { name: "robots", content: "noindex" }] }),
  component: PromoValue,
});
