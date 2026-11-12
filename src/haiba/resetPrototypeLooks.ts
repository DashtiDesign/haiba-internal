const RESET_KEY = "haiba-looks-reset-2026-11-12";

/** Reset old prototype purchases once, without erasing later test purchases. */
export function resetPrototypeLooks() {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(RESET_KEY) === "done") return;
    window.localStorage.setItem("haiba-looks-owned", JSON.stringify(["classic"]));
    window.localStorage.setItem("haiba-look", "classic");
    window.sessionStorage.removeItem("hb-look-pick");
    window.localStorage.setItem(RESET_KEY, "done");
  } catch {
    // Storage may be unavailable in private browsing.
  }
}