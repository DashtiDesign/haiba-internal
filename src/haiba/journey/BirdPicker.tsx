import { useEffect, useState } from "react";
import { useNavigate } from "../nav";
import type { Session } from "./session";
import {
  LOOK_NAMES,
  lookAnchor,
  lookDrop,
  lookHeight,
  lookThumb,
  ownedLooks,
  savedLook,
  wearLook,
} from "../looks";

/**
 * 12 Nov: "Your bird" in the Haiba profile (/haiba/membership#bird). The looks you own, tap one to put it on your hub.
 * The small hanger button next to the hub bird opens this section; "Get more looks" opens the Bird looks page.
 * Flat tiles like the Bird looks page (Duolingo and Alan style). The one on the hub has a purple ring and a lime check.
 * Only thumbnails show here; the animation itself loads on the hub (see looks.ts).
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
  const more = () => {
    try {
      window.sessionStorage.removeItem("hb-look-pick");
    } catch {
      /* private mode */
    }
    go("/haiba/looks");
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
          onClick={more}
          style={{
            font: "inherit",
            border: 0,
            background: "transparent",
            padding: 0,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 800,
            color: "#6C3FFA",
            textTransform: "none",
            letterSpacing: 0,
          }}
        >
          {s.t("memBirdMore")}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          margin: "0 -16px",
          padding: "2px 16px 6px 16px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {owned.map((id) => {
          const on = id === wear;
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
                padding: 0,
                cursor: "pointer",
                background: on ? "#EFE9FF" : "#FFFFFF",
                color: "#1E1B2E",
                borderRadius: 16,
                overflow: "hidden",
                textAlign: "center",
                boxShadow: on ? "inset 0 0 0 2px #6C3FFA" : "none",
              }}
            >
              <span
                style={{ position: "relative", display: "block", height: 112, overflow: "hidden" }}
              >
                <img
                  src={lookThumb(id)}
                  alt=""
                  style={{
                    position: "absolute",
                    left: "50%",
                    // a look with room below his feet (the puppy) moves down, so his feet stay on the line
                    bottom: -2 - 108 * lookHeight(id) * lookDrop(id),
                    height: 108 * lookHeight(id),
                    width: "auto",
                    maxWidth: "none",
                    transform: `translateX(-${lookAnchor(id)}%)`,
                    display: "block",
                  }}
                />
                {on && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      right: 7,
                      top: 7,
                      width: 22,
                      height: 22,
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
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                )}
              </span>
              <span
                style={{
                  display: "block",
                  padding: "7px 6px 0 6px",
                  fontSize: 13,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {LOOK_NAMES[id] ?? id}
              </span>
              <span
                style={{
                  display: "block",
                  padding: "3px 6px 10px 6px",
                  fontSize: 12.5,
                  fontWeight: 800,
                  color: on ? "#4F25D6" : "#8F89A8",
                }}
              >
                {on ? s.t("memBirdOn") : s.t("memBirdWear")}
              </span>
            </button>
          );
        })}
        {/* With only a look or two, a tile fills the row; the header link covers it after that. */}
        {owned.length < 3 && (
          <button
            onClick={more}
            className="hb-press"
            style={{
              font: "inherit",
              flex: "none",
              width: 104,
              border: 0,
              borderRadius: 16,
              background: "#FFFFFF",
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
