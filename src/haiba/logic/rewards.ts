// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({
    q: "",
    chip: "All",
    sheet: "",
    ask: "",
    demo: "",
    codesQty: [0, 0, 0],
    cancelled: [],
    accepted: [],
    done: false,
  });
  useEffect(() => {}, []);

  var isNew = (props.member ?? "Active member") === "New member";
  var SHOPS = [
    {
      key: "cb",
      name: "The Coffee Bean",
      cat: "Coffee",
      logo: "/haiba/brands/coffee-bean.webp",
      bg: "#FFFFFF",
      visits: 1,
      live: true,
      rewards: [
        {
          name: "Free upsize",
          sub: "Any drink, one size up",
          pts: 300,
          value: 0.3,
          ph: "DRINK",
          phBg: "#EDE4FF",
          phInk: "#4F25D6",
          code: "8K3Q",
        },
        {
          name: "Cookie",
          sub: "Chocolate chip or oat",
          pts: 700,
          value: 0.7,
          ph: "COOKIE",
          phBg: "#F6E7D2",
          phInk: "#7A4E2D",
          code: "5TR2",
        },
        {
          name: "Regular drink",
          sub: "Hot or iced, regular size",
          pts: 1900,
          value: 1.9,
          ph: "DRINK",
          phBg: "#E3DCD6",
          phInk: "#3B2A22",
          code: "9MX7",
        },
      ],
    },
    {
      key: "jasmis",
      name: "Jasmi’s",
      cat: "Food",
      mark: "J",
      bg: "#D62828",
      visits: 4,
      rewards: [
        {
          name: "Soft drink",
          sub: "Any can or bottle",
          pts: 350,
          ph: "DRINK",
          phBg: "#FDE4E4",
          phInk: "#B11D1D",
        },
        {
          name: "Fries",
          sub: "Regular size",
          pts: 600,
          ph: "FRIES",
          phBg: "#FFF1D6",
          phInk: "#8A5A00",
        },
      ],
    },
    {
      key: "caribou",
      name: "Caribou Coffee",
      cat: "Coffee",
      mark: "C",
      bg: "#3B2A22",
      visits: 2,
      rewards: [
        {
          name: "Free upgrade",
          sub: "Any drink, one size up",
          pts: 200,
          ph: "DRINK",
          phBg: "#EFE6DE",
          phInk: "#3B2A22",
        },
        {
          name: "Pastry",
          sub: "Croissant or muffin",
          pts: 900,
          ph: "PASTRY",
          phBg: "#F6E7D2",
          phInk: "#7A4E2D",
        },
      ],
    },
    {
      key: "saffron",
      name: "Saffron Kitchen",
      cat: "Food",
      mark: "S",
      bg: "#E07A1F",
      visits: 1,
      rewards: [
        {
          name: "Samosa",
          sub: "2 pieces",
          pts: 400,
          ph: "SAMOSA",
          phBg: "#FFF1D6",
          phInk: "#8A5A00",
        },
      ],
    },
    {
      key: "barns",
      name: "Barn’s",
      cat: "Coffee",
      mark: "B",
      bg: "#7A4E2D",
      visits: 3,
      rewards: [
        {
          name: "Cookie",
          sub: "Any cookie",
          pts: 500,
          ph: "COOKIE",
          phBg: "#F6E7D2",
          phInk: "#7A4E2D",
        },
      ],
    },
    {
      key: "vox",
      name: "VOX Cinemas",
      cat: "Cinema",
      logo: "/haiba/brands/vox.webp",
      bg: "#FFFFFF",
      visits: 0,
      rewards: [
        {
          name: "Popcorn",
          sub: "Regular, salted or sweet",
          pts: 600,
          ph: "POPCORN",
          phBg: "#FFF4CC",
          phInk: "#8A6A00",
        },
      ],
    },
    {
      key: "wingman",
      name: "Wingman",
      cat: "Food",
      logo: "/haiba/brands/wingman.webp",
      bg: "#F9F9F9",
      visits: 0,
      rewards: [
        {
          name: "6 wings",
          sub: "Any sauce",
          pts: 900,
          ph: "WINGS",
          phBg: "#FDE9DA",
          phInk: "#9A4A12",
        },
      ],
    },
    {
      key: "grip",
      name: "Grip",
      cat: "Gym",
      logo: "/haiba/brands/grip.webp",
      bg: "#000000",
      visits: 0,
      rewards: [
        {
          name: "Protein shake",
          sub: "After your workout",
          pts: 500,
          ph: "SHAKE",
          phBg: "#E6F4EA",
          phInk: "#1E5E2E",
        },
      ],
    },
    {
      key: "albayan",
      name: "Albayan",
      cat: "Beauty",
      logo: "/haiba/brands/albayan.webp",
      bg: "#FFFFFF",
      visits: 0,
      rewards: [
        {
          name: "Travel perfume",
          sub: "10ml",
          pts: 2000,
          ph: "PERFUME",
          phBg: "#F3EEFF",
          phInk: "#4F25D6",
        },
      ],
    },
    {
      key: "alkuwaiti",
      name: "Alkuwaiti",
      cat: "Car",
      logo: "/haiba/brands/alkuwaiti.webp",
      bg: "#FFFFFF",
      visits: 0,
      rewards: [
        {
          name: "Interior clean",
          sub: "Any car size",
          pts: 1500,
          ph: "CAR",
          phBg: "#E9F1FB",
          phInk: "#1D4E89",
        },
      ],
    },
  ];
  if (isNew)
    SHOPS.forEach(function (s) {
      s.visits = 0;
    });
  var nextPts = function (v) {
    var n = v + 1;
    return n <= 2 ? 80 : n % 5 === 0 ? 200 : 40;
  };
  var nextTag = function (v) {
    var n = v + 1;
    return n <= 2 ? "2x" : n % 5 === 0 ? "5x" : "";
  };
  var stamps = function (v) {
    var out = [];
    for (var k = 1; k <= 5; k++) {
      var done = k <= v,
        nx = k === v + 1;
      out.push({
        tag: done ? "✓" : k <= 2 ? "2x" : k === 5 ? "5x" : "",
        bg: done ? "#6C3FFA" : nx ? "#C0F402" : "#F3F0FA",
        ink: done ? "#FFFFFF" : nx ? "#1F2600" : "#8F89A8",
        ring: done ? "#6C3FFA" : nx ? "#C0F402" : "#E4DBFF",
      });
    }
    return out;
  };
  var withLogo = function (s) {
    return { hasLogo: !!s.logo, noLogo: !s.logo, logo: s.logo || "", mark: s.mark || "", bg: s.bg };
  };
  // points: the Coffee Bean codes are live and shared with the hub
  var balance = props.base;
  var cq = (state.codesQty || [0, 0, 0]).slice();
  while (cq.length < 3) cq.push(0);
  var cancelled = state.cancelled || [];
  var accepted = state.accepted || [];
  var committed = 0;
  SHOPS[0].rewards.forEach(function (d, i) {
    for (var k = 0; k < cq[i]; k++) {
      if (cancelled.indexOf(i + "-" + k) < 0) committed += d.pts;
    }
  });
  var left = balance - committed;
  var q = (state.q || "").toLowerCase();
  var chip = state.chip || "All";
  var openShop = function (key) {
    return function () {
      setState({ sheet: key, ask: "", demo: "" });
    };
  };
  var sh = SHOPS.filter(function (s) {
    return s.key === state.sheet;
  })[0];
  var sheet = null;
  if (sh) {
    var np = nextPts(sh.visits);
    sheet = Object.assign(withLogo(sh), {
      name: sh.name,
      cat: sh.cat,
      earnTitle:
        sh.visits === 0
          ? "New to you. Your first visit earns 2x."
          : "Visit " +
            sh.visits +
            " done. Your next visit earns " +
            (nextTag(sh.visits) || "the usual") +
            ".",
      earnPts: "+" + np + " points",
      stamps: stamps(sh.visits % 5),
      rewards: sh.rewards.map(function (d, i) {
        var can = d.pts <= left;
        var key = sh.key + "-" + i;
        var r = {
          name: d.name,
          ph: d.ph,
          phBg: d.phBg,
          phInk: d.phInk,
          pts: d.pts.toLocaleString("en-US") + " points",
          sub: can ? d.sub : (d.pts - left).toLocaleString("en-US") + " more points needed",
          ptsBg: can ? "#F0ECFF" : "#F1F1F4",
          ptsInk: can ? "#4F25D6" : "#8A8A96",
          btnBg: can ? "#1E1B2E" : "#E4E4EA",
          btnInk: can ? "#C0F402" : "#8A8A96",
          useLabel: "Use " + d.pts + " points for " + d.name,
          askLine:
            "Use " +
            d.pts.toLocaleString("en-US") +
            " points for a " +
            d.name.toLowerCase() +
            "? Your code shows here.",
          rule: i === 0 ? "none" : "1px solid #F1EFF7",
          held: false,
          isUsed: false,
          asking: false,
          demo: false,
          showUse: true,
          code: "",
          savedLine: "",
          againOp: "1",
          notNow: function () {
            setState({ ask: "" });
          },
          confirm: function () {},
          cancel: function () {},
          accept: function () {},
          again: function () {},
        };
        if (sh.live) {
          var lastK = -1;
          for (var k = cq[i] - 1; k >= 0; k--) {
            if (cancelled.indexOf(i + "-" + k) < 0) {
              lastK = k;
              break;
            }
          }
          var id = i + "-" + lastK;
          var held = lastK >= 0 && accepted.indexOf(id) < 0;
          var used = lastK >= 0 && !held;
          var asking = state.ask === key && !held;
          var usedCount = 0;
          for (var k3 = 0; k3 < cq[i]; k3++) {
            if (accepted.indexOf(i + "-" + k3) >= 0) usedCount++;
          }
          if (held || used) {
            r.sub = d.sub;
            r.ptsBg = "#F0ECFF";
            r.ptsInk = "#4F25D6";
          }
          r.held = held;
          r.isUsed = used && !asking;
          r.asking = asking;
          r.showUse = !held && !used && !asking;
          r.code = "HB-" + d.code + "-" + (lastK + 1);
          r.savedLine = "You saved BHD " + (d.value * usedCount).toFixed(2);
          r.againOp = can ? "1" : "0.4";
          r.ask = function () {
            if (can) setState({ ask: key });
          };
          r.again = r.ask;
          r.confirm = function () {
            var n = cq.slice();
            n[i] = n[i] + 1;
            setState({ ask: "", codesQty: n, done: true });
          };
          r.cancel = function () {
            setState({ cancelled: cancelled.concat([id]) });
          };
          r.accept = function () {
            setState({ accepted: accepted.concat([id]) });
          };
        } else {
          r.demo = state.demo === key;
          r.ask = function () {
            if (can) setState({ demo: key });
          };
        }
        return r;
      }),
    });
  }
  var sheetFlat = {};
  var sheetSrc = sheet || {
    name: "",
    cat: "",
    logo: "",
    hasLogo: false,
    noLogo: true,
    mark: "",
    bg: "#FFFFFF",
    earnTitle: "",
    earnPts: "",
    stamps: [],
    rewards: [],
  };
  Object.keys(sheetSrc).forEach(function (k) {
    sheetFlat["sheet_" + k] = sheetSrc[k];
  });
  var match = function (s) {
    return !q || s.name.toLowerCase().indexOf(q) >= 0 || s.cat.toLowerCase().indexOf(q) >= 0;
  };
  var browsing = !q && chip === "All";
  var rowOf = function (s, i, a, line, lineInk, pill, pillBg, pillInk) {
    return Object.assign(withLogo(s), {
      name: s.name,
      line: line,
      lineInk: lineInk || "#6B6880",
      pill: pill,
      pillBg: pillBg,
      pillInk: pillInk,
      pillOp: pill ? "1" : "0",
      rule: i === a.length - 1 ? "none" : "1px solid #F1EFF7",
      open: openShop(s.key),
    });
  };
  var chipDefs = [
    "All",
    "You can get now",
    "Under 500",
    "Coffee",
    "Food",
    "Cinema",
    "Gym",
    "Beauty",
    "Car",
  ];
  var minPts = function (s) {
    return Math.min.apply(
      null,
      s.rewards.map(function (d) {
        return d.pts;
      }),
    );
  };
  var canCount = function (s) {
    return s.rewards.filter(function (d) {
      return d.pts <= left;
    }).length;
  };
  var list = SHOPS.filter(match).filter(function (s) {
    if (chip === "You can get now") return canCount(s) > 0;
    if (chip === "Under 500") return minPts(s) <= 500;
    if (chip === "All") return true;
    return s.cat === chip;
  });
  if (browsing)
    list = list.slice().sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  var rows = list.map(function (s, i, a) {
    var c = canCount(s);
    return rowOf(
      s,
      i,
      a,
      s.rewards.length +
        (s.rewards.length === 1 ? " reward" : " rewards") +
        " · from " +
        minPts(s).toLocaleString("en-US") +
        " points",
      "",
      c ? c + " to get" : "",
      "#C0F402",
      "#1F2600",
    );
  });
  var mineShops = SHOPS.filter(function (s) {
    return s.visits > 0;
  });
  var canGet = [];
  SHOPS.forEach(function (s) {
    s.rewards.forEach(function (d) {
      if (d.pts <= left)
        canGet.push({
          shop: s.name,
          name: d.name,
          ph: d.ph,
          phBg: d.phBg,
          phInk: d.phInk,
          pts: d.pts.toLocaleString("en-US"),
          p: d.pts,
          open: openShop(s.key),
        });
    });
  });
  canGet.sort(function (a, b) {
    return b.p - a.p;
  });
  return Object.assign(sheetFlat, {
    balance: left.toLocaleString("en-US"),
    q: state.q || "",
    onSearch: function (e) {
      setState({ q: e.target.value });
    },
    chips: chipDefs.map(function (c) {
      var on = c === chip;
      return {
        label: c,
        on: String(on),
        bg: on ? "#1E1B2E" : "#FFFFFF",
        ink: on ? "#C0F402" : "#1E1B2E",
        ring: on ? "none" : "0 0 0 1px #ECE8F5",
        pick: function () {
          setState({ chip: c });
        },
      };
    }),
    showBrowse: browsing,
    rows: rows,
    noRows: rows.length === 0,
    moreLine: browsing
      ? "Showing " + rows.length + " of 200+ shops. Search to find yours."
      : rows.length + (rows.length === 1 ? " shop" : " shops"),
    sheetOpen: !!sheet,
    closeSheet: function () {
      setState({ sheet: "", ask: "", demo: "" });
    },
    hasMine: mineShops.length > 0,
    mineNote: "Where you use Unipal",
    mine: mineShops.map(function (s) {
      var c = canCount(s);
      return Object.assign(withLogo(s), {
        short: s.name.replace("The ", ""),
        aria: s.name + ", " + c + " rewards you can get",
        badge: c ? c + " to get" : "from " + minPts(s),
        badgeBg: c ? "#C0F402" : "#FFFFFF",
        badgeInk: c ? "#1F2600" : "#6B6880",
        open: openShop(s.key),
      });
    }),
    canGet: canGet.slice(0, 8),
    canNote: canGet.length + " rewards",
    listTitle: browsing ? "All shops" : q ? "Results" : chip,
    listNote: browsing ? "A to Z" : "",
    earnOrder: "0",
  });
}
