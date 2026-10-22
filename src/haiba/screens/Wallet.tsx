// @ts-nocheck
// Ported 1:1 from the Design canvas board "Wallet.dc.html". Styles are copied value for value.
import Artwork from "../Artwork";
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import { useVals } from "../logic/wallet";

export default function Wallet() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-wallet">
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
            height: "470px",
            background: "linear-gradient(180deg, #D6C6FF 0%, #E9E1FF 55%, #F3F0FA 100%)",
          }}
        ></div>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "14px 16px 60px 16px",
          }}
        >
          <div
            className="hb-rise"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <Link
              aria-label="Back"
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
                textDecoration: "none",
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
            <span
              style={{
                height: "44px",
                boxSizing: "border-box",
                borderRadius: "999px",
                background: "#1E1B2E",
                color: "#FFFFFF",
                padding: "0 16px 0 8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                fontSize: "17px",
                fontWeight: "800",
                boxShadow: "0 8px 20px rgba(30,27,46,0.2)",
              }}
            >
              <span
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "#6C3FFA",
                  boxShadow: "inset 0 0 0 5px #C0F402",
                }}
              ></span>
              {v.points}
            </span>
          </div>
          <div
            className="hb-pops"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "10px",
              marginTop: "18px",
            }}
          >
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "26px",
                padding: "20px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                textAlign: "center",
                boxShadow: "0 12px 28px rgba(76,52,140,0.10)",
              }}
            >
              <span
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  background: "#6C3FFA",
                  boxShadow: "inset 0 0 0 7px #C0F402, 0 6px 12px rgba(108,63,250,0.25)",
                }}
              ></span>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                  fontSize: "34px",
                  fontWeight: "800",
                  letterSpacing: "-0.03em",
                  lineHeight: "1",
                }}
              >
                {v.used}
              </span>
              <span
                style={{
                  fontSize: "12.5px",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6B6880",
                }}
              >
                {"Points used"}
              </span>
            </div>
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "26px",
                padding: "20px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                textAlign: "center",
                boxShadow: "0 12px 28px rgba(76,52,140,0.10)",
              }}
            >
              <span
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "14px",
                  background: "#F4FFD1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24">
                  <rect x="3" y="9" width="18" height="12" rx="2.5" fill="#6C3FFA"></rect>
                  <rect x="2" y="7" width="20" height="4" rx="1.5" fill="#8B66FF"></rect>
                  <rect x="10.8" y="7" width="2.4" height="14" fill="#C0F402"></rect>
                </svg>
              </span>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                  fontSize: "34px",
                  fontWeight: "800",
                  letterSpacing: "-0.03em",
                  lineHeight: "1",
                }}
              >
                {v.claimed}
              </span>
              <span
                style={{
                  fontSize: "12.5px",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6B6880",
                }}
              >
                {"Rewards claimed"}
              </span>
            </div>
          </div>
          <button
            onClick={v.nextWorth}
            className="hb-rise hb-d2 hb-press"
            style={{
              marginTop: "10px",
              font: "inherit",
              textAlign: "left",
              border: "0",
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "14px 16px",
              boxShadow: "0 8px 20px rgba(76,52,140,0.08)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              color: "#1E1B2E",
            }}
          >
            <span
              style={{
                width: "28px",
                height: "28px",
                flex: "none",
                borderRadius: "50%",
                background: "#6C3FFA",
                boxShadow: "inset 0 0 0 4px #C0F402",
              }}
            ></span>
            <span style={{ fontSize: "15.5px", fontWeight: "500", lineHeight: "1.4", flex: "1" }}>
              {v.worthLine}
            </span>
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6C3FFA"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flex: "none" }}
            >
              <path d="M21 12a9 9 0 1 1-2.6-6.4"></path>
              <path d="M21 3v6h-6"></path>
            </svg>
          </button>
          <div
            className="hb-pops"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "6px",
              marginTop: "22px",
            }}
          >
            {(v.actions || []).map((a: any, idx0: number) => (
              <Fragment key={idx0}>
                <a
                  className="hb-lift"
                  style={{
                    textDecoration: "none",
                    color: "#1E1B2E",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (a.href) go(a.href);
                  }}
                >
                  <span
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "#FFFFFF",
                      color: "#6C3FFA",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                      fontSize: "22px",
                      fontWeight: "800",
                      boxShadow: "0 8px 18px rgba(76,52,140,0.12)",
                    }}
                  >
                    {a.mark}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>{a.label}</span>
                </a>
              </Fragment>
            ))}
          </div>
          <div
            className="hb-rise hb-d3"
            style={{
              marginTop: "22px",
              background: "#F4FFD1",
              borderRadius: "22px",
              padding: "18px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                flex: "1",
                minWidth: "0",
              }}
            >
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                  fontSize: "19px",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                }}
              >
                {v.bannerTitle}
              </span>
              <a
                className="hb-press"
                style={{
                  alignSelf: "flex-start",
                  textDecoration: "none",
                  background: "#1E1B2E",
                  color: "#C0F402",
                  fontSize: "15px",
                  fontWeight: "700",
                  borderRadius: "999px",
                  padding: "10px 16px",
                }}
                href="#"
                onClick={(e: any) => {
                  e.preventDefault();
                  go("/shop/coffee-bean/redeem");
                }}
              >
                {v.bannerCta}
              </a>
            </span>
            <span
              style={{
                position: "relative",
                flex: "none",
                width: "124px",
                height: "100px",
                margin: "-14px -12px -14px 0",
              }}
            >
              <Artwork priority
                src="/haiba/birds/11-run.png"
                alt=""
                style={{
                  position: "absolute",
                  right: "0",
                  bottom: "-10px",
                  height: "130px",
                  width: "auto",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "-6px",
                  top: "0",
                  background: "#6C3FFA",
                  color: "#C0F402",
                  fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                  fontSize: "20px",
                  fontWeight: "800",
                  borderRadius: "999px",
                  padding: "4px 11px",
                  boxShadow: "0 6px 14px rgba(108,63,250,0.35)",
                }}
              >
                {v.bannerBadge}
              </span>
            </span>
            <button
              aria-label="Close"
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "28px",
                height: "28px",
                border: "0",
                background: "transparent",
                color: "#3D5000",
                padding: "0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18"></path>
              </svg>
            </button>
          </div>
          <div
            className="hb-rise hb-d4"
            style={{
              marginTop: "92px",
              background: "#1E1B2E",
              color: "#FFFFFF",
              borderRadius: "28px",
              padding: "22px 20px 20px 20px",
              position: "relative",
            }}
          >
            <span
              className="hb-peek"
              style={{ position: "absolute", right: "20px", top: "-84px", display: "block" }}
            >
              <Artwork
                src="/haiba/birds/12-ledge.png"
                alt=""
                style={{ height: "88px", width: "auto", display: "block" }}
              />
            </span>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C0F402",
              }}
            >
              {"A year of Haiba"}
            </div>
            <div
              style={{ fontSize: "15px", fontWeight: "600", color: "#CFC9E0", marginTop: "14px" }}
            >
              {"How often do you use Unipal?"}
            </div>
            <div
              role="radiogroup"
              aria-label="Visits a month"
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                background: "#2B2740",
                borderRadius: "999px",
                padding: "4px",
                marginTop: "10px",
              }}
            >
              <span
                aria-hidden="true"
                className="hb-ease"
                style={{
                  position: "absolute",
                  top: "4px",
                  bottom: "4px",
                  left: v.segLeft,
                  width: "calc((100% - 8px) / 4)",
                  borderRadius: "999px",
                  background: "#C0F402",
                }}
              ></span>
              {(v.stops || []).map((s: any, idx0: number) => (
                <Fragment key={idx0}>
                  <button
                    role="radio"
                    aria-checked={s.on}
                    aria-label={s.label}
                    onClick={s.pick}
                    className="hb-ease"
                    style={{
                      position: "relative",
                      font: "inherit",
                      border: "0",
                      background: "transparent",
                      cursor: "pointer",
                      padding: "10px 0",
                      borderRadius: "999px",
                      color: s.ink,
                      fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                      fontSize: "16px",
                      fontWeight: "800",
                    }}
                  >
                    {s.v}
                    <span
                      style={{
                        fontFamily: "Figtree, system-ui, sans-serif",
                        fontSize: "12px",
                        fontWeight: "600",
                        opacity: "0.7",
                      }}
                    >
                      {" /mo"}
                    </span>
                  </button>
                </Fragment>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                flexWrap: "wrap",
                marginTop: "24px",
              }}
            >
              <span
                className="hb-ease"
                style={{
                  fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                  fontSize: "46px",
                  fontWeight: "800",
                  letterSpacing: "-0.04em",
                  lineHeight: "1",
                  color: "#C0F402",
                }}
              >
                {v.saveTotal}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "600", color: "#E8E4F4" }}>
                {"saved a year"}
              </span>
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "500",
                color: "#CFC9E0",
                lineHeight: "1.45",
                marginTop: "8px",
              }}
            >
              {v.saveSub}
            </div>
            <div
              style={{
                position: "relative",
                height: "10px",
                marginTop: "18px",
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
                  width: v.costPct,
                  background: "#6C3FFA",
                }}
              ></span>
              <span
                className="hb-ease"
                style={{
                  position: "absolute",
                  top: "0",
                  bottom: "0",
                  right: "0",
                  left: v.costPct,
                  background: "#C0F402",
                }}
              ></span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              <span style={{ color: "#B9B3CC" }}>{"Haiba costs BHD 19.80"}</span>
              <span className="hb-ease" style={{ color: "#C0F402" }}>
                {v.extraLine}
              </span>
            </div>
            <div style={{ marginTop: "18px", borderTop: "1px solid #3A3550" }}>
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
                    background: "#C0F402",
                    color: "#1F2600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
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
                    <path d="M20 12v9H4v-9M2 7h20v5H2zM12 7v14M12 7c-2-4-7-4-7-1s5 1 7 1zm0 0c2-4 7-4 7-1s-5 1-7 1z"></path>
                  </svg>
                </span>
                <span
                  style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}
                >
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>{"12 Unipass gifts"}</span>
                  <span style={{ fontSize: "13.5px", fontWeight: "500", color: "#B9B3CC" }}>
                    {"1 free item every month"}
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                    fontSize: "17px",
                    fontWeight: "800",
                    textAlign: "right",
                  }}
                >
                  {"BHD 30.00"}
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "44px minmax(0, 1fr) auto",
                  gap: "12px",
                  alignItems: "center",
                  padding: "14px 0",
                }}
              >
                <span
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    background: "#6C3FFA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "#6C3FFA",
                      boxShadow: "inset 0 0 0 4px #C0F402",
                    }}
                  ></span>
                </span>
                <span
                  style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}
                >
                  <span className="hb-ease" style={{ fontSize: "16px", fontWeight: "700" }}>
                    {v.ptsLine}
                  </span>
                  <span
                    className="hb-ease"
                    style={{ fontSize: "13.5px", fontWeight: "500", color: "#B9B3CC" }}
                  >
                    {v.ptsItems}
                  </span>
                </span>
                <span
                  className="hb-ease"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                    fontSize: "17px",
                    fontWeight: "800",
                    textAlign: "right",
                  }}
                >
                  {v.ptsSave}
                </span>
                <span></span>
                <span
                  className="hb-ease"
                  style={{
                    gridColumn: "2 / 4",
                    justifySelf: "start",
                    fontSize: "12.5px",
                    fontWeight: "700",
                    color: "#1F2600",
                    background: "#C0F402",
                    borderRadius: "999px",
                    padding: "4px 10px",
                  }}
                >
                  {v.bonusLine}
                </span>
              </div>
            </div>
            <div
              style={{
                fontSize: "12.5px",
                fontWeight: "500",
                color: "#8F89A8",
                lineHeight: "1.45",
                marginTop: "6px",
              }}
            >
              {
                "Based on 1 new shop a month and the rest at your favourites. Unipass gifts are worth about BHD 2.50 each."
              }
            </div>
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6B6880",
              marginTop: "30px",
              padding: "0 4px",
            }}
          >
            {"Points history"}
          </div>
          {v.isActive ? (
            <>
              <div
                className="hb-stagger"
                style={{
                  marginTop: "12px",
                  background: "#FFFFFF",
                  borderRadius: "26px",
                  padding: "4px 18px",
                  boxShadow: "0 10px 26px rgba(76,52,140,0.08)",
                }}
              >
                {(v.history || []).map((t: any, idx0: number) => (
                  <Fragment key={idx0}>
                    <a
                      className="hb-row"
                      style={{
                        textDecoration: "none",
                        color: "#1E1B2E",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "13px 0",
                        borderBottom: t.rule,
                      }}
                      href="#"
                      onClick={(e: any) => e.preventDefault()}
                    >
                      <span
                        style={{
                          width: "46px",
                          height: "46px",
                          flex: "none",
                          borderRadius: "15px",
                          background: t.bg,
                          color: t.ink,
                          fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                          fontSize: "15px",
                          fontWeight: "800",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {t.mark}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                          flex: "1",
                          minWidth: "0",
                        }}
                      >
                        <span style={{ fontSize: "16px", fontWeight: "700" }}>{t.name}</span>
                        <span style={{ fontSize: "13.5px", fontWeight: "500", color: "#6B6880" }}>
                          {t.sub}
                        </span>
                      </span>
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                          fontSize: "17px",
                          fontWeight: "800",
                          color: t.amtInk,
                        }}
                      >
                        {t.amt}
                      </span>
                    </a>
                  </Fragment>
                ))}
              </div>
              <a
                className="hb-press"
                style={{
                  display: "block",
                  marginTop: "14px",
                  textAlign: "center",
                  textDecoration: "none",
                  background: "#FFFFFF",
                  color: "#1E1B2E",
                  borderRadius: "999px",
                  padding: "15px",
                  fontSize: "16px",
                  fontWeight: "700",
                  boxShadow: "0 8px 20px rgba(76,52,140,0.08)",
                }}
                href="#"
                onClick={(e: any) => e.preventDefault()}
              >
                {"See all history"}
              </a>
            </>
          ) : null}
          {v.isNew ? (
            <>
              <div
                className="hb-rise"
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  lineHeight: "1.4",
                  marginTop: "10px",
                }}
              >
                {"You have not used a reward yet. Here are a few you can get with your 500 points."}
              </div>
              <div
                className="hb-pops"
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "14px",
                  overflow: "hidden",
                  marginRight: "-16px",
                }}
              >
                {(v.picks || []).map((p: any, idx0: number) => (
                  <Fragment key={idx0}>
                    <a
                      className="hb-lift"
                      style={{
                        textDecoration: "none",
                        flex: "none",
                        width: "168px",
                        height: "200px",
                        boxSizing: "border-box",
                        borderRadius: "22px",
                        background: p.bg,
                        color: "#FFFFFF",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxShadow: "0 10px 22px rgba(30,27,46,0.16)",
                      }}
                      href="#"
                      onClick={(e: any) => {
                        e.preventDefault();
                        go("/shop/coffee-bean");
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', Figtree, sans-serif",
                          fontSize: "28px",
                          fontWeight: "800",
                          letterSpacing: "-0.02em",
                          lineHeight: "1",
                        }}
                      >
                        {p.brand}
                      </span>
                      <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontSize: "16px", fontWeight: "700" }}>{p.item}</span>
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
                              width: "14px",
                              height: "14px",
                              borderRadius: "50%",
                              background: "#6C3FFA",
                              boxShadow: "inset 0 0 0 3px #C0F402",
                            }}
                          ></span>
                          {p.pts}
                        </span>
                      </span>
                    </a>
                  </Fragment>
                ))}
              </div>
              <a
                className="hb-press"
                style={{
                  display: "block",
                  marginTop: "16px",
                  textAlign: "center",
                  textDecoration: "none",
                  background: "#FFFFFF",
                  color: "#1E1B2E",
                  borderRadius: "999px",
                  padding: "15px",
                  fontSize: "16px",
                  fontWeight: "700",
                  boxShadow: "0 8px 20px rgba(76,52,140,0.08)",
                }}
                href="#"
                onClick={(e: any) => {
                  e.preventDefault();
                  go("/shop/coffee-bean");
                }}
              >
                {"See all rewards"}
              </a>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
