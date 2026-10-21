// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({
    t: 0,
    jump: false,
    tipOpen: false,
    navTipOpen: false,
    savedOpen: false,
    filter: "all",
  });
  useEffect(() => {
    var reduce = false;
    try {
      reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {}
    if (reduce || typeof requestAnimationFrame !== "function") {
      setState({ t: 1 });
      return;
    }
    var t0 = null;
    var step = function (ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / 1300);
      setState({ t: 1 - Math.pow(1 - p, 3) });
      if (p < 1) requestAnimationFrame(step);
    };
    setTimeout(function () {
      requestAnimationFrame(step);
    }, 150);
  }, []);

  var isNew = (props.member ?? "Active member") === "New member";
  var t = state.t;
  var target = props.available;
  var shown = Math.round(target * t);
  var arcLen = 440;
  var pct = (isNew ? 1 : Math.min(1, props.available / 1800)) * t;
  var green = "#2F7D32";
  var plum = "#1E1B2E";
  var ready = isNew
    ? [
        {
          kind: "Unipass gift",
          logo: "U",
          logoBg: "#1F2600",
          logoInk: "#C0F402",
          bg: "#C0F402",
          ink: "#1F2600",
          orb: "rgba(255,255,255,0.35)",
          title: "Pick your October gift",
          time: "10 days left",
        },
        {
          kind: "Rewards",
          logo: "★",
          logoBg: "rgba(255,255,255,0.2)",
          logoInk: "#FFFFFF",
          bg: "linear-gradient(135deg, #6C3FFA, #4F25D6)",
          ink: "#FFFFFF",
          orb: "rgba(255,255,255,0.14)",
          title: "Your first reward",
          time: "500 points is enough",
        },
        {
          kind: "Member promo",
          logo: "S",
          logoBg: "#1B6B36",
          logoInk: "#FFFFFF",
          bg: "#E3F5E8",
          ink: "#143D22",
          orb: "rgba(27,107,54,0.12)",
          title: "Spotify, 3 months free",
          time: "Claim by 31 Oct",
        },
      ]
    : [
        {
          kind: "Unipass gift",
          logo: "U",
          logoBg: "#1F2600",
          logoInk: "#C0F402",
          bg: "#C0F402",
          ink: "#1F2600",
          orb: "rgba(255,255,255,0.35)",
          title: "Pick your October gift",
          time: "10 days left",
        },
        {
          kind: "Code ready",
          logo: "C",
          logoBg: "rgba(255,255,255,0.2)",
          logoInk: "#FFFFFF",
          bg: "linear-gradient(135deg, #6C3FFA, #4F25D6)",
          ink: "#FFFFFF",
          orb: "rgba(255,255,255,0.14)",
          title: "Free upgrade at Caribou",
          time: "22 days left",
        },
        {
          kind: "Member promo",
          logo: "S",
          logoBg: "#1B6B36",
          logoInk: "#FFFFFF",
          bg: "#E3F5E8",
          ink: "#143D22",
          orb: "rgba(27,107,54,0.12)",
          title: "Spotify, month 2 of 3",
          time: "Ends 18 Nov",
        },
      ];
  ready.forEach(function (r, k) {
    r.bird = "/haiba/birds/10-gift.png";
    r.birdDisp = k === 0 ? "block" : "none";
    r.titleW = k === 0 ? "118px" : "100%";
  });
  var benefits = [
    {
      icon: "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z",
      bg: "#F0ECFF",
      ink: "#6C3FFA",
      title: "Points on every offer",
      sub: "40 a visit. 2x on your first 2, 5x every 5th",
    },
    {
      icon: "M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z",
      bg: "#F0ECFF",
      ink: "#6C3FFA",
      title: "Rewards at 18 shops",
      sub: "Free items for your points",
    },
    {
      icon: "M20 12v9H4v-9M2 7h20v5H2zM12 7v14M12 7c-2-4-7-4-7-1s5 1 7 1zm0 0c2-4 7-4 7-1s-5 1-7 1z",
      bg: "#F4FFD1",
      ink: "#3D5000",
      title: "1 free Unipass gift a month",
      sub: "Meals, coffee, cinema and more",
    },
    {
      icon: "M20.6 13.4L13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8zM7.5 7.5h.01",
      bg: "#E3F5E8",
      ink: "#1B6B36",
      title: "Member promos",
      sub: "Spotify 3 months free. More soon",
    },
  ];
  ready[1].href = isNew ? "/shop/coffee-bean" : "/haiba/basket";
  benefits[0].href = "/haiba/points";
  benefits[1].href = "/shop/coffee-bean";
  var gifts = [
    { mark: "J", bg: "#D62828", ink: "#FFFFFF", item: "Free meal", brand: "Jasmi’s" },
    { mark: "V", bg: "#1E1B2E", ink: "#FFFFFF", item: "Cinema ticket", brand: "VOX" },
    { mark: "CB", bg: "#4B2E83", ink: "#FFFFFF", item: "Free drink", brand: "Coffee Bean" },
    { mark: "F", bg: "#FFB703", ink: "#1E1B2E", item: "Bowling game", brand: "Funland" },
    { mark: "A", bg: "#0B6E99", ink: "#FFFFFF", item: "Car wash", brand: "Alkuwaiti" },
  ];
  var all = isNew
    ? [
        {
          day: "Today",
          kind: "points",
          mark: "H",
          bg: "#6C3FFA",
          ink: "#C0F402",
          name: "Welcome to Haiba",
          sub: "Joined, yearly plan",
          amt: "+500",
          amtInk: green,
          note: "Welcome bonus",
        },
      ]
    : [
        {
          day: "Today",
          kind: "points",
          mark: "CB",
          bg: "#4B2E83",
          ink: "#FFFFFF",
          name: "The Coffee Bean",
          sub: "Upsize your drinks",
          amt: "+80",
          amtInk: green,
          note: "2x bonus",
        },
        {
          day: "Monday 19 Oct",
          kind: "points",
          mark: "C",
          bg: "#3B2A22",
          ink: "#FFFFFF",
          name: "Caribou Coffee",
          sub: "Reward, free upgrade",
          amt: "−200",
          amtInk: plum,
          note: "Held in a code",
        },
        {
          day: "Sunday 18 Oct",
          kind: "saved",
          mark: "S",
          bg: "#E3F5E8",
          ink: "#1B6B36",
          name: "Spotify Premium",
          sub: "Member promo, month 2",
          amt: "BHD 2.40",
          amtInk: green,
          note: "Saved",
        },
        {
          day: "Thursday 15 Oct",
          kind: "points",
          mark: "J",
          bg: "#D62828",
          ink: "#FFFFFF",
          name: "Jasmi’s",
          sub: "BD 2 per meal",
          amt: "+40",
          amtInk: green,
          note: "4 of 5 visits",
        },
        {
          day: "Thursday 10 Sep",
          kind: "saved",
          mark: "J",
          bg: "#D62828",
          ink: "#FFFFFF",
          name: "Jasmi’s",
          sub: "Unipass gift, free meal",
          amt: "BHD 2.85",
          amtInk: green,
          note: "Saved",
        },
      ];
  var f = state.filter;
  var rows = all.filter(function (r) {
    return f === "all" || r.kind === f;
  });
  var groups = [];
  rows.forEach(function (r) {
    var saved = r.kind === "saved";
    var row = Object.assign({}, r, {
      badgeBg: saved ? "#C0F402" : "#6C3FFA",
      badgeInk: saved ? "#1F2600" : "#C0F402",
      badgeIcon: saved ? "M5 12.5l4.5 4.5L19 7.5" : "M12 5v14M5 12h14",
      noteBg: saved ? "#F4FFD1" : r.amt.charAt(0) === "−" ? "#F3F1F8" : "#F0ECFF",
      noteInk: saved ? "#3D5000" : r.amt.charAt(0) === "−" ? "#6B6880" : "#4F25D6",
    });
    var g =
      groups.length && groups[groups.length - 1].day === r.day ? groups[groups.length - 1] : null;
    if (!g) {
      g = { day: r.day, rows: [], total: "", totalInk: "#6B6880" };
      groups.push(g);
    }
    g.rows.push(row);
  });
  groups.forEach(function (g) {
    var pts = 0;
    g.rows.forEach(function (r) {
      if (r.kind === "points") pts += parseInt(r.amt.replace("−", "-"), 10);
    });
    if (pts > 0) {
      g.total = "+" + pts + " pts";
      g.totalInk = green;
    }
  });
  var filterDefs = [
    { id: "all", label: "All" },
    { id: "points", label: "Points" },
    { id: "saved", label: "Saved" },
  ];
  var fi = 0;
  var filters = filterDefs.map(function (d, k) {
    var sel = d.id === f;
    if (sel) fi = k;
    return {
      label: d.label,
      sel: String(sel),
      ink: sel ? "#FFFFFF" : "#6B6880",
      pick: function () {
        setState({ filter: d.id });
      },
    };
  });
  var savedRows = isNew
    ? [
        {
          title: "Rewards used",
          sub: "Spend points on free items",
          amt: "BHD 0.00",
          rule: "1px solid #3A3550",
        },
        {
          title: "Unipass gifts",
          sub: "1 free item a month",
          amt: "BHD 0.00",
          rule: "1px solid #3A3550",
        },
        { title: "Member promos", sub: "Spotify, 3 months free", amt: "BHD 0.00", rule: "none" },
      ]
    : [
        {
          title: "Rewards used",
          sub: "2 rewards accepted",
          amt: "BHD 2.45",
          rule: "1px solid #3A3550",
        },
        {
          title: "Unipass gifts",
          sub: "1 gift, Jasmi’s",
          amt: "BHD 2.85",
          rule: "1px solid #3A3550",
        },
        { title: "Member promos", sub: "Spotify, month 1", amt: "BHD 2.40", rule: "none" },
      ];
  return {
    greeting: "Hi Sara",
    points: shown.toLocaleString("en-US"),
    arcDash: Math.round(arcLen * pct) + " " + arcLen,
    arcGoal: isNew ? "500" : "1,800",
    barPct: Math.round((isNew ? 1 : 1240 / 1800) * t * 100) + "%",
    subLine: isNew
      ? "Enough for your first reward today"
      : "560 more points for a free coffee at Caribou",
    savedChip: isNew ? "Saved BHD 0.00" : "Saved BHD 7.70",
    codesChip: isNew ? "0 codes" : "1 code ready",
    chev: state.savedOpen ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6",
    savedOpen: state.savedOpen,
    savedOpenStr: String(state.savedOpen),
    savedRows: savedRows,
    toggleSaved: function () {
      setState({ savedOpen: !state.savedOpen });
    },
    birdClass: state.jump ? "hb-jump" : "",
    birdSrc: state.jump ? "/haiba/birds/02-jump.png" : "/haiba/birds/01-cheer.png",
    poke: function () {
      setState({ jump: true, tipOpen: !state.tipOpen });
      setTimeout(function () {
        setState({ jump: false });
      }, 720);
    },
    tipOpen: state.tipOpen,
    tip: isNew
      ? "Hi! Your 500 points are ready to use today."
      : "Hi! One more visit at Jasmi’s and you earn 5x.",
    navTipOpen: state.navTipOpen,
    navTipOpenStr: String(state.navTipOpen),
    navBtnClass: state.navTipOpen ? "hb-press" : "hb-press hb-pulse",
    dotDisp: state.navTipOpen ? "none" : "block",
    toggleNavTip: function () {
      setState({ navTipOpen: !state.navTipOpen });
    },
    navTip: isNew
      ? "Pick your October Unipass gift. You have 10 days left, and it is free."
      : "Your next visit at Jasmi’s is your 5th. It earns 200 points, not 40.",
    navTipHref: isNew ? "" : "/shop/coffee-bean/redeem",
    navTipCta: isNew ? "Pick my gift" : "See Jasmi’s offer",
    monthLeft: "10 days left in October",
    ready: ready,
    benefits: benefits,
    gifts: gifts,
    groups: groups,
    noRows: rows.length === 0,
    filters: filters,
    indLeft: 3 + fi * 64 + "px",
  };
}
