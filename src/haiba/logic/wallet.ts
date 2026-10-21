// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useMotionProgress } from "../useMotionProgress";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ stop: 1, t: 0, worth: 0 });

  var isNew = (props.member ?? "Active member") === "New member";
  var t = useMotionProgress();
  var visits = [2, 4, 8, 12];
  var i = state.stop;
  var stops = visits.map(function (v, k) {
    var on = k === i;
    return {
      v: String(v),
      label: v + " visits a month",
      on: String(on),
      ink: on ? "#1F2600" : "#CFC9E0",
      pick: function () {
        setState({ stop: k });
      },
    };
  });
  // A year of visits with the real rules: 2x on the first 2 visits at a shop, 5x on every 5th.
  // Each month: 1 new shop, the rest spread over your favourite shops.
  var V = visits[i];
  var favs = { 2: 1, 4: 2, 8: 3, 12: 4 }[V];
  var seen = {},
    yearPts = 500,
    flatPts = 500,
    cum = 0.5,
    payback = 0;
  for (var m = 0; m < 12; m++) {
    var monthPts = 0;
    var shops = ["new" + m];
    for (var k2 = 0; k2 < V - 1; k2++) shops.push("fav" + (k2 % favs));
    shops.forEach(function (sh) {
      var nth = (seen[sh] || 0) + 1;
      seen[sh] = nth;
      monthPts += nth <= 2 ? 80 : nth % 5 === 0 ? 200 : 40;
      flatPts += 40;
    });
    yearPts += monthPts;
    cum += 2.5 + monthPts / 1000;
    if (!payback && cum >= 19.8) payback = m + 1;
  }
  // Spend the points on Coffee Bean rewards: regular drink 1,900, cookie 700, upsize 300.
  var left = yearPts;
  var drinks = Math.floor(left / 1900);
  left -= drinks * 1900;
  var cookies = Math.floor(left / 700);
  left -= cookies * 700;
  var ups = Math.floor(left / 300);
  var itemsVal = drinks * 1.9 + cookies * 0.7 + ups * 0.3;
  var parts = [];
  if (drinks) parts.push(drinks + (drinks === 1 ? " regular drink" : " regular drinks"));
  if (cookies) parts.push(cookies + (cookies === 1 ? " cookie" : " cookies"));
  if (ups) parts.push(ups + (ups === 1 ? " upsize" : " upsizes"));
  var itemsText =
    parts.length > 1
      ? parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1]
      : parts[0] || "your first reward";
  var total = 30 + itemsVal;
  var bhd = function (x) {
    return "BHD " + x.toFixed(2);
  };
  var green = "#2F7D32";
  var worths = isNew
    ? [
        "Your 500 points are enough for a soft drink at Jasmi’s, with 150 to spare.",
        "Your 500 points are enough for a free upsize at Coffee Bean, with 200 to spare.",
        "Your 500 points are enough for a free upgrade at Caribou, with 300 to spare.",
      ]
    : [
        "Your 1,240 points are enough for a pastry at Caribou, with 340 to spare.",
        "Your 1,240 points are enough for popcorn at VOX, with 640 to spare.",
        "Your 1,240 points are enough for a soft drink at Jasmi’s, three times over.",
      ];
  var w = state.worth % worths.length;
  var n = function (x) {
    return Math.round(x * t).toLocaleString("en-US");
  };
  return {
    isNew: isNew,
    isActive: !isNew,
    points: n(props.available),
    used: n(isNew ? 0 : 550),
    claimed: n(isNew ? 0 : 2),
    worthLine: worths[w],
    nextWorth: function () {
      setState({ worth: w + 1 });
    },
    actions: [
      { mark: "+", label: "Earn", href: "/shop/coffee-bean" },
      { mark: "★", label: "Rewards", href: "/shop/coffee-bean" },
      { mark: "#", label: "My codes", href: "/haiba/basket" },
      { mark: "U", label: "Unipass" },
    ],
    bannerTitle: isNew
      ? "Your first 2 visits at every shop earn 2x"
      : "Your next visit at Jasmi’s earns 5x",
    bannerCta: isNew ? "See shops" : "See the offer",
    bannerBadge: isNew ? "2x" : "5x",
    stops: stops,
    segLeft: "calc(4px + " + i + " * (100% - 8px) / 4)",
    saveTotal: bhd(total),
    saveSub:
      "That is " +
      (total / 19.8).toFixed(1) +
      "x what Haiba costs. The gifts alone pay for it, and it pays for itself by month " +
      payback +
      ".",
    costPct: Math.round((19.8 / total) * 100) + "%",
    extraLine: "+" + bhd(total - 19.8) + " on top",
    ptsLine: yearPts.toLocaleString("en-US") + " points",
    ptsItems: "Enough for " + itemsText,
    ptsSave: bhd(itemsVal),
    bonusLine: "+" + (yearPts - flatPts).toLocaleString("en-US") + " from 2x and 5x bonuses",
    history: [
      {
        mark: "CB",
        bg: "#4B2E83",
        ink: "#FFFFFF",
        name: "The Coffee Bean",
        sub: "Today · 2x, first visit",
        amt: "+80",
        amtInk: green,
        rule: "1px solid #F3F1F8",
      },
      {
        mark: "C",
        bg: "#3B2A22",
        ink: "#FFFFFF",
        name: "Caribou · Free upgrade",
        sub: "Mon 19 Oct · held in a code",
        amt: "−200",
        amtInk: "#1E1B2E",
        rule: "1px solid #F3F1F8",
      },
      {
        mark: "J",
        bg: "#D62828",
        ink: "#FFFFFF",
        name: "Jasmi’s",
        sub: "Thu 15 Oct · 4th visit",
        amt: "+40",
        amtInk: green,
        rule: "1px solid #F3F1F8",
      },
      {
        mark: "B",
        bg: "#7A4E2D",
        ink: "#FFFFFF",
        name: "Barn’s · Cookie",
        sub: "27 Sep · cancelled, points back",
        amt: "+500",
        amtInk: green,
        rule: "1px solid #F3F1F8",
      },
      {
        mark: "H",
        bg: "#6C3FFA",
        ink: "#C0F402",
        name: "Welcome to Haiba",
        sub: "18 Aug · welcome bonus",
        amt: "+500",
        amtInk: green,
        rule: "none",
      },
    ],
    picks: [
      { brand: "Jasmi’s", item: "Soft drink", pts: "350 points", bg: "#D62828" },
      { brand: "Caribou", item: "Free upgrade", pts: "200 points", bg: "#3B2A22" },
      { brand: "Coffee Bean", item: "Free upsize", pts: "300 points", bg: "#4B2E83" },
    ],
  };
}
