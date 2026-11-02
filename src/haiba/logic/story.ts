// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ step: 0, gift: -1 });
  useEffect(() => {}, []);

  var st = state.step;
  var g = state.gift;
  var N = 5;
  var go = function (k) {
    return function () {
      setState({ step: k });
    };
  };
  var giftDefs = [
    { brand: "Wingman", item: "Student box", bg: "#F9F9F9", logo: "/haiba/brands/wingman.webp" },
    { brand: "VOX Cinemas", item: "Cinema ticket", bg: "#FFFFFF", logo: "/haiba/brands/vox.webp" },
    { brand: "Grip", item: "Gym day pass", bg: "#000000", logo: "/haiba/brands/grip.webp" },
    { brand: "Albayan", item: "Perfume", bg: "#FFFFFF", logo: "/haiba/brands/albayan.webp" },
  ];
  var subs = [
    "Here is how it works. It takes 20 seconds.",
    "They land on their own. Nothing to scan.",
    "Counted per shop, like a stamp card.",
    "Pick a reward. Show the code at the shop.",
    g >= 0 ? giftDefs[g].item + " picked. Nice choice." : "Your Unipass gift. Tap one to try.",
  ];
  // stamps sit on an arc above the bird
  var arc = [205, 237.5, 270, 302.5, 335];
  var defs = [
    { tag: "2x", pts: "+80", on: true },
    { tag: "2x", pts: "+80", on: true },
    { tag: "✓", pts: "+40", on: true },
    { tag: "", pts: "+40", on: false },
    { tag: "5x", pts: "+200", big: true },
  ];
  var stamps = defs.map(function (d, k) {
    var a = (arc[k] * Math.PI) / 180;
    var size = d.big ? 62 : 50;
    var cx = 195 + 152 * Math.cos(a),
      cy = 458 + 118 * Math.sin(a);
    return {
      x: Math.round(cx - size / 2),
      y: Math.round(cy - size / 2),
      size: size,
      delay: "hb-d" + (k + 1),
      tag: d.tag,
      pts: d.pts,
      fs: d.big ? 20 : 16,
      bg: d.big ? "#C0F402" : d.on ? "#6C3FFA" : "rgba(255,255,255,0.7)",
      ink: d.big ? "#1F2600" : "#FFFFFF",
      ring: d.big ? "#1E1B2E" : d.on ? "#6C3FFA" : "#B9A7F5",
      style: d.on || d.big ? "solid" : "dashed",
      shadow: d.big
        ? "0 10px 22px rgba(30,27,46,0.25)"
        : d.on
          ? "0 6px 14px rgba(108,63,250,0.30)"
          : "none",
      ptsBg: d.big ? "#1E1B2E" : "transparent",
      ptsInk: d.big ? "#C0F402" : "#4A4660",
    };
  });
  var cols = ["#6C3FFA", "#1E1B2E", "#FFFFFF", "#6C3FFA", "#FF8A3D", "#1E1B2E", "#FFFFFF"];
  var confetti = [];
  for (var i = 0; i < 16; i++) {
    confetti.push({
      x: (i * 53 + 17) % 380,
      y: 230 + ((i * 37) % 140),
      w: i % 3 === 0 ? 8 : 6,
      h: i % 2 ? 14 : 9,
      bg: cols[i % cols.length],
      d: ((i * 0.37) % 3).toFixed(2),
    });
  }
  var gifts = giftDefs.map(function (d, k) {
    var sel = k === g,
      dim = g >= 0 && !sel;
    return Object.assign({}, d, {
      selStr: String(sel),
      tickDisp: sel ? "flex" : "none",
      delay: "hb-d" + (k + 2),
      scale: sel ? "1.05" : "1",
      op: dim ? "0.6" : "1",
      shadow: sel
        ? "0 0 0 3px #6C3FFA, 0 12px 22px rgba(30,27,46,0.18)"
        : "0 8px 18px rgba(30,27,46,0.10)",
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
    s4: st === 4,
    sub: subs[st],
    stamps: stamps,
    confetti: confetti,
    gifts: gifts,
    dashes: [0, 1, 2, 3, 4].map(function (k) {
      return {
        label: "Step " + (k + 1) + " of " + N,
        bg: k <= st ? "var(--hb-welcome-ink)" : "var(--hb-welcome-track)",
        go: go(k),
      };
    }),
    backVis: st === 0 ? "hidden" : "visible",
    cta: st === 0 ? "Show me" : "Next",
    notLast: st < N - 1,
    isLast: st === N - 1,
    next: function () {
      if (st < N - 1) setState({ step: st + 1 });
    },
    prev: function () {
      if (st > 0) setState({ step: st - 1 });
    },
  };
}
