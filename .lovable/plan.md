Replace every "Sara" with "Yusuf" across the app.

- Default name shown on all paywall and promo pages (base, story, table, timeline, plans convert, dream, winback, year) becomes "Yusuf".
- Basket page name "Sara Ahmed" becomes "Yusuf Ahmed".
- Developer notes mentioning `name=Sara` updated to `name=Yusuf`.

Technical: swap `'Sara'`/`"Sara"` fallbacks in src/haiba/logic/*.ts, the literal in Basket.tsx, and comments in route files and dc.ts. Then search to confirm no "Sara" remains.
