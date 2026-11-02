// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({
    q: "",
    cat: "",
    tag: "All",
    sortKey: "near",
    cq: "",
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
  var sortKey = state.sortKey || "near";
  var cq = (state.cq || "").toLowerCase();
  var onMain = !cat;
  var browsing = onMain && !q;
  var km = function (m) {
    return m < 1000 ? m + " m" : (m / 1000).toFixed(1) + " km";
  };
  var CATS = ["Cafes", "Restaurants", "Fitness", "Self care", "Entertainment", "Car care"];
  var CATIMG = {
    Cafes: "/haiba/categories/cafes.png",
    Restaurants: "/haiba/categories/restaurants.png",
    Fitness: "/haiba/categories/fitness.png",
    "Self care": "/haiba/categories/self-care.png",
    Entertainment: "/haiba/categories/entertainment.png",
    "Car care": "/haiba/categories/car-care.png",
  };
  var has = function (s, t) {
    return (
      !t ||
      s.name.toLowerCase().indexOf(t) >= 0 ||
      s.tags.join(" ").toLowerCase().indexOf(t) >= 0 ||
      s.cat.toLowerCase().indexOf(t) >= 0
    );
  };
  var tagList = ["All"];
  SHOPS.forEach(function (s) {
    if (s.cat === cat)
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
  var blank = {
    isHead: false,
    isShop: false,
    head: "",
    seeAll: function () {},
    seeLabel: "",
    pad: "0",
    top: "none",
    name: "",
    line: "",
    pill: "",
    pillDisp: "none",
    pillBg: "",
    pillInk: "",
    rule: "none",
    open: function () {},
    hasLogo: false,
    noLogo: false,
    logo: "",
    mark: "",
    bg: "",
  };
  var shopRow = function (s, last, line, p) {
    return Object.assign({}, blank, withLogo(s), {
      isShop: true,
      name: s.name,
      line: line,
      pill: p[0] || "",
      pillDisp: p[0] ? "block" : "none",
      pillBg: p[1] || "",
      pillInk: p[2] || "",
      rule: last ? "none" : "1px solid #F1EFF7",
      open: openShop(s.key),
    });
  };
  var headRow = function (label, first) {
    return Object.assign({}, blank, {
      isHead: true,
      head: label,
      pad: first ? "12px 0 2px 0" : "14px 0 2px 0",
      top: first ? "none" : "1px solid #F1EFF7",
    });
  };
  var openCat = function (c) {
    return function () {
      setState({ cat: c, tag: "All", cq: "", sortKey: "near" });
    };
  };
  var rankMain = function (a, b) {
    return nextPts(b.visits) - nextPts(a.visits) || b.visits - a.visits || a.dist - b.dist;
  };
  var mainSortLabel = "Biggest bonus";
  var lineOf = function (s) {
    return (
      (s.visits === 0
        ? "New to you · 2x first visit"
        : "Visit " + (s.visits % 5) + " of 5 · next " + (nextTag(s.visits) || "normal")) +
      " · " +
      km(s.dist)
    );
  };
  var pillOf = function (s) {
    var np = nextPts(s.visits);
    return [
      "+" + np,
      np === 200 ? "#C0F402" : np === 80 ? "#F0ECFF" : "#F1F1F4",
      np === 200 ? "#1F2600" : np === 80 ? "#4F25D6" : "#4A4660",
    ];
  };
  var cardSub = function (inC) {
    var b = inC.filter(function (s) {
      return nextPts(s.visits) > 40;
    }).length;
    return b + " of " + inC.length + " pay extra next visit";
  };
  var cardInk = function (inC) {
    return inC.some(function (s) {
      return nextPts(s.visits) === 200;
    })
      ? "#4F25D6"
      : "#6B6880";
  };
  var rowsFor = function (list, lineOf, pillOf, letters) {
    var out = [],
      prev = "";
    list.forEach(function (s, i) {
      if (letters) {
        var L = s.name.replace("The ", "").charAt(0).toUpperCase();
        if (L !== prev) {
          out.push(headRow(L, !out.length));
          prev = L;
        }
      }
      var nx = list[i + 1];
      var last = !nx || (letters && nx.name.replace("The ", "").charAt(0).toUpperCase() !== prev);
      out.push(shopRow(s, last, lineOf(s), pillOf(s)));
    });
    return out;
  };
  var catList = SHOPS.filter(function (s) {
    return s.cat === cat && (tag === "All" || s.tags.indexOf(tag) >= 0) && has(s, cq);
  });
  var az = function (a, b) {
    return a.name.replace("The ", "").localeCompare(b.name.replace("The ", ""));
  };
  catList.sort(
    sortKey === "near"
      ? function (a, b) {
          return a.dist - b.dist;
        }
      : sortKey === "az"
        ? az
        : rankMain,
  );
  var searchList = SHOPS.filter(function (s) {
    return has(s, q);
  }).sort(az);
  var rows = cat
    ? rowsFor(catList, lineOf, pillOf, sortKey === "az")
    : q
      ? rowsFor(searchList, lineOf, pillOf, false)
      : [];
  var shopCount = rows.filter(function (r) {
    return r.isShop;
  }).length;
  var sorts = [
    ["near", "Nearest"],
    ["main", mainSortLabel],
    ["az", "A to Z"],
  ].map(function (o) {
    var on = o[0] === sortKey;
    return {
      label: o[1],
      on: String(on),
      bg: on ? "#FFFFFF" : "transparent",
      ink: on ? "#1E1B2E" : "#6B6880",
      shadow: on ? "0 2px 6px rgba(30,27,46,0.10)" : "none",
      pick: function () {
        setState({ sortKey: o[0] });
      },
    };
  });
  var cards = CATS.map(function (c) {
    var inC = SHOPS.filter(function (s) {
      return s.cat === c;
    });
    return {
      name: c,
      img: CATIMG[c],
      sub: cardSub(inC),
      subInk: cardInk(inC),
      aria: c + ", " + inC.length + " shops",
      open: openCat(c),
    };
  });
  var mineShops = SHOPS.filter(function (s) {
    return s.visits > 0;
  }).sort(function (a, b) {
    return nextPts(b.visits) - nextPts(a.visits);
  });
  var bonusShops = mineShops.filter(function (s) {
    return nextPts(s.visits) > 40;
  });
  var bonus = bonusShops.map(function (s) {
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
  }).sort(function (a, b) {
    return a.dist - b.dist;
  })[0];
  if (fresh)
    bonus.push(
      Object.assign(withLogo(fresh), {
        name: fresh.name,
        pts: "+80",
        tag: "2x",
        line: "New to you, " + km(fresh.dist) + " away. Your first visit earns double.",
        bg2: "#C0F402",
        ink2: "#1F2600",
        ptsInk: "#1F2600",
        shadow: "none",
        open: openShop(fresh.key),
      }),
    );
  return Object.assign(sheetFlat, {
    balance: left.toLocaleString("en-US"),
    q: state.q || "",
    onSearch: function (e) {
      setState({ q: e.target.value });
    },
    cq: state.cq || "",
    onCatSearch: function (e) {
      setState({ cq: e.target.value });
    },
    catSearchLabel: "Search " + (cat ? cat.toLowerCase() : "shops"),
    onMain: onMain,
    inCat: !onMain,
    showBrowse: browsing,
    showResults: onMain && !!q,
    cat: cat,
    backToMain: function () {
      setState({ cat: "", tag: "All", cq: "" });
    },
    cards: cards,
    tags: tags,
    sorts: sorts,
    rows: rows,
    noRows: rows.length === 0,
    listTitle: cat ? shopCount + (shopCount === 1 ? " shop" : " shops") : "Results",
    listNote: "",
    sortTap: function () {},
    sortCursor: "default",
    sortInk: "#6C3FFA",
    moreLine: cat
      ? "In the real app, every " + cat.toLowerCase().replace(/s$/, "") + " in Unipal shows here."
      : "",
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
    bonus: bonus,
    bonusNote: bonusShops.length
      ? bonusShops.length +
        (bonusShops.length === 1 ? " shop pays" : " shops pay") +
        " extra next visit"
      : "Start anywhere new",
    earnOrder: "0",
  });
}
