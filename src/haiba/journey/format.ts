import type { Country } from "./settings";
import { CURRENCY } from "./settings";

export type Lang = "en" | "ar";

const NBSP = String.fromCharCode(160); // keeps the currency and the number on one line

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y ?? 2026, (m || 1) - 1, d || 1);
};

export const realToday = () => iso(new Date());

export function addDays(s: string, n: number) {
  const d = parse(s);
  d.setDate(d.getDate() + n);
  return iso(d);
}

export function addMonths(s: string, n: number) {
  const d = parse(s);
  d.setMonth(d.getMonth() + n);
  return iso(d);
}

/** Whole days from a to b (b later is positive). */
export function daysBetween(a: string, b: string) {
  return Math.round((parse(b).getTime() - parse(a).getTime()) / 86400000);
}

/** Midnight at the start of a date, in ms. */
export const startOf = (s: string) => parse(s).getTime();

export const round2 = (n: number) => Math.round(n * 100) / 100;

/** BHD 20.00 in English, 20.00 د.ب in Arabic. Always 2 decimals, western digits. */
export function money(n: number, country: Country, lang: Lang) {
  const num = round2(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (lang === "ar") return `${num}${NBSP}${country === "bh" ? "د.ب" : "ر.س"}`;
  return `${CURRENCY[country]}${NBSP}${num}`;
}

export const pct = (rate: number) => `${Math.round(rate * 1000) / 10}%`;

const LOCALE: Record<Lang, string> = { en: "en-GB", ar: "ar-u-nu-latn-ca-gregory" };

/** Tue 1 Dec, or with year: 1 Dec 2026. */
export function date(s: string, lang: Lang, opts: { weekday?: boolean; year?: boolean } = {}) {
  return new Intl.DateTimeFormat(LOCALE[lang], {
    weekday: opts.weekday ? "short" : undefined,
    day: "numeric",
    month: "short",
    year: opts.year ? "numeric" : undefined,
  }).format(parse(s));
}

export function num(n: number) {
  return n.toLocaleString("en-US");
}

/** Days, hours and minutes left until a moment. */
export function timeLeft(fromMs: number, toMs: number) {
  const ms = Math.max(0, toMs - fromMs);
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  return { ms, days, hours, mins };
}
