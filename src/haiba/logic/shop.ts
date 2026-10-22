// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({
    ask: -1,
    codesQty: [0, 0, 0],
    cancelled: [],
    accepted: [],
    done: false,
  });
  useEffect(() => {}, []);

  var balance = props.base;
  var defs = [
    {
      name: "Free upsize",
      sub: "Any drink, one size up",
      pts: 300,
      value: 0.3,
      ph: "DRINK PHOTO",
      bg: "#EDE4FF",
      ink: "#4F25D6",
      code: "8K3Q",
    },
    {
      name: "Cookie",
      sub: "Chocolate chip or oat",
      pts: 700,
      value: 0.7,
      ph: "COOKIE PHOTO",
      bg: "#F6E7D2",
      ink: "#7A4E2D",
      code: "5TR2",
    },
    {
      name: "Regular drink",
      sub: "Hot or iced, regular size",
      pts: 1900,
      value: 1.9,
      ph: "DRINK PHOTO",
      bg: "#E3DCD6",
      ink: "#3B2A22",
      code: "9MX7",
    },
  ];
  var cq = (state.codesQty || [0, 0, 0]).slice();
  while (cq.length < 3) cq.push(0);
  var cancelled = state.cancelled || [];
  var accepted = state.accepted || [];
  var committed = 0;
  defs.forEach(function (d, i) {
    for (var k = 0; k < cq[i]; k++) {
      if (cancelled.indexOf(i + "-" + k) < 0) committed += d.pts;
    }
  });
  var left = balance - committed;
  var items = defs.map(function (d, i) {
    var last = -1;
    for (var k = cq[i] - 1; k >= 0; k--) {
      if (cancelled.indexOf(i + "-" + k) < 0) {
        last = k;
        break;
      }
    }
    var id = i + "-" + last;
    var held = last >= 0 && accepted.indexOf(id) < 0;
    var used = last >= 0 && !held;
    var can = d.pts <= left;
    var asking = state.ask === i && !held;
    var usedCount = 0;
    for (var k3 = 0; k3 < cq[i]; k3++) {
      if (accepted.indexOf(i + "-" + k3) >= 0) usedCount++;
    }
    return {
      name: d.name,
      sub:
        !can && !held && !used
          ? (d.pts - left).toLocaleString("en-US") + " more points needed"
          : d.sub,
      pts: d.pts.toLocaleString("en-US") + " points",
      ptsShort: d.pts.toLocaleString("en-US"),
      ph: d.ph,
      bg: d.bg,
      ink: d.ink,
      ptsBg: can || held || used ? "#F0ECFF" : "#F1F1F4",
      ptsInk: can || held || used ? "#4F25D6" : "var(--hb-muted-ink)",
      showUse: !held && !used && !asking,
      isUsed: used && !asking,
      held: held,
      asking: asking,
      askLine:
        "Use " +
        d.pts.toLocaleString("en-US") +
        " points for a " +
        d.name.toLowerCase() +
        "? Your code shows here.",
      useLabel: "Use " + d.pts + " points for " + d.name,
      btnBg: can ? "#1E1B2E" : "#E4E4EA",
      btnInk: can ? "#C0F402" : "#8A8A96",
      cursor: can ? "pointer" : "default",
      code: "HB-" + d.code + "-" + (last + 1),
      savedLine: "You saved BHD " + (d.value * usedCount).toFixed(2),
      againOp: can ? "1" : "0.4",
      rule: i === defs.length - 1 ? "none" : "1px solid #EFEFF3",
      ask: function () {
        if (can) setState({ ask: i });
      },
      notNow: function () {
        setState({ ask: -1 });
      },
      confirm: function () {
        var n = cq.slice();
        n[i] = n[i] + 1;
        setState({ ask: -1, codesQty: n, done: true });
      },
      cancel: function () {
        setState({ cancelled: cancelled.concat([id]) });
      },
      accept: function () {
        setState({ accepted: accepted.concat([id]) });
      },
      again: function () {
        if (can) setState({ ask: i });
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
  };
}
