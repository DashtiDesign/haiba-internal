// @ts-nocheck
// Ported 1:1 from the Design canvas board "PromoValue.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import haibaLogo from "@/assets/haiba/logo-purple.svg.asset.json";
import { useVals } from "../logic/promovalue";

export default function PromoValue() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-promovalue">
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
        <div style={{ position: "relative", padding: "14px 16px 200px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button
              aria-label="Close"
              className="hb-press"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid #ECE8F7",
                background: "#FFFFFF",
                color: "#1E1B2E",
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
              src={haibaLogo.url}
              alt="Haiba"
              style={{ height: "26px", width: "auto", display: "block" }}
            />
            <span style={{ width: "44px" }}></span>
          </div>
          <h1
            className="hb-rise"
            style={{
              margin: "24px 4px 0 4px",
              fontSize: "38px",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.02",
            }}
          >
            {"Haiba pays"}
            <br />
            <span style={{ color: "#6C3FFA" }}>{"for itself."}</span>
          </h1>
          <div
            className="hb-rise hb-d1"
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#4A4660",
              margin: "10px 4px 0 4px",
            }}
          >
            {"Slide to how you use Unipal. Do the maths."}
          </div>
          <div
            className="hb-rise hb-d2"
            style={{
              marginTop: "20px",
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "16px 18px 14px 18px",
              boxShadow: "0 10px 26px rgba(76,52,140,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                color: "#1E1B2E",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              {"I use Unipal "}
              <span
                className={v.bump}
                style={{ fontSize: "30px", fontWeight: "800", letterSpacing: "-0.02em" }}
              >
                {v.visits}
              </span>{" "}
              {v.times}
              {" a month"}
            </div>
            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={v.visits}
              onInput={v.onVisits}
              onChange={v.onVisits}
              aria-label="How many times you use Unipal a month"
              className="hb-range hb-range-light"
              style={{ marginTop: "14px", background: v.rangeBg }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12.5px",
                fontWeight: "700",
                color: "#6B6880",
                marginTop: "8px",
              }}
            >
              <span>{"1"}</span>
              <span>{"Drag to see your year"}</span>
              <span>{"12"}</span>
            </div>
          </div>
          <div
            className="hb-rise hb-d2"
            style={{
              position: "relative",
              marginTop: "16px",
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "18px 18px 18px 18px",
              boxShadow: "0 14px 34px rgba(76,52,140,0.10)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                fontWeight: "800",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#6B6880",
                paddingBottom: "12px",
              }}
            >
              <span>{"Your Haiba year"}</span>
              <span>{"Receipt"}</span>
            </div>
            <div style={{ borderTop: "2px dashed #D9D2F0", margin: "0 -18px" }}></div>
            <div style={{ padding: "8px 0" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "12px",
                  padding: "7px 0",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                <span style={{ color: "#4A4660" }}>{"12 free gifts"}</span>
                <span
                  style={{
                    color: "#1E1B2E",
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {"BHD 30.00"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "12px",
                  padding: "7px 0",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                <span style={{ color: "#4A4660" }}>{"Spotify Student, 3 months"}</span>
                <span
                  style={{
                    color: "#1E1B2E",
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {"BHD 3.00"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "12px",
                  padding: "7px 0",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                <span style={{ color: "#4A4660" }}>{"ChatGPT Go, 3 months"}</span>
                <span
                  style={{
                    color: "#1E1B2E",
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {"BHD 9.00"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "12px",
                  padding: "7px 0",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                <span style={{ color: "#4A4660" }}>{v.ptsTitle}</span>
                <span
                  className={v.bump}
                  style={{
                    color: "#6C3FFA",
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v.ptsVal}
                </span>
              </div>
            </div>
            <div style={{ borderTop: "2px dashed #D9D2F0", margin: "0 -18px" }}></div>
            <div style={{ padding: "8px 0" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "12px",
                  padding: "7px 0",
                  fontSize: "17px",
                  fontWeight: "800",
                }}
              >
                <span style={{ color: "#1E1B2E" }}>{"Total value"}</span>
                <span
                  className={v.bump}
                  style={{
                    color: "#1E1B2E",
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v.worth}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "12px",
                  padding: "7px 0",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                <span style={{ color: "#4A4660" }}>{"Haiba, 1 year"}</span>
                <span
                  style={{
                    color: "#1E1B2E",
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v.price}
                </span>
              </div>
            </div>
            <div style={{ borderTop: "2px dashed #D9D2F0", margin: "0 -18px" }}></div>
            <div
              style={{
                marginTop: "14px",
                background: "#C0F402",
                borderRadius: "14px",
                padding: "14px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "16px", fontWeight: "800", color: "#1F2600" }}>
                {"You come out ahead"}
              </span>
              <span
                className={v.bump}
                style={{
                  fontSize: "26px",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                  color: "#1F2600",
                }}
              >
                {v.ahead}
              </span>
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#4A4660",
                marginTop: "12px",
                textAlign: "center",
              }}
            >
              {v.payback}
            </div>
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "42px",
                left: "-12px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "#F3F0FA",
              }}
            ></span>
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "42px",
                right: "-12px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "#F3F0FA",
              }}
            ></span>
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
                background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #F3F0FA 32%)",
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
                  background: "#1E1B2E",
                  borderRadius: "999px",
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  boxShadow: "0 10px 24px rgba(30,27,46,0.22)",
                }}
              >
                <span style={{ color: "#C0F402", fontSize: "17px", fontWeight: "800" }}>
                  {"Get Haiba for "}
                  {v.price}
                </span>
                <span style={{ color: "#CFC9E0", fontSize: "13.5px", fontWeight: "500" }}>
                  {"a year \u00b7 only "}
                  {v.perMonth}
                  {" a month"}
                </span>
              </button>
              <a
                className="hb-press"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  color: "#1E1B2E",
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
