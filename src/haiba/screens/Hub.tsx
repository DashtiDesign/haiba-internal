// @ts-nocheck
// Ported 1:1 from the Design canvas board "Character.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import haibaLogo from "@/assets/haiba/logo-purple.svg.asset.json";
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
            height: "310px",
            background:
              "radial-gradient(circle at 50% 58%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 38%), radial-gradient(circle at 4% 70%, rgba(108,63,250,0.22) 0%, rgba(108,63,250,0) 40%), linear-gradient(180deg, #D3C2FF 0%, #E2D7FF 70%, #EAE3FF 100%)",
          }}
        ></div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            height: "300px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "-120px",
              top: "-140px",
              width: "640px",
              height: "560px",
              transform: "rotate(-14deg)",
              backgroundImage: `url(${haibaLogo.url})`,
              backgroundSize: "64px auto",
              backgroundRepeat: "space",
              opacity: "0.08",
            }}
          ></div>
        </div>
        <svg
          aria-hidden="true"
          width="390"
          height="140"
          viewBox="0 0 390 140"
          preserveAspectRatio="none"
          style={{ position: "absolute", left: "0", top: "228px", display: "block" }}
        >
          <path d="M0 70 Q195 -10 390 70 V140 H0Z" fill="#F3F0FA"></path>
        </svg>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "131px",
            top: "258px",
            width: "128px",
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
            top: "30px",
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
            <Artwork
              priority
              src={v.birdSrc}
              alt=""
              style={{
                height: "238px",
                width: "auto",
                display: "block",
                filter: "drop-shadow(0 10px 10px rgba(30,27,46,0.12))",
              }}
            />
          </button>
        </div>
        <Link
          aria-label="How points work"
          className="hb-press"
          style={{
            position: "absolute",
            right: "16px",
            top: "14px",
            zIndex: "3",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.8)",
            color: "#1E1B2E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(76,52,140,0.12)",
          }}
          to="/haiba/points"
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
            <path d="M9.2 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4.5"></path>
            <path d="M12 18.2h.01"></path>
          </svg>
        </Link>
        {v.tipOpen ? (
          <>
            <div
              className="hb-pop"
              style={{
                position: "absolute",
                left: "16px",
                top: "60px",
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
          <div aria-hidden="true" style={{ height: "282px" }}></div>
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
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "36px",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                lineHeight: "1.1",
              }}
            >
              {v.points}
              {" points"}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "2px",
                fontSize: "13px",
                fontWeight: "600",
                color: "#1E1B2E",
                background: "#FFFFFF",
                border: "1px solid #E6DFFB",
                borderRadius: "999px",
                padding: "5px 11px 5px 9px",
              }}
            >
              <Artwork
                src={haibaLogo.url}
                alt="Haiba"
                style={{ height: "13px", width: "auto", display: "block" }}
              />
              {v.memberLine}
            </span>
          </div>
          <a
            className="hb-press hb-rise hb-d2"
            style={{
              textDecoration: "none",
              color: "#1F2600",
              background: "#C0F402",
              borderRadius: "24px",
              marginTop: "28px",
              padding: "20px 18px 18px 18px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              boxShadow: "0 14px 28px rgba(110,140,0,0.22)",
            }}
            href="#"
            onClick={(e: any) => e.preventDefault()}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "-50px",
                top: "-60px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.32)",
              }}
            ></span>
            <Artwork
              src="/haiba/birds/10-gift.png"
              alt=""
              style={{
                position: "absolute",
                right: "-2px",
                bottom: "0",
                height: "156px",
                width: "auto",
                display: "block",
                filter: "drop-shadow(0 8px 10px rgba(31,38,0,0.22))",
              }}
            />
            <span
              style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {"Unipass gift"}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  background: "#1F2600",
                  color: "#C0F402",
                  borderRadius: "999px",
                  padding: "4px 9px",
                }}
              >
                {v.giftLeft}
              </span>
            </span>
            <span
              style={{
                position: "relative",
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "25px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
                lineHeight: "1.1",
                maxWidth: "200px",
                marginTop: "4px",
              }}
            >
              {"Pick your October gift"}
            </span>
            <span
              style={{
                position: "relative",
                fontSize: "14px",
                fontWeight: "600",
                opacity: "0.8",
                maxWidth: "236px",
                lineHeight: "1.35",
              }}
            >
              {"Free for members. 1 of 12 items."}
            </span>
            <span
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "12px",
              }}
            >
              <span style={{ display: "flex", paddingLeft: "8px" }}>
                {(v.giftMarks || []).map((g: any, idx0: number) => (
                  <Fragment key={idx0}>
                    <span
                      style={{
                        width: "34px",
                        height: "34px",
                        marginLeft: "-8px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        background: "#FFFFFF",
                        color: "#1F2600",
                        border: "2px solid #C0F402",
                        fontFamily: "Figtree, system-ui, sans-serif",
                        fontSize: "12px",
                        fontWeight: "800",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {g.hasLogo ? (
                        <>
                          <Artwork
                            src={g.logo}
                            alt={g.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </>
                      ) : null}
                      {g.mark}
                    </span>
                  </Fragment>
                ))}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "800",
                  background: "#1F2600",
                  color: "#C0F402",
                  borderRadius: "999px",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {"Pick my gift"}
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
                  <path d="M9 6l6 6-6 6"></path>
                </svg>
              </span>
            </span>
          </a>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginTop: "32px",
              padding: "0 4px",
            }}
          >
            <span
              style={{
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "19px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
              }}
            >
              {"Active rewards"}
            </span>
            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#6B6880" }}>
              {v.readyCount}
            </span>
          </div>
          <div
            className="hb-rise hb-d2"
            style={{
              marginTop: "12px",
              background: "#FFFFFF",
              border: "1px solid #E9E5F4",
              borderRadius: "22px",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(76,52,140,0.06)",
            }}
          >
            {(v.ready || []).map((r: any, idx0: number) => (
              <Fragment key={idx0}>
                <div style={{ borderTop: r.rule }}>
                  {r.isCode ? (
                    <>
                      <button
                        onClick={r.tap}
                        aria-expanded={r.openStr}
                        className="hb-row"
                        style={{
                          font: "inherit",
                          width: "100%",
                          textAlign: "left",
                          border: "0",
                          background: "transparent",
                          color: "#1E1B2E",
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          padding: "14px 16px",
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={{
                            width: "44px",
                            height: "44px",
                            flex: "none",
                            borderRadius: "14px",
                            background: r.bg,
                            color: r.ink,
                            fontFamily: "Figtree, system-ui, sans-serif",
                            fontSize: "15px",
                            fontWeight: "800",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {r.mark}
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
                          <span
                            style={{ fontSize: "15.5px", fontWeight: "700", lineHeight: "1.25" }}
                          >
                            {r.title}
                          </span>
                          <span style={{ fontSize: "13.5px", fontWeight: "600", color: r.metaInk }}>
                            {r.meta}
                          </span>
                        </span>
                        <span
                          style={{
                            flex: "none",
                            fontSize: "13px",
                            fontWeight: "800",
                            borderRadius: "999px",
                            padding: "7px 12px",
                            background: r.pillBg,
                            color: r.pillInk,
                          }}
                        >
                          {r.pill}
                        </span>
                      </button>
                      {r.open ? (
                        <>
                          <div
                            className="hb-pop"
                            style={{
                              margin: "0 16px 16px 16px",
                              background: "linear-gradient(135deg, #6C3FFA 0%, #4F25D6 100%)",
                              borderRadius: "18px",
                              padding: "14px 16px 16px 16px",
                              color: "#FFFFFF",
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
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
                              <span>{r.useBy}</span>
                            </span>
                            <span
                              style={{
                                background: "#FFFFFF",
                                color: "#1E1B2E",
                                borderRadius: "14px",
                                padding: "12px",
                                textAlign: "center",
                                fontFamily: "Figtree, system-ui, sans-serif",
                                fontSize: "26px",
                                fontWeight: "800",
                                letterSpacing: "0.08em",
                              }}
                            >
                              {r.code}
                            </span>
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </Fragment>
            ))}
            {v.noActive ? (
              <>
                <div
                  style={{
                    padding: "18px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
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
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"></path>
                    </svg>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700" }}>
                      {"No active rewards"}
                    </span>
                    <span
                      style={{
                        fontSize: "13.5px",
                        fontWeight: "500",
                        color: "#6B6880",
                        lineHeight: "1.35",
                      }}
                    >
                      {"Use your points on a reward and its code shows here."}
                    </span>
                  </span>
                </div>
              </>
            ) : null}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginTop: "32px",
              padding: "0 4px",
            }}
          >
            <span
              style={{
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "19px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
              }}
            >
              {"You saved"}
            </span>
            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#6B6880" }}>
              {"Since you joined"}
            </span>
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              marginTop: "12px",
              background: "#FFFFFF",
              border: "1px solid #E9E5F4",
              borderRadius: "22px",
              padding: "18px 18px 16px 18px",
              boxShadow: "0 6px 18px rgba(76,52,140,0.06)",
            }}
          >
            <div
              style={{
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "34px",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                lineHeight: "1.05",
              }}
            >
              {v.savedTotal}
            </div>
            <div
              aria-hidden="true"
              style={{
                display: "flex",
                height: "10px",
                marginTop: "14px",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              {(v.savedBar || []).map((b: any, idx0: number) => (
                <Fragment key={idx0}>
                  <span style={{ flex: b.grow, height: "10px", background: b.color }}></span>
                </Fragment>
              ))}
            </div>
            <div style={{ marginTop: "8px" }}>
              {(v.savedRows || []).map((s: any, idx0: number) => (
                <Fragment key={idx0}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "11px 0",
                      borderBottom: s.rule,
                    }}
                  >
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        flex: "none",
                        borderRadius: "3px",
                        background: s.color,
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
                      <span style={{ fontSize: "15px", fontWeight: "700" }}>{s.title}</span>
                      <span style={{ fontSize: "13px", fontWeight: "500", color: "#6B6880" }}>
                        {s.sub}
                      </span>
                    </span>
                    <span
                      style={{
                        fontFamily: "Figtree, system-ui, sans-serif",
                        fontSize: "15px",
                        fontWeight: "800",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {s.amt}
                    </span>
                  </div>
                </Fragment>
              ))}
            </div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "#6B6880",
                lineHeight: "1.4",
                marginTop: "10px",
              }}
            >
              {"A reward counts when the shop accepts your code."}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginTop: "32px",
              padding: "0 4px",
            }}
          >
            <span
              style={{
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "19px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
              }}
            >
              {"Activity"}
            </span>
            <a
              style={{ fontSize: "14px", fontWeight: "700", textDecoration: "none" }}
              href="#"
              onClick={(e: any) => e.preventDefault()}
            >
              {"See all"}
            </a>
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              marginTop: "12px",
              background: "#FFFFFF",
              border: "1px solid #E9E5F4",
              borderRadius: "22px",
              padding: "2px 16px 8px 16px",
              boxShadow: "0 6px 18px rgba(76,52,140,0.06)",
            }}
          >
            {(v.groups || []).map((g: any, idx0: number) => (
              <Fragment key={idx0}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "14px 0 4px 0",
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "9px 0",
                        }}
                      >
                        <span
                          style={{
                            width: "40px",
                            height: "40px",
                            flex: "none",
                            borderRadius: "12px",
                            background: t.bg,
                            color: t.ink,
                            fontFamily: "Figtree, system-ui, sans-serif",
                            fontSize: "14px",
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
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                            flex: "1",
                            minWidth: "0",
                          }}
                        >
                          <span style={{ fontSize: "15.5px", fontWeight: "700" }}>{t.name}</span>
                          <span style={{ fontSize: "13px", fontWeight: "500", color: "#6B6880" }}>
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
                              fontFamily: "Figtree, system-ui, sans-serif",
                              fontSize: "16px",
                              fontWeight: "800",
                              color: t.amtInk,
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {t.amt}
                          </span>
                          <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#6B6880" }}>
                            {t.note}
                          </span>
                        </span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginTop: "32px",
              padding: "0 4px",
            }}
          >
            <span
              style={{
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "19px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
              }}
            >
              {"Where to use your points"}
            </span>
            <a
              style={{ fontSize: "14px", fontWeight: "700", textDecoration: "none" }}
              href="#"
              onClick={(e: any) => e.preventDefault()}
            >
              {"See all"}
            </a>
          </div>
          <div
            style={{
              fontSize: "13.5px",
              fontWeight: "500",
              color: "#6B6880",
              marginTop: "4px",
              padding: "0 4px",
            }}
          >
            {"Free items at 200+ shops. Tap one to get a code."}
          </div>
          <div
            className="hb-pops"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "10px",
              marginTop: "12px",
            }}
          >
            {(v.spend || []).map((u: any, idx0: number) => (
              <Fragment key={idx0}>
                <a
                  className="hb-press"
                  style={{
                    textDecoration: "none",
                    color: "#1E1B2E",
                    background: "#FFFFFF",
                    border: "1px solid #E9E5F4",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 6px 16px rgba(76,52,140,0.06)",
                  }}
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (u.href) go(u.href);
                  }}
                >
                  <span
                    style={{
                      height: "76px",
                      background: u.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Artwork
                      src={u.logo}
                      alt={u.brand}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      padding: "9px 10px 10px 10px",
                      borderTop: "1px solid #F1EFF7",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13.5px",
                        fontWeight: "700",
                        lineHeight: "1.2",
                        height: "2.4em",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {u.name}
                    </span>
                    <span
                      style={{
                        alignSelf: "flex-start",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "12px",
                        fontWeight: "800",
                        borderRadius: "999px",
                        padding: "3px 8px 3px 4px",
                        background: u.pillBg,
                        color: u.pillInk,
                      }}
                    >
                      <Artwork
                        src="/haiba/coins/coin-front.webp"
                        alt=""
                        style={{
                          width: "14px",
                          height: "14px",
                          objectFit: "contain",
                          display: "block",
                          flex: "none",
                          opacity: u.dotOp,
                        }}
                      />
                      {u.pts}
                    </span>
                  </span>
                </a>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="hb-fixed-bottom">
          <div className="hb-fixed-inner">
            <div style={{ position: "absolute", left: "0", right: "0", bottom: "0" }}>
              {v.navTipOpen ? (
                <>
                  <div
                    className="hb-pop"
                    style={{
                      position: "absolute",
                      right: "14px",
                      bottom: "170px",
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
                </>
              ) : null}
              <button
                aria-label="Haiba. Tip from the Unipal bird"
                aria-expanded={v.navTipOpenStr}
                onClick={v.toggleNavTip}
                className="hb-press"
                style={{
                  position: "absolute",
                  right: "16px",
                  bottom: "96px",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#6C3FFA",
                  border: "3px solid #FFFFFF",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 0 2px #C0F402, 0 10px 24px rgba(108,63,250,0.35)",
                  padding: "0",
                  cursor: "pointer",
                }}
              >
                <Artwork
                  src="/haiba/logo-lime.svg"
                  alt=""
                  style={{
                    width: "40px",
                    height: "auto",
                    display: "block",
                    transform: "rotate(-8deg)",
                  }}
                />
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: "#C0F402",
                    border: "2px solid #FFFFFF",
                    display: v.dotDisp,
                  }}
                ></span>
              </button>
              <nav
                aria-label="Unipal"
                style={{
                  background: "#FFFFFF",
                  borderTop: "1px solid #EEEEF2",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  padding: "10px 6px 26px 6px",
                }}
              >
                <a
                  style={{
                    textDecoration: "none",
                    color: "#4A4B52",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    go("/");
                  }}
                >
                  <svg
                    aria-hidden="true"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 10.6L12 3l9 7.6V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"></path>
                  </svg>
                  {"Home"}
                </a>
                <a
                  style={{
                    textDecoration: "none",
                    color: "#4A4B52",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                  href="#"
                  onClick={(e: any) => e.preventDefault()}
                >
                  <svg
                    aria-hidden="true"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"></path>
                    <circle cx="12" cy="9.5" r="2.5"></circle>
                  </svg>
                  {"Map"}
                </a>
                <a
                  style={{
                    textDecoration: "none",
                    color: "#4A4B52",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                  href="#"
                  onClick={(e: any) => e.preventDefault()}
                >
                  <svg
                    aria-hidden="true"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                  </svg>
                  {"Alerts"}
                </a>
                <a
                  style={{
                    textDecoration: "none",
                    color: "#4A4B52",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                  href="#"
                  onClick={(e: any) => e.preventDefault()}
                >
                  <svg
                    aria-hidden="true"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4.2"></circle>
                    <path d="M4 21c1.4-4.2 4.5-6.2 8-6.2s6.6 2 8 6.2"></path>
                  </svg>
                  {"Profile"}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
