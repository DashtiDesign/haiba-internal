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
  var all = [
    { key: "Bahrain", code: "BH", name: "Bahrain", live: true },
    { key: "Saudi", code: "SA", name: "Saudi Arabia", live: true },
    { key: "Qatar", code: "QA", name: "Qatar", live: false },
    { key: "Oman", code: "OM", name: "Oman", live: false },
  ].filter(function (c) {
    return c.key !== market;
  });
  var places = all.map(function (c, i) {
    return {
      code: c.code,
      name: c.name,
      sub: c.live ? "Use your data the day you land" : "Unipal is coming here soon",
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
    rules: [
      { text: "Yearly members get it from day one.", rule: "1px solid #F1EFF7" },
      { text: "Monthly members in Bahrain get it after 3 paid months.", rule: "1px solid #F1EFF7" },
      {
        text: "1 plan per member. Once you see the code, it is yours and the plan is used.",
        rule: "0",
      },
    ],
    ctaTitle: locked ? "Unlocks after 3 months" : revealed ? "Copy my code" : "Get my free data",
    ctaSub: locked
      ? 3 - paid + (3 - paid === 1 ? " month" : " months") + " to go"
      : revealed
        ? "Use by 27 Nov 2026"
        : "5GB for 7 days. 1 per member.",
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
