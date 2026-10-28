// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ sheet: false });
  useEffect(() => {}, []);

  var p = Number(props.price ?? "18");
  var bhd = function (x) {
    return "BHD " + x.toFixed(2);
  };
  var price = bhd(p);
  var perMonth = bhd(p / 12);
  var sheet = !!state.sheet;
  var common = {
    price: price,
    perMonth: perMonth,
    sheet: sheet,
    sheetTitle: "You are in early",
    sheetNote: "Nothing has been charged",
    sheetBody:
      "Haiba opens in December. We saved your spot at " +
      price +
      " a year and will tell you first when you can join.",
    openSheet: function () {
      setState({ sheet: true });
    },
    closeSheet: function () {
      setState({ sheet: false });
    },
  };
  var lines = [
    {
      mark: "Gift",
      bg: "#C0F402",
      ink: "#1F2600",
      title: "12 free gifts",
      sub: "1 every month from brands you love",
      val: "BHD 30.00",
      valInk: "#1E1B2E",
    },
    {
      mark: "500",
      bg: "#F0ECFF",
      ink: "#6C3FFA",
      title: "500 welcome points",
      sub: "A free item on day one",
      val: "Free item",
      valInk: "#6C3FFA",
    },
    {
      mark: "2x",
      bg: "#F0ECFF",
      ink: "#6C3FFA",
      title: "Points on every offer",
      sub: "2x at new shops, 5x every 5th visit",
      val: "Free items",
      valInk: "#6C3FFA",
    },
    {
      mark: "App",
      bg: "#F0ECFF",
      ink: "#6C3FFA",
      title: "Member promos",
      sub: "Free months of apps students use",
      val: "Bonus",
      valInk: "#6C3FFA",
    },
  ];
  return Object.assign(common, { lines: lines, payPct: Math.round((p / 30) * 100) + "%" });
}
