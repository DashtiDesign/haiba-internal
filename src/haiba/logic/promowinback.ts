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
  var V = Math.max(1, Math.min(12, Number(props.visits ?? "4")));
  var name = props.name ?? "Sara";
  var whole = function (x) {
    return "BHD " + Math.floor(x) + "+";
  };
  var at = sim(V);
  var worthN = at.worth;
  // Last 3 months, month by month: gift + points that month, plus Spotify and ChatGPT in month 1.
  var favs = V <= 3 ? 1 : V <= 5 ? 2 : V <= 9 ? 3 : 4,
    seen = {},
    vals = [],
    run = 0;
  for (var m = 0; m < 3; m++) {
    var monthPts = m === 0 ? 500 : 0,
      shops = ["new" + m];
    for (var k = 0; k < V - 1; k++) shops.push("fav" + (k % favs));
    shops.forEach(function (sh) {
      var n = (seen[sh] || 0) + 1;
      seen[sh] = n;
      monthPts += n <= 2 ? 80 : n % 5 === 0 ? 200 : 40;
    });
    run += 2.5 + monthPts / 1000 + (m === 0 ? 12.0 : 0);
    vals.push(run);
  }
  var missed = vals[2];
  var top = Math.max.apply(null, vals);
  var labels = ["Aug", "Sep", "Oct"];
  return Object.assign(common, {
    hello: "Hi " + name + ",",
    missed: whole(missed),
    offers: V * 3 + " Unipal offers",
    months: vals.map(function (v, i) {
      return {
        label: labels[i],
        val: whole(v),
        h: Math.max(14, Math.round((v / top) * 100)) + "px",
        bg: i === 2 ? "#C0F402" : "#8F7BFF",
      };
    }),
    worth: whole(worthN),
    free: whole(Math.max(0, worthN - p)) + " free",
    ptsTitle: at.pts.toLocaleString("en-US") + " bonus points",
    ptsSub: "At your " + V + " offers a month. Go more, get more.",
    ptsVal: "+BHD " + (at.pts / 1000).toFixed(2),
  });
}
