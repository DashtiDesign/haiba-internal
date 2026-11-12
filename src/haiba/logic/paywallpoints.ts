// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ view: "", seenExit: false, step: 0, gift: -1 });
  useEffect(() => {}, []);

  var WORTH = { gifts: 30, p1: 3, p2: 9, travel: 5, points: 1 };
  var worthN = WORTH.gifts + WORTH.p1 + WORTH.p2 + WORTH.travel + WORTH.points;
  var p = Number(props.price ?? "20");
  // Money, deposit and launch date come from the prototype settings in the app. The canvas falls back to Bahrain.
  var cur = props.currency ?? "BHD";
  // Subscription partners by market (11 Nov): Bahrain talabat pro and ChatGPT Go, Saudi HungerStation Plus and YouTube Premium Lite
  var SA = cur === "SAR";
  var P1 = SA
    ? {
        name: "HungerStation Plus",
        short: "Hunger\u200bStation",
        logo: "/haiba/brands/hungerstation.webp",
        bg: "#FBEF00",
        ink: "#5E2D20",
        sub: "#7A4A3A",
      }
    : {
        name: "talabat pro",
        short: "talabat pro",
        logo: "/haiba/brands/talabat.webp",
        bg: "#FF5A00",
        ink: "#FFFFFF",
        sub: "#FFE7DA",
      };
  var P2 = SA
    ? { name: "YouTube Premium Lite", short: "YouTube", logo: "/haiba/brands/youtube.webp" }
    : { name: "ChatGPT Go", short: "ChatGPT Go", logo: "/haiba/brands/chatgpt.webp" };
  var subsTxt = P1.name + " and " + P2.name;
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
  var dayOne = WORTH.p1 + WORTH.p2 + WORTH.travel + 2.5 + 0.5;
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
    p1Name: P1.name,
    p1Logo: P1.logo,
    p1Bg: P1.bg,
    p1Ink: P1.ink,
    p1Sub: P1.sub,
    p2Name: P2.name,
    p2Logo: P2.logo,
    p1Short: P1.short,
    p2Short: P2.short,
    subsTxt: subsTxt,
    stepsTitle: join ? "Join today" : "Reserve now, pay later",
    s1Title: join ? "Haiba starts today" : "Your price is locked",
    s1Amt: join ? totalTxt : cur + " " + dep,
    s2When: join ? "This month" : launch,
    s2Title: join ? "Pick your first gift" : "Haiba opens. Pay the rest.",
    s2Amt: join ? "Free" : M(p - dep / fx),
    s2Sub: join ? subsTxt + " too" : "+ VAT",
    tS1Title: join ? "Pay " + totalTxt : "Pay " + cur + " " + dep,
    tS1Sub: join
      ? "VAT included. Haiba starts today."
      : "Your price of " + M(p) + " a year is locked.",
    tS2When: join ? "Same day" : launch,
    tS2Title: join ? "Your first gift" : "Haiba opens",
    tS2Sub: join
      ? "Pick it, then use " + P1.name + ", " + P2.name + " and travel data."
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
    // Both subscriptions, travel data, the first gift and welcome points all land on day one
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
      P1.name +
      ", " +
      P2.name +
      ", data and your first gift come first. Then a new gift every month.",
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

  // 11 Nov: a smaller Haiba. One of: points only, points and apps, points and gifts.
  var KIND = "points";
  var welcome = Number(props.welcome ?? "5000");
  var welcomeTxt = welcome.toLocaleString("en-US");
  var W = function (x) {
    return cur + " " + Math.floor(x * fx) + "+";
  };
  var ptsN = 0.5 + welcome / 1000; // about BHD 0.50 earned in a year, plus the welcome points (1,000 points = BHD 1)
  var getN =
    ptsN + (KIND === "apps" ? WORTH.p1 + WORTH.p2 : 0) + (KIND === "gifts" ? WORTH.gifts : 0);
  var pageVals = {
    welcomeTxt: welcomeTxt,
    // what the welcome points buy (free drink 1,900, popcorn 600)
    welcomeEx:
      welcome >= 4400
        ? "2 free drinks and popcorn"
        : welcome >= 1900
          ? "a free drink"
          : "a free upsize",
    totalLabel: KIND === "points" ? "You get" : "Worth in 1 year",
    getBig: KIND === "points" ? welcomeTxt + "+ points" : W(getN),
    visits: [
      [80, "2x"],
      [80, "2x"],
      [40, ""],
      [40, ""],
      [200, "5x"],
    ].map(function (v, i) {
      var big = i === 4;
      return {
        pts: "+" + v[0],
        label: v[1] || "Visit " + (i + 1),
        delay: (0.5 + i * 0.25).toFixed(2) + "s",
        size: big ? "40px" : "30px",
        glow: big ? "hb-glow" : "",
        bg: big ? "#1E1B2E" : "#FFFFFF",
        ink: big ? "#C0F402" : "#1E1B2E",
      };
    }),
    giftArt:
      shopName === "VOX Cinemas"
        ? "/haiba/emoji/popcorn.webp"
        : shopName === "Wingman"
          ? "/haiba/emoji/wings.webp"
          : "/haiba/emoji/drink.webp",
    giftHook: SHOPGIFT[shopName]
      ? "Start with " + SHOPGIFT[shopName] + " at " + shopName + "."
      : "Start with a free drink, a meal or a cinema ticket.",
    s2Sub: join ? (KIND === "apps" ? subsTxt + " too" : "Your points are in") : "+ VAT",
    s2Title: join
      ? KIND === "gifts"
        ? "Pick your first gift"
        : KIND === "apps"
          ? "Get your app codes"
          : "Use your points"
      : "Haiba opens. Pay the rest.",
    exitLine:
      KIND === "gifts"
        ? "Every month, with Haiba."
        : KIND === "apps"
          ? "For 3 months, with Haiba."
          : "Then more points every visit.",
    exitIcon:
      KIND === "gifts"
        ? "/haiba/icons/hadiya.webp"
        : KIND === "apps"
          ? P2.logo
          : "/haiba/coins/coin-34.webp",
  };
  if (KIND === "apps")
    Object.assign(pageVals, {
      exitA: "Get ",
      exitB: P1.name + " free",
      exitC: "",
      exitHasLogo: true,
      exitNoLogo: false,
      exitLogo: P1.logo,
      exitLogoBg: "#FFFFFF",
      exitLogoPad: "0",
      exitShop: P1.name,
    });
  if (KIND === "points")
    Object.assign(pageVals, {
      exitA: "Get ",
      exitB: welcomeTxt + " points",
      exitC: " when you join",
    });
  return Object.assign(
    common,
    {
      wGifts: M(WORTH.gifts),
      wP1: M(WORTH.p1),
      wP2: M(WORTH.p2),
      wTravel: M(WORTH.travel),
      wExtras: M(WORTH.p1 + WORTH.p2 + WORTH.travel),
      wSubs: M(WORTH.p1 + WORTH.p2),
      giftSub: SHOPGIFT[shopName]
        ? "You pick. Start with " + SHOPGIFT[shopName] + " at " + shopName + "."
        : "You pick. Meals, coffee, cinema, gym and more.",
      _page: 0,
    },
    pageVals,
  );
}
