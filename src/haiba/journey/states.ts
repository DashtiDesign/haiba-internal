import type { Country, Settings } from "./settings";
import { addDays, addMonths, realToday } from "./format";

/**
 * The student state machine.
 * Not reserved -> Payment pending -> Reserved -> Pay the rest open -> Member -> Renewal due -> Member, or Ended.
 * Side exits: Reserved -> Refund requested -> Refunded (or Refund failed).
 * Pay the rest open -> Hold expired -> Refunded. Any payment -> Payment failed -> retry.
 * Member -> Cancelled (no refund) -> Ended.
 */
export type Status =
  | "not_reserved"
  | "payment_pending"
  | "reserved"
  | "refund_requested"
  | "refunded"
  | "refund_failed"
  | "pay_rest_open"
  | "hold_expired"
  | "member"
  | "renewal_due"
  | "cancelled"
  | "ended";

/** What a payment was for. All of them go through the one Tap placeholder page. */
export type PayKind = "deposit" | "rest" | "join" | "card" | "renew";

export type PayOutcome = "success" | "failed" | "pending";

export type FailReason = "declined" | "funds" | "expired" | "cancelled" | "timeout";

export type Payment = {
  kind: PayKind;
  outcome: PayOutcome; // what the Tap placeholder chose; the webhook later confirms it
  startedAt: number; // ms, for the confirming timeout
  amount: number;
  reason?: FailReason;
};

export type Journey = {
  status: Status;
  lockedPrice: number | null; // yearly price before VAT, locked by the deposit
  lockedCountry: Country | null;
  depositPaidOn: string | null; // YYYY-MM-DD
  restPaidOn: string | null;
  memberSince: string | null;
  renewsOn: string | null;
  refundOn: string | null; // when the refund was asked for or started
  cancelledOn: string | null;
  payment: Payment | null; // the payment waiting for a Tap result
  failure: { kind: PayKind; reason: FailReason } | null; // last failed payment, for the failed screen
  card: { brand: string; last4: string } | null; // saved by Tap with the first payment
};

export const EMPTY_JOURNEY: Journey = {
  status: "not_reserved",
  lockedPrice: null,
  lockedCountry: null,
  depositPaidOn: null,
  restPaidOn: null,
  memberSince: null,
  renewsOn: null,
  refundOn: null,
  cancelledOn: null,
  payment: null,
  failure: null,
  card: null,
};

/** Every state the prototype panel can jump to. Some states have two set ups (before or after launch, new or active member). */
export type Preset = Status | "not_reserved_after_launch" | "member_new" | "member_active";

export const PRESETS: { id: Preset; label: string; group: string }[] = [
  { id: "not_reserved", label: "Not reserved", group: "Before launch" },
  { id: "payment_pending", label: "Payment pending", group: "Before launch" },
  { id: "reserved", label: "Reserved", group: "Before launch" },
  { id: "refund_requested", label: "Refund in progress", group: "Before launch" },
  { id: "refunded", label: "Refunded", group: "Before launch" },
  { id: "refund_failed", label: "Refund failed", group: "Before launch" },
  { id: "pay_rest_open", label: "Pay the rest open", group: "At launch" },
  { id: "hold_expired", label: "Hold expired", group: "At launch" },
  { id: "not_reserved_after_launch", label: "Never reserved", group: "At launch" },
  { id: "member_new", label: "Member, just joined", group: "Member" },
  { id: "member_active", label: "Member, active", group: "Member" },
  { id: "renewal_due", label: "Renewal due", group: "Member" },
  { id: "cancelled", label: "Cancelled", group: "Member" },
  { id: "ended", label: "Ended", group: "Member" },
];

export const CARD: Record<Country, { brand: string; last4: string }> = {
  bh: { brand: "Visa", last4: "4242" },
  sa: { brand: "Mada", last4: "8810" },
};

/**
 * Builds a believable journey for a preset, plus the prototype clock and member type that go with it.
 * price is the price this student is offered today in this country.
 */
export function presetJourney(
  preset: Preset,
  settings: Settings,
  country: Country,
  price: number,
): { journey: Journey; today: string | null; member: "none" | "new" | "active" } {
  const launch = settings.launchDate;
  const real = realToday();
  // Before launch states use the real date when it is before launch, else 10 days before launch.
  const before = real < launch ? null : addDays(launch, -10);
  const beforeDay = before ?? real;
  const reserved: Journey = {
    ...EMPTY_JOURNEY,
    status: "reserved",
    lockedPrice: price,
    lockedCountry: country,
    depositPaidOn: addDays(beforeDay, -2),
    card: CARD[country],
  };
  const joined = addDays(launch, 1);
  const member: Journey = {
    ...reserved,
    status: "member",
    restPaidOn: joined,
    memberSince: joined,
    renewsOn: addMonths(joined, 12),
  };

  switch (preset) {
    case "not_reserved":
      return { journey: EMPTY_JOURNEY, today: before, member: "none" };
    case "not_reserved_after_launch":
      return { journey: EMPTY_JOURNEY, today: addDays(launch, 2), member: "none" };
    case "payment_pending":
      return {
        journey: {
          ...EMPTY_JOURNEY,
          status: "payment_pending",
          payment: {
            kind: "deposit",
            outcome: "pending",
            startedAt: Date.now(),
            amount: settings.deposit[country],
          },
        },
        today: before,
        member: "none",
      };
    case "reserved":
      return { journey: reserved, today: before, member: "none" };
    case "refund_requested":
      return {
        journey: { ...reserved, status: "refund_requested", refundOn: beforeDay },
        today: before,
        member: "none",
      };
    case "refunded":
      return {
        journey: { ...reserved, status: "refunded", refundOn: addDays(beforeDay, -3) },
        today: before,
        member: "none",
      };
    case "refund_failed":
      return {
        journey: { ...reserved, status: "refund_failed", refundOn: addDays(beforeDay, -3) },
        today: before,
        member: "none",
      };
    case "pay_rest_open":
      return {
        journey: { ...reserved, status: "pay_rest_open" },
        today: addDays(launch, 2),
        member: "none",
      };
    case "hold_expired":
      return {
        journey: {
          ...reserved,
          status: "hold_expired",
          refundOn: addDays(launch, settings.holdDays),
        },
        today: addDays(launch, settings.holdDays + 1),
        member: "none",
      };
    case "member":
    case "member_new":
      return { journey: member, today: joined, member: "new" };
    case "member_active":
      return { journey: member, today: addDays(joined, 40), member: "active" };
    case "renewal_due":
      return {
        journey: { ...member, status: "renewal_due" },
        today: addDays(member.renewsOn!, -20),
        member: "active",
      };
    case "cancelled":
      return {
        journey: { ...member, status: "cancelled", cancelledOn: addDays(joined, 60) },
        today: addDays(joined, 61),
        member: "active",
      };
    case "ended":
      return {
        journey: { ...member, status: "ended" },
        today: addDays(member.renewsOn!, 3),
        member: "none",
      };
  }
}
