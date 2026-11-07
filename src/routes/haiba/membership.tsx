import { createFileRoute } from "@tanstack/react-router";
import { Skeleton, useQuery } from "@/haiba/journey/Skeleton";
import { Membership } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/membership")({
  head: () => ({ meta: [{ title: "Haiba · Membership" }] }),
  component: Page,
});

function Page() {
  const q = useQuery();
  if (q["loading"] != null) return <Skeleton kind="membership" />;
  return <Membership />;
}
