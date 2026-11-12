// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

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
    look: "",
    lookAsk: false,
    lookGot: false,
    lookPrev: "",
    lookFor: "",
    lookSpent: 0,
    looksOwned: null,
    lookWear: "",
    looksReady: false,
  });
  useEffect(() => {
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
  // 12 Nov: bird looks. The row shows every look; tapping one opens a preview that pulls only that animation
  // (the app keeps it in memory for the visit). Buy it with points, then set it as your bird here or later in your
  // profile. Prices are placeholders for now. On the canvas the preview shows the still.
  var LT = {
    everyday: ["Everyday", 300, "#F0ECFF", "#4F25D6"],
    heritage: ["Our heritage", 600, "#FFF3D6", "#7A4E00"],
    scene: ["Big moments", 1500, "#E6F1FF", "#0B4F99"],
    legend: ["Legendary", 3000, "#1E1B2E", "#C0F402"],
  };
  // Each look stands on a little stage coloured by tier: sky, a curved ground, his shadow. Legendary is a night stage.
  // Same as STAGE in src/haiba/looks.ts (the profile picker).
  var STAGE = {
    everyday:
      "radial-gradient(130% 62% at 50% 104%, #CDBDFF 0 38%, rgba(205,189,255,0) 39%), linear-gradient(180deg, #F6F2FF 0%, #E7DEFF 100%)",
    heritage:
      "radial-gradient(130% 62% at 50% 104%, #EFD39C 0 38%, rgba(239,211,156,0) 39%), linear-gradient(180deg, #FFF8EA 0%, #FCEBC8 100%)",
    scene:
      "radial-gradient(130% 62% at 50% 104%, #BFD8F7 0 38%, rgba(191,216,247,0) 39%), linear-gradient(180deg, #F1F7FF 0%, #DCEBFD 100%)",
    legend:
      "radial-gradient(130% 62% at 50% 104%, #3A2C7A 0 38%, rgba(58,44,122,0) 39%), radial-gradient(70% 55% at 50% 42%, rgba(192,244,2,0.22) 0%, rgba(192,244,2,0) 70%), linear-gradient(180deg, #17142A 0%, #2A2154 100%)",
  };
  var BIRD = "/haiba/motion/hub-still.webp";
  var sa = (props.market ?? "Bahrain") === "Saudi";
  var LOOKS = [
    [
      "f1",
      "legend",
      "Audi F1",
      "Helmet on, engine on. His Audi R26 is ready.",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/f1-still.webp",
    ],
    [
      "gold",
      "legend",
      "Golden parrot",
      "Gold from his crest to his sneakers. Juggles coins and bites one.",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/gold-still.webp",
    ],
    [
      "dragon",
      "legend",
      "Dragon rider",
      "His baby dragon grows big and takes him for a ride.",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/dragon-card.webp",
    ],
    ["camp", "scene", "Desert camp", "A winter camp: fire, tea and stars.", "", ""],
    ["dunes", "scene", "Dune drive", "Drives over the dunes in a 4x4.", "", ""],
    ["space", "scene", "Space walk", "Floats in a space suit, catching coins.", "", ""],
    ["pixel", "scene", "Pixel bird", "Turns into an old school game bird and back.", "", ""],
    [
      "ghutra",
      "heritage",
      "Thobe and ghutra",
      "A white thobe and ghutra for a special day.",
      "bh",
      "",
    ],
    [
      "shemagh",
      "heritage",
      "Thobe and shemagh",
      "A white thobe and red shemagh for a special day.",
      "sa",
      "",
    ],
    ["pearl", "heritage", "Pearl diver", "Dives into the sea and comes up with a pearl.", "bh", ""],
    ["falcon", "heritage", "Falcon friend", "A falcon lands on his wing.", "", ""],
    ["karak", "everyday", "Karak break", "Pours a cup of karak and takes a sip.", "", ""],
    ["movie", "everyday", "Movie night", "Popcorn, 3D glasses and a big laugh.", "", ""],
    ["skater", "everyday", "Skater", "Kicks up his board and lands a trick.", "", ""],
    ["football", "everyday", "Football star", "Juggles the ball and scores.", "", ""],
  ].filter(function (l) {
    return !l[4] || l[4] === (sa ? "sa" : "bh");
  });
  var lsOwned = ["classic"],
    lsWear = "classic";
  if (state.looksReady)
    try {
      lsOwned = JSON.parse(window.localStorage.getItem("haiba-looks-owned") || '["classic"]');
      lsWear = window.localStorage.getItem("haiba-look") || "classic";
    } catch (e) {}
  var lkOwned = state.looksOwned || lsOwned,
    lkWear = state.lookWear || lsWear;
  var lkSave = function (owned, wear) {
    try {
      window.localStorage.setItem("haiba-looks-owned", JSON.stringify(owned));
      window.localStorage.setItem("haiba-look", wear);
    } catch (e) {}
  };
  var lkLeft = left - (state.lookSpent || 0);
  left = lkLeft; // points spent on looks count everywhere on this page
  var api = typeof window !== "undefined" ? window.__hbLooks : null;
  var openLook = function (id) {
    return function () {
      var has = !!(api && api.has(id));
      setState({
        look: id,
        lookAsk: false,
        lookGot: false,
        lookPrev: "",
        lookFor: has ? "loading" : "",
      });
      // Only the newest tap counts (a quick tap on another look while this one loads).
      window.__hbLookWant = id;
      if (has)
        api.preview(id).then(function (u) {
          if (window.__hbLookWant === id) setState({ lookPrev: u || "", lookFor: "" });
        });
    };
  };
  var looks = LOOKS.map(function (l) {
    var t = LT[l[1]],
      own = lkOwned.indexOf(l[0]) >= 0,
      wearing = lkWear === l[0];
    return {
      id: l[0],
      name: l[2],
      desc: l[3],
      tier: t[0],
      price: own ? (wearing ? "Yours" : "Yours") : t[1].toLocaleString("en-US"),
      pts: t[1],
      showCoin: !own,
      ptsBg: own ? "#E3F7EC" : t[1] <= lkLeft ? "#F0ECFF" : "#F1F1F4",
      ptsInk: own ? "#1B6B36" : t[1] <= lkLeft ? "#4F25D6" : "#8A8A96",
      ptsPad: own ? "2px 8px" : "2px 8px 2px 3px",
      bg: STAGE[l[1]],
      shadow: l[1] === "legend" ? "rgba(0,0,0,0.45)" : "rgba(30,27,46,0.22)",
      ring: wearing
        ? "0 0 0 2.5px #6C3FFA, 0 8px 18px rgba(108,63,250,0.18)"
        : "0 0 0 1px #ECE8F5, 0 4px 12px rgba(76,52,140,0.06)",
      tagBg: t[2],
      tagInk: t[3],
      legend: l[1] === "legend",
      still: l[5] || BIRD,
      own: own,
      wearing: wearing,
      aria: l[2] + ", " + (own ? "yours" : t[1] + " points"),
      open: openLook(l[0]),
    };
  });
  var lk = looks.filter(function (k) {
    return k.id === state.look;
  })[0];
  var lkFlat = {
    lk_name: "",
    lk_desc: "",
    lk_tier: "",
    lk_tagBg: "",
    lk_tagInk: "",
    lk_src: BIRD,
    lk_alt: "",
    lk_loading: false,
    lk_asking: false,
    lk_askLine: "",
    lk_askSub: "",
    lk_got: false,
    lk_showMain: true,
    lk_label: "",
    lk_btnBg: "#1E1B2E",
    lk_btnInk: "#C0F402",
    lk_act: function () {},
    lk_buy: function () {},
    lk_notNow: function () {},
    lk_onHub: false,
    lk_short: false,
  };
  if (lk) {
    var short = !lk.own && lk.pts > lkLeft;
    var wear = function () {
      setState({ lookWear: lk.id, looksOwned: lkOwned, lookGot: false });
      lkSave(lkOwned, lk.id);
    };
    lkFlat = {
      lk_name: lk.name,
      lk_desc: lk.desc,
      lk_tier: lk.tier,
      lk_tagBg: lk.tagBg,
      lk_tagInk: lk.tagInk,
      lk_src: state.lookPrev || lk.still,
      lk_alt: "The Haiba bird, " + lk.name + " look",
      lk_loading: state.lookFor === "loading",
      lk_asking: !!state.lookAsk,
      lk_askLine: "Use " + lk.pts.toLocaleString("en-US") + " points for " + lk.name + "?",
      lk_askSub:
        "It is yours to keep. You will have " +
        (lkLeft - lk.pts).toLocaleString("en-US") +
        " points left.",
      lk_got: !!state.lookGot && !lk.wearing,
      lk_showMain: !state.lookAsk,
      lk_label: lk.wearing
        ? "On your hub"
        : lk.own
          ? "Set as my bird"
          : short
            ? "You need " + (lk.pts - lkLeft).toLocaleString("en-US") + " more points"
            : "Get it for " + lk.pts.toLocaleString("en-US") + " points",
      lk_btnBg: lk.wearing || short ? "#E4DDF7" : "#1E1B2E",
      lk_btnInk: lk.wearing || short ? "#4A4660" : "#C0F402",
      lk_act: function () {
        if (lk.wearing || short) return;
        if (lk.own) wear();
        else setState({ lookAsk: true });
      },
      lk_buy: function () {
        var owned = lkOwned.concat([lk.id]);
        setState({
          looksOwned: owned,
          lookSpent: (state.lookSpent || 0) + lk.pts,
          lookAsk: false,
          lookGot: true,
        });
        lkSave(owned, lkWear);
      },
      lk_notNow: function () {
        setState({ lookAsk: false });
      },
      lk_onHub: lk.wearing,
      lk_short: short,
    };
  }
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
  return Object.assign(sheetFlat, lkFlat, {
    balance: lkLeft.toLocaleString("en-US"),
    looks: looks,
    looksNote: "Wear one on your hub",
    lookOpen: !!lk,
    closeLook: function () {
      setState({ look: "", lookAsk: false, lookGot: false });
    },
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
