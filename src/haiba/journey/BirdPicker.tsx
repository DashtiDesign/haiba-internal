import { useEffect, useState } from "react";
import { useNavigate } from "../nav";
import type { Session } from "./session";
import {
  LOOK_NAMES,
  LOOK_TIER,
  lookThumb,
  ownedLooks,
  savedLook,
  stageOf,
  wearLook,
} from "../looks";

/**
 * 12 Nov: "Your bird" in the Haiba profile (/haiba/membership#bird). The looks you own, tap one to put it on your hub.
 * The small hanger button next to the hub bird opens this section. New looks are bought in the points store.
 * Only thumbnails show here; the animation itself loads on the hub (see looks.ts).
 * Each look stands on a small stage coloured by its tier (night stage for legendary), like an outfit picker in a game.
 * The one on the hub has a purple ring and a lime check.
 */
export function BirdPicker({ s }: { s: Session }) {
  const go = useNavigate();
  // Saved on the phone, so it is read once the page runs (the first render matches the server).
  const [owned, setOwned] = useState<string[]>(["classic"]);
  const [wear, setWear] = useState("classic");
  useEffect(() => {
    setOwned(ownedLooks());
    setWear(savedLook());
    if (window.location.hash === "#bird") {
      document.getElementById("bird")?.scrollIntoView({ block: "start" });
    }
  }, []);
  const pick = (id: string) => {
    wearLook(id);
    setWear(id);
  };
  return (
    <section id="bird" className="jx-group" style={{ scrollMarginTop: 12 }}>
      <div
        className="jx-group-head"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <span>{s.t("memBird")}</span>
        <button
          className="hb-press"
          onClick={() => go("/haiba/rewards")}
          style={{
            font: "inherit",
            border: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "#EDE6FF",
            color: "#4F25D6",
            borderRadius: 999,
            padding: "5px 10px 5px 12px",
            fontSize: 13,
            fontWeight: 800,
            textTransform: "none",
            letterSpacing: 0,
          }}
        >
          {s.t("memBirdMore")}
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          margin: "0 -16px",
          padding: "4px 16px 8px 16px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {owned.map((id) => {
          const on = id === wear;
          const legend = LOOK_TIER[id] === "legend";
          return (
            <button
              key={id}
              onClick={() => pick(id)}
              aria-pressed={on}
              aria-label={LOOK_NAMES[id] ?? id}
              className="hb-press"
              style={{
                font: "inherit",
                flex: "none",
                width: 104,
                border: 0,
                padding: 4,
                cursor: "pointer",
                background: "#FFFFFF",
                color: "#1E1B2E",
                borderRadius: 18,
                textAlign: "center",
                boxShadow: on
                  ? "0 0 0 2.5px #6C3FFA, 0 8px 18px rgba(108,63,250,0.18)"
                  : "0 0 0 1px #ECE8F5, 0 4px 12px rgba(76,52,140,0.06)",
              }}
            >
              <span
                style={{
                  position: "relative",
                  display: "block",
                  height: 118,
                  borderRadius: 14,
                  background: stageOf(id),
                  overflow: "hidden",
                }}
              >
                {/* his shadow on the ground */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: 10,
                    width: 56,
                    height: 10,
                    marginLeft: -28,
                    borderRadius: "50%",
                    background: legend ? "rgba(0,0,0,0.45)" : "rgba(30,27,46,0.22)",
                    filter: "blur(3px)",
                  }}
                />
                <img
                  src={lookThumb(id)}
                  alt=""
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: 6,
                    height: 108,
                    width: "auto",
                    transform: "translateX(-50%)",
                    display: "block",
                  }}
                />
                {on && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      right: 6,
                      top: 6,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "#C0F402",
                      color: "#1F2600",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
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
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                )}
              </span>
              <span
                style={{
                  display: "block",
                  padding: "8px 4px 2px 4px",
                  fontSize: 13,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  minHeight: 31,
                }}
              >
                {LOOK_NAMES[id] ?? id}
              </span>
              <span
                style={{
                  display: "block",
                  paddingBottom: 4,
                  fontSize: 11.5,
                  fontWeight: 800,
                  color: on ? "#6C3FFA" : "#8F89A8",
                }}
              >
                {on ? s.t("memBirdOn") : s.t("memBirdWear")}
              </span>
            </button>
          );
        })}
        {/* With only a look or two, a tile fills the row; the header button covers it after that. */}
        {owned.length < 3 && (
          <button
            onClick={() => go("/haiba/rewards")}
            className="hb-press"
            style={{
              font: "inherit",
              flex: "none",
              width: 104,
              border: 0,
              borderRadius: 18,
              background: "#FFFFFF",
              boxShadow: "0 0 0 1px #ECE8F5, 0 4px 12px rgba(76,52,140,0.06)",
              color: "#1E1B2E",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: 10,
              fontSize: 13,
              fontWeight: 800,
              lineHeight: 1.25,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#1E1B2E",
                color: "#C0F402",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            {s.t("memBirdEmpty")}
          </button>
        )}
      </div>
    </section>
  );
}
