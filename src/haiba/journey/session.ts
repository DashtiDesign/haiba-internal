import { useRouterState } from "@tanstack/react-router";
import { useHaiba } from "../store";
import { parseCountry, type Country } from "./settings";
import { addDays, date, money, realToday, round2, startOf, type Lang } from "./format";
import { translate, type StringKey } from "./strings";

/**
 * Who the student is and what they see, in one place.
 * The app opens Haiba with user_id, lang and country in the URL. Read them only here,
 * so a signed token can replace the plain user_id later without touching screens.
 */
export type IdState = "ok" | "missing" | "tampered";

// The prototype accepts a plain number. The real build swaps this for a signed token check.
const VALID_ID = /^\d{5,10}$/;

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function useSession() {
  const hb = useHaiba();
  const search = (useRouterState({ select: (r) => r.location.search }) || {}) as Record<
    string,
    unknown
  >;

  const lang: Lang = search["lang"] === "ar" ? "ar" : "en";
  const dir = lang === "ar" ? "rtl" : "ltr";
  const countryParam = search["country"];
  const country: Country | null = parseCountry(countryParam);
  const rawId = search["user_id"];
  const userId = rawId != null && rawId !== "" ? String(rawId) : null;
  const idState: IdState = !userId ? "missing" : VALID_ID.test(userId) ? "ok" : "tampered";

  const settings = hb.state.settings;
  const journey = hb.state.journey;
  const c: Country = country ?? "bh";

  // Price on offer: forced by the panel, else one of the prices picked from the student id, so it never changes.
  const prices = settings.prices[c];
  const forced = settings.forcePrice[c];
  const index =
    forced != null && forced < prices.length
      ? forced
      : hash((userId ?? "") + ":" + c) % prices.length;
  const offerPrice = prices[index] ?? prices[0] ?? 0;
  // The locked price only counts while the reservation is alive. After the hold ends or a refund, today's price applies.
  const locked =
    journey.lockedPrice != null &&
    journey.lockedCountry === c &&
    !["hold_expired", "refunded", "not_reserved", "ended"].includes(journey.status);
  const price = locked ? journey.lockedPrice! : offerPrice;

  const vatRate = settings.vat[c];
  const deposit = settings.deposit[c];
  const vat = round2(price * vatRate);
  const total = round2(price + vat);
  // VAT is charged on the full price with the second payment. The deposit has no VAT of its own (open question for finance).
  const rest = round2(total - deposit);

  const today = settings.today ?? realToday();
  const launch = settings.launchDate;
  const holdEnds = addDays(launch, settings.holdDays);
  const launched = today >= launch;
  // Prototype clock: a fixed date runs at 10:00 that day, the real date runs live.
  const now = settings.today ? startOf(settings.today) + 10 * 3600000 : Date.now();

  // Reservation spots are capped per country.
  const spotsLeft = Math.max(0, settings.spotsCap[c] - settings.spotsTaken[c]);
  const full = spotsLeft === 0;
  // Haiba lives in the country the student reserved or joined in. Benefits do not carry across countries for now (7 Nov).
  const BOUND = [
    "reserved",
    "refund_requested",
    "refund_failed",
    "pay_rest_open",
    "member",
    "renewal_due",
    "cancelled",
  ];
  const home = journey.lockedCountry;
  const elsewhere =
    home != null && country != null && home !== country && BOUND.includes(journey.status);
  const student = settings.student;
  // Renewal is charged at the price on offer then, not the locked price (7 Nov).
  const renewTotal = round2(offerPrice + round2(offerPrice * vatRate));

  const t = (key: StringKey, vars?: Record<string, string | number>) => translate(lang, key, vars);
  const m = (n: number) => money(n, c, lang);
  const d = (s: string, o?: { weekday?: boolean; year?: boolean }) => date(s, lang, o);

  return {
    lang,
    dir,
    country,
    c,
    countryParam,
    userId,
    idState,
    valid: idState === "ok" && country !== null,
    settings,
    journey,
    hb,
    offerPrice,
    price,
    locked,
    vatRate,
    vat,
    total,
    deposit,
    rest,
    today,
    now,
    launch,
    holdEnds,
    launched,
    spotsLeft,
    full,
    home,
    elsewhere,
    student,
    renewTotal,
    t,
    m,
    d,
  };
}

export type Session = ReturnType<typeof useSession>;
