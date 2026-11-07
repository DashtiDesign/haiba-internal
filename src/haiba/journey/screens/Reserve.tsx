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
import { pct, startOf } from "../format";

/**
 * The Haiba page before launch: the student's price, VAT, the deposit and the two refund rules.
 * A student who already reserved is sent to their own state and never sees this page again.
 */
export default function Reserve() {
  const s = useSession();
  const a = useJourneyActions();
  const online = useOnline();
  const [exit, setExit] = useState(false);
  const go = useNavigate();
  const status = s.journey.status;

  if (s.elsewhere) return <Elsewhere />;
  if (s.hb.ready && s.valid && status !== "not_reserved" && status !== "ended") {
    return <Navigate to={pathFor(status)} replace />;
  }

  const deposit = s.m(s.deposit);
  const reserve = () => a.startPayment("deposit");

  // The reservation test has ended and Haiba has not opened yet.
  if (s.today > s.settings.reserveEnd && !s.launched) return <ReserveClosed />;
  // Haiba is for students only, and reservations are capped per country.
  if (s.student !== "verified") return <NotStudent action="reserve" />;
  if (s.full && !s.launched) return <SpotsFull />;

  return (
    <Screen
      dock={
        <>
          <Button variant="primary" onClick={reserve} disabled={!online}>
            {online ? s.t("reserveCta", { deposit }) : s.t("offlineCta")}
          </Button>
          <p className="jx-dock-note">{s.t("reserveCtaNote")}</p>
        </>
      }
    >
      <header className="jx-hero">
        <div className="jx-hero-bar">
          <img src="/haiba/logo-purple.svg" alt={s.t("haiba")} className="jx-hero-logo" />
          <button className="jx-icon-btn" onClick={() => setExit(true)} aria-label={s.t("close")}>
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <img src="/haiba/birds/17-coin-toss.webp" alt="" className="jx-hero-art" />
        <div className="jx-hero-body">
          {s.spotsLeft <= 100 && (
            <span className="jx-tag jx-tag-dark jx-spots-tag">
              {s.t("spotsLeft", { n: s.spotsLeft, country: countryName(s, s.c) })}
            </span>
          )}
          <h1 className="jx-h1">{s.t("reserveTitle")}</h1>
          <p className="jx-sub" style={{ color: "#4a4560" }}>
            {s.t("reserveSub")}
          </p>
        </div>
      </header>

      <Section>
        <div className="jx-benefits">
          {[
            [<Gift key="g" size={18} />, "benefitGifts", "benefitGiftsSub"],
            [<Coins key="c" size={18} />, "benefitPoints", "benefitPointsSub"],
            [<Sparkles key="s" size={18} />, "benefitWelcome", "benefitWelcomeSub"],
          ].map(([icon, title, sub]) => (
            <div className="jx-row" key={title as string}>
              <span className="jx-row-icon">{icon}</span>
              <span className="jx-row-main">
                <span className="jx-row-title">{s.t(title as "benefitGifts")}</span>
                <span className="jx-row-sub">{s.t(sub as "benefitGiftsSub")}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="jx-price">
          <span className="jx-label">{s.t("yourPrice")}</span>
          <div className="jx-price-big">
            <span className="jx-price-amount jx-num">{s.m(s.price)}</span>
            <span className="jx-price-per">{s.t("perYearPlusVat")}</span>
          </div>
          <Rows
            strongLast
            rows={[
              [s.t("priceRow"), s.m(s.price)],
              [s.t("vatRow", { rate: pct(s.vatRate) }), s.m(s.vat)],
              [s.t("totalRow"), s.m(s.total)],
            ]}
          />
        </div>
        <p className="jx-small" style={{ margin: "8px 4px 0" }}>
          {s.t("priceBeforeVat")}
        </p>
      </Section>

      <Section title={s.t("howTitle")}>
        <Steps
          steps={[
            { title: s.t("stepToday"), body: s.t("stepTodayBody", { deposit }), state: "now" },
            {
              title: s.d(s.launch, { weekday: true }),
              body: s.t("stepOpenBody", { rest: s.m(s.rest) }),
              state: "next",
            },
          ]}
        />
      </Section>

      <Section>
        <div className="jx-stack">
          <Note icon={<RotateCcw size={18} aria-hidden="true" />}>{s.t("ruleCancel")}</Note>
          <Note icon={<Clock size={18} aria-hidden="true" />}>
            {s.t("ruleHold", {
              days: daysText(s.lang, s.settings.holdDays),
              date: s.d(s.holdEnds),
            })}
          </Note>
        </div>
      </Section>

      <Sheet open={exit} onClose={() => setExit(false)} label={s.t("exitTitle")}>
        <span className="jx-label">{s.t("exitSmall")}</span>
        <h2 className="jx-h2">{s.t("exitTitle")}</h2>
        <p className="jx-sub" style={{ marginTop: 0 }}>
          {s.t("exitBody", { deposit, price: s.m(s.price) })}
        </p>
        <Button
          variant="primary"
          disabled={!online}
          onClick={() => {
            setExit(false);
            reserve();
          }}
        >
          {s.t("exitYes", { deposit })}
        </Button>
        <Button variant="ghost" onClick={() => go("/")}>
          {s.t("exitNo")}
        </Button>
      </Sheet>
    </Screen>
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
