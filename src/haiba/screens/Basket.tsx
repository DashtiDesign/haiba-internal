import Artwork from "../Artwork";
// @ts-nocheck
// Ported 1:1 from the Design canvas board "Basket.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import { useVals } from "../logic/basket";

export default function Basket() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-basket">
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          margin: "0 auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          background: "#F8F8F8",
          fontFamily: "Figtree, system-ui, sans-serif",
          color: "#1A1A1A",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {v.editing ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "64px 16px 18px 16px",
              }}
            >
              <Link
                aria-label="Back"
                style={{
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1A1A1A",
                  textDecoration: "none",
                }}
                to="/shop/coffee-bean"
              >
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5"></path>
                  <path d="M11 6l-6 6 6 6"></path>
                </svg>
              </Link>
              <span style={{ fontSize: "18px", fontWeight: "700" }}>{"Your basket"}</span>
            </div>
            <div
              className="hb-stagger"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "0 16px 160px 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#FFFFFF",
                  border: "1px solid #E4E4EA",
                  borderRadius: "16px",
                  padding: "12px 14px",
                }}
              >
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    flex: "none",
                    borderRadius: "12px",
                    background: "#4B2E83",
                    color: "#FFFFFF",
                    fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                    fontSize: "14px",
                    fontWeight: "800",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {"CB"}
                </span>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    flex: "1",
                    minWidth: "0",
                  }}
                >
                  <span style={{ fontSize: "15px", fontWeight: "700" }}>
                    {"The Coffee Bean & Tea Leaf"}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: "500", color: "#6B6B78" }}>
                    {"One shop per basket"}
                  </span>
                </span>
                <Link
                  style={{ fontSize: "14px", fontWeight: "600", textDecoration: "none" }}
                  to="/shop/coffee-bean"
                >
                  {"Add more"}
                </Link>
              </div>
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E4E4EA",
                  borderRadius: "20px",
                  padding: "4px 16px",
                }}
              >
                {(v.items || []).map((it: any, idx0: number) => (
                  <Fragment key={idx0}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "14px 0",
                        borderBottom: it.rule,
                      }}
                    >
                      <span
                        style={{
                          width: "56px",
                          height: "56px",
                          flex: "none",
                          borderRadius: "14px",
                          background: it.bg,
                          color: it.ink,
                          fontSize: "10px",
                          fontWeight: "800",
                          letterSpacing: "0.06em",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          lineHeight: "1.2",
                        }}
                      >
                        {it.ph}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                          flex: "1",
                          minWidth: "0",
                        }}
                      >
                        <span style={{ fontSize: "16px", fontWeight: "700" }}>{it.name}</span>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#4F25D6" }}>
                          {it.line}
                        </span>
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                          background: "#1E1B2E",
                          color: "#FFFFFF",
                          borderRadius: "999px",
                          padding: "3px",
                          flex: "none",
                        }}
                      >
                        <button
                          onClick={it.remove}
                          aria-label="Remove one"
                          className="hb-press"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            border: "0",
                            background: "transparent",
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0",
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            aria-hidden="true"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                          >
                            <path d="M5 12h14"></path>
                          </svg>
                        </button>
                        <span
                          style={{
                            minWidth: "18px",
                            textAlign: "center",
                            fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                            fontSize: "15px",
                            fontWeight: "800",
                            color: "#C0F402",
                          }}
                        >
                          {it.qty}
                        </span>
                        <button
                          onClick={it.add}
                          aria-label="Add one"
                          className="hb-press"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            border: "0",
                            background: "transparent",
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0",
                            cursor: "pointer",
                            opacity: it.addOp,
                          }}
                        >
                          <svg
                            aria-hidden="true"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                          >
                            <path d="M12 5v14M5 12h14"></path>
                          </svg>
                        </button>
                      </span>
                    </div>
                  </Fragment>
                ))}
                {v.empty ? (
                  <>
                    <div
                      style={{
                        padding: "18px 0 22px 0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                        textAlign: "center",
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "#6B6B78",
                      }}
                    >
                      <Artwork priority
                        src="/haiba/birds/14-sit.png"
                        alt=""
                        style={{ height: "130px", width: "auto", display: "block" }}
                      />
                      {"Your basket is empty. "}
                      <Link
                        style={{ textDecoration: "none", fontWeight: "700" }}
                        to="/shop/coffee-bean"
                      >
                        {"Add items"}
                      </Link>
                    </div>
                  </>
                ) : null}
              </div>
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E4E4EA",
                  borderRadius: "20px",
                  padding: "18px 18px 16px 18px",
                }}
              >
                <div style={{ fontSize: "17px", fontWeight: "700" }}>{"Summary"}</div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "14px",
                  }}
                >
                  {(v.items || []).map((it: any, idx0: number) => (
                    <Fragment key={idx0}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          gap: "12px",
                        }}
                      >
                        <span style={{ fontSize: "15px", fontWeight: "500", color: "#3A3A44" }}>
                          {it.sumLabel}
                        </span>
                        <span
                          className="hb-ease"
                          style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            color: "#1A1A1A",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {it.sumPts}
                        </span>
                      </div>
                    </Fragment>
                  ))}
                </div>
                <div style={{ height: "1px", background: "#EFEFF3", margin: "14px 0" }}></div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "17px", fontWeight: "700" }}>{"Total"}</span>
                  <span
                    className="hb-ease"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                      fontSize: "20px",
                      fontWeight: "800",
                      letterSpacing: "-0.01em",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {v.usedLine}
                  </span>
                </div>
                <div style={{ height: "1px", background: "#EFEFF3", margin: "14px 0" }}></div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "12px",
                    }}
                  >
                    <span style={{ fontSize: "15px", fontWeight: "500", color: "#6B6B78" }}>
                      {"Your points"}
                    </span>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#1A1A1A",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {v.haveLine}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "12px",
                    }}
                  >
                    <span style={{ fontSize: "15px", fontWeight: "500", color: "#6B6B78" }}>
                      {"Left after this"}
                    </span>
                    <span
                      className="hb-ease"
                      style={{
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#1E7A34",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {v.leftLine}
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E4E4EA",
                  borderRadius: "20px",
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div style={{ fontSize: "17px", fontWeight: "700" }}>{"What happens next"}</div>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      flex: "none",
                      borderRadius: "50%",
                      background: "#F0ECFF",
                      color: "#4F25D6",
                      fontSize: "13px",
                      fontWeight: "800",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {"1"}
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      lineHeight: "1.4",
                      color: "#3A3A44",
                    }}
                  >
                    <b style={{ fontWeight: "700", color: "#1A1A1A" }}>{"Your points are held"}</b>
                    {", not spent. Cancel any code and they come back."}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      flex: "none",
                      borderRadius: "50%",
                      background: "#F0ECFF",
                      color: "#4F25D6",
                      fontSize: "13px",
                      fontWeight: "800",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {"2"}
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      lineHeight: "1.4",
                      color: "#3A3A44",
                    }}
                  >
                    <b style={{ fontWeight: "700", color: "#1A1A1A" }}>{"One code per item"}</b>
                    {" goes to My codes. Each code lasts 30 days."}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      flex: "none",
                      borderRadius: "50%",
                      background: "#F0ECFF",
                      color: "#4F25D6",
                      fontSize: "13px",
                      fontWeight: "800",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {"3"}
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      lineHeight: "1.4",
                      color: "#3A3A44",
                    }}
                  >
                    <b style={{ fontWeight: "700", color: "#1A1A1A" }}>
                      {"Show a code at the till."}
                    </b>
                    {" Staff see your name, photo and Unipal ID, then the points are used."}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#FFFFFF",
                  border: "1px solid #E4E4EA",
                  borderRadius: "16px",
                  padding: "12px 14px",
                }}
              >
                <span
                  style={{
                    width: "44px",
                    height: "44px",
                    flex: "none",
                    borderRadius: "50%",
                    background: "#C0F402",
                    color: "#1F2600",
                    fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                    fontSize: "14px",
                    fontWeight: "800",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {"SA"}
                </span>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    flex: "1",
                    minWidth: "0",
                  }}
                >
                  <span style={{ fontSize: "15px", fontWeight: "700" }}>{"Sara Ahmed"}</span>
                  <span style={{ fontSize: "13px", fontWeight: "500", color: "#6B6B78" }}>
                    {"Unipal ID 48 213 \u00b7 staff will check this"}
                  </span>
                </span>
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1E7A34"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
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
                    padding: "30px 16px 22px 16px",
                    background: "linear-gradient(180deg, rgba(248,248,248,0) 0%, #F8F8F8 30%)",
                  }}
                >
                  <button
                    onClick={v.confirm}
                    className="hb-press"
                    style={{
                      width: "100%",
                      font: "inherit",
                      border: "0",
                      borderRadius: "999px",
                      padding: "16px",
                      cursor: "pointer",
                      background: v.ctaBg,
                      color: v.ctaInk,
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      alignItems: "center",
                      boxShadow: "0 10px 24px rgba(30,27,46,0.2)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                        fontSize: "17px",
                        fontWeight: "800",
                      }}
                    >
                      {v.ctaTitle}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "500",
                        opacity: v.empty ? "1" : "0.8",
                      }}
                    >
                      {v.ctaSub}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
        {v.done ? (
          <>
            <div
              style={{
                position: "absolute",
                left: "0",
                right: "0",
                top: "0",
                height: "330px",
                background: "linear-gradient(180deg, #D6C6FF 0%, #E3D8FF 100%)",
              }}
            ></div>
            <svg
              aria-hidden="true"
              width="390"
              height="26"
              viewBox="0 0 390 26"
              preserveAspectRatio="none"
              style={{ position: "absolute", left: "0", top: "316px", display: "block" }}
            >
              <path
                d="M0 0c13 16 26 16 39 0s26 16 39 0 26 16 39 0 26 16 39 0 26 16 39 0 26 16 39 0 26 16 39 0 26 16 39 0 26 16 39 0 26 16 39 0V26H0z"
                fill="#F8F8F8"
              ></path>
            </svg>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "64px 16px 0 16px",
              }}
            >
              <span style={{ width: "36px" }}></span>
              <Link
                aria-label="Close"
                className="hb-press"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.8)",
                  color: "#1A1A1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
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
                >
                  <path d="M6 6l12 12M18 6L6 18"></path>
                </svg>
              </Link>
            </div>
            <div
              style={{
                position: "relative",
                height: "200px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Artwork priority
                src={v.heroSrc}
                alt=""
                style={{
                  height: "214px",
                  width: "auto",
                  display: "block",
                  filter: "drop-shadow(0 14px 14px rgba(30,27,46,0.2))",
                }}
              />
              <span
                className="hb-pop"
                style={{ position: "absolute", left: "36px", top: "20px", display: "block" }}
              >
                <span
                  style={{
                    display: "block",
                    background: "#1E1B2E",
                    color: "#C0F402",
                    fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                    fontSize: "15px",
                    fontWeight: "800",
                    borderRadius: "999px",
                    padding: "8px 14px",
                    transform: "rotate(-6deg)",
                    boxShadow: "0 8px 18px rgba(30,27,46,0.2)",
                  }}
                >
                  {v.heldBadge}
                </span>
              </span>
            </div>
            <div
              style={{
                position: "relative",
                padding: "40px 16px 120px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                className="hb-rise"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                    fontSize: "28px",
                    fontWeight: "800",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {v.doneTitle}
                </span>
                <span style={{ fontSize: "15px", fontWeight: "500", color: "#6B6B78" }}>
                  {"Show one at the till at The Coffee Bean. Use by 20 Nov."}
                </span>
              </div>
              <div
                className="hb-flips"
                style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                {(v.codes || []).map((c: any, idx0: number) => (
                  <Fragment key={idx0}>
                    <div
                      style={{
                        background: c.bg,
                        color: c.ink,
                        borderRadius: "20px",
                        padding: "18px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        boxShadow: c.shadow,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          right: "-40px",
                          top: "-50px",
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                          border: `2px dashed ${c.ringLine}`,
                        }}
                      ></span>
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            opacity: "0.8",
                          }}
                        >
                          {c.kind}
                        </span>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            background: c.pillBg,
                            color: c.pillInk,
                            borderRadius: "999px",
                            padding: "4px 10px",
                          }}
                        >
                          {c.status}
                        </span>
                      </div>
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            width: "48px",
                            height: "48px",
                            flex: "none",
                            borderRadius: "14px",
                            background: c.phBg,
                            color: c.phInk,
                            fontSize: "9px",
                            fontWeight: "800",
                            letterSpacing: "0.06em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            lineHeight: "1.2",
                          }}
                        >
                          {c.ph}
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
                            style={{
                              fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                              fontSize: "20px",
                              fontWeight: "800",
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {c.name}
                          </span>
                          <span style={{ fontSize: "13px", fontWeight: "600", opacity: "0.8" }}>
                            {c.ptsLine}
                          </span>
                        </span>
                      </div>
                      {c.live ? (
                        <>
                          <div
                            style={{
                              position: "relative",
                              background: "#FFFFFF",
                              color: "#1E1B2E",
                              borderRadius: "14px",
                              padding: "12px",
                              textAlign: "center",
                              fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                              fontSize: "26px",
                              fontWeight: "800",
                              letterSpacing: "0.08em",
                            }}
                          >
                            {c.code}
                          </div>
                          <div
                            style={{
                              position: "relative",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: "600",
                                opacity: "0.85",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <svg
                                aria-hidden="true"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.6"
                                strokeLinecap="round"
                              >
                                <circle cx="12" cy="13" r="8"></circle>
                                <path d="M12 9v4l2.5 2"></path>
                                <path d="M9 2h6"></path>
                              </svg>
                              {"30 days left"}
                            </span>
                            <button
                              onClick={c.cancel}
                              className="hb-press"
                              style={{
                                font: "inherit",
                                fontSize: "13px",
                                fontWeight: "700",
                                border: "0",
                                background: "rgba(255,255,255,0.16)",
                                color: "inherit",
                                borderRadius: "999px",
                                padding: "8px 12px",
                                cursor: "pointer",
                              }}
                            >
                              {"Cancel, get points back"}
                            </button>
                          </div>
                          <button
                            onClick={c.accept}
                            className="hb-press"
                            style={{
                              position: "relative",
                              font: "inherit",
                              fontSize: "13px",
                              fontWeight: "700",
                              border: "1.5px dashed rgba(255,255,255,0.45)",
                              background: "transparent",
                              color: "#FFFFFF",
                              borderRadius: "12px",
                              padding: "10px",
                              cursor: "pointer",
                            }}
                          >
                            {"Prototype: shop accepts this code"}
                          </button>
                        </>
                      ) : null}
                      {c.acc ? (
                        <>
                          <Artwork
                            src="/haiba/birds/15-receipt.png"
                            alt=""
                            className="hb-pop"
                            style={{
                              position: "absolute",
                              right: "-6px",
                              bottom: "-34px",
                              height: "150px",
                              width: "auto",
                              filter: "drop-shadow(0 8px 10px rgba(31,38,0,0.25))",
                            }}
                          />
                          <div
                            className="hb-rise"
                            style={{
                              position: "relative",
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                              maxWidth: "220px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: "700",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#3D5000",
                              }}
                            >
                              {"You saved"}
                            </span>
                            <span
                              style={{
                                fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                                fontSize: "34px",
                                fontWeight: "800",
                                letterSpacing: "-0.03em",
                                lineHeight: "1",
                              }}
                            >
                              {c.saved}
                            </span>
                            <span style={{ fontSize: "13px", fontWeight: "600", color: "#3D5000" }}>
                              {"Accepted at The Coffee Bean, Juffair"}
                            </span>
                          </div>
                        </>
                      ) : null}
                      {c.gone ? (
                        <>
                          <div
                            className="hb-rise"
                            style={{
                              position: "relative",
                              fontSize: "14px",
                              fontWeight: "600",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <svg
                              aria-hidden="true"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#1E7A34"
                              strokeWidth="2.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                            </svg>
                            {c.pts}
                            {" points are back in your wallet."}
                          </div>
                          <Artwork
                            src="/haiba/birds/16-torn.png"
                            alt=""
                            className="hb-pop"
                            style={{
                              position: "absolute",
                              right: "8px",
                              bottom: "-40px",
                              height: "128px",
                              width: "auto",
                              opacity: "0.9",
                            }}
                          />
                        </>
                      ) : null}
                    </div>
                  </Fragment>
                ))}
              </div>
              <div
                className="hb-rise"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#FFFFFF",
                  border: "1px solid #E4E4EA",
                  borderRadius: "16px",
                  padding: "12px 14px",
                }}
              >
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    flex: "none",
                    borderRadius: "50%",
                    background: "#6C3FFA",
                    boxShadow: "inset 0 0 0 7px #C0F402",
                  }}
                ></span>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    flex: "1",
                    minWidth: "0",
                  }}
                >
                  <span style={{ fontSize: "15px", fontWeight: "700" }}>{v.walletLine}</span>
                  <span style={{ fontSize: "13px", fontWeight: "500", color: "#6B6B78" }}>
                    {v.walletSub}
                  </span>
                </span>
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
                    padding: "30px 16px 22px 16px",
                    background: "linear-gradient(180deg, rgba(248,248,248,0) 0%, #F8F8F8 30%)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <Link
                    className="hb-press"
                    style={{
                      textDecoration: "none",
                      textAlign: "center",
                      background: "#1E1B2E",
                      color: "#C0F402",
                      fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                      fontSize: "17px",
                      fontWeight: "800",
                      borderRadius: "999px",
                      padding: "17px 16px",
                      boxShadow: "0 10px 24px rgba(30,27,46,0.22)",
                    }}
                    to="/haiba/wallet"
                  >
                    {"Open My codes"}
                  </Link>
                  <button
                    onClick={v.reset}
                    className="hb-press"
                    style={{
                      font: "inherit",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#6B6B78",
                      background: "transparent",
                      border: "0",
                      padding: "10px",
                      cursor: "pointer",
                    }}
                  >
                    {"Start again (prototype)"}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
