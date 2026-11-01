// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({
    q: "",
    cat: "",
    tag: "All",
    sort: "a",
    f1: false,
    f2: false,
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
      cat: "Cafes",
      tags: ["Coffee", "Dessert"],
      dist: 780,
      photo: "#EAD9C6",
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
      key: "caribou",
      name: "Caribou Coffee",
      cat: "Cafes",
      tags: ["Coffee"],
      dist: 1200,
      photo: "#D8E8F2",
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
      key: "barns",
      name: "Barn’s",
      cat: "Cafes",
      tags: ["Coffee", "Dessert"],
      dist: 650,
      photo: "#E6EFD9",
      mark: "B",
      bg: "#2F6B3A",
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
      key: "teatime",
      name: "Tea Time",
      cat: "Cafes",
      tags: ["Tea"],
      dist: 780,
      photo: "#F3D9D6",
      mark: "T",
      bg: "#B11D1D",
      visits: 0,
      rewards: [
        {
          name: "Karak",
          sub: "Regular cup",
          pts: 250,
          ph: "KARAK",
          phBg: "#FFF1D6",
          phInk: "#8A5A00",
        },
      ],
    },
    {
      key: "crepele",
      name: "Crepele",
      cat: "Cafes",
      tags: ["Dessert"],
      dist: 900,
      photo: "#F6E1E1",
      mark: "Cr",
      bg: "#C2185B",
      visits: 0,
      rewards: [
        {
          name: "Black coffee",
          sub: "Hot or iced",
          pts: 300,
          ph: "COFFEE",
          phBg: "#E3DCD6",
          phInk: "#3B2A22",
        },
        {
          name: "Mini crepe",
          sub: "Nutella or strawberry",
          pts: 800,
          ph: "CREPE",
          phBg: "#FDE4E4",
          phInk: "#B11D1D",
        },
      ],
    },
    {
      key: "jasmis",
      name: "Jasmi’s",
      cat: "Restaurants",
      tags: ["Fast food", "Burgers"],
      dist: 1500,
      photo: "#FBE0D6",
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
      key: "saffron",
      name: "Saffron Kitchen",
      cat: "Restaurants",
      tags: ["Indian"],
      dist: 2100,
      photo: "#FCE7C8",
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
      key: "wingman",
      name: "Wingman",
      cat: "Restaurants",
      tags: ["Fast food", "Wings"],
      dist: 1100,
      photo: "#FDE9DA",
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
      cat: "Fitness",
      tags: ["Gym"],
      dist: 2600,
      photo: "#E2E2E2",
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
      cat: "Self care",
      tags: ["Perfume"],
      dist: 3100,
      photo: "#ECE6F7",
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
      key: "vox",
      name: "VOX Cinemas",
      cat: "Entertainment",
      tags: ["Cinema"],
      dist: 4200,
      photo: "#FFF4CC",
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
      key: "alkuwaiti",
      name: "Alkuwaiti",
      cat: "Car care",
      tags: ["Car wash"],
      dist: 5300,
      photo: "#E9F1FB",
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
  var cat = state.cat || "";
  var tag = state.tag || "All";
  var sort = state.sort || "a";
  var f1 = !!state.f1,
    f2 = !!state.f2;
  var browsing = !q && !cat;
  var CATS = [
    { key: "Cafes" },
    { key: "Restaurants" },
    { key: "Fitness" },
    { key: "Self care" },
    { key: "Entertainment" },
    { key: "Car care" },
  ];
  var km = function (m) {
    return m < 1000 ? m + " m" : (m / 1000).toFixed(1) + " km";
  };
  var tiles = CATS.map(function (c) {
    var n = SHOPS.filter(function (s) {
      return s.cat === c.key;
    }).length;
    var o = {
      key: c.key,
      count: n + (n === 1 ? " shop" : " shops"),
      aria: c.key + ", " + n + " shops",
      pick: function () {
        setState({ cat: c.key, tag: "All", q: "" });
      },
    };
    CATS.forEach(function (x, j) {
      o["i" + j] = x.key === c.key;
    });
    return o;
  });
  var catShops = SHOPS.filter(function (s) {
    return !cat || s.cat === cat;
  });
  var tagList = ["All"];
  catShops.forEach(function (s) {
    s.tags.forEach(function (t) {
      if (tagList.indexOf(t) < 0) tagList.push(t);
    });
  });
  var tags = tagList.map(function (t) {
    var on = t === tag;
    return {
      label: t,
      on: String(on),
      bg: on ? "#1E1B2E" : "#FFFFFF",
      ink: on ? "#C0F402" : "#1E1B2E",
      ring: on ? "none" : "0 0 0 1px #ECE8F5",
      pick: function () {
        setState({ tag: t });
      },
    };
  });
  var pill = function (label, on, pick) {
    return {
      label: label,
      on: String(on),
      pick: pick,
      bg: on ? "#1E1B2E" : "#FFFFFF",
      ink: on ? "#FFFFFF" : "#1E1B2E",
      line: on ? "#1E1B2E" : "#E4DFF1",
    };
  };
  var match = function (s) {
    return (
      !q ||
      s.name.toLowerCase().indexOf(q) >= 0 ||
      s.cat.toLowerCase().indexOf(q) >= 0 ||
      s.tags.join(" ").toLowerCase().indexOf(q) >= 0
    );
  };
  var base = catShops.filter(match).filter(function (s) {
    return tag === "All" || s.tags.indexOf(tag) >= 0;
  });
  var filters = [
    pill(sort === "n" ? "Sort: Nearest" : "Sort: Biggest bonus", true, function () {
      setState({ sort: sort === "n" ? "a" : "n" });
    }),
    pill("Bonus waiting", f1, function () {
      setState({ f1: !f1 });
    }),
    pill("Haven’t tried yet", f2, function () {
      setState({ f2: !f2 });
    }),
  ];
  var list = base.filter(function (s) {
    return (!f1 || nextPts(s.visits) > 40) && (!f2 || s.visits === 0);
  });
  list = list.slice().sort(function (a, b) {
    return sort === "n"
      ? a.dist - b.dist
      : nextPts(b.visits) - nextPts(a.visits) || b.visits - a.visits || a.dist - b.dist;
  });
  var rows = list.map(function (s) {
    var np = nextPts(s.visits),
      t = nextTag(s.visits);
    var chip =
      s.visits === 0
        ? { label: "New to you · +80 first visit", bg: "#F0ECFF", ink: "#4F25D6" }
        : np === 200
          ? { label: "Next visit +200 · 5x", bg: "#C0F402", ink: "#1F2600" }
          : np === 80
            ? { label: "Next visit +80 · 2x", bg: "#F0ECFF", ink: "#4F25D6" }
            : { label: "Next visit +40", bg: "#FFFFFF", ink: "#4A4660" };
    return Object.assign(withLogo(s), {
      name: s.name,
      photo: s.photo,
      meta:
        km(s.dist) +
        " · " +
        s.tags.join(", ") +
        (s.visits ? " · Visit " + (s.visits % 5) + " of 5" : ""),
      open: openShop(s.key),
      chips: [chip],
    });
  });
  var mineShops = SHOPS.filter(function (s) {
    return s.visits > 0;
  }).sort(function (a, b) {
    return nextPts(b.visits) - nextPts(a.visits);
  });
  var bonus = mineShops
    .filter(function (s) {
      return nextPts(s.visits) > 40;
    })
    .map(function (s) {
      var np = nextPts(s.visits),
        five = np === 200;
      return Object.assign(withLogo(s), {
        name: s.name,
        pts: "+" + np,
        tag: nextTag(s.visits),
        line: five
          ? "Your 5th visit. The biggest bonus."
          : "Your " + (s.visits === 0 ? "1st" : "2nd") + " visit here earns double.",
        bg2: five ? "#1E1B2E" : "#FFFFFF",
        ink2: five ? "#FFFFFF" : "#1E1B2E",
        ptsInk: five ? "#C0F402" : "#6C3FFA",
        shadow: five ? "0 10px 22px rgba(30,27,46,0.25)" : "0 0 0 1px #ECE8F5",
        open: openShop(s.key),
      });
    });
  var fresh = SHOPS.filter(function (s) {
    return s.visits === 0;
  })
    .sort(function (a, b) {
      return a.dist - b.dist;
    })
    .slice(0, 6)
    .map(function (s) {
      return Object.assign(withLogo(s), {
        name: s.name,
        pts: "+80",
        tag: "2x",
        line: km(s.dist) + " away · " + s.tags[0],
        bg2: "#FFFFFF",
        ink2: "#1E1B2E",
        ptsInk: "#6C3FFA",
        shadow: "0 0 0 1px #ECE8F5",
        open: openShop(s.key),
      });
    });
  return Object.assign(sheetFlat, {
    showBrowse: browsing,
    showList: !browsing,
    inCat: !!cat,
    cat: cat,
    tiles: tiles,
    tags: tags,
    filters: filters,
    rows: rows,
    noRows: rows.length === 0,
    countLine:
      rows.length +
      (rows.length === 1 ? " shop" : " shops") +
      (cat ? " in " + cat : "") +
      (q ? " for “" + (state.q || "") + "”" : ""),
    emptyLine: "Nothing here yet. Try another filter.",
    backToAll: function () {
      setState({ cat: "", tag: "All", f1: false, f2: false });
    },
    balance: left.toLocaleString("en-US"),
    q: state.q || "",
    onSearch: function (e) {
      setState({ q: e.target.value });
    },
    sheetOpen: !!sheet,
    closeSheet: function () {
      setState({ sheet: "", ask: "", demo: "" });
    },
    hasMine: mineShops.length > 0,
    mineNote: "Next visit",
    mine: mineShops.map(function (s) {
      var np = nextPts(s.visits),
        t = nextTag(s.visits);
      return Object.assign(withLogo(s), {
        short: s.name.replace("The ", ""),
        aria: s.name + ", next visit " + np + " points",
        badge: t || "+" + np,
        badgeDisp: "block",
        badgeBg: t === "5x" ? "#C0F402" : t ? "#6C3FFA" : "#FFFFFF",
        badgeInk: t === "5x" ? "#1F2600" : t ? "#FFFFFF" : "#4A4660",
        open: openShop(s.key),
      });
    }),
    bonus: bonus.length ? bonus : fresh.slice(0, 3),
    r1Title: bonus.length ? "Bonus waiting" : "Start here: 2x waiting",
    r1Note: bonus.length
      ? bonus.length + (bonus.length === 1 ? " shop pays" : " shops pay") + " extra next visit"
      : "Nearest first",
    fresh: fresh,
    r2Title: "New to you, near you",
    r2Note: "2x on your first visit",
    earnOrder: "0",
  });
}
