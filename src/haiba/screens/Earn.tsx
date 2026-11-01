// @ts-nocheck
// Ported 1:1 from the Design canvas board "Earn.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/earn";

export default function Earn() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-earn">
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
            height: "240px",
            background: "linear-gradient(180deg, #E4D9FF 0%, #F3F0FA 100%)",
          }}
        ></div>
        <div style={{ position: "relative", padding: "14px 16px 60px 16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <Link
              aria-label="Back to Haiba"
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
                boxShadow: "0 0 0 1px #ECE8F5",
              }}
              to="/haiba"
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
                strokeLinejoin="round"
              >
                <path d="M19 12H5"></path>
                <path d="M11 6l-6 6 6 6"></path>
              </svg>
            </Link>
            <span style={{ fontSize: "17px", fontWeight: "800" }}>{"Earn points"}</span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#1E1B2E",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: "800",
                borderRadius: "999px",
                padding: "6px 12px 6px 6px",
              }}
            >
              <Artwork
                priority
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
          <h1
            className="hb-rise"
            style={{
              margin: "20px 4px 0 4px",
              fontSize: "26px",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1.12",
            }}
          >
            {"Use any Unipal offer. "}
            <span style={{ color: "#6C3FFA" }}>{"Points land on their own."}</span>
          </h1>
          <Link
            className="hb-press hb-rise hb-d1"
            style={{
              marginTop: "12px",
              textDecoration: "none",
              color: "#1E1B2E",
              background: "#FFFFFF",
              borderRadius: "14px",
              padding: "10px 12px",
              boxShadow: "0 0 0 1px #ECE8F5",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            to="/haiba/points"
          >
            <Artwork
              src="/haiba/coins/coin-34.webp"
              alt=""
              style={{
                width: "30px",
                height: "30px",
                objectFit: "contain",
                display: "block",
                flex: "none",
              }}
            />
            <span
              style={{
                fontSize: "13.5px",
                fontWeight: "600",
                color: "#4A4660",
                lineHeight: "1.4",
                flex: "1",
              }}
            >
              {"40 points a visit. "}
              <b style={{ color: "#1E1B2E" }}>{"2x"}</b>
              {" on your first 2 visits at a shop. "}
              <b style={{ color: "#1E1B2E" }}>{"5x"}</b>
              {" every 5th."}
            </span>
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6C3FFA"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flex: "none" }}
            >
              <path d="M9 6l6 6-6 6"></path>
            </svg>
          </Link>
          <div style={{ position: "relative", marginTop: "14px" }}>
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B6880"
              strokeWidth="2.4"
              strokeLinecap="round"
              style={{ position: "absolute", left: "14px", top: "13px" }}
            >
              <circle cx="11" cy="11" r="7"></circle>
              <path d="M20 20l-3.5-3.5"></path>
            </svg>
            <input
              type="search"
              value={v.q}
              onInput={v.onSearch}
              onChange={v.onSearch}
              placeholder="Search 200+ shops"
              aria-label="Search shops"
              style={{
                width: "100%",
                boxSizing: "border-box",
                font: "inherit",
                fontSize: "15px",
                fontWeight: "600",
                color: "#1E1B2E",
                background: "#FFFFFF",
                border: "0",
                borderRadius: "14px",
                padding: "12px 14px 12px 40px",
                boxShadow: "0 0 0 1px #ECE8F5",
                outline: "none",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              margin: "12px -16px 0 -16px",
              padding: "0 16px",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {(v.chips || []).map((c: any, idx0: number) => (
              <Fragment key={idx0}>
                <button
                  onClick={c.pick}
                  aria-pressed={c.on}
                  className="hb-press"
                  style={{
                    font: "inherit",
                    flex: "none",
                    border: "0",
                    cursor: "pointer",
                    fontSize: "13.5px",
                    fontWeight: "800",
                    borderRadius: "999px",
                    padding: "8px 13px",
                    background: c.bg,
                    color: c.ink,
                    boxShadow: c.ring,
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.label}
                </button>
              </Fragment>
            ))}
          </div>
          {v.showBrowse ? (
            <>
              {v.hasMine ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      margin: "22px 4px 10px 4px",
                    }}
                  >
                    <span style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>
                      {"Your shops"}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
                      {v.mineNote}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "14px",
                      margin: "0 -16px",
                      padding: "0 16px 4px 16px",
                      overflowX: "auto",
                      scrollbarWidth: "none",
                    }}
                  >
                    {(v.mine || []).map((m: any, idx0: number) => (
                      <Fragment key={idx0}>
                        <button
                          onClick={m.open}
                          aria-label={m.aria}
                          className="hb-press"
                          style={{
                            font: "inherit",
                            border: "0",
                            background: "transparent",
                            padding: "0",
                            cursor: "pointer",
                            flex: "none",
                            width: "66px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "12px",
                            color: "#1E1B2E",
                          }}
                        >
                          <span style={{ position: "relative" }}>
                            {m.hasLogo ? (
                              <>
                                <Artwork
                                  src={m.logo}
                                  alt=""
                                  style={{
                                    width: "56px",
                                    height: "56px",
                                    flex: "none",
                                    borderRadius: "18px",
                                    objectFit: "cover",
                                    display: "block",
                                    background: m.bg,
                                    boxShadow: "0 0 0 1px #ECE8F5",
                                  }}
                                />
                              </>
                            ) : null}
                            {m.noLogo ? (
                              <>
                                <span
                                  style={{
                                    width: "56px",
                                    height: "56px",
                                    flex: "none",
                                    borderRadius: "18px",
                                    background: m.bg,
                                    color: "#FFFFFF",
                                    fontSize: "18px",
                                    fontWeight: "800",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  {m.mark}
                                </span>
                              </>
                            ) : null}
                            <span
                              style={{
                                display: m.badgeDisp,
                                position: "absolute",
                                left: "50%",
                                bottom: "-8px",
                                transform: "translateX(-50%)",
                                whiteSpace: "nowrap",
                                fontSize: "11px",
                                fontWeight: "800",
                                borderRadius: "999px",
                                padding: "2px 6px",
                                background: m.badgeBg,
                                color: m.badgeInk,
                                boxShadow: "0 0 0 2px #F3F0FA",
                              }}
                            >
                              {m.badge}
                            </span>
                          </span>
                          <span
                            style={{
                              fontSize: "12.5px",
                              fontWeight: "700",
                              lineHeight: "1.2",
                              textAlign: "center",
                              maxWidth: "66px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {m.short}
                          </span>
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
            </>
          ) : null}
          {v.showBrowse ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  margin: "22px 4px 10px 4px",
                }}
              >
                <span style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>
                  {"Bonus waiting"}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
                  {v.bonusNote}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  margin: "0 -16px",
                  padding: "0 16px 4px 16px",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {(v.bonus || []).map((b: any, idx0: number) => (
                  <Fragment key={idx0}>
                    <button
                      onClick={b.open}
                      className="hb-press"
                      style={{
                        font: "inherit",
                        flex: "none",
                        width: "168px",
                        border: "0",
                        cursor: "pointer",
                        textAlign: "left",
                        background: b.bg2,
                        color: b.ink2,
                        borderRadius: "16px",
                        padding: "14px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        boxShadow: b.shadow,
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {b.hasLogo ? (
                          <>
                            <Artwork
                              src={b.logo}
                              alt=""
                              style={{
                                width: "32px",
                                height: "32px",
                                flex: "none",
                                borderRadius: "10px",
                                objectFit: "cover",
                                display: "block",
                                background: b.bg,
                                boxShadow: "0 0 0 1px #ECE8F5",
                              }}
                            />
                          </>
                        ) : null}
                        {b.noLogo ? (
                          <>
                            <span
                              style={{
                                width: "32px",
                                height: "32px",
                                flex: "none",
                                borderRadius: "10px",
                                background: b.bg,
                                color: "#FFFFFF",
                                fontSize: "12px",
                                fontWeight: "800",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {b.mark}
                            </span>
                          </>
                        ) : null}
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "800",
                            lineHeight: "1.2",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {b.name}
                        </span>
                      </span>
                      <span style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                        <span
                          style={{
                            fontSize: "30px",
                            fontWeight: "800",
                            letterSpacing: "-0.03em",
                            lineHeight: "1",
                            color: b.ptsInk,
                          }}
                        >
                          {b.pts}
                        </span>
                        <span style={{ fontSize: "13px", fontWeight: "800" }}>{b.tag}</span>
                      </span>
                      <span
                        style={{
                          fontSize: "12.5px",
                          fontWeight: "600",
                          opacity: "0.8",
                          lineHeight: "1.35",
                        }}
                      >
                        {b.line}
                      </span>
                    </button>
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              margin: "22px 4px 8px 4px",
            }}
          >
            <span style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>
              {v.listTitle}
            </span>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
              {v.listNote}
            </span>
          </div>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "2px 14px",
              boxShadow: "0 0 0 1px #ECE8F5",
            }}
          >
            {(v.rows || []).map((r: any, idx0: number) => (
              <Fragment key={idx0}>
                <button
                  onClick={r.open}
                  className="hb-row"
                  style={{
                    font: "inherit",
                    width: "100%",
                    textAlign: "left",
                    border: "0",
                    borderBottom: r.rule,
                    background: "transparent",
                    color: "#1E1B2E",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "11px 0",
                    cursor: "pointer",
                  }}
                >
                  {r.hasLogo ? (
                    <>
                      <Artwork
                        src={r.logo}
                        alt=""
                        style={{
                          width: "40px",
                          height: "40px",
                          flex: "none",
                          borderRadius: "12px",
                          objectFit: "cover",
                          display: "block",
                          background: r.bg,
                          boxShadow: "0 0 0 1px #ECE8F5",
                        }}
                      />
                    </>
                  ) : null}
                  {r.noLogo ? (
                    <>
                      <span
                        style={{
                          width: "40px",
                          height: "40px",
                          flex: "none",
                          borderRadius: "12px",
                          background: r.bg,
                          color: "#FFFFFF",
                          fontSize: "15px",
                          fontWeight: "800",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {r.mark}
                      </span>
                    </>
                  ) : null}
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      flex: "1",
                      minWidth: "0",
                    }}
                  >
                    <span style={{ fontSize: "15.5px", fontWeight: "800" }}>{r.name}</span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: r.lineInk }}>
                      {r.line}
                    </span>
                  </span>
                  <span
                    style={{
                      display: r.pillDisp,
                      flex: "none",
                      fontSize: "13px",
                      fontWeight: "800",
                      borderRadius: "999px",
                      padding: "4px 10px",
                      background: r.pillBg,
                      color: r.pillInk,
                      opacity: r.pillOp,
                    }}
                  >
                    {r.pill}
                  </span>
                </button>
              </Fragment>
            ))}
            {v.noRows ? (
              <>
                <div
                  style={{
                    padding: "18px 4px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#6B6880",
                    textAlign: "center",
                  }}
                >
                  {"No shops match. Try another name."}
                </div>
              </>
            ) : null}
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#8F89A8",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {v.moreLine}
          </div>
        </div>
        {v.sheetOpen ? (
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
                onClick={v.closeSheet}
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
                aria-label={v.sheet_name}
                style={{
                  position: "relative",
                  width: "100%",
                  maxHeight: "86vh",
                  maxWidth: "430px",
                  margin: "0 auto",
                  overflowY: "auto",
                  boxSizing: "border-box",
                  background: "#F3F0FA",
                  borderRadius: "20px 20px 0 0",
                  padding: "10px 16px 28px 16px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "5px",
                    borderRadius: "999px",
                    background: "#D9D3EA",
                    margin: "0 auto 12px auto",
                  }}
                ></div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {v.sheet_hasLogo ? (
                    <>
                      <Artwork
                        src={v.sheet_logo}
                        alt=""
                        style={{
                          width: "52px",
                          height: "52px",
                          flex: "none",
                          borderRadius: "16px",
                          objectFit: "cover",
                          display: "block",
                          background: v.sheet_bg,
                          boxShadow: "0 0 0 1px #ECE8F5",
                        }}
                      />
                    </>
                  ) : null}
                  {v.sheet_noLogo ? (
                    <>
                      <span
                        style={{
                          width: "52px",
                          height: "52px",
                          flex: "none",
                          borderRadius: "16px",
                          background: v.sheet_bg,
                          color: "#FFFFFF",
                          fontSize: "18px",
                          fontWeight: "800",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {v.sheet_mark}
                      </span>
                    </>
                  ) : null}
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                      flex: "1",
                      minWidth: "0",
                    }}
                  >
                    <span style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "-0.02em" }}>
                      {v.sheet_name}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
                      {v.sheet_cat}
                    </span>
                  </span>
                  <button
                    onClick={v.closeSheet}
                    aria-label="Close"
                    className="hb-press"
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "0",
                      borderRadius: "50%",
                      background: "#FFFFFF",
                      color: "#1E1B2E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 0 0 1px #ECE8F5",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                    >
                      <path d="M6 6l12 12M18 6L6 18"></path>
                    </svg>
                  </button>
                </div>
                <div
                  style={{
                    marginTop: "16px",
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "14px 16px",
                    boxShadow: "0 0 0 1px #ECE8F5",
                    order: v.earnOrder,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "800",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#6C3FFA",
                      }}
                    >
                      {"Earn here"}
                    </span>
                    <span style={{ fontSize: "15px", fontWeight: "800", color: "#6C3FFA" }}>
                      {v.sheet_earnPts}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      marginTop: "6px",
                      lineHeight: "1.35",
                    }}
                  >
                    {v.sheet_earnTitle}
                  </div>
                  <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
                    {(v.sheet_stamps || []).map((s: any, idx0: number) => (
                      <Fragment key={idx0}>
                        <span
                          style={{
                            width: "28px",
                            height: "28px",
                            boxSizing: "border-box",
                            borderRadius: "50%",
                            background: s.bg,
                            color: s.ink,
                            border: `2px solid ${s.ring}`,
                            fontSize: "10px",
                            fontWeight: "800",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {s.tag}
                        </span>
                      </Fragment>
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: "12.5px",
                      fontWeight: "600",
                      color: "#6B6880",
                      marginTop: "10px",
                    }}
                  >
                    {"Use any Unipal offer here. Points land on their own."}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#6C3FFA",
                    margin: "18px 4px 8px 4px",
                  }}
                >
                  {"Spend here"}
                </div>
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "0 16px",
                    boxShadow: "0 0 0 1px #ECE8F5",
                  }}
                >
                  {(v.sheet_rewards || []).map((w: any, idx0: number) => (
                    <Fragment key={idx0}>
                      <div style={{ borderTop: w.rule, padding: "12px 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span
                            style={{
                              width: "52px",
                              height: "52px",
                              flex: "none",
                              borderRadius: "14px",
                              background: w.phBg,
                              color: w.phInk,
                              fontSize: "10px",
                              fontWeight: "800",
                              letterSpacing: "0.06em",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {w.ph}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "3px",
                              flex: "1",
                              minWidth: "0",
                            }}
                          >
                            <span style={{ fontSize: "15.5px", fontWeight: "800" }}>{w.name}</span>
                            <span
                              style={{ fontSize: "12.5px", fontWeight: "600", color: "#6B6880" }}
                            >
                              {w.sub}
                            </span>
                            <span
                              style={{
                                alignSelf: "flex-start",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                fontSize: "12.5px",
                                fontWeight: "800",
                                color: w.ptsInk,
                                background: w.ptsBg,
                                borderRadius: "999px",
                                padding: "2px 8px 2px 4px",
                              }}
                            >
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
                              {w.pts}
                            </span>
                          </span>
                          {w.showUse ? (
                            <>
                              <button
                                onClick={w.ask}
                                aria-label={w.useLabel}
                                className="hb-press"
                                style={{
                                  font: "inherit",
                                  fontSize: "14px",
                                  fontWeight: "800",
                                  flex: "none",
                                  borderRadius: "999px",
                                  border: "0",
                                  padding: "10px 16px",
                                  cursor: "pointer",
                                  background: w.btnBg,
                                  color: w.btnInk,
                                }}
                              >
                                {"Use"}
                              </button>
                            </>
                          ) : null}
                          {w.isUsed ? (
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
                        {w.asking ? (
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
                              }}
                            >
                              <span
                                style={{ fontSize: "15px", fontWeight: "700", lineHeight: "1.35" }}
                              >
                                {w.askLine}
                              </span>
                              <span style={{ display: "flex", gap: "8px" }}>
                                <button
                                  onClick={w.confirm}
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
                                  onClick={w.notNow}
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
                        {w.held ? (
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
                                <span>{"Use by 1 Dec"}</span>
                              </span>
                              <span
                                style={{
                                  background: "#FFFFFF",
                                  color: "#1E1B2E",
                                  borderRadius: "14px",
                                  padding: "14px",
                                  textAlign: "center",
                                  fontSize: "28px",
                                  fontWeight: "800",
                                  letterSpacing: "0.08em",
                                }}
                              >
                                {w.code}
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
                                  onClick={w.cancel}
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
                                  onClick={w.accept}
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
                        {w.isUsed ? (
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
                              <span>{w.savedLine}</span>
                              <button
                                onClick={w.again}
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
                                  opacity: w.againOp,
                                }}
                              >
                                {"Use again"}
                              </button>
                            </div>
                          </>
                        ) : null}
                        {w.demo ? (
                          <>
                            <div
                              className="hb-pop"
                              style={{
                                marginTop: "12px",
                                background: "#FFF6D6",
                                color: "#5C4600",
                                borderRadius: "14px",
                                padding: "12px 14px",
                                fontSize: "13.5px",
                                fontWeight: "700",
                                lineHeight: "1.4",
                              }}
                            >
                              {"Prototype: only The Coffee Bean gives a real code here."}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </Fragment>
                  ))}
                </div>
                <div
                  style={{
                    fontSize: "12.5px",
                    fontWeight: "500",
                    color: "#6B6880",
                    margin: "10px 4px 0 4px",
                    lineHeight: "1.45",
                  }}
                >
                  {
                    "One code per item, valid 30 days. Points are held until the shop accepts the code."
                  }
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
