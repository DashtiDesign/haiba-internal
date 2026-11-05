import { AlertCircle } from "lucide-react";
import Artwork from "../../Artwork";
import { Navigate, useNavigate } from "../../nav";
import { Button, LinkOut, Screen, TopBar, supportHref } from "../ui";
import { Pill } from "../parts";
import { useSession } from "../session";
import { pathFor, useJourneyActions } from "../actions";

/** A deposit, rest, join or renew payment that Tap turned down. Plain reason, try again, another card, support. */
export default function Failed() {
  const s = useSession();
  const a = useJourneyActions();
  const go = useNavigate();
  const f = s.journey.failure;

  // No failure to show (and not on the way to Tap for a retry): go to the student's own screen.
  if (s.hb.ready && s.valid && !f && !s.journey.payment)
    return <Navigate to={pathFor(s.journey.status)} replace />;

  const back = () => {
    s.hb.setJourney({ failure: null });
    go(f?.kind === "deposit" ? "/haiba/reserve" : pathFor(s.journey.status));
  };

  return (
    <Screen>
      <TopBar back={back} />
      <div className="jx-center">
        <Artwork src="/haiba/birds/16-torn.png" alt="" className="jx-center-art" />
        <Pill tone="bad" icon={<AlertCircle size={14} aria-hidden="true" />}>
          {f ? s.t(("reason_" + f.reason) as "reason_declined") : ""}
        </Pill>
        <h1 className="jx-h2" style={{ marginTop: 6 }}>
          {s.t("failedTitle")}
        </h1>
        <p className="jx-sub">{s.t("failedBody")}</p>
      </div>
      <div className="jx-actions">
        <Button variant="primary" onClick={() => f && a.startPayment(f.kind)}>
          {s.t("tryAgain")}
        </Button>
        <Button variant="outline" onClick={() => f && a.startPayment(f.kind, true)}>
          {s.t("useAnotherCard")}
        </Button>
        <LinkOut href={supportHref(s, "payment_failed")} variant="ghost">
          {s.t("contactSupport")}
        </LinkOut>
      </div>
    </Screen>
  );
}
