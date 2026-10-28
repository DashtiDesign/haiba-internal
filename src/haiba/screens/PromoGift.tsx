// @ts-nocheck
// Ported 1:1 from the Design canvas board "PromoGift.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import haibaLogo from "@/assets/haiba/logo-purple.svg.asset.json";
import { useVals } from "../logic/promogift";

export default function PromoGift() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-promogift">
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          margin: "0 auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          background: "#F3F0FA",
          fontFamily: "Figtree, system-ui, sans-serif",
          color: "#1E1B2E",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            background: "#C0F402",
            padding: "14px 20px 70px 20px",
            overflow: "hidden",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-70px",
              top: "-50px",
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              border: "2px dashed rgba(31,38,0,0.18)",
            }}
          ></span>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              aria-label="Close"
              className="hb-press"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(31,38,0,0.15)",
                background: "rgba(255,255,255,0.5)",
                color: "#1F2600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
                cursor: "pointer",
              }}
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18"></path>
              </svg>
            </button>
            <Artwork
              priority
              src={haibaLogo.url}
              alt="Haiba"
              style={{ height: "24px", width: "auto", display: "block" }}
            />
            <span style={{ width: "44px" }}></span>
          </div>
          <h1
            className="hb-rise"
            style={{
              position: "relative",
              margin: "28px 0 0 0",
              fontSize: "38px",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.05",
              color: "#1F2600",
            }}
          >
            {"A free gift."}
            <br />
            {"Every month."}
          </h1>
          <div
            className="hb-rise hb-d1"
            style={{
              position: "relative",
              fontSize: "16px",
              fontWeight: "700",
              color: "#3D5000",
              marginTop: "12px",
              lineHeight: "1.45",
            }}
          >
            {"Pick your first one. It is on us."}
          </div>
        </div>
        <div style={{ position: "relative", marginTop: "-48px", padding: "0 16px 210px 16px" }}>
          <div
            className="hb-stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "10px",
            }}
          >
            {(v.gifts || []).map((g: any, idx0: number) => (
              <Fragment key={idx0}>
                <button
                  onClick={g.pick}
                  aria-pressed={g.selStr}
                  className="hb-press hb-ease"
                  style={{
                    position: "relative",
                    font: "inherit",
                    border: "0",
                    padding: "0",
                    cursor: "pointer",
                    textAlign: "left",
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: g.shadow,
                    color: "#1E1B2E",
                  }}
                >
                  <Artwork
                    src={g.logo}
                    alt={g.brand}
                    style={{
                      width: "100%",
                      height: "96px",
                      objectFit: "contain",
                      display: "block",
                      background: g.bg,
                    }}
                  />
                  <span style={{ display: "block", padding: "10px 12px 12px 12px" }}>
                    <span style={{ display: "block", fontSize: "15px", fontWeight: "800" }}>
                      {g.item}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#6B6880",
                        marginTop: "2px",
                      }}
                    >
                      {g.brand}
                    </span>
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      background: "#6C3FFA",
                      color: "#FFFFFF",
                      display: g.tick,
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 0 2px #FFFFFF",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "700",
              color: "#4A4660",
              marginTop: "14px",
            }}
          >
            {"Plus 6 more. A new pick every month."}
          </div>
          <div
            style={{
              marginTop: "22px",
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "4px 18px 4px 18px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6C3FFA",
                padding: "14px 0 0 0",
              }}
            >
              {"And that is not all"}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "44px minmax(0, 1fr) auto",
                gap: "12px",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: "1px solid #F1EFF7",
              }}
            >
              <span
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  display: "block",
                  boxShadow: "0 0 0 1px rgba(30,27,46,0.10)",
                }}
              >
                <Artwork
                  src="/haiba/brands/spotify.webp"
                  alt="Spotify Premium Student"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ fontSize: "16px", fontWeight: "700", lineHeight: "1.3" }}>
                  {"Spotify Premium Student"}
                </span>
                <span
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "500",
                    color: "#6B6880",
                    lineHeight: "1.35",
                  }}
                >
                  {"3 months free"}
                </span>
              </span>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "800",
                  textAlign: "right",
                  color: "#1E1B2E",
                }}
              >
                {"BHD 3.00"}
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "44px minmax(0, 1fr) auto",
                gap: "12px",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: "0",
              }}
            >
              <span
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  display: "block",
                  boxShadow: "0 0 0 1px rgba(30,27,46,0.10)",
                }}
              >
                <Artwork
                  src="/haiba/brands/chatgpt.webp"
                  alt="ChatGPT Go"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ fontSize: "16px", fontWeight: "700", lineHeight: "1.3" }}>
                  {"ChatGPT Go"}
                </span>
                <span
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "500",
                    color: "#6B6880",
                    lineHeight: "1.35",
                  }}
                >
                  {"3 months free"}
                </span>
              </span>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "800",
                  textAlign: "right",
                  color: "#1E1B2E",
                }}
              >
                {"BHD 9.00"}
              </span>
            </div>
          </div>
          <div
            style={{
              marginTop: "14px",
              border: "1.5px dashed #6C3FFA",
              background: "#F6F3FF",
              borderRadius: "16px",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <span style={{ position: "relative", width: "44px", height: "44px", flex: "none" }}>
              <Artwork
                src="/haiba/coins/coin-34.webp"
                alt=""
                style={{ width: "44px", height: "44px", objectFit: "contain", display: "block" }}
              />
              <span
                style={{
                  position: "absolute",
                  right: "-6px",
                  top: "-6px",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "#C0F402",
                  color: "#1F2600",
                  fontSize: "16px",
                  fontWeight: "800",
                  lineHeight: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 0 2px #FFFFFF",
                }}
              >
                {"+"}
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
                minWidth: "0",
                flex: "1",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#6C3FFA",
                }}
              >
                {"The cherry on top"}
              </span>
              <span
                style={{
                  fontSize: "17px",
                  fontWeight: "800",
                  lineHeight: "1.25",
                  color: "#1E1B2E",
                }}
              >
                {"+ Bonus points every visit"}
              </span>
              <span
                style={{
                  fontSize: "13.5px",
                  fontWeight: "500",
                  color: "#6B6880",
                  lineHeight: "1.4",
                }}
              >
                {"Spend them on free drinks, meals and popcorn."}
              </span>
            </span>
          </div>
          <div
            style={{
              position: "relative",
              marginTop: "16px",
              background: "#1E1B2E",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              className="hb-pop hb-d3"
              style={{
                position: "absolute",
                right: "14px",
                top: "-14px",
                background: "#C0F402",
                color: "#1F2600",
                fontSize: "15px",
                fontWeight: "800",
                borderRadius: "999px",
                padding: "7px 12px",
                transform: "rotate(6deg)",
                boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
              }}
            >
              {v.free}
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#B9B3CC",
                }}
              >
                {"Your Haiba year"}
              </span>
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                  color: "#C0F402",
                }}
              >
                {v.worth}
              </span>
            </span>
            <span
              style={{ fontSize: "15px", fontWeight: "700", color: "#E8E4F4", textAlign: "right" }}
            >
              {"for "}
              {v.price}
            </span>
          </div>
        </div>
        <div className="hb-fixed-bottom hb-cta-dock">
          <div className="hb-fixed-inner">
            <div
              style={{
                position: "absolute",
                left: "0",
                right: "0",
                bottom: "0",
                padding: "36px 16px calc(20px + env(safe-area-inset-bottom, 0px)) 16px",
                background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #F3F0FA 32%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "4px",
                zIndex: "5",
              }}
            >
              <button
                onClick={v.openSheet}
                className="hb-press"
                style={{
                  font: "inherit",
                  border: "0",
                  cursor: "pointer",
                  textAlign: "center",
                  background: "#1E1B2E",
                  borderRadius: "999px",
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  boxShadow: "0 10px 24px rgba(30,27,46,0.22)",
                }}
              >
                <span style={{ color: "#C0F402", fontSize: "17px", fontWeight: "800" }}>
                  {v.ctaTitle}
                </span>
                <span style={{ color: "#CFC9E0", fontSize: "13.5px", fontWeight: "500" }}>
                  {v.price}
                  {" a year \u00b7 only "}
                  {v.perMonth}
                  {" a month"}
                </span>
              </button>
              <a
                className="hb-press"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  color: "#1E1B2E",
                  fontSize: "16px",
                  fontWeight: "600",
                  padding: "10px 16px",
                }}
                href="#"
                onClick={(e: any) => e.preventDefault()}
              >
                {"Not now"}
              </a>
            </div>
          </div>
        </div>
        {v.sheet ? (
          <>
            <div
              className="hb-fade"
              style={{
                position: "fixed",
                inset: "0",
                background: "rgba(20,16,40,0.5)",
                zIndex: "60",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                className="hb-up"
                role="dialog"
                aria-label={v.sheetTitle}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: "#FFFFFF",
                  borderRadius: "16px 16px 0 0",
                  padding: "0 20px calc(26px + env(safe-area-inset-bottom, 0px)) 20px",
                  textAlign: "center",
                  maxWidth: "430px",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Artwork
                  src="/haiba/birds/17-coin-toss.webp"
                  alt=""
                  style={{ height: "170px", width: "auto", display: "block", marginTop: "-60px" }}
                />
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: "800",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.15",
                    marginTop: "4px",
                  }}
                >
                  {v.sheetTitle}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#4A4660",
                    lineHeight: "1.45",
                    marginTop: "10px",
                    maxWidth: "320px",
                  }}
                >
                  {v.sheetBody}
                </div>
                <div
                  style={{
                    marginTop: "14px",
                    background: "#F3F0FA",
                    color: "#4F25D6",
                    fontSize: "14px",
                    fontWeight: "700",
                    borderRadius: "999px",
                    padding: "8px 14px",
                  }}
                >
                  {v.sheetNote}
                </div>
                <button
                  onClick={v.closeSheet}
                  className="hb-press"
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    font: "inherit",
                    fontSize: "17px",
                    fontWeight: "800",
                    border: "0",
                    borderRadius: "999px",
                    padding: "17px",
                    cursor: "pointer",
                    background: "#1E1B2E",
                    color: "#C0F402",
                  }}
                >
                  {"Got it"}
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
