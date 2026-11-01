// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({
    cat: "All",
    ask: "",
    demo: "",
    codesQty: [0, 0, 0],
    cancelled: [],
    accepted: [],
    done: false,
  });
  useEffect(() => {}, []);

  var balance = props.base;
  var cat = state.cat || "All";
  var shops = [
    {
      key: "cb",
      shop: "The Coffee Bean",
      logo: "/haiba/brands/coffee-bean.webp",
      bg: "#FFFFFF",
      cat: "Coffee",
      live: true,
      items: [
        {
          name: "Free upsize",
          sub: "Any drink, one size up",
          pts: 300,
          value: 0.3,
          ph: "DRINK PHOTO",
          phBg: "#EDE4FF",
          phInk: "#4F25D6",
          code: "8K3Q",
        },
        {
          name: "Cookie",
          sub: "Chocolate chip or oat",
          pts: 700,
          value: 0.7,
          ph: "COOKIE PHOTO",
          phBg: "#F6E7D2",
          phInk: "#7A4E2D",
          code: "5TR2",
        },
        {
          name: "Regular drink",
          sub: "Hot or iced, regular size",
          pts: 1900,
          value: 1.9,
          ph: "DRINK PHOTO",
          phBg: "#E3DCD6",
          phInk: "#3B2A22",
          code: "9MX7",
        },
      ],
    },
    {
      key: "caribou",
      shop: "Caribou Coffee",
      logo: "",
      mark: "C",
      bg: "#3B2A22",
      cat: "Coffee",
      items: [
        {
          name: "Free upgrade",
          sub: "Any drink, one size up",
          pts: 200,
          ph: "DRINK PHOTO",
          phBg: "#EFE6DE",
          phInk: "#3B2A22",
        },
        {
          name: "Pastry",
          sub: "Croissant or muffin",
          pts: 900,
          ph: "PASTRY PHOTO",
          phBg: "#F6E7D2",
          phInk: "#7A4E2D",
        },
      ],
    },
    {
      key: "jasmis",
      shop: "Jasmi’s",
      logo: "",
      mark: "J",
      bg: "#D62828",
      cat: "Food",
      items: [
        {
          name: "Soft drink",
          sub: "Any can or bottle",
          pts: 350,
          ph: "DRINK PHOTO",
          phBg: "#FDE4E4",
          phInk: "#B11D1D",
        },
        {
          name: "Fries",
          sub: "Regular size",
          pts: 600,
          ph: "FRIES PHOTO",
          phBg: "#FFF1D6",
          phInk: "#8A5A00",
        },
      ],
    },
    {
      key: "vox",
      shop: "VOX Cinemas",
      logo: "/haiba/brands/vox.webp",
      bg: "#FFFFFF",
      cat: "Cinema",
      items: [
        {
          name: "Popcorn",
          sub: "Regular, salted or sweet",
          pts: 600,
          ph: "POPCORN PHOTO",
          phBg: "#FFF4CC",
          phInk: "#8A6A00",
        },
      ],
    },
    {
      key: "wingman",
      shop: "Wingman",
      logo: "/haiba/brands/wingman.webp",
      bg: "#F9F9F9",
      cat: "Food",
      items: [
        {
          name: "6 wings",
          sub: "Any sauce",
          pts: 900,
          ph: "WINGS PHOTO",
          phBg: "#FDE9DA",
          phInk: "#9A4A12",
        },
      ],
    },
    {
      key: "grip",
      shop: "Grip",
      logo: "/haiba/brands/grip.webp",
      bg: "#000000",
      cat: "Gym",
      items: [
        {
          name: "Protein shake",
          sub: "After your workout",
          pts: 500,
          ph: "SHAKE PHOTO",
          phBg: "#E6F4EA",
          phInk: "#1E5E2E",
        },
      ],
    },
  ];
  var cq = (state.codesQty || [0, 0, 0]).slice();
  while (cq.length < 3) cq.push(0);
  var cancelled = state.cancelled || [];
  var accepted = state.accepted || [];
  var cb = shops[0].items;
  var committed = 0;
  cb.forEach(function (d, i) {
    for (var k = 0; k < cq[i]; k++) {
      if (cancelled.indexOf(i + "-" + k) < 0) committed += d.pts;
    }
  });
  var left = balance - committed;
  var cats = ["All", "Coffee", "Food", "Cinema", "Gym"].map(function (c) {
    var on = c === cat;
    return {
      label: c,
      on: String(on),
      bg: on ? "#1E1B2E" : "#FFFFFF",
      ink: on ? "#C0F402" : "#1E1B2E",
      ring: on ? "none" : "0 0 0 1px #ECE8F5",
      pick: function () {
        setState({ cat: c, ask: "" });
      },
    };
  });
  var rows = [];
  shops
    .filter(function (s) {
      return cat === "All" || s.cat === cat;
    })
    .forEach(function (s, si) {
      var can0 = s.items.filter(function (d) {
        return d.pts <= left;
      }).length;
      rows.push({
        isHead: true,
        isItem: false,
        gap: si === 0 ? "0" : "14px",
        shop: s.shop,
        logo: s.logo,
        hasLogo: !!s.logo,
        noLogo: !s.logo,
        mark: s.mark || "",
        bg: s.bg,
        meta:
          s.items.length +
          (s.items.length === 1 ? " reward" : " rewards") +
          (can0 ? " · " + can0 + " you can get now" : ""),
      });
      s.items.forEach(function (d, i) {
        var last = i === s.items.length - 1;
        var key = s.key + "-" + i;
        var can = d.pts <= left;
        var r = {
          isHead: false,
          isItem: true,
          radius: last ? "0 0 16px 16px" : "0",
          name: d.name,
          ph: d.ph,
          phBg: d.phBg,
          phInk: d.phInk,
          pts: d.pts.toLocaleString("en-US") + " points",
          useLabel: "Use " + d.pts + " points for " + d.name,
          btnBg: can ? "#1E1B2E" : "#E4E4EA",
          btnInk: can ? "#C0F402" : "#8A8A96",
          cursor: can ? "pointer" : "default",
          ptsBg: can ? "#F0ECFF" : "#F1F1F4",
          ptsInk: can ? "#4F25D6" : "#8A8A96",
          sub: can ? d.sub : (d.pts - left).toLocaleString("en-US") + " more points needed",
          askLine:
            "Use " +
            d.pts.toLocaleString("en-US") +
            " points for a " +
            d.name.toLowerCase() +
            "? Your code shows here.",
          notNow: function () {
            setState({ ask: "" });
          },
          held: false,
          isUsed: false,
          demo: false,
          code: "",
          savedLine: "",
          againOp: "1",
          cancel: function () {},
          accept: function () {},
          again: function () {},
          confirm: function () {},
        };
        if (s.live) {
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
          r.asking = false;
          r.showUse = true;
          r.demo = state.demo === key;
          r.ask = function () {
            if (can) setState({ demo: key });
          };
        }
        rows.push(r);
      });
    });
  return {
    balance: left.toLocaleString("en-US"),
    cats: cats,
    rows: rows,
  };
}
