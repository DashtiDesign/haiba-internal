// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ sheet: false, joined: false });
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
  var on = !!state.joined;
  return Object.assign(common, {
    sheetTitle: "You are on the list",
    sheetNote: "Free, no payment needed",
    sheetBody: "Early access opens in December. You will hear from us first.",
    join: function () {
      setState({ joined: true, sheet: true });
    },
    ctaLabel: on ? "You are on the list" : "Join the waitlist",
    ctaBg: on ? "#C0F402" : "#1E1B2E",
    ctaInk: on ? "#1F2600" : "#C0F402",
  });
}
