import type { Lang } from "./format";

/**
 * Every word a student sees on the new Haiba screens lives here, in English and Arabic.
 * Arabic is a draft in Saudi white dialect, one set for Bahrain and Saudi.
 * A copywriter checks it before students see it (see the English copy review).
 * {name} is filled in by t(key, { name: value }).
 * Rules: simple English, short words, no dashes, money with 2 decimals.
 */
const en = {
  // common
  back: "Back",
  close: "Close",
  tryAgain: "Try again",
  contactSupport: "Contact support",
  help: "Help",
  haiba: "Haiba",

  // system states
  loadingTitle: "One moment",
  loadingBody: "Getting your Haiba page ready.",
  emptyTitle: "Nothing here yet",
  emptyBody: "When there is something to show, you will see it here.",
  errorTitle: "Something went wrong",
  errorBody: "We could not load this page. Please try again.",
  offlineTitle: "You are offline",
  offlineBody: "Check your internet and try again.",
  offlineBar: "You are offline. Some things will not work.",
  deniedTitle: "We cannot open this page",
  deniedBody: "Please open Haiba from the Unipal app.",
  countryTitle: "Haiba is not here yet",
  countryBody: "Haiba is in Bahrain and Saudi for now.",
  openUnipal: "Go to Unipal",
};

export type StringKey = keyof typeof en;

const ar: Record<StringKey, string> = {
  back: "رجوع",
  close: "إغلاق",
  tryAgain: "حاول مرة ثانية",
  contactSupport: "تواصل مع الدعم",
  help: "مساعدة",
  haiba: "هيبة",

  loadingTitle: "لحظة",
  loadingBody: "نجهز لك صفحة هيبة.",
  emptyTitle: "ما فيه شي هنا للحين",
  emptyBody: "لما يكون فيه شي، بتشوفه هنا.",
  errorTitle: "صار خطأ",
  errorBody: "ما قدرنا نفتح الصفحة. حاول مرة ثانية.",
  offlineTitle: "ما فيه اتصال",
  offlineBody: "تأكد من الإنترنت وحاول مرة ثانية.",
  offlineBar: "ما فيه اتصال. بعض الأشياء ما بتشتغل.",
  deniedTitle: "ما نقدر نفتح هذي الصفحة",
  deniedBody: "افتح هيبة من تطبيق يونيبال.",
  countryTitle: "هيبة مو متوفرة هنا للحين",
  countryBody: "هيبة متوفرة في البحرين والسعودية حالياً.",
  openUnipal: "روح ليونيبال",
};

const STRINGS: Record<Lang, Record<StringKey, string>> = { en, ar };

export function translate(lang: Lang, key: StringKey, vars?: Record<string, string | number>) {
  let s = STRINGS[lang][key] ?? en[key];
  if (vars) for (const k of Object.keys(vars)) s = s.split("{" + k + "}").join(String(vars[k]));
  return s;
}
