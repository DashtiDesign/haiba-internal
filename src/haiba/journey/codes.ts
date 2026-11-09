import { useHaiba, type RewardCode } from "../store";
import { giftNow } from "./gift";

/**
 * Active codes (9 Nov). One list, one look, everywhere: the hub shows every code that is showing
 * (the Hadiya and reward codes), Your points shows its reward codes on top, Hadiya shows the gift code on top.
 * A row is the item, the shop and what kind of code it is, then "Show code".
 */
export type CodeRow = {
  key: string;
  kind: "gift" | "reward";
  item: string;
  brand: string;
  sub: string;
  logo: string;
  hasLogo: boolean;
  mark: string;
  bg: string;
  ink: string;
  href: string;
};

type Hb = ReturnType<typeof useHaiba>;

// Coffee Bean rewards made in the basket (same order as the Shop and Basket screens)
const BASKET = [
  { name: "Free upsize", pts: 300, img: "/haiba/emoji/drink.png", value: 0.3 },
  { name: "Cookie", pts: 700, img: "/haiba/emoji/cookie.png", value: 0.7 },
  { name: "Regular drink", pts: 1900, img: "/haiba/emoji/drink.png", value: 1.9 },
];

// An active member starts with one reward code showing, so the list is never a blank idea.
export const SAMPLE_CODE: Omit<RewardCode, "status" | "on"> = {
  id: "caribou-free-upgrade",
  shop: "Caribou Coffee",
  item: "Free upgrade",
  pts: 200,
  value: 0.5,
  img: "/haiba/emoji/drink.png",
  logo: "",
  mark: "C",
  bg: "#3B2A22",
};

export const codeId = (shop: string, item: string) =>
  (shop + "-" + item).toLowerCase().replace(/[^a-z0-9]+/g, "-");

const link = (o: Record<string, string | number>) =>
  "/haiba/code?" +
  Object.entries(o)
    .map(([k, v]) => k + "=" + encodeURIComponent(String(v)))
    .join("&");

function rewardRow(
  c: Omit<RewardCode, "status" | "on">,
  extra: Record<string, string> = {},
): CodeRow {
  return {
    key: c.id,
    kind: "reward",
    item: c.item,
    brand: c.shop,
    sub: c.shop + " · " + c.pts.toLocaleString("en-US") + " points",
    logo: c.logo,
    hasLogo: !!c.logo,
    mark: c.mark,
    bg: c.bg,
    ink: "#FFFFFF",
    href: link({
      kind: "reward",
      id: c.id,
      shop: c.shop,
      item: c.item,
      pts: c.pts,
      img: c.img,
      logo: c.logo,
      mark: c.mark,
      bg: c.bg,
      value: c.value,
      ...extra,
    }),
  };
}

export function activeCodes(hb: Hb, today: string): CodeRow[] {
  const rows: CodeRow[] = [];
  const gn = giftNow(hb.state.gift, today);
  if (gn.status === "active" && gn.gift && gn.brand) {
    rows.push({
      key: "gift",
      kind: "gift",
      item: gn.gift.item,
      brand: gn.brand.name,
      sub: gn.brand.name, // the row says "Hadiya" above the item
      logo: gn.brand.logo ?? "",
      hasLogo: !!gn.brand.logo,
      mark: gn.brand.name.charAt(0),
      bg: gn.brand.bg ?? "#FFFFFF",
      ink: "#FFFFFF",
      href: "/haiba/code?kind=gift",
    });
  }
  const codes = hb.state.rewardCodes || [];
  codes.filter((c) => c.status === "active").forEach((c) => rows.push(rewardRow(c)));
  hb.liveCodeIds.forEach((id) => {
    const r = BASKET[parseInt(id.split("-")[0] ?? "0", 10)];
    if (!r) return;
    rows.push(
      rewardRow(
        {
          id: "basket-" + id,
          shop: "The Coffee Bean",
          item: r.name,
          pts: r.pts,
          value: r.value,
          img: r.img,
          logo: "/haiba/brands/coffee-bean.webp",
          mark: "CB",
          bg: "#FFFFFF",
        },
        { basket: id },
      ),
    );
  });
  if (hb.state.member === "active" && !codes.some((c) => c.id === SAMPLE_CODE.id))
    rows.push(rewardRow(SAMPLE_CODE));
  return rows;
}

/** What the code screen does with a reward code: show it, the shop uses it, it runs out or is cancelled. */
export function useRewardCode(q: Record<string, unknown>, today: string) {
  const hb = useHaiba();
  const basket = q["basket"] != null ? String(q["basket"]) : null;
  const id = q["id"] != null ? String(q["id"]) : null;
  const codes = hb.state.rewardCodes || [];
  const from = (status: RewardCode["status"]): RewardCode => ({
    id: id ?? "",
    shop: String(q["shop"] ?? ""),
    item: String(q["item"] ?? ""),
    pts: Number(q["pts"] ?? 0),
    value: Number(q["value"] ?? 0),
    img: String(q["img"] ?? ""),
    logo: String(q["logo"] ?? ""),
    mark: String(q["mark"] ?? ""),
    bg: String(q["bg"] ?? "#FFFFFF"),
    status,
    on: today,
  });
  const put = (c: RewardCode) =>
    hb.set({ rewardCodes: [...codes.filter((x) => x.id !== c.id), c] });
  return {
    // a code just made on Your points starts showing (and holds its points)
    register: () => {
      if (basket || !id || q["new"] == null) return;
      if (!codes.some((c) => c.id === id)) put(from("active"));
    },
    use: () => {
      if (basket) hb.set({ accepted: Array.from(new Set([...hb.state.accepted, basket])) });
      else if (id) put(from("used"));
    },
    // ran out or cancelled: the code goes away and its points come back
    drop: () => {
      if (basket) hb.set({ cancelled: Array.from(new Set([...hb.state.cancelled, basket])) });
      else if (id === SAMPLE_CODE.id) put(from("gone"));
      else if (id) hb.set({ rewardCodes: codes.filter((c) => c.id !== id) });
    },
  };
}
