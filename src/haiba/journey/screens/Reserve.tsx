import { useState } from "react";
import { Clock, Coins, Gift, RotateCcw, Sparkles, X } from "lucide-react";
import { Navigate, useNavigate } from "../../nav";
import { Button, Screen, Sheet, useOnline } from "../ui";
import { Note, Rows, Section, Steps } from "../parts";
import { useSession } from "../session";
import { pathFor, useJourneyActions } from "../actions";
import { daysText } from "../strings";
import { pct } from "../format";

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

  if (s.hb.ready && s.valid && status !== "not_reserved" && status !== "ended") {
    return <Navigate to={pathFor(status)} replace />;
  }

  const deposit = s.m(s.deposit);
  const reserve = () => a.startPayment("deposit");

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
