import { createFileRoute } from "@tanstack/react-router";
import { Screen, StatusView, TopBar, type StatusKind } from "@/haiba/journey/ui";

const KINDS: StatusKind[] = ["loading", "empty", "error", "offline", "denied", "country"];

// Preview of the shared system states every new Haiba screen uses: /haiba/status?show=error
export const Route = createFileRoute("/haiba/status")({
  head: () => ({ meta: [{ title: "Haiba · Status" }] }),
  component: StatusPreview,
});

function StatusPreview() {
  const search = Route.useSearch() as Record<string, unknown>;
  const show = search["show"] as StatusKind;
  const kind: StatusKind = KINDS.includes(show) ? show : "error";
  return (
    <Screen guard={false}>
      <TopBar back="/haiba" />
      <StatusView kind={kind} />
    </Screen>
  );
}
