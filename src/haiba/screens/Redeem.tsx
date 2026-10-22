// @ts-nocheck
// Ported 1:1 from the Design canvas board "Offer.dc.html". Styles are copied value for value.
import Artwork from "../Artwork";
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import { useVals } from "../logic/redeem";

export default function Redeem() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-redeem">
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
            to="/haiba"
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
          <span style={{ fontSize: "18px", fontWeight: "700" }}>
            {"The Coffee Bean & Tea Leaf"}
          </span>
        </div>
        <div
          className="hb-stagger"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "0 16px 40px 16px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E4E4EA",
              borderRadius: "16px",
              padding: "22px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "700" }}>{"Upsize Your Drinks!"}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  flex: "none",
                  borderRadius: "10px",
                  background: "#0B1FB3",
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
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <rect x="3" y="5" width="18" height="16" rx="3"></rect>
                  <path d="M3 10h18M8 3v4M16 3v4"></path>
                </svg>
              </span>
              <span style={{ fontSize: "16px", fontWeight: "500" }}>{"Available everyday"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  flex: "none",
                  borderRadius: "10px",
                  background: "#0B1FB3",
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
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="8"></circle>
                  <path d="M12 8v4l2.5 2"></path>
                </svg>
              </span>
              <span style={{ fontSize: "16px", fontWeight: "500" }}>
                {"Available at all times"}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  flex: "none",
                  borderRadius: "10px",
                  background: "#0B1FB3",
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
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"></path>
                  <circle cx="12" cy="9.5" r="2.5"></circle>
                </svg>
              </span>
              <a
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  textDecoration: "none",
                  lineHeight: "1.3",
                }}
                href="#"
                onClick={(e: any) => e.preventDefault()}
              >
                {"Amwaj Cineplex, Souq Albaraha, Saar, Juffair, +5"}
              </a>
            </div>
          </div>
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E4E4EA",
              borderRadius: "16px",
              padding: "22px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "700" }}>{"Offer Conditions"}</div>
            <div style={{ fontSize: "16px", fontWeight: "500", color: "#3A3A44" }}>
              {"FREE UPSIZE to all drinks!"}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                fontSize: "16px",
                fontWeight: "500",
                color: "#3A3A44",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "4px",
                    background: "#2F9E44",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    aria-hidden="true"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                </span>
                {"Small to Regular"}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "4px",
                    background: "#2F9E44",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    aria-hidden="true"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                </span>
                {"Regular to Large "}
                <a
                  style={{ textDecoration: "none", fontWeight: "500" }}
                  href="#"
                  onClick={(e: any) => e.preventDefault()}
                >
                  {"read more"}
                </a>
              </span>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              background: "linear-gradient(135deg, #6C3FFA 0%, #4F25D6 100%)",
              borderRadius: "16px",
              padding: "20px 20px 18px 20px",
              color: "#FFFFFF",
              overflow: "hidden",
              boxShadow: "0 14px 30px rgba(108,63,250,0.28)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "-50px",
                top: "-60px",
                width: "190px",
                height: "190px",
                borderRadius: "50%",
                border: "2px dashed rgba(192,244,2,0.35)",
              }}
            ></span>
            <Artwork priority
              src="/haiba/birds/03-wink.png"
              alt=""
              style={{
                position: "absolute",
                right: "4px",
                bottom: "-4px",
                height: "108px",
                width: "auto",
                filter: "drop-shadow(0 8px 10px rgba(20,8,60,0.35))",
              }}
            />
            <div
              style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <img
                src="/haiba/logo-lime.svg"
                alt="Haiba"
                style={{ height: "20px", width: "auto", display: "block" }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#E4DBFF",
                }}
              >
                {"\u00b7 points on this visit"}
              </span>
            </div>
            <div
              style={{
                position: "relative",
                marginTop: "12px",
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
              }}
            >
              <span
                style={{
                  fontFamily: "Figtree, system-ui, sans-serif",
                  fontSize: "44px",
                  fontWeight: "800",
                  letterSpacing: "-0.03em",
                  lineHeight: "1",
                  color: "#C0F402",
                }}
              >
                {v.earnPts}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "700" }}>{"points"}</span>
            </div>
            <div
              style={{
                position: "relative",
                marginTop: "8px",
                fontSize: "14.5px",
                fontWeight: "600",
                color: "#F3EEFF",
                maxWidth: "250px",
                lineHeight: "1.4",
              }}
            >
              {v.earnWhy}
            </div>
            <div
              style={{
                position: "relative",
                marginTop: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {(v.stamps || []).map((s: any, idx0: number) => (
                <Fragment key={idx0}>
                  <span
                    className="hb-ease"
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      background: s.bg,
                      color: s.ink,
                      border: `2px solid ${s.ring}`,
                      boxSizing: "border-box",
                      fontSize: "10px",
                      fontWeight: "800",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {s.tag}
                  </span>
                </Fragment>
              ))}
              <span
                style={{
                  fontSize: "12.5px",
                  fontWeight: "600",
                  color: "#E4DBFF",
                  marginLeft: "6px",
                }}
              >
                {v.stampNote}
              </span>
            </div>
          </div>
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E4E4EA",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "18px 20px 14px 20px",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "700",
                color: "#0B1FB3",
                borderBottom: "3px solid #0B1FB3",
              }}
            >
              {"In-store"}
            </div>
            <div
              style={{
                padding: "18px 20px 22px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {v.hidden ? (
                <>
                  <button
                    onClick={v.reveal}
                    aria-label="Reveal the code"
                    className="hb-press"
                    style={{
                      width: "100%",
                      font: "inherit",
                      height: "72px",
                      boxSizing: "border-box",
                      border: "2.5px solid #0B1FB3",
                      borderRadius: "14px",
                      background: "#E9ECFA",
                      display: "flex",
                      alignItems: "center",
                      padding: "6px",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <span
                      className="hb-nudge"
                      style={{
                        width: "100px",
                        height: "100%",
                        borderRadius: "10px",
                        background: "#0B1FB3",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M13 6l6 6-6 6"></path>
                      </svg>
                    </span>
                    <span
                      style={{
                        flex: "1",
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#0B1FB3",
                        paddingRight: "50px",
                      }}
                    >
                      {"Swipe to reveal >>"}
                    </span>
                  </button>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#6B6B78",
                      textAlign: "center",
                    }}
                  >
                    {"Tap the bar here. In the app you swipe it."}
                  </div>
                </>
              ) : null}
              {v.shown ? (
                <>
                  <div
                    className="hb-pop"
                    style={{
                      border: "2.5px solid #0B1FB3",
                      borderRadius: "14px",
                      background: "#FFFFFF",
                      padding: "18px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      transformOrigin: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#6B6B78",
                      }}
                    >
                      {"Show this to staff"}
                    </span>
                    <span
                      style={{
                        fontFamily: "Figtree, system-ui, sans-serif",
                        fontSize: "34px",
                        fontWeight: "800",
                        letterSpacing: "0.08em",
                        color: "#0B1FB3",
                      }}
                    >
                      {"UNI 4821"}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#2F9E44",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#2F9E44",
                        }}
                      ></span>
                      {"Redeemed at 17:12"}
                    </span>
                  </div>
                  <div
                    className="hb-drop"
                    style={{
                      background: "#1E1B2E",
                      color: "#FFFFFF",
                      borderRadius: "16px",
                      padding: "12px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      boxShadow: "0 12px 28px rgba(30,27,46,0.28)",
                    }}
                  >
                    <span
                      style={{
                        width: "44px",
                        height: "44px",
                        flex: "none",
                        borderRadius: "50%",
                        background: "#C0F402",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      <Artwork
                        src="/haiba/birds/13-fist.png"
                        alt=""
                        style={{
                          width: "50px",
                          height: "auto",
                          display: "block",
                          marginTop: "3px",
                        }}
                      />
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
                      <span
                        style={{
                          fontFamily: "Figtree, system-ui, sans-serif",
                          fontSize: "16px",
                          fontWeight: "800",
                          color: "#C0F402",
                        }}
                      >
                        {v.toastTitle}
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: "500", color: "#CFC9E0" }}>
                        {v.toastSub}
                      </span>
                    </span>
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "#FFFFFF",
                        fontSize: "13px",
                        fontWeight: "700",
                        background: "rgba(255,255,255,0.14)",
                        borderRadius: "999px",
                        padding: "8px 12px",
                        flex: "none",
                      }}
                      to="/haiba"
                    >
                      {"Open Haiba"}
                    </Link>
                  </div>
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
                      padding: "6px",
                      cursor: "pointer",
                    }}
                  >
                    {"Reset"}
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
