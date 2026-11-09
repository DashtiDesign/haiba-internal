import { createFileRoute } from "@tanstack/react-router";
import { Skeleton, useQuery } from "@/haiba/journey/Skeleton";
import { Hadiya } from "@/haiba/journey/screens/Member";

export const Route = createFileRoute("/haiba/hadiya")({
  head: () => ({ meta: [{ title: "Haiba · Hadiya" }] }),
  component: Page,
});

function Page() {
  const q = useQuery();
  if (q["loading"] != null) return <Skeleton kind="hadiya" />;
  return <Hadiya />;
}
