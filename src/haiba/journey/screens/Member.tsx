import { Elsewhere, NotStudent } from "./Edge";
import { useState, type ReactNode } from "react";
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
import { useNavigate } from "../../nav";
import { Button, LinkOut, Screen, Sheet, TopBar, supportHref } from "../ui";
import { Countdown, Pill, Rows, Section, Steps } from "../parts";
import { useSession, type Session } from "../session";
import { useJourneyActions } from "../actions";
import { addDays, addMonths, pct, startOf } from "../format";
import { daysText } from "../strings";
import {
  ACTIVITY,
  BRANDS,
  CAT_BG,
  E,
  GIFTS,
  SUBS,
  TOP_SAVED,
  type Brand,
  type Gift,
  type Sub,
} from "../data";
import { FAQ } from "../strings.member";

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
    borderRadius: Math.round(size * 0.3),
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

export function PayRest() {
  const s = useSession();
  const a = useJourneyActions();
  const [cancel, setCancel] = useState(false);
  const holdEndsMs = startOf(s.holdEnds) + 24 * 3600000;
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
      <header className="jx-dark-hero">
        <TopBar back="/" onDark />
        <Artwork src="/haiba/birds/02-jump.png" alt="" className="jx-hero-bird" />
        <div className="jx-hero-text">
          <h1 className="jx-h1">{s.t("payTitle")}</h1>
          <p className="jx-sub">{s.t("paySub", { price: s.m(s.price) })}</p>
        </div>
        <div className="jx-counter-label">{s.t("payHeld")}</div>
        <Countdown to={holdEndsMs} />
      </header>
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
        <Button variant="danger" onClick={() => setCancel(false)}>
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
  return (
    <Screen
      dock={
        <Button variant="primary" onClick={() => go("/haiba/join")}>
          {s.t("joinCta", { amount: s.m(s.total) })}
        </Button>
      }
    >
      <TopBar back="/" />
      <Center
        art={<Emoji src={E("hourglass")} size={130} />}
        title={s.t("expiredTitle")}
        body={s.t("expiredBody", { date: s.d(s.holdEnds), deposit: s.m(s.deposit) })}
      >
        <p className="jx-small" style={{ marginTop: 10 }}>
          {s.t("expiredJoin")}
        </p>
      </Center>
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
  const a = useJourneyActions();
  const go = useNavigate();
  if (s.student !== "verified") return <NotStudent action="join" />;
  if (s.elsewhere) return <Elsewhere />;
  return (
    <Screen
      dock={
        <>
          <Button variant="primary" onClick={() => a.startPayment("join")}>
            {s.t("joinCta", { amount: s.m(s.total) })}
          </Button>
          <p className="jx-dock-note">{s.t("payNoRefund")}</p>
        </>
      }
    >
      <header className="jx-hero">
        <div className="jx-hero-bar">
          <img src="/haiba/logo-purple.svg" alt={s.t("haiba")} className="jx-hero-logo" />
          <button className="jx-icon-btn" onClick={() => go("/")} aria-label={s.t("close")}>
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <img src="/haiba/birds/17-coin-toss.webp" alt="" className="jx-hero-art" />
        <div className="jx-hero-body">
          <h1 className="jx-h1">{s.t("joinTitle")}</h1>
          <p className="jx-sub" style={{ color: "#4a4560" }}>
            {s.t("joinSub")}
          </p>
        </div>
      </header>
      <Section>
        <div className="jx-benefits">
          {BENEFITS.map(([icon, title, sub]) => (
            <div className="jx-row" key={title}>
              <span className="jx-row-icon">{icon}</span>
              <span className="jx-row-main">
                <span className="jx-row-title">{s.t(title)}</span>
                <span className="jx-row-sub">{s.t(sub)}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <div className="jx-price">
          <span className="jx-label">{s.t("yourPrice")}</span>
          <div className="jx-price-big">
            <span className="jx-price-amount jx-num">{s.m(s.offerPrice)}</span>
            <span className="jx-price-per">{s.t("perYearPlusVat")}</span>
          </div>
          <Rows
            strongLast
            rows={[
              [s.t("priceRow"), s.m(s.offerPrice)],
              [s.t("vatRow", { rate: pct(s.vatRate) }), s.m(s.vat)],
              [s.t("totalRow"), s.m(s.total)],
            ]}
          />
        </div>
      </Section>
    </Screen>
  );
}

/* ---------- 3 · welcome ---------- */

export function Paid() {
  const s = useSession();
  const go = useNavigate();
  const y = year(s);
  return (
    <Screen
      tone="lilac"
      dock={
        <Button variant="primary" onClick={() => go("/haiba/welcome")}>
          {s.t("paidCta")}
        </Button>
      }
    >
      <TopBar back="/" />
      <Center
        art={<Emoji src={E("party")} size={140} />}
        title={s.t("paidTitle")}
        body={s.t("paidSub")}
      >
        <div className="jx-card" style={{ background: "#FFFFFF", marginTop: 18 }}>
          <Rows
            rows={[
              [s.t("paidAmount"), s.m(s.rest)],
              [
                s.t("paidStarts"),
                s.t("paidRange", { from: s.d(y.from), to: s.d(y.to, { year: true }) }),
              ],
              [s.t("memCard"), cardText(s)],
            ]}
          />
        </div>
        <p className="jx-small" style={{ marginTop: 10 }}>
          {s.t("paidReceipt")}
        </p>
      </Center>
    </Screen>
  );
}

/* ---------- shared bits for the member screens ---------- */

export const BIRD = (n: string) => `/haiba/birds/${n}.png`;
const POINTS = 1240;

/** Coloured top panel with the bird, then a white body that overlaps it. Used for every result state. */
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
  const state = String(q["state"] ?? "active");
  const it = CODE_ITEMS[kind];
  const brand = BRANDS[it.brand]!;
  const month = monthName(s.today, s.lang);
  const monthEnd = addDays(firstOfNext(s.today), -1);
  const back = kind === "gift" ? "/haiba/unipass" : "/haiba/rewards";

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
          bird={expired ? "05-shrug" : "16-torn"}
          back={back}
        >
          <Tag
            tone={expired ? "warn" : "purple"}
            icon={
              expired ? <Clock size={14} aria-hidden="true" /> : <X size={14} aria-hidden="true" />
            }
          >
            {expired ? s.t("resExpiredTag") : s.t("resCancelledTag")}
          </Tag>
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
    return (
      <Screen
        dock={
          <Button variant="primary" onClick={() => go("/haiba")}>
            {s.t("codeDone")}
          </Button>
        }
      >
        <Result tone="lime" bird="01-cheer" back="/haiba">
          <Tag tone="good" icon={<Check size={14} strokeWidth={3} aria-hidden="true" />}>
            {s.t("resUsedTag")}
          </Tag>
          <h1 className="jx-h1 jx-res-title">
            {s.t("codeUsedTitle", { item: it.item.toLowerCase() })}
          </h1>
          <div className="jx-saved-big">
            <span className="jx-small">{s.t("codeUsedSavedLabel")}</span>
            <span className="jx-saved-num jx-num">{s.m(it.value)}</span>
          </div>
          <ItemLine
            brand={brand}
            item={it.item}
            img={it.img}
            end={<Check size={22} color="#1E7A34" strokeWidth={3} aria-hidden="true" />}
          />
          <p className="jx-small jx-res-meta">
            {s.t("usedAt", { brand: brand.name + ", Seef", time: "4:12 pm" })}
          </p>
          <button className="jx-li jx-li-card" onClick={() => go("/haiba/saved")}>
            <span className="jx-li-icon">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <span className="jx-row-main">
              <span className="jx-row-sub">{s.t("usedTotal")}</span>
              <span className="jx-row-title jx-num">{s.m(7.7 + it.value)}</span>
            </span>
            <span className="jx-li-link">{s.t("seeAll")}</span>
          </button>
          {kind === "reward" && <p className="jx-small jx-res-meta">{s.t("codeRewardNote")}</p>}
        </Result>
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
        <Button variant="ghost" onClick={() => go(back + "?")}>
          {kind === "gift" ? s.t("codeCancelGift") : s.t("codeCancelReward")}
        </Button>
      </div>
    </Screen>
  );
}

const ACT_KIND = (it: { pts?: number; money?: number }) =>
  it.money != null ? "gift" : (it.pts ?? 0) < 0 ? "reward" : "points";

export function ActivityPage() {
  const s = useSession();
  const [f, setF] = useState<"all" | "points" | "reward" | "gift">("all");
  const filters: [typeof f, string][] = [
    ["all", s.t("actAll")],
    ["points", s.t("actPoints")],
    ["reward", s.t("actRewards")],
    ["gift", s.t("actGifts")],
  ];
  return (
    <Screen tone="soft">
      <TopBar back="/haiba" />
      <div className="jx-pad">
        <h1 className="jx-h1">{s.t("activityTitle")}</h1>
      </div>
      <div className="jx-pad" style={{ marginTop: 16 }}>
        <div className="jx-act-sum">
          <span className="jx-row-sub">{s.t("actBalance")}</span>
          <span className="jx-act-bal jx-num">
            {POINTS.toLocaleString("en-US")} <small>{s.t("ptsShort")}</small>
          </span>
          <span className="jx-act-split">
            <span>
              <span className="jx-dot jx-dot-good" />
              <b className="jx-num">+620</b> {s.t("actEarned")}
            </span>
            <span>
              <span className="jx-dot" />
              <b className="jx-num">−300</b> {s.t("actSpent")}
            </span>
            <span className="jx-faint">{s.t("actMonth")}</span>
          </span>
        </div>
      </div>
      <div className="jx-chips jx-pad" style={{ marginTop: 16 }}>
        {filters.map(([k, label]) => (
          <button key={k} className={`jx-chip ${k === f ? "on" : ""}`} onClick={() => setF(k)}>
            {label}
          </button>
        ))}
      </div>
      {ACTIVITY.map((g) => {
        const items = g.items.filter((it) => f === "all" || ACT_KIND(it) === f);
        if (!items.length) return null;
        return (
          <Group key={g.day} title={g.day}>
            {items.map((it, i) => {
              const k = ACT_KIND(it);
              const isLogo = it.img && !it.img.includes("emoji");
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
                    <span className={`jx-act-badge jx-act-badge-${k}`}>
                      {k === "gift" ? (
                        <GiftIcon size={11} strokeWidth={2.6} />
                      ) : k === "reward" ? (
                        <Sparkles size={11} strokeWidth={2.6} />
                      ) : (
                        <Coins size={11} strokeWidth={2.6} />
                      )}
                    </span>
                  </span>
                  <span className="jx-row-main">
                    <span className="jx-row-title">{it.title}</span>
                    <span className="jx-row-sub">{it.sub}</span>
                  </span>
                  <span className="jx-act-end">
                    {it.pts != null && (
                      <span className={`jx-act-amt jx-num ${it.pts > 0 ? "jx-act-plus" : ""}`}>
                        {(it.pts > 0 ? "+" : "−") + Math.abs(it.pts).toLocaleString("en-US")}
                      </span>
                    )}
                    {it.money != null && <span className="jx-act-amt jx-num">{s.m(it.money)}</span>}
                    <span className="jx-act-unit">
                      {it.money != null ? s.t("actSaved") : s.t("ptsShort")}
                    </span>
                  </span>
                </div>
              );
            })}
          </Group>
        );
      })}
    </Screen>
  );
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
  const view = String(q["view"] ?? "pick");
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
  const usedGift = GIFTS[0]!;
  const nextMonth = monthName(next, s.lang);

  const dots = (
    <div className="jx-months" aria-label={s.t("upYear", { n: giftN })}>
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className={i < giftN - 1 ? "on" : i === giftN - 1 ? (used ? "on" : "now") : ""}
        />
      ))}
    </div>
  );

  let hero: ReactNode;
  if (used) {
    hero = (
      <header className="jx-up-hero jx-up-hero-soft">
        <TopBar back="/haiba" />
        <div className="jx-pad">
          <span className="jx-label">{s.t("upYear", { n: giftN })}</span>
          <h1 className="jx-h1" style={{ marginTop: 6 }}>
            {s.t("upUsedTitle", { month })}
          </h1>
          <div className="jx-up-used">
            <span className="jx-gc-art jx-up-used-art" style={{ background: CAT_BG[usedGift.cat] }}>
              <img src={usedGift.img} alt="" />
            </span>
            <span className="jx-row-main">
              <span className="jx-row-sub">{BRANDS[usedGift.brand]!.name}</span>
              <span className="jx-row-title">{usedGift.item}</span>
              <span className="jx-row-sub">
                {s.t("upUsedOn", { date: s.d(addDays(s.today, -2)) })}
              </span>
            </span>
            <span className="jx-up-check">
              <Check size={18} strokeWidth={3} aria-hidden="true" />
            </span>
          </div>
          <div className="jx-up-next">
            <CalendarDays size={18} aria-hidden="true" />
            <span>
              <b>{s.t("upNextIn", { days: daysText(s.lang, daysLeft) })}</b> ·{" "}
              {s.t("upOpensOn", { date: s.d(next) })}
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
        <Artwork src={BIRD("10-gift")} alt="" className="jx-up-bird" />
        <div className="jx-pad jx-up-text">
          <span className="jx-label" style={{ color: "var(--jx-ink)" }}>
            {s.t("upYear", { n: giftN })}
          </span>
          <h1 className="jx-h1" style={{ marginTop: 6 }}>
            {s.t("upTitle", { month })}
          </h1>
          <div style={{ marginTop: 12 }}>
            <Tag tone="dark" icon={<Clock size={14} aria-hidden="true" />}>
              {s.t("upChooseIn", { days: daysText(s.lang, daysLeft) })}
            </Tag>
          </div>
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
            <Artwork src={BIRD("05-shrug")} alt="" className="jx-notice-bird" />
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
        <div className="jx-pad" style={{ marginTop: 22 }}>
          <h2 className="jx-h3">{s.t("upComing", { month: nextMonth })}</h2>
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

      <div className="jx-pad">
        <div className="jx-gc-grid">
          {list.map((g) => (
            <GiftCard
              key={g.id}
              g={g}
              s={s}
              next={next}
              onPick={used ? undefined : () => setSheet(g)}
              preview={used ? s.t("upOpensOn", { date: s.d(next) }) : undefined}
            />
          ))}
        </div>
      </div>

      <Sheet open={!!sheet} onClose={() => setSheet(null)} label={s.t("upConfirmTitle", { month })}>
        {sheet && (
          <>
            <div className="jx-sh-art" style={{ background: CAT_BG[sheet.cat] }}>
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
            <ul className="jx-facts">
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
              <li>
                <Lock size={18} aria-hidden="true" />
                <span>{s.t("upRuleOne")}</span>
              </li>
              <li>
                <RotateCcw size={18} aria-hidden="true" />
                <span>{s.t("upRuleCode")}</span>
              </li>
            </ul>
            <Button variant="primary" onClick={() => go("/haiba/code?kind=gift")}>
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
  return <BrandMark brand={{ key: p.id, name: p.name, mark: p.mark, bg: p.markBg }} size={size} />;
}

export function Subscriptions() {
  const s = useSession();
  const go = useNavigate();
  return (
    <Screen tone="soft">
      <TopBar back="/haiba" />
      <div className="jx-pad">
        <h1 className="jx-h1">{s.t("subTitle")}</h1>
        <p className="jx-sub">{s.t("subSub")}</p>
      </div>
      <div className="jx-pad" style={{ marginTop: 20 }}>
        <div className="jx-stack" style={{ gap: 14 }}>
          {SUBS.map((p) => (
            <button
              key={p.id}
              className={`jx-oc ${p.claimed ? "jx-oc-off" : ""}`}
              onClick={() => go("/haiba/subscription?id=" + p.id)}
            >
              <span className="jx-oc-art" style={{ background: p.bg }}>
                <span className="jx-oc-brand">
                  <SubMark p={p} size={26} />
                  {p.name}
                </span>
                <img src={p.img} alt="" />
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
  const p = SUBS.find((x) => x.id === q["id"]) ?? SUBS[0]!;
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
        <img src={p.img} alt="" className="jx-od-art" />
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
              HAIBA TB 7Q2X
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

      <Group title={s.t("subDetails")}>
        <div className="jx-kv">
          <span>{s.t("subWho")}</span>
          <b>{p.who}</b>
        </div>
        <div className="jx-kv">
          <span>{s.t("subUses")}</span>
          <b>{s.t("subOne")}</b>
        </div>
        <div className="jx-kv">
          <span>{s.t("subPays")}</span>
          <b>{s.t("subPaysWho", { name: p.name })}</b>
        </div>
      </Group>

      <Group title={s.t("subTerms")}>
        <ul className="jx-terms jx-terms-card">
          {p.terms.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Group>
    </Screen>
  );
}

/* ---------- 7 · membership ---------- */

function MemberCard({ s, status }: { s: Session; status: "active" | "cancelled" | "renewal" }) {
  const y = year(s);
  const m = Math.min(
    12,
    Math.max(1, Math.round((startOf(s.today) - startOf(y.from)) / (86400000 * 30.4)) + 1),
  );
  return (
    <div className={`jx-mc ${status === "cancelled" ? "jx-mc-off" : ""}`}>
      <Artwork src={BIRD("03-wink")} alt="" className="jx-mc-bird" />
      <div className="jx-mc-top">
        <span className="jx-mc-brand">Haiba</span>
        {status === "active" && <Tag tone="lime">{s.t("memActive")}</Tag>}
        {status === "cancelled" && <Tag tone="warn">{s.t("memEnds", { date: s.d(y.to) })}</Tag>}
        {status === "renewal" && (
          <Tag tone="lime">
            {s.t("memRenewIn", {
              days: daysText(
                s.lang,
                Math.max(1, Math.round((startOf(y.to) - startOf(s.today)) / 86400000)),
              ),
            })}
          </Tag>
        )}
      </div>
      <div className="jx-mc-mid">
        <span className="jx-mc-label">{s.t("memMember")}</span>
        <span className="jx-mc-since">
          {s.t("memSince", { date: s.d(y.from, { year: true }) })}
        </span>
      </div>
      <div className="jx-mc-foot">
        <span className="jx-mc-row">
          <span>{s.t("memMonth", { n: m })}</span>
          <span>{s.t("memUntil", { date: s.d(y.to, { year: true }) })}</span>
        </span>
        <span className="jx-bar jx-bar-on-dark">
          <span style={{ width: `${(m / 12) * 100}%` }} />
        </span>
      </div>
    </div>
  );
}

export function Membership() {
  const s = useSession();
  const go = useNavigate();
  const q = useQuery();
  const view = String(q["view"] ?? "active") as "active" | "cancelled" | "renewal";
  const [sheet, setSheet] = useState(q["sheet"] === "cancel");
  const y = year(s);
  const gifts = view === "renewal" ? 12 : 2;
  return (
    <Screen tone="soft">
      <TopBar back="/haiba" title={s.t("memTitle")} />
      <div className="jx-pad">
        <MemberCard s={s} status={view} />
      </div>

      {view === "cancelled" && (
        <div className="jx-pad" style={{ marginTop: 14 }}>
          <div className="jx-panel jx-panel-warn">
            <span className="jx-row-title">
              {s.t("memCancelledTitle", { date: s.d(y.to, { year: true }) })}
            </span>
            <span className="jx-row-sub">{s.t("memCancelledSub")}</span>
            <Button variant="primary">{s.t("memUndo")}</Button>
          </div>
        </div>
      )}

      {view === "renewal" && (
        <div className="jx-pad" style={{ marginTop: 14 }}>
          <div className="jx-panel jx-panel-dark">
            <span className="jx-small" style={{ color: "#CFC9E0" }}>
              {s.t("memRenewTitle", { date: s.d(y.to, { year: true }) })}
            </span>
            <span className="jx-panel-big">{s.t("memRenewSaved", { amount: s.m(27.4) })}</span>
            {s.student === "verified" ? (
              <>
                <Button variant="lime">{s.t("memRenewCta", { amount: s.m(s.renewTotal) })}</Button>
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
            <img src={E("gift")} alt="" />
            <span className="jx-ben-title">{s.t("memBGift")}</span>
            <span className="jx-row-sub">{s.t("memBGiftSub", { n: gifts })}</span>
          </button>
          <button className="jx-ben" onClick={() => go("/haiba/rewards")}>
            <img src={E("sparkles")} alt="" />
            <span className="jx-ben-title">{s.t("memBPoints")}</span>
            <span className="jx-row-sub jx-num">
              {s.t("memBPointsSub", { n: POINTS.toLocaleString("en-US") })}
            </span>
          </button>
          <button className="jx-ben" onClick={() => go("/haiba/subscriptions")}>
            <img src={E("ticket")} alt="" />
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
          <span>
            {view === "cancelled" ? s.t("memEnds", { date: "" }).trim() : s.t("memRenews")}
          </span>
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

      {view !== "cancelled" && (
        <div className="jx-pad" style={{ marginTop: 18 }}>
          <button className="jx-text-danger" onClick={() => setSheet(true)}>
            {s.t("memCancel")}
          </button>
        </div>
      )}

      <Sheet open={sheet} onClose={() => setSheet(false)} label={s.t("memCancelTitle")}>
        <Artwork src={BIRD("05-shrug")} alt="" className="jx-sh-bird" />
        <h2 className="jx-h2" style={{ textAlign: "center" }}>
          {s.t("memCancelTitle")}
        </h2>
        <p className="jx-sub jx-center-text" style={{ marginTop: 0 }}>
          {s.t("memCancelBody", { date: s.d(y.to, { year: true }) })}
        </p>
        <div className="jx-lose">
          <div>
            <img src={E("gift")} alt="" />
            <b className="jx-num">10</b>
            <span>{s.t("memLoseGifts")}</span>
          </div>
          <div>
            <img src={E("sparkles")} alt="" />
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
        <button className="jx-text-danger" onClick={() => go("/haiba/membership?view=cancelled")}>
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
  const y = year(s);
  const until = addDays(y.to, 30);
  const daysKept = Math.max(1, Math.round((startOf(until) - startOf(s.today)) / 86400000));
  return (
    <Screen
      dock={
        <Button variant="primary" onClick={() => undefined}>
          {s.t("endedCta", { amount: s.m(s.total) })}
        </Button>
      }
    >
      <Result tone="lilac" bird="05-shrug" back="/">
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
            <img src={E("gift")} alt="" />
            <span>{s.t("benefitGifts")}</span>
          </li>
          <li>
            <img src={E("sparkles")} alt="" />
            <span>{s.t("benefitPoints")}</span>
          </li>
          <li>
            <img src={E("ticket")} alt="" />
            <span>{s.t("memBOffers")}</span>
          </li>
        </ul>
      </Result>
    </Screen>
  );
}

/* ---------- 8 · savings ---------- */

export function Saved() {
  const s = useSession();
  const y = year(s);
  const unipal = 19.7;
  const rows: [string, number, string, string][] = [
    [s.t("savedRewards"), 3.2, E("sparkles"), s.t("savedN_rewards", { n: 4 })],
    [s.t("savedGifts"), 2.85, E("gift"), s.t("savedN_gifts", { n: 2 })],
    [s.t("savedSubs"), 1.65, E("ticket"), s.t("savedN_offers", { n: 1 })],
  ];
  const haiba = rows.reduce((t, r) => t + r[1], 0);
  const total = unipal + haiba;
  const back = Math.min(1, haiba / s.total);
  return (
    <Screen tone="soft">
      <header className="jx-sv-hero">
        <TopBar back="/haiba" />
        <Artwork src={BIRD("06-coin")} alt="" className="jx-sv-bird" />
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
          <span className="jx-split-key">
            <span>
              <i className="k1" /> {s.t("savedSplitUnipal")} <b className="jx-num">{s.m(unipal)}</b>
            </span>
            <span>
              <i className="k2" /> {s.t("savedSplitHaiba")} <b className="jx-num">{s.m(haiba)}</b>
            </span>
          </span>
        </div>
      </header>

      <div className="jx-pad" style={{ marginTop: 16 }}>
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
          <span className="jx-row-sub">
            {s.t("savedToGo", { amount: s.m(Math.max(0, s.total - haiba)) })}
          </span>
        </div>
      </div>

      <Group title={s.t("savedHaiba")}>
        {rows.map(([label, v, img, sub]) => (
          <div className="jx-act" key={label}>
            <span className="jx-act-av">
              <img src={img} alt="" className="jx-act-emoji" />
            </span>
            <span className="jx-row-main">
              <span className="jx-row-title">{label}</span>
              <span className="jx-row-sub">{sub}</span>
            </span>
            <span className="jx-act-amt jx-num">{s.m(v)}</span>
          </div>
        ))}
      </Group>

      <Group title={s.t("savedTop")}>
        {TOP_SAVED.map((t) => {
          const b = BRANDS[t.brand]!;
          return (
            <div className="jx-act" key={t.brand}>
              <span className="jx-act-av jx-act-av-plain">
                <Logo brand={b} size={44} />
              </span>
              <span className="jx-row-main">
                <span className="jx-row-title">{b.name}</span>
                <span className="jx-row-sub">{s.t("savedVisits", { n: t.visits })}</span>
              </span>
              <span className="jx-act-amt jx-num">{s.m(t.amount)}</span>
            </div>
          );
        })}
      </Group>
    </Screen>
  );
}

/* ---------- 9 · help ---------- */

const HOW_IMG = ["card", "gift", "sparkles", "drink", "ticket"];

export function Help() {
  const s = useSession();
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

      <Group title={s.t("helpHowTitle")}>
        <ol className="jx-how5">
          {(["helpHow1", "helpHow2", "helpHow3", "helpHow4", "helpHow5"] as const).map((k, i) => (
            <li key={k}>
              <span className="jx-how5-art">
                <img src={E(HOW_IMG[i]!)} alt="" />
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
