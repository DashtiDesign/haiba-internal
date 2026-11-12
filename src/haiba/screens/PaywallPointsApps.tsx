// @ts-nocheck
// Ported 1:1 from the Design canvas board "PaywallPointsApps.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/paywallpointsapps";

export default function PaywallPointsApps() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-paywallpointsapps">
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          margin: "0 auto",
          minHeight: "100svh",
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
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            height: "520px",
            background: "linear-gradient(180deg, #E4D9FF 0%, #F3EEFF 55%, #F3F0FA 100%)",
          }}
        ></div>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "14px 16px 200px 16px",
          }}
        >
          <div
            className="hb-rise"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "48px",
            }}
          >
            <button
              onClick={v.openExit}
              aria-label="Close"
              className="hb-press"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "0",
                background: "rgba(255,255,255,0.85)",
                color: "#1E1B2E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
                cursor: "pointer",
                boxShadow: "0 0 0 1px #ECE8F5",
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
            <span style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.01em" }}>
              {"Haiba membership"}
            </span>
            <span style={{ width: "44px" }}></span>
          </div>
          <div
            className="hb-rise"
            style={{
              marginTop: "14px",
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "18px 16px",
              boxShadow: "0 10px 26px rgba(76,52,140,0.08)",
              padding: "18px 20px 22px 20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              className="hb-bob"
              style={{ display: "flex", gap: "12px", padding: "6px 0 4px 0" }}
            >
              <Artwork
                priority
                className="hb-pop"
                src={v.p1Logo}
                alt=""
                style={{
                  width: "88px",
                  height: "88px",
                  borderRadius: "22px",
                  objectFit: "cover",
                  display: "block",
                  boxShadow: "0 10px 22px rgba(30,27,46,0.16)",
                }}
              />
              <Artwork
                className="hb-pop hb-d1"
                src={v.p2Logo}
                alt=""
                style={{
                  width: "88px",
                  height: "88px",
                  borderRadius: "22px",
                  objectFit: "cover",
                  display: "block",
                  boxShadow: "0 0 0 1px #ECE8F5, 0 10px 22px rgba(30,27,46,0.16)",
                }}
              />
            </span>
            <div
              className="hb-rise hb-d1"
              style={{
                marginTop: "8px",
                fontSize: "30px",
                fontWeight: "900",
                letterSpacing: "-0.035em",
                lineHeight: "1.08",
              }}
            >
              <span style={{ color: "#6C3FFA" }}>{v.p1Name}</span>
              {" and "}
              <span style={{ color: "#6C3FFA" }}>{v.p2Name}</span>
              {", free"}
            </div>
            <div
              className="hb-rise hb-d2"
              style={{
                marginTop: "8px",
                maxWidth: "300px",
                fontSize: "15.5px",
                fontWeight: "600",
                color: "#514A65",
                lineHeight: "1.4",
              }}
            >
              {"Both apps free for 3 months. Then you choose to keep them or stop."}
            </div>
          </div>
          <div
            className="hb-rise"
            style={{
              marginTop: "14px",
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "18px 16px",
              boxShadow: "0 10px 26px rgba(76,52,140,0.08)",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "900", letterSpacing: "-0.02em" }}>
              {"How it works"}
            </div>
            <div
              className="hb-stagger"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) 16px minmax(0, 1fr) 16px minmax(0, 1fr)",
                marginTop: "12px",
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  textAlign: "center",
                  minWidth: "0",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    width: "92px",
                    height: "92px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Artwork
                    src="/haiba/promo/phone-coupon.webp"
                    alt=""
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "0px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </span>
                <span style={{ fontSize: "14px", fontWeight: "800", lineHeight: "1.25" }}>
                  {"Get your code"}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="hb-nudge"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "38px",
                  color: "#8B66FF",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6l6 6-6 6"></path>
                </svg>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  textAlign: "center",
                  minWidth: "0",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    width: "92px",
                    height: "92px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Artwork
                    src={v.p1Logo}
                    alt=""
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "20px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </span>
                <span style={{ fontSize: "14px", fontWeight: "800", lineHeight: "1.25" }}>
                  {"Use it in the app"}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="hb-nudge"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "38px",
                  color: "#8B66FF",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6l6 6-6 6"></path>
                </svg>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  textAlign: "center",
                  minWidth: "0",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    width: "92px",
                    height: "92px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Artwork
                    src="/haiba/emoji/calendar.webp"
                    alt=""
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "0px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </span>
                <span style={{ fontSize: "14px", fontWeight: "800", lineHeight: "1.25" }}>
                  {"3 months free"}
                </span>
              </span>
            </div>
          </div>
          <div
            className="hb-rise"
            style={{
              marginTop: "14px",
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "18px 16px",
              boxShadow: "0 10px 26px rgba(76,52,140,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Artwork
                className="hb-bob"
                src="/haiba/promo/pile.webp"
                alt=""
                style={{
                  width: "56px",
                  height: "56px",
                  objectFit: "contain",
                  display: "block",
                  flex: "none",
                }}
              />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "20px", fontWeight: "900", letterSpacing: "-0.02em" }}>
                  {"Plus "}
                  {v.welcomeTxt}
                  {" points"}
                </span>
                <span
                  style={{
                    fontSize: "14.5px",
                    fontWeight: "600",
                    color: "#6B6880",
                    lineHeight: "1.35",
                  }}
                >
                  {"Use offers, get points, swap them for free stuff."}
                </span>
              </span>
            </div>
            <div
              style={{
                marginTop: "14px",
                background: "#F3F0FA",
                borderRadius: "14px",
                padding: "12px 10px 10px 10px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                  gap: "4px",
                }}
              >
                {(v.visits || []).map((v: any, idx0: number) => (
                  <Fragment key={idx0}>
                    <span
                      className="hb-coin"
                      style={{
                        animationDelay: v.delay,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Artwork
                        src="/haiba/coins/coin-34.webp"
                        alt=""
                        style={{ width: v.size, height: v.size, display: "block" }}
                      />
                      <span
                        className={v.glow}
                        style={{
                          background: v.bg,
                          color: v.ink,
                          fontSize: "13px",
                          fontWeight: "900",
                          borderRadius: "999px",
                          padding: "3px 8px",
                        }}
                      >
                        {v.pts}
                      </span>
                      <span style={{ fontSize: "11.5px", fontWeight: "700", color: "#6B6880" }}>
                        {v.label}
                      </span>
                    </span>
                  </Fragment>
                ))}
              </div>
              <div
                style={{
                  marginTop: "8px",
                  textAlign: "center",
                  fontSize: "13.5px",
                  fontWeight: "700",
                  color: "#514A65",
                }}
              >
                {"Same shop, more points: 2x on visits 1 and 2, 5x on every 5th"}
              </div>
            </div>
          </div>
          <div
            className="hb-rise"
            style={{
              marginTop: "14px",
              background: "#1E1B2E",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "15px", fontWeight: "700", color: "#CFC9E0" }}>
                {v.totalLabel}
              </span>
              <span
                className="hb-pop hb-d2"
                style={{
                  fontSize: "24px",
                  fontWeight: "900",
                  color: "#C0F402",
                  letterSpacing: "-0.02em",
                }}
              >
                {v.getBig}
              </span>
            </div>
            <div
              style={{ marginTop: "6px", fontSize: "13.5px", fontWeight: "600", color: "#CFC9E0" }}
            >
              {"You pay "}
              {v.price}
              {" a year + VAT. Only "}
              {v.perMonth}
              {" a month."}
            </div>
          </div>
          <div className="hb-rise" style={{ marginTop: "16px" }}>
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "12px",
                padding: "18px 16px 14px 16px",
                boxShadow: "0 0 0 1.5px #D6CAF7, 0 12px 26px rgba(76,52,140,0.10)",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "900",
                  letterSpacing: "-0.02em",
                  marginBottom: "14px",
                }}
              >
                {v.stepsTitle}
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  paddingBottom: "18px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "34px",
                    bottom: "2px",
                    width: "3px",
                    borderRadius: "3px",
                    background: "linear-gradient(180deg, #C0F402 0%, #6C3FFA 100%)",
                  }}
                ></span>
                <span
                  style={{
                    position: "relative",
                    zIndex: "1",
                    width: "31px",
                    height: "31px",
                    flex: "none",
                    borderRadius: "50%",
                    background: "#C0F402",
                    color: "#1F2600",
                    boxShadow: "0 0 0 2px #6C3FFA inset",
                    fontSize: "13px",
                    fontWeight: "900",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {"1"}
                </span>
                <span
                  style={{
                    flex: "1",
                    minWidth: "0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    paddingTop: "1px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12.5px",
                      fontWeight: "800",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#6C3FFA",
                    }}
                  >
                    {"Today"}
                  </span>
                  <span
                    style={{
                      fontSize: "15.5px",
                      fontWeight: "700",
                      color: "#1E1B2E",
                      lineHeight: "1.3",
                    }}
                  >
                    {v.s1Title}
                  </span>
                </span>
                <span
                  style={{
                    flex: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    paddingTop: "1px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "19px",
                      fontWeight: "900",
                      letterSpacing: "-0.02em",
                      color: "#1E1B2E",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {v.s1Amt}
                  </span>
                  <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#6B6880" }}></span>
                </span>
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  paddingBottom: "0",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    zIndex: "1",
                    width: "31px",
                    height: "31px",
                    flex: "none",
                    borderRadius: "50%",
                    background: "#6C3FFA",
                    color: "#FFFFFF",
                    boxShadow: "0 0 0 2px #6C3FFA inset",
                    fontSize: "13px",
                    fontWeight: "900",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {"2"}
                </span>
                <span
                  style={{
                    flex: "1",
                    minWidth: "0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    paddingTop: "1px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12.5px",
                      fontWeight: "800",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#6B6880",
                    }}
                  >
                    {v.s2When}
                  </span>
                  <span
                    style={{
                      fontSize: "15.5px",
                      fontWeight: "700",
                      color: "#1E1B2E",
                      lineHeight: "1.3",
                    }}
                  >
                    {v.s2Title}
                  </span>
                </span>
                <span
                  style={{
                    flex: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    paddingTop: "1px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "19px",
                      fontWeight: "900",
                      letterSpacing: "-0.02em",
                      color: "#1E1B2E",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {v.s2Amt}
                  </span>
                  <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#6B6880" }}>
                    {v.s2Sub}
                  </span>
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "12px",
                  paddingTop: "11px",
                  borderTop: "1px solid #E2DAF6",
                  color: "#4F25D6",
                  fontSize: "13.5px",
                  fontWeight: "700",
                }}
              >
                <span style={{ flex: "none", display: "flex" }}>
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                  </svg>
                </span>
                {v.refundLine}
              </div>
            </div>
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
                padding: "30px 16px calc(16px + env(safe-area-inset-bottom, 0px)) 16px",
                background:
                  "linear-gradient(180deg, rgba(243,240,250,0) 0%, rgba(243,240,250,1) 30%)",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                zIndex: "5",
              }}
            >
              <button
                onClick={v.reserve}
                className="hb-press"
                style={{
                  font: "inherit",
                  border: "0",
                  cursor: "pointer",
                  background: "#1E1B2E",
                  borderRadius: "999px",
                  padding: "13px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1px",
                  boxShadow: "0 10px 24px rgba(30,27,46,0.24)",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#C0F402",
                    fontSize: "17px",
                    fontWeight: "800",
                  }}
                >
                  {v.ctaMain}
                </span>
                <span style={{ color: "#CFC9E0", fontSize: "13px", fontWeight: "600" }}>
                  {v.ctaNote}
                </span>
              </button>
              <button
                onClick={v.openExit}
                className="hb-press"
                style={{
                  font: "inherit",
                  border: "0",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#6B6880",
                  fontSize: "15px",
                  fontWeight: "600",
                  padding: "14px 32px",
                  minHeight: "48px",
                  alignSelf: "center",
                }}
              >
                {"Not now"}
              </button>
            </div>
          </div>
        </div>
        {v.exitOpen ? (
          <>
            <div
              className="hb-fade"
              style={{
                position: "fixed",
                inset: "0",
                background: "rgba(20,16,40,0.55)",
                zIndex: "50",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                className="hb-up"
                role="dialog"
                aria-label="Hold your spot"
                style={{
                  position: "relative",
                  width: "100%",
                  boxSizing: "border-box",
                  background: "#FFFFFF",
                  borderRadius: "14px 14px 0 0",
                  padding: "24px 20px 16px 20px",
                }}
              >
                <Artwork
                  className="hb-peek"
                  src="/haiba/birds/04-peek.png"
                  alt=""
                  style={{
                    position: "absolute",
                    right: "0",
                    top: "-104px",
                    height: "150px",
                    width: "auto",
                    display: "block",
                  }}
                />
                <span
                  style={{ position: "relative", width: "64px", height: "64px", display: "block" }}
                >
                  {v.exitHasLogo ? (
                    <>
                      <Artwork
                        src={v.exitLogo}
                        alt={v.exitShop}
                        style={{
                          width: "64px",
                          height: "64px",
                          boxSizing: "border-box",
                          padding: v.exitLogoPad,
                          borderRadius: "16px",
                          objectFit: "contain",
                          display: "block",
                          background: v.exitLogoBg,
                          boxShadow: "0 0 0 1px #ECE8F5, 0 10px 20px rgba(76,52,140,0.14)",
                        }}
                      />
                    </>
                  ) : null}
                  {v.exitNoLogo ? (
                    <>
                      <span
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "16px",
                          display: "block",
                          background: "#F0EBFF",
                        }}
                      ></span>
                    </>
                  ) : null}
                  <Artwork
                    src={v.exitIcon}
                    alt=""
                    style={{
                      position: "absolute",
                      right: "-12px",
                      bottom: "-10px",
                      width: "38px",
                      height: "38px",
                      display: "block",
                      filter: "drop-shadow(0 4px 6px rgba(76,52,140,0.25))",
                    }}
                  />
                </span>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "900",
                    letterSpacing: "-0.03em",
                    lineHeight: "1.12",
                    marginTop: "18px",
                    maxWidth: "250px",
                    color: "#1E1B2E",
                  }}
                >
                  {v.exitA}
                  <span style={{ color: "#6C3FFA" }}>{v.exitB}</span>
                  {v.exitC}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#6B6880",
                    marginTop: "6px",
                  }}
                >
                  {v.exitLine}
                </div>
                <button
                  onClick={v.reserve}
                  className="hb-press"
                  style={{
                    marginTop: "16px",
                    width: "100%",
                    font: "inherit",
                    fontSize: "17px",
                    fontWeight: "800",
                    border: "0",
                    borderRadius: "999px",
                    padding: "16px",
                    cursor: "pointer",
                    background: "#1E1B2E",
                    color: "#C0F402",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  {v.ctaShort}
                </button>
                <button
                  onClick={v.closeExit}
                  className="hb-press"
                  style={{
                    width: "100%",
                    font: "inherit",
                    border: "0",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#6B6880",
                    fontSize: "15px",
                    fontWeight: "600",
                    padding: "14px 16px 4px 16px",
                    minHeight: "48px",
                  }}
                >
                  {"No thanks"}
                </button>
              </div>
            </div>
          </>
        ) : null}
        {v.reservedOpen ? (
          <>
            <div
              className="hb-fade"
              style={{
                position: "fixed",
                inset: "0",
                background: "rgba(20,16,40,0.55)",
                zIndex: "51",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                className="hb-up"
                role="dialog"
                aria-label="You are in"
                style={{
                  position: "relative",
                  width: "100%",
                  boxSizing: "border-box",
                  background: "#FFFFFF",
                  borderRadius: "14px 14px 0 0",
                  padding: "0 20px 18px 20px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Artwork
                  className="hb-pop"
                  src="/haiba/birds/02-jump.png"
                  alt=""
                  style={{ height: "160px", width: "auto", display: "block", marginTop: "-70px" }}
                />
                <div
                  style={{
                    fontSize: "27px",
                    fontWeight: "900",
                    letterSpacing: "-0.03em",
                    lineHeight: "1.1",
                    marginTop: "4px",
                  }}
                >
                  {"You're in, "}
                  {v.name}
                  {"!"}
                </div>
                <div
                  style={{
                    fontSize: "15.5px",
                    fontWeight: "500",
                    color: "#4A4660",
                    marginTop: "6px",
                  }}
                >
                  {"Your price is locked at "}
                  <b style={{ color: "#1E1B2E" }}>{v.priceYear}</b>
                  {"."}
                </div>
                <div
                  style={{
                    width: "100%",
                    marginTop: "16px",
                    borderRadius: "12px",
                    background: "#F6F3FF",
                    padding: "4px 16px",
                    boxSizing: "border-box",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "11px 0",
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#4A4660",
                    }}
                  >
                    <span>{"Paid today"}</span>
                    <span style={{ fontWeight: "800", color: "#1E1B2E" }}>{v.dep2}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "11px 0",
                      borderTop: "1px solid #E6E0F6",
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#4A4660",
                    }}
                  >
                    <span>
                      {"Pay on "}
                      {v.launch}
                    </span>
                    <span style={{ fontWeight: "800", color: "#1E1B2E" }}>
                      {v.rest}
                      {" + VAT"}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "600",
                    color: "#6B6880",
                    marginTop: "10px",
                  }}
                >
                  {"We will remind you before "}
                  {v.launch}
                  {". Refunds through support."}
                </div>
                <button
                  onClick={v.closeReserved}
                  className="hb-press"
                  style={{
                    marginTop: "16px",
                    width: "100%",
                    font: "inherit",
                    fontSize: "17px",
                    fontWeight: "800",
                    border: "0",
                    borderRadius: "999px",
                    padding: "16px",
                    cursor: "pointer",
                    background: "#1E1B2E",
                    color: "#C0F402",
                  }}
                >
                  {"Done"}
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
