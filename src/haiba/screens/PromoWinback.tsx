// @ts-nocheck
// Ported 1:1 from the Design canvas board "PromoWinback.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/promowinback";

export default function PromoWinback() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-promowinback">
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
            left: "-120px",
            top: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(108,63,250,0.55) 0%, rgba(108,63,250,0) 70%)",
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
              fontSize: "34px",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.08",
            }}
          >
            {"You left "}
            <span style={{ color: "#C0F402" }}>{v.missed}</span>
            {" on the table."}
          </h1>
          <div
            className="hb-rise hb-d2"
            style={{
              marginTop: "22px",
              background: "#2B2740",
              borderRadius: "16px",
              padding: "18px 20px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "800",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#B9B3CC",
                }}
              >
                {"Missed so far"}
              </span>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#E8E4F4" }}>
                {v.offers}
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "12px",
                alignItems: "end",
                height: "150px",
                marginTop: "18px",
              }}
            >
              {(v.months || []).map((m: any, idx0: number) => (
                <Fragment key={idx0}>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                      gap: "8px",
                      height: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "800",
                        textAlign: "center",
                        color: "#FFFFFF",
                      }}
                    >
                      {m.val}
                    </span>
                    <span
                      className="hb-ease"
                      style={{ height: m.h, borderRadius: "10px 10px 4px 4px", background: m.bg }}
                    ></span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        textAlign: "center",
                        color: "#B9B3CC",
                      }}
                    >
                      {m.label}
                    </span>
                  </span>
                </Fragment>
              ))}
            </div>
            <div
              style={{
                fontSize: "13.5px",
                fontWeight: "500",
                color: "#B9B3CC",
                marginTop: "14px",
                lineHeight: "1.4",
              }}
            >
              {
                "Adds up month by month: your free gift, bonus points, and Spotify and ChatGPT from day one."
              }
            </div>
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              position: "relative",
              marginTop: "16px",
              background: "#2B2740",
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
              {"Your next 12 months"}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "16px",
                paddingTop: "14px",
                borderTop: "1px solid #3A3550",
              }}
            >
              <span
                style={{
                  width: "40px",
                  height: "40px",
                  flex: "none",
                  boxSizing: "border-box",
                  borderRadius: "12px",
                  background: "#3A3550",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 15px)",
                  gap: "2px",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Artwork
                  src="/haiba/flags/bh.svg"
                  alt="Bahrain"
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    boxShadow: "0 0 0 2px #2B2740",
                  }}
                />
                <Artwork
                  src="/haiba/flags/sa.svg"
                  alt="Saudi"
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    boxShadow: "0 0 0 2px #2B2740",
                  }}
                />
                <Artwork
                  src="/haiba/flags/qa.svg"
                  alt="Qatar"
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    boxShadow: "0 0 0 2px #2B2740",
                  }}
                />
                <Artwork
                  src="/haiba/flags/om.svg"
                  alt="Oman"
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    boxShadow: "0 0 0 2px #2B2740",
                  }}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "1px", flex: "1" }}>
                <span style={{ fontSize: "15.5px", fontWeight: "800" }}>
                  {"New: free travel data"}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#B9B3CC" }}>
                  {"5GB in any Unipal country. We\u2019ve got you."}
                </span>
              </span>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "#C0F402",
                  whiteSpace: "nowrap",
                }}
              >
                {"BHD 5+"}
              </span>
            </div>
          </div>
          <div
            style={{
              marginTop: "14px",
              border: "1.5px dashed rgba(192,244,2,0.55)",
              background: "rgba(192,244,2,0.06)",
              borderRadius: "16px",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <span style={{ position: "relative", width: "44px", height: "44px", flex: "none" }}>
              <Artwork
                src="/haiba/coins/coin-34.webp"
                alt=""
                style={{ width: "44px", height: "44px", objectFit: "contain", display: "block" }}
              />
              <span
                style={{
                  position: "absolute",
                  right: "-6px",
                  top: "-6px",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "#C0F402",
                  color: "#1F2600",
                  fontSize: "16px",
                  fontWeight: "800",
                  lineHeight: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 0 2px #1E1B2E",
                }}
              >
                {"+"}
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
                minWidth: "0",
                flex: "1",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#C0F402",
                }}
              >
                {"The cherry on top"}
              </span>
              <span
                style={{
                  fontSize: "17px",
                  fontWeight: "800",
                  lineHeight: "1.25",
                  color: "#FFFFFF",
                }}
              >
                {v.ptsTitle}
              </span>
              <span
                style={{
                  fontSize: "13.5px",
                  fontWeight: "500",
                  color: "#B9B3CC",
                  lineHeight: "1.4",
                }}
              >
                {v.ptsSub}
              </span>
            </span>
            <span
              className={v.bump}
              style={{
                fontSize: "17px",
                fontWeight: "800",
                color: "#C0F402",
                whiteSpace: "nowrap",
              }}
            >
              {v.ptsVal}
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
                  {"Do not miss next month"}
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
