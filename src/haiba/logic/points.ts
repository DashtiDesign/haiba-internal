// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ open: -1 });
  useEffect(() => {}, []);

  var o = state.open;
  var defs = [
    {
      mark: "500",
      bg: "#F4FFD1",
      ink: "#3D5000",
      title: "500 welcome points",
      sub: "Enough for your first reward on day one",
      example:
        "Join today and 500 points land on your hub. An upsize at Coffee Bean costs 300, so you can use a reward before your first visit.",
    },
    {
      mark: "40",
      bg: "#F0ECFF",
      ink: "#6C3FFA",
      title: "40 points every visit",
      sub: "At every shop, as often as you go. No daily limit",
      example:
        "Coffee Bean in the morning, Wingman at lunch, VOX at night, Grip after. 4 shops in 1 day, points at all 4.",
    },
    {
      mark: "2x",
      bg: "#F0ECFF",
      ink: "#6C3FFA",
      title: "Double points on your first 2 visits",
      sub: "At every shop. Try somewhere new, earn 80",
      example:
        "Coffee Bean: visit 1 earns 80, visit 2 earns 80. From visit 3 you earn 40. Then the same again at Wingman, VOX and every other shop.",
    },
    {
      mark: "5x",
      bg: "#F0ECFF",
      ink: "#6C3FFA",
      title: "5x on every 5th visit",
      sub: "Counted per shop, like a stamp card. 200 points",
      example:
        "Coffee Bean: visit 5 earns 200, visit 10 earns 200 again. Your first 5 visits at one shop add up to 440 points.",
    },
    {
      mark: "★",
      bg: "#F4FFD1",
      ink: "#3D5000",
      title: "Spend points at 200+ shops",
      sub: "Free drinks, meals, popcorn and more",
      example:
        "Upsize at Coffee Bean, 300. Shake at Grip, 500. Popcorn at VOX, 600. Tap Use, then show the code at the shop.",
    },
    {
      mark: "6m",
      bg: "#F0ECFF",
      ink: "#6C3FFA",
      title: "Points last 6 months",
      sub: "Counted from your last visit or reward",
      example:
        "Use an offer or a reward at least once every 6 months and your points stay. We remind you 30 days and 7 days before they go.",
    },
  ];
  var rows = function (from, to) {
    return defs.slice(from, to).map(function (d, j) {
      var k = from + j;
      var open = k === o;
      return Object.assign({}, d, {
        open: open,
        openStr: String(open),
        line: k === to - 1 ? "0" : "1px solid #F3F1F8",
        rot: open ? "180deg" : "0deg",
        bg: open ? "#1E1B2E" : d.bg,
        ink: open ? "#C0F402" : d.ink,
        toggle: function () {
          setState({ open: open ? -1 : k });
        },
      });
    });
  };
  return { earn: rows(0, 4), spend: rows(4, 5), keep: rows(5, 6) };
}
