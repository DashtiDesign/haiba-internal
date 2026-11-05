import { useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useNavigate as useRouterNavigate } from "@tanstack/react-router";
import { Link } from "./nav";
import { useHaiba } from "./store";
import { useSession } from "./journey/session";
import { PRESETS, presetJourney, type Preset } from "./journey/states";
import { pathFor, useJourneyActions } from "./journey/actions";
import { useNavigate as useGo } from "./nav";
import { CURRENCY, DEFAULT_SETTINGS, type Country } from "./journey/settings";

/**
 * Prototype controls for the internal test. Not part of the product.
 * Sets what the app would pass (country, language, student id), jumps to any student state,
 * edits the prices, VAT, deposit, hold days and launch date every screen reads,
 * stands in for the shop accepting codes, and jumps to any screen.
 */
const SCREENS = [
  ["Unipal home", "/"],
  ["Haiba page (reserve)", "/haiba/reserve"],
  ["How points work", "/haiba/points"],
  ["How it works", "/haiba/welcome"],
  ["Haiba hub", "/haiba"],
  ["Spend points", "/haiba/rewards"],
  ["Earn points", "/haiba/earn"],
  ["Shop page (core)", "/shop/coffee-bean"],
  ["Redeem offer (core)", "/shop/coffee-bean/redeem"],
  ["Basket and codes", "/haiba/basket"],
  ["Wallet", "/haiba/wallet"],
  ["Travel data", "/haiba/travel"],
];

// Promo pages, grouped so they are easy to find. Paywall arms take the price chosen below.
const PAYWALLS = [
  ["A · Join copy", "/haiba/paywall/join"],
  ["B · Story", "/haiba/paywall/story"],
  ["C · Timeline", "/haiba/paywall/timeline"],
  ["Baseline (backup)", "/haiba/paywall/base"],
  ["Table (backup)", "/haiba/paywall/table"],
];
const OLD_PROMOS = [
  ["Waitlist", "/haiba/promo/waitlist"],
  ["Value tiles", "/haiba/promo/value"],
  ["Compare", "/haiba/promo/compare"],
  ["Your year", "/haiba/promo/year"],
  ["12 picks", "/haiba/promo/dream"],
  ["Gift first", "/haiba/promo/gift"],
  ["Win back", "/haiba/promo/winback"],
];
const PRICES = ["20", "22", "24"];

const STATUS_PREVIEWS = ["loading", "empty", "error", "offline", "denied", "country"];

const IDS: [string, string | number | undefined][] = [
  ["Student 100245", 100245],
  ["Student 100377", 100377],
  ["Missing id", undefined],
  ["Edited id", "100245abc"],
];

const chip = (on: boolean) => ({
  font: "inherit",
  fontSize: 13,
  fontWeight: 700,
  border: 0,
  borderRadius: 999,
  padding: "8px 12px",
  cursor: "pointer",
  background: on ? "#1E1B2E" : "#F0EEF6",
  color: on ? "#C0F402" : "#1E1B2E",
});

const sectionLabel = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "#6B6880",
  marginTop: 18,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 6,
  marginTop: 8,
};

export default function PrototypePanel() {
  const hb = useHaiba();
  const ses = useSession();
  const navigate = useRouterNavigate();
  const go = useGo();
  const acts = useJourneyActions();
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState("20");
  const reduced = useReducedMotion();
  const s = hb.state;
  const st = s.settings;
  const c: Country = ses.c;

  // Change what the app passes, keep everything else in the URL.
  const param = (patch: Record<string, string | number | undefined>) =>
    navigate({
      to: ".",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search: ((prev: Record<string, unknown>) => ({ ...prev, ...patch })) as any,
      replace: true,
    });

  const jump = (preset: Preset) => {
    const r = presetJourney(preset, st, c, ses.offerPrice);
    hb.set({ journey: r.journey, member: r.member, settings: { ...st, today: r.today } });
    go(pathFor(r.journey.status)); // land on the screen for that state
  };

  // Stands in for Tap calling our backend.
  const sendWebhook = (outcome: "success" | "failed", twice = false) => {
    const to = acts.webhook(outcome, "declined");
    if (twice) acts.webhook(outcome, "declined"); // the second one is ignored
    if (to) go(to);
  };

  const setPrices = (text: string) => {
    const list = text
      .split(/[ ,]+/)
      .map(Number)
      .filter((n) => n > 0);
    if (list.length)
      hb.setSettings({
        prices: { ...st.prices, [c]: list },
        forcePrice: { ...st.forcePrice, [c]: null },
      });
  };

  const cur = CURRENCY[c];
  const idNow = ses.userId ?? undefined;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open prototype panel"
        style={{
          position: "fixed",
          right: 0,
          top: "42%",
          zIndex: 60,
          border: 0,
          cursor: "pointer",
          background: "#1E1B2E",
          color: "#C0F402",
          font: "700 11px Figtree, system-ui, sans-serif",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "12px 6px",
          borderRadius: "10px 0 0 10px",
          writingMode: "vertical-rl",
        }}
      >
        Prototype
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            key="prototype-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 70,
              background: "rgba(20,16,36,0.45)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Prototype panel"
              dir="ltr"
              initial={{ y: reduced ? 0 : "100%" }}
              animate={{ y: 0 }}
              exit={{ y: reduced ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 390,
                background: "#FFFFFF",
                borderRadius: "24px 24px 0 0",
                padding: "18px 18px 28px 18px",
                fontFamily: "Figtree, system-ui, sans-serif",
                color: "#1E1B2E",
                boxSizing: "border-box",
                maxHeight: "86vh",
                overflowY: "auto",
              }}
            >
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span style={{ fontWeight: 800, fontSize: 17 }}>Prototype panel</span>
                <button
                  onClick={() => setOpen(false)}
                  style={{ ...chip(false), padding: "6px 12px" }}
                >
                  Close
                </button>
              </div>
              <div style={{ fontSize: 13, color: "#6B6880", marginTop: 4 }}>
                For the internal test only. Students never see this.
              </div>

              <div style={sectionLabel}>What the app passes</div>
              <Chips>
                <button
                  style={chip(ses.country === "bh")}
                  onClick={() => param({ country: "bahrain" })}
                >
                  Bahrain
                </button>
                <button
                  style={chip(ses.country === "sa")}
                  onClick={() => param({ country: "saudi" })}
                >
                  Saudi
                </button>
                <button style={chip(ses.lang === "en")} onClick={() => param({ lang: "en" })}>
                  English
                </button>
                <button style={chip(ses.lang === "ar")} onClick={() => param({ lang: "ar" })}>
                  Arabic
                </button>
              </Chips>
              <Chips>
                {IDS.map(([label, id]) => (
                  <button
                    key={label}
                    style={chip(idNow === (id == null ? undefined : String(id)))}
                    onClick={() => param({ user_id: id })}
                  >
                    {label}
                  </button>
                ))}
              </Chips>
              <Hint>A missing or edited id shows the safe error page on new screens.</Hint>

              <div style={sectionLabel}>Student state</div>
              {["Before launch", "At launch", "Member"].map((g) => (
                <div key={g}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginTop: 10 }}>{g}</div>
                  <Chips>
                    {PRESETS.filter((p) => p.group === g).map((p) => (
                      <button
                        key={p.id}
                        style={chip(isPreset(p.id, s.journey.status, s.member))}
                        onClick={() => jump(p.id)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </Chips>
                </div>
              ))}
              <Hint>
                Now: {s.journey.status.replace(/_/g, " ")}. Price {ses.m(ses.price)}
                {ses.locked ? " (locked)" : ""}. Today {ses.d(ses.today, { weekday: true })}
                {st.today ? " (set)" : " (real)"}.
              </Hint>

              {s.journey.payment && (
                <>
                  <div style={sectionLabel}>Tap webhook</div>
                  <Hint>
                    A {s.journey.payment.kind} payment is waiting for Tap (
                    {s.journey.payment.outcome}).
                  </Hint>
                  <Chips>
                    <button style={chip(false)} onClick={() => sendWebhook("success")}>
                      Paid
                    </button>
                    <button style={chip(false)} onClick={() => sendWebhook("failed")}>
                      Failed
                    </button>
                    <button style={chip(false)} onClick={() => sendWebhook("success", true)}>
                      Paid, sent twice
                    </button>
                  </Chips>
                </>
              )}

              <div style={sectionLabel}>Prices and dates</div>
              <Field
                label={
                  "Prices on offer in " +
                  (c === "bh" ? "Bahrain" : "Saudi") +
                  ", " +
                  cur +
                  " a year before VAT"
                }
              >
                <input
                  key={c + st.prices[c].join(",")}
                  defaultValue={st.prices[c].join(", ")}
                  onBlur={(e) => setPrices(e.target.value)}
                  style={input}
                />
              </Field>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 10 }}>
                Price this student sees
              </div>
              <Chips>
                <button
                  style={chip(st.forcePrice[c] == null)}
                  onClick={() => hb.setSettings({ forcePrice: { ...st.forcePrice, [c]: null } })}
                >
                  Random
                </button>
                {st.prices[c].map((p, i) => (
                  <button
                    key={i}
                    style={chip(st.forcePrice[c] === i)}
                    onClick={() => hb.setSettings({ forcePrice: { ...st.forcePrice, [c]: i } })}
                  >
                    {cur} {p}
                  </button>
                ))}
              </Chips>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}
              >
                <Field label="VAT %">
                  <input
                    type="number"
                    value={Math.round(st.vat[c] * 1000) / 10}
                    onChange={(e) =>
                      hb.setSettings({
                        vat: { ...st.vat, [c]: Math.max(0, Number(e.target.value)) / 100 },
                      })
                    }
                    style={input}
                  />
                </Field>
                <Field label={"Deposit, " + cur}>
                  <input
                    type="number"
                    value={st.deposit[c]}
                    onChange={(e) =>
                      hb.setSettings({
                        deposit: { ...st.deposit, [c]: Math.max(0, Number(e.target.value)) },
                      })
                    }
                    style={input}
                  />
                </Field>
                <Field label="Hold days after launch">
                  <input
                    type="number"
                    value={st.holdDays}
                    onChange={(e) =>
                      hb.setSettings({ holdDays: Math.max(0, Math.round(Number(e.target.value))) })
                    }
                    style={input}
                  />
                </Field>
                <Field label="Launch date">
                  <input
                    type="date"
                    value={st.launchDate}
                    onChange={(e) =>
                      e.target.value && hb.setSettings({ launchDate: e.target.value })
                    }
                    style={input}
                  />
                </Field>
                <Field label="Today (prototype clock)">
                  <input
                    type="date"
                    value={st.today ?? ""}
                    onChange={(e) => hb.setSettings({ today: e.target.value || null })}
                    style={input}
                  />
                </Field>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <button
                    style={{ ...chip(st.today == null), width: "100%" }}
                    onClick={() => hb.setSettings({ today: null })}
                  >
                    Use real date
                  </button>
                </div>
              </div>
              <Chips>
                <button style={chip(false)} onClick={() => hb.set({ settings: DEFAULT_SETTINGS })}>
                  Reset prices and dates
                </button>
              </Chips>

              <div style={sectionLabel}>Shop side</div>
              <Chips>
                <button style={chip(false)} onClick={() => hb.acceptAll()}>
                  Shop accepts all held codes
                </button>
                <button
                  style={chip(false)}
                  disabled={s.travel !== "revealed"}
                  onClick={() => hb.redeemTravel()}
                >
                  Airalo accepts the travel code
                </button>
                <button style={chip(false)} onClick={() => hb.resetStudent()}>
                  Reset student
                </button>
              </Chips>

              <div style={sectionLabel}>System states</div>
              <div style={grid}>
                {STATUS_PREVIEWS.map((k) => (
                  <Link
                    key={k}
                    to="/haiba/status"
                    search={(prev: Record<string, unknown>) => ({ ...prev, show: k })}
                    onClick={() => setOpen(false)}
                    style={{ ...chip(false), textDecoration: "none", textAlign: "center" }}
                  >
                    {k === "denied"
                      ? "Bad user id"
                      : k === "country"
                        ? "Unknown country"
                        : k.charAt(0).toUpperCase() + k.slice(1)}
                  </Link>
                ))}
              </div>

              <div style={sectionLabel}>Promo pages</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 8 }}>
                <span style={{ fontSize: 13, color: "#6B6880" }}>Price</span>
                {PRICES.map((p) => (
                  <button key={p} style={chip(price === p)} onClick={() => setPrice(p)}>
                    BHD {p}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 10 }}>
                Paywall test (4 Nov)
              </div>
              <div style={grid}>
                {PAYWALLS.map(([label, to]) => (
                  <Link
                    key={to}
                    to={to}
                    search={(prev: Record<string, unknown>) => ({ ...prev, price: Number(price) })}
                    onClick={() => setOpen(false)}
                    style={{ ...chip(false), textDecoration: "none", textAlign: "center" }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 12 }}>
                Older promo tests (28 Oct)
              </div>
              <div style={grid}>
                {OLD_PROMOS.map(([label, to]) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    style={{ ...chip(false), textDecoration: "none", textAlign: "center" }}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div style={sectionLabel}>Go to screen</div>
              <div style={grid}>
                {SCREENS.map(([label, to]) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    style={{ ...chip(false), textDecoration: "none", textAlign: "center" }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const input: CSSProperties = {
  font: "inherit",
  fontSize: 14,
  fontWeight: 600,
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #E2DCF2",
  borderRadius: 10,
  padding: "8px 10px",
  color: "#1E1B2E",
  background: "#FFFFFF",
};

function Chips({ children }: { children: ReactNode }) {
  return <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>{children}</div>;
}

function Hint({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontSize: 13, color: "#6B6880", marginTop: 6, lineHeight: 1.4 }}>{children}</div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        marginTop: 8,
        fontSize: 12.5,
        fontWeight: 700,
        color: "#6B6880",
      }}
    >
      {label}
      {children}
    </label>
  );
}

// Which preset chip is lit for the current state.
function isPreset(p: Preset, status: string, member: string) {
  if (p === "member_new") return status === "member" && member === "new";
  if (p === "member_active") return status === "member" && member === "active";
  if (p === "not_reserved_after_launch") return false;
  return p === status;
}
