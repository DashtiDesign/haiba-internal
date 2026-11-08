# Haiba internal prototype

A clickable prototype of Haiba, the Unipal membership, for the internal test. It uses fake data only.

## What we are testing

1. Can a new member get from joining to a first reward?
2. Is "you saved" clear?
3. Does the basket and code flow make sense?

## The flow

| Screen                                            | Path                       |
| ------------------------------------------------- | -------------------------- |
| Unipal home (stand-in)                            | `/`                        |
| Haiba tab: lands on the screen for the student's state (members see the hub) | `/haiba` |
| Main promo page (one of the paywall arms, picked in the panel): price, VAT, deposit, refund rules | `/haiba/reserve`           |
| Tap checkout stand in (Success, Failed, Pending)  | `/haiba/tap`               |
| Confirming your payment (waits for the Tap webhook) | `/haiba/confirming`      |
| Payment did not go through                        | `/haiba/failed`            |
| Reserved: countdown, what happens next, cancel    | `/haiba/reserved`          |
| Refund in progress, refunded, refund failed       | `/haiba/refund`            |
| Haiba tab: plans for non members, hub for members | `/haiba`                   |
| Old join page, now sends to the Haiba page        | `/haiba/plans`             |
| How points work                                   | `/haiba/points`            |
| How it works (after joining)                      | `/haiba/welcome`           |
| Points wallet (out of the flow, kept for reference) | `/haiba/wallet`          |
| System states preview (loading, empty, error, offline, safe error) | `/haiba/status?show=error` |
| Basket and codes (out of the flow, kept for reference) | `/haiba/basket`       |
| Reservations closed (after 30 Nov, before launch) | `/haiba/reserve`           |
| Pay the rest at launch, price hold ended          | `/haiba/pay`, `/haiba/expired` |
| Join after launch (main promo page in join mode), payment done | `/haiba/join`, `/haiba/paid` |
| Your points (earn and spend in one place)         | `/haiba/rewards`           |
| Reward or gift code: active, expired, cancelled, used | `/haiba/code?kind=reward&state=used` |
| Activity                                          | `/haiba/activity`          |
| Unipass gifts: pick, used, month end, lost, last  | `/haiba/unipass?view=used` |
| Subscriptions (Spotify, ChatGPT), code, all claimed | `/haiba/subscriptions`, `/haiba/subscription?id=spotify`, `?id=chatgpt&claimed=1` |
| Membership: active, cancelled, renewal, cancel sheet | `/haiba/membership?view=renewal` |
| Receipts, year ended                              | `/haiba/receipts`, `/haiba/ended` |
| You saved, Help                                   | `/haiba/saved`, `/haiba/help` |
| Student status (not verified, expired)            | `/haiba/student?for=reserve` (also shown at reserve, join, renewal) |
| Loading skeletons                                 | add `?loading=1` to `/haiba`, `/haiba/rewards`, `/haiba/unipass`, `/haiba/membership` |
| Shop page, The Coffee Bean                        | `/shop/coffee-bean`        |
| Redeem an offer, earn points                      | `/shop/coffee-bean/redeem` |

Reserve on the Haiba page, pick Success on the Tap stand in, and the simulated webhook reserves your spot. A student becomes reserved only when the webhook arrives, never because they came back from Tap, and a webhook sent twice changes nothing. The panel can send the webhook by hand for a Pending payment.

Rewards: on the shop page, tap Use on a reward, confirm, and the code shows right there. One code per item, no basket. Held codes also show on the hub under Ready to use; tap one to show it.

## App parameters

The Unipal app opens every Haiba page with `user_id`, `lang` (`en` or `ar`) and `country` (`bahrain` or `saudi`). They stay in the URL as the student moves between pages. The stand in home at `/` adds `user_id=100245&lang=en&country=bahrain` when they are missing, like the real app would.

New screens read them only through `src/haiba/journey/session.ts`, so a signed token can replace the plain `user_id` later. A missing or edited `user_id`, or an unknown country, shows a safe error page with no student data.

Arabic is right to left. New screens use start and end, never left and right, so they mirror on their own. Figtree has no Arabic letters, so Arabic text uses the phone's Arabic font.

## Settings

Prices on offer, the price a student sees, VAT, deposit, hold days, launch date and the prototype clock live in `src/haiba/journey/settings.ts` and are edited in the prototype panel. Screens never hardcode them.

## Prototype panel

The dark "Prototype" tab on the right edge opens it (rebuilt 8 Nov). A dark bar at the top shows where the student is (state, country, language, date). Four tabs, the last one used is remembered:

- Journey: what can happen next from here (Launch day comes, Student cancels, The hold runs out, A month later, The year ends...), then every state on one map in three phases (Before launch, Launch day, Member). Tap a state to jump; it sets the state and the clock and opens its screen. A waiting Tap payment shows Paid, Failed and Paid sent twice here.
- Screens: every screen, grouped and searchable. A screen that needs a state sets that state first.
- Setup: what the app passes (country, language, student id), student status, the page before reserving, prices, VAT, deposit, spots, hold days, launch date and the prototype clock.
- Tests: the paywall test arms with their price, the older promo pages, shop side events (accept codes, Airalo) and reset.

Students never see this panel.

## Where things live

- `src/routes/`: one small file per screen (TanStack file routes).
- `src/haiba/screens/`: the screens, ported 1:1 from the design canvas. Styles are copied value for value.
- `src/haiba/logic/`: each screen's data and behaviour, ported 1:1 from the canvas.
- `src/haiba/styles/`: each screen's animations, scoped with `.pg-<screen>`.
- `src/haiba/store.tsx`: the one shared state (member, codes, points, settings, and the student journey).
- `src/haiba/journey/`: the new student screens' shared parts: settings, the student state machine (`states.ts`), app parameters and prices (`session.ts`), English and Arabic words (`strings.ts`), money and date formats (`format.ts`), and the building blocks (`ui.tsx`, styled by `src/haiba/styles/journey.css`).
- `src/haiba/data/haiba-fake-data.json`: shops, rewards, Unipass and the points rules.
- `public/haiba/`: the bird poses, the two Haiba logos, and the reward images in `emoji/` (Microsoft Fluent 3D emoji, MIT).
- `src/haiba/journey/data.ts`: placeholder gifts, subscriptions, activity, brands and the asset kit (`ICON`) for the member screens. Arabic for these screens is not written yet and falls back to English.
- `public/fonts/`: Figtree, self hosted.
- `tools/dc2react.py`: the converter used to port a canvas board into a screen.

## Rules to keep

- Money is shown as BHD or SAR with two decimals, never fils. In Arabic: 20.00 د.ب.
- Points are shown as points. Rewards are described as items, never as money.
- "You saved" counts a reward only when the shop accepts the code.
- Copy is simple English, no dashes.
- Font: Figtree for everything, text, numbers and headlines. Never Syne.


## Rules added 7 Nov

- Reservation spots are capped per country (400 each). Cap and spots taken are in the prototype panel. When full, new students see "All spots taken". The price page shows the count once 100 or fewer remain.
- Haiba stays in the country the student reserved or joined in. Opening Haiba with another country shows "Your Haiba is in Bahrain", never a new price.
- Haiba is for verified students. The panel switches student status between verified, not verified and expired.
- Renewal is charged at the price on offer then, not the locked price.
- Member offers with no codes left show "All claimed" (`claimed` in `journey/data.ts`).
- The hub gift card takes its month and days left from the date (the prototype clock when set).
- Supply kit: shops, rewards, gifts and partner offers use one set of parts (brand mark, shop row, item tile, item row, offer card, tags and price lines). See the Supply kit board on the canvas and `claude/haiba-supply-kit.md` in the project.
- Mascot loops are in `public/haiba/motion/` (wave, waiting, gift, bye). Ended uses the bye loop.

## Rules added 8 Nov

- No separate price page. The page before reserving is the main promo page, picked in the panel ("Main promo page": Join copy, Story, Timeline, Baseline, Table). The same page in join mode is Join after launch (full price with VAT, no deposit). A "few spots left" bar sits on top once 100 or fewer remain.
- After the hold ends or a refund, the locked price no longer applies; joining uses today's price.
- One graphic per idea (`ICON` in `journey/data.ts`): points = the Haiba coin, Unipass gift = the purple gift box (`public/haiba/icons/unipass.webp`, white outline so it works on lime), Haiba membership = the lime Haiba logo on a purple tile (`HaibaMark`), subscriptions = the service's own logo (`SubLogos`). Emoji only show the actual item a shop gives.
- Each screen gets its own mascot pose. New poses 18 to 25 are WebP in `public/haiba/birds/` (`BIRD()` picks the format).
- The mascot is never moved with code (no hop, float, peek, wiggle, shake, bounce, pop in). `Artwork` tags bird stills with `hb-mascot` and one rule in `journey.css` stops their animation. Only real frame loops move.
- Corners: cards and surfaces use smaller radii (about a third less: 16 to 12, 20 to 14, 28 to 18). Buttons, pills and circles keep theirs.
- Images are kept light: PNGs are quantised, new art is WebP sized for 2x screens.
- The hub's Unipass gift card and the new member tip open `/haiba/unipass`; Activity "See all" opens `/haiba/activity`.
- Hub bird (`src/haiba/HubBird.tsx`): real Seedance loops in `public/haiba/motion/` (`hub-shades`, `hub-coin`, `hub-still`), all cut with the same crop so they line up. On open he plays one reveal at random, each tap plays the other. After a reveal he holds the still pose for 4 to 6 seconds, then plays `hub-idle.webp` once (3.9 s: hair, breathing, a blink), then rests again, until the next tap. Tapping him shows no speech bubble. No timer plays them on its own. All four files are 412 x 560 so the loops match the still. The loops are animated AVIF (about 1 MB for all three) with WebP copies for Apple devices before iOS 16.4.1 / macOS 13.3.1 (their animated AVIF is broken) and any browser without AVIF; each phone downloads one format. Only the first reveal loads before he moves; the other reveal and the idle load after it.
- Membership card: vertical Haiba purple card on a light lilac stage, lime wordmark, status pill, light HAIBA monogram, the country engraving (`public/haiba/cards/bh.webp`, `sa.webp`), name, member since and Year 1. Tilt, light sweep and foil edge.
- Cancelling never ends the year early. After cancelling the card pill says "Ends 2 Dec" and "Keep my membership" sits at the bottom. In the last month of the year the card goes grey and one panel says your Haiba year is ending, with Renew, whether they cancelled (pill "Ends 2 Dec") or not (pill "Renew soon"). The page follows the student's state; `?view=` still previews a state.
- Payment done and the cancel sheet poses (`18-joined`, `24-hug`) hold the Haiba card.
- Hub (8 Nov): the top right button is a menu (Savings and activity, Membership, Subscriptions, Help). Groups in order: Ready for you (Unipass gift, codes), Your points, Savings and activity (one card: saved plus recent visits), Member perks (travel data, subscriptions).
- Help only holds help: how points work, how Haiba works, questions, chat.
- Savings and activity is one page (/haiba/saved and /haiba/activity). Every line shows money saved and points together. The hub card uses the same numbers.
- Your points (4.1): coin balance card, search, your shops, category chips that filter one rewards grid. Use on a reward asks once, then opens the full code screen (/haiba/code with the shop and reward in the link). Show code on the hub opens the same screen. The code screen has a prototype box for "staff enters the code" and "12 hours pass".
- Result screens have no status pill above the title. Used codes show a receipt (saved, points used, saved so far).
- One month tracker for all of Haiba (`MonthTrack` in `Member.tsx`, `.jx-mt` in `journey.css`), on Unipass and the membership card: a bar per month with its letter under it. Colours follow the background: ink on lime and yellow (never purple on lime), lime on dark, purple on white and lilac.
- Subscription pages: one left aligned "Good to know" list.
- Props in poses match the standard graphics: `26-gift` holds the purple Unipass box (hub Unipass card, Unipass page), `27-coin` flips the Haiba coin with the star (Haiba savings). The old `10-gift` and `06-coin` are no longer used on screens.
- Student states (8 Nov): each state has its own screen and look. Reserved is dark, Pay the rest is lime with the coin bird, Hold expired is yellow, refunds are lilac (on the way), lime (back) or rose (failed). A Reserve, Pay the rest, Member strip (`JourneyStage` in `parts.tsx`) shows where they are. No status pills above titles.
- `pathFor` sends pay the rest to `/haiba/pay`, hold expired to `/haiba/expired`, ended to `/haiba/ended`. Screens tied to a state send other students to their own screen.
- Paying the rest, joining after launch or coming back after the year ended makes the student a member for one year from today and lands on "You are a member". Renewing adds a year and lands on the membership page. Cancel my reservation on Pay the rest starts the refund.
- Responsiveness (8 Nov): screens fill the phone (full width on phones, phone width on a laptop) and the visible height (`svh`), so a page that fits never scrolls. Nothing scrolls sideways. Fields are 16px so iOS does not zoom. The bottom button bar reserves exactly its own height.
- Trays (`TrayGestures.tsx`): every tray closes by tapping outside, dragging it down, or Escape, and the page behind stays still.
- Taps: no double tap delay or grey flash, an instant pressed state, and anything under 44 x 44 gets an invisible 44px hit area (`HitAreas.tsx`). Screen code preloads in the background after the first screen (`PreloadScreens.tsx`).
- Home banner (8 Nov): edge to edge on the Unipal home (`Home.tsx`, `.hb-home-banner` in `haiba.css`). The art is the Haiba card for the student's country (Bahrain waterfront or Riyadh, from the app's `country`) with the mascot bursting out, made with GPT Image in Figma Weave. Words are live Figtree text (lime wordmark, two line headline, compact lime button; member and non member lines) sized to the banner's width. Loading: AVIF 640/960/1290 wide (16 to 53 KB) with WebP fallback via `srcset`, preloaded with the page, a 250 byte blurred preview inline, fixed aspect ratio so nothing jumps.
- Web banner: `public/haiba/banners/web-bh` and `web-sa`, 1200 x 491 with the words in the image, as AVIF, WebP and JPG plus @2x.
