// @ts-nocheck
// Ported 1:1 from the Design canvas board "PromoDream.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/promodream";

export default function PromoDream() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-promodream">
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          margin: "0 auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #6C3FFA 0%, #4F25D6 50%, #3E1BB8 100%)",
          fontFamily: "Figtree, system-ui, sans-serif",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-90px",
            top: "40px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            border: "2px dashed rgba(192,244,2,0.35)",
          }}
        ></span>
        <div style={{ position: "relative", padding: "14px 16px 210px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
            <Artwork
              priority
              src="/haiba/logo-lime.svg"
              alt="Haiba"
              style={{ height: "24px", width: "auto", display: "block" }}
            />
            <span style={{ width: "44px" }}></span>
          </div>
          <div
            className="hb-rise"
            style={{
              margin: "28px 4px 0 4px",
              fontSize: "16px",
              fontWeight: "600",
              color: "#E4DBFF",
            }}
          >
            {v.hello}
          </div>
          <h1
            className="hb-rise hb-d1"
            style={{
              margin: "8px 4px 0 4px",
              fontSize: "34px",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.08",
            }}
          >
            {"Something free every month. "}
            <span style={{ color: "#C0F402" }}>{"You pick."}</span>
          </h1>
          <div
            className="hb-rise hb-d1"
            style={{
              margin: "10px 4px 0 4px",
              fontSize: "16px",
              fontWeight: "600",
              color: "#FFFFFF",
              lineHeight: "1.45",
            }}
          >
            {"12 months. 12 free picks. Change your mind every month."}
          </div>
          <div style={{ marginTop: "20px" }}>
            <div
              className="hb-stagger"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "8px",
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  height: "74px",
                  boxSizing: "border-box",
                  padding: "10px 4px",
                  borderRadius: "14px",
                  background: "#C0F402",
                  border: "0",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#1F2600",
                  }}
                >
                  {"Dec"}
                </span>
                <span style={{ fontSize: "12px", fontWeight: "800", color: "#1F2600" }}>
                  {"Your pick"}
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  height: "74px",
                  boxSizing: "border-box",
                  padding: "10px 4px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#E4DBFF",
                  }}
                >
                  {"Jan"}
                </span>
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#FFFFFF",
                  }}
                >
                  {"?"}
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  height: "74px",
                  boxSizing: "border-box",
                  padding: "10px 4px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#E4DBFF",
                  }}
                >
                  {"Feb"}
                </span>
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#FFFFFF",
                  }}
                >
                  {"?"}
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  height: "74px",
                  boxSizing: "border-box",
                  padding: "10px 4px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#E4DBFF",
                  }}
                >
                  {"Mar"}
                </span>
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#FFFFFF",
                  }}
                >
                  {"?"}
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  height: "74px",
                  boxSizing: "border-box",
                  padding: "10px 4px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#E4DBFF",
                  }}
                >
                  {"Apr"}
                </span>
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#FFFFFF",
                  }}
                >
                  {"?"}
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  height: "74px",
                  boxSizing: "border-box",
                  padding: "10px 4px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#E4DBFF",
                  }}
                >
                  {"May"}
                </span>
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#FFFFFF",
                  }}
                >
                  {"?"}
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  height: "74px",
                  boxSizing: "border-box",
                  padding: "10px 4px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#E4DBFF",
                  }}
                >
                  {"Jun"}
                </span>
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#FFFFFF",
                  }}
                >
                  {"?"}
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  height: "74px",
                  boxSizing: "border-box",
                  padding: "10px 4px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#E4DBFF",
                  }}
                >
                  {"Jul"}
                </span>
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#FFFFFF",
                  }}
                >
                  {"?"}
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  height: "74px",
                  boxSizing: "border-box",
                  padding: "10px 4px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#E4DBFF",
                  }}
                >
                  {"Aug"}
                </span>
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#FFFFFF",
                  }}
                >
                  {"?"}
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  height: "74px",
                  boxSizing: "border-box",
                  padding: "10px 4px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#E4DBFF",
                  }}
                >
                  {"Sep"}
                </span>
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#FFFFFF",
                  }}
                >
                  {"?"}
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  height: "74px",
                  boxSizing: "border-box",
                  padding: "10px 4px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#E4DBFF",
                  }}
                >
                  {"Oct"}
                </span>
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#FFFFFF",
                  }}
                >
                  {"?"}
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  height: "74px",
                  boxSizing: "border-box",
                  padding: "10px 4px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#E4DBFF",
                  }}
                >
                  {"Nov"}
                </span>
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#FFFFFF",
                  }}
                >
                  {"?"}
                </span>
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "800",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#E4DBFF",
              margin: "18px 4px 10px 4px",
            }}
          >
            {"Pick from brands like"}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Artwork
              src="/haiba/brands/wingman.webp"
              alt="Wingman"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                objectFit: "cover",
                display: "block",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.9)",
              }}
            />
            <Artwork
              src="/haiba/brands/vox.webp"
              alt="VOX Cinemas"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                objectFit: "cover",
                display: "block",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.9)",
              }}
            />
            <Artwork
              src="/haiba/brands/coffee-bean.webp"
              alt="The Coffee Bean"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                objectFit: "cover",
                display: "block",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.9)",
              }}
            />
            <Artwork
              src="/haiba/brands/grip.webp"
              alt="Grip"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                objectFit: "cover",
                display: "block",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.9)",
              }}
            />
            <Artwork
              src="/haiba/brands/albayan.webp"
              alt="Albayan"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                objectFit: "cover",
                display: "block",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.9)",
              }}
            />
            <Artwork
              src="/haiba/brands/alkuwaiti.webp"
              alt="Alkuwaiti"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                objectFit: "cover",
                display: "block",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.9)",
              }}
            />
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "800",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#C0F402",
              margin: "26px 4px 10px 4px",
            }}
          >
            {"And everything else in Haiba"}
          </div>
          <div
            className="hb-stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "8px",
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: "#FFFFFF",
                color: "#1E1B2E",
                borderRadius: "16px",
                padding: "14px",
                boxShadow: "none",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "6px", minHeight: "40px" }}
              >
                <Artwork
                  src="/haiba/brands/spotify.webp"
                  alt="Spotify"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                    boxShadow: "0 0 0 1px rgba(30,27,46,0.10)",
                  }}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "15.5px", fontWeight: "800", lineHeight: "1.25" }}>
                  {"Spotify Premium Student"}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#6B6880",
                    lineHeight: "1.35",
                  }}
                >
                  {"3 months free"}
                </span>
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: "#FFFFFF",
                color: "#1E1B2E",
                borderRadius: "16px",
                padding: "14px",
                boxShadow: "none",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "6px", minHeight: "40px" }}
              >
                <Artwork
                  src="/haiba/brands/chatgpt.webp"
                  alt="ChatGPT"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                    boxShadow: "0 0 0 1px rgba(30,27,46,0.10)",
                  }}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "15.5px", fontWeight: "800", lineHeight: "1.25" }}>
                  {"ChatGPT Go"}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#6B6880",
                    lineHeight: "1.35",
                  }}
                >
                  {"3 months free"}
                </span>
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: "#FFFFFF",
                color: "#1E1B2E",
                borderRadius: "16px",
                padding: "14px",
                boxShadow: "none",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "6px", minHeight: "40px" }}
              >
                <Artwork
                  src="/haiba/coins/coin-34.webp"
                  alt=""
                  style={{ width: "40px", height: "40px", objectFit: "contain" }}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "15.5px", fontWeight: "800", lineHeight: "1.25" }}>
                  {"Bonus points"}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#6B6880",
                    lineHeight: "1.35",
                  }}
                >
                  {"Every visit. 2x at new shops, 5x every 5th"}
                </span>
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: "#FFFFFF",
                color: "#1E1B2E",
                borderRadius: "16px",
                padding: "14px",
                boxShadow: "none",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "6px", minHeight: "40px" }}
              >
                <span
                  style={{
                    height: "40px",
                    minWidth: "40px",
                    padding: "0 8px",
                    boxSizing: "border-box",
                    borderRadius: "12px",
                    background: "#F0ECFF",
                    color: "#6C3FFA",
                    fontSize: "14px",
                    fontWeight: "800",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {"200+"}
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "15.5px", fontWeight: "800", lineHeight: "1.25" }}>
                  {"Rewards at 200+ shops"}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#6B6880",
                    lineHeight: "1.35",
                  }}
                >
                  {"Free drinks, meals, popcorn"}
                </span>
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: "#FFFFFF",
                color: "#1E1B2E",
                borderRadius: "16px",
                padding: "14px",
                boxShadow: "none",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "6px", minHeight: "40px" }}
              >
                <span
                  style={{
                    height: "40px",
                    minWidth: "40px",
                    padding: "0 8px",
                    boxSizing: "border-box",
                    borderRadius: "12px",
                    background: "#C0F402",
                    color: "#1F2600",
                    fontSize: "14px",
                    fontWeight: "800",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {"500"}
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "15.5px", fontWeight: "800", lineHeight: "1.25" }}>
                  {"500 welcome points"}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#6B6880",
                    lineHeight: "1.35",
                  }}
                >
                  {"A free treat on day one"}
                </span>
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: "#FFFFFF",
                color: "#1E1B2E",
                borderRadius: "16px",
                padding: "14px",
                boxShadow: "none",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "6px", minHeight: "40px" }}
              >
                <span
                  style={{
                    height: "40px",
                    minWidth: "40px",
                    padding: "0 8px",
                    boxSizing: "border-box",
                    borderRadius: "12px",
                    background: "#1E1B2E",
                    color: "#C0F402",
                    fontSize: "14px",
                    fontWeight: "800",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {"BHD"}
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "15.5px", fontWeight: "800", lineHeight: "1.25" }}>
                  {"See what you saved"}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#6B6880",
                    lineHeight: "1.35",
                  }}
                >
                  {"Every gift and reward, added up"}
                </span>
              </span>
            </span>
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              position: "relative",
              marginTop: "16px",
              background: "#1E1B2E",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <span
              className="hb-pop hb-d3"
              style={{
                position: "absolute",
                right: "14px",
                top: "-14px",
                background: "#C0F402",
                color: "#1F2600",
                fontSize: "15px",
                fontWeight: "800",
                borderRadius: "999px",
                padding: "7px 12px",
                transform: "rotate(6deg)",
                boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
              }}
            >
              {v.free}
            </span>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#B9B3CC",
              }}
            >
              {"Your Haiba year is worth"}
            </div>
            <div
              style={{
                fontSize: "52px",
                fontWeight: "800",
                letterSpacing: "-0.04em",
                lineHeight: "1",
                marginTop: "10px",
                color: "#C0F402",
              }}
            >
              {v.worth}
            </div>
            <div
              style={{ fontSize: "16px", fontWeight: "600", color: "#E8E4F4", marginTop: "10px" }}
            >
              {"All for "}
              <span style={{ color: "#FFFFFF", fontWeight: "800" }}>{v.price}</span>
              {". Just "}
              {v.perMonth}
              {" a month."}
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
                background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #3E1BB8 32%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "4px",
                zIndex: "5",
              }}
            >
              <button
                onClick={v.openSheet}
                className="hb-press"
                style={{
                  font: "inherit",
                  border: "0",
                  cursor: "pointer",
                  textAlign: "center",
                  background: "#C0F402",
                  borderRadius: "999px",
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  boxShadow: "0 10px 24px rgba(30,27,46,0.22)",
                }}
              >
                <span style={{ color: "#1F2600", fontSize: "17px", fontWeight: "800" }}>
                  {"Start my Haiba year"}
                </span>
                <span style={{ color: "#3D5000", fontSize: "13.5px", fontWeight: "500" }}>
                  {v.price}
                  {" a year \u00b7 only "}
                  {v.perMonth}
                  {" a month"}
                </span>
              </button>
              <a
                className="hb-press"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  color: "#CFC9E0",
                  fontSize: "16px",
                  fontWeight: "600",
                  padding: "10px 16px",
                }}
                href="#"
                onClick={(e: any) => e.preventDefault()}
              >
                {"Not now"}
              </a>
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
