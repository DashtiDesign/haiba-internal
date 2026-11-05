import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { Navigate } from "../../nav";
import { Button, Screen } from "../ui";
import { useSession } from "../session";
import { amountFor, pathFor, useJourneyActions } from "../actions";
import type { FailReason, PayKind } from "../states";

const KINDS: PayKind[] = ["deposit", "rest", "join", "card", "renew"];
const REASONS: [FailReason, string][] = [
  ["declined", "Card declined"],
  ["funds", "Not enough money"],
  ["expired", "Card expired"],
  ["timeout", "Tap timed out"],
];

/**
 * One shared stand in for the Tap checkout. Deposit, pay the rest, join, renew and update card all open it.
 * The tester picks Success, Failed or Pending. The result is applied when the simulated webhook arrives.
 * Swap this page for the real Tap checkout later; the screens around it stay the same.
 */
export default function Tap() {
  const s = useSession();
  const a = useJourneyActions();
  const [reason, setReason] = useState<FailReason>("declined");
  const search = useRouterState({ select: (r) => r.location.search }) as Record<string, unknown>;
  const kind = (KINDS.includes(search["for"] as PayKind) ? search["for"] : "deposit") as PayKind;
  const newCard = search["card"] === "new" || !s.journey.card;
  const p = s.journey.payment;

  // Opened without a payment in progress (for example a refresh after it finished).
  if (s.hb.ready && s.valid && !p) return <Navigate to={pathFor(s.journey.status)} replace />;

  const amount = p?.amount ?? amountFor(kind, s);
  const card = s.journey.card;

  return (
    <Screen className="jx-tap" guard>
      <div className="jx-tap-head">
        <span className="jx-tap-brand">
          <span className="jx-tap-mark">tap</span>
          {s.t("tapStandIn")}
        </span>
        <Lock size={18} aria-hidden="true" />
      </div>

      <div className="jx-tap-box">
        <div className="jx-small">{s.t("tapMerchant")}</div>
        <div style={{ fontWeight: 800, marginTop: 2 }}>
          {s.t(("tapFor_" + kind) as "tapFor_deposit")}
        </div>
        {kind !== "card" && (
          <>
            <div className="jx-small" style={{ marginTop: 14 }}>
              {s.t("tapAmount")}
            </div>
            <div className="jx-tap-amount jx-num">{s.m(amount)}</div>
          </>
        )}
        <div className="jx-small" style={{ marginTop: 14 }}>
          {newCard ? s.t("tapCardNew") : s.t("tapCardSaved")}
        </div>
        <div className="jx-tap-field">
          <CreditCard size={18} aria-hidden="true" />
          <span className="jx-num" dir="ltr">
            {newCard ? "•••• •••• •••• ••••" : `${card!.brand} •••• ${card!.last4}`}
          </span>
        </div>
        <p className="jx-small" style={{ margin: "10px 0 0" }}>
          {s.t("tapSaveNote")}
        </p>
      </div>

      <div className="jx-tap-sim" dir="ltr" lang="en">
        <div className="jx-tap-sim-title">Prototype: choose what Tap answers</div>
        <div className="jx-tap-btns">
          <Button variant="good" onClick={() => a.tapResult("success")}>
            Success
          </Button>
          <Button variant="bad" onClick={() => a.tapResult("failed", reason)}>
            Failed
          </Button>
          <Button variant="warn" onClick={() => a.tapResult("pending")}>
            Pending
          </Button>
        </div>
        <select
          className="jx-select"
          value={reason}
          onChange={(e) => setReason(e.target.value as FailReason)}
          aria-label="Failure reason"
        >
          {REASONS.map(([r, label]) => (
            <option key={r} value={r}>
              If failed: {label}
            </option>
          ))}
        </select>
      </div>

      <div className="jx-actions">
        <Button variant="ghost" onClick={a.abandon}>
          {s.t("tapBack")}
        </Button>
      </div>
    </Screen>
  );
}
