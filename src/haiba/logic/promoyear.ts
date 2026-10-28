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
  var worthN = 42.0;
  var round5 = function (x) {
    return "BHD " + Math.floor(x / 5) * 5 + "+";
  };
  var worth = round5(worthN);
  var free = round5(worthN - p) + " free";
  var V = Number(props.visits ?? "4");
  var name = props.name ?? "Sara";
  // Same rules as the membership board: 1 new shop a month, the rest at favourite shops.
  var favs = { 2: 1, 4: 2, 8: 3, 12: 4 }[V] || 2;
  var seen = {},
    pts = 0,
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
    cum += 2.5;
    if (!payback && cum >= p) payback = m + 1;
  }
  var shown = Math.floor((pts + 500) / 500) * 500;
  return Object.assign(common, {
    worth: worth,
    free: free,
    hello: "Hi " + name + ", here is your year.",
    ptsTitle: shown.toLocaleString("en-US") + "+ bonus points",
    ptsSub: "From your " + V + " visits a month. Go more, get more.",
    payPct: Math.round((p / worthN) * 100) + "%",
    payback: payback
      ? "Pays for itself by month " + payback + ". Everything after is free."
      : "Use it more and it pays for itself.",
  });
}
