// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ sheet: false, gift: -1 });
  useEffect(() => {}, []);

  var p = Number(props.price ?? "18");
  var bhd = function (x) {
    return "BHD " + x.toFixed(2);
  };
  var price = bhd(p);
  var perMonth = bhd(p / 12);
  var sheet = !!state.sheet;
  var common = {
    price: price,
    perMonth: perMonth,
    sheet: sheet,
    sheetTitle: "You are in early",
    sheetNote: "Nothing has been charged",
    sheetBody:
      "Haiba opens in December. We saved your spot at " +
      price +
      " a year and will tell you first when you can join.",
    openSheet: function () {
      setState({ sheet: true });
    },
    closeSheet: function () {
      setState({ sheet: false });
    },
  };
  var sim = function (V) {
    var favs = V <= 3 ? 1 : V <= 5 ? 2 : V <= 9 ? 3 : 4;
    var seen = {},
      pts = 500,
      cum = 12.0,
      payback = 0;
    for (var m = 0; m < 12; m++) {
      var monthPts = 0,
        shops = ["new" + m];
      for (var k = 0; k < V - 1; k++) shops.push("fav" + (k % favs));
      shops.forEach(function (sh) {
        var n = (seen[sh] || 0) + 1;
        seen[sh] = n;
        monthPts += n <= 2 ? 80 : n % 5 === 0 ? 200 : 40;
      });
      pts += monthPts;
      cum += 2.5 + monthPts / 1000;
      if (!payback && cum >= p) payback = m + 1;
    }
    return { pts: pts, payback: payback, worth: 47.0 + pts / 1000 };
  };
  var at = sim(4);
  var worthN = at.worth;
  var round5 = function (x) {
    return "BHD " + Math.floor(x / 5) * 5 + "+";
  };
  var whole = function (x) {
    return "BHD " + Math.floor(x) + "+";
  };
  var worth = whole(worthN);
  var g = state.gift;
  var defs = [
    {
      brand: "Wingman",
      logo: "/haiba/brands/wingman.webp",
      item: "Student box meal",
      bg: "#F9F9F9",
    },
    { brand: "VOX Cinemas", logo: "/haiba/brands/vox.webp", item: "Cinema ticket", bg: "#FFFFFF" },
    {
      brand: "The Coffee Bean",
      logo: "/haiba/brands/coffee-bean.webp",
      item: "Any drink",
      bg: "#FFFFFF",
    },
    { brand: "Grip", logo: "/haiba/brands/grip.webp", item: "Gym day pass", bg: "#000000" },
    { brand: "Albayan", logo: "/haiba/brands/albayan.webp", item: "Perfume 100ml", bg: "#FFFFFF" },
    { brand: "Alkuwaiti", logo: "/haiba/brands/alkuwaiti.webp", item: "Car wash", bg: "#FFFFFF" },
  ];
  var gifts = defs.map(function (d, k) {
    var sel = k === g;
    return Object.assign({}, d, {
      selStr: String(sel),
      tick: sel ? "flex" : "none",
      shadow: sel
        ? "0 0 0 3px #6C3FFA, 0 12px 22px rgba(30,27,46,0.16)"
        : "0 0 0 1px #ECE8F5, 0 6px 14px rgba(30,27,46,0.06)",
      pick: function () {
        setState({ gift: sel ? -1 : k });
      },
    });
  });
  return Object.assign(common, {
    gifts: gifts,
    worth: worth,
    free: whole(Math.max(0, worthN - p)) + " free",
    ctaTitle: g >= 0 ? "Get my " + defs[g].item.toLowerCase() + " with Haiba" : "Get Haiba",
    sheetBody:
      (g >= 0 ? "Your " + defs[g].item.toLowerCase() + " is saved for you. " : "") +
      "Haiba opens in December. We saved your spot at " +
      price +
      " a year and will tell you first when you can join.",
  });
}
