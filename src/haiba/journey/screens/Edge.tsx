import { useState } from "react";
import { Check, Lock, MapPin, ShieldCheck, Users } from "lucide-react";
import { useNavigate } from "../../nav";
import { Button, Screen } from "../ui";
import { useSession, type Session } from "../session";
import { Result, Tag } from "./Member";

/**
 * Edge states decided on 7 Nov:
 * student status not verified or expired, reservation spots full, and Haiba opened in another country.
 */

export type StudentAction = "reserve" | "join" | "renew";

const ACTION_KEY = { reserve: "stuActReserve", join: "stuActJoin", renew: "stuActRenew" } as const;

export function countryName(s: Session, c: "bh" | "sa" | null) {
  return s.t(c === "sa" ? "countrySa" : "countryBh");
}

/** Haiba is for students only. Shown at reserve, join and renewal when the Unipal student status is not active. */
export function NotStudent({ action }: { action: StudentAction }) {
  const s = useSession();
  const go = useNavigate();
  const expired = s.student === "expired";
  const back = action === "renew" ? "/haiba/membership" : "/";
  return (
    <Screen
      dock={
        <>
          <Button variant="primary" onClick={() => undefined}>
            {s.t(expired ? "stuCtaExpired" : "stuCtaUnverified")}
          </Button>
          <Button variant="ghost" onClick={() => go(back)}>
            {s.t("stuNotNow")}
          </Button>
        </>
      }
    >
      <Result tone={expired ? "warn" : "lilac"} bird="21-student-id" back={back}>
        <h1 className="jx-h1 jx-res-title">
          {s.t(expired ? "stuTitleExpired" : "stuTitleUnverified")}
        </h1>
        <p className="jx-sub">
          {s.t(expired ? "stuBodyExpired" : "stuBodyUnverified", {
            action: s.t(ACTION_KEY[action]),
          })}
        </p>
        <ol className="jx-howto jx-howto-light jx-edge-steps">
          {(["stuStep1", "stuStep2", "stuStep3"] as const).map((k, i) => (
            <li key={k}>
              <span className="jx-howto-n">{i + 1}</span>
              <span>{s.t(k)}</span>
            </li>
          ))}
        </ol>
      </Result>
    </Screen>
  );
}

/** Reservations are capped per country. When the cap is reached, new students wait for launch. */
export function SpotsFull() {
  const s = useSession();
  const [reminded, setReminded] = useState(false);
  const country = countryName(s, s.c);
  const cap = s.settings.spotsCap[s.c];
  const date = s.d(s.launch, { weekday: true });
  return (
    <Screen
      dock={
        <>
          {reminded ? (
            <Button variant="soft" icon={<Check size={18} aria-hidden="true" />} disabled>
              {s.t("fullReminded", { date })}
            </Button>
          ) : (
            <Button variant="primary" onClick={() => setReminded(true)}>
              {s.t("fullRemind")}
            </Button>
          )}
          <p className="jx-dock-note">{s.t("fullNote")}</p>
        </>
      }
    >
      <Result tone="dark" bird="22-rope" back="/">
        <h1 className="jx-h1 jx-res-title">{s.t("fullTitle", { country })}</h1>
        <p className="jx-sub">{s.t("fullBody", { cap, country, date })}</p>
        <div className="jx-spots">
          <span className="jx-tk-time-row">
            <span className="jx-row-title">{country}</span>
            <b className="jx-num">
              {cap} / {cap}
            </b>
          </span>
          <span className="jx-bar">
            <span style={{ width: "100%" }} />
          </span>
        </div>
      </Result>
    </Screen>
  );
}

/** Haiba is tied to the country the student reserved or joined in. Another country shows this, not a new price. */
export function Elsewhere() {
  const s = useSession();
  const go = useNavigate();
  const country = countryName(s, s.home);
  const member = !["reserved", "refund_requested", "refund_failed", "pay_rest_open"].includes(
    s.journey.status,
  );
  return (
    <Screen
      dock={
        <Button variant="primary" onClick={() => go("/")}>
          {s.t("elseCta")}
        </Button>
      }
    >
      <Result tone="lilac" bird="23-map" back="/">
        <h1 className="jx-h1 jx-res-title">{s.t("elseTitle", { country })}</h1>
        <p className="jx-sub">{s.t(member ? "elseBodyMember" : "elseBodyReserved", { country })}</p>
        <div className="jx-back-card">
          <span className="jx-back-coin">
            <MapPin size={22} aria-hidden="true" />
          </span>
          <span className="jx-row-main">
            <span className="jx-row-title">{s.t("elseHow", { country })}</span>
          </span>
        </div>
        <div className="jx-back-card jx-back-card-lime" style={{ marginTop: 10 }}>
          <span className="jx-back-coin">
            <Lock size={20} aria-hidden="true" />
          </span>
          <span className="jx-row-main">
            <span className="jx-row-sub">
              {s.t("elseKeep", { what: s.t(member ? "elseWhatMember" : "elseWhatReserved") })}
            </span>
          </span>
        </div>
      </Result>
    </Screen>
  );
}
