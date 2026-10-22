// @ts-nocheck
import { useState } from "react";
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

  const props = {
    member: hb.state.member === "new" ? "New member" : "Active member",
    visit: VISIT_LABEL[hb.state.visit],
    available: hb.available,
    base: hb.base,
    codes: hb.liveCodes,
    codeIds: hb.liveCodeIds,
    savedRewards: hb.savedRewards,
  };

  return { state, setState, props, nav };
}
