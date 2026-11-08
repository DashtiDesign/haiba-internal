import { Link } from "../nav";
import { useHaiba } from "../store";
import { useSession } from "../journey/session";

/**
 * A stand-in for the Unipal home screen, styled like the live app.
 * It is only here so testers start where students start, and find Haiba from the nav or the banner.
 */

const BLUE = "#001A9C";

/** Home banner art, three widths per format. The browser picks the smallest that fills the screen. */
const bannerSet = (r: "bh" | "sa", ext: "avif" | "webp") =>
  [640, 960, 1290].map((w) => `/haiba/banners/home-${r}-${w}.${ext} ${w}w`).join(", ");
// 24 x 14 blurred previews (about 250 bytes each), shown until the real image arrives.
const HOME_BANNER_LQIP = {
  bh: "data:image/webp;base64,UklGRvAAAABXRUJQVlA4IOQAAADQBQCdASoYAA4APrVWoUsnJSMhsAgA4BaJbACdMoMlsn/skv9iiAGOgAHASo1pE4YBQBK+qxQAAN+4vGtC4uJWPkIpguJuWMj8wcC3RygV7k3SINSMUSjXMgI4H/8bx9wQZbPss/xHZS2v7mTKmVEAiCsL/1q2/dx86e+jRHT0CjMS44MZjPrKBx1McNlX7P1GCCC2HT6SC1Ps+HXMTLM4RC8/BMzPnczdXqVH8BdlPudUnDMQwWyAPn9P+n/T/8f9b5zMB+4dOO0ApIzYAdIe2bxqDP936DL9lft0WBVz2JAAAAA=",
  sa: "data:image/webp;base64,UklGRuwAAABXRUJQVlA4IOAAAABQBQCdASoYAA4APrVQoUqnJSMhsAgA4BaJbACdMoFWAbyaV4HtsvT+mN/Jj6d3pqKGZkAA9Gp/VYN6m8otl+yYYtd98A2DLeu+7ENQidcTfkbsxMaFoVkA4C6qpIaZESVt3btzOqxQD6kHbz5gXcLMrE7p+l7//ttBv/8WGEnwf/N/XBYf//BYeCoovu1eb13P+QXIJYkkD2ZvXrE7RdLFs2FAzQ2vIOPEGbLu00cyiJ14LOeggmJlz2vHGDxfWACxjme4chMR5OaSXhMA4/+Gyrj9WSV2gQplBbU4eF5wAA==",
} as const;

const cats = [
  { label: "Cafes", bg: "#F1E7DC" },
  { label: "Restaurants", bg: "#FCE9D9" },
  { label: "Showroom", bg: "#E1ECF8" },
  { label: "Fitness", bg: "#E9E9EE" },
];

const popular = [
  {
    name: "The Coffee Bean & Tea Leaf",
    offer: "Upsize Your Drinks!",
    rating: "4.7",
    bg: "#4B2E83",
    to: "/shop/coffee-bean",
  },
  { name: "Jasmi's", offer: "BD 2 per meal only!", rating: "4.5", bg: "#D62828", to: "" },
  { name: "Caribou Coffee", offer: "Free Upgrade!", rating: "4.7", bg: "#3B2A22", to: "" },
];

function NavIcon({ d, fill }: { d: string; fill?: boolean | undefined }) {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

export default function Home() {
  const { state } = useHaiba();
  const member = state.member !== "none";
  // The country comes straight from the app's link, so the right banner loads first time.
  const region = useSession().c;
  return (
    <div
      className="pg-home"
      style={{
        width: "100%",
        maxWidth: 390,
        margin: "0 auto",
        minHeight: "100vh",
        background: "#F8F8F8",
        fontFamily: "Figtree, system-ui, sans-serif",
        color: "#1A1A1A",
        position: "relative",
        overflow: "hidden",
        paddingBottom: 120,
      }}
    >
      <div style={{ background: BLUE, padding: "56px 16px 34px 16px", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ color: "#FFFFFF" }}>
            <div style={{ fontSize: 14, opacity: 0.8 }}>My Location</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>Bahrain</div>
          </div>
          <span
            style={{
              background: "#FFFFFF",
              borderRadius: 999,
              padding: "8px 14px",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Support
          </span>
        </div>
        <label
          htmlFor="home-search"
          style={{
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#FFFFFF",
            borderRadius: 999,
            padding: "0 16px",
            height: 46,
          }}
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            id="home-search"
            placeholder="Burgers"
            style={{
              border: 0,
              outline: "none",
              font: "inherit",
              fontSize: 16,
              width: "100%",
              background: "transparent",
            }}
          />
        </label>
        <svg
          aria-hidden="true"
          width="390"
          height="22"
          viewBox="0 0 390 22"
          preserveAspectRatio="none"
          style={{ position: "absolute", left: 0, bottom: -1, width: "100%", display: "block" }}
        >
          <path
            d="M0 0c20 14 40 14 60 4s40-10 60 2 40 12 60 0 40-12 60 2 40 12 60 0 40-10 60 2 30 10 30 6V22H0z"
            fill="#F8F8F8"
          />
        </svg>
      </div>

      <div
        className="hb-home-carousel"
        style={{ display: "flex", gap: 12, padding: "22px 16px 0 16px", overflow: "hidden" }}
      >
        {cats.map((c) => (
          <div
            key={c.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              flex: "none",
              width: 82,
            }}
          >
            <span style={{ width: 76, height: 76, borderRadius: 12, background: c.bg }} />
            <span style={{ fontSize: 14, fontWeight: 600 }}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* 8 Nov: edge to edge Haiba banner. The art is the Haiba card for the student's country (Bahrain
          waterfront or Riyadh) with the mascot bursting out; the words stay live text so they can change
          language and show a member line. Loads fast: AVIF (16 to 53 KB) or WebP by screen width, a 250 byte
          blurred preview shows instantly, and the box keeps its size so nothing jumps. */}
      <Link
        to="/haiba"
        className="hb-home-banner"
        style={{ backgroundImage: `url(${HOME_BANNER_LQIP[region]})`, marginTop: 26 }}
      >
        <picture>
          <source type="image/avif" srcSet={bannerSet(region, "avif")} sizes="100vw" />
          <source type="image/webp" srcSet={bannerSet(region, "webp")} sizes="100vw" />
          <img
            src={`/haiba/banners/home-${region}-960.webp`}
            width={1768}
            height={993}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <span className="hb-home-banner-text">
          <img src="/haiba/logo-lime.svg" alt="Haiba" className="hb-home-banner-logo" />
          <span className="hb-home-banner-title">
            {member ? "Your points are waiting" : "Free stuff, every month"}
          </span>
          <span className="hb-home-banner-cta">
            {member ? "Open Haiba" : "See Haiba"}
            <svg
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </span>
      </Link>

      <div style={{ padding: "26px 16px 0 16px", fontSize: 22, fontWeight: 700 }}>
        Popular this week
      </div>
      <div
        className="hb-home-carousel"
        style={{ display: "flex", gap: 14, padding: "14px 16px 0 16px", overflow: "hidden" }}
      >
        {popular.map((p) => {
          const inner = (
            <>
              <span
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 12,
                  boxSizing: "border-box",
                  width: 170,
                  height: 170,
                  borderRadius: 12,
                  background: p.bg,
                  color: "#FFFFFF",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                }}
              >
                [PHOTO]
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: 17,
                  fontWeight: 700,
                  marginTop: 10,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: 170,
                }}
              >
                {p.name}
              </span>
              <span style={{ display: "block", fontSize: 15, color: "#6B6B78", marginTop: 2 }}>
                {p.offer}
              </span>
            </>
          );
          return p.to ? (
            <Link
              key={p.name}
              to={p.to}
              style={{ textDecoration: "none", color: "#1A1A1A", flex: "none" }}
            >
              {inner}
            </Link>
          ) : (
            <div key={p.name} style={{ flex: "none" }}>
              {inner}
            </div>
          );
        })}
      </div>

      <div className="hb-fixed-bottom">
        <div className="hb-fixed-inner">
          {member ? (
            <Link
              to="/haiba"
              aria-label="Haiba"
              className="hb-press"
              style={{
                position: "absolute",
                right: 16,
                bottom: 96,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "#6C3FFA",
                border: "3px solid #FFFFFF",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 24px rgba(108,63,250,0.35)",
                textDecoration: "none",
              }}
            >
              <img
                src="/haiba/logo-lime.svg"
                alt=""
                style={{ width: 40, height: "auto", display: "block", transform: "rotate(-8deg)" }}
              />
            </Link>
          ) : null}
          <nav
            aria-label="Unipal"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              background: "#FFFFFF",
              borderTop: "1px solid #EEEEF2",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              padding: "10px 6px 26px 6px",
            }}
          >
            {[
              {
                label: "Home",
                to: "/",
                d: "M3 10.6L12 3l9 7.6V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
                on: true,
              },
              {
                label: "Map",
                to: "",
                d: "M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z",
              },
              { label: "Alerts", to: "", d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" },
              {
                label: "Profile",
                to: "",
                d: "M4 21c1.4-4.2 4.5-6.2 8-6.2s6.6 2 8 6.2M12 12.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4z",
              },
            ].map((t) => {
              const style = {
                textDecoration: "none",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                gap: 4,
                fontSize: 13,
                fontWeight: 500,
                color: t.on ? BLUE : "#4A4B52",
              };
              const body = (
                <>
                  <NavIcon d={t.d} />
                  {t.label}
                </>
              );
              return t.to ? (
                <Link key={t.label} to={t.to} style={style}>
                  {body}
                </Link>
              ) : (
                <span key={t.label} style={style}>
                  {body}
                </span>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
