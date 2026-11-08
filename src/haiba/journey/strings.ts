import type { Lang } from "./format";
import { memberEn } from "./strings.member";

/**
 * Every word a student sees on the new Haiba screens lives here, in English and Arabic.
 * Arabic is a draft in Saudi white dialect, one set for Bahrain and Saudi.
 * A copywriter checks it before students see it (see the English copy review).
 * {name} is filled in by t(key, { name: value }).
 * Rules: simple English, short words, no dashes, money with 2 decimals.
 */
const en = {
  ...memberEn,
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

  // Haiba page (reserve)
  reserveTitle: "Free gifts all year",
  reserveSub:
    "Haiba is Unipal's student membership. Pay once a year. Get a free gift every month and points every time you use Unipal.",
  benefitGifts: "12 free gifts",
  benefitGiftsSub: "1 gift every month. You pick the gift.",
  benefitPoints: "Points every time you use Unipal",
  benefitPointsSub: "Use them for free food, coffee and more.",
  benefitWelcome: "500 welcome points",
  benefitWelcomeSub: "When you join.",
  yourPrice: "Your price",
  perYearPlusVat: "a year plus VAT",
  priceRow: "Price for 1 year",
  vatRow: "VAT {rate}",
  totalRow: "Total for 1 year",
  priceBeforeVat: "Prices are before VAT. VAT is added when you pay the rest.",
  howTitle: "How it works",
  stepToday: "Today",
  stepTodayBody: "Pay {deposit}. Your price is locked.",
  stepOpenBody: "Haiba opens. Pay the rest: {rest} with VAT.",
  ruleCancel:
    "Changed your mind? Cancel in the app before you pay the rest and we send your deposit back.",
  ruleHold:
    "Your price is held for {days} after Haiba opens. If you do not pay the rest by {date}, the hold ends and we send your deposit back.",
  reserveCta: "Reserve my spot for {deposit}",
  reserveCtaNote: "Your deposit locks your price.",
  offlineCta: "Connect to the internet to reserve",
  exitSmall: "Before you go",
  exitTitle: "Hold your spot",
  exitBody:
    "Pay {deposit} today to keep your price of {price} plus VAT a year. You can get it back if you change your mind.",
  exitYes: "Reserve for {deposit}",
  exitNo: "No thanks",

  // Tap placeholder
  tapStandIn: "Payment page stand in",
  tapMerchant: "Unipal Haiba",
  tapFor_deposit: "Haiba deposit",
  tapFor_rest: "Haiba, the rest of your year",
  tapFor_join: "Haiba, 1 year",
  tapFor_card: "Update your card",
  tapFor_renew: "Haiba renewal, 1 year",
  tapAmount: "Amount",
  tapCardSaved: "Saved card",
  tapCardNew: "New card",
  tapSaveNote: "Tap saves your card for your next payment.",
  tapBack: "Back to Haiba",

  // Confirming
  confirmTitle: "We are confirming your payment",
  confirmBody: "This can take a minute. Please keep this page open.",
  confirmSlowTitle: "This is taking longer than usual",
  confirmSlowBody:
    "We will update this page when Tap confirms. If money left your account and nothing changes within 1 hour, contact support.",
  checkAgain: "Check again",

  // Payment failed
  failedTitle: "Your payment did not go through",
  failedBody: "No money was taken. Try again or use another card.",
  reason_declined: "Your bank did not accept this card.",
  reason_funds: "There was not enough money on the card.",
  reason_expired: "This card has expired.",
  reason_timeout: "Tap did not answer in time.",
  reason_cancelled: "You left the payment page.",
  useAnotherCard: "Use another card",

  // Reserved
  reservedPill: "Spot reserved",
  reservedTitle: "You are in",
  reservedSub: "Your price is locked at {price} plus VAT a year.",
  opensIn: "Haiba opens in",
  opensOn: "Haiba opens on {date}",
  unitDays: "days",
  unitHours: "hours",
  unitMins: "min",
  lockedPrice: "Your locked price",
  depositPaid: "Deposit paid",
  leftToPay: "Left to pay, with VAT",
  paidOn: "Paid {date}",
  nextTitle: "What happens next",
  nextToday: "Deposit paid",
  nextOpen: "Haiba opens. Pay the rest: {rest} with your {card}.",
  nextRemind: "We will remind you when it is time to pay the rest.",
  heldUntil: "Your price is held until {date}.",
  cardLabel: "{brand} ending {last4}",
  keyHeldTitle: "Your price is held until {date}",
  keyHeldBody: "Pay the rest by then to keep {price} a year plus VAT. We will remind you.",
  keyCancelTitle: "Changed your mind?",
  keyCancelBody: "Cancel before you pay the rest and we send your {deposit} deposit back.",
  cancelReservation: "Cancel my reservation",
  done: "Done",
  cancelTitle: "Cancel your reservation?",
  cancelBody: "Your {deposit} deposit goes back to your card. You lose your locked price.",
  cancelTime: "Refunds can take 5 to 10 working days to reach your card.",
  cancelYes: "Yes, cancel and refund",
  cancelKeep: "Keep my spot",

  // Refund
  refundPill: "Refund in progress",
  refundTitle: "Your refund is on its way",
  refundBody: "We sent {deposit} back to your {card}. It can take 5 to 10 working days to show.",
  refundStep1: "Reservation cancelled",
  refundStep2: "Refund sent to your bank",
  refundStep3: "Money back on your card",
  refundBy: "By {date}",
  refundedPill: "Refunded",
  refundedTitle: "Your deposit is back",
  refundedBody: "{deposit} is back on your card. Your reservation is cancelled.",
  reserveAgain: "Reserve again for {deposit}",
  reserveAgainNote: "Your price today is {price} plus VAT a year.",
  refundFailedPill: "Refund failed",
  refundFailedTitle: "We could not send your refund",
  refundFailedBody:
    "Your bank did not accept the refund. Our support team will send it to you by hand. Contact us if you have a question.",
  backToUnipal: "Back to Unipal",

  // Reservations closed
  closedTitle: "Reservations are closed",
  closedSub: "Haiba opens on {date}. You can join then.",
  closedOn: "Closed on {date}",
  closedNextTitle: "What happens next",
  closedStep1: "Reservations closed",
  closedStep2: "Haiba opens",
  closedStep3: "You join",
  closedStep3Body: "{price} a year plus VAT. No deposit, pay once for 1 year.",
  closedRemindNote: "We send you one message on opening day.",
  closedWhat: "What you get when you join",
  closedRemind: "Remind me when Haiba opens",
  closedReminded: "We will remind you on {date}",
  // 8 Nov: the three stage strip on the reserve and pay screens
  stageReserve: "Reserve",
  stagePay: "Pay the rest",
  stageMember: "Member",
  stageDone: "Done",
  stageNow: "Now",
  stageMissed: "Missed",
  stageCancelled: "Cancelled",
};

export type StringKey = keyof typeof en;

// Arabic for the member screens comes later; missing words fall back to English.
const ar: Partial<Record<StringKey, string>> = {
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
  deniedBody: "افتح هيبة من تطبيق Unipal.",
  countryTitle: "هيبة مو متوفرة هنا للحين",
  countryBody: "هيبة متوفرة في البحرين والسعودية حالياً.",
  openUnipal: "رجوع لـUnipal",

  reserveTitle: "هدايا مجانية طول السنة",
  reserveSub:
    "هيبة هي عضوية الطلاب في Unipal. تدفع مرة وحدة في السنة، وتاخذ هدية مجانية كل شهر ونقاط كل ما تستخدم Unipal.",
  benefitGifts: "12 هدية مجانية",
  benefitGiftsSub: "هدية كل شهر، وأنت تختارها.",
  benefitPoints: "نقاط كل ما تستخدم Unipal",
  benefitPointsSub: "استخدمها لأكل وقهوة مجانية وأكثر.",
  benefitWelcome: "500 نقطة ترحيبية",
  benefitWelcomeSub: "لما تنضم.",
  yourPrice: "سعرك",
  perYearPlusVat: "في السنة بالإضافة للضريبة",
  priceRow: "السعر لسنة",
  vatRow: "ضريبة القيمة المضافة {rate}",
  totalRow: "الإجمالي لسنة",
  priceBeforeVat: "الأسعار قبل الضريبة، والضريبة تنضاف لما تدفع الباقي.",
  howTitle: "كيف تشتغل",
  stepToday: "اليوم",
  stepTodayBody: "ادفع {deposit} ويتثبّت سعرك.",
  stepOpenBody: "تفتح هيبة. تدفع الباقي: {rest} مع الضريبة.",
  ruleCancel: "غيّرت رأيك؟ ألغِ من التطبيق قبل ما تدفع الباقي ونرجّع لك العربون.",
  ruleHold:
    "سعرك محفوظ لك {days} بعد ما تفتح هيبة. إذا ما دفعت الباقي قبل {date}، ينتهي الحجز ونرجّع لك العربون.",
  reserveCta: "احجز مكانك بـ{deposit}",
  reserveCtaNote: "العربون يثبّت لك سعرك.",
  offlineCta: "اتصل بالإنترنت عشان تحجز",
  exitSmall: "قبل ما تطلع",
  exitTitle: "احجز مكانك",
  exitBody:
    "ادفع {deposit} اليوم وثبّت سعرك {price} في السنة بالإضافة للضريبة. وتقدر تسترجعه إذا غيّرت رأيك.",
  exitYes: "احجز بـ{deposit}",
  exitNo: "لا، شكراً",

  tapStandIn: "صفحة دفع تجريبية",
  tapMerchant: "Unipal هيبة",
  tapFor_deposit: "عربون هيبة",
  tapFor_rest: "هيبة، باقي اشتراك السنة",
  tapFor_join: "هيبة، سنة",
  tapFor_card: "تحديث البطاقة",
  tapFor_renew: "تجديد هيبة، سنة",
  tapAmount: "المبلغ",
  tapCardSaved: "البطاقة المحفوظة",
  tapCardNew: "بطاقة جديدة",
  tapSaveNote: "Tap يحفظ بطاقتك للدفعة الجاية.",
  tapBack: "رجوع لهيبة",

  confirmTitle: "نتأكد من دفعتك",
  confirmBody: "ممكن تاخذ دقيقة. خلّ الصفحة مفتوحة.",
  confirmSlowTitle: "تأخرت أكثر من العادة",
  confirmSlowBody:
    "بنحدّث الصفحة أول ما يأكد Tap الدفع. إذا انخصم المبلغ وما تغيّر شي خلال ساعة، كلّم الدعم.",
  checkAgain: "تحقق مرة ثانية",

  failedTitle: "ما تمت عملية الدفع",
  failedBody: "ما انخصم أي مبلغ. جرّب مرة ثانية أو استخدم بطاقة ثانية.",
  reason_declined: "البنك ما قبل البطاقة.",
  reason_funds: "ما فيه رصيد كافي في البطاقة.",
  reason_expired: "البطاقة منتهية.",
  reason_timeout: "Tap ما رد في الوقت.",
  reason_cancelled: "طلعت من صفحة الدفع.",
  useAnotherCard: "استخدم بطاقة ثانية",

  reservedPill: "مكانك محجوز",
  reservedTitle: "حياك، مكانك محجوز",
  reservedSub: "سعرك مثبّت على {price} في السنة بالإضافة للضريبة.",
  opensIn: "هيبة تفتح بعد",
  opensOn: "هيبة تفتح في {date}",
  unitDays: "يوم",
  unitHours: "ساعة",
  unitMins: "دقيقة",
  lockedPrice: "سعرك المثبّت",
  depositPaid: "العربون المدفوع",
  leftToPay: "المتبقي عليك مع الضريبة",
  paidOn: "دفعته {date}",
  nextTitle: "وش يصير بعدين",
  nextToday: "دفعت العربون",
  nextOpen: "تفتح هيبة وتدفع الباقي: {rest} من بطاقتك {card}.",
  nextRemind: "بنذكّرك لما يحين وقت دفع الباقي.",
  heldUntil: "سعرك محفوظ لك لين {date}.",
  cardLabel: "{brand} تنتهي بـ{last4}",
  keyHeldTitle: "سعرك محفوظ لك لين {date}",
  keyHeldBody: "ادفع الباقي قبلها عشان يبقى سعرك {price} في السنة بالإضافة للضريبة. بنذكّرك.",
  keyCancelTitle: "غيّرت رأيك؟",
  keyCancelBody: "ألغِ قبل ما تدفع الباقي ونرجّع لك العربون {deposit}.",
  cancelReservation: "ألغِ حجزي",
  done: "تم",
  cancelTitle: "تبي تلغي حجزك؟",
  cancelBody: "العربون {deposit} يرجع لبطاقتك، وتخسر سعرك المثبّت.",
  cancelTime: "الاسترجاع ممكن ياخذ من 5 إلى 10 أيام عمل لين يوصل بطاقتك.",
  cancelYes: "إيه، ألغِ ورجّع العربون",
  cancelKeep: "خلّ مكاني",

  refundPill: "الاسترجاع قيد التنفيذ",
  refundTitle: "استرجاعك في الطريق",
  refundBody: "رجّعنا {deposit} لبطاقتك {card}. ممكن ياخذ من 5 إلى 10 أيام عمل لين يبين.",
  refundStep1: "انلغى الحجز",
  refundStep2: "أرسلنا الاسترجاع لبنكك",
  refundStep3: "المبلغ رجع لبطاقتك",
  refundBy: "قبل {date}",
  refundedPill: "تم الاسترجاع",
  refundedTitle: "رجع لك العربون",
  refundedBody: "{deposit} رجع لبطاقتك، وانلغى حجزك.",
  reserveAgain: "احجز مرة ثانية بـ{deposit}",
  reserveAgainNote: "سعرك اليوم {price} في السنة بالإضافة للضريبة.",
  refundFailedPill: "ما تم الاسترجاع",
  refundFailedTitle: "ما قدرنا نرجّع المبلغ",
  refundFailedBody:
    "البنك ما قبل الاسترجاع. فريق الدعم بيرجّعه لك يدوياً. تواصل معنا إذا عندك سؤال.",
  backToUnipal: "رجوع لـUnipal",

  closedTitle: "انتهى الحجز",
  closedSub: "هيبة تفتح في {date}. تقدر تنضم وقتها.",
  closedOn: "انتهى في {date}",
  closedNextTitle: "وش يصير بعدين",
  closedStep1: "انتهى الحجز",
  closedStep2: "تفتح هيبة",
  closedStep3: "تنضم",
  closedStep3Body: "{price} في السنة بالإضافة للضريبة. بدون عربون، تدفع مرة وحدة لسنة.",
  closedRemindNote: "بنرسل لك رسالة وحدة يوم الافتتاح.",
  closedWhat: "وش تاخذ لما تنضم",
  closedRemind: "ذكّرني لما تفتح هيبة",
  closedReminded: "بنذكّرك في {date}",
  stageReserve: "احجز",
  stagePay: "ادفع الباقي",
  stageMember: "عضو",
  stageDone: "تم",
  stageNow: "الحين",
  stageMissed: "فات",
  stageCancelled: "ملغي",
};

const STRINGS: Record<Lang, Partial<Record<StringKey, string>>> = { en, ar };

export function translate(lang: Lang, key: StringKey, vars?: Record<string, string | number>) {
  let s = STRINGS[lang][key] ?? en[key];
  if (vars) for (const k of Object.keys(vars)) s = s.split("{" + k + "}").join(String(vars[k]));
  return s;
}

/** "7 days" in English. In Arabic the word changes with the number: 1 يوم, 2 يومين, 3 to 10 أيام, 11 and more يوم. */
export function daysText(lang: Lang, n: number) {
  if (lang === "en") return n === 1 ? "1 day" : `${n} days`;
  if (n === 1) return "يوم";
  if (n === 2) return "يومين";
  if (n >= 3 && n <= 10) return `${n} أيام`;
  return `${n} يوم`;
}
