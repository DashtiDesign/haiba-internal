import { useState } from "react";
import { Lock, RotateCcw } from "lucide-react";
import Artwork from "../../Artwork";
import { Navigate, useNavigate } from "../../nav";
import { Button, LinkOut, Screen, Sheet, TopBar, supportHref } from "../ui";
import { Countdown, JourneyStage, Rows, Section, Steps } from "../parts";
import { useSession } from "../session";
import { pathFor, useJourneyActions } from "../actions";
import { pct, startOf } from "../format";
import { Elsewhere } from "./Edge";

/**
 * Reserved: price locked, deposit paid, countdown to opening, what happens next, the refund rule,
 * and Cancel my reservation. Every return visit before launch lands here.
 */
export default function Reserved() {
  const s = useSession();
  const a = useJourneyActions();
  const go = useNavigate();
  const [cancel, setCancel] = useState(false);
  const j = s.journey;
  const ok = j.status === "reserved";

  if (s.elsewhere) return <Elsewhere />;
  if (s.hb.ready && s.valid && !ok) return <Navigate to={pathFor(j.status)} replace />;

  const deposit = s.m(s.deposit);
  const card = j.card ? s.t("cardLabel", { brand: j.card.brand, last4: j.card.last4 }) : "";
  const paid = j.depositPaidOn ?? s.today;

  return (
    <Screen
      tone="white"
      dock={
        <Button variant="primary" onClick={() => go("/")}>
          {s.t("done")}
        </Button>
      }
    >
      <header className="jx-dark-hero">
        <TopBar back="/" onDark />
        <Artwork src="/haiba/birds/02-jump.png" alt="" className="jx-hero-bird" />
        <div className="jx-hero-text">
          <h1 className="jx-h1">{s.t("reservedTitle")}</h1>
          <p className="jx-sub">{s.t("reservedSub", { price: s.m(s.price) })}</p>
        </div>
        <div className="jx-counter-label">
          {s.t("opensOn", { date: s.d(s.launch, { weekday: true }) })}
        </div>
        <Countdown to={startOf(s.launch)} />
      </header>
      <div className="jx-pad">
        <JourneyStage stage="reserved" payOn={s.d(s.launch)} />
      </div>

      <Section>
        <div className="jx-keys">
          <div className="jx-key">
            <span className="jx-key-icon">
              <Lock size={20} aria-hidden="true" />
            </span>
            <span className="jx-key-text">
              <span className="jx-key-title">
                {s.t("keyHeldTitle", { date: s.d(s.holdEnds, { weekday: true }) })}
              </span>
              <span className="jx-key-body">{s.t("keyHeldBody", { price: s.m(s.price) })}</span>
            </span>
          </div>
          <div className="jx-key">
            <span className="jx-key-icon">
              <RotateCcw size={20} aria-hidden="true" />
            </span>
            <span className="jx-key-text">
              <span className="jx-key-title">{s.t("keyCancelTitle")}</span>
              <span className="jx-key-body">{s.t("keyCancelBody", { deposit })}</span>
              <button className="jx-key-link" onClick={() => setCancel(true)}>
                {s.t("cancelReservation")}
              </button>
            </span>
          </div>
        </div>
      </Section>

      <Section>
        <Rows
          strongLast
          rows={[
            [s.t("lockedPrice"), s.m(s.price), s.t("perYearPlusVat")],
            [s.t("vatRow", { rate: pct(s.vatRate) }), s.m(s.vat)],
            [s.t("depositPaid"), "− " + deposit, s.t("paidOn", { date: s.d(paid) })],
            [s.t("leftToPay"), s.m(s.rest)],
          ]}
        />
      </Section>

      <Section title={s.t("nextTitle")}>
        <Steps
          steps={[
            { title: s.t("nextToday"), body: s.t("paidOn", { date: s.d(paid) }), state: "done" },
            {
              title: s.d(s.launch, { weekday: true }),
              body: s.t("nextOpen", { rest: s.m(s.rest), card }),
              state: "next",
            },
          ]}
        />
      </Section>

      <div className="jx-actions">
        <LinkOut href={supportHref(s, "reservation")} variant="ghost">
          {s.t("contactSupport")}
        </LinkOut>
      </div>

      <Sheet open={cancel} onClose={() => setCancel(false)} label={s.t("cancelTitle")}>
        <h2 className="jx-h2">{s.t("cancelTitle")}</h2>
        <p className="jx-sub" style={{ marginTop: 0 }}>
          {s.t("cancelBody", { deposit })}
        </p>
        <p className="jx-small" style={{ margin: 0 }}>
          {s.t("cancelTime")}
        </p>
        <Button
          variant="danger"
          onClick={() => {
            setCancel(false);
            a.cancelReservation();
          }}
        >
          {s.t("cancelYes")}
        </Button>
        <Button variant="primary" onClick={() => setCancel(false)}>
          {s.t("cancelKeep")}
        </Button>
      </Sheet>
    </Screen>
  );
}
