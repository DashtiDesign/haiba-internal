import type React from "react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * One shared state for the whole Haiba prototype.
 * Member status, the basket, codes and what the shop accepted all live here,
 * so every screen shows the same numbers.
 * Points rules and rewards come from src/haiba/data/haiba-fake-data.json.
 */

export type Member = "none" | "new" | "active";

export type HaibaState = {
  member: Member;
  visit: 1 | 3 | 5; // which visit the Redeem screen shows
  qty: number[]; // basket draft, one count per Coffee Bean reward
  done: boolean; // basket confirmed, codes made
  codesQty: number[] | null; // the basket that made the current codes
  cancelled: string[]; // code ids cancelled, points back
  accepted: string[]; // code ids the shop accepted
};

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
};

const KEY = "haiba-prototype-v1";

function load(): HaibaState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...INITIAL, ...JSON.parse(raw) };
  } catch (e) {
    /* storage blocked, start fresh */
  }
  return INITIAL;
}

type Api = {
  ready: boolean; // saved state has loaded in the browser
  state: HaibaState;
  base: number; // points before any codes
  available: number; // points not held in codes or used
  liveCodes: number; // codes held and not yet accepted by the shop
  liveCodeIds: string[]; // ids of those codes, item-index plus count, for example 0-1
  savedRewards: number; // BHD value of rewards the shop accepted
  set: (patch: Partial<HaibaState>) => void;
  join: () => void;
  setMember: (m: Member) => void;
  acceptAll: () => void;
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

  const api: Api = {
    ready,
    state: s,
    base,
    available: base - committed,
    liveCodes: liveIds.length,
    liveCodeIds: liveIds,
    savedRewards: acceptedPoints / 1000,
    set: (patch) => setS((p) => ({ ...p, ...patch })),
    join: () => setS((p) => ({ ...INITIAL, visit: p.visit, member: "new" })),
    setMember: (m) => setS((p) => ({ ...INITIAL, visit: p.visit, member: m })),
    acceptAll: () =>
      setS((p) => ({ ...p, accepted: Array.from(new Set([...p.accepted, ...liveIds])) })),
    reset: () => setS(INITIAL),
  };

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useHaiba(): Api {
  const v = useContext(Ctx);
  if (!v) throw new Error("useHaiba must be used inside HaibaProvider");
  return v;
}
