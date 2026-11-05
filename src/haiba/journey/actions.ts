import { useNavigate } from "../nav";
import {
  CARD,
  EMPTY_JOURNEY,
  type FailReason,
  type Journey,
  type PayKind,
  type Status,
} from "./states";
import { useSession, type Session } from "./session";

/**
 * Where each student state lands. Every Haiba link and deep link goes through this,
 * so a student who already reserved never sees the price page again.
 */
export function pathFor(status: Status): string {
  switch (status) {
    case "not_reserved":
      return "/haiba/reserve";
    case "payment_pending":
      return "/haiba/confirming";
    case "reserved":
      return "/haiba/reserved";
    case "refund_requested":
    case "refunded":
    case "refund_failed":
      return "/haiba/refund";
    case "pay_rest_open":
    case "hold_expired":
      return "/haiba/reserved"; // pay the rest and hold expired screens come in flow 1b
    case "member":
    case "renewal_due":
    case "cancelled":
      return "/haiba";
    case "ended":
      return "/haiba/reserve";
  }
}

// Payments already applied, by payment id. Stands in for the backend's check on the Tap charge id,
// so a webhook that arrives twice never reserves or charges twice.
const applied = new Set<number>();

/** What each payment costs right now. */
export function amountFor(kind: PayKind, s: Session) {
  if (kind === "deposit") return s.deposit;
  if (kind === "rest") return s.rest;
  if (kind === "card") return 0;
  return s.total; // join after launch, or renew
}

/**
 * Payments in the prototype. The student goes to the one Tap placeholder page,
 * the placeholder picks a result, and the result is applied only when the (simulated) Tap webhook arrives,
 * never because the student came back to the page.
 */
export function useJourneyActions() {
  const s = useSession();
  const go = useNavigate();
  const set = s.hb.setJourney;

  const startPayment = (kind: PayKind, newCard = false) => {
    const patch: Partial<Journey> = {
      payment: { kind, outcome: "pending", startedAt: Date.now(), amount: amountFor(kind, s) },
      failure: null,
    };
    set(patch); // the deposit becomes "payment pending" when the student comes back from Tap

    go(`/haiba/tap?for=${kind}${newCard ? "&card=new" : ""}`);
  };

  /** The Tap placeholder buttons. */
  const tapResult = (
    outcome: "success" | "failed" | "pending",
    reason: FailReason = "declined",
  ) => {
    const p = s.journey.payment;
    if (!p) {
      go(pathFor(s.journey.status));
      return;
    }
    set({
      payment: { ...p, outcome, reason: outcome === "failed" ? reason : undefined },
      ...(p.kind === "deposit" ? { status: "payment_pending" as const } : {}),
    });
    go("/haiba/confirming");
  };

  /** Student pressed back on the Tap page: nothing was paid, nothing changes. */
  const abandon = () => {
    const p = s.journey.payment;
    set({ payment: null, status: p?.kind === "deposit" ? "not_reserved" : s.journey.status });
    go(p?.kind === "deposit" ? "/haiba/reserve" : pathFor(s.journey.status));
  };

  /**
   * The Tap webhook. Safe to receive twice: a second confirmation for a payment
   * that is already applied changes nothing, so nobody is reserved or charged twice.
   */
  const webhook = (outcome: "success" | "failed", reason: FailReason = "declined") => {
    const j = s.journey;
    const p = j.payment;
    if (!p || applied.has(p.startedAt)) return null; // duplicate or late webhook, already applied
    applied.add(p.startedAt);
    if (outcome === "failed") {
      set({
        payment: null,
        failure: { kind: p.kind, reason },
        status: p.kind === "deposit" ? "not_reserved" : j.status,
      });
      return "/haiba/failed";
    }
    if (p.kind === "deposit") {
      set({
        ...EMPTY_JOURNEY,
        status: "reserved",
        lockedPrice: s.price,
        lockedCountry: s.c,
        depositPaidOn: s.today,
        card: j.card ?? CARD[s.c],
      });
      return "/haiba/reserved?just=1";
    }
    if (p.kind === "card") {
      set({ payment: null, card: { ...CARD[s.c], last4: "1881" } });
      return pathFor(j.status);
    }
    // rest, join and renew are finished in flows 1b and 3
    set({ payment: null });
    return pathFor(j.status);
  };

  const cancelReservation = () => {
    set({ status: "refund_requested", refundOn: s.today });
    go("/haiba/refund");
  };

  const reserveAgain = () => {
    set({ ...EMPTY_JOURNEY, card: s.journey.card });
    go("/haiba/reserve");
  };

  return { startPayment, tapResult, abandon, webhook, cancelReservation, reserveAgain };
}
