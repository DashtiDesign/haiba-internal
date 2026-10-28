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
  var V = Number(props.visits ?? "4");
  var name = props.name ?? "Sara";
  // Same rules as the membership board: 1 new shop a month, the rest at favourite shops.
  var favs = { 2: 1, 4: 2, 8: 3, 12: 4 }[V] || 2;
  var seen = {},
    pts = 500,
    cum = 0,
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
  var left = pts;
  var drinks = Math.floor(left / 1900);
  left -= drinks * 1900;
  var ups = Math.floor(left / 300);
  var itemsVal = drinks * 1.9 + ups * 0.3;
  var parts = [];
  if (drinks) parts.push(drinks + (drinks === 1 ? " free drink" : " free drinks"));
  if (ups) parts.push(ups + (ups === 1 ? " upsize" : " upsizes"));
  var total = 30 + itemsVal;
  return Object.assign(common, {
    hello: "Hi " + name + ",",
    basis: "Based on how you use Unipal: about " + V + " offers a month.",
    total: bhd(total),
    times: "That is " + (total / p).toFixed(1) + "x what Haiba costs.",
    ptsLine: pts.toLocaleString("en-US") + " points",
    ptsItems: "Enough for " + (parts.join(" and ") || "your first reward"),
    ptsVal: bhd(itemsVal),
    costPct: Math.min(100, Math.round((p / total) * 100)) + "%",
    extra: "+" + bhd(Math.max(0, total - p)) + " on top",
    payback: payback
      ? "It pays for itself by month " + payback + "."
      : "Use it more and it pays for itself.",
  });
}
