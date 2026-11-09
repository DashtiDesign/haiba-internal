import { useHaiba, type GiftPick } from "../store";
import { BRANDS, GIFTS, type Gift } from "./data";

/**
 * This month's Unipass gift (9 Nov). One gift a month: pick it (the code shows), then the shop uses it.
 * A code that runs out simply goes away and the student can pick again. No expired screen.
 * The hub, the Unipass page, the code screen and the savings all read this one value.
 */
export type GiftStatus = "none" | "active" | "used";

export function giftNow(pick: GiftPick | null, today: string) {
  const live = pick && pick.month === today.slice(0, 7) ? pick : null;
  const gift: Gift | null = live ? (GIFTS.find((g) => g.id === live.id) ?? null) : null;
  const status: GiftStatus = live && gift ? live.status : "none";
  return {
    status,
    gift,
    brand: gift ? BRANDS[gift.brand] : undefined,
    usedOn: live?.status === "used" ? live.on : null,
    // BHD saved this month from the gift (0 until the shop uses the code)
    saved: status === "used" && gift ? gift.value : 0,
  };
}

export function useGift(today: string) {
  const hb = useHaiba();
  const now = giftNow(hb.state.gift, today);
  const month = today.slice(0, 7);
  return {
    ...now,
    pick: (id: string) => hb.set({ gift: { id, status: "active", month, on: today } }),
    use: () =>
      hb.state.gift &&
      hb.set({ gift: { ...hb.state.gift, status: "used", on: today }, giftEver: true }),
    // cancelled or ran out: gone, they can pick again
    drop: () => hb.set({ gift: null }),
  };
}
