import { createFileRoute } from "@tanstack/react-router";
import { NotStudent, type StudentAction } from "@/haiba/journey/screens/Edge";
import { useQuery } from "@/haiba/journey/Skeleton";

export const Route = createFileRoute("/haiba/student")({
  head: () => ({ meta: [{ title: "Haiba · Student status" }] }),
  component: Page,
});

function Page() {
  const q = useQuery();
  const f = String(q["for"] ?? "reserve");
  const action: StudentAction = f === "join" || f === "renew" ? f : "reserve";
  return <NotStudent action={action} />;
}
