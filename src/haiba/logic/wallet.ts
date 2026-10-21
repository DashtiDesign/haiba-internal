// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useMotionProgress } from "../useMotionProgress";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ stop: 1, t: 0, worth: 0 });

  var isNew = (props.member ?? "Active member") === "New member";
  var t = useMotionProgress();
  var visits = [2, 4, 8, 12];
  var items = [
    "A pastry at Caribou",
    "A regular coffee",
    "A pasta at Pasta Express",
    "A VOX ticket and popcorn",
  ];
  var i = state.stop;
  var stops = visits.map(function (v, k) {
    var on = k === i;
    return {
      label: v + " visits a month",
      on: String(on),
      size: on ? "36px" : "12px",
      bg: on ? "#C0F402" : k < i ? "#C0F402" : "#6B6584",
      shadow: on ? "0 0 0 6px rgba(192,244,2,0.25)" : "none",
      pick: function () {
        setState({ stop: k });
      },
    };
  });
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
    calcVisits: String(visits[i]),
    calcYear: (visits[i] * 40 * 12).toLocaleString("en-US"),
    calcItem: items[i],
    fillPct: Math.round((i / 3) * 100) + "%",
    stops: stops,
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
