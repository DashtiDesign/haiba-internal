/**
 * Prototype settings. Every money, date and rule value a student sees comes from here,
 * never from a screen. The prototype panel edits them.
 * Values are the current decisions (5 Nov 2026) and will change.
 */
export type Country = "bh" | "sa";

export type Settings = {
  prices: Record<Country, number[]>; // yearly prices on offer, before VAT
  forcePrice: Record<Country, number | null>; // index into prices; null means each student gets one at random
  vat: Record<Country, number>; // 0.1 means 10%
  deposit: Record<Country, number>; // reserves the spot and locks the price
  holdDays: number; // days after launch to pay the rest before the price hold ends
  launchDate: string; // YYYY-MM-DD, the day Haiba opens and the rest can be paid
  reserveEnd: string; // YYYY-MM-DD, last day of the reservation test. After it, new students wait for launch
  today: string | null; // prototype clock, YYYY-MM-DD. null means the real date
};

export const DEFAULT_SETTINGS: Settings = {
  prices: { bh: [20, 22, 24], sa: [200, 220, 240] },
  forcePrice: { bh: null, sa: null },
  vat: { bh: 0.1, sa: 0.15 },
  deposit: { bh: 1, sa: 10 },
  holdDays: 7,
  launchDate: "2026-12-01",
  reserveEnd: "2026-11-30",
  today: null,
};

export const CURRENCY: Record<Country, string> = { bh: "BHD", sa: "SAR" };

/** The app passes country=bahrain or country=saudi. Anything else is unknown. */
export function parseCountry(v: unknown): Country | null {
  const s = String(v ?? "").toLowerCase();
  if (s === "bahrain" || s === "bh") return "bh";
  if (s === "saudi" || s === "sa") return "sa";
  return null;
}

export const COUNTRY_PARAM: Record<Country, string> = { bh: "bahrain", sa: "saudi" };
