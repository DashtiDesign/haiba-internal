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
            height: "380px",
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
              margin: "24px 4px 0 4px",
              fontSize: "34px",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.06",
            }}
          >
            {v.worth}
            {" of free stuff."}
            <br />
            <span style={{ color: "#6C3FFA" }}>
              {"For "}
              {v.price}
              {"."}
            </span>
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
            {"Here is what you get in one year."}
          </div>
          <div
            className="hb-stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <span
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "14px",
                minHeight: "168px",
                boxSizing: "border-box",
                background: "#6C3FFA",
                color: "#FFFFFF",
                borderRadius: "16px",
                padding: "16px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "12px",
                  background: "#C0F402",
                  color: "#1F2600",
                  fontSize: "13px",
                  fontWeight: "800",
                  borderRadius: "999px",
                  padding: "5px 10px",
                }}
              >
                {"BHD 30"}
              </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                <Artwork
                  src="/haiba/brands/wingman.webp"
                  alt="Wingman"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    display: "block",
                    marginLeft: "0px",
                    boxShadow: "0 0 0 2px #6C3FFA",
                  }}
                />
                <Artwork
                  src="/haiba/brands/vox.webp"
                  alt="VOX Cinemas"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    display: "block",
                    marginLeft: "-10px",
                    boxShadow: "0 0 0 2px #6C3FFA",
                  }}
                />
                <Artwork
                  src="/haiba/brands/coffee-bean.webp"
                  alt="The Coffee Bean"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    display: "block",
                    marginLeft: "-10px",
                    boxShadow: "0 0 0 2px #6C3FFA",
                  }}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "17px", fontWeight: "800", lineHeight: "1.2" }}>
                  {"12 free gifts"}
                </span>
                <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#E4DBFF" }}>
                  {"1 a month, you pick"}
                </span>
              </span>
            </span>
            <span
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "14px",
                minHeight: "168px",
                boxSizing: "border-box",
                background: "#000000",
                color: "#FFFFFF",
                borderRadius: "16px",
                padding: "16px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "12px",
                  background: "#C0F402",
                  color: "#1F2600",
                  fontSize: "13px",
                  fontWeight: "800",
                  borderRadius: "999px",
                  padding: "5px 10px",
                }}
              >
                {"BHD 3"}
              </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                <Artwork
                  src="/haiba/brands/spotify.webp"
                  alt="Spotify"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                    boxShadow: "0 0 0 1px rgba(30,27,46,0.10)",
                  }}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "17px", fontWeight: "800", lineHeight: "1.2" }}>
                  {"Spotify Student"}
                </span>
                <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#B9B3CC" }}>
                  {"3 months free"}
                </span>
              </span>
            </span>
            <span
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "14px",
                minHeight: "168px",
                boxSizing: "border-box",
                background: "#FFFFFF",
                color: "#1E1B2E",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "0 0 0 1px #ECE8F5",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "12px",
                  background: "#1E1B2E",
                  color: "#C0F402",
                  fontSize: "13px",
                  fontWeight: "800",
                  borderRadius: "999px",
                  padding: "5px 10px",
                }}
              >
                {"BHD 9"}
              </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                <Artwork
                  src="/haiba/brands/chatgpt.webp"
                  alt="ChatGPT"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                    boxShadow: "0 0 0 1px rgba(30,27,46,0.10)",
                  }}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "17px", fontWeight: "800", lineHeight: "1.2" }}>
                  {"ChatGPT Go"}
                </span>
                <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#6B6880" }}>
                  {"3 months free"}
                </span>
              </span>
            </span>
            <span
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "14px",
                minHeight: "168px",
                boxSizing: "border-box",
                background: "#C0F402",
                color: "#1F2600",
                borderRadius: "16px",
                padding: "16px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "12px",
                  background: "#1E1B2E",
                  color: "#C0F402",
                  fontSize: "13px",
                  fontWeight: "800",
                  borderRadius: "999px",
                  padding: "5px 10px",
                }}
              >
                {v.ptsVal}
              </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                <Artwork
                  src="/haiba/coins/coin-34.webp"
                  alt=""
                  style={{ width: "44px", height: "44px", objectFit: "contain" }}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "17px", fontWeight: "800", lineHeight: "1.2" }}>
                  {v.ptsTitle}
                </span>
                <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#3D5000" }}>
                  {"Every visit, on top"}
                </span>
              </span>
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#FFFFFF",
                color: "#1E1B2E",
                borderRadius: "999px",
                padding: "6px 12px 6px 6px",
                fontSize: "14px",
                fontWeight: "700",
                boxShadow: "0 0 0 1px #ECE8F5",
              }}
            >
              <span
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: "#F0ECFF",
                  color: "#6C3FFA",
                  fontSize: "10px",
                  fontWeight: "800",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {"200+"}
              </span>
              {"200+ shops"}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#FFFFFF",
                color: "#1E1B2E",
                borderRadius: "999px",
                padding: "6px 12px 6px 6px",
                fontSize: "14px",
                fontWeight: "700",
                boxShadow: "0 0 0 1px #ECE8F5",
              }}
            >
              <span
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: "#C0F402",
                  color: "#1F2600",
                  fontSize: "10px",
                  fontWeight: "800",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {"500"}
              </span>
              {"500 welcome pts"}
            </span>
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              position: "relative",
              marginTop: "26px",
              background: "#1E1B2E",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "30px 20px 18px 20px",
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
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              <span style={{ color: "#E8E4F4" }}>
                {"You pay "}
                {v.price}
              </span>
              <span style={{ color: "#C0F402" }}>
                {"You get "}
                {v.worth}
              </span>
            </div>
            <div
              style={{
                position: "relative",
                height: "12px",
                marginTop: "10px",
                borderRadius: "999px",
                overflow: "hidden",
                background: "#C0F402",
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
                  background: "#8F7BFF",
                  borderRight: "2px solid #1E1B2E",
                }}
              ></span>
            </div>
            <div
              style={{ fontSize: "14px", fontWeight: "600", color: "#CFC9E0", marginTop: "12px" }}
            >
              {"The gifts alone are worth more than the price."}
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
                  {"Get "}
                  {v.worth}
                  {" for "}
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
