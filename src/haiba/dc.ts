// @ts-nocheck
import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useNavigate } from "./nav";
import { useHaiba } from "./store";

// Keys that are shared across screens. Everything else is local to a screen.
const SHARED = ["qty", "done", "codesQty", "cancelled", "accepted"];

const VISIT_LABEL = { 1: "1st visit at this shop", 3: "3rd visit", 5: "5th visit" };

/**
 * Gives each ported screen the same state, setState and props it had on the design canvas,
 * so the screen logic stays 1:1 with the design. Shared keys read and write the Haiba store.
 */
export function useDC(initial) {
  const hb = useHaiba();
  const nav = useNavigate();
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

  // Promo page tests read their setup from the URL: ?price=18&name=Sara&visits=4
  // Read through the router so the server render and the first client render agree (no price flash).
  const q = useRouterState({ select: (r) => r.location.search }) || {};

  const props = {
    member: hb.state.member === "new" ? "New member" : "Active member",
    visit: VISIT_LABEL[hb.state.visit],
    available: hb.available,
    base: hb.base,
    codes: hb.liveCodes,
    codeIds: hb.liveCodeIds,
    savedRewards: hb.savedRewards,
    price: q.price != null ? String(q.price) : undefined,
    name: q.name != null ? String(q.name) : undefined,
    visits: q.visits != null ? String(q.visits) : undefined,
  };

  return { state, setState, props, nav };
}
