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
  var W = typeof window !== "undefined" ? window : {};
  var V = state.visits != null ? state.visits : Number(props.visits ?? "4");
  V = Math.max(1, Math.min(12, V));
  var now = sim(V);
  var worthN = state.disp != null ? state.disp : now.worth;
  var whole = function (x) {
    return "BHD " + Math.floor(x) + "+";
  };
  var worth = whole(worthN);
  var free = whole(Math.max(0, worthN - p)) + " free";
  var bump = state.bump ? "hb-bump-a" : "hb-bump-b";
  var onVisits = function (e) {
    var nv = Number(e.target.value);
    if (!nv || nv === V) return;
    var from = worthN,
      to = sim(nv).worth,
      t0 = Date.now();
    var id = (W.__hbCount = (W.__hbCount || 0) + 1);
    setState({ visits: nv, bump: !state.bump });
    var step = function () {
      if (id !== W.__hbCount) return;
      var k = Math.min(1, (Date.now() - t0) / 600);
      setState({ disp: from + (to - from) * (1 - Math.pow(1 - k, 3)) });
      if (k < 1) setTimeout(step, 16);
    };
    step();
  };
  var dyn = {
    worth: worth,
    free: free,
    bump: bump,
    visits: String(V),
    onVisits: onVisits,
    times: V === 1 ? "time" : "times",
    rangeBg:
      "linear-gradient(90deg, #C0F402 0%, #C0F402 " +
      Math.round(((V - 1) / 11) * 100) +
      "%, #3A3550 " +
      Math.round(((V - 1) / 11) * 100) +
      "%, #3A3550 100%)",
    ptsTitle: now.pts.toLocaleString("en-US") + " bonus points",
    ptsVal: "+BHD " + (now.pts / 1000).toFixed(2),
    payPct: Math.round((p / worthN) * 100) + "%",
    payback: now.payback
      ? "Pays for itself by month " + now.payback + ". Everything after is free."
      : "Use it more and it pays for itself.",
  };
  var name = props.name ?? "Sara";
  return Object.assign(common, dyn, {
    hello: "Hi " + name + ", here is your year.",
    ptsSub: "At " + V + " " + (V === 1 ? "visit" : "visits") + " a month. Go more, get more.",
  });
}
