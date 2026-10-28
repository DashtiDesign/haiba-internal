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
  var yes = "✓",
    no = "✕";
  var rows = [
    ["Student offers", yes, yes],
    ["Free gift every month", no, yes],
    ["Points on every offer", no, "40 to 200"],
    ["Welcome points", no, "500"],
    ["Rewards at 200+ shops", no, yes],
    ["Member promos", no, yes],
    ["See what you saved", no, yes],
  ].map(function (r) {
    return {
      label: r[0],
      free: r[1],
      haiba: r[2],
      freeInk: r[1] === no ? "#B5B2C2" : "#2F7D32",
      haibaInk: r[2] === yes ? "#2F7D32" : "#6C3FFA",
      haibaSize: r[2] === yes ? "19px" : "15px",
    };
  });
  return Object.assign(common, { rows: rows });
}
