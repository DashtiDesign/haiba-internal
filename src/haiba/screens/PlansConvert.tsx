// @ts-nocheck
// Ported 1:1 from the Design canvas board "PlansConvert.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/plansconvert";

export default function PlansConvert() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-plansconvert">
      <div style={{ width: "100%", maxWidth: "390px", margin: "0 auto", minHeight: "100vh", boxSizing: "border-box", background: "#F3F0FA", fontFamily: "Figtree, system-ui, sans-serif", color: "#1E1B2E", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "0", right: "0", top: "0", height: "520px", background: "linear-gradient(180deg, #E4D9FF 0%, #F3EEFF 55%, #F3F0FA 100%)" }}></div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", padding: "14px 16px 200px 16px" }}>
          <div className="hb-rise" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "48px" }}>
            <button onClick={v.openExit} aria-label="Close" className="hb-press" style={{ width: "44px", height: "44px", borderRadius: "50%", border: "0", background: "rgba(255,255,255,0.85)", color: "#1E1B2E", display: "flex", alignItems: "center", justifyContent: "center", padding: "0", cursor: "pointer", boxShadow: "0 0 0 1px #ECE8F5" }}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18"></path>
              </svg>
            </button>
            <span style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.01em" }}>
              {"Haiba membership"}
            </span>
            <span style={{ width: "44px" }}></span>
          </div>
          <div className="hb-rise" style={{ marginTop: "18px", background: "#FFFFFF", borderRadius: "20px", overflow: "hidden", boxShadow: "0 18px 40px rgba(76,52,140,0.16)" }}>
            <div style={{ position: "relative", height: "284px", background: "linear-gradient(135deg, #6C3FFA 0%, #4F25D6 100%)", padding: "22px", boxSizing: "border-box", color: "#FFFFFF", overflow: "hidden" }}>
              <span aria-hidden="true" style={{ position: "absolute", left: "-60px", bottom: "-90px", width: "220px", height: "220px", borderRadius: "50%", border: "2px dashed rgba(192,244,2,0.35)" }}></span>
              <Artwork priority src="/haiba/logo-lime.svg" alt="Haiba" style={{ position: "relative", display: "block", height: "36px", width: "auto" }} />
              <div className="hb-rise" style={{ position: "relative", fontSize: "22px", fontWeight: "900", letterSpacing: "-0.02em", marginTop: "18px" }}>
                {"Get "}
                <span style={{ color: "#C0F402" }}>
                  {"free stuff"}
                </span>
                {" worth"}
              </div>
              <div className="hb-pop hb-d1" style={{ position: "relative", fontSize: "56px", fontWeight: "900", letterSpacing: "-0.045em", lineHeight: "1", color: "#C0F402", marginTop: "2px" }}>
                {v.worth}
              </div>
              <div style={{ position: "relative", fontSize: "22px", fontWeight: "900", letterSpacing: "-0.02em", marginTop: "2px" }}>
                {"every year"}
              </div>
              <div style={{ position: "relative", marginTop: "14px", display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "15px", fontWeight: "600", color: "#E4DBFF" }}>
                  {"Only"}
                </span>
                <span style={{ fontSize: "26px", fontWeight: "900", letterSpacing: "-0.02em" }}>
                  {v.perMonth}
                </span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#E4DBFF" }}>
                  {"a month"}
                </span>
              </div>
              <div style={{ position: "relative", marginTop: "2px", fontSize: "13.5px", fontWeight: "600", color: "#E4DBFF" }}>
                {"Paid once a year: "}{v.price}{" + VAT"}
              </div>
              <span className="hb-peek" style={{ position: "absolute", right: "-30px", bottom: "-64px", display: "block" }}>
                <Artwork src="/haiba/birds/04-peek.png" alt="The Haiba bird giving a thumbs up" style={{ height: "210px", width: "auto", display: "block", filter: "drop-shadow(0 12px 14px rgba(20,8,60,0.35))" }} />
              </span>
            </div>
            <div style={{ padding: "6px 20px 18px 20px" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B6880", padding: "14px 0 2px 0" }}>
                {"What you get"}
              </div>
              <div className="hb-stagger">
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "12px 0" }}>
                  <span style={{ width: "26px", height: "26px", flex: "none", borderRadius: "50%", background: "#1E1B2E", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px" }}>
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C0F402" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "16.5px", fontWeight: "700", lineHeight: "1.3" }}>
                      {"12 free gifts, 1 every month"}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: "500", color: "#6B6880", lineHeight: "1.35" }}>
                      {v.giftSub}
                    </span>
                  </span>
                  <span style={{ flex: "none", fontSize: "16px", fontWeight: "800", color: "#6C3FFA", paddingTop: "1px" }}>
                    {v.wGifts}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "12px 0", borderTop: "1px solid #F1EEF8" }}>
                  <span style={{ width: "26px", height: "26px", flex: "none", borderRadius: "50%", background: "#1E1B2E", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px" }}>
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C0F402" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "16.5px", fontWeight: "700", lineHeight: "1.3" }}>
                      {"3 free extras on day one"}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: "500", color: "#6B6880", lineHeight: "1.35" }}>
                      {"Spotify and ChatGPT for 3 months. 5GB data when you travel."}
                    </span>
                  </span>
                  <span style={{ flex: "none", fontSize: "16px", fontWeight: "800", color: "#6C3FFA", paddingTop: "1px" }}>
                    {v.wExtras}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "12px 0", borderTop: "1px solid #F1EEF8" }}>
                  <span style={{ width: "26px", height: "26px", flex: "none", borderRadius: "50%", background: "#1E1B2E", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px" }}>
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C0F402" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "16.5px", fontWeight: "700", lineHeight: "1.3" }}>
                      {"Points every time you use Unipal"}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: "500", color: "#6B6880", lineHeight: "1.35" }}>
                      {"Use them for free food, coffee and more"}
                    </span>
                  </span>
                  <span style={{ flex: "none", fontSize: "16px", fontWeight: "800", color: "#6C3FFA", paddingTop: "1px" }}>
                    {"+"}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px", padding: "14px 16px", borderRadius: "14px", background: "#1E1B2E", color: "#FFFFFF" }}>
                <span style={{ fontSize: "15px", fontWeight: "700", color: "#CFC9E0" }}>
                  {"Total value in 1 year"}
                </span>
                <span style={{ fontSize: "22px", fontWeight: "900", color: "#C0F402", letterSpacing: "-0.02em" }}>
                  {v.worth}
                </span>
              </div>
              <Link className="hb-press" style={{ marginTop: "10px", textDecoration: "none", background: "#F0ECFF", color: "#4F25D6", borderRadius: "14px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "12px" }} to="/haiba/points">
                <span style={{ width: "32px", height: "32px", flex: "none", borderRadius: "50%", background: "#6C3FFA", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.2 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4.5"></path>
                    <path d="M12 18.2h.01"></path>
                  </svg>
                </span>
                <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "1px" }}>
                  <span style={{ fontSize: "15.5px", fontWeight: "800" }}>
                    {"How points work"}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#6B5BB8" }}>
                    {"Get points, then use them for free stuff"}
                  </span>
                </span>
              </Link>
            </div>
          </div>
          <div className="hb-rise" style={{ marginTop: "16px", background: "#FFFFFF", borderRadius: "20px", padding: "18px 16px 20px 16px", boxShadow: "0 10px 26px rgba(76,52,140,0.08)" }}>
            <div style={{ fontSize: "17px", fontWeight: "800", letterSpacing: "-0.01em", padding: "0 4px" }}>
              {"Choose your gift from shops like these"}
            </div>
            <div className="hb-pops" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "18px 8px", marginTop: "18px" }}>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
                <Artwork src="/haiba/brands/wingman.webp" alt="" style={{ width: "64px", height: "64px", borderRadius: "16px", objectFit: "cover", display: "block", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.10)" }} />
                <span style={{ fontSize: "13px", fontWeight: "600", lineHeight: "1.25", color: "#2E2A40" }}>
                  {"Student box meal at Wingman"}
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
                <Artwork src="/haiba/brands/vox.webp" alt="" style={{ width: "64px", height: "64px", borderRadius: "16px", objectFit: "cover", display: "block", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.10)" }} />
                <span style={{ fontSize: "13px", fontWeight: "600", lineHeight: "1.25", color: "#2E2A40" }}>
                  {"1 cinema ticket at VOX"}
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
                <Artwork src="/haiba/brands/coffee-bean.webp" alt="" style={{ width: "64px", height: "64px", borderRadius: "16px", objectFit: "cover", display: "block", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.10)" }} />
                <span style={{ fontSize: "13px", fontWeight: "600", lineHeight: "1.25", color: "#2E2A40" }}>
                  {"Free drink at Coffee Bean"}
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
                <Artwork src="/haiba/brands/grip.webp" alt="" style={{ width: "64px", height: "64px", borderRadius: "16px", objectFit: "cover", display: "block", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.10)" }} />
                <span style={{ fontSize: "13px", fontWeight: "600", lineHeight: "1.25", color: "#2E2A40" }}>
                  {"Gym day pass at Grip"}
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
                <Artwork src="/haiba/brands/albayan.webp" alt="" style={{ width: "64px", height: "64px", borderRadius: "16px", objectFit: "cover", display: "block", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.10)" }} />
                <span style={{ fontSize: "13px", fontWeight: "600", lineHeight: "1.25", color: "#2E2A40" }}>
                  {"100ml perfume at Albayan"}
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
                <Artwork src="/haiba/brands/alkuwaiti.webp" alt="" style={{ width: "64px", height: "64px", borderRadius: "16px", objectFit: "cover", display: "block", boxShadow: "0 0 0 1px #ECE8F5, 0 8px 16px rgba(30,27,46,0.10)" }} />
                <span style={{ fontSize: "13px", fontWeight: "600", lineHeight: "1.25", color: "#2E2A40" }}>
                  {"Car wash at Alkuwaiti"}
                </span>
              </span>
            </div>
            <div style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", fontWeight: "600", color: "#3B3654" }}>
              {"New gifts every month. Choose 1 each time."}
            </div>
          </div>
          <div className="hb-rise" style={{ marginTop: "16px" }}>
            <div style={{ background: "#FFFFFF", borderRadius: "18px", padding: "18px 16px 14px 16px", boxShadow: "0 0 0 1.5px #D6CAF7, 0 12px 26px rgba(76,52,140,0.10)" }}>
              <div style={{ fontSize: "18px", fontWeight: "900", letterSpacing: "-0.02em", marginBottom: "14px" }}>
                {"Reserve now, pay later"}
              </div>
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
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", paddingTop: "11px", borderTop: "1px solid #E2DAF6", color: "#4F25D6", fontSize: "13.5px", fontWeight: "700" }}>
                <span style={{ flex: "none", display: "flex" }}>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                  </svg>
                </span>
                {"Changed your mind? We give your BHD 1 back."}
              </div>
            </div>
          </div>
        </div>
        <div className="hb-fixed-bottom"><div className="hb-fixed-inner">
        <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "30px 16px 16px 16px", background: "linear-gradient(180deg, rgba(243,240,250,0) 0%, rgba(243,240,250,1) 30%)", display: "flex", flexDirection: "column", gap: "2px", zIndex: "5" }}>
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
