# Promo and paywall pages: flush buttons and correct page height

## Goal
- The bottom button panel sits flush with the screen's bottom edge on every promo/paywall page (no strip of page showing underneath, as in the screenshot).
- Pages whose content fits one screen fill it exactly with no small leftover scroll.
- Pages with more content than one screen still scroll normally, and their last content isn't hidden behind the button panel.

## Pages covered
Paywall: Base, Story, Table, Timeline, Plans Convert. Promo: Compare, Dream, Gift, Value, Waitlist, Winback, Year.

## Steps
1. Measure every page above at 320x568, 375x667, 390x844 and 430x932 (Playwright): gap below the button panel, page height vs screen height, overflow amount.
2. Button panels: give each page's bottom panel the same flush treatment already used on Plans (sits at the very bottom and paints its own home-indicator padding), so no page background shows beneath it.
3. Height: switch these pages from the classic screen-height unit to the dynamic one that matches the visible phone screen (browser bars excluded), and remove stray bottom padding/margins that add a few extra pixels.
4. Bottom spacer: size each page's bottom space to the button panel's real height (plus safe area), so short pages don't overflow and tall pages don't hide content.
5. Re-measure all pages at the same sizes; confirm zero gap, zero overflow on fit-in-one-screen pages, and full visibility of last content on tall pages. Screenshot check.

## Technical details
- Root cause of the gap: `.hb-fixed-bottom { bottom: env(safe-area-inset-bottom) }` in `haiba.css` lifts every docked panel above the home indicator; only `.hb-cta-dock` (Plans) overrides it. Add `hb-cta-dock` to the promo/paywall docks and move safe-area into the dock's padding.
- Replace `minHeight: 100vh` with a shared class using `min-height: 100svh` (fallback 100vh) via a named screen class (e.g. `.pg-paywall`) in `haiba.css`, per the shared mobile-sizing rule.
- Bottom spacers become `calc(<dock height> + env(safe-area-inset-bottom))` rather than fixed px guesses.
