// @ts-nocheck
// Ported 1:1 from the Design canvas board "Rewards.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/rewards";

export default function Rewards() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-rewards">
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          margin: "0 auto",
          minHeight: "100svh",
          boxSizing: "border-box",
          background: "#F3F0FA",
          fontFamily: "Figtree, system-ui, sans-serif",
          color: "#1E1B2E",
          position: "relative",
          overflow: "clip",
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
          {v.onMain ? (
            <>
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
                <span style={{ fontSize: "17px", fontWeight: "800" }}>{"Your points"}</span>
                <span style={{ width: "40px", height: "40px" }}></span>
              </div>
              <div
                className="hb-rise"
                style={{
                  marginTop: "16px",
                  position: "relative",
                  overflow: "hidden",
                  background: "linear-gradient(135deg, #6C3FFA 0%, #4F25D6 100%)",
                  color: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "18px 16px 18px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  boxShadow: "0 12px 24px rgba(79,37,214,0.22)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: "-40px",
                    top: "-60px",
                    width: "170px",
                    height: "170px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(192,244,2,0.35) 0%, rgba(192,244,2,0) 65%)",
                  }}
                ></span>
                <span
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    flex: "1",
                    minWidth: "0",
                  }}
                >
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#E4DBFF" }}>
                    {"You have"}
                  </span>
                  <span
                    style={{
                      fontSize: "34px",
                      fontWeight: "800",
                      letterSpacing: "-0.03em",
                      lineHeight: "1.1",
                    }}
                  >
                    {v.balance} <span style={{ fontSize: "18px" }}>{"points"}</span>
                  </span>
                  <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#E4DBFF" }}>
                    {v.heroLine}
                  </span>
                </span>
                <Artwork
                  priority
                  src="/haiba/coins/coin-stack-3d.webp"
                  alt=""
                  style={{
                    position: "relative",
                    width: "88px",
                    height: "88px",
                    objectFit: "contain",
                    display: "block",
                    flex: "none",
                    filter: "drop-shadow(0 8px 12px rgba(20,8,80,0.35))",
                  }}
                />
              </div>
              {v.hasCodes ? (
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
                      {"Your codes"}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
                      {v.codesCount}
                    </span>
                  </div>
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E9E5F4",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 6px 18px rgba(76,52,140,0.06)",
                    }}
                  >
                    {(v.myCodes || []).map((r: any, idx0: number) => (
                      <Fragment key={idx0}>
                        <button
                          onClick={r.open}
                          className="hb-row"
                          style={{
                            font: "inherit",
                            width: "100%",
                            boxSizing: "border-box",
                            textAlign: "left",
                            border: "0",
                            borderTop: r.rule,
                            background: "transparent",
                            color: "#1E1B2E",
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            padding: "14px 16px",
                            cursor: "pointer",
                          }}
                        >
                          <span
                            style={{
                              width: "44px",
                              height: "44px",
                              flex: "none",
                              borderRadius: "10px",
                              overflow: "hidden",
                              background: r.bg,
                              color: r.ink,
                              boxShadow: "0 0 0 1px #ECE8F5",
                              fontSize: "15px",
                              fontWeight: "800",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {r.hasLogo ? (
                              <>
                                <Artwork
                                  src={r.logo}
                                  alt=""
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    display: "block",
                                  }}
                                />
                              </>
                            ) : null}
                            {r.noLogo ? <>{r.mark}</> : null}
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
                            <span
                              style={{ fontSize: "15.5px", fontWeight: "800", lineHeight: "1.25" }}
                            >
                              {r.item}
                            </span>
                            <span
                              style={{ fontSize: "13.5px", fontWeight: "600", color: "#6B6880" }}
                            >
                              {r.sub}
                            </span>
                          </span>
                          <span
                            style={{
                              flex: "none",
                              whiteSpace: "nowrap",
                              fontSize: "13px",
                              fontWeight: "800",
                              borderRadius: "999px",
                              padding: "7px 12px",
                              background: "#6C3FFA",
                              color: "#FFFFFF",
                            }}
                          >
                            {"Show code"}
                          </span>
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              <div data-hb-pin-mark="" style={{ height: "0" }}></div>
              <div
                className="hb-pinbar"
                style={{
                  position: "sticky",
                  top: "0",
                  zIndex: "20",
                  margin: "6px -16px 0 -16px",
                  padding: "8px 16px",
                  background: v.pinBg,
                  boxShadow: v.pinShadow,
                  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ position: "relative", flex: "1", minWidth: "0" }}>
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
                    aria-label="Search 200+ shops"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      font: "inherit",
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#1E1B2E",
                      background: "#FFFFFF",
                      border: "0",
                      borderRadius: "10px",
                      padding: "12px 14px 12px 40px",
                      boxShadow: "0 0 0 1px #ECE8F5",
                      outline: "none",
                    }}
                  />
                </div>
                <span
                  aria-hidden={v.pinHidden}
                  style={{
                    flex: "none",
                    boxSizing: "border-box",
                    height: "44px",
                    maxWidth: v.pinChipW,
                    marginLeft: v.pinMl,
                    opacity: v.pinChipOp,
                    overflow: "hidden",
                    borderRadius: "10px",
                    background: "#FFFFFF",
                    boxShadow: "0 0 0 1px #ECE8F5",
                    transition:
                      "max-width 0.42s cubic-bezier(0.22, 1, 0.36, 1), margin-left 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
                  }}
                >
                  <span
                    style={{
                      height: "44px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "0 12px 0 9px",
                      whiteSpace: "nowrap",
                      color: "#1E1B2E",
                      fontSize: "15px",
                      fontWeight: "800",
                      letterSpacing: "-0.01em",
                      transform: `translateX(${v.pinChipX})`,
                      transition: "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <Artwork
                      src="/haiba/coins/coin-front.webp"
                      alt=""
                      style={{ width: "24px", height: "24px", flex: "none", display: "block" }}
                    />
                    {v.balance}
                    <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#6B6880" }}>
                      {"pts"}
                    </span>
                  </span>
                </span>
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
                          margin: "28px 4px 12px 4px",
                        }}
                      >
                        <span
                          style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}
                        >
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
                                        borderRadius: "12px",
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
                                        borderRadius: "12px",
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
                      margin: "32px 4px 12px 4px",
                    }}
                  >
                    <span style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>
                      {"Looks for your parrot"}
                    </span>
                    <Link
                      onClick={v.looksAll}
                      style={{
                        fontSize: "13px",
                        fontWeight: "800",
                        color: "#6C3FFA",
                        textDecoration: "none",
                      }}
                      to="/haiba/looks"
                    >
                      {"See all"}
                    </Link>
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
                    {(v.looks || []).map((k: any, idx0: number) => (
                      <Fragment key={idx0}>
                        <Link
                          onClick={k.pick}
                          aria-label={k.aria}
                          className="hb-press"
                          style={{
                            flex: "none",
                            width: "108px",
                            textDecoration: "none",
                            color: "#1E1B2E",
                            textAlign: "center",
                            background: "#FFFFFF",
                            borderRadius: "16px",
                            overflow: "hidden",
                            boxShadow: "0 0 0 1px #ECE8F5",
                          }}
                          to="/haiba/looks"
                        >
                          <span
                            style={{
                              position: "relative",
                              display: "block",
                              height: "112px",
                              background: "#F5F3FA",
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
                                height: `${k.h}px`,
                                width: "auto",
                                maxWidth: "none",
                                transform: `translateX(-${k.x}%)`,
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
                        </Link>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              {v.showBrowse ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      margin: "32px 4px 12px 4px",
                    }}
                  >
                    <span style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>
                      {"Rewards"}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
                      {v.gridNote}
                    </span>
                  </div>
                  <div
                    role="tablist"
                    aria-label="Categories"
                    style={{
                      display: "flex",
                      gap: "8px",
                      margin: "0 -16px",
                      padding: "0 16px 4px 16px",
                      overflowX: "auto",
                      scrollbarWidth: "none",
                    }}
                  >
                    {(v.gcats || []).map((c: any, idx0: number) => (
                      <Fragment key={idx0}>
                        <button
                          role="tab"
                          onClick={c.pick}
                          aria-selected={c.on}
                          className="hb-press"
                          style={{
                            font: "inherit",
                            flex: "none",
                            border: "0",
                            cursor: "pointer",
                            background: c.bg,
                            color: c.ink,
                            borderRadius: "999px",
                            padding: "6px 14px 6px 6px",
                            boxShadow: c.ring,
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                              background: c.dot,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flex: "none",
                            }}
                          >
                            <Artwork
                              src={c.img}
                              alt=""
                              style={{
                                width: "22px",
                                height: "22px",
                                objectFit: "contain",
                                display: "block",
                              }}
                            />
                          </span>
                          <span style={{ fontSize: "14px", fontWeight: "800" }}>{c.label}</span>
                        </button>
                      </Fragment>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: "10px",
                      marginTop: "14px",
                    }}
                  >
                    {(v.grid || []).map((g: any, idx0: number) => (
                      <Fragment key={idx0}>
                        <button
                          onClick={g.open}
                          className="hb-press"
                          style={{
                            font: "inherit",
                            border: "0",
                            padding: "0",
                            cursor: "pointer",
                            textAlign: "left",
                            background: "#FFFFFF",
                            color: "#1E1B2E",
                            borderRadius: "14px",
                            overflow: "hidden",
                            boxShadow: "0 0 0 1px #ECE8F5",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <span
                            style={{
                              position: "relative",
                              height: "104px",
                              background: g.tint,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Artwork
                              src={g.img}
                              alt=""
                              style={{
                                height: "72px",
                                width: "72px",
                                objectFit: "contain",
                                display: "block",
                                opacity: g.op,
                              }}
                            />
                            <span
                              style={{
                                position: "absolute",
                                top: "8px",
                                left: "8px",
                                width: "26px",
                                height: "26px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                background: g.bg,
                                color: "#FFFFFF",
                                fontSize: "10px",
                                fontWeight: "800",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 0 2px #FFFFFF",
                              }}
                            >
                              {g.hasLogo ? (
                                <>
                                  <Artwork
                                    src={g.logo}
                                    alt=""
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      display: "block",
                                    }}
                                  />
                                </>
                              ) : null}
                              {g.noLogo ? <>{g.mark}</> : null}
                            </span>
                          </span>
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              padding: "10px 12px 12px 12px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12.5px",
                                fontWeight: "700",
                                color: "#6B6880",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {g.shop}
                            </span>
                            <span
                              style={{
                                fontSize: "15px",
                                fontWeight: "800",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {g.name}
                            </span>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                marginTop: "2px",
                              }}
                            >
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  fontSize: "12.5px",
                                  fontWeight: "800",
                                  color: g.ptsInk,
                                  background: g.ptsBg,
                                  borderRadius: "999px",
                                  padding: "2px 8px 2px 3px",
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
                                    opacity: g.op,
                                  }}
                                />
                                {g.pts}
                              </span>
                              <span
                                style={{ fontSize: "11.5px", fontWeight: "700", color: "#8F89A8" }}
                              >
                                {g.need}
                              </span>
                            </span>
                          </span>
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              {v.showResults ? (
                <>
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
                    <button
                      onClick={v.sortTap}
                      className="hb-press"
                      style={{
                        font: "inherit",
                        border: "0",
                        background: "transparent",
                        padding: "0",
                        cursor: v.sortCursor,
                        fontSize: "13px",
                        fontWeight: "700",
                        color: v.sortInk,
                      }}
                    >
                      {v.listNote}
                    </button>
                  </div>
                  <div
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "12px",
                      padding: "2px 14px",
                      boxShadow: "0 0 0 1px #ECE8F5",
                    }}
                  >
                    {(v.rows || []).map((r: any, idx0: number) => (
                      <Fragment key={idx0}>
                        {r.isHead ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: r.pad,
                                borderTop: r.top,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "11.5px",
                                  fontWeight: "800",
                                  letterSpacing: "0.08em",
                                  textTransform: "uppercase",
                                  color: "#8F89A8",
                                }}
                              >
                                {r.head}
                              </span>
                              <button
                                onClick={r.seeAll}
                                className="hb-press"
                                style={{
                                  font: "inherit",
                                  border: "0",
                                  background: "transparent",
                                  padding: "0",
                                  cursor: "pointer",
                                  fontSize: "13px",
                                  fontWeight: "800",
                                  color: "#6C3FFA",
                                }}
                              >
                                {r.seeLabel}
                              </button>
                            </div>
                          </>
                        ) : null}
                        {r.isShop ? (
                          <>
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
                                padding: "10px 0",
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
                                      borderRadius: "10px",
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
                                      borderRadius: "10px",
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
                                <span style={{ fontSize: "15.5px", fontWeight: "800" }}>
                                  {r.name}
                                </span>
                                <span
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    color: "#6B6880",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
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
                                }}
                              >
                                {r.pill}
                              </span>
                            </button>
                          </>
                        ) : null}
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
                </>
              ) : null}
            </>
          ) : null}
          {v.inCat ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <button
                  onClick={v.backToMain}
                  aria-label="Back"
                  className="hb-press"
                  style={{
                    width: "40px",
                    height: "40px",
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
                </button>
                <span style={{ fontSize: "17px", fontWeight: "800" }}>{v.cat}</span>
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
                  value={v.cq}
                  onInput={v.onCatSearch}
                  onChange={v.onCatSearch}
                  placeholder={v.catSearchLabel}
                  aria-label={v.catSearchLabel}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    font: "inherit",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#1E1B2E",
                    background: "#FFFFFF",
                    border: "0",
                    borderRadius: "10px",
                    padding: "12px 14px 12px 40px",
                    boxShadow: "0 0 0 1px #ECE8F5",
                    outline: "none",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  margin: "12px -16px 0 -16px",
                  padding: "0 16px",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {(v.tags || []).map((t: any, idx0: number) => (
                  <Fragment key={idx0}>
                    <button
                      onClick={t.pick}
                      aria-pressed={t.on}
                      className="hb-press"
                      style={{
                        font: "inherit",
                        flex: "none",
                        border: "0",
                        cursor: "pointer",
                        fontSize: "13.5px",
                        fontWeight: "800",
                        borderRadius: "999px",
                        padding: "7px 13px",
                        background: t.bg,
                        color: t.ink,
                        boxShadow: t.ring,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.label}
                    </button>
                  </Fragment>
                ))}
              </div>
              <div
                role="tablist"
                aria-label="Sort"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: "4px",
                  marginTop: "12px",
                  background: "#E9E4F6",
                  borderRadius: "10px",
                  padding: "4px",
                }}
              >
                {(v.sorts || []).map((o: any, idx0: number) => (
                  <Fragment key={idx0}>
                    <button
                      role="tab"
                      onClick={o.pick}
                      aria-selected={o.on}
                      className="hb-press"
                      style={{
                        font: "inherit",
                        border: "0",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "800",
                        borderRadius: "9px",
                        padding: "8px 4px",
                        background: o.bg,
                        color: o.ink,
                        boxShadow: o.shadow,
                      }}
                    >
                      {o.label}
                    </button>
                  </Fragment>
                ))}
              </div>
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
                <button
                  onClick={v.sortTap}
                  className="hb-press"
                  style={{
                    font: "inherit",
                    border: "0",
                    background: "transparent",
                    padding: "0",
                    cursor: v.sortCursor,
                    fontSize: "13px",
                    fontWeight: "700",
                    color: v.sortInk,
                  }}
                >
                  {v.listNote}
                </button>
              </div>
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "2px 14px",
                  boxShadow: "0 0 0 1px #ECE8F5",
                }}
              >
                {(v.rows || []).map((r: any, idx0: number) => (
                  <Fragment key={idx0}>
                    {r.isHead ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: r.pad,
                            borderTop: r.top,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "11.5px",
                              fontWeight: "800",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: "#8F89A8",
                            }}
                          >
                            {r.head}
                          </span>
                          <button
                            onClick={r.seeAll}
                            className="hb-press"
                            style={{
                              font: "inherit",
                              border: "0",
                              background: "transparent",
                              padding: "0",
                              cursor: "pointer",
                              fontSize: "13px",
                              fontWeight: "800",
                              color: "#6C3FFA",
                            }}
                          >
                            {r.seeLabel}
                          </button>
                        </div>
                      </>
                    ) : null}
                    {r.isShop ? (
                      <>
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
                            padding: "10px 0",
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
                                  borderRadius: "10px",
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
                                  borderRadius: "10px",
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
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#6B6880",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
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
                            }}
                          >
                            {r.pill}
                          </span>
                        </button>
                      </>
                    ) : null}
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
            </>
          ) : null}
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
                  borderRadius: "14px 14px 0 0",
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
                          borderRadius: "12px",
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
                          borderRadius: "12px",
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
                    marginTop: "20px",
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    padding: "0 16px",
                    boxShadow: "0 0 0 1px #ECE8F5",
                  }}
                >
                  {(v.sheet_rewards || []).map((w: any, idx0: number) => (
                    <Fragment key={idx0}>
                      <div style={{ borderTop: w.rule, padding: "14px 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <span
                            style={{
                              width: "56px",
                              height: "56px",
                              flex: "none",
                              borderRadius: "12px",
                              background: w.phBg,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Artwork
                              src={w.img}
                              alt=""
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "contain",
                                display: "block",
                              }}
                            />
                          </span>
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                              flex: "1",
                              minWidth: "0",
                            }}
                          >
                            <span style={{ fontSize: "16px", fontWeight: "800" }}>{w.name}</span>
                            <span
                              style={{
                                alignSelf: "flex-start",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                fontSize: "13px",
                                fontWeight: "800",
                                color: w.ptsInk,
                                background: w.ptsBg,
                                borderRadius: "999px",
                                padding: "2px 9px 2px 4px",
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
                                  fontSize: "14.5px",
                                  fontWeight: "800",
                                  flex: "none",
                                  borderRadius: "999px",
                                  border: "0",
                                  padding: "10px 18px",
                                  cursor: "pointer",
                                  background: w.btnBg,
                                  color: w.btnInk,
                                }}
                              >
                                {"Use"}
                              </button>
                            </>
                          ) : null}
                        </div>
                        {w.short ? (
                          <>
                            <div
                              style={{
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#8F89A8",
                                margin: "8px 0 0 70px",
                              }}
                            >
                              {w.sub}
                            </div>
                          </>
                        ) : null}
                        {w.asking ? (
                          <>
                            <div
                              className="hb-pop"
                              style={{
                                marginTop: "14px",
                                background: "#F4F1FD",
                                borderRadius: "12px",
                                padding: "16px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "14px",
                              }}
                            >
                              <span
                                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
                              >
                                <span
                                  style={{ fontSize: "16px", fontWeight: "800", lineHeight: "1.3" }}
                                >
                                  {w.askLine}
                                </span>
                                <span
                                  style={{
                                    fontSize: "13.5px",
                                    fontWeight: "600",
                                    color: "#6B6880",
                                  }}
                                >
                                  {"The code lasts 12 hours."}
                                </span>
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
                                    padding: "13px",
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
                                    padding: "13px 18px",
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
                      </div>
                    </Fragment>
                  ))}
                </div>
                <Link
                  className="hb-press"
                  style={{
                    marginTop: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    textDecoration: "none",
                    color: "#1E1B2E",
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    padding: "14px 16px",
                    boxShadow: "0 0 0 1px #ECE8F5",
                  }}
                  to="/shop/coffee-bean"
                >
                  <span
                    style={{
                      flex: "none",
                      fontSize: "13px",
                      fontWeight: "800",
                      color: "#4F25D6",
                      background: "#F0ECFF",
                      borderRadius: "999px",
                      padding: "4px 10px",
                    }}
                  >
                    {v.sheet_earnPts}
                  </span>
                  <span style={{ flex: "1", fontSize: "14.5px", fontWeight: "700" }}>
                    {v.sheet_useLabel}
                  </span>
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6C3FFA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 6l6 6-6 6"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
