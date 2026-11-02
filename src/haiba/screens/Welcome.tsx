// @ts-nocheck
// Ported 1:1 from the Design canvas board "Story.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import WelcomeVideo from "../WelcomeVideo";
import { useVals } from "../logic/story";

export default function Welcome() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  const videoStep = v.s0 ? 1 : v.s1 ? 2 : v.s3 ? 4 : v.s4 ? 5 : null;
  return (
    <div className={`pg-story hb-welcome-step-${videoStep ?? 3}`}>
      <div
        className="hb-bg"
        style={{
          width: "100%",
          maxWidth: "390px",
          margin: "0 auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          background: "var(--hb-welcome-surface)",
          fontFamily: "Figtree, system-ui, sans-serif",
          color: "var(--hb-welcome-ink)",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
              color: "var(--hb-welcome-ink)",
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
              color: "var(--hb-welcome-ink)",
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
              color: "var(--hb-welcome-muted)",
              lineHeight: "1.35",
            }}
          >
            {v.sub}
          </div>
        </div>
        {videoStep ? <WelcomeVideo key={videoStep} step={videoStep} /> : null}
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
        {v.s4 ? (
          <>
            <div
              className="hb-welcome-gifts"
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
