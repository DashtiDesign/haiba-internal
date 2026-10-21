// @ts-nocheck
// Ported 1:1 from the Design canvas board "Plans.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import { useVals } from "../logic/plans";

export default function Plans() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  const reduced = useReducedMotion();
  return (
    <div className="pg-plans">
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
          className="hb-ease"
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            height: "520px",
            background: v.glow,
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
              onClick={() => go("/")}
              aria-label="Close"
              className="hb-press"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid #ECE8F7",
                background: "rgba(255,255,255,0.8)",
                color: "#1E1B2E",
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
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                fontSize: "18px",
                fontWeight: "800",
                letterSpacing: "-0.01em",
              }}
            >
              {"Choose your plan"}
            </span>
            <span style={{ width: "44px" }}></span>
          </div>
          <div
            className="hb-rise hb-d1"
            style={{ display: "flex", justifyContent: "center", marginTop: "14px" }}
          >
            <div
              role="tablist"
              className="hb-plan-tabs"
              aria-label="Plans"
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(2, 134px)",
                background: "#FFFFFF",
                borderRadius: "999px",
                padding: "4px",
                boxShadow: "0 6px 16px rgba(76,52,140,0.10)",
              }}
            >
              <motion.span
                aria-hidden="true"
                animate={{ left: v.indLeft }}
                transition={{ duration: reduced ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  top: "4px",
                  bottom: "4px",
                  width: "134px",
                  borderRadius: "999px",
                  background: "#6C3FFA",
                  boxShadow: "0 6px 16px rgba(108,63,250,0.35)",
                }}
              ></motion.span>
              <button
                role="tab"
                aria-selected={v.freeSel}
                onClick={v.pickFree}
                className="hb-ease"
                style={{
                  position: "relative",
                  font: "inherit",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "999px",
                  padding: "10px 0",
                  cursor: "pointer",
                  border: "0",
                  background: "transparent",
                  color: v.freeTabInk,
                }}
              >
                {"Unipal Free"}
              </button>
              <button
                role="tab"
                aria-selected={v.haibaSel}
                onClick={v.pickHaiba}
                className="hb-ease"
                style={{
                  position: "relative",
                  font: "inherit",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "999px",
                  padding: "10px 0",
                  cursor: "pointer",
                  border: "0",
                  background: "transparent",
                  color: v.haibaTabInk,
                }}
              >
                {"Haiba"}
              </button>
            </div>
          </div>
          {v.isHaiba ? (
            <>
              <div
                className="hb-rise"
                style={{
                  marginTop: "18px",
                  background: "#FFFFFF",
                  borderRadius: "30px",
                  overflow: "hidden",
                  boxShadow: "0 18px 40px rgba(76,52,140,0.16)",
                }}
              >
                <div
                  className="hb-plan-artwork"
                  style={{
                    position: "relative",
                    height: "210px",
                    background: "linear-gradient(135deg, #6C3FFA 0%, #4F25D6 100%)",
                    padding: "22px",
                    boxSizing: "border-box",
                    color: "#FFFFFF",
                    overflow: "hidden",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-60px",
                      bottom: "-90px",
                      width: "220px",
                      height: "220px",
                      borderRadius: "50%",
                      border: "2px dashed rgba(192,244,2,0.35)",
                    }}
                  ></span>
                  <img
                    src="/haiba/logo-lime.svg"
                    alt="Haiba"
                    style={{
                      display: "block",
                      height: "44px",
                      width: "auto",
                      marginTop: "10px",
                      position: "relative",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                      fontSize: "34px",
                      fontWeight: "800",
                      letterSpacing: "-0.03em",
                      marginTop: "26px",
                      lineHeight: "1",
                      position: "relative",
                    }}
                  >
                    {"BHD 19.80"}
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "700",
                        letterSpacing: "0",
                        color: "#E4DBFF",
                      }}
                    >
                      {" / year"}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#E4DBFF",
                      marginTop: "8px",
                      position: "relative",
                    }}
                  >
                    {"or BHD 2.20 a month \u00b7 includes VAT"}
                  </div>
                  <span
                    className="hb-peek"
                    style={{ position: "absolute", right: "0", bottom: "-78px", display: "block" }}
                  >
                    <img
                      src="/haiba/birds/04-peek.png"
                      alt="The Unipal bird giving a thumbs up"
                      style={{
                        height: "280px",
                        width: "auto",
                        display: "block",
                        filter: "drop-shadow(0 12px 14px rgba(20,8,60,0.35))",
                      }}
                    />
                  </span>
                </div>
                <div
                  style={{
                    padding: "6px 20px 18px 20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#6B6880",
                      padding: "14px 0 2px 0",
                    }}
                  >
                    {"What you get"}
                  </div>
                  <div className="hb-stagger" style={{ display: "flex", flexDirection: "column" }}>
                    {(v.highlights || []).map((k: any, idx0: number) => (
                      <Fragment key={idx0}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "14px",
                            padding: "12px 0",
                          }}
                        >
                          <span
                            style={{
                              width: "26px",
                              height: "26px",
                              flex: "none",
                              borderRadius: "50%",
                              background: "#1E1B2E",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginTop: "1px",
                            }}
                          >
                            <svg
                              aria-hidden="true"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#C0F402"
                              strokeWidth="3.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                            </svg>
                          </span>
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                              flex: "1",
                              minWidth: "0",
                            }}
                          >
                            <span
                              style={{ fontSize: "16.5px", fontWeight: "600", lineHeight: "1.3" }}
                            >
                              {k.title}
                            </span>
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#6B6880",
                                lineHeight: "1.35",
                              }}
                            >
                              {k.sub}
                            </span>
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <Link
                    style={{
                      marginTop: "6px",
                      alignSelf: "flex-start",
                      fontSize: "15px",
                      fontWeight: "600",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    to="/haiba/points"
                  >
                    {"How points work"}
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </>
          ) : null}
          {v.isFree ? (
            <>
              <div
                className="hb-rise"
                style={{
                  marginTop: "18px",
                  background: "#FFFFFF",
                  borderRadius: "30px",
                  overflow: "hidden",
                  boxShadow: "0 14px 30px rgba(30,27,46,0.10)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "150px",
                    background: "#E4E2EB",
                    padding: "20px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                      fontSize: "32px",
                      fontWeight: "800",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {"Unipal Free"}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#3B3654",
                      marginTop: "2px",
                    }}
                  >
                    {"Your plan today"}
                  </div>
                  <span
                    className="hb-peek"
                    style={{
                      position: "absolute",
                      right: "12px",
                      bottom: "-34px",
                      display: "block",
                    }}
                  >
                    <img
                      src="/haiba/birds/05-shrug.png"
                      alt="The Unipal bird shrugging"
                      style={{
                        height: "160px",
                        width: "auto",
                        display: "block",
                        filter: "drop-shadow(0 8px 10px rgba(30,27,46,0.18))",
                      }}
                    />
                  </span>
                </div>
                <div
                  className="hb-stagger"
                  style={{
                    padding: "6px 20px 18px 20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "14px",
                      padding: "12px 0",
                    }}
                  >
                    <span
                      style={{
                        width: "26px",
                        height: "26px",
                        flex: "none",
                        borderRadius: "50%",
                        background: "#1E1B2E",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span style={{ fontSize: "16.5px", fontWeight: "600", lineHeight: "1.3" }}>
                      {"Student offers at 390+ shops"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "14px",
                      padding: "12px 0",
                    }}
                  >
                    <span
                      style={{
                        width: "26px",
                        height: "26px",
                        flex: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#6C3FFA",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <rect x="4" y="10" width="16" height="12" rx="3"></rect>
                        <path
                          d="M8 10V7a4 4 0 0 1 8 0v3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                        ></path>
                      </svg>
                    </span>
                    <span
                      style={{
                        fontSize: "16.5px",
                        fontWeight: "600",
                        lineHeight: "1.3",
                        color: "#3B3654",
                      }}
                    >
                      {"Points, rewards and Unipass gifts come with Haiba"}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          <div
            className="hb-rise hb-d2"
            style={{
              marginTop: "26px",
              background: "#FFFFFF",
              borderRadius: "28px",
              padding: "18px 16px 20px 16px",
              boxShadow: "0 10px 26px rgba(76,52,140,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 4px" }}>
              {v.isHaiba ? (
                <>
                  <span
                    className="hb-pop"
                    style={{
                      width: "26px",
                      height: "26px",
                      flex: "none",
                      borderRadius: "50%",
                      background: "#1E1B2E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C0F402"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                </>
              ) : null}
              {v.isFree ? (
                <>
                  <span
                    className="hb-pop"
                    style={{
                      width: "26px",
                      height: "26px",
                      flex: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#6C3FFA",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <rect x="4" y="10" width="16" height="12" rx="3"></rect>
                      <path
                        d="M8 10V7a4 4 0 0 1 8 0v3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                      ></path>
                    </svg>
                  </span>
                </>
              ) : null}
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                  fontSize: "17px",
                  fontWeight: "800",
                  letterSpacing: "-0.01em",
                  color: "#1E1B2E",
                }}
              >
                {v.giftHead}
              </span>
            </div>
            <div
              className="hb-pops"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "18px 8px",
                marginTop: "20px",
              }}
            >
              {(v.gifts || []).map((g: any, idx0: number) => (
                <Fragment key={idx0}>
                  <a
                    className="hb-lift"
                    style={{
                      textDecoration: "none",
                      color: "#1E1B2E",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      textAlign: "center",
                    }}
                    href="#"
                    onClick={(e: any) => e.preventDefault()}
                  >
                    <span
                      style={{
                        position: "relative",
                        width: "68px",
                        height: "68px",
                        borderRadius: "20px",
                        background: g.bg,
                        color: g.ink,
                        fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                        fontSize: "22px",
                        fontWeight: "800",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 16px rgba(30,27,46,0.14)",
                      }}
                    >
                      {g.mark}
                      <span
                        className="hb-ease"
                        style={{
                          position: "absolute",
                          right: "-6px",
                          bottom: "-6px",
                          width: "26px",
                          height: "26px",
                          borderRadius: "50%",
                          background: "#FFFFFF",
                          border: "1.5px solid #D9D6E3",
                          color: "#1E1B2E",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: v.lockOp,
                          transform: `scale(${v.lockScale})`,
                        }}
                      >
                        <svg
                          aria-hidden="true"
                          width="12"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <rect x="4" y="10" width="16" height="12" rx="3"></rect>
                          <path
                            d="M8 10V7a4 4 0 0 1 8 0v3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.6"
                          ></path>
                        </svg>
                      </span>
                    </span>
                    <span
                      style={{
                        fontSize: "13.5px",
                        fontWeight: "600",
                        lineHeight: "1.25",
                        color: "#2E2A40",
                      }}
                    >
                      {g.label}
                    </span>
                  </a>
                </Fragment>
              ))}
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "16px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#3B3654",
              }}
            >
              {"Plus 7 more brands. Pick 1 every month."}
            </div>
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              marginTop: "26px",
              background: "#FFFFFF",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 10px 26px rgba(76,52,140,0.08)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) 76px 104px",
                borderBottom: "1px solid #ECEAF3",
              }}
            >
              <span></span>
              <span
                className="hb-ease"
                style={{
                  padding: "16px 4px",
                  borderLeft: "1px solid #ECEAF3",
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: v.freeColInk,
                  background: v.freeColBg,
                }}
              >
                {"Free"}
              </span>
              <span
                className="hb-ease"
                style={{
                  padding: "16px 4px",
                  borderLeft: "1px solid #ECEAF3",
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#6C3FFA",
                  background: v.haibaColBg,
                }}
              >
                {"Haiba"}
              </span>
            </div>
            <div className="hb-stagger">
              {(v.table || []).map((r: any, idx0: number) => (
                <Fragment key={idx0}>
                  <div
                    className="hb-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1fr) 76px 104px",
                      borderBottom: r.rule,
                    }}
                  >
                    <span
                      style={{
                        padding: "16px 14px",
                        fontSize: "15px",
                        fontWeight: "600",
                        lineHeight: "1.3",
                      }}
                    >
                      {r.label}
                    </span>
                    <span
                      className="hb-ease"
                      style={{
                        padding: "16px 4px",
                        borderLeft: "1px solid #ECEAF3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        fontSize: "15px",
                        fontWeight: "600",
                        color: r.freeInk,
                        background: v.freeColBg,
                      }}
                    >
                      {r.free}
                    </span>
                    <span
                      className="hb-ease"
                      style={{
                        padding: "16px 6px",
                        borderLeft: "1px solid #ECEAF3",
                        background: v.haibaColBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        fontSize: "15px",
                        fontWeight: "700",
                        color: r.haibaInk,
                      }}
                    >
                      {r.haiba}
                    </span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6B6880",
              marginTop: "30px",
              padding: "0 4px",
            }}
          >
            {"Good to know"}
          </div>
          <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "16px",
                display: "flex",
                gap: "14px",
                alignItems: "center",
                boxShadow: "0 8px 20px rgba(76,52,140,0.06)",
              }}
            >
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  flex: "none",
                  borderRadius: "50%",
                  border: "1.5px solid #1E1B2E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: "800",
                }}
              >
                {"BHD"}
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  {"You pay BHD 19.80 a year"}
                </span>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#6B6880" }}>
                  {"Includes VAT. Or BHD 2.20 a month"}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="hb-fixed-bottom">
          <div className="hb-fixed-inner">
            <div
              style={{
                position: "absolute",
                left: "0",
                right: "0",
                bottom: "0",
                padding: "36px 16px 22px 16px",
                background: "linear-gradient(180deg, rgba(243,240,250,0) 0%, #F3F0FA 30%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "6px",
              }}
            >
              <Link
                className="hb-press"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  background: "#1E1B2E",
                  borderRadius: "999px",
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  boxShadow: "0 10px 24px rgba(30,27,46,0.22)",
                }}
                to="/haiba/welcome"
                onClick={() => hb.join()}
              >
                <span
                  style={{
                    color: "#C0F402",
                    fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                    fontSize: "17px",
                    fontWeight: "800",
                  }}
                >
                  {v.ctaTitle}
                </span>
                <span style={{ color: "#CFC9E0", fontSize: "13.5px", fontWeight: "500" }}>
                  {"BHD 19.80 a year \u00b7 includes VAT"}
                </span>
              </Link>
              <a
                className="hb-press"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  color: "#1E1B2E",
                  fontSize: "16px",
                  fontWeight: "600",
                  padding: "12px 16px",
                }}
                href="#"
                onClick={(e: any) => {
                  e.preventDefault();
                  go("/");
                }}
              >
                {"No, thanks"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
