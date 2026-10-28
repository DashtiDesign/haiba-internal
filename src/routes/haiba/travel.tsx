import { createFileRoute } from "@tanstack/react-router";
import Travel from "@/haiba/screens/Travel";

// Free travel data perk: 1 Airalo plan per member, 5GB for 7 days. Monthly members unlock it after 3 paid months.
export const Route = createFileRoute("/haiba/travel")({
  head: () => ({
    meta: [
      { title: "Haiba · Free travel data" },
      {
        name: "description",
        content: "Free 5GB travel data for Haiba members, powered by Airalo.",
      },
    ],
  }),
  component: Travel,
});
