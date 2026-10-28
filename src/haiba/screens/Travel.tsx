// @ts-nocheck
// Ported 1:1 from the Design canvas board "Travel.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/travel";

export default function Travel() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-travel">
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
            background: "linear-gradient(160deg, #6C3FFA 0%, #3E1BB8 100%)",
            color: "#FFFFFF",
            padding: "14px 20px 120px 20px",
            overflow: "hidden",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-80px",
              top: "30px",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              border: "2px dashed rgba(192,244,2,0.35)",
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
            <Link
              aria-label="Back"
              className="hb-press"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(255,255,255,0.12)",
                color: "#FFFFFF",
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
                strokeLinejoin="round"
              >
                <path d="M19 12H5"></path>
                <path d="M11 6l-6 6 6 6"></path>
              </svg>
            </Link>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#E4DBFF",
              }}
            >
              {"Free travel data"}
            </span>
            <span style={{ width: "44px" }}></span>
          </div>
          <h1
            className="hb-rise"
            style={{
              position: "relative",
              margin: "26px 0 0 0",
              fontSize: "32px",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.08",
            }}
          >
            {"Travel to another Unipal country? "}
            <span style={{ color: "#C0F402" }}>{"We\u2019ve got you."}</span>
          </h1>
          <div
            className="hb-rise hb-d1"
            style={{
              position: "relative",
              fontSize: "16px",
              fontWeight: "600",
              color: "#E4DBFF",
              marginTop: "12px",
              lineHeight: "1.45",
            }}
          >
            {
              "Unipal is in 4 countries. Wherever you land, your deals work there too. We give you the data to use them."
            }
          </div>
          <div className="hb-rise hb-d2" style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                marginTop: "16px",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "12.5%",
                  right: "12.5%",
                  top: "19px",
                  borderTop: "2px dashed rgba(192,244,2,0.6)",
                }}
              ></span>
              {(v.route || []).map((f: any, idx0: number) => (
                <Fragment key={idx0}>
                  <span
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "7px",
                    }}
                  >
                    <Artwork
                      priority
                      src={f.src}
                      alt={f.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        objectPosition: f.pos,
                        display: "block",
                        boxShadow: "0 0 0 3px #4F25D6",
                      }}
                    />
                    <span style={{ fontSize: "12.5px", fontWeight: "800", color: f.labelInk }}>
                      {f.label}
                    </span>
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
          <div
            className="hb-rise hb-d2"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "18px",
              fontSize: "13px",
              fontWeight: "700",
              color: "#E4DBFF",
            }}
          >
            {"Free data from Haiba, powered by "}
            <Artwork
              src="/haiba/brands/airalo-white.svg"
              alt="Airalo"
              style={{ height: "18px", width: "auto", display: "block" }}
            />
          </div>
        </div>
        <div style={{ position: "relative", marginTop: "-96px", padding: "0 16px 200px 16px" }}>
          <div
            className="hb-rise hb-d2"
            style={{
              position: "relative",
              background: "#1E1B2E",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 18px 40px rgba(30,27,46,0.30)",
              overflow: "hidden",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "-40px",
                bottom: "-60px",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                border: "2px dashed rgba(192,244,2,0.30)",
              }}
            ></span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#B9B3CC",
                }}
              >
                {"Your free plan"}
              </span>
              <span
                style={{
                  fontSize: "12.5px",
                  fontWeight: "800",
                  borderRadius: "999px",
                  padding: "5px 10px",
                  background: v.statusBg,
                  color: v.statusInk,
                }}
              >
                {v.status}
              </span>
            </div>
            <div
              style={{ display: "flex", alignItems: "baseline", gap: "10px", marginTop: "10px" }}
            >
              <span
                style={{
                  fontSize: "64px",
                  fontWeight: "800",
                  letterSpacing: "-0.04em",
                  lineHeight: "1",
                  color: "#C0F402",
                }}
              >
                {"5GB"}
              </span>
              <span style={{ fontSize: "18px", fontWeight: "800" }}>{"for 7 days"}</span>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
              <span
                style={{
                  background: "rgba(255,255,255,0.10)",
                  borderRadius: "999px",
                  padding: "7px 12px",
                  fontSize: "13.5px",
                  fontWeight: "700",
                }}
              >
                {"Worth BHD 5+"}
              </span>
              <span
                style={{
                  background: "rgba(255,255,255,0.10)",
                  borderRadius: "999px",
                  padding: "7px 12px",
                  fontSize: "13.5px",
                  fontWeight: "700",
                }}
              >
                {"No country to pick"}
              </span>
            </div>
          </div>
          {v.locked ? (
            <>
              <div
                className="hb-rise hb-d3"
                style={{
                  marginTop: "14px",
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "18px",
                  boxShadow: "0 0 0 1px #ECE8F5",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      width: "44px",
                      height: "44px",
                      flex: "none",
                      borderRadius: "14px",
                      background: "#F0ECFF",
                      color: "#6C3FFA",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="20"
                      height="22"
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
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "17px", fontWeight: "800" }}>
                      {"Unlocks after 3 months"}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#6B6880" }}>
                      {v.lockLine}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: "6px",
                    marginTop: "16px",
                  }}
                >
                  {(v.lockSteps || []).map((s: any, idx0: number) => (
                    <Fragment key={idx0}>
                      <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span
                          style={{ height: "8px", borderRadius: "999px", background: s.bg }}
                        ></span>
                        <span style={{ fontSize: "12.5px", fontWeight: "700", color: s.ink }}>
                          {s.label}
                        </span>
                      </span>
                    </Fragment>
                  ))}
                </div>
                <div
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "600",
                    color: "#4A4660",
                    marginTop: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  {"Yearly members get it from day one."}
                </div>
              </div>
            </>
          ) : null}
          {v.revealed ? (
            <>
              <div
                className="hb-pop"
                style={{
                  marginTop: "14px",
                  background: "linear-gradient(135deg, #6C3FFA 0%, #4F25D6 100%)",
                  color: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "18px",
                  transformOrigin: "top center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#E4DBFF",
                  }}
                >
                  <span>{"Your Airalo code"}</span>
                  <span>
                    {"Use by "}
                    {v.useBy}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "12px",
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    padding: "8px 8px 8px 14px",
                  }}
                >
                  <span
                    style={{
                      flex: "1",
                      color: "#1E1B2E",
                      fontSize: "22px",
                      fontWeight: "800",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {v.code}
                  </span>
                  <button
                    onClick={v.copy}
                    className="hb-press"
                    style={{
                      font: "inherit",
                      border: "0",
                      cursor: "pointer",
                      background: "#1E1B2E",
                      color: "#C0F402",
                      fontSize: "14px",
                      fontWeight: "800",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {v.copyLabel}
                  </button>
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "800",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#C0F402",
                    marginTop: "18px",
                  }}
                >
                  {"How to use it"}
                </div>
                {(v.steps || []).map((s: any, idx0: number) => (
                  <Fragment key={idx0}>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                        paddingTop: "12px",
                      }}
                    >
                      <span
                        style={{
                          width: "26px",
                          height: "26px",
                          flex: "none",
                          borderRadius: "50%",
                          background: "#C0F402",
                          color: "#1F2600",
                          fontSize: "13px",
                          fontWeight: "800",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {s.n}
                      </span>
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: "600",
                          lineHeight: "1.4",
                          paddingTop: "2px",
                        }}
                      >
                        {s.text}
                      </span>
                    </div>
                  </Fragment>
                ))}
                <div
                  style={{
                    marginTop: "16px",
                    paddingTop: "14px",
                    borderTop: "1px solid rgba(255,255,255,0.18)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#E4DBFF" }}>
                    {v.usedLine}
                  </span>
                  {v.canAccept ? (
                    <>
                      <button
                        onClick={v.accept}
                        aria-label="Prototype: Airalo accepts this code"
                        className="hb-press"
                        style={{
                          font: "inherit",
                          border: "1.5px dashed rgba(255,255,255,0.5)",
                          cursor: "pointer",
                          background: "transparent",
                          color: "#FFFFFF",
                          fontSize: "12.5px",
                          fontWeight: "700",
                          borderRadius: "999px",
                          padding: "7px 12px",
                        }}
                      >
                        {"Test: Airalo accepts"}
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
          <div
            style={{
              fontSize: "19px",
              fontWeight: "800",
              letterSpacing: "-0.02em",
              margin: "26px 4px 10px 4px",
            }}
          >
            {"Where you are covered"}
          </div>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "4px 16px",
              boxShadow: "0 0 0 1px #ECE8F5",
            }}
          >
            {(v.places || []).map((c: any, idx0: number) => (
              <Fragment key={idx0}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 0",
                    borderBottom: c.rule,
                  }}
                >
                  <Artwork
                    src={c.src}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      flex: "none",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: c.pos,
                      display: "block",
                      boxShadow: "0 0 0 1px rgba(30,27,46,0.10)",
                      opacity: c.op,
                    }}
                  />
                  <span style={{ display: "flex", flexDirection: "column", gap: "1px", flex: "1" }}>
                    <span style={{ fontSize: "16px", fontWeight: "800", color: c.nameInk }}>
                      {c.name}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
                      {c.sub}
                    </span>
                  </span>
                  <span
                    style={{
                      fontSize: "12.5px",
                      fontWeight: "800",
                      borderRadius: "999px",
                      padding: "5px 10px",
                      background: c.pillBg,
                      color: c.pillInk,
                    }}
                  >
                    {c.pill}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              fontSize: "13.5px",
              fontWeight: "600",
              color: "#6B6880",
              margin: "10px 4px 0 4px",
              lineHeight: "1.4",
            }}
          >
            {"No need to pick a country. One plan works in all of them."}
          </div>
          <div
            style={{
              fontSize: "19px",
              fontWeight: "800",
              letterSpacing: "-0.02em",
              margin: "26px 4px 10px 4px",
            }}
          >
            {"Good to know"}
          </div>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "6px 16px",
              boxShadow: "0 0 0 1px #ECE8F5",
            }}
          >
            {(v.rules || []).map((r: any, idx0: number) => (
              <Fragment key={idx0}>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    padding: "12px 0",
                    borderBottom: r.rule,
                  }}
                >
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      flex: "none",
                      borderRadius: "50%",
                      background: "#1E1B2E",
                      color: "#C0F402",
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
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span style={{ fontSize: "15px", fontWeight: "600", lineHeight: "1.4" }}>
                    {r.text}
                  </span>
                </div>
              </Fragment>
            ))}
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
                background: "linear-gradient(180deg, rgba(243,240,250,0) 0%, #F3F0FA 32%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "6px",
                zIndex: "5",
              }}
            >
              <button
                onClick={v.cta}
                className="hb-press hb-ease"
                style={{
                  font: "inherit",
                  border: "0",
                  cursor: "pointer",
                  textAlign: "center",
                  background: v.ctaBg,
                  color: v.ctaInk,
                  borderRadius: "999px",
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  boxShadow: "0 10px 24px rgba(30,27,46,0.22)",
                  opacity: v.ctaOp,
                }}
              >
                <span style={{ fontSize: "17px", fontWeight: "800" }}>{v.ctaTitle}</span>
                <span style={{ fontSize: "13.5px", fontWeight: "500", opacity: "0.85" }}>
                  {v.ctaSub}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
