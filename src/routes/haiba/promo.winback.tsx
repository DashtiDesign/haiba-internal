import { createFileRoute } from "@tanstack/react-router";
import PromoWinback from "@/haiba/screens/PromoWinback";

// Promo page test F: shown after "Not now" on a promo page. Open with ?price=18|20|22|25&name=Sara&visits=4
export const Route = createFileRoute("/haiba/promo/winback")({
  head: () => ({ meta: [{ title: "Haiba" }, { name: "robots", content: "noindex" }] }),
  component: PromoWinback,
});
