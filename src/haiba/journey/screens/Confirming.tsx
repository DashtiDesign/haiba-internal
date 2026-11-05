import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Navigate, useNavigate } from "../../nav";
import { Button, LinkOut, Screen, supportHref } from "../ui";
import { useSession } from "../session";
import { pathFor, useJourneyActions } from "../actions";

// The simulated webhook takes this long to arrive. A pending payment shows the slow message after SLOW_MS.
const WEBHOOK_MS = 1800;
const SLOW_MS = 12000;

/**
 * Shown while we wait for Tap to confirm. The student is only moved on when the webhook arrives,
 * never because they came back from the Tap page.
 */
export default function Confirming() {
  const s = useSession();
  const a = useJourneyActions();
  const go = useNavigate();
  const p = s.journey.payment;
  const [slow, setSlow] = useState(false);
  const [round, setRound] = useState(0);
  const latest = useRef(a);
  latest.current = a;

  // A success or failure chosen on the Tap page arrives as a webhook shortly after.
  useEffect(() => {
    if (!p || p.outcome === "pending") return;
    const id = window.setTimeout(() => {
      // The page then moves on by itself (see below), from the new state.
      latest.current.webhook(p.outcome as "success" | "failed", p.reason);
    }, WEBHOOK_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p?.outcome, p?.startedAt]);

  // Pending: no webhook yet. After a while, say so and offer support.
  useEffect(() => {
    setSlow(false);
    if (!p || p.outcome !== "pending") return;
    const id = window.setTimeout(() => setSlow(true), SLOW_MS);
    return () => window.clearTimeout(id);
  }, [p?.outcome, p?.startedAt, round]);

  // The webhook has arrived (here or from the panel): go where the result says.
  if (s.hb.ready && s.valid && !p) {
    if (s.journey.failure) return <Navigate to="/haiba/failed" replace />;
    if (s.journey.status === "reserved")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <Navigate to="/haiba/reserved" search={{ just: 1 } as any} replace />;
    return <Navigate to={pathFor(s.journey.status)} replace />;
  }

  return (
    <Screen>
      <div className="jx-center" role="status" aria-live="polite" style={{ paddingTop: 90 }}>
        <Loader2 className="jx-spinner" aria-hidden="true" />
        <h1 className="jx-h2">{slow ? s.t("confirmSlowTitle") : s.t("confirmTitle")}</h1>
        <p className="jx-sub">{slow ? s.t("confirmSlowBody") : s.t("confirmBody")}</p>
      </div>
      {slow && (
        <div className="jx-actions">
          <Button variant="primary" onClick={() => setRound((n) => n + 1)}>
            {s.t("checkAgain")}
          </Button>
          <LinkOut href={supportHref(s, "payment")} variant="outline">
            {s.t("contactSupport")}
          </LinkOut>
          <Button variant="ghost" onClick={() => go("/")}>
            {s.t("backToUnipal")}
          </Button>
        </div>
      )}
    </Screen>
  );
}
