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
        "Join today and 500 points land in your wallet. A soft drink at Jasmi’s costs 350, so you can use a reward before your first visit.",
    },
    {
      mark: "2x",
      bg: "#F0ECFF",
      ink: "#6C3FFA",
      title: "Double points on your first 2 visits",
      sub: "At every shop. Try somewhere new, earn 80",
      example:
        "Jasmi’s: visit 1 earns 80, visit 2 earns 80. From visit 3 you earn 40. Then the same again at Caribou, VOX and every other shop.",
    },
    {
      mark: "5x",
      bg: "#F0ECFF",
      ink: "#6C3FFA",
      title: "5x on every 5th visit",
      sub: "Counted per shop, like a stamp card. 200 points",
      example:
        "Jasmi’s: visit 5 earns 200, visit 10 earns 200 again. Your first 5 visits at one shop add up to 440 points.",
    },
    {
      mark: "★",
      bg: "#F4FFD1",
      ink: "#3D5000",
      title: "Spend points at 18 shops",
      sub: "Free drinks, meals, popcorn and more",
      example:
        "Free upgrade at Caribou, 200. Soft drink at Jasmi’s, 350. Popcorn at VOX, 600. Confirm, then show the code at the till.",
    },
  ];
  return {
    rules: defs.map(function (d, k) {
      var open = k === o;
      return Object.assign({}, d, {
        open: open,
        openStr: String(open),
        line: k === defs.length - 1 ? "0" : "1px solid #F3F1F8",
        rot: open ? "180deg" : "0deg",
        bg: open ? "#1E1B2E" : d.bg,
        ink: open ? "#C0F402" : d.ink,
        toggle: function () {
          setState({ open: open ? -1 : k });
        },
      });
    }),
  };
}
