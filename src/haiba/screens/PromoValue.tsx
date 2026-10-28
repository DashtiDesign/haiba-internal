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
        <div
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            height: "420px",
            background: "linear-gradient(180deg, #E4D9FF 0%, #F3F0FA 100%)",
          }}
        ></div>
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
                background: "rgba(255,255,255,0.8)",
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
              margin: "26px 4px 0 4px",
              fontSize: "34px",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.08",
            }}
          >
            {"Get more back than you pay"}
          </h1>
          <div
            className="hb-rise hb-d1"
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#4A4660",
              margin: "10px 4px 0 4px",
              lineHeight: "1.45",
            }}
          >
            {"Here is what one year of Haiba gives you."}
          </div>
          <div
            className="hb-rise hb-d2"
            style={{
              marginTop: "22px",
              background: "#FFFFFF",
              borderRadius: "16px",
              boxShadow: "0 14px 34px rgba(76,52,140,0.12)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "8px 18px 0 18px" }} className="hb-stagger">
              {(v.lines || []).map((l: any, idx0: number) => (
                <Fragment key={idx0}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "40px minmax(0, 1fr) auto",
                      gap: "12px",
                      alignItems: "center",
                      padding: "14px 0",
                      borderBottom: "1px solid #F1EFF7",
                    }}
                  >
                    <span
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "12px",
                        background: l.bg,
                        color: l.ink,
                        fontSize: "13px",
                        fontWeight: "800",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {l.mark}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        minWidth: "0",
                      }}
                    >
                      <span style={{ fontSize: "16px", fontWeight: "700", lineHeight: "1.3" }}>
                        {l.title}
                      </span>
                      <span
                        style={{
                          fontSize: "13.5px",
                          fontWeight: "500",
                          color: "#6B6880",
                          lineHeight: "1.35",
                        }}
                      >
                        {l.sub}
                      </span>
                    </span>
                    <span
                      style={{
                        fontSize: "15.5px",
                        fontWeight: "800",
                        textAlign: "right",
                        color: l.valInk,
                      }}
                    >
                      {l.val}
                    </span>
                  </div>
                </Fragment>
              ))}
            </div>
            <div style={{ padding: "16px 18px 18px 18px", background: "#FAF9FD" }}>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
              >
                <span style={{ fontSize: "15px", fontWeight: "700", color: "#4A4660" }}>
                  {"Worth in a year"}
                </span>
                <span style={{ fontSize: "22px", fontWeight: "800", color: "#6C3FFA" }}>
                  {"BHD 30.00+"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: "6px",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: "700", color: "#4A4660" }}>
                  {"You pay"}
                </span>
                <span style={{ fontSize: "22px", fontWeight: "800" }}>{v.price}</span>
              </div>
              <div
                style={{
                  position: "relative",
                  height: "10px",
                  borderRadius: "999px",
                  overflow: "hidden",
                  background: "#C0F402",
                  marginTop: "14px",
                }}
              >
                <span
                  className="hb-ease"
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "0",
                    bottom: "0",
                    width: v.payPct,
                    background: "#1E1B2E",
                  }}
                ></span>
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: "600",
                  color: "#4A4660",
                  marginTop: "8px",
                }}
              >
                {"The gifts alone are worth more than the price"}
              </div>
            </div>
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              marginTop: "16px",
              background: "#1E1B2E",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "18px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <Artwork
              src="/haiba/coins/coin-34.webp"
              alt=""
              style={{ width: "48px", height: "48px", objectFit: "contain", flex: "none" }}
            />
            <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                  color: "#C0F402",
                }}
              >
                {v.perMonth}
                <span style={{ fontSize: "15px", fontWeight: "700", color: "#FFFFFF" }}>
                  {" a month"}
                </span>
              </span>
              <span style={{ fontSize: "14px", fontWeight: "500", color: "#CFC9E0" }}>
                {v.price}
                {" paid once a year"}
              </span>
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
                  {"Join Haiba for "}
                  {v.price}
                </span>
                <span style={{ color: "#CFC9E0", fontSize: "13.5px", fontWeight: "500" }}>
                  {"a year \u00b7 that is "}
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
