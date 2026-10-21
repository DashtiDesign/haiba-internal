// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({
    qty: [1, 1],
    done: false,
    cancelled: [],
    accepted: [],
  });
  useEffect(() => {}, []);

  var balance = props.base;
  var defs = [
    { name: "Free upsize", pts: 300, value: 0.3, ph: "DRINK PHOTO", bg: "#EDE4FF", ink: "#4F25D6" },
    { name: "Cookie", pts: 700, value: 0.7, ph: "COOKIE PHOTO", bg: "#F6E7D2", ink: "#7A4E2D" },
    {
      name: "Regular drink",
      pts: 1900,
      value: 1.9,
      ph: "DRINK PHOTO",
      bg: "#E3DCD6",
      ink: "#3B2A22",
    },
  ];
  var draft = (state.qty || []).reduce(function (a, b) {
    return a + b;
  }, 0);
  var showDone = state.done && draft === 0;
  var q = showDone ? state.codesQty || state.qty : state.qty;
  var used = 0,
    count = 0;
  defs.forEach(function (d, i) {
    used += d.pts * q[i];
    count += q[i];
  });
  var left = balance - used;
  var items = [];
  defs.forEach(function (d, i) {
    if (q[i] === 0) return;
    var can = d.pts <= left;
    items.push({
      name: d.name,
      ph: d.ph,
      bg: d.bg,
      ink: d.ink,
      qty: String(q[i]),
      line:
        (d.pts * q[i]).toLocaleString("en-US") +
        " points" +
        (q[i] > 1 ? " · " + q[i] + " codes" : " · 1 code"),
      addOp: can ? "1" : "0.35",
      rule: "1px solid #EFEFF3",
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
    });
  });
  if (items.length) items[items.length - 1].rule = "none";
  var codes = [];
  var cancelled = state.cancelled,
    accepted = state.accepted;
  var serial = 0,
    savedNow = 0,
    heldNow = 0,
    usedNow = 0;
  defs.forEach(function (d, i) {
    for (var k = 0; k < q[i]; k++) {
      var id = i + "-" + k;
      var gone = cancelled.indexOf(id) >= 0;
      var acc = accepted.indexOf(id) >= 0;
      var live = !gone && !acc;
      serial++;
      if (acc) {
        savedNow += d.value;
        usedNow += d.pts;
      }
      if (live) heldNow += d.pts;
      var P = d.pts.toLocaleString("en-US");
      codes.push({
        kind: "Code " + serial + " of " + count,
        name: d.name,
        pts: P,
        ph: d.ph,
        ptsLine: gone ? P + " points returned" : acc ? P + " points used" : P + " points held",
        code: "HB-" + (7 + serial) + "K" + (2 + serial) + "Q-" + (9 - serial) + "X",
        live: live,
        gone: gone,
        acc: acc,
        saved: "BHD " + d.value.toFixed(2),
        status: gone ? "Cancelled" : acc ? "Accepted" : "Ready",
        bg: gone
          ? "#FFFFFF"
          : acc
            ? "#C0F402"
            : "linear-gradient(135deg, #6C3FFA 0%, #4F25D6 100%)",
        ink: gone ? "#6B6B78" : acc ? "#1F2600" : "#FFFFFF",
        shadow: gone
          ? "none"
          : acc
            ? "0 14px 30px rgba(140,180,0,0.35)"
            : "0 14px 30px rgba(108,63,250,0.28)",
        ringLine: gone ? "#E4E4EA" : acc ? "rgba(31,38,0,0.18)" : "rgba(192,244,2,0.35)",
        pillBg: gone ? "#F1F1F4" : acc ? "#1F2600" : "#C0F402",
        pillInk: gone ? "#6B6B78" : acc ? "#C0F402" : "#1F2600",
        phBg: gone ? "#F1F1F4" : acc ? "rgba(31,38,0,0.1)" : "rgba(255,255,255,0.18)",
        phInk: gone ? "#8A8A96" : acc ? "#1F2600" : "#FFFFFF",
        cancel: (function (id) {
          return function () {
            setState({ cancelled: cancelled.concat([id]) });
          };
        })(id),
        accept: (function (id) {
          return function () {
            setState({ accepted: accepted.concat([id]) });
          };
        })(id),
      });
    }
  });
  var empty = count === 0;
  return {
    editing: !showDone,
    done: showDone,
    items: items,
    empty: empty,
    usedLine: used.toLocaleString("en-US") + " points",
    leftLine: left.toLocaleString("en-US") + " points",
    pct: Math.round((used / balance) * 100) + "%",
    ctaTitle: empty
      ? "Add items first"
      : "Confirm and get " + count + (count === 1 ? " code" : " codes"),
    ctaSub: empty
      ? "Your basket is empty"
      : used.toLocaleString("en-US") + " points will be held, not spent",
    ctaBg: empty ? "#E4E4EA" : "#1E1B2E",
    ctaInk: empty ? "#8A8A96" : "#C0F402",
    confirm: function () {
      if (!empty)
        setState({ done: true, cancelled: [], accepted: [], codesQty: q, qty: [0, 0, 0] });
    },
    reset: function () {
      setState({ done: false, cancelled: [], accepted: [], qty: [0, 0, 0], codesQty: null });
      nav("/shop/coffee-bean");
    },
    heroSrc: accepted.length ? "/haiba/birds/15-receipt.png" : "/haiba/birds/13-fist.png",
    heldBadge:
      savedNow > 0
        ? "You saved BHD " + savedNow.toFixed(2)
        : heldNow.toLocaleString("en-US") + " points held",
    doneTitle: "Your " + (count === 1 ? "code is" : count + " codes are") + " ready",
    codes: codes,
    haveLine: balance.toLocaleString("en-US") + " points",
    walletLine: (balance - heldNow - usedNow).toLocaleString("en-US") + " points free to use",
    walletSub:
      heldNow.toLocaleString("en-US") +
      " held in codes" +
      (usedNow ? ", " + usedNow.toLocaleString("en-US") + " used" : "") +
      ". Cancel a code to get them back.",
  };
}
