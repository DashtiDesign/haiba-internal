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
    { mark: "J", item: "Free meal", bg: "#D62828", ink: "#FFFFFF" },
    { mark: "V", item: "Cinema ticket", bg: "#1E1B2E", ink: "#FFFFFF" },
    { mark: "CB", item: "Free drink", bg: "#4B2E83", ink: "#FFFFFF" },
    { mark: "F", item: "Bowling", bg: "#FFB703", ink: "#1E1B2E" },
  ];
  var gifts = giftDefs.map(function (d, k) {
    var sel = k === g;
    var dim = g >= 0 && !sel;
    return Object.assign({}, d, {
      selStr: String(sel),
      scale: sel ? "1.06" : dim ? "0.94" : "1",
      shadow: sel
        ? "0 0 0 4px #C0F402, 0 12px 22px rgba(30,27,46,0.22)"
        : "0 8px 16px rgba(30,27,46,0.12)",
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
    stepLabel: st + 1 + " of 4",
    inClass: state.dir === "r" ? "hb-in-r" : "hb-in-l",
    stamps: stamps,
    gifts: gifts,
    pickLabel: g >= 0 ? giftDefs[g].item + " picked. Nice." : "Pick 1 this month",
    pickBg: g >= 0 ? "#1E1B2E" : "#C0F402",
    pickInk: g >= 0 ? "#C0F402" : "#1F2600",
    dashes: [0, 1, 2, 3].map(function (k) {
      return {
        label: "Step " + (k + 1),
        w: k === st ? "40px" : "18px",
        bg: k === st ? "#1E1B2E" : "#CFC8E6",
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
