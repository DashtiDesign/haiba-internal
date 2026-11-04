// @ts-nocheck
// Ported 1:1 from the Design canvas board "PaywallStory.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/paywallstory";

export default function PaywallStory() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-paywallstory">
      <div style={{ width: "100%", maxWidth: "390px", margin: "0 auto", minHeight: v.s4 ? "max(100svh, 880px)" : "max(100svh, 840px)", boxSizing: "border-box", background: "#F3F0FA", fontFamily: "Figtree, system-ui, sans-serif", color: "#242036", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", left: "-305px", top: "-40px", width: "1000px", height: "1000px", pointerEvents: "none", WebkitMaskImage: "radial-gradient(circle, #000 5%, transparent 62%)", maskImage: "radial-gradient(circle, #000 5%, transparent 62%)" }}>
          <div className="hb-spin" style={{ width: "100%", height: "100%", opacity: "0.7", background: "repeating-conic-gradient(from 0deg, #FFFFFF 0deg 7deg, transparent 7deg 20deg)" }}></div>
        </div>
        <div style={{ position: "absolute", left: "8px", right: "8px", top: "10px", display: "flex", alignItems: "center", gap: "8px", zIndex: "6" }}>
          <button aria-label="Back" onClick={v.prev} className="hb-press" style={{ width: "44px", height: "44px", border: "0", background: "transparent", color: v.barInk, display: "flex", alignItems: "center", justifyContent: "center", padding: "0", cursor: "pointer", visibility: v.backVis }}>
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7"></path>
            </svg>
          </button>
          <div style={{ flex: "1", display: "flex", gap: "5px", padding: "0 6px" }}>
            {(v.dashes || []).map((d: any, idx0: number) => (
              <Fragment key={idx0}>
                <button aria-label={d.label} onClick={d.go} className="hb-ease" style={{ flex: "1", height: "5px", borderRadius: "999px", border: "0", padding: "0", cursor: "pointer", background: d.bg }}></button>
              </Fragment>
            ))}
          </div>
          <button aria-label="Close" onClick={v.openExit} className="hb-press" style={{ width: "44px", height: "44px", border: "0", background: "transparent", color: v.barInk, display: "flex", alignItems: "center", justifyContent: "center", padding: "0", cursor: "pointer" }}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18"></path>
            </svg>
          </button>
        </div>
        {v.s0 ? (
          <>
          <div aria-hidden="true" style={{ position: "absolute", inset: "0", zIndex: "1", background: "radial-gradient(120% 70% at 50% 52%, #7E55FF 0%, #5A2FE6 45%, #2E1494 100%)" }}></div>
          <div aria-hidden="true" style={{ position: "absolute", left: "-305px", top: "0", width: "1000px", height: "1000px", zIndex: "1", pointerEvents: "none", WebkitMaskImage: "radial-gradient(circle, #000 5%, transparent 55%)", maskImage: "radial-gradient(circle, #000 5%, transparent 55%)" }}>
            <div className="hb-spin" style={{ width: "100%", height: "100%", opacity: "0.12", background: "repeating-conic-gradient(from 0deg, #FFFFFF 0deg 7deg, transparent 7deg 20deg)" }}></div>
          </div>
          <div style={{ position: "absolute", left: "22px", right: "22px", top: "72px", textAlign: "center", zIndex: "3", color: "#FFFFFF" }}>
            <div className="hb-rise" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontSize: "24px", fontWeight: "800" }}>
              {"Meet "}
              <Artwork priority src="/haiba/logo-lime.svg" alt="Haiba" style={{ height: "34px", width: "auto", display: "block" }} />
            </div>
            <div className="hb-rise hb-d1" style={{ marginTop: "14px", fontSize: "46px", fontWeight: "900", letterSpacing: "-0.045em", lineHeight: "1" }}>
              <span style={{ color: "#C0F402" }}>
                {"Free stuff,"}
              </span>
              <br />
              {"every month"}
            </div>
            <div className="hb-rise hb-d2" style={{ marginTop: "14px", fontSize: "16.5px", fontWeight: "600", color: "#E4DBFF", lineHeight: "1.4" }}>
              {"Unipal's student membership."}
              <br />
              {"Pay once a year. Get gifts, apps and points."}
            </div>
          </div>
          <span aria-hidden="true" className="hb-pop hb-d1" style={{ position: "absolute", left: "50%", top: "372px", width: "236px", height: "236px", marginLeft: "-118px", borderRadius: "50%", zIndex: "2", background: "radial-gradient(circle at 35% 30%, #DFFF6A 0%, #C0F402 55%, #9CC800 100%)", boxShadow: "0 0 0 14px rgba(192,244,2,0.18), 0 0 0 30px rgba(192,244,2,0.08)" }}></span>
          <Artwork className="hb-pop hb-d2" src="/haiba/birds/17-coin-toss.webp" alt="The Haiba bird tossing a coin" style={{ position: "absolute", left: "50%", top: "300px", width: "196px", marginLeft: "-92px", height: "auto", display: "block", zIndex: "3", filter: "drop-shadow(0 16px 18px rgba(20,8,60,0.35))" }} />
          <div aria-hidden="true" style={{ position: "absolute", left: "0", right: "0", top: "664px", height: "70px", overflow: "hidden", zIndex: "3", WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 12%, #000 88%, transparent 100%)", maskImage: "linear-gradient(90deg, transparent 0, #000 12%, #000 88%, transparent 100%)" }}>
            <div className="hb-marq" style={{ display: "flex", width: "max-content", paddingTop: "4px" }}>
              <Artwork src="/haiba/brands/wingman.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#F9F9F9", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/spotify.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "50%", objectFit: "cover", display: "block", flex: "none", background: "#000000", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/vox.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/chatgpt.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "50%", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/coffee-bean.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/airalo-mark.svg" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/grip.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#000000", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/albayan.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/alkuwaiti.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/wingman.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#F9F9F9", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/spotify.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "50%", objectFit: "cover", display: "block", flex: "none", background: "#000000", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/vox.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/chatgpt.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "50%", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/coffee-bean.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/airalo-mark.svg" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/grip.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#000000", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/albayan.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
              <Artwork src="/haiba/brands/alkuwaiti.webp" alt="" style={{ width: "58px", height: "58px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 8px 16px rgba(20,8,60,0.28)" }} />
            </div>
          </div>
          </>
        ) : null}
        {v.s1 ? (
          <>
          <div style={{ position: "absolute", left: "24px", right: "24px", top: "74px", textAlign: "center", zIndex: "3" }}>
            <div className="hb-rise" style={{ fontSize: "31px", fontWeight: "900", letterSpacing: "-0.035em", lineHeight: "1.07" }}>
              {"A "}
              <span style={{ color: "#5630BB" }}>
                {"free gift"}
              </span>
              {","}
              <br />
              {"every month"}
            </div>
            <div className="hb-rise hb-d1" style={{ marginTop: "10px", fontSize: "16px", fontWeight: "600", color: "#514A65", lineHeight: "1.4" }}>
              {v.giftSub}
            </div>
          </div>
          <div className="hb-stagger" style={{ position: "absolute", left: "18px", right: "18px", top: "236px", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px", zIndex: "3" }}>
            {(v.gifts || []).map((g: any, idx0: number) => (
              <Fragment key={idx0}>
                <span style={{ borderRadius: "16px", overflow: "hidden", background: "#FFFFFF", color: "#1E1B2E", display: "flex", flexDirection: "column", textAlign: "center", boxShadow: g.shadow, position: "relative" }}>
                  <Artwork src={g.logo} alt={g.shop} style={{ width: "100%", height: "78px", boxSizing: "border-box", padding: "8px", objectFit: "contain", background: g.bg, display: "block" }} />
                  <span style={{ padding: "7px 6px 9px 6px", display: "flex", flexDirection: "column", gap: "1px" }}>
                    <span style={{ fontSize: "13.5px", fontWeight: "800", lineHeight: "1.2" }}>
                      {g.item}
                    </span>
                    <span style={{ fontSize: "11.5px", fontWeight: "600", color: "#6B6880" }}>
                      {g.shop}
                    </span>
                  </span>
                  <span style={{ position: "absolute", left: "6px", top: "6px", display: g.favDisp, background: "#1E1B2E", color: "#C0F402", fontSize: "10.5px", fontWeight: "800", borderRadius: "999px", padding: "3px 7px" }}>
                    {"You go here"}
                  </span>
                </span>
              </Fragment>
            ))}
          </div>
          <div className="hb-rise hb-d3" style={{ position: "absolute", left: "0", right: "0", top: "574px", textAlign: "center", fontSize: "13.5px", fontWeight: "700", color: "#6B6880", zIndex: "3" }}>
            {"12 gifts in 1 year. Each is worth about BHD 2.50."}
          </div>
          </>
        ) : null}
        {v.s2 ? (
          <>
          <div style={{ position: "absolute", left: "24px", right: "24px", top: "74px", textAlign: "center", zIndex: "3" }}>
            <div className="hb-rise" style={{ fontSize: "31px", fontWeight: "900", letterSpacing: "-0.035em", lineHeight: "1.07" }}>
              {"Plus "}
              <span style={{ color: "#5630BB" }}>
                {"3 free extras"}
              </span>
              <br />
              {"on day one"}
            </div>
            <div className="hb-rise hb-d1" style={{ marginTop: "10px", fontSize: "16px", fontWeight: "600", color: "#514A65", lineHeight: "1.4" }}>
              {"Free apps and travel data. You get them when Haiba opens."}
            </div>
          </div>
          <div className="hb-stagger" style={{ position: "absolute", left: "20px", right: "20px", top: "236px", display: "flex", flexDirection: "column", gap: "10px", zIndex: "3" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "12px", background: "#000000", color: "#FFFFFF", borderRadius: "18px", padding: "14px" }}>
              <Artwork src="/haiba/brands/spotify.webp" alt="" style={{ width: "44px", height: "44px", borderRadius: "50%", display: "block", flex: "none" }} />
              <span style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "16.5px", fontWeight: "800" }}>
                  {"Spotify Premium Student"}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#B9B3CC" }}>
                  {"3 months free"}
                </span>
              </span>
              <span style={{ background: "#C0F402", color: "#1F2600", fontSize: "13px", fontWeight: "800", borderRadius: "999px", padding: "5px 10px" }}>
                {v.wSpotify}
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "12px", background: "#FFFFFF", borderRadius: "18px", padding: "14px", boxShadow: "0 0 0 1px #ECE8F5" }}>
              <Artwork src="/haiba/brands/chatgpt.webp" alt="" style={{ width: "44px", height: "44px", borderRadius: "50%", display: "block", flex: "none", boxShadow: "0 0 0 1px #ECE8F5" }} />
              <span style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "16.5px", fontWeight: "800" }}>
                  {"ChatGPT Go"}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
                  {"3 months free"}
                </span>
              </span>
              <span style={{ background: "#1E1B2E", color: "#C0F402", fontSize: "13px", fontWeight: "800", borderRadius: "999px", padding: "5px 10px" }}>
                {v.wChatgpt}
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "12px", background: "#1E1B2E", color: "#FFFFFF", borderRadius: "18px", padding: "14px" }}>
              <Artwork src="/haiba/brands/airalo-mark.svg" alt="" style={{ width: "44px", height: "44px", borderRadius: "12px", display: "block", flex: "none", background: "#FFFFFF" }} />
              <span style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "16.5px", fontWeight: "800" }}>
                  {"Free mobile data"}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#B9B3CC" }}>
                  {"5GB when you travel"}
                </span>
              </span>
              <span style={{ background: "#C0F402", color: "#1F2600", fontSize: "13px", fontWeight: "800", borderRadius: "999px", padding: "5px 10px" }}>
                {v.wTravel}
              </span>
            </span>
          </div>
          </>
        ) : null}
        {v.s3 ? (
          <>
          <div style={{ position: "absolute", left: "20px", right: "20px", top: "58px", height: "566px", zIndex: "3", display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px" }}>
            <div style={{ textAlign: "center", padding: "0 4px" }}>
              <div className="hb-rise" style={{ fontSize: "31px", fontWeight: "900", letterSpacing: "-0.035em", lineHeight: "1.07" }}>
                {"Get "}
                <span style={{ color: "#5630BB" }}>
                  {"free stuff"}
                </span>
                {" with points"}
              </div>
              <div className="hb-rise hb-d1" style={{ marginTop: "10px", fontSize: "16px", fontWeight: "600", color: "#514A65", lineHeight: "1.4" }}>
                {"Use your points at all these shops."}
              </div>
            </div>
            <div aria-hidden="true" className="hb-rise hb-d1" style={{ margin: "0 -20px", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 12%, #000 88%, transparent 100%)", maskImage: "linear-gradient(90deg, transparent 0, #000 12%, #000 88%, transparent 100%)" }}>
              <div className="hb-marq" style={{ display: "flex", width: "max-content", padding: "4px 0 14px 0" }}>
                <Artwork src="/haiba/brands/wingman.webp" alt="" style={{ width: "60px", height: "60px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#F9F9F9", marginRight: "12px", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.08)" }} />
                <Artwork src="/haiba/brands/vox.webp" alt="" style={{ width: "60px", height: "60px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.08)" }} />
                <Artwork src="/haiba/brands/coffee-bean.webp" alt="" style={{ width: "60px", height: "60px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.08)" }} />
                <Artwork src="/haiba/brands/grip.webp" alt="" style={{ width: "60px", height: "60px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#000000", marginRight: "12px", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.08)" }} />
                <Artwork src="/haiba/brands/albayan.webp" alt="" style={{ width: "60px", height: "60px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.08)" }} />
                <Artwork src="/haiba/brands/alkuwaiti.webp" alt="" style={{ width: "60px", height: "60px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.08)" }} />
                <Artwork src="/haiba/brands/wingman.webp" alt="" style={{ width: "60px", height: "60px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#F9F9F9", marginRight: "12px", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.08)" }} />
                <Artwork src="/haiba/brands/vox.webp" alt="" style={{ width: "60px", height: "60px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.08)" }} />
                <Artwork src="/haiba/brands/coffee-bean.webp" alt="" style={{ width: "60px", height: "60px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.08)" }} />
                <Artwork src="/haiba/brands/grip.webp" alt="" style={{ width: "60px", height: "60px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#000000", marginRight: "12px", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.08)" }} />
                <Artwork src="/haiba/brands/albayan.webp" alt="" style={{ width: "60px", height: "60px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.08)" }} />
                <Artwork src="/haiba/brands/alkuwaiti.webp" alt="" style={{ width: "60px", height: "60px", borderRadius: "16px", objectFit: "cover", display: "block", flex: "none", background: "#FFFFFF", marginRight: "12px", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.08)" }} />
              </div>
            </div>
            <div className="hb-rise hb-d2" style={{ background: "#FFFFFF", borderRadius: "20px", padding: "14px 16px 12px 16px", boxShadow: "0 0 0 1px #ECE8F5, 0 12px 26px rgba(30,27,46,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Artwork src="/haiba/coins/coin-34.webp" alt="" style={{ width: "38px", height: "38px", display: "block", flex: "none" }} />
                <span style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "16px", fontWeight: "800", lineHeight: "1.3" }}>
                    <span style={{ color: "#6C3FFA" }}>
                      {"40 points"}
                    </span>
                    {" every time you use an offer"}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B6880" }}>
                    {"Plus 500 points when you join"}
                  </span>
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "12px 0 10px 0" }}>
                <span style={{ flex: "1", height: "1px", background: "#F1EEF8" }}></span>
                <span style={{ fontSize: "12px", fontWeight: "800", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6C3FFA" }}>
                  {"Bonus points"}
                </span>
                <span style={{ flex: "1", height: "1px", background: "#F1EEF8" }}></span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ flex: "1", minWidth: "0", display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", fontWeight: "800", lineHeight: "1.3" }}>
                  <span style={{ width: "22px", height: "22px", flex: "none", borderRadius: "50%", background: "#6C3FFA", color: "#FFFFFF", fontSize: "12px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {"1"}
                  </span>
                  {"First 2 visits at a new shop"}
                </span>
                <span style={{ display: "flex", gap: "4px", flex: "none" }}>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", boxSizing: "border-box", background: "#1E1B2E", color: "#FFFFFF", fontSize: "13px", fontWeight: "900", borderRadius: "999px", padding: "3px 8px", lineHeight: "16px" }}>
                      {"+80"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#6C3FFA", color: "#FFFFFF", fontSize: "16px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {"2x"}
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", boxSizing: "border-box", background: "#1E1B2E", color: "#FFFFFF", fontSize: "13px", fontWeight: "900", borderRadius: "999px", padding: "3px 8px", lineHeight: "16px" }}>
                      {"+80"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#6C3FFA", color: "#FFFFFF", fontSize: "16px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {"2x"}
                    </span>
                  </span>
                </span>
              </div>
              <div style={{ height: "1px", background: "#F1EEF8", margin: "10px 0 12px 0" }}></div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "800", color: "#1E1B2E" }}>
                <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#C0F402", color: "#1F2600", fontSize: "12px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {"2"}
                </span>
                {"Then every 5th visit, again and again"}
              </div>
              <div style={{ margin: "-4px -16px -14px -16px", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 8%, #000 88%, transparent 100%)", maskImage: "linear-gradient(90deg, transparent 0, #000 8%, #000 88%, transparent 100%)" }}>
                <div className="hb-flow" style={{ display: "flex", width: "max-content", padding: "10px 0" }}>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", boxSizing: "border-box", background: "#C0F402", color: "#1F2600", fontSize: "13px", fontWeight: "900", borderRadius: "999px", padding: "3px 8px", lineHeight: "16px" }}>
                      {"+200"}
                    </span>
                    <span style={{ position: "relative", width: "46px", height: "46px" }}>
                      <span className="hb-ping" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "#C0F402" }}></span>
                      <span className="hb-throb" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "#C0F402", color: "#1F2600", fontSize: "16px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 3px #1E1B2E inset" }}>
                        {"5x"}
                      </span>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", boxSizing: "border-box", background: "#C0F402", color: "#1F2600", fontSize: "13px", fontWeight: "900", borderRadius: "999px", padding: "3px 8px", lineHeight: "16px" }}>
                      {"+200"}
                    </span>
                    <span style={{ position: "relative", width: "46px", height: "46px" }}>
                      <span className="hb-ping" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "#C0F402" }}></span>
                      <span className="hb-throb" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "#C0F402", color: "#1F2600", fontSize: "16px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 3px #1E1B2E inset" }}>
                        {"5x"}
                      </span>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", boxSizing: "border-box", background: "#C0F402", color: "#1F2600", fontSize: "13px", fontWeight: "900", borderRadius: "999px", padding: "3px 8px", lineHeight: "16px" }}>
                      {"+200"}
                    </span>
                    <span style={{ position: "relative", width: "46px", height: "46px" }}>
                      <span className="hb-ping" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "#C0F402" }}></span>
                      <span className="hb-throb" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "#C0F402", color: "#1F2600", fontSize: "16px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 3px #1E1B2E inset" }}>
                        {"5x"}
                      </span>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", fontSize: "12.5px", fontWeight: "800", color: "#9C95B5", lineHeight: "22px" }}>
                      {"+40"}
                    </span>
                    <span style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#F1EDFC", color: "#B3A6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span style={{ flex: "none", width: "58px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ height: "22px", boxSizing: "border-box", background: "#C0F402", color: "#1F2600", fontSize: "13px", fontWeight: "900", borderRadius: "999px", padding: "3px 8px", lineHeight: "16px" }}>
                      {"+200"}
                    </span>
                    <span style={{ position: "relative", width: "46px", height: "46px" }}>
                      <span className="hb-ping" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "#C0F402" }}></span>
                      <span className="hb-throb" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "#C0F402", color: "#1F2600", fontSize: "16px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 3px #1E1B2E inset" }}>
                        {"5x"}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          </>
        ) : null}
        {v.s4 ? (
          <>
          <div style={{ position: "absolute", left: "24px", right: "24px", top: "60px", textAlign: "center", zIndex: "3" }}>
            <div className="hb-rise" style={{ fontSize: "31px", fontWeight: "900", letterSpacing: "-0.035em", lineHeight: "1.07" }}>
              {"Start with "}
              <span style={{ color: "#5630BB" }}>
                {"BHD 1"}
              </span>
              {" today"}
            </div>
            <div className="hb-rise hb-d1" style={{ marginTop: "6px", fontSize: "15.5px", fontWeight: "600", color: "#514A65" }}>
              {"Lock your price before Haiba opens."}
            </div>
          </div>
          <div className="hb-grow" style={{ position: "absolute", left: "18px", right: "18px", top: "140px", background: "#1E1B2E", color: "#FFFFFF", borderRadius: "22px", overflow: "hidden", zIndex: "3", padding: "14px 12px 14px 12px", boxSizing: "border-box", boxShadow: "0 16px 32px rgba(30,27,46,0.24)" }}>
            <div style={{ fontSize: "12px", fontWeight: "800", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B9B3CC", padding: "0 6px 4px 6px" }}>
              {"What you get"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "9px 6px" }}>
              <span style={{ width: "32px", height: "32px", flex: "none", borderRadius: "10px", background: "#6C3FFA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C0F402" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12v9H4v-9M2 7h20v5H2zM12 7v14M12 7c-2-4-7-4-7-1s5 1 7 1zm0 0c2-4 7-4 7-1s-5 1-7 1z"></path>
                </svg>
              </span>
              <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "15.5px", fontWeight: "800" }}>
                  {"12 free gifts"}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#B9B3CC" }}>
                  {"1 every month, you pick"}
                </span>
              </span>
              <span style={{ fontSize: "15px", fontWeight: "800", color: "#C0F402" }}>
                {v.wGifts}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "9px 6px" }}>
              <span style={{ display: "flex", flex: "none" }}>
                <Artwork src="/haiba/brands/spotify.webp" alt="" style={{ width: "22px", height: "22px", borderRadius: "50%", objectFit: "cover", display: "block", background: "#000000", marginLeft: "0", boxShadow: "0 0 0 2px #1E1B2E" }} />
                <Artwork src="/haiba/brands/chatgpt.webp" alt="" style={{ width: "22px", height: "22px", borderRadius: "50%", objectFit: "cover", display: "block", background: "#FFFFFF", marginLeft: "-7px", boxShadow: "0 0 0 2px #1E1B2E" }} />
                <Artwork src="/haiba/brands/airalo-mark.svg" alt="" style={{ width: "22px", height: "22px", borderRadius: "30%", objectFit: "cover", display: "block", background: "#FFFFFF", marginLeft: "-7px", boxShadow: "0 0 0 2px #1E1B2E" }} />
              </span>
              <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "15.5px", fontWeight: "800" }}>
                  {"3 free extras"}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#B9B3CC" }}>
                  {"Spotify, ChatGPT and 5GB data"}
                </span>
              </span>
              <span style={{ fontSize: "15px", fontWeight: "800", color: "#C0F402" }}>
                {v.wExtras}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "9px 6px" }}>
              <Artwork src="/haiba/coins/coin-34.webp" alt="" style={{ width: "32px", height: "32px", display: "block", flex: "none" }} />
              <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "15.5px", fontWeight: "800" }}>
                  {"Points"}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#B9B3CC" }}>
                  {"Every time you use Unipal"}
                </span>
              </span>
              <span style={{ fontSize: "15px", fontWeight: "800", color: "#C0F402" }}>
                {"+"}
              </span>
            </div>
            <div style={{ marginTop: "8px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)", gap: "8px" }}>
                <span style={{ position: "relative", zIndex: "1", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1px", background: "#2A2540", color: "#FFFFFF", borderRadius: "18px", padding: "14px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#B9B3CC" }}>
                    {"You pay"}
                  </span>
                  <span style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "-0.02em" }}>
                    {v.price}
                  </span>
                  <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#B9B3CC" }}>
                    {"a year + VAT"}
                  </span>
                  <span style={{ position: "absolute", right: "-19px", top: "50%", marginTop: "-15px", width: "30px", height: "30px", borderRadius: "50%", background: "#FFFFFF", color: "#1E1B2E", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 3px #1E1B2E" }}>
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6"></path>
                    </svg>
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1px", background: "#C0F402", color: "#1F2600", borderRadius: "18px", padding: "14px 14px 14px 24px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#3D5000" }}>
                    {"You get"}
                  </span>
                  <span style={{ fontSize: "34px", fontWeight: "900", letterSpacing: "-0.03em", color: "#1F2600", lineHeight: "1.05" }}>
                    {v.worth}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#3D5000" }}>
                    {"of free stuff"}
                  </span>
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginTop: "12px", padding: "0 4px" }}>
              <span style={{ display: "flex", flex: "none", paddingTop: "2px" }}>
                <span style={{ display: "flex", flex: "none" }}>
                  <Artwork src="/haiba/brands/spotify.webp" alt="" style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover", display: "block", background: "#000000", marginLeft: "0", boxShadow: "0 0 0 2px #1E1B2E" }} />
                  <Artwork src="/haiba/brands/chatgpt.webp" alt="" style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover", display: "block", background: "#FFFFFF", marginLeft: "-8px", boxShadow: "0 0 0 2px #1E1B2E" }} />
                  <Artwork src="/haiba/brands/airalo-mark.svg" alt="" style={{ width: "24px", height: "24px", borderRadius: "30%", objectFit: "cover", display: "block", background: "#FFFFFF", marginLeft: "-8px", boxShadow: "0 0 0 2px #1E1B2E" }} />
                </span>
              </span>
              <span style={{ flex: "1", minWidth: "0", fontSize: "14px", fontWeight: "600", color: "#CFC9E0", lineHeight: "1.4" }}>
                <b style={{ color: "#FFFFFF", fontWeight: "800" }}>
                  {v.dayOneHead}
                </b>
                {" "}{v.dayOneRest}
              </span>
            </div>
          </div>
          <div className="hb-rise hb-d3" style={{ position: "absolute", left: "18px", right: "18px", top: "568px", zIndex: "3" }}>
            <div style={{ background: "#FFFFFF", borderRadius: "18px", padding: "14px 14px 12px 14px", boxShadow: "0 0 0 1.5px #D6CAF7, 0 12px 26px rgba(76,52,140,0.10)" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "12px", paddingBottom: "18px" }}>
                <span style={{ position: "absolute", left: "14px", top: "34px", bottom: "2px", width: "3px", borderRadius: "3px", background: "linear-gradient(180deg, #C0F402 0%, #6C3FFA 100%)" }}></span>
                <span style={{ position: "relative", zIndex: "1", width: "31px", height: "31px", flex: "none", borderRadius: "50%", background: "#C0F402", color: "#1F2600", boxShadow: "0 0 0 2px #6C3FFA inset", fontSize: "13px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {"1"}
                </span>
                <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px", paddingTop: "1px" }}>
                  <span style={{ fontSize: "12.5px", fontWeight: "800", letterSpacing: "0.06em", textTransform: "uppercase", color: "#6C3FFA" }}>
                    {"Today"}
                  </span>
                  <span style={{ fontSize: "15.5px", fontWeight: "700", color: "#1E1B2E", lineHeight: "1.3" }}>
                    {"Your price is locked"}
                  </span>
                </span>
                <span style={{ flex: "none", display: "flex", flexDirection: "column", alignItems: "flex-end", paddingTop: "1px" }}>
                  <span style={{ fontSize: "19px", fontWeight: "900", letterSpacing: "-0.02em", color: "#1E1B2E", whiteSpace: "nowrap" }}>
                    {"BHD 1"}
                  </span>
                  <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#6B6880" }}></span>
                </span>
              </div>
              <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "12px", paddingBottom: "0" }}>
                <span style={{ position: "relative", zIndex: "1", width: "31px", height: "31px", flex: "none", borderRadius: "50%", background: "#6C3FFA", color: "#FFFFFF", boxShadow: "0 0 0 2px #6C3FFA inset", fontSize: "13px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {"2"}
                </span>
                <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px", paddingTop: "1px" }}>
                  <span style={{ fontSize: "12.5px", fontWeight: "800", letterSpacing: "0.06em", textTransform: "uppercase", color: "#6B6880" }}>
                    {"8 Dec"}
                  </span>
                  <span style={{ fontSize: "15.5px", fontWeight: "700", color: "#1E1B2E", lineHeight: "1.3" }}>
                    {"Haiba opens. Pay the rest."}
                  </span>
                </span>
                <span style={{ flex: "none", display: "flex", flexDirection: "column", alignItems: "flex-end", paddingTop: "1px" }}>
                  <span style={{ fontSize: "19px", fontWeight: "900", letterSpacing: "-0.02em", color: "#1E1B2E", whiteSpace: "nowrap" }}>
                    {v.rest}
                  </span>
                  <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#6B6880" }}>
                    {"+ VAT"}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="hb-fixed-bottom hb-cta-dock"><div className="hb-fixed-inner">
          <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "30px 16px calc(16px + env(safe-area-inset-bottom, 0px)) 16px", background: "linear-gradient(180deg, rgba(243,240,250,0) 0%, rgba(243,240,250,1) 30%)", display: "flex", flexDirection: "column", gap: "2px", zIndex: "5" }}>
            <button onClick={v.reserve} className="hb-press" style={{ font: "inherit", border: "0", cursor: "pointer", background: "#1E1B2E", borderRadius: "999px", padding: "13px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "1px", boxShadow: "0 10px 24px rgba(30,27,46,0.24)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#C0F402", fontSize: "17px", fontWeight: "800" }}>
                {"Reserve my spot for BHD 1"}
              </span>
              <span style={{ color: "#CFC9E0", fontSize: "13px", fontWeight: "600" }}>
                {"No commitment. Refundable."}
              </span>
            </button>
            <button onClick={v.openExit} className="hb-press" style={{ font: "inherit", border: "0", background: "transparent", cursor: "pointer", color: "#6B6880", fontSize: "15px", fontWeight: "600", padding: "10px 16px" }}>
              {"Not now"}
            </button>
          </div>
          </div></div>
          </>
        ) : null}
        {v.tallyOn ? (
          <>
          <div style={{ position: "absolute", left: "18px", right: "18px", top: "630px", background: "#1E1B2E", color: "#FFFFFF", borderRadius: "20px", padding: "12px 14px 14px 14px", zIndex: "4", boxShadow: "0 12px 24px rgba(30,27,46,0.22)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", fontWeight: "800", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B9B3CC", lineHeight: "1" }}>
                {"What you get"}
              </span>
              <span style={{ display: "flex", alignItems: "baseline", gap: "6px", lineHeight: "1" }}>
                <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#B9B3CC" }}>
                  {"Worth"}
                </span>
                <span className={v.tallyBump} style={{ fontSize: "24px", fontWeight: "900", color: "#C0F402", letterSpacing: "-0.03em" }}>
                  {v.tally}
                </span>
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
              <span className="hb-pop" style={{ display: v.got0, alignItems: "center", gap: "6px", background: "#2A2540", borderRadius: "999px", padding: "4px 10px 4px 4px", fontSize: "13.5px", fontWeight: "800", whiteSpace: "nowrap" }}>
                <span style={{ width: "22px", height: "22px", flex: "none", borderRadius: "8px", background: "#6C3FFA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C0F402" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 12v9H4v-9M2 7h20v5H2zM12 7v14M12 7c-2-4-7-4-7-1s5 1 7 1zm0 0c2-4 7-4 7-1s-5 1-7 1z"></path>
                  </svg>
                </span>
                {"12 gifts"}
              </span>
              <span className="hb-pop" style={{ display: v.got1, alignItems: "center", gap: "6px", background: "#2A2540", borderRadius: "999px", padding: "4px 10px 4px 4px", fontSize: "13.5px", fontWeight: "800", whiteSpace: "nowrap" }}>
                <span style={{ display: "flex", flex: "none" }}>
                  <Artwork src="/haiba/brands/spotify.webp" alt="" style={{ width: "20px", height: "20px", borderRadius: "50%", objectFit: "cover", display: "block", background: "#000000", marginLeft: "0", boxShadow: "0 0 0 2px #2A2540" }} />
                  <Artwork src="/haiba/brands/chatgpt.webp" alt="" style={{ width: "20px", height: "20px", borderRadius: "50%", objectFit: "cover", display: "block", background: "#FFFFFF", marginLeft: "-6px", boxShadow: "0 0 0 2px #2A2540" }} />
                  <Artwork src="/haiba/brands/airalo-mark.svg" alt="" style={{ width: "20px", height: "20px", borderRadius: "30%", objectFit: "cover", display: "block", background: "#FFFFFF", marginLeft: "-6px", boxShadow: "0 0 0 2px #2A2540" }} />
                </span>
                {"3 extras"}
              </span>
              <span className="hb-pop" style={{ display: v.got2, alignItems: "center", gap: "6px", background: "#2A2540", borderRadius: "999px", padding: "4px 10px 4px 4px", fontSize: "13.5px", fontWeight: "800", whiteSpace: "nowrap" }}>
                <Artwork src="/haiba/coins/coin-34.webp" alt="" style={{ width: "22px", height: "22px", display: "block", flex: "none" }} />
                {"Points"}
              </span>
            </div>
          </div>
          </>
        ) : null}
        {v.notLast ? (
          <>
          <div className="hb-fixed-bottom hb-cta-dock"><div className="hb-fixed-inner">
          <div style={{ position: "absolute", left: "0", right: "0", bottom: "calc(34px + env(safe-area-inset-bottom, 0px))", display: "flex", justifyContent: "center", zIndex: "5" }}>
            <button onClick={v.next} className="hb-press" style={{ font: "inherit", fontSize: "17px", fontWeight: "800", border: "0", borderRadius: "999px", padding: "17px 30px", minWidth: "210px", cursor: "pointer", background: v.ctaBg, color: v.ctaInk, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", boxShadow: "0 12px 26px rgba(30,27,46,0.24)" }}>
              {v.cta}
            </button>
          </div>
          </div></div>
          </>
        ) : null}
        {v.exitOpen ? (
          <>
          <div className="hb-fade" style={{ position: "absolute", inset: "0", background: "rgba(20,16,40,0.55)", zIndex: "10", display: "flex", alignItems: "flex-end" }}>
            <div className="hb-up" role="dialog" aria-label="Hold your spot" style={{ position: "relative", width: "100%", boxSizing: "border-box", background: "#FFFFFF", borderRadius: "22px 22px 0 0", padding: "24px 20px 16px 20px" }}>
              <Artwork className="hb-peek" src="/haiba/birds/04-peek.png" alt="" style={{ position: "absolute", right: "0", top: "-104px", height: "150px", width: "auto", display: "block" }} />
              <div style={{ fontSize: "26px", fontWeight: "900", letterSpacing: "-0.03em", lineHeight: "1.1", maxWidth: "250px" }}>
                {"Before you go"}
              </div>
              <div style={{ marginTop: "14px", display: "flex", gap: "12px", alignItems: "center", background: "#1E1B2E", color: "#FFFFFF", borderRadius: "16px", padding: "14px" }}>
                <Artwork src="/haiba/coins/coin-34.webp" alt="" style={{ width: "40px", height: "40px", display: "block", flex: "none" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{ fontSize: "15.5px", fontWeight: "800", color: "#C0F402" }}>
                    {v.missTitle}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#CFC9E0", lineHeight: "1.35" }}>
                    {v.missBody}
                  </span>
                </span>
              </div>
              <div style={{ fontSize: "15px", fontWeight: "600", color: "#4A4660", lineHeight: "1.45", marginTop: "12px" }}>
                {"Pay "}
                <b style={{ color: "#1E1B2E" }}>
                  {"BHD 1"}
                </b>
                {" today to keep your price of "}{v.priceYear}{". You can get it back any time."}
              </div>
              <button onClick={v.reserve} className="hb-press" style={{ marginTop: "16px", width: "100%", font: "inherit", fontSize: "17px", fontWeight: "800", border: "0", borderRadius: "999px", padding: "16px", cursor: "pointer", background: "#1E1B2E", color: "#C0F402", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                {"Reserve for BHD 1"}
              </button>
              <button onClick={v.closeExit} className="hb-press" style={{ width: "100%", font: "inherit", border: "0", background: "transparent", cursor: "pointer", color: "#6B6880", fontSize: "15px", fontWeight: "600", padding: "12px 16px 2px 16px" }}>
                {"No thanks"}
              </button>
            </div>
          </div>
          </>
        ) : null}
        {v.reservedOpen ? (
          <>
          <div className="hb-fade" style={{ position: "absolute", inset: "0", background: "rgba(20,16,40,0.55)", zIndex: "11", display: "flex", alignItems: "flex-end" }}>
            <div className="hb-up" role="dialog" aria-label="You are in" style={{ position: "relative", width: "100%", boxSizing: "border-box", background: "#FFFFFF", borderRadius: "22px 22px 0 0", padding: "0 20px 18px 20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Artwork className="hb-pop" src="/haiba/birds/02-jump.png" alt="" style={{ height: "160px", width: "auto", display: "block", marginTop: "-70px" }} />
              <div style={{ fontSize: "27px", fontWeight: "900", letterSpacing: "-0.03em", lineHeight: "1.1", marginTop: "4px" }}>
                {"You're in, "}{v.name}{"!"}
              </div>
              <div style={{ fontSize: "15.5px", fontWeight: "500", color: "#4A4660", marginTop: "6px" }}>
                {"Your price is locked at "}
                <b style={{ color: "#1E1B2E" }}>
                  {v.priceYear}
                </b>
                {"."}
              </div>
              <div style={{ width: "100%", marginTop: "16px", borderRadius: "16px", background: "#F6F3FF", padding: "4px 16px", boxSizing: "border-box", textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", fontSize: "15px", fontWeight: "600", color: "#4A4660" }}>
                  <span>
                    {"Paid today"}
                  </span>
                  <span style={{ fontWeight: "800", color: "#1E1B2E" }}>
                    {"BHD 1.00"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderTop: "1px solid #E6E0F6", fontSize: "15px", fontWeight: "600", color: "#4A4660" }}>
                  <span>
                    {"Pay on 8 Dec"}
                  </span>
                  <span style={{ fontWeight: "800", color: "#1E1B2E" }}>
                    {v.rest}{" + VAT"}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: "13.5px", fontWeight: "600", color: "#6B6880", marginTop: "10px" }}>
                {"We will remind you before 8 Dec. Refunds through support."}
              </div>
              <button onClick={v.closeReserved} className="hb-press" style={{ marginTop: "16px", width: "100%", font: "inherit", fontSize: "17px", fontWeight: "800", border: "0", borderRadius: "999px", padding: "16px", cursor: "pointer", background: "#1E1B2E", color: "#C0F402" }}>
                {"Done"}
              </button>
            </div>
          </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
