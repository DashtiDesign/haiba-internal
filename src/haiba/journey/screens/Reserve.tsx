import type React from "react";
import { useState } from "react";
import { Check } from "lucide-react";
import { Clock, Coins, Gift, Lock, RotateCcw, Sparkles, X } from "lucide-react";
import { Navigate, useNavigate } from "../../nav";
import { Button, Screen, Sheet, useOnline } from "../ui";
import { Countdown, Note, Rows, Section, Steps } from "../parts";
import Artwork from "../../Artwork";
import { useSession } from "../session";
import { pathFor, useJourneyActions } from "../actions";
import { daysText } from "../strings";
import { Elsewhere, NotStudent, SpotsFull, countryName } from "./Edge";
import { startOf } from "../format";
import PlansConvert from "../../screens/PlansConvert";
import { PromoModeContext, type PromoMode } from "../promoMode";
import PaywallStory from "../../screens/PaywallStory";
import PaywallTimeline from "../../screens/PaywallTimeline";
import PaywallPoints from "../../screens/PaywallPoints";
import PaywallPointsApps from "../../screens/PaywallPointsApps";
import PaywallPointsGifts from "../../screens/PaywallPointsGifts";
import PaywallBase from "../../screens/PaywallBase";
import PaywallTable from "../../screens/PaywallTable";

/**
 * The Haiba page before launch: the student's price, VAT, the deposit and the two refund rules.
 * A student who already reserved is sent to their own state and never sees this page again.
 */
export default function Reserve() {
  const s = useSession();
  const status = s.journey.status;

  if (s.elsewhere) return <Elsewhere />;
  if (s.hb.ready && s.valid && status !== "not_reserved" && status !== "ended") {
    return <Navigate to={pathFor(status)} replace />;
  }

  // The reservation test has ended and Haiba has not opened yet.
  if (s.today > s.settings.reserveEnd && !s.launched) return <ReserveClosed />;
  // Haiba is for students only, and reservations are capped per country.
  if (s.student !== "verified") return <NotStudent action="reserve" />;
  if (s.full && !s.launched) return <SpotsFull />;

  // After launch the same promo page becomes the join page: full price with VAT, no deposit.
  return <MainPromo mode={s.launched ? "Join" : "Reserve"} />;
}

/**
 * The page a student sees before they reserve is one of the promo pages (paywall test arms).
 * Which one is set in the prototype panel ("Main promo page"). Each reads its price, money, deposit and
 * launch date from the settings, and its reserve button starts the real deposit payment.
 */
export const PROMOS = {
  join: PlansConvert,
  story: PaywallStory,
  timeline: PaywallTimeline,
  base: PaywallBase,
  table: PaywallTable,
  points: PaywallPoints,
  pointsApps: PaywallPointsApps,
  pointsGifts: PaywallPointsGifts,
} as const;
export type PromoKey = keyof typeof PROMOS;

export function MainPromo({ mode = "Reserve" }: { mode?: PromoMode }) {
  const s = useSession();
  const Page = PROMOS[s.settings.mainPromo] ?? PlansConvert;
  return (
    <PromoModeContext.Provider value={mode}>
      {/* 9 Nov: the spots line and the page share one screen height, so the page never scrolls by the
          height of the spots line. The story fits the screen exactly; the other pages scroll only if they
          are longer than the screen. */}
      <div className={"jx-promo-shell" + (Page === PaywallStory ? " jx-promo-fit" : "")}>
        {mode === "Reserve" && s.spotsLeft <= 100 && (
          <div className="jx-spots-banner" role="status">
            {s.t("spotsLeft", { n: s.spotsLeft, country: countryName(s, s.c) })}
          </div>
        )}
        <Page />
      </div>
    </PromoModeContext.Provider>
  );
}

const BENEFITS: [
  React.ReactNode,
  "benefitGifts" | "benefitPoints" | "benefitWelcome",
  "benefitGiftsSub" | "benefitPointsSub" | "benefitWelcomeSub",
][] = [
  [<Gift key="g" size={18} />, "benefitGifts", "benefitGiftsSub"],
  [<Coins key="c" size={18} />, "benefitPoints", "benefitPointsSub"],
  [<Sparkles key="s" size={18} />, "benefitWelcome", "benefitWelcomeSub"],
];

/** After the reservation test ends and before Haiba opens: clearly closed, what happens next, a reminder. */
function ReserveClosed() {
  const s = useSession();
  const go = useNavigate();
  const [reminded, setReminded] = useState(false);
  const date = s.d(s.launch, { weekday: true });
  return (
    <Screen
      dock={
        <>
          {reminded ? (
            <Button variant="soft" icon={<Check size={18} aria-hidden="true" />} disabled>
              {s.t("closedReminded", { date })}
            </Button>
          ) : (
            <Button variant="primary" onClick={() => setReminded(true)}>
              {s.t("closedRemind")}
            </Button>
          )}
          <p className="jx-dock-note">{s.t("closedRemindNote")}</p>
        </>
      }
    >
      <header className="jx-dark-hero">
        <TopBarClose onClose={() => go("/")} />
        <Artwork src="/haiba/birds/14-sit.png" alt="" className="jx-hero-bird jx-hero-bird-sit" />
        <div className="jx-hero-text">
          <span className="jx-closed-line">
            <Lock size={15} aria-hidden="true" />
            {s.t("closedOn", { date: s.d(s.settings.reserveEnd) })}
          </span>
          <h1 className="jx-h1" style={{ marginTop: 8 }}>
            {s.t("closedTitle")}
          </h1>
          <p className="jx-sub">{s.t("closedSub", { date })}</p>
        </div>
        <div className="jx-counter-label">{s.t("opensIn")}</div>
        <Countdown to={startOf(s.launch)} />
      </header>
      <Section title={s.t("closedNextTitle")}>
        <Steps
          steps={[
            {
              title: s.t("closedStep1"),
              body: s.d(s.settings.reserveEnd, { weekday: true }),
              state: "done",
            },
            { title: s.t("closedStep2"), body: date, state: "now" },
            {
              title: s.t("closedStep3"),
              body: s.t("closedStep3Body", { price: s.m(s.offerPrice) }),
              state: "next",
            },
          ]}
        />
      </Section>
      <Section title={s.t("closedWhat")}>
        <div className="jx-benefits">
          {BENEFITS.map(([icon, title, sub]) => (
            <div className="jx-row" key={title}>
              <span className="jx-row-icon">{icon}</span>
              <span className="jx-row-main">
                <span className="jx-row-title">{s.t(title)}</span>
                <span className="jx-row-sub">{s.t(sub)}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>
    </Screen>
  );
}

function TopBarClose({ onClose }: { onClose: () => void }) {
  const s = useSession();
  return (
    <div className="jx-top jx-top-dark">
      <span className="jx-icon-spacer" />
      <span className="jx-top-title" />
      <button className="jx-icon-btn" onClick={onClose} aria-label={s.t("close")}>
        <X size={22} aria-hidden="true" />
      </button>
    </div>
  );
}
