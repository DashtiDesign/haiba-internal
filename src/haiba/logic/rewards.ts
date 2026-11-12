// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";
import { resetPrototypeLooks } from "../resetPrototypeLooks";

export function useVals() {
  const { state, setState, props, nav } = useDC({
    pinned: false,
    gcat: "All",
    q: "",
    bonus: false,
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
    looksReady: false,
  });
  useEffect(() => {
    resetPrototypeLooks();

    // Bird looks (12 Nov): owned looks and the one he wears are saved on the phone, read once the page runs.
    setState({ looksReady: true });
    // 9 Nov: once the points card and search scroll away, the search sticks to the top and the points slide in beside it.
    var frame = 0;
    var last = false;
    var check = function () {
      frame = 0;
      var mark = document.querySelector("[data-hb-pin-mark]");
      var on = !!mark && mark.getBoundingClientRect().top < 1;
      if (on !== last) {
        last = on;
        setState({ pinned: on });
      }
    };
    var later = function () {
      if (!frame) frame = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", later, { passive: true });
    window.addEventListener("resize", later);
    later();
    return function () {
      window.removeEventListener("scroll", later);
      window.removeEventListener("resize", later);
      cancelAnimationFrame(frame);
    };
  }, []);

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
          img: "/haiba/emoji/drink.webp",
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
          img: "/haiba/emoji/cookie.webp",
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
          img: "/haiba/emoji/drink.webp",
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
          img: "/haiba/emoji/drink.webp",
          phBg: "#EFE6DE",
          phInk: "#3B2A22",
        },
        {
          name: "Pastry",
          sub: "Croissant or muffin",
          pts: 900,
          ph: "PASTRY",
          img: "/haiba/emoji/pastry.webp",
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
          img: "/haiba/emoji/cookie.webp",
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
          img: "/haiba/emoji/tea.webp",
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
          img: "/haiba/emoji/drink.webp",
          phBg: "#E3DCD6",
          phInk: "#3B2A22",
        },
        {
          name: "Mini crepe",
          sub: "Nutella or strawberry",
          pts: 800,
          ph: "CREPE",
          img: "/haiba/emoji/crepe.webp",
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
          img: "/haiba/emoji/iced.webp",
          phBg: "#FDE4E4",
          phInk: "#B11D1D",
        },
        {
          name: "Fries",
          sub: "Regular size",
          pts: 600,
          ph: "FRIES",
          img: "/haiba/emoji/fries.webp",
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
          img: "/haiba/emoji/samosa.webp",
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
          img: "/haiba/emoji/wings.webp",
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
          img: "/haiba/emoji/shake.webp",
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
          img: "/haiba/emoji/perfume.webp",
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
          img: "/haiba/emoji/popcorn.webp",
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
          img: "/haiba/emoji/car.webp",
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
  var balance = props.base - (props.heldPts || 0);
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
  // 12 Nov: bird looks. A short row of looks; a tile (or See all) opens the Bird looks page with that look on the
  // stage. All looks cost 200 points for now. Owned looks and the one he wears are saved on the phone.
  var sa = (props.market ?? "Bahrain") === "Saudi";
  var LOOKS = [
    [
      "fish",
      "Abood Yowda",
      "bh",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/fish-still.webp",
      51.41,
      1.2232,
      true,
    ],
    [
      "melon",
      "Hamdha",
      "bh",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/melon-still.webp",
      40.71,
      1.0,
      true,
    ],
    [
      "spa",
      "Spa day",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/spa-still.webp",
      41.09,
      1.0196,
    ],
    [
      "puppy",
      "Puppy",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/puppy-still.webp",
      44.07,
      1.0964,
      false,
      0.0879,
    ],
    [
      "gold",
      "Golden parrot",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/gold-wide-still.webp",
      49.59,
      1.0768,
    ],
    [
      "dragon",
      "Dragon rider",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/dragon-wide-still.webp",
      55.25,
      1.7214,
    ],
    [
      "f1",
      "Audi F1",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/f1-wide-still.webp",
      50.72,
      1.0536,
    ],
    [
      "football",
      "Football star",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/football-wide-still.webp",
      38.79,
      1.0464,
    ],
    [
      "falcon",
      "Falcon friend",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/falcon-still.webp",
      45.05,
      1.5482,
    ],
    [
      "karak",
      "Karak break",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/karak-wide-still.webp",
      50.0,
      1.0,
    ],
    [
      "ghutra",
      "Thobe and ghutra",
      "bh",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/ghutra-still.webp",
      45.75,
      1.0,
    ],
    [
      "shemagh",
      "Thobe and shemagh",
      "sa",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/shemagh-still.webp",
      45.75,
      1.0,
    ],
    [
      "pearl",
      "Pearl diver",
      "bh",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/pearl-wide-still.webp",
      50.37,
      1.0,
    ],
  ].filter(function (l) {
    return !l[2] || l[2] === (sa ? "sa" : "bh");
  });
  var lsOwned = ["classic"],
    lsWear = "classic";
  if (state.looksReady)
    try {
      lsOwned = JSON.parse(window.localStorage.getItem("haiba-looks-owned") || '["classic"]');
      lsWear = window.localStorage.getItem("haiba-look") || "classic";
    } catch (e) {}
  var pickLook = function (id) {
    return function () {
      try {
        if (id) window.sessionStorage.setItem("hb-look-pick", id);
        else window.sessionStorage.removeItem("hb-look-pick");
      } catch (e) {}
    };
  };
  var looks = LOOKS.map(function (l) {
    var own = lsOwned.indexOf(l[0]) >= 0,
      w = lsWear === l[0];
    return {
      id: l[0],
      name: l[1],
      still: l[3],
      x: l[4],
      h: Math.round(108 * l[5]),
      b: Math.round(-2 - 108 * l[5] * (l[7] || 0)),
      wearing: w,
      showCoin: !own,
      meta: w ? "On your hub" : own ? "Yours" : "200",
      metaInk: own && !w ? "#1B6B36" : "#4F25D6",
      aria: l[1] + ", " + (w ? "on your hub" : own ? "yours" : "200 points"),
      pick: pickLook(l[0]),
    };
  });
  var pin = !!state.pinned || props.searchBar === "Pinned (scrolled)";
  // 9 Nov: reward codes that are showing sit on top, the same rows as the hub (journey/codes.ts in the app).
  var codeList = (
    props.activeCodes ??
    (isNew
      ? []
      : [
          {
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
          },
        ])
  )
    .filter(function (r) {
      return r.kind === "reward";
    })
    .map(function (r, k) {
      return Object.assign({}, r, {
        noLogo: !r.hasLogo,
        rule: k === 0 ? "0" : "1px solid #F1EFF7",
        open: function () {
          if (typeof nav === "function") nav(r.href);
        },
      });
    });
  var q = (state.q || "").toLowerCase();
  var chip = state.chip || "All";
  // Opens the full reward code screen (4.6). On the canvas it stays on the sheet; the app opens /haiba/code.
  var goCode = function (sh, d) {
    var p = {
      kind: "reward",
      id: (sh.name + "-" + d.name).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      new: 1,
      shop: sh.name,
      item: d.name,
      pts: d.pts,
      img: d.img,
      logo: sh.logo || "",
      mark: sh.mark || sh.name.charAt(0),
      bg: sh.bg || "#FFFFFF",
      value: d.value || 0,
    };
    nav(
      "/haiba/code?" +
        Object.keys(p)
          .map(function (k) {
            return k + "=" + encodeURIComponent(p[k]);
          })
          .join("&"),
    );
  };
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
        nextTag(sh.visits) === "5x"
          ? "Your next visit here earns 5x points."
          : nextTag(sh.visits) === "2x"
            ? "Your next visit here earns 2x points."
            : "Every visit here earns points.",
      useLabel: "Use an offer here",
      earnPts: "+" + np + " points",
      stamps: stamps(sh.visits % 5),
      rewards: sh.rewards.map(function (d, i) {
        var can = d.pts <= left;
        var key = sh.key + "-" + i;
        var r = {
          name: d.name,
          img: d.img,
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
            "Use " + d.pts.toLocaleString("en-US") + " points for " + d.name.toLowerCase() + "?",
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
        // 8 Nov: every reward works the same way. Use asks once, then opens the full code screen (4.6).
        r.short = !can;
        r.asking = state.ask === key;
        r.showUse = !r.asking;
        r.ask = function () {
          if (can) setState({ ask: key });
        };
        r.confirm = function () {
          if (sh.live) {
            var n = cq.slice();
            n[i] = n[i] + 1;
            setState({ ask: "", codesQty: n, done: true });
          } else {
            setState({ ask: "" });
          }
          goCode(sh, d);
        };
        return r;
      }),
    });
  }
  var sheetFlat = {};
  var sheetSrc = sheet || {
    useLabel: "",
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
  var browsing = onMain && !q && !state.bonus;
  var km = function (m) {
    return m < 1000 ? m + " m" : (m / 1000).toFixed(1) + " km";
  };
  var CATS = ["Cafes", "Restaurants", "Fitness", "Self care", "Entertainment", "Car care"];
  var CATIMG = {
    Cafes: "/haiba/categories/cafes.webp",
    Restaurants: "/haiba/categories/restaurants.webp",
    Fitness: "/haiba/categories/fitness.webp",
    "Self care": "/haiba/categories/self-care.webp",
    Entertainment: "/haiba/categories/entertainment.webp",
    "Car care": "/haiba/categories/car-care.webp",
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
  var minPts = function (s) {
    return Math.min.apply(
      null,
      s.rewards.map(function (d) {
        return d.pts;
      }),
    );
  };
  var rankMain = function (a, b) {
    return minPts(a) - minPts(b);
  };
  var mainSortLabel = "Lowest points";
  var lineOf = function (s) {
    var n = s.rewards.map(function (d) {
      return d.name.toLowerCase();
    });
    var t = n.length > 1 ? n.slice(0, -1).join(", ") + " and " + n[n.length - 1] : n[0];
    return t.charAt(0).toUpperCase() + t.slice(1) + " · " + km(s.dist);
  };
  var pillOf = function (s) {
    var t = nextTag(s.visits);
    return t === "5x"
      ? ["5x points", "#C0F402", "#1F2600"]
      : t === "2x"
        ? ["2x points", "#EDE4FF", "#4F25D6"]
        : ["", "", ""];
  };
  var cardSub = function (inC) {
    return inC.length + (inC.length === 1 ? " shop" : " shops");
  };
  var cardInk = function () {
    return "#6B6880";
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
  var bonusShops = SHOPS.filter(function (s) {
    return nextTag(s.visits) !== "";
  }).sort(function (a, b) {
    return nextPts(b.visits) - nextPts(a.visits) || a.dist - b.dist;
  });
  var bonusLine = function (s) {
    return "+" + nextPts(s.visits) + " points on your next visit";
  };
  var bonusMode = !!state.bonus && !cat && !q;
  var rows = cat
    ? rowsFor(catList, lineOf, pillOf, sortKey === "az")
    : q
      ? rowsFor(searchList, lineOf, pillOf, false)
      : bonusMode
        ? rowsFor(bonusShops, bonusLine, pillOf, false)
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
  });
  // Item tiles take their colour from the shop category, the same as Hadiya.
  var TINT = {
    Cafes: "#FFEFD9",
    Restaurants: "#FFEFD9",
    "Fast food": "#FFEFD9",
    Desserts: "#FFEFD9",
    Fitness: "#FCE4F0",
    "Self care": "#FCE4F0",
    Entertainment: "#EDE4FF",
    "Car care": "#DDF1FF",
  };
  var canGet = [];
  SHOPS.forEach(function (s) {
    s.rewards.forEach(function (d) {
      if (d.pts <= left)
        canGet.push({
          shop: s.name,
          name: d.name,
          img: d.img,
          tint: TINT[s.cat] || "#F3F0FA",
          logo: s.logo || "",
          hasLogo: !!s.logo,
          noLogo: !s.logo,
          mark: s.mark || s.name.charAt(0),
          bg: s.bg,
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
  // 8 Nov: the catalogue. Category chips filter one grid; rewards you can get now come first.
  var gcat = state.gcat || "All";
  var grid = [];
  SHOPS.forEach(function (s) {
    if (gcat !== "All" && s.cat !== gcat) return;
    s.rewards.forEach(function (d) {
      var can = d.pts <= left;
      grid.push({
        shop: s.name,
        name: d.name,
        img: d.img,
        tint: TINT[s.cat] || "#F3F0FA",
        logo: s.logo || "",
        hasLogo: !!s.logo,
        noLogo: !s.logo,
        mark: s.mark || s.name.charAt(0),
        bg: s.bg,
        p: d.pts,
        can: can,
        pts: d.pts.toLocaleString("en-US"),
        ptsBg: can ? "#F0ECFF" : "#F1F1F4",
        ptsInk: can ? "#4F25D6" : "#8A8A96",
        op: can ? "1" : "0.55",
        need: can ? "" : (d.pts - left).toLocaleString("en-US") + " more",
        open: openShop(s.key),
      });
    });
  });
  grid.sort(function (a, b) {
    return a.can === b.can ? a.p - b.p : a.can ? -1 : 1;
  });
  var nCan = grid.filter(function (g) {
    return g.can;
  }).length;
  var gcats = [{ label: "All", img: "/haiba/coins/coin-front.webp" }]
    .concat(
      CATS.map(function (c) {
        return { label: c, img: CATIMG[c] };
      }),
    )
    .map(function (c) {
      var on = c.label === gcat;
      return Object.assign(c, {
        on: String(on),
        bg: on ? "#1E1B2E" : "#FFFFFF",
        ink: on ? "#FFFFFF" : "#1E1B2E",
        ring: on ? "none" : "0 0 0 1px #ECE8F5",
        dot: on ? "rgba(255,255,255,0.14)" : "#F3F0FA",
        pick: function () {
          setState({ gcat: c.label });
        },
      });
    });
  return Object.assign(sheetFlat, {
    balance: left.toLocaleString("en-US"),
    looks: looks,
    looksAll: pickLook(""),
    hasCodes: codeList.length > 0,
    myCodes: codeList,
    codesCount: codeList.length === 1 ? "1 to use" : codeList.length + " to use",
    // The pinned search bar (9 Nov)
    pinBg: pin ? "#F3F0FA" : "rgba(243,240,250,0)",
    pinShadow: pin ? "0 -60px 0 0 #F3F0FA, 0 8px 18px rgba(76,52,140,0.10)" : "none",
    pinMl: pin ? "8px" : "0px",
    pinChipW: pin ? "150px" : "0px",
    pinChipOp: pin ? "1" : "0",
    pinChipX: pin ? "0px" : "16px",
    pinHidden: pin ? "false" : "true",
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
    showResults: onMain && (!!q || !!state.bonus),
    cat: cat,
    showBonusTop: browsing && bonusShops.length > 0,
    bonusRows: rowsFor(bonusShops.slice(0, 3), bonusLine, pillOf, false),
    noBonus: false,
    seeBonus: function () {
      setState({ bonus: true });
    },
    backToMain: function () {
      setState({ cat: "", tag: "All", cq: "" });
    },
    cards: cards,
    tags: tags,
    sorts: sorts,
    rows: rows,
    noRows: rows.length === 0,
    listTitle: cat
      ? shopCount + (shopCount === 1 ? " shop" : " shops")
      : q
        ? "Results"
        : "Extra points next visit",
    listNote: !cat && !q && state.bonus ? "Back" : "",
    sortTap: function () {
      setState({ bonus: false });
    },
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
    mineNote: "Where you use Unipal",
    mine: mineShops.map(function (s) {
      var t = nextTag(s.visits);
      return Object.assign(withLogo(s), {
        short: s.name.replace("The ", ""),
        aria: s.name,
        badge: t,
        badgeDisp: t ? "block" : "none",
        badgeBg: t === "5x" ? "#C0F402" : "#6C3FFA",
        badgeInk: t === "5x" ? "#1F2600" : "#FFFFFF",
        open: openShop(s.key),
      });
    }),
    canGet: canGet.slice(0, 8),
    grid: grid,
    gcats: gcats,
    gridNote: nCan + " you can get now",
    heroLine: "Every Unipal offer earns more",
    canNote: canGet.length + " rewards",
    earnOrder: "0",
  });
}
