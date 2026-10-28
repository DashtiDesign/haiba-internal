// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ travel: "available", copied: false });
  useEffect(() => {}, []);

  var market = props.market ?? "Bahrain";
  var plan = props.plan ?? "Yearly";
  var monthly = plan.indexOf("Monthly") === 0;
  var paid = monthly ? Number((plan.match(/(\d)/) || [0, "1"])[1]) : 12;
  var locked = monthly && paid < 3;
  var t = state.travel || "available";
  var revealed = t === "revealed" || t === "redeemed";
  var FL = [
    { key: "Bahrain", name: "Bahrain", src: "/haiba/flags/bh.svg", pos: "center" },
    { key: "Saudi", name: "Saudi", src: "/haiba/flags/sa.svg", pos: "center" },
    { key: "Qatar", name: "Qatar", src: "/haiba/flags/qa.svg", pos: "center" },
    { key: "Oman", name: "Oman", src: "/haiba/flags/om.svg", pos: "left" },
  ];
  var LIVE = { Bahrain: true, Saudi: true, Qatar: false, Oman: false };
  var home =
    FL.filter(function (c) {
      return c.key === market;
    })[0] || FL[0];
  var route = [home]
    .concat(
      FL.filter(function (c) {
        return c.key !== home.key;
      }),
    )
    .map(function (c, i) {
      return Object.assign({}, c, {
        label: i === 0 ? "Home" : c.name,
        labelInk: i === 0 ? "#C0F402" : "#FFFFFF",
      });
    });
  var all = FL.filter(function (c) {
    return c.key !== home.key;
  }).map(function (c) {
    return Object.assign({}, c, {
      live: LIVE[c.key],
      name: c.key === "Saudi" ? "Saudi Arabia" : c.name,
    });
  });
  var places = all.map(function (c, i) {
    return {
      src: c.src,
      pos: c.pos,
      op: c.live ? "1" : "0.75",
      name: c.name,
      sub: c.live ? "Your Unipal deals work here" : "Unipal is coming here soon",
      pill: c.live ? "Live" : "Coming soon",
      pillBg: c.live ? "#C0F402" : "#F1F1F4",
      pillInk: c.live ? "#1F2600" : "#6B6880",
      bg: c.live ? "#6C3FFA" : "#F0ECFF",
      ink: c.live ? "#FFFFFF" : "#6C3FFA",
      nameInk: c.live ? "#1E1B2E" : "#6B6880",
      rule: i === all.length - 1 ? "0" : "1px solid #F1EFF7",
    };
  });
  var status = locked ? "Locked" : revealed ? "Used" : "Ready to use";
  return {
    status: status,
    statusBg: locked ? "#3A3550" : revealed ? "#3A3550" : "#C0F402",
    statusInk: locked ? "#E4DBFF" : revealed ? "#E4DBFF" : "#1F2600",
    locked: locked,
    lockLine: paid + " of 3 months paid on the monthly plan",
    lockSteps: [1, 2, 3].map(function (m) {
      var on = m <= paid;
      return {
        label: "Month " + m,
        bg: on ? "#6C3FFA" : "#E4DBFF",
        ink: on ? "#1E1B2E" : "#6B6880",
      };
    }),
    revealed: revealed,
    code: "HBAIR-7Q2X-K9M4",
    useBy: "27 Nov 2026",
    copyLabel: state.copied ? "Copied" : "Copy",
    copy: function () {
      try {
        navigator.clipboard.writeText("HBAIR-7Q2X-K9M4");
      } catch (e) {}
      setState({ copied: true });
    },
    steps: [
      { n: "1", text: "Download the Airalo app" },
      { n: "2", text: "Sign up with your email" },
      { n: "3", text: "Choose the 5GB, 7 day plan" },
      { n: "4", text: "Enter your code at checkout" },
    ],
    usedLine:
      t === "redeemed" ? "Used on Airalo. You saved BHD 5.64" : "Your free plan is now used",
    canAccept: t === "revealed",
    accept: function () {
      setState({ travel: "redeemed" });
    },
    places: places,
    route: route,
    rules: [
      { text: "Yearly members get it from day one.", rule: "1px solid #F1EFF7" },
      { text: "Monthly members in Bahrain get it after 3 paid months.", rule: "1px solid #F1EFF7" },
      { text: "Once you see the code, the plan is yours and shows as used.", rule: "0" },
    ],
    ctaTitle: locked ? "Unlocks after 3 months" : revealed ? "Copy my code" : "Get my free data",
    ctaSub: locked
      ? 3 - paid + (3 - paid === 1 ? " month" : " months") + " to go"
      : revealed
        ? "Use by 27 Nov 2026"
        : "Worth BHD 5+. Ready when you land.",
    ctaBg: locked ? "#E4DBFF" : "#1E1B2E",
    ctaInk: locked ? "#4A4660" : "#C0F402",
    ctaOp: "1",
    cta: function () {
      if (locked) return;
      if (!revealed) {
        setState({ travel: "revealed" });
        return;
      }
      try {
        navigator.clipboard.writeText("HBAIR-7Q2X-K9M4");
      } catch (e) {}
      setState({ copied: true });
    },
  };
}
