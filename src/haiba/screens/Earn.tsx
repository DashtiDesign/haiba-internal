// @ts-nocheck
// Ported 1:1 from the Design canvas board "Earn.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/earn";

export default function Earn() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-earn">
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
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            height: "260px",
            background: "linear-gradient(180deg, #E4D9FF 0%, #F3F0FA 100%)",
          }}
        ></div>
        <div style={{ position: "relative", padding: "14px 16px 60px 16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <Link
              aria-label="Back to Haiba"
              className="hb-press"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#FFFFFF",
                color: "#1E1B2E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                boxShadow: "0 0 0 1px #ECE8F5",
              }}
              to="/haiba"
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
                strokeLinejoin="round"
              >
                <path d="M19 12H5"></path>
                <path d="M11 6l-6 6 6 6"></path>
              </svg>
            </Link>
            <span style={{ fontSize: "16px", fontWeight: "800" }}>{"Earn points"}</span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#1E1B2E",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: "800",
                borderRadius: "999px",
                padding: "6px 12px 6px 6px",
              }}
            >
              <Artwork
                priority
                src="/haiba/coins/coin-front.webp"
                alt=""
                style={{
                  width: "22px",
                  height: "22px",
                  objectFit: "contain",
                  display: "block",
                  flex: "none",
                }}
              />
              {v.balance}
            </span>
          </div>
          <h1
            className="hb-rise"
            style={{
              margin: "22px 4px 0 4px",
              fontSize: "28px",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
            }}
          >
            {"Use any Unipal offer. "}
            <span style={{ color: "#6C3FFA" }}>{"Points land on their own."}</span>
          </h1>
          <div
            className="hb-rise hb-d1"
            style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "14px 0 0 0" }}
          >
            <span
              style={{
                background: "#FFFFFF",
                boxShadow: "0 0 0 1px #ECE8F5",
                borderRadius: "999px",
                padding: "6px 11px",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              {"40 every visit"}
            </span>
            <span
              style={{
                background: "#FFFFFF",
                boxShadow: "0 0 0 1px #ECE8F5",
                borderRadius: "999px",
                padding: "6px 11px",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              {"2x on your first 2 visits"}
            </span>
            <span
              style={{
                background: "#FFFFFF",
                boxShadow: "0 0 0 1px #ECE8F5",
                borderRadius: "999px",
                padding: "6px 11px",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              {"5x every 5th visit"}
            </span>
          </div>
          <div
            className="hb-rise hb-d2"
            style={{
              position: "relative",
              marginTop: "18px",
              background: "linear-gradient(135deg, #6C3FFA 0%, #4F25D6 100%)",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "16px 18px",
              overflow: "hidden",
              boxShadow: "0 12px 26px rgba(108,63,250,0.22)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "-50px",
                top: "-60px",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                border: "2px dashed rgba(192,244,2,0.35)",
              }}
            ></span>
            <div
              style={{
                position: "relative",
                fontSize: "12px",
                fontWeight: "800",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#E4DBFF",
              }}
            >
              {"Your next bonus"}
            </div>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "40px",
                  fontWeight: "800",
                  letterSpacing: "-0.03em",
                  lineHeight: "1",
                  color: "#C0F402",
                }}
              >
                {v.nextPts}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700" }}>{"points"}</span>
            </div>
            <div
              style={{
                position: "relative",
                fontSize: "15px",
                fontWeight: "600",
                color: "#F3EEFF",
                marginTop: "6px",
                lineHeight: "1.4",
              }}
            >
              {v.nextLine}
            </div>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                marginTop: "14px",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {(v.nextStamps || []).map((s: any, idx0: number) => (
                  <Fragment key={idx0}>
                    <span
                      style={{
                        width: "26px",
                        height: "26px",
                        boxSizing: "border-box",
                        borderRadius: "50%",
                        background: s.bg,
                        color: s.ink,
                        border: `2px solid ${s.ring}`,
                        fontSize: "10px",
                        fontWeight: "800",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {s.tag}
                    </span>
                  </Fragment>
                ))}
              </span>
              <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#E4DBFF" }}>
                {v.nextNote}
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: "19px",
              fontWeight: "800",
              letterSpacing: "-0.02em",
              margin: "24px 4px 8px 4px",
            }}
          >
            {"Your shops"}
          </div>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "2px 16px",
              boxShadow: "0 0 0 1px #ECE8F5",
            }}
          >
            {(v.mine || []).map((m: any, idx0: number) => (
              <Fragment key={idx0}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 0",
                    borderBottom: m.rule,
                  }}
                >
                  <span
                    style={{
                      width: "40px",
                      height: "40px",
                      flex: "none",
                      borderRadius: "12px",
                      background: m.bg,
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "800",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {m.mark}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      flex: "1",
                      minWidth: "0",
                    }}
                  >
                    <span style={{ fontSize: "15.5px", fontWeight: "800" }}>{m.name}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      {(m.stamps || []).map((s: any, idx1: number) => (
                        <Fragment key={idx1}>
                          <span
                            style={{
                              width: "20px",
                              height: "20px",
                              boxSizing: "border-box",
                              borderRadius: "50%",
                              background: s.bg,
                              color: s.ink,
                              border: `2px solid ${s.ring}`,
                              fontSize: "8.5px",
                              fontWeight: "800",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {s.tag}
                          </span>
                        </Fragment>
                      ))}
                    </span>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "1px",
                      flex: "none",
                    }}
                  >
                    <span style={{ fontSize: "15px", fontWeight: "800", color: m.ptsInk }}>
                      {m.pts}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#6B6880" }}>
                      {"next visit"}
                    </span>
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              fontSize: "19px",
              fontWeight: "800",
              letterSpacing: "-0.02em",
              margin: "24px 4px 2px 4px",
            }}
          >
            {"New to you. 2x waiting."}
          </div>
          <div
            style={{
              fontSize: "13.5px",
              fontWeight: "600",
              color: "#6B6880",
              margin: "0 4px 8px 4px",
            }}
          >
            {"Your first 2 visits at any shop earn double."}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "8px",
            }}
          >
            {(v.fresh || []).map((f: any, idx0: number) => (
              <Fragment key={idx0}>
                <span
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    boxShadow: "0 0 0 1px #ECE8F5",
                    padding: "12px 8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    textAlign: "center",
                  }}
                >
                  <Artwork
                    src={f.logo}
                    alt={f.name}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      objectFit: "cover",
                      display: "block",
                      background: f.bg,
                      boxShadow: "0 0 0 1px #ECE8F5",
                    }}
                  />
                  <span style={{ fontSize: "13.5px", fontWeight: "800", lineHeight: "1.2" }}>
                    {f.name}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "800",
                      background: "#C0F402",
                      color: "#1F2600",
                      borderRadius: "999px",
                      padding: "3px 8px",
                    }}
                  >
                    {"+80 points"}
                  </span>
                </span>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              marginTop: "18px",
              background: "#1E1B2E",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "14px 16px",
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <Artwork
              src="/haiba/coins/coin-34.webp"
              alt=""
              style={{
                width: "36px",
                height: "36px",
                objectFit: "contain",
                display: "block",
                flex: "none",
              }}
            />
            <span
              style={{
                fontSize: "13.5px",
                fontWeight: "600",
                color: "#E4DBFF",
                lineHeight: "1.45",
              }}
            >
              {
                "Points show here a few minutes after you use an offer in Unipal. We also send you a notification."
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
