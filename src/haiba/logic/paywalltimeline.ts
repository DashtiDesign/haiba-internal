// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ view: "", seenExit: false, step: 0, gift: -1 });
  useEffect(() => {}, []);

  var WORTH = { gifts: 30, spotify: 3, chatgpt: 9, travel: 5, points: 1 };
  var worthN = WORTH.gifts + WORTH.spotify + WORTH.chatgpt + WORTH.travel + WORTH.points;
  var p = Number(props.price ?? "20");
  // Money, deposit and launch date come from the prototype settings in the app. The canvas falls back to Bahrain.
  var cur = props.currency ?? "BHD";
  var fx = cur === "SAR" ? 10 : 1; // worth values below are kept in BHD; Saudi shows them in SAR
  var dep = Number(props.deposit ?? (cur === "SAR" ? "10" : "1"));
  var launch = props.launch ?? "8 Dec";
  var onReserve = props.onReserve;
  var onJoin = props.onJoin;
  // After launch the same page becomes the join page: full price with VAT, no deposit.
  var join = (props.mode ?? "Reserve") === "Join";
  var vatRate = cur === "SAR" ? 0.15 : 0.1;
  var M = function (x) {
    var v = Math.round(x * fx * 100) / 100;
    return cur + " " + (v % 1 ? v.toFixed(2) : String(v));
  };
  var D = function (x) {
    return cur + " " + (x * fx).toFixed(2);
  };
  p = p / fx; // price in BHD units for the maths below
  var totalTxt =
    props.total != null ? cur + " " + Number(props.total).toFixed(2) : D(p * (1 + vatRate));
  var name = props.name ?? "Sara";
  var bhd = function (x) {
    return D(x);
  };
  var view =
    state.view ||
    (props.state === "Exit sheet" ? "exit" : props.state === "Reserved" ? "reserved" : "page");
  // Value builds up month by month: when does the year pay for itself? (from promo D)
  var monthVal = function (m) {
    return 2.5 + (m <= 3 ? 1 + 3 : 0) + (m === 1 ? WORTH.travel + 0.5 : 0.08);
  };
  var cum = 0,
    payback = 12;
  for (var m = 1; m <= 12; m++) {
    cum += monthVal(m);
    if (cum >= p) {
      payback = m;
      break;
    }
  }
  var dayOne = WORTH.spotify + WORTH.chatgpt + WORTH.travel + 2.5 + 0.5;
  var shopName = props.shop ?? "The Coffee Bean";
  var SHOPGIFT = {
    "The Coffee Bean": "a free drink",
    Wingman: "a free student box",
    "VOX Cinemas": "a free cinema ticket",
  };
  var EXITLOGO = {
    "The Coffee Bean": ["/haiba/brands/coffee-bean.webp", "#FFFFFF"],
    Wingman: ["/haiba/brands/wingman.webp", "#F9F9F9"],
    "VOX Cinemas": ["/haiba/brands/vox.webp", "#FFFFFF"],
  };
  var common = {
    stepsTitle: join ? "Join today" : "Reserve now, pay later",
    s1Title: join ? "Haiba starts today" : "Your price is locked",
    s1Amt: join ? totalTxt : cur + " " + dep,
    s2When: join ? "This month" : launch,
    s2Title: join ? "Pick your first gift" : "Haiba opens. Pay the rest.",
    s2Amt: join ? "Free" : M(p - dep / fx),
    s2Sub: join ? "Spotify and ChatGPT too" : "+ VAT",
    tS1Title: join ? "Pay " + totalTxt : "Pay " + cur + " " + dep,
    tS1Sub: join
      ? "VAT included. Haiba starts today."
      : "Your price of " + M(p) + " a year is locked.",
    tS2When: join ? "Same day" : launch,
    tS2Title: join ? "Your first gift" : "Haiba opens",
    tS2Sub: join
      ? "Pick it, then use Spotify, ChatGPT and travel data."
      : "Pay the rest: " + M(p - dep / fx) + " + VAT.",
    refundLine: join
      ? "One payment a year. No auto renewal."
      : "Changed your mind? We give your " + cur + " " + dep + " back.",
    ctaMain: join ? "Join Haiba for " + totalTxt : "Reserve my spot for " + cur + " " + dep,
    ctaShort: join ? "Join for " + totalTxt : "Reserve for " + cur + " " + dep,
    ctaNote: join ? "VAT included. One payment for the year." : "No commitment. Refundable.",
    headPre: join ? "Join for " : "Start with ",
    headHi: join ? M(p) + " a year" : cur + " " + dep,
    headSub: join
      ? "One payment for the whole year, plus VAT."
      : "Lock your price before Haiba opens.",
    appsWhen: join
      ? "Free apps and travel data. You get them the day you join."
      : "Free apps and travel data. You get them when Haiba opens.",
    exitPre: join ? "Join today for " : "Pay ",
    exitHi: join ? M(p) + " a year" : cur + " " + dep,
    exitPost: join
      ? " + VAT. Your first gift is waiting."
      : " today to keep your price of " + M(p) + " a year. You can get it back any time.",
    cur: cur,
    dep: cur + " " + dep,
    dep2: cur + " " + dep.toFixed(2),
    launch: launch,
    wGiftEach: D(2.5),
    wWelcome: D(0.5),
    name: name,
    price: M(p),
    priceYear: M(p) + " a year",
    rest: M(p - dep / fx),
    perMonth: bhd(p / 12),
    worth: M(worthN) + "+",
    free: M(worthN - p) + "+ extra",
    paybackPct: Math.round((p / worthN) * 100) + "%",
    // Spotify, ChatGPT, travel data, the first gift and welcome points all land on day one
    dayOneSticker: dayOne >= p ? "Pays for itself on day one" : M(dayOne) + " of it on day one",
    dayOneLine:
      dayOne >= p
        ? "It pays for itself on day one. Then a new free gift every month."
        : M(dayOne) + " of it lands on day one. Then a new free gift every month.",
    dayOneHead:
      dayOne >= p
        ? "It pays for itself on day one."
        : "You get " + M(dayOne) + " of it on day one.",
    dayOneRest:
      "Spotify, ChatGPT, data and your first gift come first. Then a new gift every month.",
    // Exit sheet: what they missed last month at their own shop (from promo F)
    missTitle: SHOPGIFT[shopName]
      ? "Last month you went to " + shopName
      : "Every month without Haiba",
    missBody: SHOPGIFT[shopName]
      ? "With Haiba, you would get " + SHOPGIFT[shopName] + " and 80 points there."
      : "Without Haiba, you miss a free gift and points every month.",
    // 9 Nov: the exit sheet is one short title and one line, then the buttons.
    // 9 Nov: the exit sheet is a picture (their shop and a gift), one short line, then the buttons.
    exitTitle: "Before you go",
    exitShop: shopName,
    exitHasLogo: !!EXITLOGO[shopName],
    exitNoLogo: !EXITLOGO[shopName],
    exitLogo: EXITLOGO[shopName] ? EXITLOGO[shopName][0] : "",
    exitLogoBg: EXITLOGO[shopName] ? EXITLOGO[shopName][1] : "#FFFFFF",
    exitLogoPad: shopName === "The Coffee Bean" ? "0" : "8px",
    exitA: SHOPGIFT[shopName] ? "Get " : "Get ",
    exitB: SHOPGIFT[shopName] ? SHOPGIFT[shopName] : "a free gift",
    exitC: SHOPGIFT[shopName] ? " at " + shopName : " every month",
    missLine: SHOPGIFT[shopName]
      ? "You went to " + shopName + " last month. With Haiba, that was " + SHOPGIFT[shopName] + "."
      : "Every month without Haiba, you miss a free gift.",
    exitOpen: view === "exit",
    reservedOpen: view === "reserved",
    openExit: function () {
      setState({ view: state.seenExit ? "page" : "exit", seenExit: true });
    },
    closeExit: function () {
      setState({ view: "page" });
    },
    reserve: function () {
      var go = join ? onJoin : onReserve;
      if (go) go();
      else if (!join) setState({ view: "reserved" });
    },
    closeReserved: function () {
      setState({ view: "page" });
    },
  };
  return Object.assign(common, {
    wGifts: M(WORTH.gifts),
    wSpotify: M(WORTH.spotify),
    wChatgpt: M(WORTH.chatgpt),
    wTravel: M(WORTH.travel),
    wExtras: M(WORTH.spotify + WORTH.chatgpt + WORTH.travel),
    _x: 0,
  });
}
