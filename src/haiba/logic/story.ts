// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ step: 0, dir: "r", gift: -1 });
  useEffect(() => {}, []);

  var st = state.step;
  var g = state.gift;
  var go = function (k) {
    return function () {
      setState({ step: k, dir: k > st ? "r" : "l" });
    };
  };
  var stamps = [
    { tag: "2x", pts: "80", bg: "#6C3FFA", ink: "#FFFFFF", ring: "#6C3FFA" },
    { tag: "2x", pts: "80", bg: "#6C3FFA", ink: "#FFFFFF", ring: "#6C3FFA" },
    { tag: "", pts: "40", bg: "#6C3FFA", ink: "#FFFFFF", ring: "#6C3FFA" },
    { tag: "", pts: "40", bg: "#FFFFFF", ink: "#6C3FFA", ring: "#D9CCFF" },
    { tag: "5x", pts: "200", bg: "#C0F402", ink: "#1F2600", ring: "#C0F402" },
  ];
  var giftDefs = [
    { brand: "Wingman", item: "Student box", bg: "#F9F9F9", logo: "/haiba/brands/wingman.webp" },
    { brand: "VOX Cinemas", item: "Cinema ticket", bg: "#FFFFFF", logo: "/haiba/brands/vox.webp" },
    { brand: "Grip", item: "Gym day pass", bg: "#000000", logo: "/haiba/brands/grip.webp" },
    { brand: "Albayan", item: "Perfume 100ml", bg: "#FFFFFF", logo: "/haiba/brands/albayan.webp" },
  ];
  var gifts = giftDefs.map(function (d, k) {
    var sel = k === g;
    var dim = g >= 0 && !sel;
    return Object.assign({}, d, {
      selStr: String(sel),
      tickDisp: sel ? "flex" : "none",
      scale: sel ? "1.04" : dim ? "0.96" : "1",
      shadow: sel
        ? "0 0 0 3px #6C3FFA, 0 12px 22px rgba(30,27,46,0.18)"
        : "0 0 0 1px #ECE8F5, 0 6px 14px rgba(30,27,46,0.08)",
      pick: function () {
        setState({ gift: sel ? -1 : k });
      },
    });
  });
  return {
    s0: st === 0,
    s1: st === 1,
    s2: st === 2,
    s3: st === 3,
    stepLabel:
      ["Earn points", "Bonus visits", "Spend points", "Unipass gift"][st] +
      " · " +
      (st + 1) +
      " of 4",
    inClass: state.dir === "r" ? "hb-in-r" : "hb-in-l",
    stamps: stamps,
    gifts: gifts,
    pickLabel: g >= 0 ? giftDefs[g].item + " picked. Nice." : "Pick 1 this month",
    pickBg: g >= 0 ? "#1E1B2E" : "#C0F402",
    pickInk: g >= 0 ? "#C0F402" : "#1F2600",
    dashes: [0, 1, 2, 3].map(function (k) {
      return {
        label: "Step " + (k + 1),
        bg: k <= st ? "#1E1B2E" : "rgba(30,27,46,0.16)",
        go: go(k),
      };
    }),
    backOp: st === 0 ? "0.4" : "1",
    cta: st === 3 ? "Got it, thanks" : "Next",
    next: function () {
      if (st === 3) {
        nav("/haiba");
      } else {
        setState({ step: st + 1, dir: "r" });
      }
    },
    prev: function () {
      if (st > 0) setState({ step: st - 1, dir: "l" });
    },
  };
}
