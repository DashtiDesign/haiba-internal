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
          background: "#1E1B2E",
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
            right: "-140px",
            top: "-60px",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(192,244,2,0.22) 0%, rgba(192,244,2,0) 70%)",
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
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.08)",
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
              margin: "30px 4px 0 4px",
              fontSize: "16px",
              fontWeight: "600",
              color: "#CFC9E0",
            }}
          >
            {v.hello}
          </div>
          <h1
            className="hb-rise hb-d1"
            style={{
              margin: "8px 4px 0 4px",
              fontSize: "32px",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
            }}
          >
            {"Something free every month."}
            <br />
            <span style={{ color: "#C0F402" }}>{"All year."}</span>
          </h1>
          <div
            className="hb-rise hb-d1"
            style={{
              margin: "10px 4px 0 4px",
              fontSize: "15px",
              fontWeight: "500",
              color: "#B9B3CC",
              lineHeight: "1.45",
            }}
          >
            {"Even if you only open Unipal now and then. Here is what your year could look like."}
          </div>
          <div
            className="hb-stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "8px",
              marginTop: "22px",
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#2B2740",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#C0F402",
                  padding: "8px 10px 6px 10px",
                }}
              >
                {"Dec"}
              </span>
              <Artwork
                src="/haiba/brands/vox.webp"
                alt="VOX Cinemas"
                style={{
                  width: "100%",
                  height: "64px",
                  objectFit: "contain",
                  display: "block",
                  background: "#FFFFFF",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  padding: "8px 10px 10px 10px",
                  lineHeight: "1.25",
                }}
              >
                {"Cinema ticket"}
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#2B2740",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#C0F402",
                  padding: "8px 10px 6px 10px",
                }}
              >
                {"Jan"}
              </span>
              <Artwork
                src="/haiba/brands/coffee-bean.webp"
                alt="The Coffee Bean"
                style={{
                  width: "100%",
                  height: "64px",
                  objectFit: "contain",
                  display: "block",
                  background: "#FFFFFF",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  padding: "8px 10px 10px 10px",
                  lineHeight: "1.25",
                }}
              >
                {"Any drink"}
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#2B2740",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#C0F402",
                  padding: "8px 10px 6px 10px",
                }}
              >
                {"Feb"}
              </span>
              <Artwork
                src="/haiba/brands/wingman.webp"
                alt="Wingman"
                style={{
                  width: "100%",
                  height: "64px",
                  objectFit: "contain",
                  display: "block",
                  background: "#F9F9F9",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  padding: "8px 10px 10px 10px",
                  lineHeight: "1.25",
                }}
              >
                {"Student box meal"}
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#2B2740",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#C0F402",
                  padding: "8px 10px 6px 10px",
                }}
              >
                {"Mar"}
              </span>
              <Artwork
                src="/haiba/brands/grip.webp"
                alt="Grip"
                style={{
                  width: "100%",
                  height: "64px",
                  objectFit: "contain",
                  display: "block",
                  background: "#000000",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  padding: "8px 10px 10px 10px",
                  lineHeight: "1.25",
                }}
              >
                {"Gym day pass"}
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#2B2740",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#C0F402",
                  padding: "8px 10px 6px 10px",
                }}
              >
                {"Apr"}
              </span>
              <Artwork
                src="/haiba/brands/alkuwaiti.webp"
                alt="Alkuwaiti"
                style={{
                  width: "100%",
                  height: "64px",
                  objectFit: "contain",
                  display: "block",
                  background: "#FFFFFF",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  padding: "8px 10px 10px 10px",
                  lineHeight: "1.25",
                }}
              >
                {"Car wash"}
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#2B2740",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#C0F402",
                  padding: "8px 10px 6px 10px",
                }}
              >
                {"May"}
              </span>
              <Artwork
                src="/haiba/brands/albayan.webp"
                alt="Albayan"
                style={{
                  width: "100%",
                  height: "64px",
                  objectFit: "contain",
                  display: "block",
                  background: "#FFFFFF",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  padding: "8px 10px 10px 10px",
                  lineHeight: "1.25",
                }}
              >
                {"Perfume 100ml"}
              </span>
            </span>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "600",
              color: "#B9B3CC",
              marginTop: "12px",
            }}
          >
            {"And 6 more months, your pick each time"}
          </div>
          <div
            className="hb-rise hb-d2"
            style={{
              marginTop: "20px",
              background: "#2B2740",
              borderRadius: "16px",
              padding: "4px 18px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "44px minmax(0, 1fr) auto",
                gap: "12px",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: "1px solid #3A3550",
              }}
            >
              <span
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  background: "#E4DBFF",
                  color: "#4F25D6",
                  fontSize: "13px",
                  fontWeight: "800",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {"App"}
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "16px", fontWeight: "700" }}>{"Free app, 3 months"}</span>
                <span style={{ fontSize: "13.5px", fontWeight: "500", color: "#B9B3CC" }}>
                  {"Music or streaming, free when you join"}
                </span>
              </span>
              <span style={{ fontSize: "17px", fontWeight: "800" }}>{"BHD 6.00"}</span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "44px minmax(0, 1fr) auto",
                gap: "12px",
                alignItems: "center",
                padding: "14px 0",
              }}
            >
              <span
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  background: "#6C3FFA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Artwork
                  src="/haiba/coins/coin-front.webp"
                  alt=""
                  style={{ width: "24px", height: "24px", objectFit: "contain" }}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "16px", fontWeight: "700" }}>{"500 points today"}</span>
                <span style={{ fontSize: "13.5px", fontWeight: "500", color: "#B9B3CC" }}>
                  {"A free treat before you even go out"}
                </span>
              </span>
              <span style={{ fontSize: "15px", fontWeight: "800", color: "#C0F402" }}>
                {"Free"}
              </span>
            </div>
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              position: "relative",
              marginTop: "16px",
              background: "#C0F402",
              color: "#1F2600",
              borderRadius: "16px",
              padding: "18px 20px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {"Your year is worth"}
            </div>
            <div
              style={{
                fontSize: "44px",
                fontWeight: "800",
                letterSpacing: "-0.04em",
                lineHeight: "1",
                marginTop: "8px",
              }}
            >
              {"BHD 36.00+"}
            </div>
            <div style={{ fontSize: "16px", fontWeight: "600", marginTop: "8px" }}>
              {"You pay only "}
              <span style={{ fontWeight: "800" }}>{v.price}</span>
              {". That is "}
              {v.times}
              {" your money."}
            </div>
            <span
              className="hb-pop hb-d3"
              style={{
                position: "absolute",
                right: "14px",
                top: "-14px",
                background: "#1E1B2E",
                color: "#C0F402",
                fontSize: "15px",
                fontWeight: "800",
                borderRadius: "999px",
                padding: "7px 12px",
                transform: "rotate(6deg)",
                boxShadow: "0 8px 18px rgba(0,0,0,0.3)",
              }}
            >
              {"A steal"}
            </span>
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
                background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #1E1B2E 32%)",
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
                  {"Start my year for "}
                  {v.price}
                </span>
                <span style={{ color: "#3D5000", fontSize: "13.5px", fontWeight: "500" }}>
                  {"only "}
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
