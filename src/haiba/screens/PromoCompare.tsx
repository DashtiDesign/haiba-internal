// @ts-nocheck
// Ported 1:1 from the Design canvas board "PromoCompare.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import haibaLogo from "@/assets/haiba/logo-purple.svg.asset.json";
import { useVals } from "../logic/promocompare";

export default function PromoCompare() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-promocompare">
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
        <div style={{ position: "relative", padding: "14px 16px 210px 16px" }}>
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
            <span style={{ width: "44px" }}></span>
          </div>
          <div
            className="hb-rise"
            style={{ margin: "18px 4px 0 4px", display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Artwork
              priority
              src={haibaLogo.url}
              alt="Haiba"
              style={{ height: "34px", width: "auto", display: "block" }}
            />
            <span
              style={{
                fontSize: "30px",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                color: "#A9A6B8",
              }}
            >
              {"vs Free"}
            </span>
          </div>
          <div
            className="hb-rise hb-d1"
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#4A4660",
              margin: "12px 4px 0 4px",
              lineHeight: "1.45",
            }}
          >
            {"You keep every Unipal offer. Haiba adds gifts and points on top."}
          </div>
          <div
            className="hb-rise hb-d2"
            style={{
              marginTop: "22px",
              border: "1px solid #E2DCF2",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 70px 92px" }}>
              <span></span>
              <span
                style={{
                  padding: "14px 4px",
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#6B6880",
                }}
              >
                {"Free"}
              </span>
              <span
                style={{
                  padding: "14px 4px",
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "#FFFFFF",
                  background: "#6C3FFA",
                }}
              >
                {"Haiba"}
              </span>
            </div>
            {(v.rows || []).map((r: any, idx0: number) => (
              <Fragment key={idx0}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) 70px 92px",
                    borderTop: "1px solid #ECEAF3",
                  }}
                >
                  <span
                    style={{
                      padding: "15px 14px",
                      fontSize: "15px",
                      fontWeight: "600",
                      lineHeight: "1.3",
                    }}
                  >
                    {r.label}
                  </span>
                  <span
                    style={{
                      padding: "15px 4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "19px",
                      fontWeight: "800",
                      color: r.freeInk,
                    }}
                  >
                    {r.free}
                  </span>
                  <span
                    style={{
                      padding: "15px 4px",
                      background: "#F6F3FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      fontSize: r.haibaSize,
                      fontWeight: "800",
                      color: r.haibaInk,
                    }}
                  >
                    {r.haiba}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              marginTop: "18px",
              border: "2px solid #6C3FFA",
              borderRadius: "16px",
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              background: "#FAF8FF",
            }}
          >
            <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6C3FFA",
                }}
              >
                {"Haiba yearly"}
              </span>
              <span style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.02em" }}>
                {v.price}
              </span>
            </span>
            <span
              style={{ fontSize: "15px", fontWeight: "700", color: "#4A4660", textAlign: "right" }}
            >
              {v.perMonth}
              <br />
              <span style={{ fontWeight: "500", color: "#6B6880" }}>{"a month"}</span>
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
                background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 32%)",
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
                  {"Upgrade to Haiba"}
                </span>
                <span style={{ color: "#CFC9E0", fontSize: "13.5px", fontWeight: "500" }}>
                  {v.price}
                  {" a year"}
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
