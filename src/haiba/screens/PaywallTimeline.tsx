// @ts-nocheck
// Ported 1:1 from the Design canvas board "PaywallTimeline.dc.html". Styles are copied value for value.
import { Fragment } from "react";
import { Link, useNavigate } from "../nav";
import { useHaiba } from "../store";
import Artwork from "../Artwork";
import { useVals } from "../logic/paywalltimeline";

export default function PaywallTimeline() {
  const v: any = useVals();
  const go = useNavigate();
  const hb = useHaiba();
  return (
    <div className="pg-paywalltimeline">
      <div style={{ width: "100%", maxWidth: "390px", margin: "0 auto", minHeight: "100svh", boxSizing: "border-box", background: "#1E1B2E", fontFamily: "Figtree, system-ui, sans-serif", color: "#FFFFFF", position: "relative", overflow: "hidden" }}>
        <span aria-hidden="true" style={{ position: "absolute", right: "-120px", top: "-80px", width: "340px", height: "340px", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,63,250,0.55) 0%, rgba(108,63,250,0) 70%)" }}></span>
        <div style={{ position: "relative", padding: "14px 20px 250px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={v.openExit} aria-label="Close" className="hb-press" style={{ width: "44px", height: "44px", borderRadius: "50%", border: "0", background: "rgba(255,255,255,0.12)", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", padding: "0", cursor: "pointer", boxShadow: "0 0 0 1px rgba(255,255,255,0.2)" }}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18"></path>
              </svg>
            </button>
            <Artwork priority src="/haiba/logo-lime.svg" alt="Haiba" style={{ height: "22px", width: "auto", display: "block" }} />
            <span style={{ width: "44px" }}></span>
          </div>
          <div className="hb-rise" style={{ marginTop: "20px", fontSize: "30px", fontWeight: "900", letterSpacing: "-0.035em", lineHeight: "1.08" }}>
            {"Free stuff all year."}
            <br />
            {"Start with "}
            <span style={{ color: "#C0F402" }}>
              {"BHD 1"}
            </span>
            {"."}
          </div>
          <div className="hb-rise hb-d1" style={{ marginTop: "8px", fontSize: "15px", fontWeight: "600", color: "#CFC9E0" }}>
            {"Haiba is Unipal's student membership."}
          </div>
          <div className="hb-rise hb-d1" style={{ marginTop: "22px" }}>
            <div className="hb-stagger" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "linear-gradient(135deg, #6C3FFA 0%, #4F25D6 100%)", borderRadius: "20px", padding: "14px" }}>
                <span style={{ display: "flex", flex: "none" }}>
                  <Artwork src="/haiba/brands/wingman.webp" alt="" style={{ width: "32px", height: "32px", borderRadius: "10px", objectFit: "cover", display: "block", background: "#F9F9F9", marginLeft: "0", boxShadow: "0 0 0 2px #5A30E8" }} />
                  <Artwork src="/haiba/brands/vox.webp" alt="" style={{ width: "32px", height: "32px", borderRadius: "10px", objectFit: "cover", display: "block", background: "#FFFFFF", marginLeft: "-10px", boxShadow: "0 0 0 2px #5A30E8" }} />
                  <Artwork src="/haiba/brands/coffee-bean.webp" alt="" style={{ width: "32px", height: "32px", borderRadius: "10px", objectFit: "cover", display: "block", background: "#FFFFFF", marginLeft: "-10px", boxShadow: "0 0 0 2px #5A30E8" }} />
                </span>
                <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "16px", fontWeight: "800" }}>
                    {"12 free gifts"}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#E4DBFF" }}>
                    {"1 every month, you pick"}
                  </span>
                </span>
                <span style={{ flex: "none", background: "#C0F402", color: "#1F2600", fontSize: "13px", fontWeight: "800", borderRadius: "999px", padding: "5px 10px" }}>
                  {v.wGifts}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "10px", borderRadius: "16px", padding: "12px 10px", background: "#2A2540" }}>
                  <Artwork src="/haiba/brands/spotify.webp" alt="" style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover", display: "block", background: "#FFFFFF" }} />
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "14px", fontWeight: "800" }}>
                      {"Spotify"}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#B9B3CC" }}>
                      {"3 months free"}
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "10px", borderRadius: "16px", padding: "12px 10px", background: "#2A2540" }}>
                  <Artwork src="/haiba/brands/chatgpt.webp" alt="" style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover", display: "block", background: "#FFFFFF" }} />
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "14px", fontWeight: "800" }}>
                      {"ChatGPT"}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#B9B3CC" }}>
                      {"3 months free"}
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "10px", borderRadius: "16px", padding: "12px 10px", background: "#2A2540" }}>
                  <Artwork src="/haiba/brands/airalo-mark.svg" alt="" style={{ width: "30px", height: "30px", borderRadius: "8px", objectFit: "cover", display: "block", background: "#FFFFFF" }} />
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "14px", fontWeight: "800" }}>
                      {"Travel data"}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#B9B3CC" }}>
                      {"5GB free"}
                    </span>
                  </span>
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#C0F402", color: "#1F2600", borderRadius: "999px", padding: "8px 18px 8px 8px" }}>
                <Artwork src="/haiba/coins/coin-34.webp" alt="" style={{ width: "34px", height: "34px", display: "block", flex: "none" }} />
                <span style={{ fontSize: "14.5px", fontWeight: "800" }}>
                  {"Points every time you use Unipal"}
                </span>
              </div>
            </div>
          </div>
          <div className="hb-rise hb-d2" style={{ marginTop: "30px", fontSize: "12.5px", fontWeight: "800", letterSpacing: "0.12em", textTransform: "uppercase", color: "#B9B3CC" }}>
            {"How it works"}
          </div>
          <div className="hb-stagger" style={{ marginTop: "14px" }}>
            <div style={{ position: "relative", display: "flex", gap: "14px", paddingBottom: "22px" }}>
              <span style={{ position: "absolute", left: "18px", top: "40px", bottom: "-2px", width: "3px", borderRadius: "2px", background: "linear-gradient(180deg, #C0F402 0%, #FFFFFF 100%)" }}></span>
              <span style={{ width: "39px", height: "39px", flex: "none", borderRadius: "50%", background: "#C0F402", color: "#1F2600", boxShadow: "0 0 0 5px rgba(192,244,2,0.22)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "1" }}>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="5" y="10" width="14" height="11" rx="2.5"></rect>
                  <path d="M8 10V7.5a4 4 0 0 1 8 0V10" fill="none" stroke="currentColor" strokeWidth="2.4"></path>
                </svg>
              </span>
              <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px", paddingTop: "1px" }}>
                <span style={{ fontSize: "12.5px", fontWeight: "800", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C0F402" }}>
                  {"Today"}
                </span>
                <span style={{ fontSize: "17px", fontWeight: "800", color: "#FFFFFF" }}>
                  {"Pay BHD 1"}
                </span>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#B9B3CC", lineHeight: "1.4" }}>
                  {"Your price of "}{v.priceYear}{" is locked."}
                </span>
              </span>
            </div>
            <div style={{ position: "relative", display: "flex", gap: "14px", paddingBottom: "0" }}>
              <span style={{ width: "39px", height: "39px", flex: "none", borderRadius: "50%", background: "#FFFFFF", color: "#1E1B2E", boxShadow: "none", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "1" }}>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12v9H4v-9M2 7h20v5H2zM12 7v14M12 7c-2-4-7-4-7-1s5 1 7 1zm0 0c2-4 7-4 7-1s-5 1-7 1z"></path>
                </svg>
              </span>
              <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px", paddingTop: "1px" }}>
                <span style={{ fontSize: "12.5px", fontWeight: "800", letterSpacing: "0.08em", textTransform: "uppercase", color: "#B9B3CC" }}>
                  {"8 Dec"}
                </span>
                <span style={{ fontSize: "17px", fontWeight: "800", color: "#FFFFFF" }}>
                  {"Haiba opens"}
                </span>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#B9B3CC", lineHeight: "1.4" }}>
                  {"Pay the rest: "}{v.rest}{" + VAT."}
                </span>
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "18px", fontSize: "13.5px", fontWeight: "700", color: "#DCD2FF" }}>
            <span style={{ display: "flex", flex: "none", color: "#C0F402" }}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            </span>
            {"Changed your mind? We give your BHD 1 back."}
          </div>
        </div>
        <div className="hb-fixed-bottom hb-cta-dock"><div className="hb-fixed-inner">
        <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", background: "#FFFFFF", color: "#1E1B2E", borderRadius: "24px 24px 0 0", padding: "18px 16px calc(16px + env(safe-area-inset-bottom, 0px)) 16px", zIndex: "5" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "6px" }}>
            <span style={{ fontSize: "22px", fontWeight: "900", letterSpacing: "-0.02em" }}>
              {v.price}{" a year"}
            </span>
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#6B6880" }}>
              {"+ VAT"}
            </span>
          </div>
          <div style={{ textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#6C3FFA", marginTop: "2px" }}>
            {"Only "}{v.perMonth}{" a month"}
          </div>
          <button onClick={v.reserve} className="hb-press" style={{ marginTop: "10px", width: "100%", font: "inherit", border: "0", cursor: "pointer", background: "#C0F402", color: "#1F2600", borderRadius: "999px", padding: "15px 16px", fontSize: "18px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", boxShadow: "0 10px 22px rgba(108,63,250,0.18)" }}>
            {"Reserve for BHD 1"}
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "8px", fontSize: "13.5px", fontWeight: "700", color: "#4A4660" }}>
            <span style={{ color: "#2F7D32", display: "flex" }}>
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5"></path>
              </svg>
            </span>
            {"No commitment. Refundable."}
          </div>
          <button onClick={v.openExit} className="hb-press" style={{ width: "100%", font: "inherit", border: "0", background: "transparent", cursor: "pointer", color: "#6B6880", fontSize: "14.5px", fontWeight: "600", padding: "8px 16px 0 16px" }}>
            {"Not now"}
          </button>
        </div>
        </div></div>
        {v.exitOpen ? (
          <>
          <div className="hb-fade" style={{ position: "fixed", inset: "0", background: "rgba(20,16,40,0.55)", zIndex: "50", display: "flex", alignItems: "flex-end" }}>
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
          <div className="hb-fade" style={{ position: "fixed", inset: "0", background: "rgba(20,16,40,0.55)", zIndex: "51", display: "flex", alignItems: "flex-end" }}>
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
