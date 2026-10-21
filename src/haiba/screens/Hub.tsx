// @ts-nocheck
// Ported 1:1 from the Design canvas board "Character.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import MotionReveal from "../MotionReveal";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import { useVals } from "../logic/hub";

export default function Hub() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-hub">
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
            height: "320px",
            background: "linear-gradient(180deg, #D6C6FF 0%, #E4DAFF 70%, #EAE3FF 100%)",
          }}
        ></div>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-90px",
            top: "-120px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.35)",
            filter: "blur(2px)",
          }}
        ></span>
        <svg
          aria-hidden="true"
          width="390"
          height="340"
          viewBox="0 0 390 340"
          fill="none"
          style={{ position: "absolute", left: "0", top: "0", display: "block" }}
        >
          <path
            d="M 55 330 A 140 140 0 0 1 335 330"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="16"
            strokeLinecap="round"
          ></path>
          <path
            d="M 55 330 A 140 140 0 0 1 335 330"
            stroke="#6C3FFA"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={v.arcDash}
          ></path>
        </svg>
        <span
          className="hb-pop hb-d4"
          style={{
            position: "absolute",
            left: "318px",
            top: "226px",
            display: "block",
            transform: "rotate(58deg)",
            transformOrigin: "left center",
            fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
            fontSize: "13px",
            fontWeight: "800",
            color: "#6C3FFA",
          }}
        >
          {v.arcGoal}
        </span>
        <svg
          aria-hidden="true"
          width="390"
          height="140"
          viewBox="0 0 390 140"
          preserveAspectRatio="none"
          style={{ position: "absolute", left: "0", top: "230px", display: "block" }}
        >
          <path d="M0 70 Q195 -10 390 70 V140 H0Z" fill="#F3F0FA"></path>
        </svg>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "133px",
            top: "284px",
            width: "124px",
            height: "18px",
            borderRadius: "50%",
            background: "#1E1B2E",
            opacity: "0.16",
            filter: "blur(6px)",
          }}
        ></span>
        <div
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            top: "66px",
            zIndex: "2",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <button
            aria-label="Say hi to the Unipal bird"
            onClick={v.poke}
            className={v.birdClass}
            style={{
              border: "0",
              background: "transparent",
              padding: "0",
              cursor: "pointer",
              pointerEvents: "auto",
            }}
          >
            <img
              src={v.birdSrc}
              alt=""
              style={{
                height: "226px",
                width: "auto",
                display: "block",
                filter: "drop-shadow(0 10px 10px rgba(30,27,46,0.12))",
              }}
            />
          </button>
        </div>
        {v.tipOpen ? (
          <>
            <div
              className="hb-pop"
              style={{
                position: "absolute",
                left: "16px",
                top: "96px",
                width: "118px",
                zIndex: "3",
                background: "#FFFFFF",
                borderRadius: "20px 20px 20px 4px",
                padding: "12px 14px",
                fontSize: "13.5px",
                fontWeight: "600",
                lineHeight: "1.35",
                boxShadow: "0 14px 30px rgba(30,27,46,0.16)",
                transformOrigin: "bottom left",
              }}
            >
              {v.tip}
            </div>
          </>
        ) : null}
        <div
          style={{
            position: "relative",
            zIndex: "1",
            display: "flex",
            flexDirection: "column",
            padding: "14px 16px 150px 16px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            className="hb-rise"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  width: "44px",
                  height: "44px",
                  flex: "none",
                  borderRadius: "50%",
                  background: "#1E1B2E",
                  color: "#C0F402",
                  fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                  fontWeight: "800",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 14px rgba(30,27,46,0.18)",
                }}
              >
                {"SA"}
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#5B5574",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {"Haiba member"}
                </span>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                    fontSize: "22px",
                    fontWeight: "800",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.1",
                  }}
                >
                  {v.greeting}
                </span>
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                aria-label="Search"
                className="hb-press"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "0",
                  background: "rgba(255,255,255,0.7)",
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
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="M20 20l-3.5-3.5"></path>
                </svg>
              </button>
              <button
                aria-label="Alerts"
                className="hb-press"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "0",
                  background: "rgba(255,255,255,0.7)",
                  color: "#1E1B2E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
                <span
                  style={{
                    position: "absolute",
                    top: "9px",
                    right: "10px",
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: "#C0F402",
                    border: "2px solid #FFFFFF",
                  }}
                ></span>
              </button>
            </div>
          </div>
          <div aria-hidden="true" style={{ height: "280px" }}></div>
          <div
            className="hb-rise hb-d1"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                fontSize: "36px",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                lineHeight: "1.1",
              }}
            >
              {v.points}
              {" points"}
            </span>
            <span style={{ fontSize: "15px", fontWeight: "600", color: "#5B5574" }}>
              {v.subLine}
            </span>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "12px",
              }}
            >
              <button
                onClick={v.toggleSaved}
                aria-expanded={v.savedOpenStr}
                className="hb-press"
                style={{
                  font: "inherit",
                  fontSize: "14px",
                  fontWeight: "700",
                  border: "0",
                  borderRadius: "999px",
                  padding: "9px 14px 9px 10px",
                  cursor: "pointer",
                  background: "#C0F402",
                  color: "#1F2600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v18"></path>
                  <path d="M17 7.5c0-1.9-2.2-3-5-3s-5 1.1-5 3 2.2 3 5 3 5 1.1 5 3-2.2 3-5 3-5-1.1-5-3"></path>
                </svg>
                {v.savedChip}
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={v.chev}></path>
                </svg>
              </button>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  borderRadius: "999px",
                  padding: "9px 14px",
                  background: "#F0ECFF",
                  color: "#4F25D6",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <svg
                  aria-hidden="true"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"></path>
                </svg>
                {v.codesChip}
              </span>
              <Link
                className="hb-press"
                style={{
                  textDecoration: "none",
                  background: "#6C3FFA",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: "700",
                  borderRadius: "999px",
                  padding: "9px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  flex: "none",
                  boxShadow: "0 8px 18px rgba(108,63,250,0.3)",
                }}
                to="/haiba/wallet"
              >
                {"Wallet"}
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6l6 6-6 6"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div style={{ marginTop: "14px" }}>
            <MotionReveal open={v.savedOpen}>
                <div
                  className="hb-pop"
                  style={{
                    background: "#1E1B2E",
                    color: "#FFFFFF",
                    borderRadius: "22px",
                    padding: "6px 18px 14px 18px",
                    transformOrigin: "top center",
                  }}
                >
                  {(v.savedRows || []).map((s: any, idx0: number) => (
                    <Fragment key={idx0}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "11px 0",
                          borderBottom: s.rule,
                        }}
                      >
                        <span style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                          <span style={{ fontSize: "15px", fontWeight: "600" }}>{s.title}</span>
                          <span style={{ fontSize: "12.5px", fontWeight: "500", color: "#B9B3CC" }}>
                            {s.sub}
                          </span>
                        </span>
                        <span
                          style={{
                            fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                            fontSize: "16px",
                            fontWeight: "800",
                            color: "#C0F402",
                          }}
                        >
                          {s.amt}
                        </span>
                      </div>
                    </Fragment>
                  ))}
                  <div
                    style={{
                      fontSize: "12.5px",
                      fontWeight: "500",
                      color: "#B9B3CC",
                      marginTop: "10px",
                      lineHeight: "1.4",
                    }}
                  >
                    {"A reward counts when the shop accepts your code."}
                  </div>
                </div>
            </MotionReveal>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginTop: "30px",
              padding: "0 4px",
            }}
          >
            <span style={{ fontSize: "22px", fontWeight: "700" }}>{"Ready for you"}</span>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
              {v.monthLeft}
            </span>
          </div>
          <div
            className="hb-pops"
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "12px",
              overflow: "hidden",
              marginRight: "-16px",
            }}
          >
            {(v.ready || []).map((r: any, idx0: number) => (
              <Fragment key={idx0}>
                <a
                  className="hb-lift"
                  style={{
                    textDecoration: "none",
                    flex: "none",
                    width: "196px",
                    height: "176px",
                    boxSizing: "border-box",
                    borderRadius: "20px",
                    background: r.bg,
                    color: r.ink,
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 12px 26px rgba(30,27,46,0.14)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (r.href) go(r.href);
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      right: "-30px",
                      top: "-40px",
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      background: r.orb,
                    }}
                  ></span>
                  <span
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
                      {r.kind}
                    </span>
                    <span
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "12px",
                        background: r.logoBg,
                        color: r.logoInk,
                        fontSize: "14px",
                        fontWeight: "800",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {r.logo}
                    </span>
                  </span>
                  <img
                    src={r.bird}
                    alt=""
                    style={{
                      position: "absolute",
                      right: "6px",
                      bottom: "8px",
                      height: "118px",
                      width: "auto",
                      display: r.birdDisp,
                      filter: "drop-shadow(0 6px 8px rgba(31,38,0,0.25))",
                    }}
                  />
                  <span
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      maxWidth: r.titleW,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                        fontSize: "21px",
                        fontWeight: "800",
                        letterSpacing: "-0.02em",
                        lineHeight: "1.1",
                      }}
                    >
                      {r.title}
                    </span>
                    <span
                      style={{
                        fontSize: "13.5px",
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
                      {r.time}
                    </span>
                  </span>
                </a>
              </Fragment>
            ))}
          </div>
          <div style={{ fontSize: "22px", fontWeight: "700", marginTop: "30px", padding: "0 4px" }}>
            {"Your benefits"}
          </div>
          <div
            className="hb-pops"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "10px",
              marginTop: "12px",
            }}
          >
            {(v.benefits || []).map((b: any, idx0: number) => (
              <Fragment key={idx0}>
                <a
                  className="hb-lift"
                  style={{
                    textDecoration: "none",
                    color: "#1E1B2E",
                    background: "#FFFFFF",
                    border: "1px solid #E6E2F2",
                    borderRadius: "20px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    boxShadow: "0 6px 18px rgba(76,52,140,0.06)",
                    minHeight: "128px",
                    boxSizing: "border-box",
                  }}
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (b.href) go(b.href);
                  }}
                >
                  <span
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "14px",
                      background: b.bg,
                      color: b.ink,
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
                      <path d={b.icon}></path>
                    </svg>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    <span style={{ fontSize: "15.5px", fontWeight: "700", lineHeight: "1.25" }}>
                      {b.title}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#6B6880",
                        lineHeight: "1.35",
                      }}
                    >
                      {b.sub}
                    </span>
                  </span>
                </a>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginTop: "30px",
              padding: "0 4px",
            }}
          >
            <span style={{ fontSize: "22px", fontWeight: "700" }}>{"Unipass gift"}</span>
            <a
              style={{ fontSize: "15px", fontWeight: "600", textDecoration: "none" }}
              href="#"
              onClick={(e: any) => e.preventDefault()}
            >
              {"Pick 1 of 13"}
            </a>
          </div>
          <div
            className="hb-pops"
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "12px",
              overflow: "hidden",
              marginRight: "-16px",
            }}
          >
            {(v.gifts || []).map((g: any, idx0: number) => (
              <Fragment key={idx0}>
                <a
                  className="hb-lift"
                  style={{
                    textDecoration: "none",
                    color: "#1E1B2E",
                    flex: "none",
                    width: "84px",
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
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: g.bg,
                      color: g.ink,
                      fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                      fontSize: "20px",
                      fontWeight: "800",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "3px solid #FFFFFF",
                      boxShadow: "0 0 0 1px #E6E2F2, 0 6px 14px rgba(30,27,46,0.12)",
                    }}
                  >
                    {g.mark}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: "700", lineHeight: "1.2" }}>
                    {g.item}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#6B6880",
                      lineHeight: "1.2",
                    }}
                  >
                    {g.brand}
                  </span>
                </a>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "30px",
              padding: "0 4px",
            }}
          >
            <span style={{ fontSize: "22px", fontWeight: "700" }}>{"Activity"}</span>
            <div
              role="tablist"
              aria-label="Filter activity"
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(3, 64px)",
                background: "#FFFFFF",
                borderRadius: "999px",
                padding: "3px",
                boxShadow: "0 4px 12px rgba(76,52,140,0.08)",
              }}
            >
              <span
                aria-hidden="true"
                className="hb-ease"
                style={{
                  position: "absolute",
                  top: "3px",
                  bottom: "3px",
                  width: "64px",
                  borderRadius: "999px",
                  background: "#1E1B2E",
                  left: v.indLeft,
                }}
              ></span>
              {(v.filters || []).map((f: any, idx0: number) => (
                <Fragment key={idx0}>
                  <button
                    role="tab"
                    aria-selected={f.sel}
                    onClick={f.pick}
                    className="hb-ease"
                    style={{
                      position: "relative",
                      font: "inherit",
                      fontSize: "13px",
                      fontWeight: "700",
                      border: "0",
                      background: "transparent",
                      padding: "7px 0",
                      borderRadius: "999px",
                      cursor: "pointer",
                      color: f.ink,
                    }}
                  >
                    {f.label}
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
          <div
            className="hb-rise hb-d1"
            style={{
              marginTop: "12px",
              background: "#FFFFFF",
              border: "1px solid #E6E2F2",
              borderRadius: "20px",
              padding: "4px 18px 8px 18px",
              boxShadow: "0 6px 18px rgba(76,52,140,0.06)",
            }}
          >
            <div className="hb-stagger">
              {(v.groups || []).map((g: any, idx0: number) => (
                <Fragment key={idx0}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px 0 6px 0",
                      }}
                    >
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "#6B6880" }}>
                        {g.day}
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: g.totalInk }}>
                        {g.total}
                      </span>
                    </div>
                    {(g.rows || []).map((t: any, idx1: number) => (
                      <Fragment key={idx1}>
                        <a
                          className="hb-row"
                          style={{
                            textDecoration: "none",
                            color: "#1E1B2E",
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            padding: "10px 0",
                            borderRadius: "14px",
                          }}
                          href="#"
                          onClick={(e: any) => e.preventDefault()}
                        >
                          <span
                            style={{
                              position: "relative",
                              width: "48px",
                              height: "48px",
                              flex: "none",
                            }}
                          >
                            <span
                              style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "16px",
                                background: t.bg,
                                color: t.ink,
                                fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                                fontSize: "16px",
                                fontWeight: "800",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {t.mark}
                            </span>
                            <span
                              style={{
                                position: "absolute",
                                right: "-4px",
                                bottom: "-4px",
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                background: t.badgeBg,
                                border: "2px solid #FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: t.badgeInk,
                              }}
                            >
                              <svg
                                aria-hidden="true"
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d={t.badgeIcon}></path>
                              </svg>
                            </span>
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
                            <span style={{ fontSize: "16px", fontWeight: "700" }}>{t.name}</span>
                            <span
                              style={{ fontSize: "13.5px", fontWeight: "500", color: "#6B6880" }}
                            >
                              {t.sub}
                            </span>
                          </span>
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                              gap: "2px",
                              flex: "none",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                                fontSize: "17px",
                                fontWeight: "800",
                                color: t.amtInk,
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {t.amt}
                            </span>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: t.noteInk,
                                background: t.noteBg,
                                borderRadius: "999px",
                                padding: "2px 8px",
                              }}
                            >
                              {t.note}
                            </span>
                          </span>
                        </a>
                      </Fragment>
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
            {v.noRows ? (
              <>
                <div
                  className="hb-rise"
                  style={{
                    padding: "18px 0 10px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#6B6880",
                    textAlign: "center",
                  }}
                >
                  <img
                    src="/haiba/birds/14-sit.png"
                    alt=""
                    style={{ height: "130px", width: "auto", display: "block" }}
                  />
                  {"Nothing here yet. Use an offer to start."}
                </div>
              </>
            ) : null}
            <a
              className="hb-press"
              style={{
                display: "block",
                margin: "10px 0 8px 0",
                textAlign: "center",
                textDecoration: "none",
                background: "#F3F0FA",
                color: "#1E1B2E",
                borderRadius: "999px",
                padding: "13px",
                fontSize: "15px",
                fontWeight: "700",
              }}
              href="#"
              onClick={(e: any) => {
                e.preventDefault();
                go("/haiba/wallet");
              }}
            >
              {"See all activity"}
            </a>
          </div>
        </div>
        {v.navTipOpen ? (
          <>
            <div className="hb-fixed-bottom">
              <div className="hb-fixed-inner">
                <div
                  className="hb-pop"
                  style={{
                    position: "absolute",
                    right: "14px",
                    bottom: "100px",
                    width: "262px",
                    background: "#1E1B2E",
                    color: "#FFFFFF",
                    borderRadius: "22px 22px 4px 22px",
                    padding: "14px 16px",
                    boxShadow: "0 16px 34px rgba(30,27,46,0.28)",
                    transformOrigin: "bottom right",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#C0F402",
                    }}
                  >
                    {"Tip from the bird"}
                  </span>
                  <span style={{ fontSize: "15px", fontWeight: "600", lineHeight: "1.4" }}>
                    {v.navTip}
                  </span>
                  <a
                    className="hb-press"
                    style={{
                      alignSelf: "flex-start",
                      textDecoration: "none",
                      background: "#C0F402",
                      color: "#1F2600",
                      fontSize: "14px",
                      fontWeight: "700",
                      borderRadius: "999px",
                      padding: "9px 14px",
                    }}
                    href="#"
                    onClick={(e: any) => {
                      e.preventDefault();
                      if (v.navTipHref) go(v.navTipHref);
                    }}
                  >
                    {v.navTipCta}
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className="hb-fixed-bottom">
          <div className="hb-fixed-inner">
            <div
              style={{
                position: "absolute",
                left: "12px",
                right: "12px",
                bottom: "22px",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <nav
                aria-label="Unipal"
                style={{
                  flex: "1",
                  background: "rgba(255,255,255,0.96)",
                  borderRadius: "28px",
                  padding: "6px",
                  display: "grid",
                  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                  gap: "2px",
                  boxShadow: "0 12px 30px rgba(30,27,46,0.14)",
                }}
              >
                <a
                  className="hb-press"
                  style={{
                    textDecoration: "none",
                    color: "#6B6880",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "3px",
                    padding: "8px 0",
                    borderRadius: "22px",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    go("/");
                  }}
                >
                  <svg
                    aria-hidden="true"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 10.6L12 3l9 7.6V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"></path>
                  </svg>
                  {"Home"}
                </a>
                <a
                  className="hb-press"
                  style={{
                    textDecoration: "none",
                    color: "#6B6880",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "3px",
                    padding: "8px 0",
                    borderRadius: "22px",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                  href="#"
                  onClick={(e: any) => e.preventDefault()}
                >
                  <svg
                    aria-hidden="true"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"></path>
                    <circle cx="12" cy="9.5" r="2.5"></circle>
                  </svg>
                  {"Map"}
                </a>
                <a
                  aria-current="page"
                  className="hb-press"
                  style={{
                    textDecoration: "none",
                    color: "#FFFFFF",
                    background: "#6C3FFA",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "3px",
                    padding: "8px 0",
                    borderRadius: "22px",
                    fontSize: "11px",
                    fontWeight: "700",
                    boxShadow: "0 8px 18px rgba(108,63,250,0.35)",
                  }}
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    go("/haiba");
                  }}
                >
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="#C0F402">
                    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"></path>
                  </svg>
                  {"Haiba"}
                </a>
                <a
                  className="hb-press"
                  style={{
                    textDecoration: "none",
                    color: "#6B6880",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "3px",
                    padding: "8px 0",
                    borderRadius: "22px",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                  href="#"
                  onClick={(e: any) => e.preventDefault()}
                >
                  <svg
                    aria-hidden="true"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                  </svg>
                  {"Alerts"}
                </a>
                <a
                  className="hb-press"
                  style={{
                    textDecoration: "none",
                    color: "#6B6880",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "3px",
                    padding: "8px 0",
                    borderRadius: "22px",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                  href="#"
                  onClick={(e: any) => e.preventDefault()}
                >
                  <svg
                    aria-hidden="true"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4.2"></circle>
                    <path d="M4 21c1.4-4.2 4.5-6.2 8-6.2s6.6 2 8 6.2"></path>
                  </svg>
                  {"Profile"}
                </a>
              </nav>
              <button
                aria-label="Tip from the Unipal bird"
                aria-expanded={v.navTipOpenStr}
                onClick={v.toggleNavTip}
                className={v.navBtnClass}
                style={{
                  width: "64px",
                  height: "64px",
                  flex: "none",
                  borderRadius: "50%",
                  background: "#C0F402",
                  border: "0",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  boxShadow: "0 10px 24px rgba(108,63,250,0.3)",
                  padding: "0",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src="/haiba/birds/03-wink.png"
                  alt=""
                  style={{ width: "62px", height: "auto", display: "block", marginTop: "5px" }}
                />
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: "#6C3FFA",
                    border: "2px solid #FFFFFF",
                    display: v.dotDisp,
                  }}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
