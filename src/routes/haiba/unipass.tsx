import { createFileRoute } from "@tanstack/react-router";
import { Skeleton, useQuery } from "@/haiba/journey/Skeleton";
import { Unipass } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/unipass")({
  head: () => ({ meta: [{ title: "Haiba · Unipass gift" }] }),
  component: Page,
});

function Page() {
  const q = useQuery();
  if (q["loading"] != null) return <Skeleton kind="unipass" />;
  return <Unipass />;
}
