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
              margin: "24px 4px 0 4px",
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
              margin: "6px 4px 0 4px",
              fontSize: "32px",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.08",
            }}
          >
            {"Something free every month. "}
            <span style={{ color: "#C0F402" }}>{"You pick."}</span>
          </h1>
          <div
            className="hb-rise hb-d2"
            style={{
              position: "relative",
              marginTop: "20px",
              background: "#1E1B2E",
              borderRadius: "16px",
              padding: "18px 20px",
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
              {"Your Haiba year"}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              <span
                className={v.bump}
                style={{
                  fontSize: "48px",
                  fontWeight: "800",
                  letterSpacing: "-0.04em",
                  lineHeight: "1",
                  color: "#C0F402",
                }}
              >
                {v.worth}
              </span>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#E8E4F4",
                  textAlign: "right",
                }}
              >
                {"for "}
                {v.price}
              </span>
            </div>
            <div
              style={{
                position: "relative",
                height: "8px",
                marginTop: "14px",
                borderRadius: "999px",
                overflow: "hidden",
                background: "#3A3550",
              }}
            >
              <span
                className="hb-ease"
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  bottom: "0",
                  width: v.fillPct,
                  background: "#C0F402",
                  borderRadius: "999px",
                }}
              ></span>
            </div>
            <div
              style={{ fontSize: "13.5px", fontWeight: "600", color: "#CFC9E0", marginTop: "8px" }}
            >
              {v.fillLine}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              margin: "22px 4px 10px 4px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#E4DBFF",
              }}
            >
              {"Your 12 months"}
            </span>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#E4DBFF" }}>
              {"Tap a month to change it"}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "8px",
            }}
          >
            {(v.months || []).map((m: any, idx0: number) => (
              <Fragment key={idx0}>
                <button
                  onClick={m.tap}
                  onDragOver={v.allowDrop}
                  onDrop={m.drop}
                  aria-label={m.aria}
                  className="hb-press hb-ease"
                  style={{
                    font: "inherit",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "4px",
                    height: "92px",
                    boxSizing: "border-box",
                    padding: "8px 4px 8px 4px",
                    borderRadius: "14px",
                    background: m.bg,
                    border: m.border,
                    color: "#FFFFFF",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11.5px",
                      fontWeight: "800",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: m.labInk,
                    }}
                  >
                    {m.label}
                  </span>
                  {m.filled ? (
                    <>
                      <Artwork
                        className="hb-pop"
                        src={m.logo}
                        alt=""
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          objectFit: "cover",
                          display: "block",
                          boxShadow: "0 0 0 2px #FFFFFF",
                        }}
                      />
                      <span style={{ fontSize: "11.5px", fontWeight: "800", color: "#1E1B2E" }}>
                        {m.val}
                      </span>
                    </>
                  ) : null}
                  {m.empty ? (
                    <>
                      <span
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          border: `1.5px dashed ${m.dash}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                          fontWeight: "700",
                          color: m.dash,
                        }}
                      >
                        {"+"}
                      </span>
                      <span style={{ fontSize: "11px", fontWeight: "700", color: m.labInk }}>
                        {m.hint}
                      </span>
                    </>
                  ) : null}
                </button>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              margin: "18px 4px 10px 4px",
              fontSize: "13px",
              fontWeight: "800",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#C0F402",
            }}
          >
            {v.trayLine}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "8px",
            }}
          >
            {(v.gifts || []).map((g: any, idx0: number) => (
              <Fragment key={idx0}>
                <button
                  draggable="true"
                  onDragStart={g.drag}
                  onClick={g.pick}
                  aria-label={g.aria}
                  className="hb-press"
                  style={{
                    font: "inherit",
                    cursor: "grab",
                    border: "0",
                    padding: "0",
                    textAlign: "left",
                    background: "#FFFFFF",
                    color: "#1E1B2E",
                    borderRadius: "14px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 8px 18px rgba(20,8,60,0.25)",
                  }}
                >
                  <Artwork
                    src={g.logo}
                    alt={g.brand}
                    style={{
                      width: "100%",
                      height: "56px",
                      objectFit: "contain",
                      display: "block",
                      background: g.bg,
                      pointerEvents: "none",
                    }}
                  />
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                      padding: "8px 10px 10px 10px",
                    }}
                  >
                    <span style={{ fontSize: "12.5px", fontWeight: "800", lineHeight: "1.2" }}>
                      {g.item}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#6C3FFA" }}>
                      {g.val}
                    </span>
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              margin: "24px 4px 10px 4px",
              fontSize: "13px",
              fontWeight: "800",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#E4DBFF",
            }}
          >
            {"Also yours"}
          </div>
          <div style={{ background: "#1E1B2E", borderRadius: "16px", padding: "4px 18px" }}>
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
                  overflow: "hidden",
                  display: "block",
                  boxShadow: "0 0 0 1px rgba(30,27,46,0.10)",
                }}
              >
                <Artwork
                  src="/haiba/brands/spotify.webp"
                  alt="Spotify"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ fontSize: "16px", fontWeight: "700", lineHeight: "1.3" }}>
                  {"Spotify Premium Student"}
                </span>
                <span
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "500",
                    color: "#B9B3CC",
                    lineHeight: "1.35",
                  }}
                >
                  {"3 months free"}
                </span>
              </span>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "800",
                  textAlign: "right",
                  color: "#FFFFFF",
                }}
              >
                {"BHD 3.00"}
              </span>
            </div>
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
                  overflow: "hidden",
                  display: "block",
                  boxShadow: "0 0 0 1px rgba(30,27,46,0.10)",
                }}
              >
                <Artwork
                  src="/haiba/brands/chatgpt.webp"
                  alt="ChatGPT"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ fontSize: "16px", fontWeight: "700", lineHeight: "1.3" }}>
                  {"ChatGPT Go"}
                </span>
                <span
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "500",
                    color: "#B9B3CC",
                    lineHeight: "1.35",
                  }}
                >
                  {"3 months free"}
                </span>
              </span>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "800",
                  textAlign: "right",
                  color: "#FFFFFF",
                }}
              >
                {"BHD 9.00"}
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "44px minmax(0, 1fr) auto",
                gap: "12px",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: "0",
              }}
            >
              <Artwork
                src="/haiba/coins/coin-34.webp"
                alt=""
                style={{ width: "44px", height: "44px", objectFit: "contain", display: "block" }}
              />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ fontSize: "16px", fontWeight: "700", lineHeight: "1.3" }}>
                  {"Points every visit"}
                </span>
                <span
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "500",
                    color: "#B9B3CC",
                    lineHeight: "1.35",
                  }}
                >
                  {"500 to start. Spend them at 200+ shops."}
                </span>
              </span>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "800",
                  textAlign: "right",
                  color: "#FFFFFF",
                }}
              >
                {v.ptsVal}
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
