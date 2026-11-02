// @ts-nocheck
// Ported 1:1 from the Design canvas board "Story.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/story";

export default function Welcome() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-story">
      <div
        className="hb-bg"
        style={{
          width: "100%",
          maxWidth: "390px",
          margin: "0 auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          background: v.bg,
          fontFamily: "Figtree, system-ui, sans-serif",
          color: "#1E1B2E",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-305px",
            top: "-20px",
            width: "1000px",
            height: "1000px",
            pointerEvents: "none",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, #000 0%, rgba(0,0,0,0.6) 22%, transparent 48%)",
            maskImage:
              "radial-gradient(circle at 50% 50%, #000 0%, rgba(0,0,0,0.6) 22%, transparent 48%)",
          }}
        >
          <div
            className="hb-spin"
            style={{
              width: "100%",
              height: "100%",
              background:
                "repeating-conic-gradient(from 0deg, rgba(255,255,255,0.75) 0deg 7deg, rgba(255,255,255,0) 7deg 20deg)",
            }}
          ></div>
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "45px",
            top: "330px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0) 70%)",
            pointerEvents: "none",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            left: "8px",
            right: "8px",
            top: "10px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: "5",
          }}
        >
          <button
            aria-label="Back"
            onClick={v.prev}
            className="hb-press"
            style={{
              width: "44px",
              height: "44px",
              border: "0",
              background: "transparent",
              color: "#1E1B2E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0",
              cursor: "pointer",
              visibility: v.backVis,
            }}
          >
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
              <path d="M15 5l-7 7 7 7"></path>
            </svg>
          </button>
          <div style={{ flex: "1", display: "flex", gap: "5px", padding: "0 6px" }}>
            {(v.dashes || []).map((d: any, idx0: number) => (
              <Fragment key={idx0}>
                <button
                  aria-label={d.label}
                  onClick={d.go}
                  className="hb-ease"
                  style={{
                    flex: "1",
                    height: "5px",
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
          <Link
            aria-label="Close"
            className="hb-press"
            style={{
              width: "44px",
              height: "44px",
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
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18"></path>
            </svg>
          </Link>
        </div>
        <div
          style={{
            position: "absolute",
            left: "24px",
            right: "24px",
            top: "78px",
            textAlign: "center",
            zIndex: "4",
          }}
        >
          {v.s0 ? (
            <>
              <div
                className="hb-rise"
                style={{
                  fontSize: "34px",
                  fontWeight: "900",
                  letterSpacing: "-0.035em",
                  lineHeight: "1.06",
                }}
              >
                {"You're in!"}
                <br />
                {"Welcome to "}
                <span className="hl">{"Haiba"}</span>
              </div>
            </>
          ) : null}
          {v.s1 ? (
            <>
              <div
                className="hb-rise"
                style={{
                  fontSize: "34px",
                  fontWeight: "900",
                  letterSpacing: "-0.035em",
                  lineHeight: "1.06",
                }}
              >
                {"Use any Unipal offer."}
                <br />
                {"Earn "}
                <span className="hl">{"points"}</span>
              </div>
            </>
          ) : null}
          {v.s2 ? (
            <>
              <div
                className="hb-rise"
                style={{
                  fontSize: "34px",
                  fontWeight: "900",
                  letterSpacing: "-0.035em",
                  lineHeight: "1.06",
                }}
              >
                {"First 2 visits earn "}
                <span className="hl">{"2x"}</span>
                {"."}
                <br />
                {"Every 5th earns "}
                <span className="hl">{"5x"}</span>
              </div>
            </>
          ) : null}
          {v.s3 ? (
            <>
              <div
                className="hb-rise"
                style={{
                  fontSize: "34px",
                  fontWeight: "900",
                  letterSpacing: "-0.035em",
                  lineHeight: "1.06",
                }}
              >
                {"Spend your points"}
                <br />
                {"on "}
                <span className="hl">{"free stuff"}</span>
              </div>
            </>
          ) : null}
          {v.s4 ? (
            <>
              <div
                className="hb-rise"
                style={{
                  fontSize: "34px",
                  fontWeight: "900",
                  letterSpacing: "-0.035em",
                  lineHeight: "1.06",
                }}
              >
                {"Pick "}
                <span className="hl">{"1 free gift"}</span>
                <br />
                {"every month"}
              </div>
            </>
          ) : null}
          <div
            className="hb-rise hb-d2"
            style={{
              marginTop: "12px",
              fontSize: "16px",
              fontWeight: "600",
              color: "#5B5770",
              lineHeight: "1.35",
            }}
          >
            {v.sub}
          </div>
        </div>
        {v.s0 ? (
          <>
            <div
              aria-hidden="true"
              style={{ position: "absolute", inset: "0", pointerEvents: "none" }}
            >
              {(v.confetti || []).map((c: any, idx0: number) => (
                <Fragment key={idx0}>
                  <span
                    className="hb-fall"
                    style={{
                      position: "absolute",
                      left: `${c.x}px`,
                      top: `${c.y}px`,
                      width: `${c.w}px`,
                      height: `${c.h}px`,
                      borderRadius: "3px",
                      background: c.bg,
                      animationDelay: `${c.d}s`,
                    }}
                  ></span>
                </Fragment>
              ))}
            </div>
            <span
              className="hb-pop hb-d1"
              style={{ position: "absolute", left: "44px", top: "404px", display: "block" }}
            >
              <Artwork
                priority
                className="hb-float"
                src="/haiba/coins/coin-34.webp"
                alt=""
                style={{ width: "58px", height: "58px", display: "block", animationDelay: ".4s" }}
              />
            </span>
            <span
              className="hb-pop hb-d3"
              style={{ position: "absolute", right: "-26px", top: "600px", display: "block" }}
            >
              <Artwork
                className="hb-float"
                src="/haiba/coins/coin-34.webp"
                alt=""
                style={{
                  width: "104px",
                  height: "104px",
                  display: "block",
                  filter: "blur(3px)",
                  opacity: "0.9",
                  animationDelay: "1.1s",
                }}
              />
            </span>
            <span
              className="hb-pop"
              style={{
                position: "absolute",
                left: "78px",
                top: "346px",
                width: "234px",
                display: "block",
              }}
            >
              <Artwork
                className="hb-float"
                src="/haiba/birds/02-jump.png"
                alt="Haiba bird jumping for joy"
                style={{ width: "234px", height: "auto", display: "block" }}
              />
            </span>
          </>
        ) : null}
        {v.s1 ? (
          <>
            <span
              className="hb-pop"
              style={{
                position: "absolute",
                left: "82px",
                top: "366px",
                width: "226px",
                display: "block",
              }}
            >
              <Artwork
                className="hb-float"
                src="/haiba/birds/07-phone.png"
                alt="Haiba bird using an offer on a phone"
                style={{ width: "226px", height: "auto", display: "block" }}
              />
            </span>
            <span
              className="hb-pop hb-d3"
              style={{
                position: "absolute",
                left: "18px",
                top: "318px",
                display: "block",
                zIndex: "2",
              }}
            >
              <span
                className="hb-bobl"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "#1E1B2E",
                  color: "#FFFFFF",
                  borderRadius: "18px",
                  padding: "10px 14px 10px 10px",
                  boxShadow: "0 14px 28px rgba(30,27,46,0.28)",
                }}
              >
                <Artwork
                  src="/haiba/coins/coin-34.webp"
                  alt=""
                  style={{ width: "30px", height: "30px", display: "block" }}
                />
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "17px", fontWeight: "900", color: "#C0F402" }}>
                    {"+80 points"}
                  </span>
                  <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#CFC9E0" }}>
                    {"Jasmi's \u00b7 2x first visit"}
                  </span>
                </span>
              </span>
            </span>
            <span
              className="hb-pop hb-d2"
              style={{ position: "absolute", left: "300px", top: "404px", display: "block" }}
            >
              <Artwork
                className="hb-float"
                src="/haiba/coins/coin-34.webp"
                alt=""
                style={{ width: "60px", height: "60px", display: "block", animationDelay: ".7s" }}
              />
            </span>
            <span
              className="hb-pop hb-d4"
              style={{ position: "absolute", left: "-30px", top: "640px", display: "block" }}
            >
              <Artwork
                className="hb-float"
                src="/haiba/coins/coin-34.webp"
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  display: "block",
                  filter: "blur(3px)",
                  animationDelay: "1.3s",
                }}
              />
            </span>
          </>
        ) : null}
        {v.s2 ? (
          <>
            {(v.stamps || []).map((d: any, idx0: number) => (
              <Fragment key={idx0}>
                <span
                  className={`hb-stamp ${d.delay}`}
                  style={{
                    position: "absolute",
                    left: `${d.x}px`,
                    top: `${d.y}px`,
                    width: `${d.size}px`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "5px",
                    zIndex: "2",
                  }}
                >
                  <span
                    style={{
                      width: `${d.size}px`,
                      height: `${d.size}px`,
                      borderRadius: "50%",
                      background: d.bg,
                      color: d.ink,
                      border: `2.5px ${d.style} ${d.ring}`,
                      boxSizing: "border-box",
                      fontSize: `${d.fs}px`,
                      fontWeight: "900",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: d.shadow,
                    }}
                  >
                    {d.tag}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "800",
                      color: d.ptsInk,
                      background: d.ptsBg,
                      borderRadius: "999px",
                      padding: "2px 8px",
                    }}
                  >
                    {d.pts}
                  </span>
                </span>
              </Fragment>
            ))}
            <span
              className="hb-pop"
              style={{
                position: "absolute",
                left: "125px",
                top: "438px",
                width: "140px",
                display: "block",
              }}
            >
              <Artwork
                className="hb-float"
                src="/haiba/birds/08-stamp.png"
                alt="Haiba bird stamping a card"
                style={{ width: "140px", height: "auto", display: "block" }}
              />
            </span>
          </>
        ) : null}
        {v.s3 ? (
          <>
            <span
              className="hb-pop"
              style={{
                position: "absolute",
                left: "129px",
                top: "384px",
                width: "132px",
                display: "block",
              }}
            >
              <Artwork
                className="hb-float"
                src="/haiba/birds/09-show.png"
                alt="Haiba bird showing a code on a phone"
                style={{ width: "132px", height: "auto", display: "block" }}
              />
            </span>
            <span
              className="hb-pop hb-d2"
              style={{ position: "absolute", left: "22px", top: "520px", display: "block" }}
            >
              <Artwork
                className="hb-float"
                src="/haiba/coins/coin-stack-3d.png"
                alt=""
                style={{ width: "84px", height: "84px", display: "block", animationDelay: ".6s" }}
              />
            </span>
            <span
              className="hb-pop hb-d3"
              style={{
                position: "absolute",
                left: "222px",
                top: "318px",
                display: "block",
                zIndex: "2",
              }}
            >
              <span
                className="hb-bobr"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "148px",
                  background: "#FFFFFF",
                  borderRadius: "18px",
                  boxShadow: "0 14px 28px rgba(30,27,46,0.18)",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    padding: "12px 14px 10px 14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#6B6880" }}>
                    {"Caribou Coffee"}
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: "900" }}>{"Free upgrade"}</span>
                </span>
                <span style={{ borderTop: "2px dashed #ECE8F5", margin: "0 10px" }}></span>
                <span
                  style={{
                    padding: "9px 14px 12px 14px",
                    fontSize: "16px",
                    fontWeight: "900",
                    letterSpacing: "0.08em",
                    color: "#6C3FFA",
                  }}
                >
                  {"HB 7K2Q"}
                </span>
              </span>
            </span>
            <span
              className="hb-pop hb-d4"
              style={{ position: "absolute", left: "318px", top: "600px", display: "block" }}
            >
              <Artwork
                className="hb-float"
                src="/haiba/coins/coin-34.webp"
                alt=""
                style={{ width: "50px", height: "50px", display: "block", animationDelay: "1s" }}
              />
            </span>
          </>
        ) : null}
        {v.s4 ? (
          <>
            <span
              className="hb-pop"
              style={{
                position: "absolute",
                left: "141px",
                top: "300px",
                width: "108px",
                display: "block",
              }}
            >
              <Artwork
                className="hb-float"
                src="/haiba/birds/10-gift.png"
                alt="Haiba bird holding up a gift"
                style={{ width: "108px", height: "auto", display: "block" }}
              />
            </span>
            <div
              style={{
                position: "absolute",
                left: "21px",
                right: "21px",
                top: "600px",
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "8px",
                zIndex: "2",
              }}
            >
              {(v.gifts || []).map((g: any, idx0: number) => (
                <Fragment key={idx0}>
                  <button
                    onClick={g.pick}
                    aria-pressed={g.selStr}
                    className={`hb-press hb-ease hb-rise ${g.delay}`}
                    style={{
                      font: "inherit",
                      border: "0",
                      padding: "0",
                      cursor: "pointer",
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "#FFFFFF",
                      color: "#1E1B2E",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: g.shadow,
                      transform: `scale(${g.scale})`,
                      opacity: g.op,
                      position: "relative",
                    }}
                  >
                    <Artwork
                      src={g.logo}
                      alt={g.brand}
                      style={{
                        width: "100%",
                        height: "58px",
                        boxSizing: "border-box",
                        padding: "6px",
                        objectFit: "contain",
                        background: g.bg,
                        display: "block",
                      }}
                    />
                    <span
                      style={{
                        padding: "7px 4px 8px 4px",
                        fontSize: "11.5px",
                        fontWeight: "800",
                        lineHeight: "1.15",
                        textAlign: "center",
                      }}
                    >
                      {g.item}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "#6C3FFA",
                        color: "#FFFFFF",
                        display: g.tickDisp,
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 0 2px #FFFFFF",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </button>
                </Fragment>
              ))}
            </div>
          </>
        ) : null}
        <div className="hb-fixed-bottom">
          <div className="hb-fixed-inner">
            <div
              style={{
                position: "absolute",
                left: "0",
                right: "0",
                bottom: "34px",
                display: "flex",
                justifyContent: "center",
                zIndex: "5",
              }}
            >
              {v.notLast ? (
                <>
                  <button
                    onClick={v.next}
                    className="hb-press"
                    style={{
                      font: "inherit",
                      fontSize: "17px",
                      fontWeight: "800",
                      border: "0",
                      borderRadius: "999px",
                      padding: "17px 30px",
                      minWidth: "190px",
                      cursor: "pointer",
                      background: "#1E1B2E",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 12px 26px rgba(30,27,46,0.24)",
                    }}
                  >
                    {v.cta}
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                  </button>
                </>
              ) : null}
              {v.isLast ? (
                <>
                  <Link
                    className="hb-press"
                    style={{
                      fontSize: "17px",
                      fontWeight: "800",
                      borderRadius: "999px",
                      padding: "17px 30px",
                      minWidth: "190px",
                      boxSizing: "border-box",
                      background: "#1E1B2E",
                      color: "#C0F402",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 12px 26px rgba(30,27,46,0.24)",
                    }}
                    to="/haiba"
                  >
                    {"Take me to Haiba"}
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
