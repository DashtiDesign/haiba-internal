import { Elsewhere, NotStudent } from "./Edge";
import { MainPromo } from "./Reserve";
import { useEffect, useState, type ReactNode } from "react";
import type React from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Coins,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  Gift as GiftIcon,
  Lock,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  Receipt,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import Artwork from "../../Artwork";
import { Navigate, useNavigate } from "../../nav";
import { Button, LinkOut, Screen, Sheet, TopBar, supportHref } from "../ui";
import { Countdown, JourneyStage, Pill, Rows, Section, Steps } from "../parts";
import { useSession, type Session } from "../session";
import { pathFor, useJourneyActions } from "../actions";
import { addDays, addMonths, pct, startOf } from "../format";
import { daysText } from "../strings";
import {
  ACTIVITY,
  BRANDS,
  CAT_BG,
  E,
  GIFTS,
  ICON,
  SUBS,
  subsFor,
  type Activity,
  type ActivityItem,
  type Brand,
  type Gift,
  type Sub,
} from "../data";
import { FAQ } from "../strings.member";
import { useGift } from "../gift";

/* ---------- small shared bits ---------- */

function useQuery() {
  return (useRouterState({ select: (r) => r.location.search }) || {}) as Record<string, unknown>;
}

/**
 * Brand mark, the one way a shop or partner is shown everywhere in Haiba.
 * Rounded square, corner radius 30% of the size. Logo on the brand colour, or the brand's letters when there is no logo.
 * Sizes in use: 56 (shop rail), 40 to 44 (rows), 28 (badge on a tile), 22 (inline).
 */
export function BrandMark({ brand, size = 40 }: { brand: Brand; size?: number }) {
  const style = {
    width: size,
    height: size,
    background: brand.bg,
    borderRadius: Math.round(size * 0.24),
  };
  return brand.logo ? (
    <img src={brand.logo} alt="" className="jx-logo" style={style} />
  ) : (
    <span
      className="jx-logo jx-logo-mark"
      style={{ ...style, color: brand.ink ?? "#FFFFFF", fontSize: Math.round(size * 0.38) }}
    >
      {brand.mark}
    </span>
  );
}
const Logo = BrandMark;

/** Price line on any item: points to spend (purple) or the value of something free (lime). */
export function PriceTag({
  kind,
  children,
  off,
}: {
  kind: "points" | "worth";
  children: ReactNode;
  off?: boolean;
}) {
  return (
    <span className={`jx-price jx-price-${kind} ${off ? "jx-price-off" : ""}`}>
      {kind === "points" && <img src="/haiba/coins/coin-front.webp" alt="" />}
      {children}
    </span>
  );
}

/** Every subscription shows its own logo. For "subscriptions" in general, the logos sit side by side. */
export function SubLogos({ size = 30, subs = SUBS }: { size?: number; subs?: Sub[] }) {
  return (
    <span className="jx-sublogos" aria-hidden="true">
      {subs.map((p) => (
        <img
          key={p.id}
          src={p.logo}
          alt=""
          style={{ width: size, height: size, borderRadius: Math.round(size * 0.24) }}
        />
      ))}
    </span>
  );
}

/** Haiba membership itself: the lime Haiba logo on a purple tile. */
export function HaibaMark({ size = 44 }: { size?: number }) {
  return (
    <span
      className="jx-hmark"
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.24) }}
      aria-hidden="true"
    >
      <img src={ICON.member} alt="" />
    </span>
  );
}

function Emoji({ src, size = 120 }: { src: string; size?: number }) {
  return (
    <img
      src={src}
      alt=""
      style={{ width: size, height: size, objectFit: "contain", display: "block" }}
    />
  );
}

function Center({
  art,
  pill,
  title,
  body,
  children,
}: {
  art?: ReactNode;
  pill?: ReactNode;
  title: string;
  body?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="jx-center">
      {art}
      {pill}
      <h1 className="jx-h2" style={{ marginTop: 6 }}>
        {title}
      </h1>
      {body && <p className="jx-sub">{body}</p>}
      {children}
    </div>
  );
}

function Key({
  icon,
  title,
  body,
  children,
}: {
  icon: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="jx-key">
      <span className="jx-key-icon">{icon}</span>
      <span className="jx-key-text">
        <span className="jx-key-title">{title}</span>
        {body && <span className="jx-key-body">{body}</span>}
        {children}
      </span>
    </div>
  );
}

const monthName = (iso: string, lang: "en" | "ar") =>
  new Intl.DateTimeFormat(lang === "ar" ? "ar-u-nu-latn-ca-gregory" : "en-GB", {
    month: "long",
  }).format(new Date(iso + "T10:00"));

const firstOfNext = (iso: string) => {
  const d = new Date(iso + "T10:00");
  return new Date(d.getFullYear(), d.getMonth() + 1, 1, 10).toISOString().slice(0, 10);
};

/** Member year dates: from the day the rest was paid, 12 months. */
function year(s: Session) {
  const from = s.journey.memberSince ?? addDays(s.launch, 1);
  return { from, to: addMonths(from, 12) };
}

function cardText(s: Session) {
  const c = s.journey.card ?? { brand: "Visa", last4: "4242" };
  return s.t("cardLabel", { brand: c.brand, last4: c.last4 });
}

/* ---------- 2 · at launch ---------- */

/** Sends a student who is not in this state to the screen for their own state (8 Nov). */
function useGuard(...ok: string[]) {
  const s = useSession();
  if (!s.hb.ready || !s.valid || ok.includes(s.journey.status)) return null;
  return <Navigate to={pathFor(s.journey.status)} replace />;
}

export function PayRest() {
  const s = useSession();
  const a = useJourneyActions();
  const [cancel, setCancel] = useState(false);
  const holdEndsMs = startOf(s.holdEnds) + 24 * 3600000;
  const away = useGuard("pay_rest_open");
  if (away) return away;
  return (
    <Screen
      dock={
        <>
          <Button variant="lime" onClick={() => a.startPayment("rest")}>
            {s.t("payCta", { amount: s.m(s.rest) })}
          </Button>
          <p className="jx-dock-note">{s.t("payNoRefund")}</p>
        </>
      }
    >
      {/* 8 Nov: lime, the coin bird and "Haiba is open", so it never looks like Reserved (dark). */}
      <header className="jx-dark-hero jx-hero-lime">
        <TopBar back="/" />
        <Artwork src={BIRD("27-coin")} alt="" className="jx-hero-bird" />
        <div className="jx-hero-text">
          <h1 className="jx-h1">{s.t("payTitle")}</h1>
          <p className="jx-sub">{s.t("paySub", { price: s.m(s.price) })}</p>
        </div>
        <div className="jx-counter-label">{s.t("payHeld")}</div>
        <Countdown to={holdEndsMs} />
      </header>
      <div className="jx-pad">
        <JourneyStage stage="pay" />
      </div>
      <Section>
        <Rows
          strongLast
          rows={[
            [s.t("lockedPrice"), s.m(s.price), s.t("perYearPlusVat")],
            [s.t("vatRow", { rate: pct(s.vatRate) }), s.m(s.vat)],
            [s.t("depositPaid"), "− " + s.m(s.deposit)],
            [s.t("payDue"), s.m(s.rest)],
          ]}
        />
        <button className="jx-row" style={{ marginTop: 6 }}>
          <span className="jx-row-icon">
            <CreditCard size={18} aria-hidden="true" />
          </span>
          <span className="jx-row-main">
            <span className="jx-row-sub">{s.t("payCard")}</span>
            <span className="jx-row-title">{cardText(s)}</span>
          </span>
          <span className="jx-row-end jx-accent">{s.t("payChange")}</span>
        </button>
      </Section>
      <Section>
        <div className="jx-keys">
          <Key
            icon={<Lock size={20} aria-hidden="true" />}
            title={s.t("keyHeldTitle", { date: s.d(s.holdEnds, { weekday: true }) })}
            body={s.t("payHeldUntil", { date: s.d(s.holdEnds) })}
          />
          <Key
            icon={<RotateCcw size={20} aria-hidden="true" />}
            title={s.t("keyCancelTitle")}
            body={s.t("keyCancelBody", { deposit: s.m(s.deposit) })}
          >
            <button className="jx-key-link" onClick={() => setCancel(true)}>
              {s.t("cancelReservation")}
            </button>
          </Key>
        </div>
      </Section>
      <Sheet open={cancel} onClose={() => setCancel(false)} label={s.t("cancelTitle")}>
        <h2 className="jx-h2">{s.t("cancelTitle")}</h2>
        <p className="jx-sub" style={{ marginTop: 0 }}>
          {s.t("cancelBody", { deposit: s.m(s.deposit) })}
        </p>
        <Button
          variant="danger"
          onClick={() => {
            setCancel(false);
            a.cancelReservation();
          }}
        >
          {s.t("cancelYes")}
        </Button>
        <Button variant="primary" onClick={() => setCancel(false)}>
          {s.t("cancelKeep")}
        </Button>
      </Sheet>
    </Screen>
  );
}

export function HoldExpired() {
  const s = useSession();
  const go = useNavigate();
  const away = useGuard("hold_expired");
  if (away) return away;
  const old = s.journey.lockedPrice;
  const changed = old != null && old !== s.price;
  return (
    <Screen
      dock={
        <>
          <Button variant="primary" onClick={() => go("/haiba/join")}>
            {s.t("joinCta", { amount: s.m(s.total) })}
          </Button>
          <p className="jx-dock-note">{s.t("holdDockNote")}</p>
        </>
      }
    >
      <Result tone="warn" bird="19-hourglass" back="/">
        <h1 className="jx-h1 jx-res-title">{s.t("expiredTitle")}</h1>
        <p className="jx-sub">{s.t("holdSub", { date: s.d(s.holdEnds, { weekday: true }) })}</p>
        <JourneyStage stage="expired" />

        <ol className="jx-tl">
          <li className="done">
            <span className="jx-tl-dot">
              <Check size={14} strokeWidth={3} aria-hidden="true" />
            </span>
            <span className="jx-row-main">
              <span className="jx-row-sub">{s.d(s.launch, { weekday: true })}</span>
              <span className="jx-row-title">{s.t("holdStep1")}</span>
            </span>
          </li>
          <li className="off">
            <span className="jx-tl-dot">
              <X size={14} strokeWidth={3} aria-hidden="true" />
            </span>
            <span className="jx-row-main">
              <span className="jx-row-sub">{s.d(s.holdEnds, { weekday: true })}</span>
              <span className="jx-row-title">{s.t("holdStep2")}</span>
            </span>
            {old != null && <span className="jx-strike jx-num">{s.m(old)}</span>}
          </li>
          <li className="now">
            <span className="jx-tl-dot">
              <RotateCcw size={14} strokeWidth={3} aria-hidden="true" />
            </span>
            <span className="jx-row-main">
              <span className="jx-tl-now">{s.t("holdOnWay")}</span>
              <span className="jx-row-title">{s.t("holdStep3", { deposit: s.m(s.deposit) })}</span>
              <span className="jx-row-sub">{s.t("holdStep3Sub", { card: cardText(s) })}</span>
            </span>
          </li>
        </ol>

        <div className="jx-join-card">
          <span className="jx-row-main">
            <span className="jx-row-title">{s.t("holdStillTitle")}</span>
            <span className="jx-row-sub">
              {changed
                ? s.t("holdStillChanged", { price: s.m(s.price) })
                : s.t("holdStillSame", { price: s.m(s.price) })}
            </span>
          </span>
          <HaibaMark size={54} />
        </div>
      </Result>
    </Screen>
  );
}

const BENEFITS: [
  ReactNode,
  "benefitGifts" | "benefitPoints" | "benefitWelcome",
  "benefitGiftsSub" | "benefitPointsSub" | "benefitWelcomeSub",
][] = [
  [<GiftIcon key="g" size={18} />, "benefitGifts", "benefitGiftsSub"],
  [<Coins key="c" size={18} />, "benefitPoints", "benefitPointsSub"],
  [<Sparkles key="s" size={18} />, "benefitWelcome", "benefitWelcomeSub"],
];

export function Join() {
  const s = useSession();
  if (s.student !== "verified") return <NotStudent action="join" />;
  if (s.elsewhere) return <Elsewhere />;
  // After launch the main promo page becomes the join page: full price with VAT, no deposit.
  return <MainPromo mode="Join" />;
}

export function Paid() {
  const s = useSession();
  const go = useNavigate();
  const away = useGuard("member", "renewal_due", "cancelled");
  if (away) return away;
  const y = year(s);
  const hadDeposit = s.journey.depositPaidOn != null;
  return (
    <Screen
      tone="soft"
      dock={
        <>
          <Button variant="primary" onClick={() => go("/haiba/welcome")}>
            {s.t("paidCta")}
          </Button>
        </>
      }
    >
      <div className="jx-paid">
        <span className="jx-confetti" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <i key={i} />
          ))}
        </span>
        <TopBar back="/" />
        <Artwork src={BIRD("18-joined")} alt="" className="jx-paid-bird" />
        <div className="jx-paid-text">
          <Tag tone="dark">{s.t("memMember")}</Tag>
          <h1 className="jx-h1">{s.t("paidTitle")}</h1>
          <p className="jx-sub">
            {s.t("paidRangeLine", { from: s.d(y.from), to: s.d(y.to, { year: true }) })}
          </p>
        </div>
        <div className="jx-paid-receipt">
          <span className="jx-li-icon">
            <Receipt size={18} aria-hidden="true" />
          </span>
          <span className="jx-row-main">
            <span className="jx-row-title jx-num">
              {s.t("paidLine", { amount: s.m(hadDeposit ? s.rest : s.total) })}
            </span>
            <span className="jx-row-sub">
              {cardText(s)} · {s.t("paidEmailed")}
            </span>
          </span>
        </div>
        <span className="jx-label jx-paid-label">{s.t("paidReady")}</span>
        <div className="jx-paid-grid">
          {(
            [
              [<img key="u" src={ICON.unipass} alt="" />, "paidR1", "paidR1Sub"],
              [<SubLogos key="s" size={30} />, "paidR2", "paidR2Sub"],
              [<img key="p" src={ICON.points} alt="" />, "paidR3", "paidR3Sub"],
            ] as const
          ).map(([art, t, sub]) => (
            <div className="jx-paid-tile" key={t}>
              <span className="jx-paid-art">{art}</span>
              <span className="jx-row-title">{s.t(t)}</span>
              <span className="jx-row-sub">{s.t(sub)}</span>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

/** Mascot art. Stills are png; "motion/<name>" is an animated loop. */
export const BIRD = (n: string) =>
  n.startsWith("motion/")
    ? `/haiba/${n}.webp`
    : Number(n.slice(0, 2)) >= 17
      ? `/haiba/birds/${n}.webp`
      : `/haiba/birds/${n}.png`;
const POINTS = 1240;

export function Result({
  tone,
  bird,
  back,
  children,
}: {
  tone: "warn" | "lilac" | "lime" | "dark";
  bird: string;
  back: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className={`jx-res jx-res-${tone}`}>
        <TopBar back={back} onDark={tone === "dark"} />
        <Artwork src={BIRD(bird)} alt="" className="jx-res-bird" />
      </header>
      <div className="jx-res-body">{children}</div>
    </>
  );
}

/** Brand, item and a value on one line, inside a soft card. */
function ItemLine({
  brand,
  item,
  end,
  img,
}: {
  brand: Brand;
  item: string;
  end?: ReactNode;
  img?: string;
}) {
  return (
    <div className="jx-item">
      {img ? (
        <span className="jx-item-art">
          <img src={img} alt="" />
          <span className="jx-item-badge">
            <Logo brand={brand} size={22} />
          </span>
        </span>
      ) : (
        <Logo brand={brand} size={48} />
      )}
      <span className="jx-row-main">
        <span className="jx-row-sub">{brand.name}</span>
        <span className="jx-row-title">{item}</span>
      </span>
      {end}
    </div>
  );
}

export function Tag({
  tone = "soft",
  icon,
  children,
}: {
  tone?: "soft" | "good" | "warn" | "dark" | "lime" | "purple";
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className={`jx-tag jx-tag-${tone}`}>
      {icon}
      {children}
    </span>
  );
}

/** Group of tappable rows on a white card, Monzo and talabat style. */
export function Group({
  title,
  end,
  children,
}: {
  title?: ReactNode;
  end?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="jx-group">
      {(title || end) && (
        <div className="jx-group-head">
          <span>{title}</span>
          {end}
        </div>
      )}
      <div className="jx-group-card">{children}</div>
    </section>
  );
}

export function LinkRow({
  icon,
  title,
  sub,
  end,
  onClick,
  href,
  danger,
}: {
  icon?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  end?: ReactNode;
  onClick?: () => void;
  href?: string;
  danger?: boolean;
}) {
  const inner = (
    <>
      {icon && <span className={`jx-li-icon ${danger ? "jx-li-icon-bad" : ""}`}>{icon}</span>}
      <span className="jx-row-main">
        <span className="jx-row-title" style={danger ? { color: "var(--jx-bad)" } : undefined}>
          {title}
        </span>
        {sub && <span className="jx-row-sub">{sub}</span>}
      </span>
      {end ??
        (!danger && <ChevronRight size={20} className="jx-flip jx-li-chev" aria-hidden="true" />)}
    </>
  );
  return href ? (
    <a className="jx-li" href={href} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <button className="jx-li" onClick={onClick}>
      {inner}
    </button>
  );
}

/* ---------- 4 · codes and activity ---------- */

type CodeKind = "reward" | "gift";
const CODE_ITEMS: Record<
  CodeKind,
  { brand: string; item: string; pts?: number; value: number; img: string; code: string }
> = {
  reward: {
    brand: "cb",
    item: "Free upsize",
    pts: 300,
    value: 0.3,
    img: E("drink"),
    code: "HB 8K3Q 21",
  },
  gift: { brand: "cb", item: "Regular drink", value: 1.9, img: E("drink"), code: "UP 4M7T 90" },
};

/** One code screen for rewards and Unipass gifts: active (12 hours), expired, cancelled, used. */
export function Code() {
  const s = useSession();
  const go = useNavigate();
  const q = useQuery();
  const kind: CodeKind = q["kind"] === "gift" ? "gift" : "reward";
  // 9 Nov: a Unipass gift code is this month's real pick (journey/gift.ts), so the hub, Unipass and savings follow it.
  const gp = useGift(s.today);
  const state = String(q["state"] ?? (kind === "gift" && gp.status === "used" ? "used" : "active"));
  // A reward picked on Your points (4.1) arrives with its shop and item in the link; otherwise the sample one shows.
  const picked = kind === "reward" && q["shop"] ? q : null;
  const it = picked
    ? {
        ...CODE_ITEMS.reward,
        item: String(picked["item"] ?? CODE_ITEMS.reward.item),
        pts: Number(picked["pts"] ?? CODE_ITEMS.reward.pts),
        value: Number(picked["value"] ?? 0) || CODE_ITEMS.reward.value,
        img: String(picked["img"] || CODE_ITEMS.reward.img),
      }
    : kind === "gift" && gp.gift
      ? {
          ...CODE_ITEMS.gift,
          brand: gp.gift.brand,
          item: gp.gift.item,
          value: gp.gift.value,
          img: gp.gift.img,
        }
      : CODE_ITEMS[kind];
  const brand: Brand = picked
    ? {
        key: "picked",
        name: String(picked["shop"]),
        ...(picked["logo"] ? { logo: String(picked["logo"]) } : {}),
        mark: String(picked["mark"] ?? ""),
        bg: String(picked["bg"] ?? "#FFFFFF"),
        ink: "#FFFFFF",
      }
    : BRANDS[it.brand]!;
  // The same link with another state, so cancel, expire and use keep the same reward on screen.
  const withState = (st: string) => {
    const p = new URLSearchParams();
    Object.entries(q).forEach(([k, v]) => k !== "state" && p.set(k, String(v)));
    p.set("state", st);
    return "/haiba/code?" + p.toString();
  };
  const month = monthName(s.today, s.lang);
  const monthEnd = addDays(firstOfNext(s.today), -1);
  const back = kind === "gift" ? "/haiba/unipass" : "/haiba/rewards";

  // A gift code that runs out just goes away; they pick again on Unipass. No expired screen for gifts.
  if (kind === "gift" && state === "expired") return <Navigate to="/haiba/unipass" replace />;

  if (state === "expired" || state === "cancelled") {
    const expired = state === "expired";
    return (
      <Screen
        dock={
          <>
            <Button
              variant="primary"
              onClick={() => go(kind === "gift" && !expired ? "/haiba/unipass" : back)}
            >
              {expired
                ? s.t("codeNew")
                : kind === "gift"
                  ? s.t("codePickAgain")
                  : s.t("codeBackRewards")}
            </Button>
            {kind === "reward" && expired && (
              <Button variant="ghost" onClick={() => go("/haiba/rewards")}>
                {s.t("codeBackPoints")}
              </Button>
            )}
          </>
        }
      >
        <Result
          tone={expired ? "warn" : "lilac"}
          bird={expired ? "20-code-expired" : "16-torn"}
          back={back}
        >
          <h1 className="jx-h1 jx-res-title">
            {s.t(expired ? "codeExpiredTitle" : "codeCancelledTitle")}
          </h1>
          <p className="jx-sub">
            {kind === "reward"
              ? s.t(expired ? "codeExpiredReward" : "codeCancelledReward")
              : s.t(expired ? "codeExpiredGift" : "codeCancelledGift")}
          </p>

          {kind === "reward" ? (
            <div className="jx-back-card">
              <span className="jx-back-coin">
                <Coins size={22} aria-hidden="true" />
              </span>
              <span className="jx-row-main">
                <span className="jx-back-big jx-num">
                  {s.t("resPointsBack", { pts: it.pts ?? 0 })}
                </span>
                <span className="jx-row-sub">
                  {s.t("resBalance", { n: POINTS.toLocaleString("en-US") })}
                </span>
              </span>
            </div>
          ) : (
            <div className="jx-back-card jx-back-card-lime">
              <span className="jx-back-coin">
                <GiftIcon size={22} aria-hidden="true" />
              </span>
              <span className="jx-row-main">
                <span className="jx-row-title">{s.t("resGiftKept", { month })}</span>
                <span className="jx-row-sub">{s.t("resGiftKeptSub", { date: s.d(monthEnd) })}</span>
              </span>
            </div>
          )}

          <ItemLine
            brand={brand}
            item={it.item}
            img={it.img}
            end={<span className="jx-strike jx-num">{it.code}</span>}
          />
        </Result>
      </Screen>
    );
  }

  if (state === "used") {
    // 8 Nov: a calm receipt. The item is the hero, then what you saved and what it cost, then your total.
    const bg = kind === "gift" ? CAT_BG["Food and drink"] : "#F0ECFF";
    return (
      <Screen
        tone="soft"
        dock={
          <Button variant="primary" onClick={() => go("/haiba")}>
            {s.t("codeDone")}
          </Button>
        }
      >
        <TopBar back="/haiba" />
        <div className="jx-used">
          <span className="jx-used-art" style={{ background: bg }}>
            <img src={it.img} alt="" />
            <span className="jx-used-logo">
              <Logo brand={brand} size={34} />
            </span>
            <span className="jx-used-check" aria-hidden="true">
              <Check size={18} strokeWidth={3.2} />
            </span>
          </span>
          <h1 className="jx-h1 jx-used-title">
            {s.t("codeUsedTitle", { item: it.item.toLowerCase() })}
          </h1>
          <p className="jx-sub jx-used-sub">
            {s.t("usedAt", { brand: brand.name + ", Seef", time: "4:12 pm" })}
          </p>

          <div className="jx-receipt">
            <div className="jx-receipt-row jx-receipt-main">
              <span>{s.t("codeUsedSavedLabel")}</span>
              <b className="jx-num">{s.m(it.value)}</b>
            </div>
            <div className="jx-receipt-row">
              <span>{kind === "gift" ? s.t("usedGiftLabel") : s.t("usedPtsLabel")}</span>
              <b className="jx-num">
                {kind === "gift"
                  ? s.t("usedGiftValue", { month: monthName(s.today, s.lang) })
                  : s.t("usedPtsValue", { pts: (it.pts ?? 0).toLocaleString("en-US") })}
              </b>
            </div>
            <button
              className="jx-receipt-row jx-receipt-link"
              onClick={() => go("/haiba/activity")}
            >
              <span>{s.t("usedTotalAll")}</span>
              <b className="jx-num">{s.m(27.4 + it.value)}</b>
              <ChevronRight size={18} className="jx-flip" aria-hidden="true" />
            </button>
          </div>
          {kind === "reward" && <p className="jx-small jx-used-note">{s.t("codeRewardNote")}</p>}
        </div>
      </Screen>
    );
  }

  // active
  return (
    <Screen tone="dark">
      <TopBar back={back} onDark title={s.t("codeShow")} />
      <div className="jx-pad" style={{ paddingTop: 4 }}>
        <div className="jx-tk">
          <div className="jx-tk-head">
            <span className="jx-tk-art">
              <img src={it.img} alt="" />
            </span>
            <span className="jx-row-main">
              <span className="jx-tk-brand">
                <Logo brand={brand} size={20} /> {brand.name}
              </span>
              <span className="jx-tk-item">{it.item}</span>
              <span className="jx-row-sub">
                {kind === "gift"
                  ? s.t("codeGiftLabel", { month }) +
                    " · " +
                    s.t("upWorth", { amount: s.m(it.value) })
                  : s.t("codePtsHeld", { pts: it.pts ?? 0 })}
              </span>
            </span>
          </div>
          <div className="jx-tk-cut" aria-hidden="true" />
          <div className="jx-tk-code-wrap">
            <span className="jx-small">{s.t("codeStaff")}</span>
            <span className="jx-tk-code jx-num" dir="ltr">
              {it.code}
            </span>
          </div>
          <div className="jx-tk-time">
            <span className="jx-tk-time-row">
              <span className="jx-small">{s.t("codeValid")}</span>
              <b className="jx-num">{s.t("codeLeft", { time: "11:52" })}</b>
            </span>
            <span className="jx-bar">
              <span style={{ width: "92%" }} />
            </span>
          </div>
        </div>
      </div>
      <div className="jx-pad">
        <ol className="jx-howto">
          {[s.t("codeHow1"), s.t("codeHow2"), s.t("codeHow3", { item: it.item.toLowerCase() })].map(
            (t, i) => (
              <li key={i}>
                <span className="jx-howto-n">{i + 1}</span>
                <span>{t}</span>
              </li>
            ),
          )}
        </ol>
        {kind === "reward" && (
          <p className="jx-small jx-center-text" style={{ color: "#B9B3CF" }}>
            {s.t("codeRewardNote")}
          </p>
        )}
      </div>
      <div className="jx-actions">
        <Button
          variant="ghost"
          onClick={() => {
            if (kind === "gift") gp.drop();
            go(withState("cancelled"));
          }}
        >
          {kind === "gift" ? s.t("codeCancelGift") : s.t("codeCancelReward")}
        </Button>
      </div>
      <div className="jx-tap-sim jx-proto-dark" dir="ltr" lang="en">
        <div className="jx-tap-sim-title">Prototype: what happens next</div>
        <div className="jx-proto-btns">
          <button
            onClick={() => {
              if (kind === "gift") gp.use();
              go(withState("used"));
            }}
          >
            Staff enters the code
          </button>
          <button
            onClick={() => {
              if (kind === "gift") {
                gp.drop();
                go("/haiba/unipass");
              } else go(withState("expired"));
            }}
          >
            12 hours pass
          </button>
        </div>
      </div>
    </Screen>
  );
}

/** 8 Nov: Activity and You saved are one page. /haiba/activity opens it at the list. */
export function ActivityPage() {
  return <Saved focus="activity" />;
}

/* ---------- 5 · Unipass ---------- */

function GiftCard({
  g,
  s,
  next,
  onPick,
  preview,
}: {
  g: Gift;
  s: Session;
  next: string;
  onPick?: (() => void) | undefined;
  preview?: string | undefined;
}) {
  const b = BRANDS[g.brand]!;
  const paused = !!g.backOn;
  return (
    <div className={`jx-gc ${paused ? "jx-gc-off" : ""}`}>
      <div className="jx-gc-art" style={{ background: CAT_BG[g.cat] }}>
        <span className="jx-gc-logo">
          <Logo brand={b} size={28} />
        </span>
        <img src={g.img} alt="" />
        {paused && (
          <span className="jx-gc-ribbon">
            {s.t("upBackOn", { date: s.d(g.backOn === "next" ? next : g.backOn!) })}
          </span>
        )}
      </div>
      <div className="jx-gc-body">
        <span className="jx-gc-brand">{b.name}</span>
        <span className="jx-gc-item">{g.item}</span>
        <PriceTag kind="worth">{s.t("upWorth", { amount: s.m(g.value) })}</PriceTag>
        {g.limit && <span className="jx-gc-limit">{g.limit}</span>}
      </div>
      {!paused && onPick && (
        <button className="jx-gc-btn" onClick={onPick}>
          {s.t("upPick")}
        </button>
      )}
      {!paused && preview && <span className="jx-gc-soon">{preview}</span>}
    </div>
  );
}

export function Unipass() {
  const s = useSession();
  const go = useNavigate();
  const q = useQuery();
  const gp = useGift(s.today);
  // 9 Nov: the page follows this month's gift; ?view= still previews a state from the panel.
  const view = String(q["view"] ?? (gp.status === "used" ? "used" : "pick"));
  const [cat, setCat] = useState("All");
  const [sheet, setSheet] = useState<Gift | null>(
    q["sheet"] ? (GIFTS.find((g) => g.id === q["sheet"]) ?? null) : null,
  );
  const month = monthName(s.today, s.lang);
  const next = firstOfNext(s.today);
  const monthEnd = addDays(next, -1);
  const daysLeft = Math.max(1, Math.round((startOf(next) - startOf(s.today)) / 86400000));
  const giftN = view === "last" ? 12 : view === "lost" ? 3 : 2;
  const cats = ["All", "Food and drink", "Fun", "Self care", "Car care"];
  const list = GIFTS.filter((g) => cat === "All" || g.cat === cat);
  const used = view === "used";
  const usedGift = gp.status === "used" && gp.gift ? gp.gift : GIFTS[0]!;
  const ready = !used && gp.status === "active" && gp.gift ? gp.gift : null;
  const nextMonth = monthName(next, s.lang);

  // The one month tracker used across Haiba (same as the membership card): filled = gift used,
  // half filled = this month, empty = to come, hatched = missed.
  const dots = (
    <MonthTrack
      from={year(s).from}
      lang={s.lang}
      label={s.t("upYear", { n: giftN })}
      state={(i) =>
        view === "lost" && i === giftN - 2
          ? "missed"
          : i < giftN - 1
            ? "on"
            : i === giftN - 1
              ? used
                ? "on now"
                : "now"
              : ""
      }
    />
  );

  let hero: ReactNode;
  if (used) {
    // 8 Nov: gift used this month. Same lime hero as picking a gift, so the month reads as one story:
    // what you got (a small receipt), when the next one opens, then the year.
    hero = (
      <header className="jx-up-hero jx-up-hero-got">
        <TopBar back="/haiba" />
        <Artwork src={BIRD("13-fist")} alt="" className="jx-up-bird jx-up-bird-got" />
        <div className="jx-pad jx-up-text">
          <span className="jx-label" style={{ color: "var(--jx-ink)" }}>
            {s.t("upYear", { n: giftN })}
          </span>
          <h1 className="jx-h1" style={{ marginTop: 6 }}>
            {s.t("upGotTitle", { month })}
          </h1>
          <span className="jx-up-nextpill">
            <Clock size={15} aria-hidden="true" />
            {s.t("upNextIn", { days: daysText(s.lang, daysLeft) })}
          </span>
        </div>
        <div className="jx-pad">
          <div className="jx-up-done">
            <span className="jx-up-done-art" style={{ background: CAT_BG[usedGift.cat] }}>
              <img src={usedGift.img} alt="" />
            </span>
            <span className="jx-row-main">
              <span className="jx-row-title">{usedGift.item}</span>
              <span className="jx-row-sub">
                {BRANDS[usedGift.brand]!.name} ·{" "}
                {s.t("upUsedOn", { date: s.d(gp.usedOn ?? addDays(s.today, -2)) })}
              </span>
            </span>
            <span className="jx-up-done-save">
              <Check size={14} strokeWidth={3} aria-hidden="true" />
              {s.m(usedGift.value)}
            </span>
          </div>
          {dots}
        </div>
      </header>
    );
  } else if (view === "monthend") {
    hero = (
      <header className="jx-up-hero jx-up-hero-warn">
        <TopBar back="/haiba" />
        <Artwork src={BIRD("11-run")} alt="" className="jx-up-bird" />
        <div className="jx-pad jx-up-text">
          <Tag tone="dark" icon={<Clock size={14} aria-hidden="true" />}>
            {s.t("upChooseIn", { days: daysText(s.lang, 3) })}
          </Tag>
          <h1 className="jx-h1" style={{ marginTop: 10 }}>
            {s.t("upMonthEndTitle", { days: daysText(s.lang, 3), month })}
          </h1>
          <p className="jx-sub">{s.t("upMonthEndSub", { date: s.d(monthEnd) })}</p>
          {dots}
        </div>
      </header>
    );
  } else if (view === "last") {
    hero = (
      <header className="jx-up-hero jx-up-hero-dark">
        <TopBar back="/haiba" onDark />
        <Artwork src={BIRD("12-ledge")} alt="" className="jx-up-bird jx-up-bird-ledge" />
        <div className="jx-pad jx-up-text">
          <span className="jx-label" style={{ color: "var(--jx-lime)" }}>
            {s.t("upYear", { n: 12 })}
          </span>
          <h1 className="jx-h1" style={{ marginTop: 6 }}>
            {s.t("upLastTitle")}
          </h1>
          <p className="jx-sub">{s.t("upLastSub", { date: s.d(year(s).to, { year: true }) })}</p>
          <div style={{ marginTop: 16 }}>
            <Button variant="lime" onClick={() => go("/haiba/membership?view=renewal")}>
              {s.t("upRenew")}
            </Button>
          </div>
          {dots}
        </div>
      </header>
    );
  } else {
    hero = (
      <header className="jx-up-hero">
        <TopBar back="/haiba" />
        <Artwork src={BIRD("26-gift")} alt="" className="jx-up-bird" />
        <div className="jx-pad jx-up-text">
          <span className="jx-label" style={{ color: "var(--jx-ink)" }}>
            {s.t("upYear", { n: giftN })}
          </span>
          <h1 className="jx-h1" style={{ marginTop: 6 }}>
            {ready ? s.t("upReadyHero", { month }) : s.t("upTitle", { month })}
          </h1>
          {!ready && (
            <div style={{ marginTop: 12 }}>
              <Tag tone="dark" icon={<Clock size={14} aria-hidden="true" />}>
                {s.t("upChooseIn", { days: daysText(s.lang, daysLeft) })}
              </Tag>
            </div>
          )}
          {dots}
        </div>
      </header>
    );
  }

  return (
    <Screen tone="soft">
      {hero}

      {view === "lost" && (
        <div className="jx-pad" style={{ marginTop: 16 }}>
          <div className="jx-notice">
            <Artwork src={BIRD("25-empty-box")} alt="" className="jx-notice-bird" />
            <span className="jx-row-main">
              <span className="jx-row-title">
                {s.t("upLostTitle", { month: monthName(addDays(s.today, -31), s.lang) })}
              </span>
              <span className="jx-row-sub">{s.t("upLostSub", { next: month })}</span>
            </span>
          </div>
        </div>
      )}

      {used && (
        <section className="jx-coming">
          <div className="jx-pad jx-coming-head">
            <h2 className="jx-h3">{s.t("upComing", { month: nextMonth })}</h2>
            <span className="jx-row-sub">{s.t("upOpensOn", { date: s.d(next) })}</span>
          </div>
          <div className="jx-coming-row">
            {GIFTS.map((g) => (
              <div className="jx-coming-card" key={g.id}>
                <span className="jx-coming-art" style={{ background: CAT_BG[g.cat] }}>
                  <img src={g.img} alt="" />
                  <span className="jx-coming-logo">
                    <Logo brand={BRANDS[g.brand]!} size={24} />
                  </span>
                </span>
                <span className="jx-coming-brand">{BRANDS[g.brand]!.name}</span>
                <span className="jx-coming-item">{g.item}</span>
                <span className="jx-coming-worth">{s.t("upWorth", { amount: s.m(g.value) })}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {ready && (
        <div className="jx-pad" style={{ marginTop: 16 }}>
          <button className="jx-up-ready" onClick={() => go("/haiba/code?kind=gift")}>
            <span className="jx-up-done-art" style={{ background: CAT_BG[ready.cat] }}>
              <img src={ready.img} alt="" />
            </span>
            <span className="jx-row-main">
              <span className="jx-row-title">{s.t("upReadyTitle", { item: ready.item })}</span>
              <span className="jx-row-sub">
                {s.t("upReadySub", { brand: BRANDS[ready.brand]!.name })}
              </span>
            </span>
            <span className="jx-up-ready-cta">{s.t("upShowCode")}</span>
          </button>
        </div>
      )}

      {!used && (
        <div className="jx-chips jx-pad" style={{ marginTop: 18 }}>
          {cats.map((c) => (
            <button
              key={c}
              className={`jx-chip ${c === cat ? "on" : ""}`}
              onClick={() => setCat(c)}
            >
              {c === "All" ? s.t("upAll") : c}
            </button>
          ))}
        </div>
      )}

      {!used && (
        <div className="jx-pad">
          <div className="jx-gc-grid">
            {list.map((g) => (
              <GiftCard
                key={g.id}
                g={g}
                s={s}
                next={next}
                onPick={ready ? undefined : () => setSheet(g)}
              />
            ))}
          </div>
        </div>
      )}

      <Sheet open={!!sheet} onClose={() => setSheet(null)} label={s.t("upConfirmTitle", { month })}>
        {sheet && (
          <>
            <div className="jx-sh-art jx-sh-art-sm" style={{ background: CAT_BG[sheet.cat] }}>
              <img src={sheet.img} alt="" />
              <span className="jx-gc-logo">
                <Logo brand={BRANDS[sheet.brand]!} size={34} />
              </span>
            </div>
            <div>
              <span className="jx-row-sub">{BRANDS[sheet.brand]!.name}</span>
              <h2 className="jx-h2" style={{ marginTop: 2 }}>
                {sheet.item}
              </h2>
              <span style={{ marginTop: 8, display: "flex" }}>
                <PriceTag kind="worth">{s.t("upWorth", { amount: s.m(sheet.value) })}</PriceTag>
              </span>
            </div>
            <ul className="jx-facts jx-facts-quiet">
              <li>
                <MapPin size={18} aria-hidden="true" />
                <span>{sheet.where}</span>
              </li>
              {sheet.limit && (
                <li>
                  <Clock size={18} aria-hidden="true" />
                  <span>{sheet.limit}</span>
                </li>
              )}
            </ul>
            {/* 8 Nov: one rule only. How long the code lasts is on the code screen. */}
            <p className="jx-small jx-sh-rule">{s.t("upRuleOne")}</p>
            <Button
              variant="primary"
              onClick={() => {
                gp.pick(sheet.id);
                go("/haiba/code?kind=gift");
              }}
            >
              {s.t("upConfirmCta")}
            </Button>
            <Button variant="ghost" onClick={() => setSheet(null)}>
              {s.t("upNotNow")}
            </Button>
          </>
        )}
      </Sheet>
    </Screen>
  );
}

/* ---------- 6 · member offers (subscriptions) ---------- */

function SubMark({ p, size = 40 }: { p: Sub; size?: number }) {
  return <BrandMark brand={{ key: p.id, name: p.name, logo: p.logo, bg: "#FFFFFF" }} size={size} />;
}

export function Subscriptions() {
  const s = useSession();
  const go = useNavigate();
  const q = useQuery();
  const claimed = q["claimed"] === 1 || q["claimed"] === "1";
  return (
    <Screen tone="soft">
      <TopBar back="/haiba" />
      <div className="jx-pad">
        <h1 className="jx-h1">{s.t("subTitle")}</h1>
        <p className="jx-sub">{s.t("subSub")}</p>
      </div>
      <div className="jx-pad" style={{ marginTop: 20 }}>
        <div className="jx-stack" style={{ gap: 14 }}>
          {subsFor(claimed).map((p) => (
            <button
              key={p.id}
              className={`jx-oc ${p.claimed ? "jx-oc-off" : ""}`}
              onClick={() => go("/haiba/subscription?id=" + p.id + (p.claimed ? "&claimed=1" : ""))}
            >
              <span className="jx-oc-art" style={{ background: p.bg }}>
                <span className="jx-oc-brand">
                  <SubMark p={p} size={26} />
                  {p.name}
                </span>
                <img src={p.logo} alt="" className="jx-oc-logo" />
              </span>
              <span className="jx-oc-body">
                <span className="jx-row-main">
                  <span className="jx-label">{p.what}</span>
                  <span className="jx-oc-offer">{p.offer}</span>
                  <span className="jx-row-sub">{p.who}</span>
                </span>
                {p.claimed ? (
                  <Tag tone="soft">{s.t("subClaimed")}</Tag>
                ) : (
                  <span className="jx-oc-go">
                    <ArrowRight size={18} className="jx-flip" aria-hidden="true" />
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  );
}

export function Subscription() {
  const s = useSession();
  const q = useQuery();
  const claimed = q["claimed"] === 1 || q["claimed"] === "1";
  const list = subsFor(claimed);
  const p = list.find((x) => x.id === q["id"]) ?? list[0]!;
  const [shown, setShown] = useState(q["code"] === 1 || q["code"] === "1");
  return (
    <Screen
      tone="soft"
      dock={
        p.claimed && !shown ? (
          <Button variant="primary" disabled>
            {s.t("subClaimed")}
          </Button>
        ) : shown ? (
          <Button variant="primary" icon={<ExternalLink size={18} aria-hidden="true" />}>
            {s.t("subOpen", { name: p.name })}
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setShown(true)}>
            {s.t("subReveal")}
          </Button>
        )
      }
    >
      <header className="jx-od-hero" style={{ background: p.bg }}>
        <TopBar back="/haiba/subscriptions" />
        <img src={p.logo} alt="" className="jx-od-art jx-od-logo" />
      </header>
      <div className="jx-pad" style={{ marginTop: 18 }}>
        <span className="jx-oc-brand jx-oc-brand-plain">
          <SubMark p={p} size={28} />
          {p.name} · {p.what}
        </span>
        <h1 className="jx-h1" style={{ marginTop: 10 }}>
          {p.offer}
        </h1>
      </div>

      <div className="jx-pad" style={{ marginTop: 18 }}>
        {shown ? (
          <div className="jx-code-box jx-code-box-on">
            <span className="jx-code-val jx-num" dir="ltr">
              {p.code}
            </span>
            <span className="jx-code-copy">
              <Copy size={18} aria-hidden="true" />
            </span>
            <span className="jx-code-toast">
              <Check size={14} strokeWidth={3} aria-hidden="true" /> {s.t("subCopied")}
            </span>
          </div>
        ) : p.claimed ? (
          <div className="jx-code-box jx-code-box-off">
            <span className="jx-tag jx-tag-soft">{s.t("subClaimed")}</span>
            <span>{s.t("subClaimedBody")}</span>
          </div>
        ) : (
          <div className="jx-code-box">
            <Lock size={18} aria-hidden="true" />
            <span>{s.t("subLocked")}</span>
          </div>
        )}
        {shown && (
          <p className="jx-small" style={{ margin: "10px 2px 0" }}>
            {s.t("subCodeNote", { name: p.name })}
          </p>
        )}
      </div>

      <Group title={s.t("subHowTitle")}>
        <ol className="jx-howto jx-howto-light">
          {[s.t("subHow1"), s.t("subHow2", { name: p.name }), s.t("subHow3", { name: p.name })].map(
            (t, i) => (
              <li key={i} className={shown && i === 0 ? "done" : ""}>
                <span className="jx-howto-n">
                  {shown && i === 0 ? <Check size={14} strokeWidth={3} /> : i + 1}
                </span>
                <span>{t}</span>
              </li>
            ),
          )}
        </ol>
      </Group>

      {/* 8 Nov: one plain list, read top to bottom. Replaces the two column details and the repeated terms. */}
      <Group title={s.t("subGood")}>
        <ul className="jx-facts jx-facts-card">
          {[...p.terms, s.t("subPaysLine", { name: p.name })].map((t) => (
            <li key={t}>
              <Check size={18} strokeWidth={2.6} aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Group>
    </Screen>
  );
}

/* ---------- 7 · membership ---------- */

/**
 * The Haiba member card (8 Nov): a card shape with the feel of the earlier pass, but no bank card cues
 * (no number, chip or expiry). Brushed purple metal, lime wordmark, a turning guilloche rosette holding the
 * membership year, the name, and a holographic foil edge. It tilts with your finger and a light sweep crosses it.
 * It tilts with your finger, a slow light sweep crosses it, the rosette turns slowly, and the year fills in below.
 */
/** The country engraving along the bottom of the member card (Bahrain waterfront or Riyadh), drawn like a banknote. */
function CardArt({ c }: { c: "bh" | "sa" }) {
  return <img src={`/haiba/cards/${c}.webp`} alt="" className="jx-mx-land" />;
}

/**
 * 8 Nov: the one month tracker for all of Haiba (Unipass and the membership card).
 * A bar per month with its letter under it. on = done, now = this month (half filled), on now = done this month,
 * missed = a gift month that passed unused, end = where a cancelled year stops.
 * Colours come from the background it sits on (see .jx-mt in journey.css): ink on lime and yellow,
 * purple on white and lilac, lime on dark. Purple is never used on lime.
 */
function MonthTrack({
  from,
  lang,
  label,
  state,
}: {
  from: string;
  lang: string;
  label: string;
  state: (i: number) => string;
}) {
  return (
    <div className="jx-mt" role="img" aria-label={label}>
      {Array.from({ length: 12 }).map((_, i) => {
        const d = new Date(from);
        d.setMonth(d.getMonth() + i);
        return (
          <span key={i} className={state(i)} style={{ animationDelay: `${0.25 + i * 0.04}s` }}>
            <i />
            <small>
              {d.toLocaleDateString(lang === "ar" ? "ar" : "en-GB", { month: "narrow" })}
            </small>
          </span>
        );
      })}
    </div>
  );
}

/**
 * active: a normal month. ends: cancelled earlier in the year, it still runs to the end (only the pill changes).
 * cancelled and renewal: the last month of the year. Both look the same (card greyed out), only the pill differs:
 * "Ends 2 Dec" when you cancelled, "Renew soon" when you did not.
 */
type MemView = "active" | "ends" | "cancelled" | "renewal";

function MemberCard({ s, status }: { s: Session; status: MemView }) {
  const y = year(s);
  const ending = status === "cancelled" || status === "renewal";
  const m = ending
    ? 12
    : Math.min(
        12,
        Math.max(1, Math.round((startOf(s.today) - startOf(y.from)) / (86400000 * 30.4)) + 1),
      );
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 12, y: px * 16 });
  };
  const tag =
    status === "cancelled" || status === "ends"
      ? s.t("memEnds", { date: s.d(y.to) })
      : status === "renewal"
        ? s.t("memRenewSoon")
        : s.t("memActive");
  const since = new Date(y.from).toLocaleDateString(s.lang === "ar" ? "ar" : "en-GB", {
    month: "short",
    year: "numeric",
  });
  return (
    <div
      className={`jx-mx jx-mx-${status === "ends" ? "cancelled" : status}${ending ? " jx-mx-ending" : ""}`}
    >
      <span className="jx-mx-sparks" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <i key={i} />
        ))}
      </span>
      <div
        className="jx-mx-scene"
        onPointerMove={move}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <div
          className="jx-mx-card"
          style={
            {
              "--rx": `${tilt.x}deg`,
              "--ry": `${tilt.y}deg`,
              "--gx": `${50 + tilt.y * 2.8}%`,
              "--gy": `${40 - tilt.x * 3.2}%`,
            } as React.CSSProperties
          }
        >
          <span className="jx-mx-glare" aria-hidden="true" />
          <span className="jx-mx-sweep" aria-hidden="true" />
          <div className="jx-mx-head">
            <img src="/haiba/logo-lime.svg" alt="Haiba" className="jx-mx-logo" />
          </div>
          <span className="jx-mx-status">
            <i aria-hidden="true" />
            {tag}
          </span>
          <CardArt c={s.c === "sa" ? "sa" : "bh"} />
          <span className="jx-mx-mono" aria-hidden="true" />
          <span className="jx-mx-mono jx-mx-mono-glint" aria-hidden="true" />
          <div className="jx-mx-foot">
            <span className="jx-mx-name">{s.t("memCardName")}</span>
            <span className="jx-mx-since">{s.t("memSince", { date: since })}</span>
          </div>
          <span className="jx-mx-year1">
            <small>{s.t("memPassYear")}</small>1
          </span>
          <span className="jx-mx-foil" aria-hidden="true" />
        </div>
        <span className="jx-mx-shadow" aria-hidden="true" />
      </div>

      <div className="jx-mx-year">
        <div className="jx-mx-yearhead">
          <span>{s.t("memMonth", { n: m })}</span>
          <span>{s.t("memUntil", { date: s.d(y.to, { year: true }) })}</span>
        </div>
        <MonthTrack
          from={y.from}
          lang={s.lang}
          label={s.t("memMonth", { n: m })}
          state={(i) =>
            (i < m - 1 ? "on" : i === m - 1 ? "now" : "") +
            // A cancelled year still runs to the end: only the last month is marked as where it stops.
            ((status === "cancelled" || status === "ends") && i === 11 ? " end" : "")
          }
        />
      </div>
    </div>
  );
}

export function Membership() {
  const s = useSession();
  const go = useNavigate();
  const q = useQuery();
  const a = useJourneyActions();
  // The page follows the student's state (8 Nov); ?view= still previews a state on the canvas.
  const yr = year(s);
  const lastMonth = startOf(s.today) >= startOf(addMonths(yr.to, -1));
  const st = s.journey.status;
  const auto: MemView =
    st === "cancelled"
      ? lastMonth
        ? "cancelled"
        : "ends"
      : st === "renewal_due" || lastMonth
        ? "renewal"
        : "active";
  const view = (q["view"] != null ? String(q["view"]) : auto) as MemView;
  const ending = view === "cancelled" || view === "renewal";
  const cancelled = view === "cancelled" || view === "ends";
  const [sheet, setSheet] = useState(q["sheet"] === "cancel");
  const y = year(s);
  const gifts = ending ? 12 : 2;
  return (
    <Screen tone="soft" className="jx-mem-page">
      <div className="jx-mx-stage">
        <TopBar back="/haiba" title={s.t("memTitle")} onDark />
        <MemberCard s={s} status={view} />
      </div>

      {/* 8 Nov: the last month looks the same whether you cancelled or not: your year is ending, renew to keep it. */}
      {ending && (
        <div className="jx-pad" style={{ marginTop: 14 }}>
          <div className="jx-panel jx-panel-dark">
            <span className="jx-small" style={{ color: "#CFC9E0" }}>
              {s.t("memEndingLabel")}
            </span>
            <span className="jx-panel-big">{s.t("memRenewSaved", { amount: s.m(27.4) })}</span>
            <span className="jx-small" style={{ color: "#CFC9E0" }}>
              {s.t(view === "cancelled" ? "memEndingSubCancelled" : "memEndingSub", {
                date: s.d(y.to, { year: true }),
              })}
            </span>
            {s.student === "verified" ? (
              <>
                <Button variant="lime" onClick={() => a.startPayment("renew")}>
                  {s.t("memRenewCta", { amount: s.m(s.renewTotal) })}
                </Button>
                <span className="jx-small jx-center-text" style={{ color: "#CFC9E0" }}>
                  {s.t("memRenewPrice")}
                </span>
              </>
            ) : (
              <div className="jx-panel-warn-in">
                <span className="jx-row-title">{s.t("stuRenewPanel")}</span>
                <span className="jx-row-sub">
                  {s.t("stuRenewPanelSub", { date: s.d(y.to, { year: true }) })}
                </span>
                <Button variant="lime" onClick={() => go("/haiba/student?for=renew")}>
                  {s.t(s.student === "expired" ? "stuCtaExpired" : "stuCtaUnverified")}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <section className="jx-group">
        <div className="jx-group-head">
          <span>{s.t("memBenefits")}</span>
        </div>
        <div className="jx-ben-rail">
          <button className="jx-ben" onClick={() => go("/haiba/unipass")}>
            <img src={ICON.unipass} alt="" />
            <span className="jx-ben-title">{s.t("memBGift")}</span>
            <span className="jx-row-sub">{s.t("memBGiftSub", { n: gifts })}</span>
          </button>
          <button className="jx-ben" onClick={() => go("/haiba/rewards")}>
            <img src={ICON.points} alt="" />
            <span className="jx-ben-title">{s.t("memBPoints")}</span>
            <span className="jx-row-sub jx-num">
              {s.t("memBPointsSub", { n: POINTS.toLocaleString("en-US") })}
            </span>
          </button>
          <button className="jx-ben" onClick={() => go("/haiba/subscriptions")}>
            <SubLogos size={30} />
            <span className="jx-ben-title">{s.t("memBOffers")}</span>
            <span className="jx-row-sub">{s.t("memBOffersSub", { n: SUBS.length })}</span>
          </button>
        </div>
      </section>

      <Group title={s.t("memPlanTitle")}>
        <div className="jx-kv">
          <span>{s.t("memPlan")}</span>
          <b className="jx-num">{s.m(s.total)}</b>
        </div>
        <div className="jx-kv">
          <span>{s.t("memStarted")}</span>
          <b>{s.d(y.from, { year: true })}</b>
        </div>
        <div className="jx-kv">
          <span>{cancelled ? s.t("memEnds", { date: "" }).trim() : s.t("memRenews")}</span>
          <b>{s.d(y.to, { year: true })}</b>
        </div>
      </Group>

      <Group>
        <LinkRow
          icon={<CreditCard size={18} />}
          title={cardText(s)}
          sub={s.t("memCard")}
          onClick={() => go("/haiba/tap?for=card")}
          end={<span className="jx-li-link">{s.t("memUpdateCard")}</span>}
        />
        <LinkRow
          icon={<FileText size={18} />}
          title={s.t("memReceipts")}
          onClick={() => go("/haiba/receipts")}
        />
        <LinkRow
          icon={<MessageCircle size={18} />}
          title={s.t("memHelp")}
          onClick={() => go("/haiba/help")}
        />
      </Group>

      <Group title={s.t("memRulesTitle")}>
        <div className="jx-rules">
          {(["memRuleRefund", "memRulePoints", "memRuleRenew"] as const).map((k) => (
            <p key={k}>{s.t(k)}</p>
          ))}
        </div>
      </Group>

      {/* Cancelling never ends the year early. Once cancelled, the same spot lets you take it back. */}
      {view === "ends" ? (
        <div className="jx-pad jx-center-text" style={{ marginTop: 18 }}>
          <p className="jx-small" style={{ margin: "0 0 6px" }}>
            {s.t("memEndsNote", { date: s.d(y.to, { year: true }) })}
          </p>
          <button className="jx-mem-keep" onClick={a.keepMembership}>
            {s.t("memUndo")}
          </button>
        </div>
      ) : (
        view !== "cancelled" && (
          <div className="jx-pad" style={{ marginTop: 18 }}>
            <button className="jx-text-danger" onClick={() => setSheet(true)}>
              {s.t("memCancel")}
            </button>
          </div>
        )
      )}

      <Sheet open={sheet} onClose={() => setSheet(false)} label={s.t("memCancelTitle")}>
        <Artwork src={BIRD("24-hug")} alt="" className="jx-sh-bird" />
        <h2 className="jx-h2" style={{ textAlign: "center" }}>
          {s.t("memCancelTitle")}
        </h2>
        <p className="jx-sub jx-center-text" style={{ marginTop: 0 }}>
          {s.t("memCancelBody", { date: s.d(y.to, { year: true }) })}
        </p>
        <div className="jx-lose">
          <div>
            <img src={ICON.unipass} alt="" />
            <b className="jx-num">10</b>
            <span>{s.t("memLoseGifts")}</span>
          </div>
          <div>
            <img src={ICON.points} alt="" />
            <b className="jx-num">{POINTS.toLocaleString("en-US")}</b>
            <span>{s.t("memLosePts")}</span>
          </div>
        </div>
        <p className="jx-small jx-center-text" style={{ margin: 0 }}>
          {s.t("memCancelNoRefund")}
        </p>
        <Button variant="primary" onClick={() => setSheet(false)}>
          {s.t("memCancelKeep")}
        </Button>
        <button
          className="jx-text-danger"
          onClick={() => {
            setSheet(false);
            a.cancelMembership();
          }}
        >
          {s.t("memCancelYes")}
        </button>
      </Sheet>
    </Screen>
  );
}

export function Receipts() {
  const s = useSession();
  const y = year(s);
  const items: [string, string, number][] = [
    [s.t("receiptYear"), y.from, s.rest],
    [s.t("receiptDeposit"), s.journey.depositPaidOn ?? addDays(s.launch, -20), s.deposit],
  ];
  return (
    <Screen tone="soft">
      <TopBar back="/haiba/membership" />
      <div className="jx-pad">
        <h1 className="jx-h1">{s.t("receiptsTitle")}</h1>
        <p className="jx-sub">{s.t("receiptsSub")}</p>
      </div>
      <Group title={y.from.slice(0, 4)}>
        {items.map(([name, date, amount]) => (
          <div className="jx-rc" key={name}>
            <span className="jx-li-icon">
              <Receipt size={18} aria-hidden="true" />
            </span>
            <span className="jx-row-main">
              <span className="jx-row-title">{name}</span>
              <span className="jx-row-sub">
                {s.d(date, { year: true })} · {cardText(s)}
              </span>
            </span>
            <span className="jx-rc-amt jx-num">{s.m(amount)}</span>
            <button className="jx-rc-dl" aria-label={s.t("receiptDownload")}>
              <Download size={18} aria-hidden="true" />
            </button>
          </div>
        ))}
      </Group>
    </Screen>
  );
}

export function Ended() {
  const s = useSession();
  const a = useJourneyActions();
  const away = useGuard("ended");
  if (away) return away;
  const y = year(s);
  const until = addDays(y.to, 30);
  const daysKept = Math.max(1, Math.round((startOf(until) - startOf(s.today)) / 86400000));
  return (
    <Screen
      dock={
        <Button variant="primary" onClick={() => a.startPayment("join")}>
          {s.t("endedCta", { amount: s.m(s.total) })}
        </Button>
      }
    >
      <Result tone="lilac" bird="motion/bye" back="/">
        <h1 className="jx-h1 jx-res-title">{s.t("endedTitle")}</h1>
        <p className="jx-sub">{s.t("endedSubShort", { date: s.d(y.to, { year: true }) })}</p>
        <div className="jx-back-card">
          <span className="jx-back-coin">
            <Coins size={22} aria-hidden="true" />
          </span>
          <span className="jx-row-main">
            <span className="jx-row-title jx-num">
              {s.t("endedKept", { n: POINTS.toLocaleString("en-US") })}
            </span>
            <span className="jx-row-sub">
              {s.t("endedKeptUntil", { date: s.d(until, { year: true }) })}
            </span>
          </span>
          <Tag tone="warn">{daysText(s.lang, daysKept)}</Tag>
        </div>
        <span className="jx-label" style={{ marginTop: 22, display: "block" }}>
          {s.t("endedBack")}
        </span>
        <ul className="jx-facts" style={{ marginTop: 10 }}>
          <li>
            <img src={ICON.unipass} alt="" />
            <span>{s.t("benefitGifts")}</span>
          </li>
          <li>
            <img src={ICON.points} alt="" />
            <span>{s.t("benefitPoints")}</span>
          </li>
          <li>
            <SubLogos size={22} />
            <span>{s.t("memBOffers")}</span>
          </li>
        </ul>
      </Result>
    </Screen>
  );
}

/* ---------- 8 · savings ---------- */

/**
 * 8 Nov: one page for everything money and points (opens from the hub's You saved card, Activity See all and Help).
 * Top: what you saved (Unipal offers plus Haiba on top) and how much of the price Haiba has paid back.
 * Then your points, then one list of every visit, reward, gift and code with the money saved and points together.
 */
export function Saved({ focus }: { focus?: "activity" } = {}) {
  const s = useSession();
  const [f, setF] = useState<"all" | "saved" | "earned" | "spent">("all");
  useEffect(() => {
    if (focus !== "activity") return;
    const t = window.setTimeout(
      () => document.getElementById("activity")?.scrollIntoView({ block: "start" }),
      120,
    );
    return () => window.clearTimeout(t);
  }, [focus]);
  const y = year(s);
  const gp = useGift(s.today);
  const unipal = 19.7;
  const parts: [string, number][] = [
    [s.t("savedRewards"), 2.45],
    [s.t("savedGifts"), 2.85 + gp.saved],
    [s.t("savedSubs"), 2.4],
  ];
  const haiba = parts.reduce((t, r) => t + r[1], 0);
  const total = unipal + haiba;
  const back = Math.min(1, haiba / s.total);
  const filters: [typeof f, string][] = [
    ["all", s.t("actAll")],
    ["saved", s.t("actFilterSaved")],
    ["earned", s.t("actFilterEarned")],
    ["spent", s.t("actFilterSpent")],
  ];
  const keep = (it: (typeof ACTIVITY)[number]["items"][number]) =>
    f === "all" ||
    (f === "saved" && (it.money ?? 0) > 0) ||
    (f === "earned" && (it.pts ?? 0) > 0) ||
    (f === "spent" && (it.pts ?? 0) < 0);
  return (
    <Screen tone="soft">
      <header className="jx-sv-hero">
        <TopBar back="/haiba" title={s.t("moneyTitle")} />
        <Artwork src={BIRD("27-coin")} alt="" className="jx-sv-bird" />
        <div className="jx-pad jx-up-text">
          <span className="jx-label" style={{ color: "var(--jx-ink)" }}>
            {s.t("savedTitle")}
          </span>
          <span className="jx-sv-num jx-num">{s.m(total)}</span>
          <span className="jx-small" style={{ color: "#3B3650" }}>
            {s.t("savedHero", { date: s.d(y.from, { year: true }) })}
          </span>
          <span className="jx-split" aria-hidden="true">
            <span style={{ width: `${(unipal / total) * 100}%` }} />
            <span style={{ width: `${(haiba / total) * 100}%` }} />
          </span>
          <div className="jx-ledger">
            <div>
              <i className="k1" />
              <span>{s.t("savedSplitUnipal")}</span>
              <b className="jx-num">{s.m(unipal)}</b>
            </div>
            <div>
              <i className="k2" />
              <span>{s.t("savedSplitHaiba")}</span>
              <b className="jx-num">{s.m(haiba)}</b>
            </div>
            <p className="jx-ledger-parts">{parts.map(([l, v]) => `${l} ${s.m(v)}`).join(" · ")}</p>
          </div>
        </div>
      </header>

      <div className="jx-pad jx-money-cards">
        <div className="jx-payback">
          <span className="jx-tk-time-row">
            <span className="jx-row-title">{s.t("savedPayback")}</span>
            <b className="jx-num">{Math.round(back * 100)}%</b>
          </span>
          <span className="jx-bar jx-bar-lime">
            <span style={{ width: `${back * 100}%` }} />
          </span>
          <span className="jx-row-sub">
            {s.t("savedPaybackSub", { amount: s.m(haiba), price: s.m(s.total) })}
          </span>
        </div>
        <div className="jx-pts-sum">
          <div>
            <span className="jx-row-sub">{s.t("actBalance")}</span>
            <b className="jx-num">{POINTS.toLocaleString("en-US")}</b>
          </div>
          <div>
            <span className="jx-row-sub">{s.t("actEarnedLabel")}</span>
            <b className="jx-num jx-plus">+700</b>
          </div>
          <div>
            <span className="jx-row-sub">{s.t("actSpentLabel")}</span>
            <b className="jx-num">−300</b>
          </div>
        </div>
      </div>

      <section id="activity" className="jx-act-section">
        <div className="jx-pad">
          <h2 className="jx-h2">{s.t("activityTitle")}</h2>
          <div className="jx-seg" role="tablist" aria-label={s.t("activityTitle")}>
            {filters.map(([k, label]) => (
              <button
                key={k}
                role="tab"
                aria-selected={k === f}
                className={k === f ? "on" : ""}
                onClick={() => setF(k)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {activityWithGift(ACTIVITY, gp, s).map((g) => {
          const items = g.items.filter(keep);
          if (!items.length) return null;
          return (
            <Group key={g.day} title={g.day}>
              {items.map((it, i) => {
                const isLogo =
                  it.img &&
                  !it.img.includes("emoji") &&
                  !it.img.includes("/icons/") &&
                  !it.img.includes("/coins/");
                return (
                  <div className="jx-act" key={i}>
                    <span className="jx-act-av">
                      {it.img ? (
                        <img
                          src={it.img}
                          alt=""
                          className={isLogo ? "jx-act-logo" : "jx-act-emoji"}
                        />
                      ) : (
                        <span className="jx-act-mark">{it.title.charAt(0)}</span>
                      )}
                    </span>
                    <span className="jx-row-main">
                      <span className="jx-row-title">{it.title}</span>
                      <span className="jx-row-sub">{it.sub}</span>
                    </span>
                    <span className="jx-act-end">
                      {it.money != null && (
                        <span className="jx-act-amt jx-num jx-act-saved">
                          {s.t("actSavedAmt", { amount: s.m(it.money) })}
                        </span>
                      )}
                      {it.pts != null && (
                        <span
                          className={`jx-act-pts jx-num ${it.pts > 0 ? "jx-act-plus" : ""} ${it.money == null ? "jx-act-only" : ""}`}
                        >
                          {(it.pts > 0 ? "+" : "−") +
                            Math.abs(it.pts).toLocaleString("en-US") +
                            " " +
                            s.t("ptsShort")}
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </Group>
          );
        })}
      </section>
    </Screen>
  );
}

/** 9 Nov: this month's gift, once the shop uses it, is the first line of Today. */
function activityWithGift(
  list: Activity[],
  gp: ReturnType<typeof useGift>,
  s: Session,
): Activity[] {
  if (gp.status !== "used" || !gp.gift || !list[0]) return list;
  const line: ActivityItem = {
    kind: "gift",
    title: s.t("actGiftTitle", { month: monthName(s.today, s.lang) }),
    sub: s.t("actGiftSub", { item: gp.gift.item, brand: BRANDS[gp.gift.brand]!.name }),
    money: gp.gift.value,
    img: gp.gift.img,
  };
  return [{ ...list[0], items: [line, ...list[0].items] }, ...list.slice(1)];
}

/* ---------- 9 · help ---------- */

const HOW_IMG = ["", ICON.unipass, ICON.points, E("drink"), ""];

export function Help() {
  const s = useSession();
  const go = useNavigate();
  const q = useQuery();
  const [open, setOpen] = useState<number>(q["open"] != null ? Number(q["open"]) : -1);
  return (
    <Screen tone="soft">
      <header className="jx-hp-hero">
        <TopBar back="/haiba" />
        <Artwork src={BIRD("04-peek")} alt="" className="jx-hp-bird" />
        <div className="jx-pad jx-up-text">
          <h1 className="jx-h1">{s.t("helpTitle")}</h1>
          <p className="jx-sub">{s.t("helpSub")}</p>
        </div>
      </header>

      {/* 8 Nov: Help is only help: how points and Haiba work, questions, chat. Your pages live in the hub menu. */}
      <Group title={s.t("helpPtsTitle")}>
        <ul className="jx-pts-rules">
          {(
            [
              ["500", "helpPts1", "helpPts1Sub"],
              ["40", "helpPts2", "helpPts2Sub"],
              ["2x", "helpPts3", "helpPts3Sub"],
              ["5x", "helpPts4", "helpPts4Sub"],
              ["coin", "helpPts5", "helpPts5Sub"],
              ["6m", "helpPts6", "helpPts6Sub"],
            ] as const
          ).map(([tag, t, sub]) => (
            <li key={t}>
              <span className="jx-pts-tag">
                {tag === "coin" ? <img src={ICON.points} alt="" /> : tag}
              </span>
              <span className="jx-row-main">
                <span className="jx-row-title">{s.t(t)}</span>
                <span className="jx-row-sub">{s.t(sub)}</span>
              </span>
            </li>
          ))}
        </ul>
      </Group>

      <Group title={s.t("helpHowTitle")}>
        <ol className="jx-how5">
          {(["helpHow1", "helpHow2", "helpHow3", "helpHow4", "helpHow5"] as const).map((k, i) => (
            <li key={k}>
              <span className="jx-how5-art">
                {i === 0 ? (
                  <HaibaMark size={30} />
                ) : HOW_IMG[i] ? (
                  <img src={HOW_IMG[i]} alt="" />
                ) : (
                  <span className="jx-how5-code" aria-hidden="true">
                    HB
                  </span>
                )}
                <span className="jx-how5-n">{i + 1}</span>
              </span>
              <span className="jx-row-title">{s.t(k)}</span>
            </li>
          ))}
        </ol>
      </Group>

      <Group title={s.t("helpFaqTitle")}>
        {FAQ.map((f, i) => (
          <div key={i} className={`jx-faq ${open === i ? "open" : ""}`}>
            <button
              className="jx-faq-q"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <span>{f.q}</span>
              <span className="jx-faq-ic">
                {open === i ? (
                  <Minus size={16} strokeWidth={2.6} />
                ) : (
                  <Plus size={16} strokeWidth={2.6} />
                )}
              </span>
            </button>
            {open === i && <p className="jx-faq-a">{f.a}</p>}
          </div>
        ))}
      </Group>

      <Group>
        <LinkRow
          icon={<MessageCircle size={18} />}
          title={s.t("helpChat")}
          sub={s.t("helpChatSub")}
          href={supportHref(s, "help")}
          end={<ArrowUpRight size={20} className="jx-li-chev" aria-hidden="true" />}
        />
      </Group>
    </Screen>
  );
}
