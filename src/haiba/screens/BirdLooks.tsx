// @ts-nocheck
// Ported 1:1 from the Design canvas board "BirdLooks.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/birdlooks";

export default function BirdLooks() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-birdlooks">
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          margin: "0 auto",
          minHeight: "1120px",
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
            height: "486px",
            background:
              "radial-gradient(circle at 50% 56%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 44%), linear-gradient(180deg, #CDBBFF 0%, #E0D4FF 64%, #EEE8FF 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "0",
              right: "0",
              top: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
            }}
          >
            <Link
              aria-label="Back"
              className="hb-press"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#FFFFFF",
                color: "#1E1B2E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              }}
              to="/haiba/rewards"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 6l-6 6 6 6"></path>
              </svg>
            </Link>
            <span style={{ fontSize: "17px", fontWeight: "800" }}>{"Bird looks"}</span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#FFFFFF",
                borderRadius: "999px",
                padding: "5px 12px 5px 5px",
                fontSize: "15px",
                fontWeight: "800",
              }}
            >
              <Artwork
                priority
                src="/haiba/coins/coin-front.webp"
                alt=""
                style={{ width: "26px", height: "26px", objectFit: "contain", display: "block" }}
              />
              {v.pointsTxt}
            </span>
          </div>
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              bottom: "144px",
              width: "150px",
              height: "20px",
              marginLeft: "-75px",
              borderRadius: "50%",
              background: "#4C348C",
              opacity: "0.16",
              filter: "blur(7px)",
            }}
          ></span>
          <Artwork
            src={v.stageSrc}
            alt={v.stageAlt}
            style={{
              position: "absolute",
              left: "50%",
              bottom: "136px",
              height: "290px",
              width: "auto",
              maxWidth: "none",
              transform: "translateX(-50%)",
              display: "block",
            }}
          />
          {v.loading ? (
            <>
              <span
                className="hb-fade"
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "150px",
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                  background: "rgba(30,27,46,0.7)",
                  color: "#FFFFFF",
                  fontSize: "12.5px",
                  fontWeight: "700",
                  borderRadius: "999px",
                  padding: "6px 12px",
                }}
              >
                {"Loading"}
              </span>
            </>
          ) : null}
          <div
            style={{
              position: "absolute",
              left: "16px",
              right: "16px",
              bottom: "82px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "-0.02em" }}>
              {v.selName}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                marginTop: "4px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#4A4660",
              }}
            >
              {v.selShowCoin ? (
                <>
                  <Artwork
                    src="/haiba/coins/coin-front.webp"
                    alt=""
                    style={{
                      width: "18px",
                      height: "18px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </>
              ) : null}
              {v.selLine}
            </div>
          </div>
          <button
            onClick={v.act}
            className="hb-press"
            style={{
              position: "absolute",
              left: "16px",
              right: "16px",
              bottom: "16px",
              height: "54px",
              font: "inherit",
              fontSize: "16px",
              fontWeight: "800",
              border: "0",
              borderRadius: "999px",
              cursor: v.actCursor,
              background: v.actBg,
              color: v.actInk,
            }}
          >
            {v.actLabel}
          </button>
        </div>
        <div
          style={{
            position: "relative",
            marginTop: "-2px",
            background: "#FFFFFF",
            padding: "22px 16px 40px 16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <span style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.01em" }}>
              {"All looks"}
            </span>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
              {v.countTxt}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "10px",
              marginTop: "14px",
            }}
          >
            {(v.looks || []).map((k: any, idx0: number) => (
              <Fragment key={idx0}>
                <button
                  onClick={k.pick}
                  aria-label={k.aria}
                  aria-pressed={k.onStr}
                  className="hb-press"
                  style={{
                    font: "inherit",
                    color: "#1E1B2E",
                    cursor: "pointer",
                    border: "0",
                    padding: "0",
                    textAlign: "center",
                    background: k.bg,
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: k.ring,
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      display: "block",
                      height: "116px",
                      overflow: "hidden",
                    }}
                  >
                    <Artwork
                      src={k.still}
                      alt=""
                      style={{
                        position: "absolute",
                        left: "50%",
                        bottom: "-2px",
                        height: "112px",
                        width: "auto",
                        maxWidth: "none",
                        transform: "translateX(-50%)",
                        display: "block",
                      }}
                    />
                    {k.wearing ? (
                      <>
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            right: "7px",
                            top: "7px",
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            background: "#C0F402",
                            color: "#1F2600",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                          </svg>
                        </span>
                      </>
                    ) : null}
                  </span>
                  <span style={{ display: "block", padding: "7px 6px 10px 6px" }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "700",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {k.name}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                        marginTop: "3px",
                        fontSize: "12.5px",
                        fontWeight: "800",
                        color: k.metaInk,
                      }}
                    >
                      {k.showCoin ? (
                        <>
                          <Artwork
                            src="/haiba/coins/coin-front.webp"
                            alt=""
                            style={{
                              width: "15px",
                              height: "15px",
                              objectFit: "contain",
                              display: "block",
                            }}
                          />
                        </>
                      ) : null}
                      {k.meta}
                    </span>
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              marginTop: "18px",
              fontSize: "13px",
              fontWeight: "600",
              color: "#8F89A8",
              textAlign: "center",
              lineHeight: "1.45",
            }}
          >
            {"Looks are yours to keep. Change your bird any time here or in your profile."}
          </div>
        </div>
        {v.asking ? (
          <>
            <div
              className="hb-fade"
              style={{
                position: "fixed",
                inset: "0",
                background: "rgba(20,16,40,0.5)",
                zIndex: "70",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <button
                onClick={v.notNow}
                aria-label="Close"
                style={{
                  position: "absolute",
                  inset: "0",
                  border: "0",
                  background: "transparent",
                  cursor: "default",
                }}
              ></button>
              <div
                className="hb-up"
                role="dialog"
                aria-label={v.askTitle}
                style={{
                  position: "relative",
                  width: "100%",
                  boxSizing: "border-box",
                  background: "#FFFFFF",
                  borderRadius: "20px 20px 0 0",
                  padding: "10px 20px 28px 20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "5px",
                    borderRadius: "999px",
                    background: "#D9D3EA",
                    margin: "0 auto 18px auto",
                  }}
                ></div>
                <div style={{ fontSize: "22px", fontWeight: "900", letterSpacing: "-0.02em" }}>
                  {v.askTitle}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#4A4660",
                    marginTop: "6px",
                    lineHeight: "1.45",
                  }}
                >
                  {v.askBody}
                </div>
                <button
                  onClick={v.buy}
                  className="hb-press"
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    height: "54px",
                    font: "inherit",
                    fontSize: "16px",
                    fontWeight: "800",
                    border: "0",
                    borderRadius: "999px",
                    cursor: "pointer",
                    background: "#1E1B2E",
                    color: "#C0F402",
                  }}
                >
                  {"Get it"}
                </button>
                <button
                  onClick={v.notNow}
                  className="hb-press"
                  style={{
                    marginTop: "6px",
                    width: "100%",
                    height: "48px",
                    font: "inherit",
                    fontSize: "15px",
                    fontWeight: "700",
                    border: "0",
                    borderRadius: "999px",
                    cursor: "pointer",
                    background: "transparent",
                    color: "#1E1B2E",
                  }}
                >
                  {"Not now"}
                </button>
              </div>
            </div>
          </>
        ) : null}
        {v.toast ? (
          <>
            <div
              className="hb-pop"
              role="status"
              style={{
                position: "absolute",
                left: "50%",
                top: "66px",
                transform: "translateX(-50%)",
                zIndex: "5",
                whiteSpace: "nowrap",
                background: "#1E1B2E",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: "700",
                borderRadius: "999px",
                padding: "9px 14px",
              }}
            >
              {v.toastTxt}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
