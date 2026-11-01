// @ts-nocheck
// Ported 1:1 from the Design canvas board "Rewards.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/rewards";

export default function Rewards() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-rewards">
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
            <span style={{ fontSize: "16px", fontWeight: "800" }}>{"Spend points"}</span>
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
            {"Free stuff for "}
            <span style={{ color: "#6C3FFA" }}>{"your points."}</span>
          </h1>
          <div
            className="hb-rise hb-d1"
            style={{
              margin: "6px 4px 0 4px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#4A4660",
              lineHeight: "1.4",
            }}
          >
            {"Pick a reward, get a code, show it at the till."}
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "16px", overflow: "hidden" }}>
            {(v.cats || []).map((c: any, idx0: number) => (
              <Fragment key={idx0}>
                <button
                  onClick={c.pick}
                  aria-pressed={c.on}
                  className="hb-press"
                  style={{
                    font: "inherit",
                    flex: "none",
                    border: "0",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "800",
                    borderRadius: "999px",
                    padding: "8px 14px",
                    background: c.bg,
                    color: c.ink,
                    boxShadow: c.ring,
                  }}
                >
                  {c.label}
                </button>
              </Fragment>
            ))}
          </div>
          <div className="hb-stagger" style={{ marginTop: "16px" }}>
            {(v.rows || []).map((r: any, idx0: number) => (
              <Fragment key={idx0}>
                {r.isHead ? (
                  <>
                    <div
                      style={{
                        marginTop: r.gap,
                        background: "#FFFFFF",
                        borderRadius: "16px 16px 0 0",
                        boxShadow: "0 0 0 1px #ECE8F5",
                        padding: "14px 16px 10px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      {r.hasLogo ? (
                        <>
                          <Artwork
                            src={r.logo}
                            alt=""
                            style={{
                              width: "40px",
                              height: "40px",
                              flex: "none",
                              borderRadius: "12px",
                              objectFit: "cover",
                              display: "block",
                              background: r.bg,
                              boxShadow: "0 0 0 1px #ECE8F5",
                            }}
                          />
                        </>
                      ) : null}
                      {r.noLogo ? (
                        <>
                          <span
                            style={{
                              width: "40px",
                              height: "40px",
                              flex: "none",
                              borderRadius: "12px",
                              background: r.bg,
                              color: "#FFFFFF",
                              fontSize: "15px",
                              fontWeight: "800",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {r.mark}
                          </span>
                        </>
                      ) : null}
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1px",
                          flex: "1",
                          minWidth: "0",
                        }}
                      >
                        <span style={{ fontSize: "17px", fontWeight: "800" }}>{r.shop}</span>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
                          {r.meta}
                        </span>
                      </span>
                    </div>
                  </>
                ) : null}
                {r.isItem ? (
                  <>
                    <div
                      style={{
                        background: "#FFFFFF",
                        boxShadow: "0 0 0 1px #ECE8F5",
                        borderRadius: r.radius,
                        padding: "0 16px",
                      }}
                    >
                      <div style={{ borderTop: "1px solid #F1EFF7", padding: "12px 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span
                            style={{
                              width: "56px",
                              height: "56px",
                              flex: "none",
                              borderRadius: "14px",
                              background: r.phBg,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: r.phInk,
                              fontSize: "10px",
                              fontWeight: "800",
                              letterSpacing: "0.06em",
                              textAlign: "center",
                              lineHeight: "1.2",
                            }}
                          >
                            {r.ph}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              flex: "1",
                              minWidth: "0",
                            }}
                          >
                            <span style={{ fontSize: "16px", fontWeight: "700" }}>{r.name}</span>
                            <span style={{ fontSize: "13px", fontWeight: "500", color: "#6B6880" }}>
                              {r.sub}
                            </span>
                            <span
                              style={{
                                alignSelf: "flex-start",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                fontSize: "13px",
                                fontWeight: "700",
                                color: r.ptsInk,
                                background: r.ptsBg,
                                borderRadius: "999px",
                                padding: "3px 9px 3px 5px",
                              }}
                            >
                              <Artwork
                                src="/haiba/coins/coin-front.webp"
                                alt=""
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  objectFit: "contain",
                                  display: "block",
                                  flex: "none",
                                }}
                              />
                              {r.pts}
                            </span>
                          </span>
                          {r.showUse ? (
                            <>
                              <button
                                onClick={r.ask}
                                aria-label={r.useLabel}
                                className="hb-press"
                                style={{
                                  font: "inherit",
                                  fontSize: "14px",
                                  fontWeight: "800",
                                  flex: "none",
                                  borderRadius: "999px",
                                  border: "0",
                                  padding: "10px 16px",
                                  cursor: r.cursor,
                                  background: r.btnBg,
                                  color: r.btnInk,
                                }}
                              >
                                {"Use"}
                              </button>
                            </>
                          ) : null}
                          {r.isUsed ? (
                            <>
                              <span
                                style={{
                                  flex: "none",
                                  fontSize: "13px",
                                  fontWeight: "800",
                                  color: "#1E7A34",
                                  background: "#E6F4EA",
                                  borderRadius: "999px",
                                  padding: "7px 12px",
                                }}
                              >
                                {"Used"}
                              </span>
                            </>
                          ) : null}
                        </div>
                        {r.asking ? (
                          <>
                            <div
                              className="hb-pop"
                              style={{
                                marginTop: "12px",
                                background: "#F4F1FD",
                                borderRadius: "16px",
                                padding: "14px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                                transformOrigin: "top center",
                              }}
                            >
                              <span
                                style={{ fontSize: "15px", fontWeight: "700", lineHeight: "1.35" }}
                              >
                                {r.askLine}
                              </span>
                              <span style={{ display: "flex", gap: "8px" }}>
                                <button
                                  onClick={r.confirm}
                                  className="hb-press"
                                  style={{
                                    font: "inherit",
                                    flex: "1",
                                    fontSize: "15px",
                                    fontWeight: "800",
                                    border: "0",
                                    borderRadius: "999px",
                                    padding: "12px",
                                    cursor: "pointer",
                                    background: "#1E1B2E",
                                    color: "#C0F402",
                                  }}
                                >
                                  {"Get my code"}
                                </button>
                                <button
                                  onClick={r.notNow}
                                  className="hb-press"
                                  style={{
                                    font: "inherit",
                                    fontSize: "15px",
                                    fontWeight: "700",
                                    border: "0",
                                    borderRadius: "999px",
                                    padding: "12px 16px",
                                    cursor: "pointer",
                                    background: "#FFFFFF",
                                    color: "#1E1B2E",
                                  }}
                                >
                                  {"Not now"}
                                </button>
                              </span>
                            </div>
                          </>
                        ) : null}
                        {r.held ? (
                          <>
                            <div
                              className="hb-pop"
                              style={{
                                marginTop: "12px",
                                background: "linear-gradient(135deg, #6C3FFA 0%, #4F25D6 100%)",
                                borderRadius: "16px",
                                padding: "16px",
                                color: "#FFFFFF",
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                                transformOrigin: "top center",
                              }}
                            >
                              <span
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontSize: "13px",
                                  fontWeight: "700",
                                  color: "#E4DBFF",
                                }}
                              >
                                <span>{"Show this at the till"}</span>
                                <span>{"Use by 1 Dec"}</span>
                              </span>
                              <span
                                style={{
                                  background: "#FFFFFF",
                                  color: "#1E1B2E",
                                  borderRadius: "14px",
                                  padding: "14px",
                                  textAlign: "center",
                                  fontSize: "28px",
                                  fontWeight: "800",
                                  letterSpacing: "0.08em",
                                }}
                              >
                                {r.code}
                              </span>
                              <span
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <button
                                  onClick={r.cancel}
                                  className="hb-press"
                                  style={{
                                    font: "inherit",
                                    fontSize: "13.5px",
                                    fontWeight: "700",
                                    border: "0",
                                    background: "transparent",
                                    color: "#E4DBFF",
                                    padding: "4px 0",
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                  }}
                                >
                                  {"Cancel, points back"}
                                </button>
                                <button
                                  onClick={r.accept}
                                  aria-label="Prototype: the shop accepts this code"
                                  className="hb-press"
                                  style={{
                                    font: "inherit",
                                    fontSize: "12.5px",
                                    fontWeight: "700",
                                    border: "1.5px dashed rgba(255,255,255,0.5)",
                                    background: "transparent",
                                    color: "#FFFFFF",
                                    borderRadius: "999px",
                                    padding: "6px 10px",
                                    cursor: "pointer",
                                  }}
                                >
                                  {"Test: shop accepts"}
                                </button>
                              </span>
                            </div>
                          </>
                        ) : null}
                        {r.isUsed ? (
                          <>
                            <div
                              className="hb-pop"
                              style={{
                                marginTop: "12px",
                                background: "#E6F4EA",
                                color: "#1E5E2E",
                                borderRadius: "14px",
                                padding: "12px 14px",
                                fontSize: "14px",
                                fontWeight: "700",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <span>{r.savedLine}</span>
                              <button
                                onClick={r.again}
                                className="hb-press"
                                style={{
                                  font: "inherit",
                                  fontSize: "13.5px",
                                  fontWeight: "800",
                                  border: "0",
                                  borderRadius: "999px",
                                  padding: "8px 12px",
                                  cursor: "pointer",
                                  background: "#1E1B2E",
                                  color: "#C0F402",
                                  opacity: r.againOp,
                                }}
                              >
                                {"Use again"}
                              </button>
                            </div>
                          </>
                        ) : null}
                        {r.demo ? (
                          <>
                            <div
                              className="hb-pop"
                              style={{
                                marginTop: "12px",
                                background: "#FFF6D6",
                                color: "#5C4600",
                                borderRadius: "14px",
                                padding: "12px 14px",
                                fontSize: "13.5px",
                                fontWeight: "700",
                                lineHeight: "1.4",
                              }}
                            >
                              {"Prototype: only The Coffee Bean gives a real code here."}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : null}
              </Fragment>
            ))}
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color: "#6B6880",
              margin: "14px 4px 0 4px",
              lineHeight: "1.45",
            }}
          >
            {
              "One code per item. Each code lasts 30 days. Your points are held until the shop accepts the code, and come back if you cancel."
            }
          </div>
        </div>
      </div>
    </div>
  );
}
