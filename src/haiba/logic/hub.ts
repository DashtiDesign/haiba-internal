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
  });

  var isNew = (props.member ?? "Active member") === "New member";
  var t = useMotionProgress();
  var target = props.available;
  var shown = Math.round(target * t);
  var arcLen = 440;
  var pct = (isNew ? 1 : Math.min(1, props.available / 1800)) * t;
  var green = "#2F7D32";
  var plum = "#1E1B2E";
  var heldCodes = props.codes ?? 0;
  var savedExtra = props.savedRewards ?? 0;
  var codes = (isNew ? 0 : 1) + heldCodes;
  var actions = [
    {
      label: "Rewards",
      href: "/shop/coffee-bean",
      icon: "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z",
    },
    {
      label: "My codes",
      href: "/haiba/basket",
      icon: "M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4zM14 6v2M14 11v2M14 16v2",
    },
    {
      label: "Wallet",
      href: "/haiba/wallet",
      icon: "M20 12V8H6a2 2 0 0 1 0-4h12v4M4 6v12a2 2 0 0 0 2 2h14v-4M18 12a2 2 0 0 0 0 4h4v-4z",
    },
  ];
  actions.forEach(function (a) {
    a.hasBadge = false;
    a.badge = "";
  });
  actions[1].hasBadge = codes > 0;
  actions[1].badge = String(codes);
  var giftMarks = [
    { mark: "J", bg: "#D62828", ink: "#FFFFFF" },
    { mark: "V", bg: "#1E1B2E", ink: "#FFFFFF" },
    { mark: "CB", bg: "#4B2E83", ink: "#FFFFFF" },
    { mark: "+10", bg: "#FFFFFF", ink: "#1F2600" },
  ];
  var purple = { pillBg: "#6C3FFA", pillInk: "#FFFFFF" };
  var lime = { pillBg: "#F4FFD1", pillInk: "#3D5000" };
  var soft = { pillBg: "#E3F5E8", pillInk: "#1B6B36" };
  var ready = isNew
    ? [
        Object.assign(
          {
            mark: "CB",
            bg: "#4B2E83",
            ink: "#FFFFFF",
            title: "Your first reward",
            meta: "Enough for an upsize",
            metaInk: "#6B6880",
            pill: "Use points",
            href: "/shop/coffee-bean",
          },
          purple,
        ),
        Object.assign(
          {
            mark: "CB",
            bg: "#4B2E83",
            ink: "#FFFFFF",
            title: "The Coffee Bean, 2x points",
            meta: "Your first 2 visits earn 80",
            metaInk: "#6B6880",
            pill: "2x",
            href: "/shop/coffee-bean",
          },
          lime,
        ),
        Object.assign(
          {
            mark: "S",
            bg: "#E3F5E8",
            ink: "#1B6B36",
            title: "Spotify, 3 months free",
            meta: "Claim by 31 Oct",
            metaInk: "#B4471F",
            pill: "Claim",
          },
          soft,
        ),
      ]
    : [
        Object.assign(
          {
            mark: "C",
            bg: "#3B2A22",
            ink: "#FFFFFF",
            title: "Caribou, free upgrade",
            meta: "Use by 12 Nov",
            metaInk: "#6B6880",
            pill: "Show code",
            href: "/haiba/basket",
          },
          purple,
        ),
        Object.assign(
          {
            mark: "CB",
            bg: "#4B2E83",
            ink: "#FFFFFF",
            title: "The Coffee Bean, 2x points",
            meta: "Your next visit earns 80",
            metaInk: "#6B6880",
            pill: "+80",
            href: "/shop/coffee-bean",
          },
          lime,
        ),
        Object.assign(
          {
            mark: "S",
            bg: "#E3F5E8",
            ink: "#1B6B36",
            title: "Spotify Premium",
            meta: "Month 2 of 3 free",
            metaInk: "#6B6880",
            pill: "Active",
          },
          soft,
        ),
      ];
  if (isNew && heldCodes > 0) {
    ready[0] = Object.assign(
      {
        mark: "CB",
        bg: "#4B2E83",
        ink: "#FFFFFF",
        title: "The Coffee Bean, your reward",
        meta: heldCodes === 1 ? "1 code ready to show" : heldCodes + " codes ready to show",
        metaInk: "#6B6880",
        pill: "Show code",
        href: "/haiba/basket",
      },
      purple,
    );
  }
  ready.forEach(function (r, k) {
    r.rule = k === 0 ? "none" : "1px solid #F1EFF7";
  });
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
        { title: "Unipass gifts", sub: "1 gift, Jasmi’s", amt: 2.85, color: "#6C3FFA" },
        { title: "Rewards", sub: "Accepted at the shop", amt: 2.45 + savedExtra, color: "#9CC400" },
        { title: "Member promos", sub: "Spotify, month 1", amt: 2.4, color: "#B9A5FF" },
      ];
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
  return {
    greeting: "Hi Sara",
    points: shown.toLocaleString("en-US"),
    arcDash: Math.round(arcLen * pct) + " " + arcLen,
    arcGoal: isNew ? "500" : "1,800",
    subLine: isNew
      ? heldCodes > 0
        ? "Your reward code is ready to show"
        : "Enough for your first reward today"
      : target < 1800
        ? (1800 - target).toLocaleString("en-US") + " more points for a free coffee at Caribou"
        : "Enough for a free coffee at Caribou",
    actions: actions,
    giftLeft: "10 days left",
    giftMarks: giftMarks,
    ready: ready,
    readyCount: ready.length + " things",
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
  };
}
