// @ts-nocheck
// Ported 1:1 from the Design canvas board "Shop.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import Artwork from "../Artwork";
import { useVals } from "../logic/shop";

export default function Shop() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  const router = useRouter();
  return (
    <div className="pg-shop">
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          margin: "0 auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          background: "#F8F8F8",
          fontFamily: "Figtree, system-ui, sans-serif",
          color: "#1A1A1A",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "380px",
            background: "linear-gradient(160deg, #6A4AA8 0%, #B58FD9 55%, #E9D9F5 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-60px",
              bottom: "-80px",
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
            }}
          ></span>
          <span
            style={{
              fontFamily: "Figtree, system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: "800",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
              border: "1.5px dashed rgba(255,255,255,0.7)",
              borderRadius: "12px",
              padding: "10px 14px",
            }}
          >
            {"[BRAND PHOTO]"}
          </span>
          <div
            style={{
              position: "absolute",
              left: "16px",
              right: "16px",
              top: "64px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Back"
              title="Back"
              className="hb-press"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#F2F2F4",
                color: "#1A1A1A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              }}
              onClick={() => router.history.back()}
            >
              <svg
                aria-hidden="true"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5"></path>
                <path d="M11 6l-6 6 6 6"></path>
              </svg>
            </Button>
            <span style={{ display: "flex", gap: "10px" }}>
              <button
                aria-label="Share"
                className="hb-press"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "0",
                  background: "#F2F2F4",
                  color: "#1A1A1A",
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
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"></path>
                </svg>
              </button>
              <button
                aria-label="Save"
                className="hb-press"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "0",
                  background: "#F2F2F4",
                  color: "#1A1A1A",
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
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.5 2.5c0 5.4-7.5 10-7.5 10z"></path>
                </svg>
              </button>
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "0",
              right: "0",
              display: "flex",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <span
              style={{ width: "22px", height: "4px", borderRadius: "999px", background: "#0B1FB3" }}
            ></span>
            <span
              style={{
                width: "14px",
                height: "4px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.8)",
              }}
            ></span>
            <span
              style={{
                width: "14px",
                height: "4px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.8)",
              }}
            ></span>
            <span
              style={{
                width: "14px",
                height: "4px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.8)",
              }}
            ></span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: "18px 16px 120px 16px" }}>
          <div className="hb-rise" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span
              style={{
                width: "60px",
                height: "60px",
                flex: "none",
                borderRadius: "16px",
                background: "#4B2E83",
                color: "#FFFFFF",
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "20px",
                fontWeight: "800",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {"CB"}
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "20px", fontWeight: "700" }}>
                {"The Coffee Bean & Tea Leaf"}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <span
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E4E4EA",
                    borderRadius: "999px",
                    padding: "3px 9px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="#F5A623">
                    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"></path>
                  </svg>
                  {"4.7"}
                </span>
                <span style={{ color: "#6B6B78" }}>{"\u00b7 392 m"}</span>
              </span>
            </span>
          </div>
          <div className="hb-rise" style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
            <span
              style={{
                border: "1px solid #D9D9E2",
                borderRadius: "999px",
                padding: "8px 14px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {"Coffee"}
            </span>
            <span
              style={{
                border: "1px solid #D9D9E2",
                borderRadius: "999px",
                padding: "8px 14px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {"Matcha"}
            </span>
            <span
              style={{
                border: "1px solid #D9D9E2",
                borderRadius: "999px",
                padding: "8px 14px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {"Dessert"}
            </span>
          </div>
          <a
            className="hb-rise hb-press"
            style={{
              marginTop: "14px",
              height: "80px",
              borderRadius: "16px",
              background: "linear-gradient(90deg, #DDEFF8 0%, #E9F1E4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              textDecoration: "none",
              color: "#1A1A1A",
              fontSize: "20px",
              fontWeight: "700",
              position: "relative",
              overflow: "hidden",
            }}
            href="#"
            onClick={(e: any) => e.preventDefault()}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "40px",
                top: "12px",
                width: "26px",
                height: "26px",
                borderRadius: "50% 50% 50% 0",
                background: "#E5484D",
                transform: "rotate(-45deg)",
              }}
            ></span>
            {"View Branches"}
          </a>
          <div
            className="hb-rise"
            style={{
              marginTop: "18px",
              background: "linear-gradient(135deg, #6C3FFA 0%, #4F25D6 100%)",
              borderRadius: "16px",
              padding: "18px 18px 16px 18px",
              color: "#FFFFFF",
              boxShadow: "0 12px 26px rgba(108,63,250,0.22)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Artwork
                priority
                src="/haiba/logo-lime.svg"
                alt="Haiba"
                style={{ height: "18px", width: "auto", display: "block" }}
              />
              <span
                style={{
                  fontSize: "12.5px",
                  fontWeight: "700",
                  background: "rgba(255,255,255,0.16)",
                  borderRadius: "999px",
                  padding: "5px 10px",
                }}
              >
                {v.visitPill}
              </span>
            </div>
            <div
              style={{
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "21px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
                lineHeight: "1.2",
                marginTop: "14px",
              }}
            >
              {v.visitLine}
            </div>
            <div
              style={{ fontSize: "14px", fontWeight: "500", color: "#E4DBFF", marginTop: "4px" }}
            >
              {v.visitSub}
            </div>
            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                marginTop: "18px",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "10%",
                  right: "10%",
                  top: "17px",
                  height: "2px",
                  background: "rgba(255,255,255,0.22)",
                }}
              ></span>
              {(v.stamps || []).map((s: any, idx0: number) => (
                <Fragment key={idx0}>
                  <span
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        width: "36px",
                        height: "36px",
                        boxSizing: "border-box",
                        borderRadius: "50%",
                        background: s.bg,
                        color: s.ink,
                        border: `2px solid ${s.ring}`,
                        boxShadow: s.glow,
                        fontFamily: "Figtree, system-ui, sans-serif",
                        fontSize: "12px",
                        fontWeight: "800",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {s.tag}
                    </span>
                    <span style={{ fontSize: "12.5px", fontWeight: "700", color: s.labelInk }}>
                      {s.pts}
                    </span>
                  </span>
                </Fragment>
              ))}
            </div>
            <div
              style={{
                marginTop: "14px",
                paddingTop: "12px",
                borderTop: "1px solid rgba(255,255,255,0.16)",
                fontSize: "13px",
                fontWeight: "500",
                color: "#E4DBFF",
              }}
            >
              {"Visit 5 earns 200 points. Then the card starts again."}
            </div>
          </div>
          <div style={{ fontSize: "22px", fontWeight: "700", marginTop: "28px" }}>{"Offers"}</div>
          <div
            className="hb-rise"
            style={{
              marginTop: "14px",
              background: "#FFFFFF",
              border: "1px solid #E4E4EA",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "18px 18px 16px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <span
                style={{
                  alignSelf: "flex-start",
                  background: "#E9ECFA",
                  color: "#0B1FB3",
                  fontSize: "13.5px",
                  fontWeight: "700",
                  borderRadius: "6px",
                  padding: "5px 10px",
                }}
              >
                {"% Discount"}
              </span>
              <span style={{ fontSize: "20px", fontWeight: "700" }}>{"Upsize Your Drinks!"}</span>
              <span
                style={{
                  alignSelf: "flex-start",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#1E1B2E",
                  color: "#C0F402",
                  fontSize: "13px",
                  fontWeight: "700",
                  borderRadius: "999px",
                  padding: "5px 10px 5px 6px",
                }}
              >
                <Artwork
                  src="/haiba/coins/coin-front.webp"
                  alt=""
                  style={{
                    width: "18px",
                    height: "18px",
                    objectFit: "contain",
                    display: "block",
                    flex: "none",
                  }}
                />
                {v.offerPts}
                {" points for Haiba members"}
              </span>
            </div>
            <div
              style={{
                position: "relative",
                height: "0",
                borderTop: "2px dashed #E4E4EA",
                margin: "0 14px",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-24px",
                  top: "-11px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "#F8F8F8",
                  border: "1px solid #E4E4EA",
                  borderLeftColor: "transparent",
                }}
              ></span>
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: "-24px",
                  top: "-11px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "#F8F8F8",
                  border: "1px solid #E4E4EA",
                  borderRightColor: "transparent",
                }}
              ></span>
            </div>
            <div
              style={{
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  background: "#E6F4EA",
                  color: "#1E7A34",
                  fontSize: "14px",
                  fontWeight: "700",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#1E7A34",
                  }}
                ></span>
                {"Available now"}
              </span>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "17px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
                to="/shop/coffee-bean/redeem"
              >
                {"Redeem"}
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6l6 6-6 6"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "28px",
            }}
          >
            <span style={{ fontSize: "22px", fontWeight: "700" }}>{"Haiba rewards"}</span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#1E1B2E",
                color: "#FFFFFF",
                fontFamily: "Figtree, system-ui, sans-serif",
                fontSize: "14px",
                fontWeight: "800",
                borderRadius: "999px",
                padding: "7px 12px 7px 7px",
              }}
            >
              <Artwork
                src="/haiba/coins/coin-front.webp"
                alt=""
                style={{
                  width: "22px",
                  height: "22px",
                  objectFit: "contain",
                  display: "block",
                  flex: "none",
                }}
              />
              {v.balance}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", marginTop: "4px" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#6B6B78",
                lineHeight: "1.4",
                flex: "1",
              }}
            >
              {"Free items for your points. Tap one to get its code, then show it at the till."}
            </span>
            <Artwork
              src="/haiba/birds/12-ledge.png"
              alt=""
              style={{
                height: "64px",
                width: "auto",
                display: "block",
                marginBottom: "-15px",
                position: "relative",
                zIndex: "1",
              }}
            />
          </div>
          <div
            className="hb-stagger"
            style={{
              marginTop: "14px",
              background: "#FFFFFF",
              border: "1px solid #E4E4EA",
              borderRadius: "16px",
              padding: "4px 16px",
            }}
          >
            {(v.items || []).map((it: any, idx0: number) => (
              <Fragment key={idx0}>
                <div style={{ borderBottom: it.rule, padding: "14px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span
                      style={{
                        width: "64px",
                        height: "64px",
                        flex: "none",
                        borderRadius: "14px",
                        background: it.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: it.ink,
                        fontSize: "11px",
                        fontWeight: "800",
                        letterSpacing: "0.06em",
                        textAlign: "center",
                        lineHeight: "1.2",
                      }}
                    >
                      {it.ph}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        flex: "1",
                        minWidth: "0",
                      }}
                    >
                      <span style={{ fontSize: "16px", fontWeight: "700" }}>{it.name}</span>
                      <span style={{ fontSize: "13px", fontWeight: "500", color: "#6B6B78" }}>
                        {it.sub}
                      </span>
                      <span
                        style={{
                          alignSelf: "flex-start",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "13px",
                          fontWeight: "700",
                          color: it.ptsInk,
                          background: it.ptsBg,
                          borderRadius: "999px",
                          padding: "3px 9px 3px 5px",
                        }}
                      >
                        <Artwork
                          src="/haiba/coins/coin-front.webp"
                          alt=""
                          style={{
                            width: "16px",
                            height: "16px",
                            objectFit: "contain",
                            display: "block",
                            flex: "none",
                          }}
                        />
                        {it.pts}
                      </span>
                    </span>
                    {it.showUse ? (
                      <>
                        <button
                          onClick={it.ask}
                          aria-label={it.useLabel}
                          className="hb-press"
                          style={{
                            font: "inherit",
                            fontSize: "14px",
                            fontWeight: "800",
                            flex: "none",
                            borderRadius: "999px",
                            border: "0",
                            padding: "10px 16px",
                            cursor: it.cursor,
                            background: it.btnBg,
                            color: it.btnInk,
                          }}
                        >
                          {"Use"}
                        </button>
                      </>
                    ) : null}
                    {it.isUsed ? (
                      <>
                        <span
                          style={{
                            flex: "none",
                            fontSize: "13px",
                            fontWeight: "800",
                            color: "#1E7A34",
                            background: "#E6F4EA",
                            borderRadius: "999px",
                            padding: "7px 12px",
                          }}
                        >
                          {"Used"}
                        </span>
                      </>
                    ) : null}
                  </div>
                  {it.asking ? (
                    <>
                      <div
                        className="hb-pop"
                        style={{
                          marginTop: "12px",
                          background: "#F4F1FD",
                          borderRadius: "16px",
                          padding: "14px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          transformOrigin: "top center",
                        }}
                      >
                        <span style={{ fontSize: "15px", fontWeight: "700", lineHeight: "1.35" }}>
                          {it.askLine}
                        </span>
                        <span style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={it.confirm}
                            className="hb-press"
                            style={{
                              font: "inherit",
                              flex: "1",
                              fontSize: "15px",
                              fontWeight: "800",
                              border: "0",
                              borderRadius: "999px",
                              padding: "12px",
                              cursor: "pointer",
                              background: "#1E1B2E",
                              color: "#C0F402",
                            }}
                          >
                            {"Get my code"}
                          </button>
                          <button
                            onClick={it.notNow}
                            className="hb-press"
                            style={{
                              font: "inherit",
                              fontSize: "15px",
                              fontWeight: "700",
                              border: "0",
                              borderRadius: "999px",
                              padding: "12px 16px",
                              cursor: "pointer",
                              background: "#FFFFFF",
                              color: "#1E1B2E",
                            }}
                          >
                            {"Not now"}
                          </button>
                        </span>
                      </div>
                    </>
                  ) : null}
                  {it.held ? (
                    <>
                      <div
                        className="hb-pop"
                        style={{
                          marginTop: "12px",
                          background: "linear-gradient(135deg, #6C3FFA 0%, #4F25D6 100%)",
                          borderRadius: "16px",
                          padding: "16px",
                          color: "#FFFFFF",
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          transformOrigin: "top center",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "13px",
                            fontWeight: "700",
                            color: "#E4DBFF",
                          }}
                        >
                          <span>{"Show this at the till"}</span>
                          <span>{"Use by 20 Nov"}</span>
                        </span>
                        <span
                          style={{
                            background: "#FFFFFF",
                            color: "#1E1B2E",
                            borderRadius: "14px",
                            padding: "14px",
                            textAlign: "center",
                            fontFamily: "Figtree, system-ui, sans-serif",
                            fontSize: "28px",
                            fontWeight: "800",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {it.code}
                        </span>
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <button
                            onClick={it.cancel}
                            className="hb-press"
                            style={{
                              font: "inherit",
                              fontSize: "13.5px",
                              fontWeight: "700",
                              border: "0",
                              background: "transparent",
                              color: "#E4DBFF",
                              padding: "4px 0",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                          >
                            {"Cancel, points back"}
                          </button>
                          <button
                            onClick={it.accept}
                            aria-label="Prototype: the shop accepts this code"
                            className="hb-press"
                            style={{
                              font: "inherit",
                              fontSize: "12.5px",
                              fontWeight: "700",
                              border: "1.5px dashed rgba(255,255,255,0.5)",
                              background: "transparent",
                              color: "#FFFFFF",
                              borderRadius: "999px",
                              padding: "6px 10px",
                              cursor: "pointer",
                            }}
                          >
                            {"Test: shop accepts"}
                          </button>
                        </span>
                      </div>
                    </>
                  ) : null}
                  {it.isUsed ? (
                    <>
                      <div
                        className="hb-pop"
                        style={{
                          marginTop: "12px",
                          background: "#E6F4EA",
                          color: "#1E5E2E",
                          borderRadius: "14px",
                          padding: "12px 14px",
                          fontSize: "14px",
                          fontWeight: "700",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span>{it.savedLine}</span>
                        <button
                          onClick={it.again}
                          className="hb-press"
                          style={{
                            font: "inherit",
                            fontSize: "13.5px",
                            fontWeight: "800",
                            border: "0",
                            borderRadius: "999px",
                            padding: "8px 12px",
                            cursor: "pointer",
                            background: "#1E1B2E",
                            color: "#C0F402",
                            opacity: it.againOp,
                          }}
                        >
                          {"Use again"}
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </Fragment>
            ))}
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color: "#6B6B78",
              marginTop: "10px",
              lineHeight: "1.45",
            }}
          >
            {
              "One code per item. Each code lasts 30 days. Your points are held until the shop accepts the code, and come back if you cancel."
            }
          </div>
          <div
            className="hb-rise"
            style={{
              marginTop: "22px",
              background: "#C0F402",
              borderRadius: "16px",
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Artwork
              src="/haiba/birds/10-gift.png"
              alt=""
              style={{
                height: "96px",
                width: "auto",
                flex: "none",
                margin: "-22px -4px -26px -6px",
                display: "block",
                filter: "drop-shadow(0 6px 8px rgba(31,38,0,0.25))",
              }}
            />
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                flex: "1",
                minWidth: "0",
                color: "#1F2600",
              }}
            >
              <span style={{ fontSize: "16px", fontWeight: "700" }}>
                {"Free drink is in Unipass this month"}
              </span>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#3D5000" }}>
                {"Your October gift is still unpicked. 10 days left."}
              </span>
            </span>
            <a
              className="hb-press"
              style={{
                textDecoration: "none",
                background: "#1F2600",
                color: "#C0F402",
                fontSize: "14px",
                fontWeight: "700",
                borderRadius: "999px",
                padding: "10px 14px",
                flex: "none",
              }}
              href="#"
              onClick={(e: any) => e.preventDefault()}
            >
              {"Pick"}
            </a>
          </div>
          <div style={{ fontSize: "22px", fontWeight: "700", marginTop: "28px" }}>{"About"}</div>
          <div
            style={{
              fontSize: "17px",
              fontWeight: "400",
              color: "#3A3A44",
              lineHeight: "1.5",
              marginTop: "10px",
            }}
          >
            {
              "Born and brewed in Southern California since 1963, The Coffee Bean & Tea Leaf has always been passionate about connecting loyal customers with carefully handcrafted products."
            }
          </div>
          <div style={{ fontSize: "20px", fontWeight: "700", marginTop: "22px" }}>
            {"Follow The Coffee Bean & Tea Leaf"}
          </div>
          <a
            aria-label="Instagram"
            style={{
              marginTop: "12px",
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "#EEEEF2",
              color: "#1A1A1A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
            href="#"
            onClick={(e: any) => e.preventDefault()}
          >
            <svg
              aria-hidden="true"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="5"></rect>
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M17.5 6.5h.01"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
