// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ qty: [0, 0, 0] });
  useEffect(() => {}, []);

  var balance = props.available;
  var defs = [
    {
      name: "Free upsize",
      sub: "Any drink, one size up",
      pts: 300,
      ph: "DRINK PHOTO",
      bg: "#EDE4FF",
      ink: "#4F25D6",
    },
    {
      name: "Cookie",
      sub: "Chocolate chip or oat",
      pts: 700,
      ph: "COOKIE PHOTO",
      bg: "#F6E7D2",
      ink: "#7A4E2D",
    },
    {
      name: "Regular drink",
      sub: "Hot or iced, regular size",
      pts: 1900,
      ph: "DRINK PHOTO",
      bg: "#E3DCD6",
      ink: "#3B2A22",
    },
  ];
  var q = state.qty;
  var used = 0,
    count = 0;
  defs.forEach(function (d, i) {
    used += d.pts * q[i];
    count += q[i];
  });
  var left = balance - used;
  var items = defs.map(function (d, i) {
    var can = d.pts <= left;
    var zero = q[i] === 0;
    var short = d.pts - left;
    return {
      name: d.name,
      sub: zero && !can ? short.toLocaleString("en-US") + " more points needed" : d.sub,
      pts: d.pts.toLocaleString("en-US") + " points",
      ph: d.ph,
      bg: d.bg,
      ink: d.ink,
      ptsBg: can || !zero ? "#F0ECFF" : "#F1F1F4",
      ptsInk: can || !zero ? "#4F25D6" : "var(--hb-muted-ink)",
      op: "1",
      zero: zero,
      some: !zero,
      qty: String(q[i]),
      btnBg: can ? "#1E1B2E" : "#E4E4EA",
      btnInk: can ? "#C0F402" : "#8A8A96",
      addLabel: "Add " + d.name,
      addOp: can ? "1" : "0.35",
      rule: i === defs.length - 1 ? "none" : "1px solid #EFEFF3",
      add: function () {
        if (!can) return;
        var n = q.slice();
        n[i]++;
        setState({ qty: n });
      },
      remove: function () {
        var n = q.slice();
        if (n[i] > 0) n[i]--;
        setState({ qty: n });
      },
    };
  });
  var visitNow = 2;
  var stampPts = [80, 80, 40, 40, 200];
  var stamps = stampPts.map(function (pts, k) {
    var n = k + 1,
      done = n < visitNow,
      now = n === visitNow,
      five = n === 5;
    return {
      tag: done ? "✓" : now ? "2x" : five ? "5x" : "",
      pts: String(pts),
      bg: done ? "#FFFFFF" : now ? "#C0F402" : "#5B33E8",
      ink: done ? "#4F25D6" : now ? "#1F2600" : "#C0F402",
      ring: done ? "#FFFFFF" : now ? "#C0F402" : five ? "#C0F402" : "rgba(255,255,255,0.35)",
      glow: now ? "0 0 0 5px rgba(192,244,2,0.25)" : "none",
      labelInk: done || now ? "#FFFFFF" : "#CFC2FF",
    };
  });
  return {
    stamps: stamps,
    visitPill: "Visit " + visitNow + " of 5 here",
    visitLine: "Your next visit earns 2x",
    visitSub: "That is 80 points instead of 40.",
    offerPts: "+80",
    balance: left.toLocaleString("en-US"),
    items: items,
    hasBasket: count > 0,
    basketLine:
      count + (count === 1 ? " item" : " items") + " · " + used.toLocaleString("en-US") + " points",
    basketSub: left.toLocaleString("en-US") + " points left after this",
  };
}
