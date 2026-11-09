// @ts-nocheck
// Ported 1:1 from the Design canvas board "PaywallBase.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/paywallbase";

export default function PaywallBase() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-paywallbase">
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          margin: "0 auto",
          minHeight: "100svh",
          boxSizing: "border-box",
          background: "#FFFFFF",
          fontFamily: "Figtree, system-ui, sans-serif",
          color: "#1E1B2E",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            background: "linear-gradient(165deg, #6C3FFA 0%, #3E1BB8 100%)",
            color: "#FFFFFF",
            padding: "14px 20px 0 20px",
            height: "336px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-110px",
              top: "60px",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              border: "2px dashed rgba(192,244,2,0.35)",
            }}
          ></span>
          <Artwork
            priority
            className="hb-peek"
            src="/haiba/birds/17-coin-toss.webp"
            alt="The Haiba bird tossing a coin"
            style={{
              position: "absolute",
              right: "-6px",
              bottom: "6px",
              height: "214px",
              width: "auto",
              display: "block",
              filter: "drop-shadow(0 12px 14px rgba(20,8,60,0.35))",
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
                background: "rgba(255,255,255,0.14)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
                cursor: "pointer",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.25)",
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
              src="/haiba/logo-lime.svg"
              alt="Haiba"
              style={{ height: "26px", width: "auto", display: "block" }}
            />
            <span style={{ width: "44px" }}></span>
          </div>
          <div
            className="hb-rise"
            style={{
              position: "relative",
              marginTop: "18px",
              fontSize: "30px",
              fontWeight: "900",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
            }}
          >
            {"Get "}
            <span style={{ color: "#C0F402" }}>{"free stuff"}</span>
            {" worth"}
          </div>
          <div
            className="hb-pop hb-d1"
            style={{
              position: "relative",
              fontSize: "74px",
              fontWeight: "900",
              letterSpacing: "-0.05em",
              lineHeight: "1",
              color: "#C0F402",
              marginTop: "2px",
            }}
          >
            {v.worth}
          </div>
          <div
            className="hb-rise hb-d1"
            style={{
              position: "relative",
              fontSize: "30px",
              fontWeight: "900",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
              marginTop: "2px",
            }}
          >
            {"every year"}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            marginTop: "-24px",
            background: "#FFFFFF",
            borderRadius: "14px 14px 0 0",
            padding: "22px 16px 190px 16px",
          }}
        >
          <div
            style={{
              fontSize: "19px",
              fontWeight: "900",
              letterSpacing: "-0.02em",
              margin: "0 4px 12px 4px",
            }}
          >
            {"What you get"}
          </div>
          <div
            className="hb-stagger"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                minHeight: "156px",
                boxSizing: "border-box",
                background: "linear-gradient(135deg, #6C3FFA 0%, #4F25D6 100%)",
                color: "#FFFFFF",
                borderRadius: "14px",
                padding: "18px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  background: "#C0F402",
                  color: "#1F2600",
                  fontSize: "13px",
                  fontWeight: "800",
                  borderRadius: "999px",
                  padding: "5px 10px",
                }}
              >
                {"Worth "}
                {v.wGifts}
              </span>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "900",
                  letterSpacing: "-0.02em",
                  marginTop: "12px",
                }}
              >
                {"12 free gifts"}
              </div>
              <div
                style={{
                  fontSize: "14.5px",
                  fontWeight: "600",
                  color: "#E4DBFF",
                  lineHeight: "1.35",
                  marginTop: "4px",
                  maxWidth: "170px",
                }}
              >
                {"1 every month. You pick the shop."}
              </div>
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "40px",
                  width: "154px",
                  height: "120px",
                }}
              >
                <Artwork
                  src="/haiba/brands/wingman.webp"
                  alt=""
                  style={{
                    position: "absolute",
                    left: "0px",
                    top: "12px",
                    width: "58px",
                    height: "58px",
                    boxSizing: "border-box",
                    padding: "5px",
                    borderRadius: "12px",
                    objectFit: "contain",
                    display: "block",
                    background: "#F9F9F9",
                    transform: "rotate(-10deg)",
                    boxShadow: "0 10px 18px rgba(20,8,60,0.30)",
                  }}
                />
                <Artwork
                  src="/haiba/brands/vox.webp"
                  alt=""
                  style={{
                    position: "absolute",
                    left: "46px",
                    top: "0px",
                    width: "58px",
                    height: "58px",
                    boxSizing: "border-box",
                    padding: "5px",
                    borderRadius: "12px",
                    objectFit: "contain",
                    display: "block",
                    background: "#FFFFFF",
                    transform: "rotate(0deg)",
                    boxShadow: "0 10px 18px rgba(20,8,60,0.30)",
                  }}
                />
                <Artwork
                  src="/haiba/brands/coffee-bean.webp"
                  alt=""
                  style={{
                    position: "absolute",
                    left: "92px",
                    top: "10px",
                    width: "58px",
                    height: "58px",
                    boxSizing: "border-box",
                    padding: "5px",
                    borderRadius: "12px",
                    objectFit: "contain",
                    display: "block",
                    background: "#FFFFFF",
                    transform: "rotate(10deg)",
                    boxShadow: "0 10px 18px rgba(20,8,60,0.30)",
                  }}
                />
              </span>
            </div>
            <div
              style={{
                background: "#F3F0FA",
                borderRadius: "14px",
                padding: "16px 12px 12px 12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  padding: "0 4px 12px 4px",
                }}
              >
                <span style={{ fontSize: "17px", fontWeight: "900", letterSpacing: "-0.01em" }}>
                  {"3 free extras on day one"}
                </span>
                <span
                  style={{
                    flex: "none",
                    background: "#1E1B2E",
                    color: "#C0F402",
                    fontSize: "13px",
                    fontWeight: "800",
                    borderRadius: "999px",
                    padding: "5px 10px",
                  }}
                >
                  {v.wExtras}
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    minHeight: "104px",
                    boxSizing: "border-box",
                    borderRadius: "12px",
                    padding: "12px",
                    background: "#000000",
                    color: "#FFFFFF",
                  }}
                >
                  <Artwork
                    src="/haiba/brands/spotify.webp"
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                      background: "#FFFFFF",
                    }}
                  />
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                      marginTop: "auto",
                    }}
                  >
                    <span style={{ fontSize: "14.5px", fontWeight: "800" }}>{"Spotify"}</span>
                    <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#B9B3CC" }}>
                      {"3 months"}
                    </span>
                  </span>
                </span>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    minHeight: "104px",
                    boxSizing: "border-box",
                    borderRadius: "12px",
                    padding: "12px",
                    background: "#FFFFFF",
                    color: "#1E1B2E",
                    boxShadow: "0 0 0 1px #E6E0F6",
                  }}
                >
                  <Artwork
                    src="/haiba/brands/chatgpt.webp"
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                      background: "#FFFFFF",
                    }}
                  />
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                      marginTop: "auto",
                    }}
                  >
                    <span style={{ fontSize: "14.5px", fontWeight: "800" }}>{"ChatGPT"}</span>
                    <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#6B6880" }}>
                      {"3 months"}
                    </span>
                  </span>
                </span>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    minHeight: "104px",
                    boxSizing: "border-box",
                    borderRadius: "12px",
                    padding: "12px",
                    background: "#1E1B2E",
                    color: "#FFFFFF",
                  }}
                >
                  <Artwork
                    src="/haiba/brands/airalo-mark.svg"
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      display: "block",
                      background: "#FFFFFF",
                    }}
                  />
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                      marginTop: "auto",
                    }}
                  >
                    <span style={{ fontSize: "14.5px", fontWeight: "800" }}>{"Travel data"}</span>
                    <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#B9B3CC" }}>
                      {"5GB"}
                    </span>
                  </span>
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "#C0F402",
                color: "#1F2600",
                borderRadius: "999px",
                padding: "10px 22px 10px 10px",
              }}
            >
              <Artwork
                src="/haiba/coins/coin-34.webp"
                alt=""
                style={{ width: "46px", height: "46px", display: "block", flex: "none" }}
              />
              <span style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                <span style={{ fontSize: "16px", fontWeight: "800", lineHeight: "1.25" }}>
                  {"Points every time you use Unipal"}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#3D5000" }}>
                  {"Use them for free food, coffee and more"}
                </span>
              </span>
            </div>
          </div>
          <div
            className="hb-rise"
            style={{
              marginTop: "26px",
              fontSize: "19px",
              fontWeight: "900",
              letterSpacing: "-0.02em",
              marginLeft: "4px",
              marginBottom: "12px",
            }}
          >
            {"Is it worth it?"}
          </div>
          <div className="hb-rise">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
                gap: "8px",
              }}
            >
              <span
                style={{
                  position: "relative",
                  zIndex: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1px",
                  background: "#F3F0FA",
                  color: "#1E1B2E",
                  borderRadius: "12px",
                  padding: "14px",
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#6B6880" }}>
                  {"You pay"}
                </span>
                <span style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "-0.02em" }}>
                  {v.price}
                </span>
                <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#6B6880" }}>
                  {"a year + VAT"}
                </span>
                <span
                  style={{
                    position: "absolute",
                    right: "-19px",
                    top: "50%",
                    marginTop: "-15px",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    color: "#1E1B2E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 0 3px #FFFFFF",
                  }}
                >
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6"></path>
                  </svg>
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1px",
                  background: "#1E1B2E",
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "14px 14px 14px 24px",
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#CFC9E0" }}>
                  {"You get"}
                </span>
                <span
                  style={{
                    fontSize: "34px",
                    fontWeight: "900",
                    letterSpacing: "-0.03em",
                    color: "#C0F402",
                    lineHeight: "1.05",
                  }}
                >
                  {v.worth}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#CFC9E0" }}>
                  {"of free stuff"}
                </span>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginTop: "12px",
                padding: "0 4px",
              }}
            >
              <span style={{ display: "flex", flex: "none", paddingTop: "2px" }}>
                <span style={{ display: "flex", flex: "none" }}>
                  <Artwork
                    src="/haiba/brands/spotify.webp"
                    alt=""
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                      background: "#000000",
                      marginLeft: "0",
                      boxShadow: "0 0 0 2px #FFFFFF",
                    }}
                  />
                  <Artwork
                    src="/haiba/brands/chatgpt.webp"
                    alt=""
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                      background: "#FFFFFF",
                      marginLeft: "-8px",
                      boxShadow: "0 0 0 2px #FFFFFF",
                    }}
                  />
                  <Artwork
                    src="/haiba/brands/airalo-mark.svg"
                    alt=""
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "30%",
                      objectFit: "cover",
                      display: "block",
                      background: "#FFFFFF",
                      marginLeft: "-8px",
                      boxShadow: "0 0 0 2px #FFFFFF",
                    }}
                  />
                </span>
              </span>
              <span
                style={{
                  flex: "1",
                  minWidth: "0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#5B5770",
                  lineHeight: "1.4",
                }}
              >
                <b style={{ color: "#1E1B2E", fontWeight: "800" }}>{v.dayOneHead}</b> {v.dayOneRest}
              </span>
            </div>
          </div>
          <div className="hb-rise" style={{ marginTop: "22px" }}>
            <div
              style={{
                background: "#ECE5FF",
                borderRadius: "12px",
                padding: "18px 16px 14px 16px",
                boxShadow: "0 0 0 1.5px #CDBEF7",
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
                  borderTop: "1px solid #D6C9F8",
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
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 30%)",
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
                    src="/haiba/emoji/gift.webp"
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
                  {"Every month, with Haiba."}
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
