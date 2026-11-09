import type React from "react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_SETTINGS, type Settings } from "./journey/settings";
import { EMPTY_JOURNEY, type Journey } from "./journey/states";

/**
 * One shared state for the whole Haiba prototype.
 * Member status, the basket, codes and what the shop accepted all live here,
 * so every screen shows the same numbers.
 * Points rules and rewards come from src/haiba/data/haiba-fake-data.json.
 */

export type Member = "none" | "new" | "active";
export type Market = "bh" | "sa";
export type Travel = "available" | "revealed" | "redeemed";
/** This month's Hadiya (9 Nov): picked (code showing) or used at the shop. A new month starts empty. */
export type GiftPick = { id: string; status: "active" | "used"; month: string; on: string };
/**
 * A reward code made with points (9 Nov). Active while it shows, used once the shop takes it.
 * A code that runs out or is cancelled is removed and its points come back.
 * "gone" only marks the sample hub code as done, so it stops showing.
 */
export type RewardCode = {
  id: string;
  shop: string;
  item: string;
  pts: number;
  value: number;
  img: string;
  logo: string;
  mark: string;
  bg: string;
  status: "active" | "used" | "gone";
  on: string;
};

export type HaibaState = {
  member: Member;
  visit: 1 | 3 | 5; // which visit the Redeem screen shows
  qty: number[]; // basket draft, one count per Coffee Bean reward
  done: boolean; // basket confirmed, codes made
  codesQty: number[] | null; // the basket that made the current codes
  cancelled: string[]; // code ids cancelled, points back
  accepted: string[]; // code ids the shop accepted
  market: Market; // the member's home country, follows the country parameter from the app
  travel: Travel; // free Airalo plan: available, code revealed, or used at Airalo
  settings: Settings; // prices, VAT, deposit, hold days, launch date. Screens never hardcode these.
  journey: Journey; // where the student is: reservation, payment, membership
  gift: GiftPick | null; // this month's Hadiya, see journey/gift.ts
  giftEver: boolean; // has used a Hadiya before: the hub shows the small gift card from then on
  rewardCodes: RewardCode[]; // reward codes made on Your points, see journey/codes.ts
};

// Value of the free Airalo plan once it is used, added to "You saved".
export const TRAVEL_SAVED = 5.64;

// Coffee Bean rewards, same order as the Shop and Basket screens.
export const REWARD_POINTS = [300, 700, 1900];

// Starting balances for the prototype.
export const BASE_POINTS: Record<Member, number> = { none: 0, new: 500, active: 1240 };

const INITIAL: HaibaState = {
  member: "none",
  visit: 1,
  qty: [0, 0, 0],
  done: false,
  codesQty: null,
  cancelled: [],
  accepted: [],
  market: "bh",
  travel: "available",
  settings: DEFAULT_SETTINGS,
  journey: EMPTY_JOURNEY,
  gift: null,
  giftEver: false,
  rewardCodes: [],
};

const KEY = "haiba-prototype-v2";

function load(): HaibaState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      return {
        ...INITIAL,
        ...saved,
        settings: { ...DEFAULT_SETTINGS, ...(saved.settings || {}) },
        journey: { ...EMPTY_JOURNEY, ...(saved.journey || {}) },
      };
    }
  } catch (e) {
    /* storage blocked, start fresh */
  }
  return INITIAL;
}

// Prototype setup that survives a member switch: visit, home country, settings and journey.
const keep = (p: HaibaState) => ({
  visit: p.visit,
  market: p.market,
  settings: p.settings,
  journey: p.journey,
});

type Api = {
  ready: boolean; // saved state has loaded in the browser
  state: HaibaState;
  base: number; // points before any codes
  available: number; // points not held in codes or used
  liveCodes: number; // codes held and not yet accepted by the shop
  liveCodeIds: string[]; // ids of those codes, item-index plus count, for example 0-1
  savedRewards: number; // BHD value of rewards the shop accepted
  savedTravel: number; // BHD 5.64 once the Airalo code is used
  heldPts: number; // points in reward codes (showing or used)
  set: (patch: Partial<HaibaState>) => void;
  join: () => void;
  setMember: (m: Member) => void;
  setJourney: (patch: Partial<Journey>) => void;
  setSettings: (patch: Partial<Settings>) => void;
  resetStudent: () => void;
  acceptAll: () => void;
  redeemTravel: () => void;
  reset: () => void;
};

// Keep one context across hot reloads so screens never lose the provider.
const g = globalThis as unknown as { __haibaCtx?: React.Context<Api | null> };
const Ctx = (g.__haibaCtx ??= createContext<Api | null>(null));

export function HaibaProvider({ children }: { children: ReactNode }) {
  // The page is server rendered, so saved state loads after the first render in the browser.
  const [s, setS] = useState<HaibaState>(INITIAL);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setS(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch (e) {
      /* ignore */
    }
  }, [s, ready]);

  const base = BASE_POINTS[s.member];
  let committed = 0;
  const liveIds: string[] = [];
  let acceptedPoints = 0;
  if (s.done && s.codesQty) {
    s.codesQty.forEach((n, i) => {
      for (let k = 0; k < n; k++) {
        const id = i + "-" + k;
        if (s.cancelled.includes(id)) continue;
        committed += REWARD_POINTS[i] ?? 0;
        if (!s.accepted.includes(id)) liveIds.push(id);
        else acceptedPoints += REWARD_POINTS[i] ?? 0;
      }
    });
  }

  // Reward codes made on Your points hold their points; used ones count as saved.
  let heldPts = 0;
  let codeSaved = 0;
  (s.rewardCodes || []).forEach((c) => {
    if (c.status === "gone") return;
    heldPts += c.pts;
    if (c.status === "used") codeSaved += c.value;
  });

  const api: Api = {
    ready,
    state: s,
    base,
    available: base - committed - heldPts,
    heldPts,
    liveCodes: liveIds.length,
    liveCodeIds: liveIds,
    savedRewards: acceptedPoints / 1000 + codeSaved,
    savedTravel: s.travel === "redeemed" ? TRAVEL_SAVED : 0,
    set: (patch) => setS((p) => ({ ...p, ...patch })),
    setJourney: (patch) => setS((p) => ({ ...p, journey: { ...p.journey, ...patch } })),
    setSettings: (patch) => setS((p) => ({ ...p, settings: { ...p.settings, ...patch } })),
    resetStudent: () =>
      setS((p) => ({ ...INITIAL, visit: p.visit, market: p.market, settings: p.settings })),
    join: () => setS((p) => ({ ...INITIAL, ...keep(p), member: "new" })),
    setMember: (m) => setS((p) => ({ ...INITIAL, ...keep(p), member: m })),
    acceptAll: () =>
      setS((p) => ({ ...p, accepted: Array.from(new Set([...p.accepted, ...liveIds])) })),
    redeemTravel: () => setS((p) => (p.travel === "revealed" ? { ...p, travel: "redeemed" } : p)),
    reset: () => setS(INITIAL),
  };

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useHaiba(): Api {
  const v = useContext(Ctx);
  if (!v) throw new Error("useHaiba must be used inside HaibaProvider");
  return v;
}
