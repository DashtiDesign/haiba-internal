// @ts-nocheck
// Ported 1:1 from the Design canvas board "PromoWaitlist.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/promowaitlist";

export default function PromoWaitlist() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-promowaitlist">
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          margin: "0 auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          background: "#FFFFFF",
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
            padding: "14px 20px 0 20px",
            height: "470px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-90px",
              top: "60px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              border: "2px dashed rgba(192,244,2,0.35)",
            }}
          ></span>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              aria-label="Close"
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
                border: "1.5px solid #C0F402",
                color: "#C0F402",
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderRadius: "999px",
                padding: "6px 12px",
              }}
            >
              {"Invite only"}
            </span>
          </div>
          <Artwork
            priority
            className="hb-rise"
            src="/haiba/logo-lime.svg"
            alt="Haiba"
            style={{
              position: "relative",
              display: "block",
              height: "40px",
              width: "auto",
              marginTop: "36px",
            }}
          />
          <h1
            className="hb-rise hb-d1"
            style={{
              position: "relative",
              margin: "18px 0 0 0",
              fontSize: "34px",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.06",
              maxWidth: "270px",
            }}
          >
            {"Not everyone gets in."}
            <br />
            <span style={{ color: "#C0F402" }}>{"Get on the list."}</span>
          </h1>
          <span
            className="hb-peek"
            style={{ position: "absolute", right: "-6px", bottom: "30px", display: "block" }}
          >
            <Artwork
              src="/haiba/birds/04-peek.png"
              alt="The Unipal bird giving a thumbs up"
              style={{
                height: "240px",
                width: "auto",
                display: "block",
                filter: "drop-shadow(0 12px 14px rgba(20,8,60,0.35))",
              }}
            />
          </span>
        </div>
        <div
          style={{
            position: "relative",
            marginTop: "-26px",
            background: "#FFFFFF",
            borderRadius: "16px 16px 0 0",
            padding: "24px 20px 200px 20px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: "800",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6C3FFA",
            }}
          >
            {"What is inside"}
          </div>
          <div
            className="hb-stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "8px",
              marginTop: "12px",
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                textAlign: "center",
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "16px 8px",
                boxShadow: "0 0 0 1px #ECE8F5",
              }}
            >
              <span style={{ height: "44px", display: "flex", alignItems: "center", gap: "4px" }}>
                <span
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    background: "#6C3FFA",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: "800",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {"Gift"}
                </span>
              </span>
              <span style={{ fontSize: "14px", fontWeight: "700", lineHeight: "1.25" }}>
                {"A free gift every month"}
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                textAlign: "center",
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "16px 8px",
                boxShadow: "0 0 0 1px #ECE8F5",
              }}
            >
              <span style={{ height: "44px", display: "flex", alignItems: "center", gap: "4px" }}>
                <Artwork
                  src="/haiba/brands/spotify.webp"
                  alt="Spotify"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                    boxShadow: "0 0 0 1px rgba(30,27,46,0.10)",
                  }}
                />
                <Artwork
                  src="/haiba/brands/chatgpt.webp"
                  alt="ChatGPT"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                    boxShadow: "0 0 0 1px rgba(30,27,46,0.10)",
                  }}
                />
              </span>
              <span style={{ fontSize: "14px", fontWeight: "700", lineHeight: "1.25" }}>
                {"Spotify and ChatGPT free"}
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                textAlign: "center",
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "16px 8px",
                boxShadow: "0 0 0 1px #ECE8F5",
              }}
            >
              <span style={{ height: "44px", display: "flex", alignItems: "center", gap: "4px" }}>
                <Artwork
                  src="/haiba/coins/coin-34.webp"
                  alt=""
                  style={{ width: "44px", height: "44px", objectFit: "contain" }}
                />
              </span>
              <span style={{ fontSize: "14px", fontWeight: "700", lineHeight: "1.25" }}>
                {"Bonus points every visit"}
              </span>
            </span>
          </div>
          <div
            style={{
              marginTop: "22px",
              background: "#F3F0FA",
              borderRadius: "16px",
              padding: "18px 18px 16px 18px",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "800" }}>{"How you get in"}</div>
            <div
              style={{
                position: "relative",
                height: "10px",
                marginTop: "16px",
                borderRadius: "999px",
                background: "#E4DBFF",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  bottom: "0",
                  width: "18%",
                  borderRadius: "999px",
                  background: "#6C3FFA",
                }}
              ></span>
              <span
                className="hb-pop hb-d3"
                style={{
                  position: "absolute",
                  left: "18%",
                  top: "50%",
                  width: "24px",
                  height: "24px",
                  margin: "-12px 0 0 -12px",
                  borderRadius: "50%",
                  background: "#C0F402",
                  boxShadow: "0 0 0 4px #FFFFFF",
                }}
              ></span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                marginTop: "12px",
                fontSize: "13px",
                fontWeight: "700",
                color: "#4A4660",
              }}
            >
              <span>
                {"Join the list"}
                <br />
                <span style={{ color: "#6C3FFA" }}>{"Now"}</span>
              </span>
              <span style={{ textAlign: "center" }}>
                {"Early access"}
                <br />
                <span style={{ color: "#6C3FFA" }}>{"December"}</span>
              </span>
              <span style={{ textAlign: "right" }}>
                {"Everyone"}
                <br />
                <span style={{ color: "#6C3FFA" }}>{"Later"}</span>
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "800",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6B6880",
              marginTop: "24px",
            }}
          >
            {"Gifts from brands like"}
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ display: "flex", gap: "8px", justifyContent: "space-between" }}>
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  flex: "none",
                  boxShadow: "0 0 0 1px #ECE8F5, 0 6px 14px rgba(30,27,46,0.08)",
                  background: "#F9F9F9",
                }}
              >
                <Artwork
                  src="/haiba/brands/wingman.webp"
                  alt="Wingman"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </span>
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  flex: "none",
                  boxShadow: "0 0 0 1px #ECE8F5, 0 6px 14px rgba(30,27,46,0.08)",
                  background: "#FFFFFF",
                }}
              >
                <Artwork
                  src="/haiba/brands/vox.webp"
                  alt="VOX Cinemas"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </span>
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  flex: "none",
                  boxShadow: "0 0 0 1px #ECE8F5, 0 6px 14px rgba(30,27,46,0.08)",
                  background: "#FFFFFF",
                }}
              >
                <Artwork
                  src="/haiba/brands/coffee-bean.webp"
                  alt="The Coffee Bean"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </span>
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  flex: "none",
                  boxShadow: "0 0 0 1px #ECE8F5, 0 6px 14px rgba(30,27,46,0.08)",
                  background: "#000000",
                }}
              >
                <Artwork
                  src="/haiba/brands/grip.webp"
                  alt="Grip"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </span>
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  flex: "none",
                  boxShadow: "0 0 0 1px #ECE8F5, 0 6px 14px rgba(30,27,46,0.08)",
                  background: "#FFFFFF",
                }}
              >
                <Artwork
                  src="/haiba/brands/albayan.webp"
                  alt="Albayan"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </span>
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  flex: "none",
                  boxShadow: "0 0 0 1px #ECE8F5, 0 6px 14px rgba(30,27,46,0.08)",
                  background: "#FFFFFF",
                }}
              >
                <Artwork
                  src="/haiba/brands/alkuwaiti.webp"
                  alt="Alkuwaiti"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </span>
            </div>
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
                background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 32%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "8px",
                zIndex: "5",
              }}
            >
              <button
                onClick={v.join}
                className="hb-press hb-ease"
                style={{
                  font: "inherit",
                  border: "0",
                  cursor: "pointer",
                  textAlign: "center",
                  background: v.ctaBg,
                  color: v.ctaInk,
                  borderRadius: "999px",
                  padding: "18px 16px",
                  fontSize: "17px",
                  fontWeight: "800",
                  boxShadow: "0 10px 24px rgba(30,27,46,0.22)",
                }}
              >
                {v.ctaLabel}
              </button>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "13.5px",
                  fontWeight: "500",
                  color: "#6B6880",
                }}
              >
                {"Free to join. No payment."}
              </span>
            </div>
          </div>
        </div>
        {v.sheet ? (
          <>
            <div
              className="hb-fade"
              style={{
                position: "fixed",
                inset: "0",
                background: "rgba(20,16,40,0.5)",
                zIndex: "60",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                className="hb-up"
                role="dialog"
                aria-label={v.sheetTitle}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: "#FFFFFF",
                  borderRadius: "16px 16px 0 0",
                  padding: "0 20px calc(26px + env(safe-area-inset-bottom, 0px)) 20px",
                  textAlign: "center",
                  maxWidth: "430px",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Artwork
                  src="/haiba/birds/17-coin-toss.webp"
                  alt=""
                  style={{ height: "170px", width: "auto", display: "block", marginTop: "-60px" }}
                />
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: "800",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.15",
                    marginTop: "4px",
                  }}
                >
                  {v.sheetTitle}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#4A4660",
                    lineHeight: "1.45",
                    marginTop: "10px",
                    maxWidth: "320px",
                  }}
                >
                  {v.sheetBody}
                </div>
                <div
                  style={{
                    marginTop: "14px",
                    background: "#F3F0FA",
                    color: "#4F25D6",
                    fontSize: "14px",
                    fontWeight: "700",
                    borderRadius: "999px",
                    padding: "8px 14px",
                  }}
                >
                  {v.sheetNote}
                </div>
                <button
                  onClick={v.closeSheet}
                  className="hb-press"
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    font: "inherit",
                    fontSize: "17px",
                    fontWeight: "800",
                    border: "0",
                    borderRadius: "999px",
                    padding: "17px",
                    cursor: "pointer",
                    background: "#1E1B2E",
                    color: "#C0F402",
                  }}
                >
                  {"Got it"}
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
