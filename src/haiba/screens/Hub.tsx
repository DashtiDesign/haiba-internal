// @ts-nocheck
// Ported 1:1 from the Design canvas board "Character.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import HubBird from "../HubBird";
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
          minHeight: "100svh",
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
          <HubBird onTap={v.poke} />
        </div>
        <button
          onClick={v.toggleMenu}
          aria-label="Menu"
          aria-expanded={v.menuOpenStr}
          className="hb-press"
          style={{
            position: "absolute",
            right: "16px",
            top: "14px",
            zIndex: "3",
            width: "40px",
            height: "40px",
            border: "0",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.88)",
            color: "#1E1B2E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(76,52,140,0.12)",
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
            <path d="M4 7h16M4 12h16M4 17h16"></path>
          </svg>
        </button>
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
            <Link
              aria-label="Your membership"
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
                padding: "5px 9px 5px 9px",
                textDecoration: "none",
              }}
              to="/haiba/membership"
            >
              <Artwork
                src={haibaLogo.url}
                alt="Haiba"
                style={{ height: "13px", width: "auto", display: "block" }}
              />
              {v.memberLine}
              <svg
                aria-hidden="true"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6C3FFA"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6"></path>
              </svg>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginTop: "36px",
              padding: "0 4px",
            }}
          >
            <span
              style={{
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "20px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
              }}
            >
              {"Ready for you"}
            </span>
          </div>
          {v.gcBig ? (
            <>
              <a
                className="hb-press hb-rise hb-d2"
                style={{
                  textDecoration: "none",
                  color: v.gcInk,
                  background: v.gcBg,
                  borderRadius: "12px",
                  marginTop: "12px",
                  padding: "20px 18px 18px 18px",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  boxShadow: v.gcShadow,
                }}
                href="#"
                onClick={(e: any) => {
                  e.preventDefault();
                  go(v.giftHref || "/haiba/unipass");
                }}
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
                  src="/haiba/birds/26-gift.webp"
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
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Artwork
                    src="/haiba/icons/unipass.webp"
                    alt=""
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "contain",
                      margin: "-6px -2px -6px -4px",
                      display: "block",
                    }}
                  />
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
                      whiteSpace: "nowrap",
                      background: v.gcPillBg,
                      color: v.gcPillInk,
                      borderRadius: "999px",
                      padding: "4px 9px",
                    }}
                  >
                    {v.gcPill}
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
                  {v.giftTitle}
                </span>
                {v.gcHasSub ? (
                  <>
                    <span
                      style={{
                        position: "relative",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: v.gcSubInk,
                        lineHeight: "1.35",
                        maxWidth: "200px",
                      }}
                    >
                      {v.gcSub}
                    </span>
                  </>
                ) : null}
                <span
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "12px",
                  }}
                >
                  {v.gcPicking ? (
                    <>
                      <span style={{ display: "flex", paddingLeft: "8px" }}>
                        {(v.giftMarks || []).map((g: any, idx0: number) => (
                          <Fragment key={idx0}>
                            <span
                              style={{
                                width: "34px",
                                height: "34px",
                                marginLeft: "-8px",
                                borderRadius: "8px",
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
                    </>
                  ) : null}
                  {v.gcHasLogo ? (
                    <>
                      <Artwork
                        src={v.gcLogo}
                        alt={v.gcBrand}
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          objectFit: "contain",
                          display: "block",
                          background: v.gcLogoBg,
                          boxShadow: "0 0 0 2px #FFFFFF",
                        }}
                      />
                    </>
                  ) : null}
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "800",
                      whiteSpace: "nowrap",
                      background: v.gcCtaBg,
                      color: v.gcCtaInk,
                      borderRadius: "999px",
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {v.gcCta}
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
            </>
          ) : null}
          {v.gcSmall ? (
            <>
              <a
                className="hb-press hb-rise hb-d2"
                style={{
                  marginTop: "12px",
                  textDecoration: "none",
                  color: v.gsInk,
                  background: v.gsBg,
                  borderRadius: "12px",
                  padding: "12px 14px 12px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  boxShadow: v.gsShadow,
                }}
                href="#"
                onClick={(e: any) => {
                  e.preventDefault();
                  go(v.giftHref || "/haiba/unipass");
                }}
              >
                <span
                  style={{
                    width: "44px",
                    height: "44px",
                    flex: "none",
                    borderRadius: "10px",
                    background: v.gsTileBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Artwork
                    src="/haiba/icons/unipass.webp"
                    alt=""
                    style={{
                      width: "36px",
                      height: "36px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
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
                  <span style={{ fontSize: "15.5px", fontWeight: "800", lineHeight: "1.25" }}>
                    {v.gsTitle}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {v.gsNew ? (
                      <>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "800",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            background: "#1F2600",
                            color: "#C0F402",
                            borderRadius: "999px",
                            padding: "2px 7px",
                          }}
                        >
                          {"New"}
                        </span>
                      </>
                    ) : null}
                    <span style={{ fontSize: "13.5px", fontWeight: "600", color: v.gsSubInk }}>
                      {v.gsSub}
                    </span>
                  </span>
                </span>
                <span
                  style={{
                    flex: "none",
                    whiteSpace: "nowrap",
                    fontSize: "13px",
                    fontWeight: "800",
                    borderRadius: "999px",
                    padding: "7px 12px",
                    background: v.gsCtaBg,
                    color: v.gsCtaInk,
                  }}
                >
                  {v.gsCta}
                </span>
              </a>
            </>
          ) : null}
          {v.hasActive ? (
            <>
              <div
                className="hb-rise hb-d2"
                style={{
                  marginTop: "12px",
                  background: "#FFFFFF",
                  border: "1px solid #E9E5F4",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(76,52,140,0.06)",
                }}
              >
                {(v.ready || []).map((r: any, idx0: number) => (
                  <Fragment key={idx0}>
                    <div style={{ borderTop: r.rule, background: r.rowBg }}>
                      {r.isCode ? (
                        <>
                          <a
                            className="hb-row"
                            style={{
                              font: "inherit",
                              width: "100%",
                              boxSizing: "border-box",
                              textAlign: "left",
                              textDecoration: "none",
                              background: "transparent",
                              color: "#1E1B2E",
                              display: "flex",
                              alignItems: "center",
                              gap: "14px",
                              padding: "14px 16px",
                              cursor: "pointer",
                            }}
                            href="#"
                            onClick={(e: any) => {
                              e.preventDefault();
                              go(r.href);
                            }}
                          >
                            <span
                              style={{
                                position: "relative",
                                width: "44px",
                                height: "44px",
                                flex: "none",
                              }}
                            >
                              <span
                                style={{
                                  width: "44px",
                                  height: "44px",
                                  borderRadius: "10px",
                                  overflow: "hidden",
                                  background: r.bg,
                                  color: r.ink,
                                  boxShadow: "0 0 0 1px #ECE8F5",
                                  fontFamily: "Figtree, system-ui, sans-serif",
                                  fontSize: "15px",
                                  fontWeight: "800",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {r.hasLogo ? (
                                  <>
                                    <Artwork
                                      src={r.logo}
                                      alt=""
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        display: "block",
                                      }}
                                    />
                                  </>
                                ) : null}
                                {r.noLogo ? <>{r.mark}</> : null}
                              </span>
                              {r.isGift ? (
                                <>
                                  <Artwork
                                    src="/haiba/icons/unipass.webp"
                                    alt=""
                                    style={{
                                      position: "absolute",
                                      right: "-9px",
                                      bottom: "-8px",
                                      width: "26px",
                                      height: "26px",
                                      objectFit: "contain",
                                      display: "block",
                                      filter: "drop-shadow(0 2px 3px rgba(31,38,0,0.25))",
                                    }}
                                  />
                                </>
                              ) : null}
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
                              {r.isGift ? (
                                <>
                                  <span
                                    style={{
                                      fontSize: "11.5px",
                                      fontWeight: "800",
                                      letterSpacing: "0.08em",
                                      textTransform: "uppercase",
                                      color: "#4F6B00",
                                    }}
                                  >
                                    {"Unipass gift"}
                                  </span>
                                </>
                              ) : null}
                              <span
                                style={{
                                  fontSize: "15.5px",
                                  fontWeight: "800",
                                  lineHeight: "1.25",
                                }}
                              >
                                {r.item}
                              </span>
                              <span
                                style={{ fontSize: "13.5px", fontWeight: "600", color: "#6B6880" }}
                              >
                                {r.sub}
                              </span>
                            </span>
                            <span
                              style={{
                                flex: "none",
                                whiteSpace: "nowrap",
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
                          </a>
                          {r.isGift ? (
                            <>
                              <button
                                onClick={r.openUnipass}
                                className="hb-press"
                                style={{
                                  font: "inherit",
                                  border: "0",
                                  background: "transparent",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  margin: "-6px 0 0 0",
                                  padding: "4px 16px 14px 74px",
                                  color: "#3D5000",
                                  fontSize: "13.5px",
                                  fontWeight: "800",
                                }}
                              >
                                {"See all Unipass gifts"}
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
                              </button>
                            </>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginTop: "36px",
              padding: "0 4px",
            }}
          >
            <span
              style={{
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "20px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
              }}
            >
              {"Your points"}
            </span>
          </div>
          <div
            className="hb-rise hb-d2"
            style={{
              marginTop: "12px",
              background: "#FFFFFF",
              border: "1px solid #E9E5F4",
              borderRadius: "12px",
              boxShadow: "0 6px 16px rgba(76,52,140,0.06)",
              overflow: "hidden",
            }}
          >
            <Link
              className="hb-press"
              style={{
                textDecoration: "none",
                color: "#1E1B2E",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 16px",
              }}
              to="/haiba/rewards"
            >
              <Artwork
                src="/haiba/coins/coin-stack-3d.webp"
                alt=""
                style={{
                  width: "44px",
                  height: "44px",
                  flex: "none",
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  flex: "1",
                  minWidth: "0",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "800" }}>{"Use your points"}</span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
                  {"Free food, coffee and more at 200+ shops"}
                </span>
              </span>
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6C3FFA"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flex: "none" }}
              >
                <path d="M9 6l6 6-6 6"></path>
              </svg>
            </Link>
            <Link
              className="hb-press"
              style={{
                textDecoration: "none",
                color: "#1F2600",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "11px 16px",
                background: "#F4FFD1",
                borderTop: "1px solid #E9E5F4",
              }}
              to="/haiba/rewards"
            >
              <span
                style={{
                  fontSize: "12.5px",
                  fontWeight: "800",
                  background: "#C0F402",
                  borderRadius: "999px",
                  padding: "3px 9px",
                  flex: "none",
                }}
              >
                {v.bonusTag}
              </span>
              <span style={{ fontSize: "14px", fontWeight: "700", lineHeight: "1.3" }}>
                {v.earnSub}
              </span>
            </Link>
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
                <Link
                  className="hb-press"
                  style={{
                    textDecoration: "none",
                    color: "#1E1B2E",
                    background: "#FFFFFF",
                    border: "1px solid #E9E5F4",
                    borderRadius: "12px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 6px 16px rgba(76,52,140,0.06)",
                  }}
                  to="/haiba/rewards"
                >
                  <span
                    style={{
                      position: "relative",
                      height: "76px",
                      background: u.tint,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Artwork
                      src={u.img}
                      alt=""
                      style={{
                        width: "52px",
                        height: "52px",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "7px",
                        left: "7px",
                        width: "22px",
                        height: "22px",
                        borderRadius: "7px",
                        overflow: "hidden",
                        background: u.bg,
                        color: "#FFFFFF",
                        fontSize: "10px",
                        fontWeight: "800",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 0 2px #FFFFFF",
                      }}
                    >
                      {u.hasLogo ? (
                        <>
                          <Artwork
                            src={u.logo}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </>
                      ) : null}
                      {u.noLogo ? <>{u.mark}</> : null}
                    </span>
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
                        display: "flex",
                        flexDirection: "column",
                        gap: "1px",
                        minWidth: "0",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11.5px",
                          fontWeight: "700",
                          color: "#6B6880",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {u.brand}
                      </span>
                      <span
                        style={{
                          fontSize: "13.5px",
                          fontWeight: "800",
                          lineHeight: "1.2",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {u.name}
                      </span>
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
                </Link>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginTop: "36px",
              padding: "0 4px",
            }}
          >
            <span
              style={{
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "20px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
              }}
            >
              {"Savings and activity"}
            </span>
            <Link
              style={{
                fontSize: "14px",
                fontWeight: "700",
                textDecoration: "none",
                color: "#6C3FFA",
              }}
              to="/haiba/saved"
            >
              {"See all"}
            </Link>
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              marginTop: "12px",
              background: "#FFFFFF",
              border: "1px solid #E9E5F4",
              borderRadius: "12px",
              boxShadow: "0 6px 18px rgba(76,52,140,0.06)",
              overflow: "hidden",
            }}
          >
            <Link
              aria-label="You saved, see the details"
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                padding: "18px 18px 14px 18px",
              }}
              to="/haiba/saved"
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#8F89A8",
                }}
              >
                {"You saved"}
              </div>
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
                {v.savedNote}
              </div>
            </Link>
            <div style={{ borderTop: "1px solid #F1EFF7", padding: "2px 16px 4px 16px" }}>
              {(v.actGroups || []).map((g: any, idx0: number) => (
                <Fragment key={idx0}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "14px 0 2px 0",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11.5px",
                          fontWeight: "800",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#8F89A8",
                        }}
                      >
                        {g.day}
                      </span>
                      <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#8F89A8" }}>
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
                            padding: "10px 0",
                          }}
                        >
                          <span
                            style={{
                              position: "relative",
                              width: "42px",
                              height: "42px",
                              flex: "none",
                            }}
                          >
                            <span
                              style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "10px",
                                background: t.bg,
                                color: t.ink,
                                fontSize: "13.5px",
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
                                right: "-3px",
                                bottom: "-3px",
                                width: "19px",
                                height: "19px",
                                boxSizing: "border-box",
                                borderRadius: "50%",
                                background: t.badgeBg,
                                color: t.badgeInk,
                                border: "2px solid #FFFFFF",
                                fontSize: "9px",
                                fontWeight: "800",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {t.badge}
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
                            <span
                              style={{
                                fontSize: "15.5px",
                                fontWeight: "700",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {t.name}
                            </span>
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: "500",
                                color: "#6B6880",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {t.sub}
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
                            <span
                              style={{
                                fontSize: "18px",
                                fontWeight: "800",
                                letterSpacing: "-0.01em",
                                color: t.amtInk,
                                fontVariantNumeric: "tabular-nums",
                              }}
                            >
                              <span style={{ fontSize: "12px", fontWeight: "700" }}>{t.pre}</span>
                              {t.main}
                              <span style={{ fontSize: "13px" }}>{t.dec}</span>
                            </span>
                            <span style={{ fontSize: "12px", fontWeight: "600", color: "#8F89A8" }}>
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
              {"Member perks"}
            </span>
          </div>
          <Link
            className="hb-press hb-rise hb-d3"
            style={{
              marginTop: "12px",
              position: "relative",
              overflow: "hidden",
              textDecoration: "none",
              color: v.travelInk,
              background: v.travelBg,
              borderRadius: "12px",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: v.travelShadow,
            }}
            to="/haiba/travel"
          >
            {v.travelDark ? (
              <>
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: "-50px",
                    top: "-70px",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    border: "2px dashed rgba(192,244,2,0.25)",
                  }}
                ></span>
              </>
            ) : null}
            <span
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                flex: "none",
                opacity: v.travelOp,
              }}
            >
              {(v.travelAway || []).map((f: any, idx0: number) => (
                <Fragment key={idx0}>
                  <Artwork
                    src={f.src}
                    alt={f.name}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                      marginLeft: f.ml,
                      boxShadow: `0 0 0 2px ${v.travelBg}`,
                    }}
                  />
                </Fragment>
              ))}
            </span>
            <span
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                flex: "1",
                minWidth: "0",
              }}
            >
              <span style={{ fontSize: "15.5px", fontWeight: "800", lineHeight: "1.25" }}>
                <span style={{ color: v.travelHi }}>{"5GB"}</span>
                {" free travel data"}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: v.travelSubInk,
                  lineHeight: "1.35",
                }}
              >
                {v.travelRowSub}
              </span>
            </span>
            {v.travelDark ? (
              <>
                <span
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "6px",
                    flex: "none",
                  }}
                >
                  {v.travelLocked ? (
                    <>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "800",
                          whiteSpace: "nowrap",
                          background: "#3A3550",
                          color: "#E4DBFF",
                          borderRadius: "999px",
                          padding: "4px 10px",
                        }}
                      >
                        {"Locked"}
                      </span>
                    </>
                  ) : null}
                  {v.travelOpen ? (
                    <>
                      <Artwork
                        src="/haiba/brands/airalo-white.svg"
                        alt="Airalo"
                        style={{ height: "14px", width: "auto", display: "block" }}
                      />
                    </>
                  ) : null}
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C0F402"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 6l6 6-6 6"></path>
                  </svg>
                </span>
              </>
            ) : null}
            {v.travelUsed ? (
              <>
                <span
                  style={{
                    position: "relative",
                    flex: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    whiteSpace: "nowrap",
                    fontSize: "13px",
                    fontWeight: "800",
                    borderRadius: "999px",
                    padding: "7px 12px",
                    background: "#E8F5E3",
                    color: "#2F7D32",
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
                  {"Used"}
                </span>
              </>
            ) : null}
          </Link>
          <div
            className="hb-rise hb-d3"
            style={{
              marginTop: "10px",
              background: "#FFFFFF",
              border: "1px solid #E9E5F4",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(76,52,140,0.06)",
            }}
          >
            <Link
              className="hb-row"
              style={{
                width: "100%",
                boxSizing: "border-box",
                textDecoration: "none",
                color: "#1E1B2E",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 16px",
                borderTop: "none",
              }}
              to="/haiba/subscriptions"
            >
              <span style={{ position: "relative", width: "44px", height: "44px", flex: "none" }}>
                <Artwork
                  src="/haiba/brands/spotify.webp"
                  alt=""
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "0",
                    width: "30px",
                    height: "30px",
                    borderRadius: "9px",
                    display: "block",
                    boxShadow: "0 0 0 2px #FFFFFF",
                  }}
                />
                <Artwork
                  src="/haiba/brands/chatgpt.webp"
                  alt=""
                  style={{
                    position: "absolute",
                    right: "0",
                    bottom: "0",
                    width: "30px",
                    height: "30px",
                    borderRadius: "9px",
                    display: "block",
                    background: "#FFFFFF",
                    boxShadow: "0 0 0 2px #FFFFFF, 0 0 0 3px #ECE8F5",
                  }}
                />
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
                <span style={{ fontSize: "15.5px", fontWeight: "800", lineHeight: "1.25" }}>
                  {"Subscriptions"}
                </span>
                <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#6B6880" }}>
                  {"Spotify and ChatGPT, 3 months free"}
                </span>
              </span>
              <span
                style={{
                  flex: "none",
                  fontSize: "13px",
                  fontWeight: "800",
                  borderRadius: "999px",
                  padding: "7px 12px",
                  background: "#F0ECFF",
                  color: "#4F25D6",
                }}
              >
                {v.subsPill}
              </span>
            </Link>
          </div>
        </div>
        {v.menuOpen ? (
          <>
            <div
              className="hb-fade"
              style={{
                position: "fixed",
                inset: "0",
                background: "rgba(20,16,40,0.5)",
                zIndex: "70",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <button
                onClick={v.toggleMenu}
                aria-label="Close"
                style={{
                  position: "absolute",
                  inset: "0",
                  border: "0",
                  background: "transparent",
                  cursor: "default",
                }}
              ></button>
              <div
                className="hb-up"
                role="dialog"
                aria-label="Haiba menu"
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "430px",
                  margin: "0 auto",
                  boxSizing: "border-box",
                  background: "#F3F0FA",
                  borderRadius: "16px 16px 0 0",
                  padding: "10px 16px 34px 16px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "5px",
                    borderRadius: "999px",
                    background: "#D9D3EA",
                    margin: "0 auto 14px auto",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 4px",
                  }}
                >
                  <span style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "-0.02em" }}>
                    {"Haiba"}
                  </span>
                  <button
                    onClick={v.toggleMenu}
                    aria-label="Close"
                    className="hb-press"
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "0",
                      borderRadius: "50%",
                      background: "#FFFFFF",
                      color: "#1E1B2E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 0 0 1px #ECE8F5",
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
                    >
                      <path d="M6 6l12 12M18 6L6 18"></path>
                    </svg>
                  </button>
                </div>
                <div
                  style={{
                    marginTop: "14px",
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    boxShadow: "0 0 0 1px #ECE8F5",
                    overflow: "hidden",
                  }}
                >
                  {(v.menuRows || []).map((m: any, idx0: number) => (
                    <Fragment key={idx0}>
                      <a
                        className="hb-row"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          padding: "14px 16px",
                          textDecoration: "none",
                          color: "#1E1B2E",
                          borderTop: m.rule,
                        }}
                        href="#"
                        onClick={(e: any) => {
                          e.preventDefault();
                          go(m.route);
                        }}
                      >
                        <span
                          style={{
                            width: "44px",
                            height: "44px",
                            flex: "none",
                            borderRadius: "12px",
                            overflow: "hidden",
                            background: m.bg,
                            color: "#6C3FFA",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {m.hasIcon ? (
                            <>
                              <Artwork
                                src={m.icon}
                                alt=""
                                style={{ width: m.iw, height: "auto", display: "block" }}
                              />
                            </>
                          ) : null}
                          {m.isHelp ? (
                            <>
                              <svg
                                aria-hidden="true"
                                width="22"
                                height="22"
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
                            </>
                          ) : null}
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
                          <span style={{ fontSize: "16px", fontWeight: "800" }}>{m.title}</span>
                          <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#6B6880" }}>
                            {m.sub}
                          </span>
                        </span>
                        <svg
                          aria-hidden="true"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#6C3FFA"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 6l6 6-6 6"></path>
                        </svg>
                      </a>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className="hb-fixed-bottom">
          <div className="hb-fixed-inner">
            <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", zIndex: "20" }}>
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
                      borderRadius: "12px 12px 4px 12px",
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
