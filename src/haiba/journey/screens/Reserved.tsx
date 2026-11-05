import { useState } from "react";
import { Bell, Lock, RotateCcw } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import Artwork from "../../Artwork";
import { Navigate, useNavigate } from "../../nav";
import { Button, LinkOut, Screen, Sheet, TopBar, supportHref } from "../ui";
import { Countdown, Note, Pill, Rows, Section, Steps } from "../parts";
import { useSession } from "../session";
import { pathFor, useJourneyActions } from "../actions";
import { pct, startOf } from "../format";

/**
 * Reserved: price locked, deposit paid, countdown to opening, what happens next, the refund rule,
 * and Cancel my reservation. Every return visit before launch lands here.
 */
export default function Reserved() {
  const s = useSession();
  const a = useJourneyActions();
  const go = useNavigate();
  const [cancel, setCancel] = useState(false);
  const search = useRouterState({ select: (r) => r.location.search }) as Record<string, unknown>;
  const just = search["just"] === 1 || search["just"] === "1";
  const j = s.journey;
  const ok = ["reserved", "pay_rest_open", "hold_expired"].includes(j.status);

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
        <div className="jx-hero-row">
          <div>
            <Pill tone="lime" icon={<Lock size={13} aria-hidden="true" />}>
              {s.t("reservedPill")}
            </Pill>
            <h1 className="jx-h1" style={{ marginTop: 12 }}>
              {s.t("reservedTitle")}
            </h1>
            <p className="jx-sub">{s.t("reservedSub", { price: s.m(s.price) })}</p>
          </div>
          <Artwork
            src={just ? "/haiba/birds/13-fist.png" : "/haiba/birds/01-cheer.png"}
            alt=""
            className="jx-hero-bird"
          />
        </div>
        <div className="jx-counter-label">{s.t("opensIn")}</div>
        <Countdown to={startOf(s.launch)} />
        <div className="jx-counter-date">
          {s.t("opensOn", { date: s.d(s.launch, { weekday: true }) })}
        </div>
      </header>

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
        <div className="jx-stack" style={{ marginTop: 16 }}>
          <Note icon={<Bell size={18} aria-hidden="true" />}>
            {s.t("heldUntil", { date: s.d(s.holdEnds, { weekday: true }) })} {s.t("nextRemind")}
          </Note>
          <Note icon={<RotateCcw size={18} aria-hidden="true" />}>{s.t("ruleCancel")}</Note>
        </div>
      </Section>

      <div className="jx-actions">
        <Button variant="danger" onClick={() => setCancel(true)}>
          {s.t("cancelReservation")}
        </Button>
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
