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
  var sim = function (V) {
    var favs = V <= 3 ? 1 : V <= 5 ? 2 : V <= 9 ? 3 : 4;
    var seen = {},
      pts = 500,
      cum = 12.0,
      payback = 0;
    for (var m = 0; m < 12; m++) {
      var monthPts = 0,
        shops = ["new" + m];
      for (var k = 0; k < V - 1; k++) shops.push("fav" + (k % favs));
      shops.forEach(function (sh) {
        var n = (seen[sh] || 0) + 1;
        seen[sh] = n;
        monthPts += n <= 2 ? 80 : n % 5 === 0 ? 200 : 40;
      });
      pts += monthPts;
      cum += 2.5 + monthPts / 1000;
      if (!payback && cum >= p) payback = m + 1;
    }
    return { pts: pts, payback: payback, worth: 42.0 + pts / 1000 };
  };
  var typical = sim(4);
  var worthN = typical.worth;
  var round5 = function (x) {
    return "BHD " + Math.floor(x / 5) * 5 + "+";
  };
  var worth = round5(worthN);
  var free = round5(worthN - p) + " free";
  var on = !!state.joined;
  return Object.assign(common, {
    worth: worth,
    sheetTitle: "You are on the list",
    sheetNote: "Free, no payment needed",
    sheetBody: "You will hear from us first when Haiba opens in December.",
    join: function () {
      setState({ joined: true, sheet: true });
    },
    ctaLabel: on ? "You are on the list" : "Join the waitlist",
    ctaBg: on ? "#C0F402" : "#1E1B2E",
    ctaInk: on ? "#1F2600" : "#C0F402",
  });
}
