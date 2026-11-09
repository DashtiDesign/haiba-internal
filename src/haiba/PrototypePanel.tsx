import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useNavigate as useRouterNavigate } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, RotateCcw, Search, X } from "lucide-react";
import { useHaiba } from "./store";
import { useSession } from "./journey/session";
import { presetJourney, type Preset } from "./journey/states";
import { pathFor, useJourneyActions } from "./journey/actions";
import { useNavigate as useGo } from "./nav";
import { CURRENCY, DEFAULT_SETTINGS, type Country } from "./journey/settings";
import { addMonths, startOf } from "./journey/format";

/**
 * Prototype panel (8 Nov rebuild). For the internal test only, students never see it.
 * Four tabs:
 * - Journey: where the student is, what can happen next, and every state on one map. Tap a state to jump.
 * - Screens: every screen, grouped and searchable. Screens that need a state set it first.
 * - Setup: what the app passes (country, language, id), student status, prices, dates and spots.
 * - Tests: the paywall test arms, older promo pages, shop side events and reset.
 */

type Tab = "journey" | "screens" | "setup" | "tests";
const TABS: [Tab, string][] = [
  ["journey", "Journey"],
  ["screens", "Screens"],
  ["setup", "Setup"],
  ["tests", "Tests"],
];

type Step = { id: Preset; label: string; note: string; side?: boolean };
const FLOW: { phase: string; when: string; steps: Step[] }[] = [
  {
    phase: "Before launch",
    when: "Reserve for a small deposit",
    steps: [
      { id: "not_reserved", label: "Not reserved", note: "Sees the Haiba page and can reserve" },
      { id: "payment_pending", label: "Paying the deposit", note: "Waiting for Tap to confirm" },
      { id: "reserved", label: "Reserved", note: "Price locked, counting down to launch" },
      {
        id: "refund_requested",
        label: "Cancelled, refund on the way",
        note: "Deposit going back",
        side: true,
      },
      { id: "refunded", label: "Refunded", note: "Can reserve again", side: true },
      { id: "refund_failed", label: "Refund failed", note: "Support sends it by hand", side: true },
    ],
  },
  {
    phase: "Launch day",
    when: "Haiba opens, pay the rest",
    steps: [
      { id: "pay_rest_open", label: "Pay the rest", note: "Price held for a few days" },
      {
        id: "hold_expired",
        label: "Hold expired",
        note: "Did not pay in time, deposit sent back",
        side: true,
      },
      {
        id: "not_reserved_after_launch",
        label: "Never reserved",
        note: "Joins at full price",
        side: true,
      },
    ],
  },
  {
    phase: "Member",
    when: "One year of Haiba",
    steps: [
      { id: "member_new", label: "Just joined", note: "Day one, first gift to pick" },
      { id: "member_active", label: "Active member", note: "A month in" },
      {
        id: "cancelled",
        label: "Cancelled, year runs on",
        note: "Keeps Haiba to the end",
        side: true,
      },
      { id: "renewal_due", label: "Last month, renew soon", note: "Card greys out, renew" },
      {
        id: "cancelled_last_month",
        label: "Last month, cancelled",
        note: "Same page, pill says Ends",
        side: true,
      },
      { id: "ended", label: "Year ended", note: "Points kept 30 days, come back" },
    ],
  },
];
const ALL_STEPS = FLOW.flatMap((f) => f.steps);
const stepLabel = (id: Preset) => ALL_STEPS.find((x) => x.id === id)?.label ?? id;

// Where a jump lands. Member side states open the membership page, where they show.
const LAND: Partial<Record<Preset, string>> = {
  renewal_due: "/haiba/membership",
  cancelled: "/haiba/membership",
  cancelled_last_month: "/haiba/membership",
  member_new: "/haiba/paid",
};

// What can happen next from each state. Payments are made in the app; these are the outside events.
const NEXT: Partial<
  Record<Preset, { label: string; to?: Preset; open?: string; hint?: string }[]>
> = {
  not_reserved: [
    { label: "Open the Haiba page", open: "/haiba/reserve", hint: "Tap Reserve there to pay." },
  ],
  reserved: [
    { label: "Launch day comes", to: "pay_rest_open" },
    { label: "Student cancels", to: "refund_requested" },
  ],
  refund_requested: [
    { label: "Bank confirms the refund", to: "refunded" },
    { label: "Refund fails", to: "refund_failed" },
  ],
  refunded: [{ label: "Start again", to: "not_reserved" }],
  refund_failed: [{ label: "Start again", to: "not_reserved" }],
  pay_rest_open: [
    { label: "Open Pay the rest", open: "/haiba/pay", hint: "Tap Pay there to join." },
    { label: "The hold runs out", to: "hold_expired" },
  ],
  hold_expired: [{ label: "Open the join page", open: "/haiba/join" }],
  not_reserved_after_launch: [{ label: "Open the join page", open: "/haiba/join" }],
  member_new: [
    { label: "A month later", to: "member_active" },
    { label: "Last month of the year", to: "renewal_due" },
  ],
  member_active: [
    { label: "Student cancels", to: "cancelled" },
    { label: "Last month of the year", to: "renewal_due" },
  ],
  cancelled: [
    { label: "Last month of the year", to: "cancelled_last_month" },
    { label: "The year ends", to: "ended" },
  ],
  renewal_due: [
    { label: "Open membership", open: "/haiba/membership", hint: "Tap Renew there." },
    { label: "The year ends", to: "ended" },
  ],
  cancelled_last_month: [{ label: "The year ends", to: "ended" }],
  ended: [{ label: "Start over", to: "not_reserved" }],
};

// Screens, grouped. need = the state a screen needs; jumping there sets it first.
type Screen = { label: string; to: string; need?: Preset; freshGift?: boolean };
const SCREENS: { group: string; items: Screen[] }[] = [
  {
    group: "Reserve and pay",
    items: [
      { label: "Haiba page (reserve)", to: "/haiba/reserve", need: "not_reserved" },
      { label: "Reserved", to: "/haiba/reserved", need: "reserved" },
      { label: "Refund in progress", to: "/haiba/refund", need: "refund_requested" },
      { label: "Pay the rest", to: "/haiba/pay", need: "pay_rest_open" },
      { label: "Hold expired", to: "/haiba/expired", need: "hold_expired" },
      { label: "Join after launch", to: "/haiba/join", need: "not_reserved_after_launch" },
      { label: "Payment done", to: "/haiba/paid", need: "member_new" },
      { label: "How it works", to: "/haiba/welcome" },
    ],
  },
  {
    group: "Haiba hub and points",
    items: [
      { label: "Haiba hub", to: "/haiba", need: "member_active" },
      { label: "Spend points", to: "/haiba/rewards" },
      { label: "Earn points", to: "/haiba/earn" },
      { label: "How points work", to: "/haiba/points" },
      { label: "Basket and codes", to: "/haiba/basket" },
      { label: "Wallet", to: "/haiba/wallet" },
      { label: "Travel data", to: "/haiba/travel" },
      { label: "Reward code", to: "/haiba/code?kind=reward" },
      { label: "Reward used", to: "/haiba/code?kind=reward&state=used" },
    ],
  },
  {
    group: "Unipass gifts",
    items: [
      { label: "Pick a gift (new month)", to: "/haiba/unipass", freshGift: true },
      { label: "Gift used", to: "/haiba/unipass?view=used" },
      { label: "Month end, 3 days left", to: "/haiba/unipass?view=monthend" },
      { label: "Gift lost", to: "/haiba/unipass?view=lost" },
      { label: "Last gift of the year", to: "/haiba/unipass?view=last" },
      { label: "Gift code", to: "/haiba/code?kind=gift" },
    ],
  },
  {
    group: "Membership",
    items: [
      { label: "Membership", to: "/haiba/membership", need: "member_active" },
      { label: "Cancelled, year runs on", to: "/haiba/membership", need: "cancelled" },
      { label: "Last month, renew soon", to: "/haiba/membership", need: "renewal_due" },
      {
        label: "Last month, cancelled",
        to: "/haiba/membership",
        need: "cancelled_last_month",
      },
      { label: "Year ended", to: "/haiba/ended", need: "ended" },
      { label: "Receipts", to: "/haiba/receipts" },
      { label: "Subscriptions", to: "/haiba/subscriptions" },
      { label: "Subscription, all claimed", to: "/haiba/subscription?id=chatgpt&claimed=1" },
    ],
  },
  {
    group: "Savings and help",
    items: [
      { label: "Savings and activity", to: "/haiba/saved" },
      { label: "Help", to: "/haiba/help" },
    ],
  },
  {
    group: "Unipal app (core)",
    items: [
      { label: "Unipal home", to: "/" },
      { label: "Shop page", to: "/shop/coffee-bean" },
      { label: "Redeem offer", to: "/shop/coffee-bean/redeem" },
    ],
  },
  {
    group: "System states",
    items: [
      { label: "Loading", to: "/haiba/status?show=loading" },
      { label: "Empty", to: "/haiba/status?show=empty" },
      { label: "Error", to: "/haiba/status?show=error" },
      { label: "Offline", to: "/haiba/status?show=offline" },
      { label: "Bad user id", to: "/haiba/status?show=denied" },
      { label: "Unknown country", to: "/haiba/status?show=country" },
    ],
  },
];

const PAYWALLS = [
  ["A · Join copy", "/haiba/paywall/join"],
  ["B · Story", "/haiba/paywall/story"],
  ["C · Timeline", "/haiba/paywall/timeline"],
  ["Baseline (backup)", "/haiba/paywall/base"],
  ["Table (backup)", "/haiba/paywall/table"],
] as const;
const OLD_PROMOS = [
  ["Waitlist", "/haiba/promo/waitlist"],
  ["Value tiles", "/haiba/promo/value"],
  ["Compare", "/haiba/promo/compare"],
  ["Your year", "/haiba/promo/year"],
  ["12 picks", "/haiba/promo/dream"],
  ["Gift first", "/haiba/promo/gift"],
  ["Win back", "/haiba/promo/winback"],
] as const;
const PROMO_PRICES = ["20", "22", "24"];
const IDS: [string, string | number | undefined][] = [
  ["100245", 100245],
  ["100377", 100377],
  ["Missing", undefined],
  ["Edited", "100245abc"],
];

const TAB_KEY = "haiba-panel-tab";
const readTab = (): Tab => {
  try {
    const t = localStorage.getItem(TAB_KEY) as Tab | null;
    return t && TABS.some(([k]) => k === t) ? t : "journey";
  } catch {
    return "journey";
  }
};

export default function PrototypePanel() {
  const hb = useHaiba();
  const ses = useSession();
  const navigate = useRouterNavigate();
  const go = useGo();
  const acts = useJourneyActions();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("journey");
  const [find, setFind] = useState("");
  const [promoPrice, setPromoPrice] = useState("20");
  const s = hb.state;
  const st = s.settings;
  const c: Country = ses.c;
  const cur = CURRENCY[c];

  useEffect(() => setTab(readTab()), []);
  const pickTab = (t: Tab) => {
    setTab(t);
    try {
      localStorage.setItem(TAB_KEY, t);
    } catch {
      // per viewer convenience only
    }
  };

  // Which journey state the student is in now.
  const now: Preset = useMemo(() => {
    const j = s.journey;
    const lastMonth =
      j.renewsOn != null && startOf(ses.today) >= startOf(addMonths(j.renewsOn, -1));
    if (j.status === "member") return s.member === "new" ? "member_new" : "member_active";
    if (j.status === "cancelled") return lastMonth ? "cancelled_last_month" : "cancelled";
    if (j.status === "not_reserved" && ses.launched) return "not_reserved_after_launch";
    return j.status;
  }, [s.journey, s.member, ses.today, ses.launched]);

  // Change what the app passes, keep everything else in the URL.
  const param = (patch: Record<string, string | number | undefined>) =>
    navigate({
      to: ".",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search: ((prev: Record<string, unknown>) => ({ ...prev, ...patch })) as any,
      replace: true,
    });

  const setPreset = (p: Preset) => {
    const r = presetJourney(p, st, c, ses.offerPrice);
    hb.set({ journey: r.journey, member: r.member, settings: { ...st, today: r.today } });
  };
  const jump = (p: Preset) => {
    setPreset(p);
    setOpen(false);
    go(LAND[p] ?? pathFor(presetJourney(p, st, c, ses.offerPrice).journey.status));
  };
  const openScreen = (x: Screen) => {
    if (x.need && x.need !== now) setPreset(x.need);
    if (x.freshGift) hb.set({ gift: null }); // 9 Nov: start the month again, no gift picked yet
    setOpen(false);
    go(x.to);
  };
  const webhook = (outcome: "success" | "failed", twice = false) => {
    const to = acts.webhook(outcome, "declined");
    if (twice) acts.webhook(outcome, "declined"); // the second one is ignored
    setOpen(false);
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

  const q = find.trim().toLowerCase();
  const groups = SCREENS.map((g) => ({
    ...g,
    items: g.items.filter(
      (x) => !q || x.label.toLowerCase().includes(q) || x.to.toLowerCase().includes(q),
    ),
  })).filter((g) => g.items.length);
  const idNow = ses.userId ?? undefined;
  const pay = s.journey.payment;

  return (
    <>
      <button className="pp-open" onClick={() => setOpen(true)} aria-label="Open prototype panel">
        Prototype
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            key="pp-back"
            className="pp-back"
            data-tray-backdrop=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="pp"
              role="dialog"
              aria-modal="true"
              aria-label="Prototype panel"
              dir="ltr"
              initial={{ y: reduced ? 0 : "100%" }}
              animate={{ y: 0 }}
              exit={{ y: reduced ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pp-head">
                <span className="pp-grab" aria-hidden="true" />
                <div className="pp-title">
                  <div>
                    <b>Prototype</b>
                    <span>For the internal test. Students never see this.</span>
                  </div>
                  <button className="pp-x" aria-label="Close" onClick={() => setOpen(false)}>
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>
                <div className="pp-now">
                  <span className="pp-now-dot" aria-hidden="true" />
                  <b>{stepLabel(now)}</b>
                  <span>
                    {c === "bh" ? "Bahrain" : "Saudi"} · {ses.lang === "ar" ? "Arabic" : "English"}{" "}
                    · {ses.d(ses.today)}
                  </span>
                </div>
                <div className="pp-tabs" role="tablist">
                  {TABS.map(([k, label]) => (
                    <button
                      key={k}
                      role="tab"
                      aria-selected={tab === k}
                      className={tab === k ? "on" : ""}
                      onClick={() => pickTab(k)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pp-body">
                {tab === "journey" && (
                  <>
                    {pay && (
                      <Card title="Tap is waiting">
                        <p className="pp-hint">
                          A {pay.kind === "rest" ? "pay the rest" : pay.kind} payment of{" "}
                          {ses.m(pay.amount)} is waiting for the Tap webhook.
                        </p>
                        <div className="pp-row-btns">
                          <button className="pp-btn pp-btn-dark" onClick={() => webhook("success")}>
                            Paid
                          </button>
                          <button className="pp-btn" onClick={() => webhook("failed")}>
                            Failed
                          </button>
                          <button className="pp-btn" onClick={() => webhook("success", true)}>
                            Paid, sent twice
                          </button>
                        </div>
                      </Card>
                    )}

                    <Card title="What can happen next">
                      <div className="pp-next">
                        {(NEXT[now] ?? []).map((n) => (
                          <button
                            key={n.label}
                            className="pp-next-btn"
                            onClick={() => {
                              if (n.to) jump(n.to);
                              else if (n.open) {
                                setOpen(false);
                                go(n.open);
                              }
                            }}
                          >
                            <span>
                              <b>{n.label}</b>
                              <small>
                                {n.to
                                  ? "Goes to " + stepLabel(n.to)
                                  : (n.hint ?? "Opens the screen")}
                              </small>
                            </span>
                            <ArrowRight size={18} aria-hidden="true" />
                          </button>
                        ))}
                      </div>
                    </Card>

                    {FLOW.map((f, fi) => (
                      <div className="pp-phase" key={f.phase}>
                        <div className="pp-phase-head">
                          <span className="pp-phase-no">{fi + 1}</span>
                          <b>{f.phase}</b>
                          <span>{f.when}</span>
                        </div>
                        <ol className="pp-steps">
                          {f.steps.map((x) => (
                            <li
                              key={x.id}
                              className={(x.side ? "side " : "") + (x.id === now ? "now" : "")}
                            >
                              <button onClick={() => jump(x.id)}>
                                <span className="pp-step-dot" aria-hidden="true" />
                                <span className="pp-step-text">
                                  <b>{x.label}</b>
                                  <small>{x.note}</small>
                                </span>
                                {x.id === now ? (
                                  <span className="pp-here">Here</span>
                                ) : (
                                  <ChevronRight size={16} aria-hidden="true" />
                                )}
                              </button>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                    <p className="pp-hint">
                      Side paths are indented. Tapping a state sets the student and the prototype
                      clock, then opens that screen.
                    </p>
                  </>
                )}

                {tab === "screens" && (
                  <>
                    <label className="pp-search">
                      <Search size={16} aria-hidden="true" />
                      <input
                        value={find}
                        onChange={(e) => setFind(e.target.value)}
                        placeholder="Find a screen"
                        aria-label="Find a screen"
                      />
                    </label>
                    {groups.map((g) => (
                      <Card title={g.group} key={g.group} flush>
                        {g.items.map((x) => (
                          <button key={x.label} className="pp-li" onClick={() => openScreen(x)}>
                            <span className="pp-li-text">
                              <b>{x.label}</b>
                              {x.need && x.need !== now && <small>Sets: {stepLabel(x.need)}</small>}
                            </span>
                            <ChevronRight size={16} aria-hidden="true" />
                          </button>
                        ))}
                      </Card>
                    ))}
                    {!groups.length && <p className="pp-hint">No screen matches “{find}”.</p>}
                  </>
                )}

                {tab === "setup" && (
                  <>
                    <Card title="What the app passes">
                      <Seg
                        label="Country"
                        value={ses.country === "sa" ? "saudi" : "bahrain"}
                        options={[
                          ["bahrain", "Bahrain"],
                          ["saudi", "Saudi"],
                        ]}
                        onPick={(v) => param({ country: v })}
                      />
                      <Seg
                        label="Language"
                        value={ses.lang}
                        options={[
                          ["en", "English"],
                          ["ar", "Arabic"],
                        ]}
                        onPick={(v) => param({ lang: v })}
                      />
                      <Seg
                        label="Student id"
                        value={
                          IDS.find(
                            ([, id]) => (id == null ? undefined : String(id)) === idNow,
                          )?.[0] ?? ""
                        }
                        options={IDS.map(([l]) => [l, l] as [string, string])}
                        onPick={(v) => param({ user_id: IDS.find(([l]) => l === v)?.[1] })}
                      />
                      <p className="pp-hint">A missing or edited id shows the safe error page.</p>
                    </Card>

                    <Card title="Student">
                      <Seg
                        label="Unipal student status"
                        value={st.student}
                        options={[
                          ["verified", "Verified"],
                          ["unverified", "Not verified"],
                          ["expired", "Expired"],
                        ]}
                        onPick={(v) => hb.setSettings({ student: v as typeof st.student })}
                      />
                      <Seg
                        label="Page before reserving"
                        value={st.mainPromo}
                        options={[
                          ["join", "A Join"],
                          ["story", "B Story"],
                          ["timeline", "C Timeline"],
                          ["base", "Base"],
                          ["table", "Table"],
                        ]}
                        onPick={(v) => hb.setSettings({ mainPromo: v as typeof st.mainPromo })}
                      />
                    </Card>

                    <Card title={"Price in " + (c === "bh" ? "Bahrain" : "Saudi")}>
                      <Field label={`Prices on offer, ${cur} a year before VAT`}>
                        <input
                          key={c + st.prices[c].join(",")}
                          defaultValue={st.prices[c].join(", ")}
                          onBlur={(e) => setPrices(e.target.value)}
                        />
                      </Field>
                      <Seg
                        label="Price this student sees"
                        value={st.forcePrice[c] == null ? "r" : String(st.forcePrice[c])}
                        options={[
                          ["r", "Random"],
                          ...st.prices[c].map(
                            (p, i) => [String(i), `${cur} ${p}`] as [string, string],
                          ),
                        ]}
                        onPick={(v) =>
                          hb.setSettings({
                            forcePrice: { ...st.forcePrice, [c]: v === "r" ? null : Number(v) },
                          })
                        }
                      />
                      <div className="pp-fields">
                        <Field label="VAT %">
                          <input
                            type="number"
                            value={Math.round(st.vat[c] * 1000) / 10}
                            onChange={(e) =>
                              hb.setSettings({
                                vat: { ...st.vat, [c]: Math.max(0, Number(e.target.value)) / 100 },
                              })
                            }
                          />
                        </Field>
                        <Field label={"Deposit, " + cur}>
                          <input
                            type="number"
                            value={st.deposit[c]}
                            onChange={(e) =>
                              hb.setSettings({
                                deposit: {
                                  ...st.deposit,
                                  [c]: Math.max(0, Number(e.target.value)),
                                },
                              })
                            }
                          />
                        </Field>
                        <Field label="Spots cap">
                          <input
                            type="number"
                            value={st.spotsCap[c]}
                            onChange={(e) =>
                              hb.setSettings({
                                spotsCap: {
                                  ...st.spotsCap,
                                  [c]: Math.max(0, Math.round(Number(e.target.value))),
                                },
                              })
                            }
                          />
                        </Field>
                        <Field label="Spots taken">
                          <input
                            type="number"
                            value={st.spotsTaken[c]}
                            onChange={(e) =>
                              hb.setSettings({
                                spotsTaken: {
                                  ...st.spotsTaken,
                                  [c]: Math.max(0, Math.round(Number(e.target.value))),
                                },
                              })
                            }
                          />
                        </Field>
                      </div>
                    </Card>

                    <Card title="Dates">
                      <div className="pp-fields">
                        <Field label="Launch date">
                          <input
                            type="date"
                            value={st.launchDate}
                            onChange={(e) =>
                              e.target.value && hb.setSettings({ launchDate: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Reservations close">
                          <input
                            type="date"
                            value={st.reserveEnd}
                            onChange={(e) =>
                              e.target.value && hb.setSettings({ reserveEnd: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Hold days after launch">
                          <input
                            type="number"
                            value={st.holdDays}
                            onChange={(e) =>
                              hb.setSettings({
                                holdDays: Math.max(0, Math.round(Number(e.target.value))),
                              })
                            }
                          />
                        </Field>
                        <Field label="Today (prototype clock)">
                          <input
                            type="date"
                            value={st.today ?? ""}
                            onChange={(e) => hb.setSettings({ today: e.target.value || null })}
                          />
                        </Field>
                      </div>
                      <div className="pp-row-btns">
                        <button
                          className="pp-btn"
                          disabled={st.today == null}
                          onClick={() => hb.setSettings({ today: null })}
                        >
                          Use the real date
                        </button>
                        <button
                          className="pp-btn"
                          onClick={() => hb.set({ settings: DEFAULT_SETTINGS })}
                        >
                          <RotateCcw size={14} aria-hidden="true" /> Reset prices and dates
                        </button>
                      </div>
                    </Card>
                  </>
                )}

                {tab === "tests" && (
                  <>
                    <Card title="Paywall test (4 Nov)">
                      <Seg
                        label="Price shown"
                        value={promoPrice}
                        options={PROMO_PRICES.map((p) => [p, "BHD " + p] as [string, string])}
                        onPick={setPromoPrice}
                      />
                      {PAYWALLS.map(([label, to]) => (
                        <button
                          key={to}
                          className="pp-li"
                          onClick={() => {
                            setOpen(false);
                            go(`${to}?price=${promoPrice}`);
                          }}
                        >
                          <span className="pp-li-text">
                            <b>{label}</b>
                          </span>
                          <ChevronRight size={16} aria-hidden="true" />
                        </button>
                      ))}
                    </Card>
                    <Card title="Older promo tests (28 Oct)" flush>
                      {OLD_PROMOS.map(([label, to]) => (
                        <button
                          key={to}
                          className="pp-li"
                          onClick={() => {
                            setOpen(false);
                            go(to);
                          }}
                        >
                          <span className="pp-li-text">
                            <b>{label}</b>
                          </span>
                          <ChevronRight size={16} aria-hidden="true" />
                        </button>
                      ))}
                    </Card>
                    <Card title="Shop side">
                      <div className="pp-row-btns">
                        <button className="pp-btn" onClick={() => hb.acceptAll()}>
                          Shop accepts all held codes
                        </button>
                        <button
                          className="pp-btn"
                          disabled={s.travel !== "revealed"}
                          onClick={() => hb.redeemTravel()}
                        >
                          Airalo accepts the travel code
                        </button>
                      </div>
                    </Card>
                    <Card title="Reset">
                      <div className="pp-row-btns">
                        <button className="pp-btn" onClick={() => hb.resetStudent()}>
                          <RotateCcw size={14} aria-hidden="true" /> Reset points, codes and gifts
                        </button>
                        <button className="pp-btn" onClick={() => jump("not_reserved")}>
                          <RotateCcw size={14} aria-hidden="true" /> Back to not reserved
                        </button>
                      </div>
                    </Card>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Card({ title, children, flush }: { title: string; children: ReactNode; flush?: boolean }) {
  return (
    <section className={"pp-card" + (flush ? " pp-card-flush" : "")}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function Seg({
  label,
  value,
  options,
  onPick,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onPick: (v: string) => void;
}) {
  return (
    <div className="pp-seg-wrap">
      <span className="pp-label">{label}</span>
      <div className="pp-seg" role="radiogroup" aria-label={label}>
        {options.map(([v, l]) => (
          <button
            key={v}
            role="radio"
            aria-checked={value === v}
            className={value === v ? "on" : ""}
            onClick={() => onPick(v)}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="pp-field">
      <span className="pp-label">{label}</span>
      {children}
    </label>
  );
}
