// @ts-nocheck
// Ported 1:1 from the Design canvas board "Story.dc.html". Styles are copied value for value.
import Artwork from "../Artwork";
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import { useVals } from "../logic/story";

export default function Welcome() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-story">
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          margin: "0 auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #D6C6FF 0%, #E9E1FF 45%, #F3F0FA 100%)",
          fontFamily: "Figtree, system-ui, sans-serif",
          color: "#1E1B2E",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between", padding: "18px 16px 0 16px" }}
        >
          <button
            aria-label="Back"
            onClick={v.prev}
            className="hb-press"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "0",
              background: "rgba(255,255,255,0.85)",
              color: "#1E1B2E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0",
              cursor: "pointer",
              opacity: v.backOp,
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
              strokeLinejoin="round"
            >
              <path d="M19 12H5"></path>
              <path d="M11 6l-6 6 6 6"></path>
            </svg>
          </button>
          <Link
            aria-label="Close"
            className="hb-press"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "0",
              background: "rgba(255,255,255,0.85)",
              color: "#1E1B2E",
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
            margin: "26px 16px 0 16px",
            height: "340px",
            borderRadius: "32px",
            background: "#FFFFFF",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 44px rgba(76,52,140,0.16)",
          }}
        >
          {v.s0 ? (
            <>
              <div className={v.inClass} style={{ position: "absolute", inset: "0" }}>
                <div
                  className="hb-rise hb-d1"
                  style={{
                    position: "absolute",
                    left: "22px",
                    right: "22px",
                    top: "34px",
                    background: "#F7F5FC",
                    borderRadius: "20px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: "#D62828",
                      color: "#FFFFFF",
                      fontWeight: "800",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {"J"}
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px", flex: "1" }}>
                    <span style={{ fontSize: "16px", fontWeight: "700" }}>{"Jasmi's"}</span>
                    <span style={{ fontSize: "13.5px", fontWeight: "500", color: "#6B6880" }}>
                      {"BD 2 per meal only"}
                    </span>
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      background: "#1E1B2E",
                      color: "#FFFFFF",
                      borderRadius: "999px",
                      padding: "7px 12px",
                    }}
                  >
                    {"Redeemed"}
                  </span>
                </div>
                <div
                  className="hb-pop hb-d3"
                  style={{
                    position: "absolute",
                    left: "22px",
                    top: "136px",
                    transformOrigin: "left center",
                  }}
                >
                  <div
                    style={{
                      background: "#1E1B2E",
                      color: "#FFFFFF",
                      borderRadius: "18px",
                      padding: "12px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transform: "rotate(-3deg)",
                      boxShadow: "0 12px 24px rgba(30,27,46,0.25)",
                    }}
                  >
                    <span
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: "#6C3FFA",
                        boxShadow: "inset 0 0 0 4px #C0F402",
                      }}
                    ></span>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "16px", fontWeight: "800", color: "#C0F402" }}>
                        {"+80 points"}
                      </span>
                      <span style={{ fontSize: "12.5px", fontWeight: "500", color: "#CFC9E0" }}>
                        {"2x, your first visit here"}
                      </span>
                    </span>
                  </div>
                </div>
                <span
                  className="hb-rise hb-d2"
                  style={{ position: "absolute", right: "10px", bottom: "-22px", display: "block" }}
                >
                  <Artwork priority
                    src="/haiba/birds/07-phone.png"
                    alt=""
                    style={{ height: "238px", width: "auto", display: "block" }}
                  />
                </span>
              </div>
            </>
          ) : null}
          {v.s1 ? (
            <>
              <div className={v.inClass} style={{ position: "absolute", inset: "0" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "22px",
                    right: "22px",
                    top: "40px",
                    background: "#F7F5FC",
                    borderRadius: "22px",
                    padding: "18px",
                  }}
                >
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#6B6880" }}>
                    {"Caribou Coffee"}
                  </div>
                  <div
                    className="hb-stamps"
                    style={{ display: "flex", justifyContent: "space-between", marginTop: "14px" }}
                  >
                    {(v.stamps || []).map((d: any, idx0: number) => (
                      <Fragment key={idx0}>
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span
                            style={{
                              width: "46px",
                              height: "46px",
                              borderRadius: "50%",
                              background: d.bg,
                              color: d.ink,
                              border: `2px solid ${d.ring}`,
                              boxSizing: "border-box",
                              fontSize: "14px",
                              fontWeight: "800",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {d.tag}
                          </span>
                          <span style={{ fontSize: "12px", fontWeight: "600", color: "#6B6880" }}>
                            {d.pts}
                          </span>
                        </span>
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div
                  className="hb-rise hb-d3"
                  style={{
                    position: "absolute",
                    left: "22px",
                    right: "160px",
                    bottom: "30px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#4A4660",
                    lineHeight: "1.4",
                  }}
                >
                  {"Counted per shop, like a stamp card."}
                </div>
                <span
                  className="hb-rise hb-d2"
                  style={{ position: "absolute", right: "8px", bottom: "-34px", display: "block" }}
                >
                  <Artwork priority
                    src="/haiba/birds/08-stamp.png"
                    alt=""
                    style={{ height: "220px", width: "auto", display: "block" }}
                  />
                </span>
              </div>
            </>
          ) : null}
          {v.s2 ? (
            <>
              <div className={v.inClass} style={{ position: "absolute", inset: "0" }}>
                <div
                  className="hb-flip"
                  style={{
                    position: "absolute",
                    left: "40px",
                    right: "40px",
                    top: "30px",
                    bottom: "30px",
                    transformOrigin: "left center",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      boxSizing: "border-box",
                      background: "#6C3FFA",
                      borderRadius: "24px",
                      color: "#FFFFFF",
                      padding: "22px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "0 18px 30px rgba(108,63,250,0.30)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#E4DBFF",
                      }}
                    >
                      <span>{"Code 1 of 1"}</span>
                      <span>{"Use by 20 Nov"}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontSize: "15px", fontWeight: "600", color: "#E4DBFF" }}>
                        {"Caribou Coffee"}
                      </span>
                      <span style={{ fontSize: "22px", fontWeight: "800" }}>{"Free upgrade"}</span>
                    </div>
                    <div
                      style={{
                        background: "#FFFFFF",
                        color: "#1E1B2E",
                        borderRadius: "16px",
                        padding: "14px",
                        textAlign: "center",
                        fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                        fontSize: "28px",
                        fontWeight: "800",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {"HB-7K2Q-9X"}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#F3EEFF",
                        textAlign: "center",
                      }}
                    >
                      {"Show this code to staff at Caribou"}
                    </div>
                  </div>
                </div>
                <span
                  className="hb-pop hb-d3"
                  style={{
                    position: "absolute",
                    left: "-4px",
                    bottom: "-40px",
                    display: "block",
                    transformOrigin: "bottom left",
                  }}
                >
                  <Artwork priority
                    src="/haiba/birds/09-show.png"
                    alt=""
                    style={{
                      height: "196px",
                      width: "auto",
                      display: "block",
                      filter: "drop-shadow(0 10px 12px rgba(30,27,46,0.25))",
                    }}
                  />
                </span>
              </div>
            </>
          ) : null}
          {v.s3 ? (
            <>
              <div className={v.inClass} style={{ position: "absolute", inset: "0" }}>
                <div
                  className="hb-pops"
                  style={{
                    position: "absolute",
                    left: "22px",
                    top: "34px",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 92px)",
                    gap: "12px",
                  }}
                >
                  {(v.gifts || []).map((g: any, idx0: number) => (
                    <Fragment key={idx0}>
                      <button
                        onClick={g.pick}
                        aria-pressed={g.selStr}
                        className="hb-press hb-ease"
                        style={{
                          font: "inherit",
                          border: "0",
                          padding: "0",
                          cursor: "pointer",
                          height: "92px",
                          borderRadius: "22px",
                          background: g.bg,
                          color: g.ink,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                          boxShadow: g.shadow,
                          transform: `scale(${g.scale})`,
                        }}
                      >
                        <span style={{ fontSize: "22px", fontWeight: "800" }}>{g.mark}</span>
                        <span style={{ fontSize: "11.5px", fontWeight: "700" }}>{g.item}</span>
                      </button>
                    </Fragment>
                  ))}
                </div>
                <span
                  className="hb-ease"
                  style={{
                    position: "absolute",
                    left: "22px",
                    bottom: "26px",
                    background: v.pickBg,
                    color: v.pickInk,
                    fontSize: "14px",
                    fontWeight: "800",
                    borderRadius: "999px",
                    padding: "8px 14px",
                  }}
                >
                  {v.pickLabel}
                </span>
                <span
                  className="hb-rise hb-d2"
                  style={{ position: "absolute", right: "12px", bottom: "-20px", display: "block" }}
                >
                  <Artwork priority
                    src="/haiba/birds/10-gift.png"
                    alt=""
                    style={{ height: "262px", width: "auto", display: "block" }}
                  />
                </span>
              </div>
            </>
          ) : null}
        </div>
        <div style={{ padding: "26px 20px 0 20px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              background: "#1E1B2E",
              color: "#C0F402",
              borderRadius: "999px",
              padding: "8px 14px",
            }}
          >
            {"How it works \u00b7 "}
            {v.stepLabel}
          </span>
          {v.s0 ? (
            <>
              <div
                className="hb-rise"
                style={{
                  fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                  fontSize: "27px",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                  marginTop: "18px",
                  minHeight: "102px",
                }}
              >
                {"Use any Unipal offer. Your points land on their own."}
              </div>
            </>
          ) : null}
          {v.s1 ? (
            <>
              <div
                className="hb-rise"
                style={{
                  fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                  fontSize: "27px",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                  marginTop: "18px",
                  minHeight: "102px",
                }}
              >
                {"Your first 2 visits at a shop earn 2x. Every 5th visit earns 5x."}
              </div>
            </>
          ) : null}
          {v.s2 ? (
            <>
              <div
                className="hb-rise"
                style={{
                  fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                  fontSize: "27px",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                  marginTop: "18px",
                  minHeight: "102px",
                }}
              >
                {"Spend points on free items. Show your code at the shop."}
              </div>
            </>
          ) : null}
          {v.s3 ? (
            <>
              <div
                className="hb-rise"
                style={{
                  fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                  fontSize: "27px",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                  marginTop: "18px",
                  minHeight: "102px",
                }}
              >
                {"Pick 1 free Unipass gift every month. Tap one to try."}
              </div>
            </>
          ) : null}
          <div style={{ display: "flex", gap: "8px", marginTop: "18px" }}>
            {(v.dashes || []).map((d: any, idx0: number) => (
              <Fragment key={idx0}>
                <button
                  aria-label={d.label}
                  onClick={d.go}
                  className="hb-ease"
                  style={{
                    width: d.w,
                    height: "6px",
                    borderRadius: "999px",
                    border: "0",
                    padding: "0",
                    cursor: "pointer",
                    background: d.bg,
                  }}
                ></button>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="hb-fixed-bottom">
          <div className="hb-fixed-inner">
            <div style={{ position: "absolute", left: "16px", right: "16px", bottom: "30px" }}>
              <button
                onClick={v.next}
                className="hb-press"
                style={{
                  width: "100%",
                  font: "inherit",
                  fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                  fontSize: "17px",
                  fontWeight: "800",
                  border: "0",
                  borderRadius: "999px",
                  padding: "18px",
                  cursor: "pointer",
                  background: "#1E1B2E",
                  color: "#C0F402",
                  boxShadow: "0 10px 24px rgba(30,27,46,0.22)",
                }}
              >
                {v.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
