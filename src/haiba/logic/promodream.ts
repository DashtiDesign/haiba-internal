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
    return { pts: pts, payback: payback, worth: 47.0 + pts / 1000 };
  };
  var W = typeof window !== "undefined" ? window : {};
  var name = props.name ?? "Sara";
  var G = [
    {
      brand: "Wingman",
      logo: "/haiba/brands/wingman.webp",
      item: "Student box meal",
      bg: "#F9F9F9",
      v: 2.5,
    },
    {
      brand: "VOX Cinemas",
      logo: "/haiba/brands/vox.webp",
      item: "Cinema ticket",
      bg: "#FFFFFF",
      v: 3.5,
    },
    {
      brand: "The Coffee Bean",
      logo: "/haiba/brands/coffee-bean.webp",
      item: "Any drink",
      bg: "#FFFFFF",
      v: 2.0,
    },
    { brand: "Grip", logo: "/haiba/brands/grip.webp", item: "Gym day pass", bg: "#000000", v: 5.0 },
    {
      brand: "Albayan",
      logo: "/haiba/brands/albayan.webp",
      item: "Perfume 100ml",
      bg: "#FFFFFF",
      v: 6.0,
    },
    {
      brand: "Alkuwaiti",
      logo: "/haiba/brands/alkuwaiti.webp",
      item: "Car wash",
      bg: "#FFFFFF",
      v: 3.75,
    },
  ];
  var labels = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  var slots = state.slots || [1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  var firstEmpty = function (s, from) {
    for (var i = 0; i < 12; i++) {
      var j = (from + i) % 12;
      if (s[j] < 0) return j;
    }
    return -1;
  };
  var active = state.active != null ? state.active : firstEmpty(slots, 0);
  var pts = sim(1).pts;
  var subs = 17.0;
  var giftsOf = function (s) {
    return s.reduce(function (a, gi) {
      return a + (gi >= 0 ? G[gi].v : 0);
    }, 0);
  };
  var worthOf = function (s) {
    return subs + pts / 1000 + giftsOf(s);
  };
  var worthN = state.disp != null ? state.disp : worthOf(slots);
  var whole = function (x) {
    return "BHD " + Math.floor(x) + "+";
  };
  var filled = slots.filter(function (gi) {
    return gi >= 0;
  }).length;
  var animateTo = function (to) {
    var from = worthN,
      t0 = Date.now(),
      id = (W.__hbCount = (W.__hbCount || 0) + 1);
    var step = function () {
      if (id !== W.__hbCount) return;
      var k = Math.min(1, (Date.now() - t0) / 600);
      setState({ disp: from + (to - from) * (1 - Math.pow(1 - k, 3)) });
      if (k < 1) setTimeout(step, 16);
    };
    step();
  };
  var place = function (gi, mi) {
    if (mi < 0) return;
    var s = slots.slice();
    var before = s[mi];
    s[mi] = gi;
    var d = G[gi].v - (before >= 0 ? G[before].v : 0);
    setState({ slots: s, active: firstEmpty(s, mi + 1), bump: !state.bump, delta: d });
    animateTo(worthOf(s));
  };
  var months = labels.map(function (l, mi) {
    var gi = slots[mi],
      isOn = gi >= 0,
      isActive = mi === active;
    return {
      label: l,
      filled: isOn,
      empty: !isOn,
      logo: isOn ? G[gi].logo : "",
      bg: isOn ? "#FFFFFF" : isActive ? "rgba(192,244,2,0.16)" : "rgba(255,255,255,0.08)",
      border: isOn ? "0" : isActive ? "2px dashed #C0F402" : "1px solid rgba(255,255,255,0.18)",
      labInk: isOn ? "#6C3FFA" : isActive ? "#C0F402" : "#E4DBFF",
      dash: isActive ? "#C0F402" : "rgba(255,255,255,0.55)",
      aria:
        l + (isOn ? ": " + G[gi].item + ", tap to change" : ": empty, tap to pick for this month"),
      tap: function () {
        if (isOn) {
          var s = slots.slice();
          s[mi] = -1;
          setState({ slots: s, active: mi, bump: !state.bump, delta: -G[gi].v });
          animateTo(worthOf(s));
        } else setState({ active: mi });
      },
      drop: function (e) {
        e.preventDefault();
        var g = W.__hbDrag;
        if (g != null) place(g, mi);
        W.__hbDrag = null;
      },
    };
  });
  var gifts = G.map(function (g, gi) {
    return Object.assign({}, g, {
      val: "BHD " + g.v.toFixed(2),
      aria: "Put " + g.item + " in " + (active >= 0 ? labels[active] : "a month"),
      pick: function () {
        place(gi, active);
      },
      drag: function (e) {
        W.__hbDrag = gi;
        try {
          e.dataTransfer.setData("text/plain", String(gi));
        } catch (x) {}
      },
    });
  });
  var d = state.delta;
  return Object.assign(common, {
    hello: "Hi " + name + ".",
    worth: whole(worthN),
    delta: d == null ? "" : (d >= 0 ? "+" : "−") + "BHD " + Math.abs(d).toFixed(2),
    deltaOp: d == null ? "0" : "1",
    bump: state.bump ? "hb-bump-a" : "hb-bump-b",
    breakdown:
      "Gifts BHD " +
      giftsOf(slots).toFixed(2) +
      " + Spotify, ChatGPT and travel data BHD " +
      subs.toFixed(2) +
      " + points",
    count: filled + " of 12 picked",
    trayLine: active >= 0 ? "Tap or drag into " + labels[active] : "Tap a month to swap",
    months: months,
    gifts: gifts,
    allowDrop: function (e) {
      e.preventDefault();
    },
  });
}
