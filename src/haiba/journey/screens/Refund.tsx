import Artwork from "../../Artwork";
import { Navigate, useNavigate } from "../../nav";
import { Button, LinkOut, Screen, TopBar, supportHref } from "../ui";
import { JourneyStage, Section, Steps } from "../parts";
import { useSession } from "../session";
import { pathFor, useJourneyActions } from "../actions";
import { addDays } from "../format";

// Refunds take up to 10 working days to reach the card, so the date shown is 14 days after the request.
const REFUND_DAYS = 14; // 10 working days

/** After Cancel my reservation: refund in progress, refunded (reserve again), or refund failed (support). */
export default function Refund() {
  const s = useSession();
  const a = useJourneyActions();
  const go = useNavigate();
  const j = s.journey;
  const status = j.status;
  const ok = ["refund_requested", "refunded", "refund_failed"].includes(status);

  if (s.hb.ready && s.valid && !ok) return <Navigate to={pathFor(status)} replace />;

  const deposit = s.m(s.deposit);
  const card = j.card ? s.t("cardLabel", { brand: j.card.brand, last4: j.card.last4 }) : "";
  const asked = j.refundOn ?? s.today;
  const by = addDays(asked, REFUND_DAYS);
  // Reserve again is open until launch. After launch the student joins at full price (flow 1b).
  const canReserve = !s.launched;

  return (
    <Screen
      dock={
        status === "refunded" && canReserve ? (
          <>
            <Button variant="primary" onClick={a.reserveAgain}>
              {s.t("reserveAgain", { deposit })}
            </Button>
            <p className="jx-dock-note">{s.t("reserveAgainNote", { price: s.m(s.offerPrice) })}</p>
          </>
        ) : status === "refund_failed" ? (
          <LinkOut href={supportHref(s, "refund_failed")} variant="primary">
            {s.t("contactSupport")}
          </LinkOut>
        ) : (
          <Button variant="primary" onClick={() => go("/")}>
            {s.t("backToUnipal")}
          </Button>
        )
      }
    >
      {/* 8 Nov: each refund state has its own colour so they never look alike:
          lilac while it is on the way, lime when it is back, rose when it failed. */}
      <header
        className={`jx-res jx-res-${status === "refund_failed" ? "bad" : status === "refunded" ? "lime" : "lilac"}`}
      >
        <TopBar back="/" />
        <Artwork
          src={
            status === "refund_failed"
              ? "/haiba/birds/05-shrug.png"
              : status === "refunded"
                ? "/haiba/birds/15-receipt.png"
                : "/haiba/birds/14-sit.png"
          }
          alt=""
          className="jx-res-bird"
        />
      </header>
      <div className="jx-res-body">
        {status === "refund_requested" && (
          <>
            <h1 className="jx-h1 jx-res-title">{s.t("refundTitle")}</h1>
            <p className="jx-sub">{s.t("refundBody", { deposit, card })}</p>
          </>
        )}
        {status === "refunded" && (
          <>
            <h1 className="jx-h1 jx-res-title">{s.t("refundedTitle")}</h1>
            <p className="jx-sub">{s.t("refundedBody", { deposit })}</p>
          </>
        )}
        {status === "refund_failed" && (
          <>
            <h1 className="jx-h1 jx-res-title">{s.t("refundFailedTitle")}</h1>
            <p className="jx-sub">{s.t("refundFailedBody")}</p>
          </>
        )}
        <JourneyStage stage="refund" />
      </div>

      {status !== "refund_failed" && (
        <Section>
          <div className="jx-card">
            <Steps
              steps={[
                { title: s.t("refundStep1"), body: s.d(asked), state: "done" },
                { title: s.t("refundStep2"), body: s.d(asked), state: "done" },
                {
                  title: s.t("refundStep3"),
                  body: status === "refunded" ? undefined : s.t("refundBy", { date: s.d(by) }),
                  state: status === "refunded" ? "done" : "now",
                },
              ]}
            />
          </div>
        </Section>
      )}

      {status !== "refund_failed" && (
        <div className="jx-actions">
          <LinkOut href={supportHref(s, "refund")} variant="ghost">
            {s.t("contactSupport")}
          </LinkOut>
        </div>
      )}
    </Screen>
  );
}
