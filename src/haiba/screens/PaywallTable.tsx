// @ts-nocheck
// Ported 1:1 from the Design canvas board "PaywallTable.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/paywalltable";

export default function PaywallTable() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-paywalltable">
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
        <div style={{ position: "relative", padding: "14px 16px 190px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button
              onClick={v.openExit}
              aria-label="Close"
              className="hb-press"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "0",
                background: "#FFFFFF",
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
            <span style={{ width: "44px" }}></span>
          </div>
          <div
            className="hb-rise"
            style={{
              margin: "16px 4px 0 4px",
              fontSize: "32px",
              fontWeight: "900",
              letterSpacing: "-0.035em",
              lineHeight: "1.08",
            }}
          >
            {"Same Unipal."}
            <br />
            <span style={{ color: "#6C3FFA" }}>{"Way more free stuff."}</span>
          </div>
          <div
            className="hb-rise hb-d1"
            style={{
              margin: "8px 4px 0 4px",
              fontSize: "15.5px",
              fontWeight: "600",
              color: "#4A4660",
            }}
          >
            {"See what you get with Haiba."}
          </div>
          <div
            className="hb-rise hb-d2"
            style={{
              position: "relative",
              marginTop: "22px",
              background: "#FFFFFF",
              borderRadius: "14px",
              padding: "0 14px 0 14px",
              boxShadow: "0 0 0 1px #E6DFF8, 0 12px 26px rgba(30,27,46,0.06)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "10px",
                top: "-12px",
                bottom: "-10px",
                width: "92px",
                borderRadius: "12px",
                background: "linear-gradient(180deg, #7B52FF 0%, #5A2FE6 100%)",
                boxShadow: "0 14px 28px rgba(108,63,250,0.35)",
              }}
            ></span>
            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) 72px 84px",
                alignItems: "end",
                height: "50px",
              }}
            >
              <span></span>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "13.5px",
                  fontWeight: "700",
                  color: "#6B6880",
                  paddingBottom: "12px",
                }}
              >
                {"Free"}
              </span>
              <span style={{ display: "flex", justifyContent: "center", paddingBottom: "12px" }}>
                <Artwork
                  priority
                  src="/haiba/logo-lime.svg"
                  alt="Haiba"
                  style={{ height: "20px", width: "auto", display: "block" }}
                />
              </span>
            </div>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) 72px 84px",
                  alignItems: "center",
                  minHeight: "52px",
                  borderTop: "1px solid #EEEBF5",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 6px 8px 2px",
                    fontSize: "14.5px",
                    fontWeight: "700",
                    lineHeight: "1.25",
                  }}
                >
                  <span style={{ width: "30px", flex: "none" }}></span>
                  <span>{"Student offers"}</span>
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "#EDEBF3",
                      color: "#6B6880",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="12"
                      height="12"
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
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "#C0F402",
                      color: "#1F2600",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="12"
                      height="12"
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
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) 72px 84px",
                  alignItems: "center",
                  minHeight: "52px",
                  borderTop: "1px solid #EEEBF5",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 6px 8px 2px",
                    fontSize: "14.5px",
                    fontWeight: "700",
                    lineHeight: "1.25",
                  }}
                >
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      flex: "none",
                      borderRadius: "8px",
                      background: "#6C3FFA",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C0F402"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 12v9H4v-9M2 7h20v5H2zM12 7v14M12 7c-2-4-7-4-7-1s5 1 7 1zm0 0c2-4 7-4 7-1s-5 1-7 1z"></path>
                    </svg>
                  </span>
                  <span>{"A free gift every month"}</span>
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                      fontWeight: "800",
                      color: "#C3C0CF",
                    }}
                  >
                    {"\u2715"}
                  </span>
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "800",
                      color: "#FFFFFF",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {"12 a year"}
                  </span>
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) 72px 84px",
                  alignItems: "center",
                  minHeight: "52px",
                  borderTop: "1px solid #EEEBF5",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 6px 8px 2px",
                    fontSize: "14.5px",
                    fontWeight: "700",
                    lineHeight: "1.25",
                  }}
                >
                  <Artwork
                    src="/haiba/brands/spotify.webp"
                    alt=""
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      display: "block",
                      flex: "none",
                    }}
                  />
                  <span>{"Spotify Premium Student"}</span>
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                      fontWeight: "800",
                      color: "#C3C0CF",
                    }}
                  >
                    {"\u2715"}
                  </span>
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "800",
                      color: "#FFFFFF",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {"3 months"}
                  </span>
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) 72px 84px",
                  alignItems: "center",
                  minHeight: "52px",
                  borderTop: "1px solid #EEEBF5",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 6px 8px 2px",
                    fontSize: "14.5px",
                    fontWeight: "700",
                    lineHeight: "1.25",
                  }}
                >
                  <Artwork
                    src="/haiba/brands/chatgpt.webp"
                    alt=""
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      display: "block",
                      flex: "none",
                      boxShadow: "0 0 0 1px #ECE8F5",
                    }}
                  />
                  <span>{"ChatGPT Go"}</span>
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                      fontWeight: "800",
                      color: "#C3C0CF",
                    }}
                  >
                    {"\u2715"}
                  </span>
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "800",
                      color: "#FFFFFF",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {"3 months"}
                  </span>
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) 72px 84px",
                  alignItems: "center",
                  minHeight: "52px",
                  borderTop: "1px solid #EEEBF5",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 6px 8px 2px",
                    fontSize: "14.5px",
                    fontWeight: "700",
                    lineHeight: "1.25",
                  }}
                >
                  <span style={{ display: "flex", flex: "none", width: "44px" }}>
                    <Artwork
                      src="/haiba/flags/bh.svg"
                      alt=""
                      style={{
                        width: "17px",
                        height: "17px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        display: "block",
                        marginLeft: "0",
                        boxShadow: "0 0 0 2px #FFFFFF",
                      }}
                    />
                    <Artwork
                      src="/haiba/flags/sa.svg"
                      alt=""
                      style={{
                        width: "17px",
                        height: "17px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        display: "block",
                        marginLeft: "-7px",
                        boxShadow: "0 0 0 2px #FFFFFF",
                      }}
                    />
                    <Artwork
                      src="/haiba/flags/qa.svg"
                      alt=""
                      style={{
                        width: "17px",
                        height: "17px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        display: "block",
                        marginLeft: "-7px",
                        boxShadow: "0 0 0 2px #FFFFFF",
                      }}
                    />
                    <Artwork
                      src="/haiba/flags/om.svg"
                      alt=""
                      style={{
                        width: "17px",
                        height: "17px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        display: "block",
                        marginLeft: "-7px",
                        boxShadow: "0 0 0 2px #FFFFFF",
                      }}
                    />
                  </span>
                  <span>{"Travel data"}</span>
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                      fontWeight: "800",
                      color: "#C3C0CF",
                    }}
                  >
                    {"\u2715"}
                  </span>
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "800",
                      color: "#FFFFFF",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {"5GB"}
                  </span>
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) 72px 84px",
                  alignItems: "center",
                  minHeight: "52px",
                  borderTop: "1px solid #EEEBF5",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 6px 8px 2px",
                    fontSize: "14.5px",
                    fontWeight: "700",
                    lineHeight: "1.25",
                  }}
                >
                  <Artwork
                    src="/haiba/coins/coin-34.webp"
                    alt=""
                    style={{ width: "30px", height: "30px", display: "block", flex: "none" }}
                  />
                  <span>{"Bonus points"}</span>
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                      fontWeight: "800",
                      color: "#C3C0CF",
                    }}
                  >
                    {"\u2715"}
                  </span>
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "#C0F402",
                      color: "#1F2600",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="12"
                      height="12"
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
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) 72px 84px",
                  alignItems: "center",
                  minHeight: "52px",
                  borderTop: "1px solid #EEEBF5",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 6px 8px 2px",
                    fontSize: "14.5px",
                    fontWeight: "700",
                    lineHeight: "1.25",
                  }}
                >
                  <span style={{ width: "30px", flex: "none" }}></span>
                  <span>{"See what you saved"}</span>
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                      fontWeight: "800",
                      color: "#C3C0CF",
                    }}
                  >
                    {"\u2715"}
                  </span>
                </span>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "#C0F402",
                      color: "#1F2600",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="12"
                      height="12"
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
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) 72px 84px",
                  alignItems: "center",
                  minHeight: "64px",
                  borderTop: "1px solid #EEEBF5",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: "900", paddingLeft: "2px" }}>
                  {"Worth in a year"}
                </span>
                <span
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#A9A6B8",
                  }}
                >
                  {v.cur}
                  {" 0"}
                </span>
                <span
                  style={{
                    textAlign: "center",
                    fontSize: "17px",
                    fontWeight: "900",
                    color: "#C0F402",
                    letterSpacing: "-0.02em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v.worth}
                </span>
              </div>
            </div>
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              marginTop: "26px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              background: "#1E1B2E",
              color: "#FFFFFF",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  fontSize: "12.5px",
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#B9B3CC",
                }}
              >
                {"Haiba yearly"}
              </span>
              <span style={{ fontSize: "30px", fontWeight: "900", letterSpacing: "-0.03em" }}>
                {v.price}
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#B9B3CC" }}>
                  {" + VAT"}
                </span>
              </span>
              <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#CFC9E0" }}>
                {"About 1 coffee a month"}
              </span>
            </span>
            <span
              style={{
                flex: "none",
                background: "#C0F402",
                color: "#1F2600",
                fontSize: "14px",
                fontWeight: "900",
                borderRadius: "10px",
                padding: "9px 11px",
                textAlign: "center",
                lineHeight: "1.2",
                maxWidth: "120px",
                transform: "rotate(3deg)",
              }}
            >
              {v.dayOneSticker}
            </span>
          </div>
          <div style={{ marginTop: "14px" }}>
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
