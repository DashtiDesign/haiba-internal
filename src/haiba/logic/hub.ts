// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useMotionProgress } from "../useMotionProgress";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({
    t: 0,
    jump: false,
    tipOpen: false,
    navTipOpen: false,
    openCode: "",
  });

  var isNew = (props.member ?? "Active member") === "New member";
  var t = useMotionProgress();
  var target = props.available;
  var shown = Math.round(target * t);
  var green = "#2F7D32";
  var plum = "#1E1B2E";
  var heldCodes = props.codes ?? 0;
  var savedExtra = props.savedRewards ?? 0;
  var codeIds = props.codeIds ?? [];
  var giftMarks = [
    { hasLogo: true, logo: "/haiba/brands/wingman.webp", name: "Wingman", mark: "" },
    { hasLogo: true, logo: "/haiba/brands/vox.webp", name: "VOX Cinemas", mark: "" },
    { hasLogo: true, logo: "/haiba/brands/grip.webp", name: "Grip", mark: "" },
    { hasLogo: false, logo: "", name: "", mark: "+9" },
  ];
  var purple = { pillBg: "#6C3FFA", pillInk: "#FFFFFF" };
  var lime = { pillBg: "#F4FFD1", pillInk: "#3D5000" };
  var soft = { pillBg: "#E3F5E8", pillInk: "#1B6B36" };
  var ready = isNew
    ? []
    : [
        Object.assign(
          {
            isCode: true,
            key: "caribou",
            mark: "C",
            bg: "#3B2A22",
            ink: "#FFFFFF",
            title: "Caribou, free upgrade",
            meta: "Code ready. Tap to show",
            metaInk: "#6B6880",
            pill: "Show code",
            code: "HB-7K2Q-9X",
            useBy: "Use by 12 Nov",
          },
          purple,
        ),
      ];
  var rw = [
    {
      name: "Free upsize",
      ph: "DRINK PHOTO",
      bg: "#EDE4FF",
      ink: "#4F25D6",
      code: "8K3Q",
      pts: 300,
    },
    { name: "Cookie", ph: "COOKIE PHOTO", bg: "#F6E7D2", ink: "#7A4E2D", code: "5TR2", pts: 700 },
    {
      name: "Regular drink",
      ph: "DRINK PHOTO",
      bg: "#E3DCD6",
      ink: "#3B2A22",
      code: "9MX7",
      pts: 1900,
    },
  ];
  var codeRows = codeIds.map(function (id) {
    var i = parseInt(id.split("-")[0], 10),
      k = parseInt(id.split("-")[1], 10);
    return Object.assign(
      {
        isCode: true,
        key: id,
        mark: "CB",
        bg: "#4B2E83",
        ink: "#FFFFFF",
        title: "The Coffee Bean, " + rw[i].name.toLowerCase(),
        meta: "Code ready. Tap to show",
        metaInk: "#6B6880",
        pill: "Show code",
        code: "HB-" + rw[i].code + "-" + (k + 1),
        useBy: "Use by 20 Nov",
      },
      purple,
    );
  });
  ready = codeRows.concat(ready);
  ready.forEach(function (r) {
    if (r.isCode) {
      var open = state.openCode === r.key;
      r.open = open;
      r.openStr = String(open);
      r.tap = function () {
        setState({ openCode: open ? "" : r.key });
      };
    }
  });
  ready.forEach(function (r, k) {
    r.rule = k === 0 ? "none" : "1px solid #F1EFF7";
  });
  var travel = props.travelStatus ?? "Available";
  var tLocked = travel === "Locked, monthly";
  var tUsed = travel === "Used at Airalo";
  var tShown = travel === "Code shown";
  var travelVals = {
    travelHasPill: tLocked || tUsed || tShown,
    travelPill: tLocked ? "Locked" : "Used",
    travelOp: tUsed ? "0.6" : "1",
    travelSub: tLocked
      ? "Unlocks after 3 months on the monthly plan."
      : tUsed
        ? "Used on Airalo. You saved BHD 5.64."
        : tShown
          ? "Your Airalo code is ready to use."
          : "In any other Unipal country. Worth BHD 5+.",
    travelCta: tLocked
      ? "Unlocks after 3 months"
      : tUsed
        ? "See details"
        : tShown
          ? "Show my code"
          : "Get my free data",
    travelCtaBg: tLocked || tUsed ? "rgba(255,255,255,0.12)" : "#C0F402",
    travelCtaInk: tLocked || tUsed ? "#FFFFFF" : "#1F2600",
  };
  var savedDefs = isNew
    ? [
        { title: "Unipass gifts", sub: "1 free item a month", amt: 0, color: "#6C3FFA" },
        {
          title: "Rewards",
          sub: savedExtra > 0 ? "Accepted at the shop" : "Free items for your points",
          amt: savedExtra,
          color: "#9CC400",
        },
        { title: "Member promos", sub: "Spotify, 3 months free", amt: 0, color: "#B9A5FF" },
      ]
    : [
        { title: "Unipass gifts", sub: "1 gift, Wingman", amt: 2.85, color: "#6C3FFA" },
        { title: "Rewards", sub: "Accepted at the shop", amt: 2.45 + savedExtra, color: "#9CC400" },
        { title: "Member promos", sub: "Spotify, month 1", amt: 2.4, color: "#B9A5FF" },
      ];
  if (tUsed)
    savedDefs.push({
      title: "Travel data",
      sub: "Airalo, 5GB for 7 days",
      amt: 5.64,
      color: "#1E1B2E",
    });
  var savedSum = 0;
  savedDefs.forEach(function (s) {
    savedSum += s.amt;
  });
  var savedRows = savedDefs.map(function (s, k) {
    return {
      title: s.title,
      sub: s.sub,
      color: s.color,
      amt: "BHD " + s.amt.toFixed(2),
      rule: k === savedDefs.length - 1 ? "none" : "1px solid #F1EFF7",
    };
  });
  var savedBar =
    savedSum > 0
      ? savedDefs.map(function (s) {
          return { grow: String(s.amt), color: s.color };
        })
      : [{ grow: "1", color: "#ECE8F5" }];
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
      ];
  if (tUsed)
    all.unshift({
      day: "Today",
      kind: "saved",
      mark: "A",
      bg: "#1E1B2E",
      ink: "#C0F402",
      name: "Airalo",
      sub: "Free travel data, 5GB",
      amt: "BHD 5.64",
      amtInk: green,
      note: "Saved",
    });
  var groups = [];
  all.slice(0, 3).forEach(function (r) {
    var g =
      groups.length && groups[groups.length - 1].day === r.day ? groups[groups.length - 1] : null;
    if (!g) {
      g = { day: r.day, rows: [], total: "", totalInk: "#6B6880" };
      groups.push(g);
    }
    g.rows.push(r);
  });
  groups.forEach(function (g) {
    var pts = 0;
    g.rows.forEach(function (r) {
      if (r.kind === "points") pts += parseInt(r.amt.replace("−", "-"), 10);
    });
    if (pts > 0) {
      g.total = "+" + pts + " points";
      g.totalInk = green;
    }
  });
  return Object.assign(travelVals, {
    points: shown.toLocaleString("en-US"),
    memberLine: isNew ? "Member since today" : "Member since August",
    giftLeft: "10 days left",
    giftMarks: giftMarks,
    ready: ready,
    readyCount: ready.length ? ready.length + " to use" : "",
    noActive: ready.length === 0,
    spend: [
      {
        brand: "The Coffee Bean",
        name: "Free upsize",
        pts: 300,
        logo: "/haiba/brands/coffee-bean.webp",
        bg: "#FCF4E9",
        href: "/shop/coffee-bean",
      },
      {
        brand: "Grip",
        name: "Protein shake",
        pts: 500,
        logo: "/haiba/brands/grip.webp",
        bg: "#000000",
      },
      {
        brand: "VOX Cinemas",
        name: "Popcorn",
        pts: 600,
        logo: "/haiba/brands/vox.webp",
        bg: "#FFFFFF",
      },
      {
        brand: "Wingman",
        name: "6 wings",
        pts: 900,
        logo: "/haiba/brands/wingman.webp",
        bg: "#F9F9F9",
      },
      {
        brand: "Alkuwaiti",
        name: "Interior clean",
        pts: 1500,
        logo: "/haiba/brands/alkuwaiti.webp",
        bg: "#FFFFFF",
      },
      {
        brand: "Albayan",
        name: "Travel perfume",
        pts: 2000,
        logo: "/haiba/brands/albayan.webp",
        bg: "#FFFFFF",
      },
    ].map(function (d) {
      var can = d.pts <= target;
      return Object.assign({}, d, {
        pts: d.pts.toLocaleString("en-US"),
        pillBg: can ? "#F0ECFF" : "#F1F1F4",
        pillInk: can ? "#4F25D6" : "#6B6880",
        dotOp: can ? "1" : "0.35",
      });
    }),
    savedTotal: "BHD " + savedSum.toFixed(2),
    savedBar: savedBar,
    savedRows: savedRows,
    groups: groups,
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
    dotDisp: state.navTipOpen ? "none" : "block",
    toggleNavTip: function () {
      setState({ navTipOpen: !state.navTipOpen });
    },
    navTip: isNew
      ? "Pick your October Unipass gift. You have 10 days left, and it is free."
      : "Your next visit at Jasmi’s is your 5th. It earns 200 points, not 40.",
    navTipHref: isNew ? "" : "/shop/coffee-bean/redeem",
    navTipCta: isNew ? "Pick my gift" : "See Jasmi’s offer",
  });
}
