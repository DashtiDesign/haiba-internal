import { createContext } from "react";

/** Which version of the promo page to show: "Reserve" before launch, "Join" after launch (full price, no deposit). */
export type PromoMode = "Reserve" | "Join";
export const PromoModeContext = createContext<PromoMode>("Reserve");
