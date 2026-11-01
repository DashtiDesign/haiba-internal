// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({});
  useEffect(() => {}, []);

  var balance = props.available;
  var st = function (n) {
    var out = [];
    for (var k = 1; k <= 5; k++) {
      var done = k <= n,
        next = k === n + 1;
      var tag = done ? "✓" : k <= 2 ? "2x" : k === 5 ? "5x" : "";
      out.push({
        tag: tag,
        bg: done ? "#FFFFFF" : next ? "#C0F402" : "rgba(255,255,255,0.14)",
        ink: done ? "#4F25D6" : next ? "#1F2600" : "#E4DBFF",
        ring: done || next ? "#FFFFFF" : "rgba(255,255,255,0.35)",
      });
    }
    return out;
  };
  var stLight = function (n) {
    var out = [];
    for (var k = 1; k <= 5; k++) {
      var done = k <= n,
        next = k === n + 1;
      var tag = done ? "✓" : k <= 2 ? "2x" : k === 5 ? "5x" : "";
      out.push({
        tag: tag,
        bg: done ? "#6C3FFA" : next ? "#C0F402" : "#F3F0FA",
        ink: done ? "#FFFFFF" : next ? "#1F2600" : "#8F89A8",
        ring: done ? "#6C3FFA" : next ? "#C0F402" : "#E4DBFF",
      });
    }
    return out;
  };
  var pts = function (n) {
    var v = n + 1;
    return v <= 2 ? 80 : v % 5 === 0 ? 200 : 40;
  };
  var mine = [
    { name: "Jasmi’s", mark: "J", bg: "#D62828", visits: 4 },
    { name: "The Coffee Bean", mark: "CB", bg: "#4B2E83", visits: 1 },
    { name: "Caribou Coffee", mark: "C", bg: "#3B2A22", visits: 2 },
  ].map(function (m, i, a) {
    var p = pts(m.visits);
    return {
      name: m.name,
      mark: m.mark,
      bg: m.bg,
      stamps: stLight(m.visits),
      pts: "+" + p,
      ptsInk: p > 40 ? "#6C3FFA" : "#1E1B2E",
      rule: i === a.length - 1 ? "none" : "1px solid #F1EFF7",
    };
  });
  return {
    balance: balance.toLocaleString("en-US"),
    nextPts: "+200",
    nextLine: "Your next visit at Jasmi’s is your 5th. It earns 5x, not 40.",
    nextStamps: st(4),
    nextNote: "Visit 5 of 5",
    mine: mine,
    fresh: [
      { name: "Wingman", logo: "/haiba/brands/wingman.webp", bg: "#F9F9F9" },
      { name: "VOX Cinemas", logo: "/haiba/brands/vox.webp", bg: "#FFFFFF" },
      { name: "Grip", logo: "/haiba/brands/grip.webp", bg: "#000000" },
    ],
  };
}
