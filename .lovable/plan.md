# Asset optimization pass

## Biggest wins
1. **Animated hub bird** (hub-shades 1.2MB, hub-coin 1.1MB, hub-idle 0.7MB animated WebP): re-encode at the size they actually display, lower frame count/quality where invisible, and load the shades/coin animations only when triggered (show hub-still first).
2. **Logos / favicon SVGs** (72KB each, identical): minify with SVGO (likely under 10KB); remove the unused duplicate.
3. **Leftover PNGs**: ~16 bird PNGs and the emoji/category PNGs still referenced in some screens — convert to WebP, resize to 2x display size, point every reference at the WebP (via the shared artwork registry) and delete the PNGs.
4. **Card/motion WebPs** (sa/bh cards ~110KB, waiting/gift/wave/bye ~80-110KB): resize to 2x display size and recompress.
5. **Flags** (om.svg 22KB): minify all flag SVGs.

## Loading behaviour
- Add width/height + `loading="lazy"` / `decoding="async"` to below-the-fold images; keep only first-screen art eager and preloaded.
- Check fonts: preload only the two weights used above the fold, `font-display: swap`, drop unused weights.
- Welcome videos already optimized — leave as is.

## Verification
- Before/after total size table.
- Visual check of home, hub, plans, welcome and promo pages on a phone-size screen to confirm nothing looks blurrier or shifted.
- Run existing tests.
