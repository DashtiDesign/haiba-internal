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
          <h1
            className="hb-rise"
            style={{
              margin: "18px 4px 0 4px",
              fontSize: "28px",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
            }}
          >
            {v.hello}
            <br />
            <span style={{ color: "#C0F402" }}>{"Pick a free gift for every month."}</span>
          </h1>
          <div
            className="hb-rise hb-d1"
            style={{
              marginTop: "14px",
              background: "#1E1B2E",
              borderRadius: "16px",
              padding: "14px 16px 16px 16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#B9B3CC",
                  }}
                >
                  {"Your Haiba year"}
                </span>
                <span
                  style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}
                >
                  <span
                    className={v.bump}
                    style={{
                      fontSize: "40px",
                      fontWeight: "800",
                      letterSpacing: "-0.04em",
                      lineHeight: "1",
                      color: "#C0F402",
                    }}
                  >
                    {v.worth}
                  </span>
                  <span
                    className={v.bump}
                    style={{
                      position: "absolute",
                      left: "100%",
                      top: "-8px",
                      marginLeft: "8px",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      fontWeight: "800",
                      color: "#1F2600",
                      background: "#C0F402",
                      borderRadius: "999px",
                      padding: "3px 8px",
                      opacity: v.deltaOp,
                    }}
                  >
                    {v.delta}
                  </span>
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "2px",
                  textAlign: "right",
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#B9B3CC" }}>
                  {"You pay"}
                </span>
                <span style={{ fontSize: "17px", fontWeight: "800", whiteSpace: "nowrap" }}>
                  {v.price}
                </span>
              </span>
            </div>
            <div
              style={{
                fontSize: "12.5px",
                fontWeight: "600",
                color: "#CFC9E0",
                marginTop: "8px",
                lineHeight: "1.4",
              }}
            >
              {v.breakdown}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
              gap: "6px",
              marginTop: "14px",
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
                    gap: "3px",
                    height: "70px",
                    boxSizing: "border-box",
                    padding: "6px 2px",
                    borderRadius: "12px",
                    background: m.bg,
                    border: m.border,
                    color: "#FFFFFF",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontWeight: "800",
                      letterSpacing: "0.06em",
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
                          width: "34px",
                          height: "34px",
                          borderRadius: "9px",
                          objectFit: "cover",
                          display: "block",
                          boxShadow: "0 0 0 2px #FFFFFF",
                        }}
                      />
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
                          fontSize: "17px",
                          fontWeight: "700",
                          color: m.dash,
                        }}
                      >
                        {"+"}
                      </span>
                    </>
                  ) : null}
                </button>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              margin: "14px 4px 8px 4px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#C0F402",
              }}
            >
              {v.trayLine}
            </span>
            <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#E4DBFF" }}>
              {v.count}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "6px",
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
                    padding: "8px",
                    textAlign: "left",
                    background: "#FFFFFF",
                    color: "#1E1B2E",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 8px 18px rgba(20,8,60,0.25)",
                  }}
                >
                  <Artwork
                    src={g.logo}
                    alt={g.brand}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "9px",
                      objectFit: "cover",
                      display: "block",
                      flex: "none",
                      pointerEvents: "none",
                      boxShadow: "0 0 0 1px #ECE8F5",
                    }}
                  />
                  <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                    <span style={{ fontSize: "12px", fontWeight: "800", lineHeight: "1.15" }}>
                      {g.item}
                    </span>
                    <span style={{ fontSize: "11.5px", fontWeight: "800", color: "#6C3FFA" }}>
                      {g.val}
                    </span>
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              margin: "28px 4px 4px 4px",
              fontSize: "28px",
              fontWeight: "800",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
          >
            {"And on us, "}
            <span style={{ color: "#C0F402" }}>{"from day one."}</span>
          </div>
          <div
            style={{
              margin: "0 4px 14px 4px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#E4DBFF",
            }}
          >
            {"The apps you already use. Free for 3 months."}
          </div>
          <div
            className="hb-stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "10px",
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
                minHeight: "176px",
                boxSizing: "border-box",
                padding: "16px",
                borderRadius: "16px",
                background: "#000000",
                color: "#FFFFFF",
              }}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Artwork
                  src="/haiba/brands/spotify.webp"
                  alt="Spotify Premium Student"
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    objectFit: "cover",
                    display: "block",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.15)",
                  }}
                />
                <span
                  style={{
                    background: "#C0F402",
                    color: "#1F2600",
                    fontSize: "13px",
                    fontWeight: "800",
                    borderRadius: "999px",
                    padding: "5px 10px",
                  }}
                >
                  {"BHD 3.00"}
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#B9B3CC",
                  }}
                >
                  {"3 months free"}
                </span>
                <span style={{ fontSize: "19px", fontWeight: "800", lineHeight: "1.15" }}>
                  {"Spotify Premium Student"}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#B9B3CC" }}>
                  {"Ad free music, offline"}
                </span>
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
                minHeight: "176px",
                boxSizing: "border-box",
                padding: "16px",
                borderRadius: "16px",
                background: "#FFFFFF",
                color: "#1E1B2E",
              }}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Artwork
                  src="/haiba/brands/chatgpt.webp"
                  alt="ChatGPT Go"
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    objectFit: "cover",
                    display: "block",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.15)",
                  }}
                />
                <span
                  style={{
                    background: "#C0F402",
                    color: "#1F2600",
                    fontSize: "13px",
                    fontWeight: "800",
                    borderRadius: "999px",
                    padding: "5px 10px",
                  }}
                >
                  {"BHD 9.00"}
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#6B6880",
                  }}
                >
                  {"3 months free"}
                </span>
                <span style={{ fontSize: "19px", fontWeight: "800", lineHeight: "1.15" }}>
                  {"ChatGPT Go"}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
                  {"Help with study and more"}
                </span>
              </span>
            </span>
          </div>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              border: "1.5px dashed rgba(192,244,2,0.7)",
              background: "rgba(30,27,46,0.30)",
              borderRadius: "16px",
              padding: "14px 16px",
            }}
          >
            <span style={{ position: "relative", width: "48px", height: "48px", flex: "none" }}>
              <Artwork
                src="/haiba/coins/coin-34.webp"
                alt=""
                style={{ width: "48px", height: "48px", objectFit: "contain", display: "block" }}
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 0 2px #4F25D6",
                }}
              >
                {"+"}
              </span>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "2px", flex: "1" }}>
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
              <span style={{ fontSize: "17px", fontWeight: "800" }}>{"Points every visit"}</span>
              <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#E4DBFF" }}>
                {"500 to start. Spend them at 200+ shops."}
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
