// @ts-nocheck
// Ported 1:1 from the Design canvas board "Points.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import MotionReveal from "../MotionReveal";
import Artwork from "../Artwork";
import { useVals } from "../logic/points";

export default function Points() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-points">
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
            height: "470px",
            background: "linear-gradient(180deg, #D6C6FF 0%, #E9E1FF 55%, #F3F0FA 100%)",
          }}
        ></div>
        <svg
          aria-hidden="true"
          className="hb-spin"
          width="340"
          height="340"
          viewBox="0 0 340 340"
          fill="none"
          style={{ position: "absolute", left: "95px", top: "40px", transformOrigin: "center" }}
        >
          <path
            d="M170 10l130 75v150l-130 75-130-75V85z"
            stroke="#6C3FFA"
            strokeOpacity="0.10"
            strokeWidth="2"
          ></path>
          <path
            d="M170 40l104 60v120l-104 60-104-60V100z"
            stroke="#6C3FFA"
            strokeOpacity="0.16"
            strokeWidth="2"
          ></path>
          <path
            d="M170 70l78 45v90l-78 45-78-45v-90z"
            stroke="#6C3FFA"
            strokeOpacity="0.22"
            strokeWidth="2"
          ></path>
        </svg>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "14px 16px 150px 16px",
          }}
        >
          <Link
            aria-label="Back"
            className="hb-rise hb-press"
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
              textDecoration: "none",
            }}
            to="/haiba/plans"
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
          <div style={{ position: "relative", height: "270px" }}>
            <span
              className="hb-peek"
              style={{
                position: "absolute",
                left: "0",
                right: "0",
                bottom: "-6px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Artwork
                priority
                src="/haiba/birds/17-coin-toss.webp"
                alt="The Unipal bird tossing a Haiba coin"
                style={{
                  height: "300px",
                  width: "auto",
                  display: "block",
                  filter: "drop-shadow(0 14px 14px rgba(30,27,46,0.18))",
                }}
              />
            </span>
            <span
              className="hb-pop hb-d3"
              style={{ position: "absolute", right: "8px", top: "18px", display: "block" }}
            >
              <span
                style={{
                  display: "block",
                  background: "#C0F402",
                  color: "#1F2600",
                  fontSize: "14px",
                  fontWeight: "800",
                  borderRadius: "999px",
                  padding: "6px 12px",
                  transform: "rotate(8deg)",
                  boxShadow: "0 6px 14px rgba(30,27,46,0.12)",
                }}
              >
                {"+200"}
              </span>
            </span>
            <span
              className="hb-pop hb-d4"
              style={{ position: "absolute", left: "22px", bottom: "80px", display: "block" }}
            >
              <span
                style={{
                  display: "block",
                  background: "#FFFFFF",
                  color: "#6C3FFA",
                  fontSize: "14px",
                  fontWeight: "800",
                  borderRadius: "999px",
                  padding: "6px 12px",
                  transform: "rotate(-6deg)",
                  boxShadow: "0 6px 14px rgba(30,27,46,0.10)",
                }}
              >
                {"2x"}
              </span>
            </span>
            <span
              className="hb-pop hb-d5"
              style={{ position: "absolute", right: "24px", bottom: "70px", display: "block" }}
            >
              <span
                style={{
                  display: "block",
                  background: "#1E1B2E",
                  color: "#C0F402",
                  fontSize: "14px",
                  fontWeight: "800",
                  borderRadius: "999px",
                  padding: "6px 12px",
                  transform: "rotate(4deg)",
                  boxShadow: "0 6px 14px rgba(30,27,46,0.16)",
                }}
              >
                {"+40"}
              </span>
            </span>
          </div>
          <h1
            className="hb-rise hb-d1"
            style={{
              margin: "6px 0 0 0",
              fontFamily: "Figtree, system-ui, sans-serif",
              fontSize: "34px",
              fontWeight: "800",
              lineHeight: "1.08",
              letterSpacing: "-0.03em",
            }}
          >
            {"Earn points every time you save"}
          </h1>
          <div
            className="hb-rise hb-d2"
            style={{ fontSize: "17px", fontWeight: "500", color: "#4A4660", marginTop: "8px" }}
          >
            {
              "Haiba members earn points every time they use a Unipal offer. Tap a rule to see an example."
            }
          </div>
          <div
            className="hb-rise hb-d2"
            style={{
              fontSize: "13px",
              fontWeight: "800",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6C3FFA",
              margin: "24px 0 10px 4px",
            }}
          >
            {"Earn points"}
          </div>
          <div
            className="hb-stagger"
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#FFFFFF",
              borderRadius: "28px",
              padding: "4px 12px",
              boxShadow: "0 10px 26px rgba(76,52,140,0.08)",
            }}
          >
            {(v.earn || []).map((r: any, idx0: number) => (
              <Fragment key={idx0}>
                <div style={{ borderBottom: r.line }}>
                  <button
                    onClick={r.toggle}
                    aria-expanded={r.openStr}
                    className="hb-row"
                    style={{
                      width: "100%",
                      font: "inherit",
                      textAlign: "left",
                      border: "0",
                      background: "transparent",
                      color: "#1E1B2E",
                      display: "flex",
                      gap: "16px",
                      padding: "16px 4px",
                      cursor: "pointer",
                      borderRadius: "14px",
                    }}
                  >
                    <span
                      className="hb-ease"
                      style={{
                        width: "44px",
                        height: "44px",
                        flex: "none",
                        borderRadius: "14px",
                        background: r.bg,
                        color: r.ink,
                        fontFamily: "Figtree, system-ui, sans-serif",
                        fontSize: "14px",
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
                      <span style={{ fontSize: "16.5px", fontWeight: "700", lineHeight: "1.3" }}>
                        {r.title}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#6B6880",
                          lineHeight: "1.4",
                        }}
                      >
                        {r.sub}
                      </span>
                    </span>
                    <svg
                      aria-hidden="true"
                      className="hb-ease"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#A9A6B8"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flex: "none", marginTop: "4px", transform: `rotate(${r.rot})` }}
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </button>
                  <MotionReveal open={r.open}>
                    <div
                      className="hb-rise"
                      style={{
                        margin: "0 4px 16px 64px",
                        background: "#1E1B2E",
                        color: "#FFFFFF",
                        borderRadius: "16px",
                        padding: "12px 14px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
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
                        {"Example"}
                      </span>
                      <span style={{ fontSize: "14.5px", fontWeight: "500", lineHeight: "1.45" }}>
                        {r.example}
                      </span>
                    </div>
                  </MotionReveal>
                </div>
              </Fragment>
            ))}
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              fontSize: "13px",
              fontWeight: "800",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6C3FFA",
              margin: "24px 0 10px 4px",
            }}
          >
            {"Spend points"}
          </div>
          <div
            className="hb-stagger"
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#FFFFFF",
              borderRadius: "28px",
              padding: "4px 12px",
              boxShadow: "0 10px 26px rgba(76,52,140,0.08)",
            }}
          >
            {(v.spend || []).map((r: any, idx0: number) => (
              <Fragment key={idx0}>
                <div style={{ borderBottom: r.line }}>
                  <button
                    onClick={r.toggle}
                    aria-expanded={r.openStr}
                    className="hb-row"
                    style={{
                      width: "100%",
                      font: "inherit",
                      textAlign: "left",
                      border: "0",
                      background: "transparent",
                      color: "#1E1B2E",
                      display: "flex",
                      gap: "16px",
                      padding: "16px 4px",
                      cursor: "pointer",
                      borderRadius: "14px",
                    }}
                  >
                    <span
                      className="hb-ease"
                      style={{
                        width: "44px",
                        height: "44px",
                        flex: "none",
                        borderRadius: "14px",
                        background: r.bg,
                        color: r.ink,
                        fontFamily: "Figtree, system-ui, sans-serif",
                        fontSize: "14px",
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
                      <span style={{ fontSize: "16.5px", fontWeight: "700", lineHeight: "1.3" }}>
                        {r.title}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#6B6880",
                          lineHeight: "1.4",
                        }}
                      >
                        {r.sub}
                      </span>
                    </span>
                    <svg
                      aria-hidden="true"
                      className="hb-ease"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#A9A6B8"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flex: "none", marginTop: "4px", transform: `rotate(${r.rot})` }}
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </button>
                  {r.open ? (
                    <>
                      <div
                        className="hb-rise"
                        style={{
                          margin: "0 4px 16px 64px",
                          background: "#1E1B2E",
                          color: "#FFFFFF",
                          borderRadius: "16px",
                          padding: "12px 14px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
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
                          {"Example"}
                        </span>
                        <span style={{ fontSize: "14.5px", fontWeight: "500", lineHeight: "1.45" }}>
                          {r.example}
                        </span>
                      </div>
                    </>
                  ) : null}
                </div>
              </Fragment>
            ))}
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              fontSize: "13px",
              fontWeight: "800",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6C3FFA",
              margin: "24px 0 10px 4px",
            }}
          >
            {"Keep your points"}
          </div>
          <div
            className="hb-stagger"
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#FFFFFF",
              borderRadius: "28px",
              padding: "4px 12px",
              boxShadow: "0 10px 26px rgba(76,52,140,0.08)",
            }}
          >
            {(v.keep || []).map((r: any, idx0: number) => (
              <Fragment key={idx0}>
                <div style={{ borderBottom: r.line }}>
                  <button
                    onClick={r.toggle}
                    aria-expanded={r.openStr}
                    className="hb-row"
                    style={{
                      width: "100%",
                      font: "inherit",
                      textAlign: "left",
                      border: "0",
                      background: "transparent",
                      color: "#1E1B2E",
                      display: "flex",
                      gap: "16px",
                      padding: "16px 4px",
                      cursor: "pointer",
                      borderRadius: "14px",
                    }}
                  >
                    <span
                      className="hb-ease"
                      style={{
                        width: "44px",
                        height: "44px",
                        flex: "none",
                        borderRadius: "14px",
                        background: r.bg,
                        color: r.ink,
                        fontFamily: "Figtree, system-ui, sans-serif",
                        fontSize: "14px",
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
                      <span style={{ fontSize: "16.5px", fontWeight: "700", lineHeight: "1.3" }}>
                        {r.title}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#6B6880",
                          lineHeight: "1.4",
                        }}
                      >
                        {r.sub}
                      </span>
                    </span>
                    <svg
                      aria-hidden="true"
                      className="hb-ease"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#A9A6B8"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flex: "none", marginTop: "4px", transform: `rotate(${r.rot})` }}
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </button>
                  {r.open ? (
                    <>
                      <div
                        className="hb-rise"
                        style={{
                          margin: "0 4px 16px 64px",
                          background: "#1E1B2E",
                          color: "#FFFFFF",
                          borderRadius: "16px",
                          padding: "12px 14px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
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
                          {"Example"}
                        </span>
                        <span style={{ fontSize: "14.5px", fontWeight: "500", lineHeight: "1.45" }}>
                          {r.example}
                        </span>
                      </div>
                    </>
                  ) : null}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="hb-fixed-bottom">
          <div className="hb-fixed-inner">
            <div style={{ position: "absolute", left: "16px", right: "16px", bottom: "26px" }}>
              <Link
                className="hb-press"
                style={{
                  display: "block",
                  textDecoration: "none",
                  textAlign: "center",
                  background: "#1E1B2E",
                  color: "#C0F402",
                  fontFamily: "Figtree, system-ui, sans-serif",
                  fontSize: "17px",
                  fontWeight: "800",
                  borderRadius: "999px",
                  padding: "18px 16px",
                  boxShadow: "0 10px 24px rgba(30,27,46,0.22)",
                }}
                to="/haiba/plans"
              >
                {"Join Haiba"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
