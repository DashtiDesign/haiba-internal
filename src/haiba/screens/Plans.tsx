// @ts-nocheck
// Ported 1:1 from the Design canvas board "Plans.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/plans";

export default function Plans() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
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
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "18px",
                fontWeight: "800",
                letterSpacing: "-0.01em",
              }}
            >
              {"Haiba membership"}
            </span>
            <span style={{ width: "44px" }}></span>
          </div>
          {v.isHaiba ? (
            <>
              <div
                className="hb-rise"
                style={{
                  marginTop: "18px",
                  background: "#FFFFFF",
                  borderRadius: "16px",
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
                  <Artwork
                    priority
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
                      fontFamily: "Figtree, system-ui, sans-serif",
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
                    <Artwork
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
                    className="hb-press"
                    style={{
                      marginTop: "10px",
                      textDecoration: "none",
                      background: "#F0ECFF",
                      color: "#4F25D6",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                    to="/haiba/points"
                  >
                    <span
                      style={{
                        width: "32px",
                        height: "32px",
                        flex: "none",
                        borderRadius: "50%",
                        background: "#6C3FFA",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.2 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4.5"></path>
                        <path d="M12 18.2h.01"></path>
                      </svg>
                    </span>
                    <span
                      style={{ flex: "1", display: "flex", flexDirection: "column", gap: "1px" }}
                    >
                      <span style={{ fontSize: "15.5px", fontWeight: "800" }}>
                        {"How points work"}
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B5BB8" }}>
                        {"2x, 5x and what you can get"}
                      </span>
                    </span>
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flex: "none" }}
                    >
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </>
          ) : null}
          <div
            className="hb-rise hb-d2"
            role="tablist"
            aria-label="More about Haiba"
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              background: "#FFFFFF",
              borderRadius: "999px",
              padding: "4px",
              marginTop: "22px",
              boxShadow: "0 6px 16px rgba(76,52,140,0.08)",
            }}
          >
            <span
              aria-hidden="true"
              className="hb-ease"
              style={{
                position: "absolute",
                top: "4px",
                bottom: "4px",
                left: v.secLeft,
                width: "calc((100% - 8px) / 3)",
                borderRadius: "999px",
                background: "#1E1B2E",
              }}
            ></span>
            {(v.secs || []).map((t: any, idx0: number) => (
              <Fragment key={idx0}>
                <button
                  role="tab"
                  aria-selected={t.on}
                  onClick={t.pick}
                  className="hb-ease"
                  style={{
                    position: "relative",
                    font: "inherit",
                    fontSize: "14.5px",
                    fontWeight: "700",
                    border: "0",
                    background: "transparent",
                    padding: "11px 0",
                    borderRadius: "999px",
                    cursor: "pointer",
                    color: t.ink,
                  }}
                >
                  {t.label}
                </button>
              </Fragment>
            ))}
          </div>
          {v.secGifts ? (
            <>
              <div
                className="hb-rise"
                style={{
                  marginTop: "14px",
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "18px 16px 20px 16px",
                  boxShadow: "0 10px 26px rgba(76,52,140,0.08)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 4px" }}
                >
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
                      fontFamily: "Figtree, system-ui, sans-serif",
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
                            borderRadius: "16px",
                            background: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.10)",
                          }}
                        >
                          <Artwork
                            src={g.logo}
                            alt={g.brand}
                            style={{
                              width: "68px",
                              height: "68px",
                              borderRadius: "16px",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
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
                  {"Plus 6 more. Pick 1 every month."}
                </div>
              </div>
            </>
          ) : null}
          {v.secCompare ? (
            <>
              <div
                className="hb-rise"
                style={{
                  marginTop: "14px",
                  background: "#FFFFFF",
                  border: "1px solid #E2DCF2",
                  borderRadius: "16px",
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
                      fontWeight: "800",
                      color: "#FFFFFF",
                      background: "#6C3FFA",
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
            </>
          ) : null}
          {v.secYear ? (
            <>
              <div
                className="hb-rise"
                style={{
                  marginTop: "14px",
                  background: "#1E1B2E",
                  color: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "22px 20px 20px 20px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C0F402",
                  }}
                >
                  {"A year of Haiba"}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#CFC9E0",
                    marginTop: "14px",
                  }}
                >
                  {"How often do you use Unipal?"}
                </div>
                <div
                  role="radiogroup"
                  aria-label="Visits a month"
                  style={{
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                    background: "#2B2740",
                    borderRadius: "999px",
                    padding: "4px",
                    marginTop: "10px",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="hb-ease"
                    style={{
                      position: "absolute",
                      top: "4px",
                      bottom: "4px",
                      left: v.segLeft,
                      width: "calc((100% - 8px) / 4)",
                      borderRadius: "999px",
                      background: "#C0F402",
                    }}
                  ></span>
                  {(v.stops || []).map((s: any, idx0: number) => (
                    <Fragment key={idx0}>
                      <button
                        role="radio"
                        aria-checked={s.on}
                        aria-label={s.label}
                        onClick={s.pick}
                        className="hb-ease"
                        style={{
                          position: "relative",
                          font: "inherit",
                          border: "0",
                          background: "transparent",
                          cursor: "pointer",
                          padding: "10px 0",
                          borderRadius: "999px",
                          color: s.ink,
                          fontFamily: "Figtree, system-ui, sans-serif",
                          fontSize: "16px",
                          fontWeight: "800",
                        }}
                      >
                        {s.v}
                        <span
                          style={{
                            fontFamily: "Figtree, system-ui, sans-serif",
                            fontSize: "12px",
                            fontWeight: "600",
                            opacity: "0.7",
                          }}
                        >
                          {" /mo"}
                        </span>
                      </button>
                    </Fragment>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginTop: "24px",
                  }}
                >
                  <span
                    className="hb-ease"
                    style={{
                      fontFamily: "Figtree, system-ui, sans-serif",
                      fontSize: "46px",
                      fontWeight: "800",
                      letterSpacing: "-0.04em",
                      lineHeight: "1",
                      color: "#C0F402",
                    }}
                  >
                    {v.saveTotal}
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#E8E4F4" }}>
                    {"saved a year"}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "#CFC9E0",
                    lineHeight: "1.45",
                    marginTop: "8px",
                  }}
                >
                  {v.saveSub}
                </div>
                <div
                  style={{
                    position: "relative",
                    height: "10px",
                    marginTop: "18px",
                    borderRadius: "999px",
                    overflow: "hidden",
                    background: "#3A3550",
                  }}
                >
                  <span
                    className="hb-ease"
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "0",
                      bottom: "0",
                      width: v.costPct,
                      background: "#6C3FFA",
                    }}
                  ></span>
                  <span
                    className="hb-ease"
                    style={{
                      position: "absolute",
                      top: "0",
                      bottom: "0",
                      right: "0",
                      left: v.costPct,
                      background: "#C0F402",
                    }}
                  ></span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  <span style={{ color: "#B9B3CC" }}>{"Haiba costs BHD 19.80"}</span>
                  <span className="hb-ease" style={{ color: "#C0F402" }}>
                    {v.extraLine}
                  </span>
                </div>
                <div style={{ marginTop: "18px", borderTop: "1px solid #3A3550" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "44px minmax(0, 1fr) auto",
                      gap: "12px",
                      alignItems: "center",
                      padding: "14px 0",
                      borderBottom: "1px solid #3A3550",
                    }}
                  >
                    <span
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "14px",
                        background: "#C0F402",
                        color: "#1F2600",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
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
                        <path d="M20 12v9H4v-9M2 7h20v5H2zM12 7v14M12 7c-2-4-7-4-7-1s5 1 7 1zm0 0c2-4 7-4 7-1s-5 1-7 1z"></path>
                      </svg>
                    </span>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        minWidth: "0",
                      }}
                    >
                      <span style={{ fontSize: "16px", fontWeight: "700" }}>
                        {"12 Unipass gifts"}
                      </span>
                      <span style={{ fontSize: "13.5px", fontWeight: "500", color: "#B9B3CC" }}>
                        {"1 free item every month"}
                      </span>
                    </span>
                    <span
                      style={{
                        fontFamily: "Figtree, system-ui, sans-serif",
                        fontSize: "17px",
                        fontWeight: "800",
                        textAlign: "right",
                      }}
                    >
                      {"BHD 30.00"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "44px minmax(0, 1fr) auto",
                      gap: "12px",
                      alignItems: "center",
                      padding: "14px 0",
                    }}
                  >
                    <span
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "14px",
                        background: "#6C3FFA",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Artwork
                        src="/haiba/coins/coin-front.webp"
                        alt=""
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "contain",
                          display: "block",
                          flex: "none",
                        }}
                      />
                    </span>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        minWidth: "0",
                      }}
                    >
                      <span className="hb-ease" style={{ fontSize: "16px", fontWeight: "700" }}>
                        {v.ptsLine}
                      </span>
                      <span
                        className="hb-ease"
                        style={{ fontSize: "13.5px", fontWeight: "500", color: "#B9B3CC" }}
                      >
                        {v.ptsItems}
                      </span>
                    </span>
                    <span
                      className="hb-ease"
                      style={{
                        fontFamily: "Figtree, system-ui, sans-serif",
                        fontSize: "17px",
                        fontWeight: "800",
                        textAlign: "right",
                      }}
                    >
                      {v.ptsSave}
                    </span>
                    <span></span>
                    <span
                      className="hb-ease"
                      style={{
                        gridColumn: "2 / 4",
                        justifySelf: "start",
                        fontSize: "12.5px",
                        fontWeight: "700",
                        color: "#1F2600",
                        background: "#C0F402",
                        borderRadius: "999px",
                        padding: "4px 10px",
                      }}
                    >
                      {v.bonusLine}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12.5px",
                    fontWeight: "500",
                    color: "#8F89A8",
                    lineHeight: "1.45",
                    marginTop: "6px",
                  }}
                >
                  {
                    "Based on 1 new shop a month and the rest at your favourites. Unipass gifts are worth about BHD 2.50 each."
                  }
                </div>
              </div>
            </>
          ) : null}
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
                    fontFamily: "Figtree, system-ui, sans-serif",
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
