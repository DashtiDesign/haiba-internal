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
  var worthN = 42.0;
  var round5 = function (x) {
    return "BHD " + Math.floor(x / 5) * 5 + "+";
  };
  var worth = round5(worthN);
  var free = round5(worthN - p) + " free";
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
    free: free,
    ctaTitle: g >= 0 ? "Get my " + defs[g].item.toLowerCase() + " with Haiba" : "Get Haiba",
    sheetBody:
      (g >= 0 ? "Your " + defs[g].item.toLowerCase() + " is saved for you. " : "") +
      "Haiba opens in December. We saved your spot at " +
      price +
      " a year and will tell you first when you can join.",
  });
}
