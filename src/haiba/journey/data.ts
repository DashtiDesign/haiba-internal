/**
 * Fake data for the member screens: Unipass gifts, subscriptions, activity and receipts.
 * Brands, items, values and limits are placeholders until partners sign.
 */
export type Brand = {
  key: string;
  name: string;
  logo?: string;
  mark?: string;
  bg: string;
  ink?: string;
};

export const BRANDS: Record<string, Brand> = {
  cb: { key: "cb", name: "The Coffee Bean", logo: "/haiba/brands/coffee-bean.webp", bg: "#FFFFFF" },
  wingman: { key: "wingman", name: "Wingman", logo: "/haiba/brands/wingman.webp", bg: "#FFFFFF" },
  vox: { key: "vox", name: "VOX Cinemas", logo: "/haiba/brands/vox.webp", bg: "#FFFFFF" },
  grip: { key: "grip", name: "Grip", logo: "/haiba/brands/grip.webp", bg: "#000000" },
  albayan: { key: "albayan", name: "Albayan", logo: "/haiba/brands/albayan.webp", bg: "#FFFFFF" },
  alkuwaiti: {
    key: "alkuwaiti",
    name: "Alkuwaiti",
    logo: "/haiba/brands/alkuwaiti.webp",
    bg: "#FFFFFF",
  },
  jasmis: { key: "jasmis", name: "Jasmi’s", mark: "J", bg: "#D62828", ink: "#FFFFFF" },
  crepele: { key: "crepele", name: "Crepele", mark: "Cr", bg: "#C2185B", ink: "#FFFFFF" },
};

export const E = (name: string) => `/haiba/emoji/${name}.png`;

/**
 * Haiba asset kit. One graphic per idea, used on every screen:
 * points = the Haiba coin, Unipass gift = the purple gift box, Haiba membership = the Haiba logo,
 * subscriptions = the service's own logo. Emoji are only for the actual item a shop gives (a drink, fries).
 */
export const ICON = {
  points: "/haiba/coins/coin-front.webp",
  pointsStack: "/haiba/coins/coin-stack.webp",
  unipass: "/haiba/icons/unipass.webp",
  member: "/haiba/logo-lime.svg", // shown on a purple tile, see HaibaMark
} as const;

export type Gift = {
  id: string;
  brand: string;
  item: string;
  value: number; // BHD
  cat: "Food and drink" | "Fun" | "Self care" | "Car care";
  img: string;
  where: string;
  limit?: string;
  backOn?: string; // brand paused this month: "next" means back on the 1st of next month
};

export const GIFTS: Gift[] = [
  {
    id: "g1",
    brand: "cb",
    item: "Regular drink",
    value: 1.9,
    cat: "Food and drink",
    img: E("drink"),
    where: "All 14 branches",
    limit: "Not on Fridays 7 to 11 am",
  },
  {
    id: "g2",
    brand: "wingman",
    item: "6 wings",
    value: 2.9,
    cat: "Food and drink",
    img: E("wings"),
    where: "Seef, Juffair, Riffa",
  },
  {
    id: "g3",
    brand: "crepele",
    item: "Mini crepe",
    value: 1.5,
    cat: "Food and drink",
    img: E("crepe"),
    where: "All branches",
  },
  {
    id: "g4",
    brand: "jasmis",
    item: "Fries and a drink",
    value: 1.2,
    cat: "Food and drink",
    img: E("fries"),
    where: "All branches",
    limit: "Dine in only",
  },
  {
    id: "g5",
    brand: "vox",
    item: "Regular popcorn",
    value: 2.0,
    cat: "Fun",
    img: E("popcorn"),
    where: "City Centre, Seef",
    limit: "Not on opening weekends",
  },
  {
    id: "g6",
    brand: "grip",
    item: "Day pass",
    value: 3.0,
    cat: "Self care",
    img: E("shake"),
    where: "Grip Seef",
  },
  {
    id: "g7",
    brand: "albayan",
    item: "Travel perfume",
    value: 2.5,
    cat: "Self care",
    img: E("perfume"),
    where: "All branches",
    backOn: "next",
  },
  {
    id: "g8",
    brand: "alkuwaiti",
    item: "Exterior wash",
    value: 2.5,
    cat: "Car care",
    img: E("car"),
    where: "Sanad, Tubli",
  },
];

export type Sub = {
  id: string;
  name: string;
  what: string;
  offer: string;
  logo: string; // the service's own logo, used for every mention of this subscription
  bg: string;
  code: string;
  who: string;
  terms: string[];
  claimed?: boolean; // every code in the partner's pool is taken
};

export const SUBS: Sub[] = [
  {
    id: "spotify",
    name: "Spotify",
    what: "Premium Student",
    offer: "3 months free",
    logo: "/haiba/brands/spotify.webp",
    bg: "#DDF7E5",
    code: "HAIBA SP 7Q2X",
    who: "New Spotify Premium accounts",
    terms: [
      "New Spotify Premium accounts only.",
      "After 3 months you pay Spotify the normal price. Cancel any time with them.",
      "One code per member.",
    ],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    what: "ChatGPT Plus",
    offer: "3 months free",
    logo: "/haiba/brands/chatgpt.webp",
    bg: "#ECEDF1",
    code: "HAIBA GP 4K9M",
    who: "New ChatGPT Plus accounts",
    terms: [
      "New ChatGPT Plus accounts only.",
      "After 3 months you pay OpenAI the normal price. Cancel any time with them.",
      "One code per member.",
    ],
  },
];

/** Prototype: ?claimed=1 shows ChatGPT with every code taken ("All claimed"). */
export const subsFor = (claimed: boolean): Sub[] =>
  SUBS.map((x) => (claimed && x.id === "chatgpt" ? { ...x, claimed: true } : x));

export type Activity = {
  day: string;
  items: { title: string; sub: string; pts?: number; money?: number; img?: string }[];
};

export const ACTIVITY: Activity[] = [
  {
    day: "Today",
    items: [
      {
        title: "The Coffee Bean",
        sub: "Offer used · 2nd visit, 2x points",
        pts: 80,
        img: "/haiba/brands/coffee-bean.webp",
      },
      { title: "Free upsize", sub: "Reward used at The Coffee Bean", pts: -300, img: E("drink") },
    ],
  },
  {
    day: "Yesterday",
    items: [
      { title: "Jasmi’s", sub: "Offer used · 4th visit", pts: 40 },
      {
        title: "January gift",
        sub: "Regular drink at The Coffee Bean",
        money: 1.9,
        img: ICON.unipass,
      },
    ],
  },
  {
    day: "Tue, 3 Dec",
    items: [
      {
        title: "Wingman",
        sub: "Offer used · 1st visit, 2x points",
        pts: 80,
        img: "/haiba/brands/wingman.webp",
      },
      { title: "Welcome to Haiba", sub: "Welcome points", pts: 500, img: ICON.points },
    ],
  },
];

export const CAT_BG: Record<Gift["cat"], string> = {
  "Food and drink": "#FFEFD9",
  Fun: "#EDE4FF",
  "Self care": "#FCE4F0",
  "Car care": "#DDF1FF",
};

/** Where the student saved most this year, for the savings page. */
export const TOP_SAVED: { brand: string; amount: number; visits: number }[] = [
  { brand: "cb", amount: 6.4, visits: 9 },
  { brand: "wingman", amount: 4.1, visits: 4 },
  { brand: "jasmis", amount: 2.75, visits: 5 },
];
