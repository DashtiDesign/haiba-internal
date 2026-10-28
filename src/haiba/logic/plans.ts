// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ tab: "haiba", stop: 1, sec: 0 });
  useEffect(() => {}, []);

  var isHaiba = state.tab === "haiba";

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
  var yes = "✓",
    no = "✕";
  var rows = [
    ["Student offers", yes, yes],
    ["Points on every offer", no, "40 to 200"],
    ["Welcome points", no, "500"],
    ["Rewards with points", no, "200+ shops"],
    ["Unipass gift", no, "1 a month"],
    ["Member promos", no, yes],
    ["Free travel data", no, "5GB"],
    ["“You saved” tracker", no, yes],
    ["Price", "Free", "BHD 19.80 a year"],
  ];
  var table = rows.map(function (r, i) {
    return {
      label: r[0],
      free: r[1],
      haiba: r[2],
      freeInk: r[1] === no ? "#6B6880" : r[1] === yes ? "#2F7D32" : "#1E1B2E",
      haibaInk: r[2] === yes ? "#2F7D32" : "#6C3FFA",
      rule: i === rows.length - 1 ? "none" : "1px solid #ECEAF3",
    };
  });
  return {
    isHaiba: isHaiba,
    isFree: !isHaiba,
    glow: isHaiba
      ? "linear-gradient(180deg, #E4D9FF 0%, #F3EEFF 55%, #FFFFFF 100%)"
      : "linear-gradient(180deg, #DCDAE4 0%, #EFEEF3 55%, #FFFFFF 100%)",
    indLeft: isHaiba ? "138px" : "4px",
    freeSel: String(!isHaiba),
    haibaSel: String(isHaiba),
    freeTabInk: isHaiba ? "#3B3654" : "#FFFFFF",
    haibaTabInk: isHaiba ? "#FFFFFF" : "#3B3654",
    pickFree: function () {
      setState({ tab: "free" });
    },
    pickHaiba: function () {
      setState({ tab: "haiba" });
    },
    highlights: [
      { title: "500 points when you join", sub: "Enough for your first reward today" },
      {
        title: "Points every time you use an offer",
        sub: "2x on your first 2 visits at a shop. 5x every 5th",
      },
      { title: "1 free Unipass gift every month", sub: "Meals, coffee, cinema, gym and more" },
      { title: "Member promos", sub: "Spotify Premium, 3 months free" },
      { title: "Free travel data", sub: "5GB in Bahrain, Saudi, Qatar or Oman. We’ve got you." },
    ],
    giftHead: isHaiba ? "Your monthly gift, from all of these" : "Only available with Haiba",
    lockOp: isHaiba ? "0" : "1",
    lockScale: isHaiba ? "0.4" : "1",
    gifts: [
      {
        brand: "Wingman",
        logo: "/haiba/brands/wingman.webp",
        label: "Student box meal at Wingman",
      },
      { brand: "VOX Cinemas", logo: "/haiba/brands/vox.webp", label: "1 cinema ticket at VOX" },
      {
        brand: "The Coffee Bean",
        logo: "/haiba/brands/coffee-bean.webp",
        label: "Free drink at Coffee Bean",
      },
      { brand: "Grip", logo: "/haiba/brands/grip.webp", label: "Gym day pass at Grip" },
      { brand: "Albayan", logo: "/haiba/brands/albayan.webp", label: "100ml perfume at Albayan" },
      { brand: "Alkuwaiti", logo: "/haiba/brands/alkuwaiti.webp", label: "Car wash at Alkuwaiti" },
    ],
    table: table,
    freeColInk: isHaiba ? "#6B6880" : "#1E1B2E",
    freeColBg: isHaiba ? "#FFFFFF" : "#F4F3F7",
    haibaColBg: isHaiba ? "#F6F3FF" : "#FFFFFF",
    ctaTitle: isHaiba ? "Join Haiba" : "Upgrade to Haiba",
    secs: ["Gifts", "Compare", "Your year"].map(function (l, k) {
      var on = state.sec === k;
      return {
        label: l,
        on: String(on),
        ink: on ? "#C0F402" : "#3B3654",
        pick: function () {
          setState({ sec: k });
        },
      };
    }),
    secLeft: "calc(4px + " + state.sec + " * (100% - 8px) / 3)",
    secGifts: state.sec === 0,
    secCompare: state.sec === 1,
    secYear: state.sec === 2,
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
  };
}
