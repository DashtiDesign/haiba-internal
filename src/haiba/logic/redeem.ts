// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ shown: false });
  useEffect(() => {}, []);

  var v = props.visit ?? "1st visit at this shop";
  var n = v.charAt(0) === "1" ? 1 : v.charAt(0) === "3" ? 3 : 5;
  var pts = n <= 2 ? 80 : n % 5 === 0 ? 200 : 40;
  var why =
    n <= 2
      ? "2x bonus. This is your " + (n === 1 ? "1st" : "2nd") + " visit at The Coffee Bean."
      : n % 5 === 0
        ? "5x bonus. This is your 5th visit at The Coffee Bean."
        : "Your " + n + "rd visit at The Coffee Bean. Visit 5 earns 5x.";
  var stamps = [];
  for (var k = 1; k <= 5; k++) {
    var done = k < n,
      now = k === n;
    var bonus = k <= 2 ? "2x" : k === 5 ? "5x" : "";
    stamps.push({
      tag: bonus,
      bg: now ? "#C0F402" : done ? "#FFFFFF" : "rgba(255,255,255,0.12)",
      ink: now ? "#1F2600" : done ? "#4F25D6" : "#E4DBFF",
      ring: now || done ? "#FFFFFF" : "rgba(255,255,255,0.35)",
    });
  }
  return {
    earnPts: "+" + pts,
    earnWhy: why,
    stamps: stamps,
    stampNote: "Visit " + n + " of 5",
    hidden: !state.shown,
    shown: state.shown,
    reveal: function () {
      setState({ shown: true });
    },
    reset: function () {
      setState({ shown: false });
    },
    toastTitle: "+" + pts + " points",
    toastSub:
      n <= 2
        ? "2x bonus at The Coffee Bean"
        : n % 5 === 0
          ? "5x bonus at The Coffee Bean"
          : "Points added at The Coffee Bean",
  };
}
