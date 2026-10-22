// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ tab: "haiba" });
  useEffect(() => {}, []);

  var isHaiba = state.tab === "haiba";

  var yes = "✓",
    no = "✕";
  var rows = [
    ["Student offers", yes, yes],
    ["Points on every offer", no, "40 to 200"],
    ["Welcome points", no, "500"],
    ["Rewards with points", no, "18 shops"],
    ["Unipass gift", no, "1 a month"],
    ["Member promos", no, yes],
    ["“You saved” tracker", no, yes],
    ["Price", "Free", "BHD 19.80 a year"],
  ];
  var table = rows.map(function (r, i) {
    return {
      label: r[0],
      free: r[1],
      haiba: r[2],
      freeInk: r[1] === no ? "#6B6880" : r[1] === yes ? "#2F7D32" : "#1E1B2E",
      haibaInk: r[2] === yes ? "#2F7D32" : "#6C3FFA",
      rule: i === rows.length - 1 ? "none" : "1px solid #ECEAF3",
    };
  });
  return {
    isHaiba: isHaiba,
    isFree: !isHaiba,
    glow: isHaiba
      ? "linear-gradient(180deg, #E4D9FF 0%, #F3EEFF 55%, #FFFFFF 100%)"
      : "linear-gradient(180deg, #DCDAE4 0%, #EFEEF3 55%, #FFFFFF 100%)",
    indLeft: isHaiba ? "138px" : "4px",
    freeSel: String(!isHaiba),
    haibaSel: String(isHaiba),
    freeTabInk: isHaiba ? "#3B3654" : "#FFFFFF",
    haibaTabInk: isHaiba ? "#FFFFFF" : "#3B3654",
    pickFree: function () {
      setState({ tab: "free" });
    },
    pickHaiba: function () {
      setState({ tab: "haiba" });
    },
    highlights: [
      { title: "500 points when you join", sub: "Enough for your first reward today" },
      {
        title: "Points every time you use an offer",
        sub: "2x on your first 2 visits at a shop. 5x every 5th",
      },
      { title: "1 free Unipass gift every month", sub: "Meals, coffee, cinema, gym and more" },
      { title: "Member promos", sub: "Spotify Premium, 3 months free" },
    ],
    giftHead: isHaiba ? "Your monthly gift, from all of these" : "Only available with Haiba",
    lockOp: isHaiba ? "0" : "1",
    lockScale: isHaiba ? "0.4" : "1",
    gifts: [
      {
        brand: "Wingman",
        logo: "/haiba/brands/wingman.webp",
        label: "Student box meal at Wingman",
      },
      { brand: "VOX Cinemas", logo: "/haiba/brands/vox.webp", label: "1 cinema ticket at VOX" },
      {
        brand: "The Coffee Bean",
        logo: "/haiba/brands/coffee-bean.webp",
        label: "Free drink at Coffee Bean",
      },
      { brand: "Grip", logo: "/haiba/brands/grip.webp", label: "Gym day pass at Grip" },
      { brand: "Albayan", logo: "/haiba/brands/albayan.webp", label: "100ml perfume at Albayan" },
      { brand: "Alkuwaiti", logo: "/haiba/brands/alkuwaiti.webp", label: "Car wash at Alkuwaiti" },
    ],
    table: table,
    freeColInk: isHaiba ? "#6B6880" : "#1E1B2E",
    freeColBg: isHaiba ? "#FFFFFF" : "#F4F3F7",
    haibaColBg: isHaiba ? "#F0ECFF" : "#FFFFFF",
    ctaTitle: isHaiba ? "Join Haiba" : "Upgrade to Haiba",
  };
}
