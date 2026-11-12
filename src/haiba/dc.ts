// @ts-nocheck
import { useContext, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useNavigate } from "./nav";
import { useHaiba } from "./store";
import { useSession } from "./journey/session";
import { useJourneyActions } from "./journey/actions";
import { PromoModeContext } from "./journey/promoMode";
import { giftNow } from "./journey/gift";
import { activeCodes } from "./journey/codes";

// Keys that are shared across screens. Everything else is local to a screen.
const SHARED = ["qty", "done", "codesQty", "cancelled", "accepted", "travel"];

const VISIT_LABEL = { 1: "1st visit at this shop", 3: "3rd visit", 5: "5th visit" };

const TRAVEL_LABEL = { available: "Available", revealed: "Code shown", redeemed: "Used at Airalo" };

/**
 * Gives each ported screen the same state, setState and props it had on the design canvas,
 * so the screen logic stays 1:1 with the design. Shared keys read and write the Haiba store.
 */
export function useDC(initial) {
  const hb = useHaiba();
  const nav = useNavigate();
  const s = useSession();
  const a = useJourneyActions();
  const mode = useContext(PromoModeContext);
  const [local, setLocal] = useState(initial);

  const state = { ...local };
  SHARED.forEach((k) => {
    state[k] = hb.state[k];
  });

  const setState = (patch) => {
    const shared = {};
    const own = {};
    Object.keys(patch).forEach((k) => {
      (SHARED.includes(k) ? shared : own)[k] = patch[k];
    });
    if (Object.keys(shared).length) hb.set(shared);
    if (Object.keys(own).length) setLocal((l) => ({ ...l, ...own }));
  };

  // Promo page tests read their setup from the URL: ?price=18&name=Yusuf&visits=4
  // Read through the router so the server render and the first client render agree (no price flash).
  const q = useRouterState({ select: (r) => r.location.search }) || {};

  // 9 Nov: this month's Hadiya, for the hub card and its savings.
  const gn = giftNow(hb.state.gift, s.today);

  const props = {
    member: hb.state.member === "new" ? "New member" : "Active member",
    visit: VISIT_LABEL[hb.state.visit],
    available: hb.available,
    base: hb.base,
    codes: hb.liveCodes,
    codeIds: hb.liveCodeIds,
    savedRewards: hb.savedRewards,
    market: hb.state.market === "sa" ? "Saudi" : "Bahrain",
    plan: "Yearly", // one yearly plan only
    travelStatus: TRAVEL_LABEL[hb.state.travel],
    savedTravel: hb.savedTravel,
    giftStatus: gn.status === "active" ? "Code ready" : gn.status === "used" ? "Used" : "Pick",
    giftItem: gn.gift?.item,
    giftBrand: gn.brand?.name,
    giftValue: gn.gift?.value,
    giftLogo: gn.brand?.logo,
    giftLogoBg: gn.brand?.bg,
    // the big gift card shows until the first gift is used; an active member has used gifts before
    giftFirst: !(hb.state.member === "active" || hb.state.giftEver),
    // 9 Nov: every code that is showing, one list for the hub and Your points (journey/codes.ts)
    activeCodes: activeCodes(hb, s.today),
    heldPts: hb.heldPts,
    // Promo pages: the student's own price, money, deposit and launch come from the prototype settings.
    // ?price= in the URL still overrides the price for previews.
    price: q.price != null ? String(q.price) : String(s.price),
    currency: s.c === "sa" ? "SAR" : "BHD",
    deposit: String(s.deposit),
    launch: s.d(s.launch),
    onReserve: () => a.startPayment("deposit"),
    mode, // "Join" after launch: the same promo page, full price with VAT, no deposit
    total: String(s.total),
    onJoin: () => a.startPayment("join"),
    name: q.name != null ? String(q.name) : undefined,
    visits: q.visits != null ? String(q.visits) : undefined,
    shop: q.shop != null ? String(q.shop) : undefined,
    state: q.state != null ? String(q.state) : undefined,
    welcome: q.welcome != null ? String(q.welcome) : undefined, // 11 Nov smaller Haiba pages: welcome points
    today: hb.state.settings.today ?? undefined, // prototype clock; the canvas falls back to the real date
  };

  return { state, setState, props, nav };
}
