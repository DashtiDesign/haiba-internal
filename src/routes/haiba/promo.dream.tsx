import { createFileRoute } from "@tanstack/react-router";
import PromoDream from "@/haiba/screens/PromoDream";

// Promo page test D2 for low use students (1 offer a month or less). Open with ?price=18|20|22|25&name=Sara
export const Route = createFileRoute("/haiba/promo/dream")({
  head: () => ({ meta: [{ title: "Haiba" }, { name: "robots", content: "noindex" }] }),
  component: PromoDream,
});
