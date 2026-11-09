// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useMotionProgress } from "../useMotionProgress";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({
    t: 0,
    bird: "/haiba/motion/hub-still.webp",
    tipOpen: false,
    navTipOpen: null,
    openCode: "",
    menuOpen: false,
  });

  var isNew = (props.member ?? "Active member") === "New member";
  var td = props.today ? new Date(props.today + "T10:00:00") : new Date();
  var giftMonth = td.toLocaleDateString("en-GB", { month: "long" });
  var giftDaysLeft = new Date(td.getFullYear(), td.getMonth() + 1, 0).getDate() - td.getDate() + 1;
  // 9 Nov: this month's Hadiya follows the student: pick it, the code shows, the shop uses it.
  var gs = props.giftStatus ?? "Pick";
  var gReady = gs === "Code ready",
    gUsed = gs === "Used";
  var gItem = props.giftItem ?? "Regular drink";
  var gBrand = props.giftBrand ?? "The Coffee Bean";
  var gValue = Number(props.giftValue ?? 1.9);
  var gNextDays = giftDaysLeft;
  var gFirst =
    props.giftFirst ?? (props.giftBefore ? props.giftBefore === "Never used a gift" : isNew);
  // 9 Nov: the first 3 days of a month, a new gift is waiting: the small card says so with a New tag,
  // and the tip opens on its own once (closing it remembers that month).
  var gNew = !gFirst && (gs === "Pick, new month" || (gs === "Pick" && td.getDate() <= 3));
  var tipKey = "haiba-gift-tip-" + td.getFullYear() + "-" + (td.getMonth() + 1);
  var tipSeen = false;
  try {
    tipSeen = window.localStorage.getItem(tipKey) === "1";
  } catch (e) {}
  var tipOpen = state.navTipOpen === null ? gNew && !tipSeen : !!state.navTipOpen;
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
  // 9 Nov: every code that is showing is one list with one look (the gift code and reward codes).
  // The app passes the list in (journey/codes.ts); the canvas builds the same rows from its controls.
  var rw = [
    { name: "Free upsize", code: "8K3Q", pts: 300 },
    { name: "Cookie", code: "5TR2", pts: 700 },
    { name: "Regular drink", code: "9MX7", pts: 1900 },
  ];
  var sample = [];
  if (gReady)
    sample.push({
      key: "gift",
      kind: "gift",
      item: gItem,
      sub: gBrand,
      logo: props.giftLogo ?? "/haiba/brands/coffee-bean.webp",
      hasLogo: true,
      mark: "",
      bg: "#FFFFFF",
      ink: "#1E1B2E",
      href: "/haiba/code?kind=gift",
    });
  codeIds.forEach(function (id) {
    var i = parseInt(id.split("-")[0], 10);
    sample.push({
      key: id,
      kind: "reward",
      item: rw[i].name,
      sub: "The Coffee Bean · " + rw[i].pts + " points",
      logo: "/haiba/brands/coffee-bean.webp",
      hasLogo: true,
      mark: "CB",
      bg: "#FFFFFF",
      ink: "#1E1B2E",
      href: "/haiba/code?kind=reward",
    });
  });
  if (!isNew)
    sample.push({
      key: "caribou",
      kind: "reward",
      item: "Free upgrade",
      sub: "Caribou Coffee · 200 points",
      logo: "",
      hasLogo: false,
      mark: "C",
      bg: "#3B2A22",
      ink: "#FFFFFF",
      href: "/haiba/code?kind=reward",
    });
  // 9 Nov: the Hadiya code stands out (lime row, gift badge, label) and links to Hadiya, since it is the way in while a code shows.
  var ready = (props.activeCodes ?? sample).map(function (r) {
    var gift = r.kind === "gift";
    return Object.assign({}, r, {
      isCode: true,
      noLogo: !r.hasLogo,
      pill: "Show code",
      isGift: gift,
      rowBg: gift ? "#F6FFDE" : "transparent",
      pillBg: gift ? "#1F2600" : purple.pillBg,
      pillInk: gift ? "#C0F402" : purple.pillInk,
      openHadiya: function () {
        if (typeof nav === "function") nav("/haiba/hadiya");
      },
    });
  });
  ready.forEach(function (r, k) {
    r.rule = k === 0 ? "none" : "1px solid #F1EFF7";
  });
  var travel = props.travelStatus ?? "Available";
  var tLocked = travel === "Locked, monthly";
  var tUsed = travel === "Used at Airalo";
  var tShown = travel === "Code shown";
  var market = props.market ?? "Bahrain";
  var FL = [
    { key: "Bahrain", name: "Bahrain", src: "/haiba/flags/bh.svg", pos: "center" },
    { key: "Saudi", name: "Saudi", src: "/haiba/flags/sa.svg", pos: "center" },
    { key: "Qatar", name: "Qatar", src: "/haiba/flags/qa.svg", pos: "center" },
    { key: "Oman", name: "Oman", src: "/haiba/flags/om.svg", pos: "center" },
  ];
  var home =
    FL.filter(function (c) {
      return c.key === market;
    })[0] || FL[0];
  var away = FL.filter(function (c) {
    return c.key !== home.key;
  });
  var awayNames = away.map(function (c) {
    return c.name;
  });
  var travelTitle0 =
    "Going to " +
    awayNames.slice(0, -1).join(", ") +
    " or " +
    awayNames[awayNames.length - 1] +
    "?";
  var travelVals = {
    travelTitle:
      "Going to " +
      awayNames.slice(0, -1).join(", ") +
      " or " +
      awayNames[awayNames.length - 1] +
      "?",
    travelAway: away.map(function (c, i) {
      return Object.assign({}, c, { ml: i === 0 ? "0" : "-8px" });
    }),
    travelRowSub: tLocked
      ? "Unlocks after 3 months on the monthly plan"
      : tUsed
        ? "You saved BHD 5.64"
        : tShown
          ? "Your Airalo code is ready"
          : travelTitle0 + " We’ve got you.",
    // 9 Nov: a used perk turns into a light card with a green Used tick; only a locked perk shows a pill.
    travelDark: !tUsed,
    travelUsed: tUsed,
    travelLocked: tLocked,
    travelOpen: !tLocked,
    travelBg: tUsed ? "#FFFFFF" : "#1E1B2E",
    travelInk: tUsed ? "#1E1B2E" : "#FFFFFF",
    travelHi: tUsed ? "#4F25D6" : "#C0F402",
    travelSubInk: tUsed ? "#6B6880" : "#B9B3CC",
    travelShadow: tUsed
      ? "0 0 0 1px #E9E5F4, 0 6px 18px rgba(76,52,140,0.06)"
      : "0 12px 24px rgba(30,27,46,0.18)",
    travelOp: tUsed ? "0.6" : "1",
    travelSub: tLocked
      ? "Unlocks after 3 months on the monthly plan."
      : tUsed
        ? "Used on Airalo. You saved BHD 5.64."
        : tShown
          ? "Your Airalo code is ready to use."
          : "5GB free for 7 days, worth BHD 5+.",
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
        {
          title: "Hadiya",
          sub: gUsed ? gItem + " at " + gBrand : "1 free item a month",
          amt: gUsed ? gValue : 0,
          color: "#6C3FFA",
        },
        {
          title: "Rewards",
          sub: savedExtra > 0 ? "Accepted at the shop" : "Free items for your points",
          amt: savedExtra,
          color: "#9CC400",
        },
        { title: "Subscriptions", sub: "Spotify, 3 months free", amt: 0, color: "#B9A5FF" },
      ]
    : [
        {
          title: "Hadiya",
          sub: gUsed ? "2 gifts, Wingman and " + gBrand : "1 gift, Wingman",
          amt: 2.85 + (gUsed ? gValue : 0),
          color: "#6C3FFA",
        },
        { title: "Rewards", sub: "Accepted at the shop", amt: 2.45 + savedExtra, color: "#9CC400" },
        { title: "Subscriptions", sub: "Spotify, month 1", amt: 2.4, color: "#B9A5FF" },
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
  // 8 Nov: an active member's card is the top of the Savings and activity page: Unipal offers plus Haiba on top.
  var haibaSum = savedSum;
  if (!isNew) {
    savedDefs = [
      { title: "Unipal offers", sub: "Every Unipal offer you used", amt: 19.7, color: "#1E1B2E" },
      {
        title: "Haiba on top",
        sub: "Rewards, Hadiya and subscriptions",
        amt: haibaSum,
        color: "#6C3FFA",
      },
    ];
    savedSum = 19.7 + haibaSum;
  }
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
        // 8 Nov: the same story as the Savings and activity page, each line with points and money saved.
        {
          day: "Today",
          kind: "points",
          mark: "CB",
          bg: "#4B2E83",
          ink: "#FFFFFF",
          name: "The Coffee Bean",
          sub: "Offer used, 2x points",
          amt: "+80",
          amtInk: green,
          note: "BHD 1.20 saved",
        },
        {
          day: "Today",
          kind: "points",
          mark: "CB",
          bg: "#4B2E83",
          ink: "#FFFFFF",
          name: "Free upsize",
          sub: "Reward at The Coffee Bean",
          amt: "−300",
          amtInk: plum,
          note: "BHD 0.30 saved",
        },
        {
          day: "Yesterday",
          kind: "points",
          mark: "J",
          bg: "#D62828",
          ink: "#FFFFFF",
          name: "Jasmi’s",
          sub: "Offer used, 4th visit",
          amt: "+40",
          amtInk: green,
          note: "BHD 2.00 saved",
        },
        {
          day: "Yesterday",
          kind: "saved",
          mark: "",
          icon: "/haiba/icons/hadiya.webp",
          bg: "#C0F402",
          ink: "#1F2600",
          name: "January gift",
          sub: "Regular drink at The Coffee Bean",
          amt: "BHD 1.90",
          amtInk: green,
          note: "Hadiya",
        },
      ];
  if (gUsed)
    all.unshift({
      day: "Today",
      kind: "saved",
      mark: "",
      icon: "/haiba/icons/hadiya.webp",
      bg: "#C0F402",
      ink: "#1F2600",
      name: giftMonth + " gift",
      sub: gItem + " at " + gBrand,
      amt: "BHD " + gValue.toFixed(2),
      amtInk: green,
      note: "Hadiya",
    });
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
  var acts = all.slice(0, 4).map(function (r, i, arr) {
    var money = r.amt.indexOf("BHD") === 0;
    var num = money ? r.amt.replace("BHD ", "") : r.amt;
    return {
      mark: r.mark,
      icon: r.icon || "",
      hasIcon: !!r.icon,
      noIcon: !r.icon,
      bg: r.bg,
      ink: r.ink,
      name: r.name,
      sub: r.sub,
      note: r.note,
      amtInk: r.amtInk,
      pre: money ? "BHD " : "",
      main: money ? num.split(".")[0] : num,
      dec: money ? "." + num.split(".")[1] : "",
      badge: money ? "✓" : "H",
      badgeBg: money ? "#C0F402" : "#6C3FFA",
      badgeInk: money ? "#1F2600" : "#C0F402",
      rule: i === arr.length - 1 ? "none" : "1px solid #F1EFF7",
    };
  });
  var actGroups = [];
  all.slice(0, 4).forEach(function (r, i) {
    var g =
      actGroups.length && actGroups[actGroups.length - 1].day === r.day
        ? actGroups[actGroups.length - 1]
        : null;
    if (!g) {
      g = { day: r.day, rows: [], pts: 0, bhd: 0 };
      actGroups.push(g);
    }
    g.rows.push(acts[i]);
    if (r.kind === "points") g.pts += parseInt(r.amt.replace("−", "-"), 10);
    else g.bhd += parseFloat(r.amt.replace("BHD ", ""));
  });
  actGroups.forEach(function (g) {
    g.total = "";
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
    sinceLine: isNew ? "Since today" : "Since 2 Dec",
    actGroups: actGroups,
    memberLine: isNew ? "Member since today" : "Member since December",
    giftLeft: giftDaysLeft === 1 ? "Last day" : giftDaysLeft + " days left",
    giftTitle: gUsed
      ? "You got your " + giftMonth + " gift"
      : gReady
        ? gItem + " at " + gBrand
        : "Pick your " + giftMonth + " gift",
    // 9 Nov: the big lime card only until the first gift is used. Then a small card, and none while a code shows.
    gcBig: gFirst && !gReady && !gUsed,
    gcSmall: !gFirst && !gReady,
    gsBg: gUsed ? "#FFFFFF" : "#C0F402",
    gsInk: gUsed ? "#1E1B2E" : "#1F2600",
    gsShadow: gUsed
      ? "0 0 0 1px #E9E5F4, 0 6px 18px rgba(76,52,140,0.06)"
      : "0 10px 22px rgba(110,140,0,0.18)",
    gsTileBg: gUsed ? "#F0EBFF" : "rgba(255,255,255,0.55)",
    gsTitle: gUsed
      ? giftMonth + " gift used"
      : gNew
        ? "Your " + giftMonth + " gift is here"
        : "Pick your " + giftMonth + " gift",
    gsNew: gNew,
    gsSub: gUsed
      ? "Next gift in " + (gNextDays === 1 ? "1 day" : gNextDays + " days")
      : giftDaysLeft === 1
        ? "Last day to pick"
        : giftDaysLeft + " days left",
    gsSubInk: gUsed ? "#6B6880" : "#3D5000",
    gsCta: gUsed ? "See gifts" : "Pick",
    gsCtaBg: gUsed ? "#F0EBFF" : "#1F2600",
    gsCtaInk: gUsed ? "#4F25D6" : "#C0F402",
    gcBg: gUsed ? "#FFFFFF" : "#C0F402",
    gcInk: gUsed ? "#1E1B2E" : "#1F2600",
    gcShadow: gUsed
      ? "0 0 0 1px #E9E5F4, 0 6px 18px rgba(76,52,140,0.06)"
      : "0 14px 28px rgba(110,140,0,0.22)",
    gcPill: gUsed
      ? "✓ Used"
      : gReady
        ? "Code ready"
        : giftDaysLeft === 1
          ? "Last day"
          : giftDaysLeft + " days left",
    gcPillBg: gUsed ? "#E8F5E3" : "#1F2600",
    gcPillInk: gUsed ? "#2F7D32" : "#C0F402",
    gcHasSub: gUsed || gReady,
    gcSub: gUsed
      ? gItem + " at " + gBrand + ". You saved BHD " + gValue.toFixed(2) + "."
      : "Show the code at the counter.",
    gcSubInk: gUsed ? "#6B6880" : "#3D5000",
    gcPicking: !gUsed && !gReady,
    gcHasLogo: gReady,
    gcLogo: props.giftLogo ?? "/haiba/brands/coffee-bean.webp",
    gcLogoBg: props.giftLogoBg ?? "#FFFFFF",
    gcBrand: gBrand,
    gcCta: gUsed
      ? "Next gift in " + (gNextDays === 1 ? "1 day" : gNextDays + " days")
      : gReady
        ? "Show my code"
        : "Pick my gift",
    gcCtaBg: gUsed ? "#F0EBFF" : "#1F2600",
    gcCtaInk: gUsed ? "#4F25D6" : "#C0F402",
    giftHref: gReady ? "/haiba/code?kind=gift" : "/haiba/hadiya",
    giftMarks: giftMarks,
    ready: ready,
    // 8 Nov: the menu (top right) holds the pages about you: savings and activity, membership, subscriptions, help.
    menuOpen: state.menuOpen,
    menuOpenStr: String(state.menuOpen),
    toggleMenu: function () {
      setState({ menuOpen: !state.menuOpen });
    },
    menuRows: [
      {
        href: "Sav01Saved.dc.html",
        route: "/haiba/saved",
        title: "Savings and activity",
        sub: "What you saved, your points and visits",
        icon: "/haiba/coins/coin-front.webp",
        iw: "28px",
        bg: "#F0ECFF",
        hasIcon: true,
        isHelp: false,
      },
      {
        href: "Mem01Membership.dc.html",
        route: "/haiba/membership",
        title: "Membership",
        sub: "Your Haiba card, plan and receipts",
        icon: "/haiba/logo-lime.svg",
        iw: "32px",
        bg: "#6C3FFA",
        hasIcon: true,
        isHelp: false,
      },
      {
        href: "Sub01Offers.dc.html",
        route: "/haiba/subscriptions",
        title: "Subscriptions",
        sub: "Spotify and ChatGPT codes",
        icon: "/haiba/brands/spotify.webp",
        iw: "44px",
        bg: "#000000",
        hasIcon: true,
        isHelp: false,
      },
      {
        href: "Hlp01Help.dc.html",
        route: "/haiba/help",
        title: "Help and questions",
        sub: "How Haiba and points work, chat with us",
        icon: "",
        iw: "0",
        bg: "#F0ECFF",
        hasIcon: false,
        isHelp: true,
      },
    ].map(function (m, k) {
      return Object.assign(m, { rule: k === 0 ? "none" : "1px solid #F1EFF7" });
    }),
    subsPill: isNew ? "2 to claim" : "1 to claim",
    subsRule: ready.length ? "1px solid #F1EFF7" : "none",
    hasActive: ready.length > 0,
    readyCount: ready.length ? ready.length + " to use" : "",
    noActive: ready.length === 0,
    spend: [
      {
        brand: "The Coffee Bean",
        name: "Free upsize",
        pts: 300,
        logo: "/haiba/brands/coffee-bean.webp",
        bg: "#FFFFFF",
        img: "/haiba/emoji/drink.webp",
        tint: "#FFEFD9",
        href: "/haiba/rewards",
      },
      {
        brand: "Grip",
        name: "Protein shake",
        pts: 500,
        logo: "/haiba/brands/grip.webp",
        bg: "#000000",
        img: "/haiba/emoji/shake.webp",
        tint: "#FCE4F0",
      },
      {
        brand: "VOX Cinemas",
        name: "Popcorn",
        pts: 600,
        logo: "/haiba/brands/vox.webp",
        bg: "#FFFFFF",
        img: "/haiba/emoji/popcorn.webp",
        tint: "#EDE4FF",
      },
      {
        brand: "Wingman",
        name: "6 wings",
        pts: 900,
        logo: "/haiba/brands/wingman.webp",
        bg: "#FFFFFF",
        img: "/haiba/emoji/wings.webp",
        tint: "#FFEFD9",
      },
      {
        brand: "Alkuwaiti",
        name: "Interior clean",
        pts: 1500,
        logo: "/haiba/brands/alkuwaiti.webp",
        bg: "#FFFFFF",
        img: "/haiba/emoji/car.webp",
        tint: "#DDF1FF",
      },
      {
        brand: "Albayan",
        name: "Travel perfume",
        pts: 2000,
        logo: "/haiba/brands/albayan.webp",
        bg: "#FFFFFF",
        img: "/haiba/emoji/perfume.webp",
        tint: "#FCE4F0",
      },
    ].map(function (d) {
      var can = d.pts <= target;
      return Object.assign({}, d, {
        hasLogo: !!d.logo,
        noLogo: !d.logo,
        mark: d.brand.charAt(0),
        pts: d.pts.toLocaleString("en-US"),
        pillBg: can ? "#F0ECFF" : "#F1F1F4",
        pillInk: can ? "#4F25D6" : "#6B6880",
        dotOp: can ? "1" : "0.35",
      });
    }),
    savedTotal: "BHD " + savedSum.toFixed(2),
    savedNote: isNew
      ? "A reward counts when the shop accepts your code."
      : "Since 2 Dec · Haiba has paid back " +
        Math.round((haibaSum / 24.2) * 100) +
        "% of its price",
    savedBar: savedBar,
    savedRows: savedRows,
    groups: groups,
    acts: acts,
    birdClass: "", // no code motion on the mascot, only the real loops
    birdSrc: state.bird,
    poke: function () {},
    tipOpen: state.tipOpen,
    tip: isNew
      ? "Hi! Your 500 points are ready to use today."
      : "Hi! One more visit at Jasmi’s and you earn 5x.",
    navTipOpen: tipOpen,
    navTipOpenStr: String(tipOpen),
    dotDisp: tipOpen ? "none" : "block",
    toggleNavTip: function () {
      if (tipOpen && gNew) {
        try {
          window.localStorage.setItem(tipKey, "1");
        } catch (e) {}
      }
      setState({ navTipOpen: !tipOpen });
    },
    navTip: gNew
      ? "Your " + giftMonth + " gift is here. Pick it any day this month."
      : isNew && (gUsed || gReady)
        ? "Every Unipal offer you use earns points. Spend them on free food, coffee and more."
        : isNew
          ? "Pick your " +
            giftMonth +
            " Hadiya. You have " +
            (giftDaysLeft === 1 ? "1 day" : giftDaysLeft + " days") +
            " left, and it is free."
          : "Your next visit at Jasmi’s is your 5th. It earns 200 points, not 40.",
    navTipHref: isNew && !(gUsed || gReady) ? "/haiba/hadiya" : "/haiba/earn",
    navTipCta: gNew
      ? "Pick my gift"
      : isNew && (gUsed || gReady)
        ? "How points work"
        : isNew
          ? "Pick my gift"
          : "See my bonus",
    earnSub: isNew
      ? "Your first visit at every shop earns 2x points"
      : "Your next visit at Jasmi’s earns +200 points",
    bonusTag: isNew ? "2x" : "5x",
  });
}
