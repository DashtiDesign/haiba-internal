import { createFileRoute } from "@tanstack/react-router";
import { Navigate } from "@/haiba/nav";

// The old join page (monthly plan, BHD 18) is replaced by the reservation flow.
export const Route = createFileRoute("/haiba/plans")({
  component: () => <Navigate to="/haiba/reserve" replace />,
});
