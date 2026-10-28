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
  var perks = [
    {
      mark: "Gift",
      bg: "#C0F402",
      ink: "#1F2600",
      title: "1 free gift every month",
      sub: "A meal, a coffee, a cinema ticket, a gym pass and more",
    },
    {
      mark: "500",
      bg: "#F0ECFF",
      ink: "#6C3FFA",
      title: "500 points to start",
      sub: "Enough for your first reward on day one",
    },
    {
      mark: "2x",
      bg: "#F0ECFF",
      ink: "#6C3FFA",
      title: "Points every time you use Unipal",
      sub: "Turn them into free drinks, meals and popcorn at 200+ shops",
    },
  ].map(function (d, i, a) {
    return Object.assign({}, d, { line: i === a.length - 1 ? "0" : "1px solid #F1EFF7" });
  });
  return Object.assign(common, {
    perks: perks,
    sheetTitle: "You are on the list",
    sheetNote: "Free, no payment needed",
    sheetBody: "We will tell you first when Haiba opens in December.",
    join: function () {
      setState({ joined: true, sheet: true });
    },
    ctaLabel: on ? "You are on the list" : "Join the waitlist",
    ctaBg: on ? "#C0F402" : "#1E1B2E",
    ctaInk: on ? "#1F2600" : "#C0F402",
  });
}
