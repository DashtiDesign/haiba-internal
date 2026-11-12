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
| Hadiya: pick, used, month end, lost, last  | `/haiba/hadiya?view=used` |
| Subscriptions (Spotify, ChatGPT), code, all claimed | `/haiba/subscriptions`, `/haiba/subscription?id=spotify`, `?id=chatgpt&claimed=1` |
| Membership: active, cancelled, renewal, cancel sheet | `/haiba/membership?view=renewal` |
| Receipts, year ended                              | `/haiba/receipts`, `/haiba/ended` |
| You saved, Help                                   | `/haiba/saved`, `/haiba/help` |
| Student status (not verified, expired)            | `/haiba/student?for=reserve` (also shown at reserve, join, renewal) |
| Loading skeletons                                 | add `?loading=1` to `/haiba`, `/haiba/rewards`, `/haiba/hadiya`, `/haiba/membership` |
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
- `src/haiba/data/haiba-fake-data.json`: shops, rewards, Hadiya and the points rules.
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
- One graphic per idea (`ICON` in `journey/data.ts`): points = the Haiba coin, Hadiya = the purple gift box (`public/haiba/icons/hadiya.webp`, white outline so it works on lime), Haiba membership = the lime Haiba logo on a purple tile (`HaibaMark`), subscriptions = the service's own logo (`SubLogos`). Emoji only show the actual item a shop gives.
- Each screen gets its own mascot pose. New poses 18 to 25 are WebP in `public/haiba/birds/` (`BIRD()` picks the format).
- The mascot is never moved with code (no hop, float, peek, wiggle, shake, bounce, pop in). `Artwork` tags bird stills with `hb-mascot` and one rule in `journey.css` stops their animation. Only real frame loops move.
- Corners: cards and surfaces use smaller radii (about a third less: 16 to 12, 20 to 14, 28 to 18). Buttons, pills and circles keep theirs.
- Images are kept light: PNGs are quantised, new art is WebP sized for 2x screens.
- The hub's Hadiya card and the new member tip open `/haiba/hadiya`; Activity "See all" opens `/haiba/activity`.
- Hub bird (`src/haiba/HubBird.tsx`): real Seedance loops in `public/haiba/motion/` (`hub-shades`, `hub-coin`, `hub-still`), all cut with the same crop so they line up. On open he plays one reveal at random, each tap plays the other. After a reveal he holds the still pose for 4 to 6 seconds, then plays `hub-idle.webp` once (3.9 s: hair, breathing, a blink), then rests again, until the next tap. Tapping him shows no speech bubble. No timer plays them on its own. All four files are 412 x 560 so the loops match the still. The loops are animated AVIF (about 1 MB for all three) with WebP copies for Apple devices before iOS 16.4.1 / macOS 13.3.1 (their animated AVIF is broken) and any browser without AVIF; each phone downloads one format. Only the first reveal loads before he moves; the other reveal and the idle load after it.
- Membership card: vertical Haiba purple card on a light lilac stage, lime wordmark, status pill, light HAIBA monogram, the country engraving (`public/haiba/cards/bh.webp`, `sa.webp`), name, member since and Year 1. Tilt, light sweep and foil edge.
- Cancelling never ends the year early. After cancelling the card pill says "Ends 2 Dec" and "Keep my membership" sits at the bottom. In the last month of the year the card goes grey and one panel says your Haiba year is ending, with Renew, whether they cancelled (pill "Ends 2 Dec") or not (pill "Renew soon"). The page follows the student's state; `?view=` still previews a state.
- Payment done and the cancel sheet poses (`18-joined`, `24-hug`) hold the Haiba card.
- Hub (8 Nov): the top right button is a menu (Savings and activity, Membership, Subscriptions, Help). Groups in order: Ready for you (Hadiya, codes), Your points, Savings and activity (one card: saved plus recent visits), Member perks (travel data, subscriptions).
- Help only holds help: how points work, how Haiba works, questions, chat.
- Savings and activity is one page (/haiba/saved and /haiba/activity). Every line shows money saved and points together. The hub card uses the same numbers.
- Your points (4.1): coin balance card, search, your shops, category chips that filter one rewards grid. Use on a reward asks once, then opens the full code screen (/haiba/code with the shop and reward in the link). Show code on the hub opens the same screen. The code screen has a prototype box for "staff enters the code" and "12 hours pass".
- Result screens have no status pill above the title. Used codes show a receipt (saved, points used, saved so far).
- One month tracker for all of Haiba (`MonthTrack` in `Member.tsx`, `.jx-mt` in `journey.css`), on Hadiya and the membership card: a bar per month with its letter under it. Colours follow the background: ink on lime and yellow (never purple on lime), lime on dark, purple on white and lilac.
- Subscription pages: one left aligned "Good to know" list.
- Props in poses match the standard graphics: `26-gift` holds the purple Hadiya box (hub Hadiya card, Hadiya page), `27-coin` flips the Haiba coin with the star (Haiba savings). The old `10-gift` and `06-coin` are no longer used on screens.
- Student states (8 Nov): each state has its own screen and look. Reserved is dark, Pay the rest is lime with the coin bird, Hold expired is yellow, refunds are lilac (on the way), lime (back) or rose (failed). A Reserve, Pay the rest, Member strip (`JourneyStage` in `parts.tsx`) shows where they are. No status pills above titles.
- `pathFor` sends pay the rest to `/haiba/pay`, hold expired to `/haiba/expired`, ended to `/haiba/ended`. Screens tied to a state send other students to their own screen.
- Paying the rest, joining after launch or coming back after the year ended makes the student a member for one year from today and lands on "You are a member". Renewing adds a year and lands on the membership page. Cancel my reservation on Pay the rest starts the refund.
- Responsiveness (8 Nov): screens fill the phone (full width on phones, phone width on a laptop) and the visible height (`svh`), so a page that fits never scrolls. Nothing scrolls sideways. Fields are 16px so iOS does not zoom. The bottom button bar reserves exactly its own height.
- Trays (`TrayGestures.tsx`): every tray closes by tapping outside, dragging it down, or Escape, and the page behind stays still.
- Taps: no double tap delay or grey flash, an instant pressed state, and anything under 44 x 44 gets an invisible 44px hit area (`HitAreas.tsx`). Screen code preloads in the background after the first screen (`PreloadScreens.tsx`).
- Home banner (8 Nov): edge to edge on the Unipal home (`Home.tsx`, `.hb-home-banner` in `haiba.css`). The art is the Haiba card for the student's country (Bahrain waterfront or Riyadh, from the app's `country`) with the mascot bursting out, made with GPT Image in Figma Weave. Words are live Figtree text (lime wordmark, two line headline, compact lime button; member and non member lines) sized to the banner's width. Loading: AVIF 640/960/1290 wide (16 to 53 KB) with WebP fallback via `srcset`, preloaded with the page, a 250 byte blurred preview inline, fixed aspect ratio so nothing jumps.
- Web banner: `public/haiba/banners/web-bh` and `web-sa`, 1200 x 491 with the words in the image, as AVIF, WebP and JPG plus @2x.

## Rules added 9 Nov

- Promo pages fit the phone. `MainPromo` wraps the "few spots left" bar and the page in `.jx-promo-shell`, so the bar never makes a page scroll. The Story promo is a column (top bar, content, footer with the tally and button) and fits any height with no page scroll. Option C (Timeline) has no sticky button: the price panel and button sit at the end of the page.
- Story promo: the gift tiles all use the same 44px logo square, nothing marks one tile as picked, and the subscription rows share one style, so nothing looks tappable. The lime circle and the bird are centred without `transform`, so the pop in animation cannot move them.
- Exit sheet on every promo page: the student's shop logo with a gift, one title ("Get a free drink at The Coffee Bean", or "Get a free gift every month") and one line, then Reserve and No thanks. "Not now" and "No thanks" have a 48px tap area.
- No light strip on overscroll: `PageBackdrop.tsx` paints the page background the colour at the bottom of the screen; screens padded for the notch paint that padding in their own colour.
- "You are a member" has one button, See how Haiba works. The gift is picked on the last step of that walkthrough.
- Hub: Your points has no See all (the Use your points card opens the page). The travel perk turns into a light card with a green Used tick once used; only Locked shows a pill.
- Your points: when the points card scrolls away, the search sticks to the top with the points beside it, and goes back on scroll up.
- Travel data: shorter copy, no country list. The button only shows before the code is revealed; then the code card's Copy button is the action. The page no longer has a fixed height, so it scrolls.
- Refund pages have no Reserve, Pay the rest, Member strip. Payment failed has one red title (the reason) and one line, no pill.
- Hadiya of the month is real state (`gift` in the store, `journey/gift.ts`): pick a gift and its code shows; "Staff enters the code" marks it used and counts it in savings and activity. A gift code that runs out has no screen: it goes away and the student can pick again. Panel: "Pick a gift (new month)" clears it.
- Hub gift card: the big lime card only until the student uses their first gift (a new member). After that a small card: "Pick your [month] gift", or "[Month] gift used, next gift in N days". No gift card while a code is showing. On the 1st of a new month the small card asks them to pick again.
- Active codes are one pattern everywhere (`journey/codes.ts`, `CodeList` and `.jx-code-row`): item, then shop and kind (Hadiya, or points), then Show code. The hub lists every code that is showing; Hadiya shows its gift code on top; Your points shows its reward codes on top. Reward codes made on Your points are kept in the store (`rewardCodes`), hold their points, and count as saved once used; one that runs out or is cancelled goes away and its points come back.
- Your points: the pinned points chip is white with the coin, and slides in smoothly.
- Travel data: the covered countries and Good to know are back, kept short.
- No expired screen for any code: a gift code that runs out goes back to Hadiya, a points code goes back to Your points with its points returned. Cancelled still has its screen.
- New gift signal: for the first 3 days of a month (students who used a gift before), the small hub card says "Your [month] gift is here" with a NEW tag, and the bird tip opens once with "Pick my gift". Closing the tip keeps it closed that month.
- The Hadiya code row stands out from points codes: pale lime row, gift badge on the logo, "Hadiya" label, dark pill, and on the hub an "Open Hadiya" link (the way into Hadiya while a code shows).
- Name: the free monthly gift is "Hadiya" (Arabic هدية), first called Unipass. Haiba is the subscription, Hadiya is the gift. Never write "Hadiya gift": Hadiya already means gift ("Pick your Hadiya", "Hadiya code", label HADIYA). The page is `/haiba/hadiya`, the icon `public/haiba/icons/hadiya.webp`, the canvas boards Hd01 to Hd09, and sample gift codes start with HD.
- Hadiya rows in activity and the wallet show the Hadiya gift icon, not a letter.

## Rules added 11 and 12 Nov

- Subscription partners: Bahrain gets talabat pro and ChatGPT Go, Saudi gets HungerStation Plus and YouTube Premium Lite (logos in `public/haiba/brands/`). Spotify is gone.
- Smaller Haiba promo test: three focused pages, Points only (`/haiba/paywall/points`), Points and apps (`/haiba/paywall/points-apps`) and Points and gifts (`/haiba/paywall/points-gifts`). Each explains what points are with pictures, an animated points strip and a total. Pick them in the panel under "Page before reserving". `?welcome=` sets the welcome points.
- Looks (`src/haiba/looks.ts`): looks for the hub parrot, bought with points. The words are plain on purpose (no "skins", no "bird"): the hub button says "Change look" with a lime NEW tag, the page is "Looks", the points row is "Looks for your parrot", the profile section is "Your parrot".
- Live looks: Classic, Abood Yowda (Bahrain only, with sound), Hamdha (Bahrain only, with sound), Golden parrot (juggles Haiba coins), Dragon rider, Audi F1, Football star, Falcon friend, Karak break, Thobe and ghutra (Bahrain), Thobe and shemagh (Saudi), Pearl diver (Bahrain). Every look costs 200 points for now. The full list and next ideas are in the project doc `haiba-bird-looks.md`.
- The Looks page (`/haiba/looks`, canvas board 4.2) is built like the Duolingo and Alan avatar shops: the selected look plays big on a lilac stage with one button (Get it for 200 points, then Wear it, then On your hub), and a white panel below holds a 3 column grid of every look. Tapping a tile scrolls up and plays that look; only that look's animation downloads. Buying asks once in a small sheet. The hub button opens this page.
- Your points has a "Looks for your parrot" row; a tile opens the page with that look on the stage. "Your parrot" in the profile (`/haiba/membership#bird`, `journey/BirdPicker.tsx`) shows owned looks; tap one to wear it.
- Each look has a still, one action loop and one idle (4 s), all starting and ending on the still. Every clip is checked frame by frame so nothing is cut at an edge (`edgeaudit` in the scratch tools). Looks that move past the classic 412 x 560 box are wider or taller (`padL`, `padR`, `padT` in `LOOK_FILES`); his feet stay at the same spot in every file. Previews and tiles centre on his feet (`lookAnchor`) and keep his size (`lookHeight`). On the hub a very tall look (falcon, dragon) is drawn a little smaller so nothing goes past the top of the screen.
- `tools/key_look.py` keys the Seedance videos (green backdrop) into AVIF with WebP copies. `--wide --trim` keeps only the room a look uses; the idle reuses the action's `--pad` and `--padt`. It pads past the video with the backdrop colour (a wing in the corner once made a solid bar).
- Sound (12 Nov): a look can have a sound (`sound` in `LOOK_FILES`, an m4a in the same Cloud folder). It plays only on a tap (the hub parrot, or a look on the Looks page), never when a page opens, and starts with the action so they stay in time. The Looks page shows a "Sound on" chip on the stage for these looks (moving lime bars; tap for "Sound off", saved as `haiba-look-sound`, which also keeps the hub quiet), and a small waveform badge on their tiles. Abood Yowda recreates the viral Bahraini fish clip; its sound starts partway into the clip so "Aboud Yauda" lands on the fumble and both end together. Its files are `fish-v2-*` (12 Nov, night): the action now ends on him standing with the fish instead of fading two poses together, and the new names make phones load the new version. The still and sound keep their names. Hamdha (12 Nov, night) recreates the viral clip of the old man who tastes a watermelon and says "7aam'6a" (sour): a slice pops into his wings, he eats it all, his face goes sour on the word, he keeps chewing, then settles back. Its sound is the clip from 9.0 s to just before the laugh, and the action is 8 s so the sour chewing fits after the word.
- Look files live in Lovable Cloud storage, public folder `bird-looks` (images and audio), not in the repo. A new look is an upload plus one line in `LOOK_FILES`. Files are pulled only when needed and kept in memory for the visit. Owned looks and the look worn are saved on the phone (`haiba-looks-owned`, `haiba-look`) and read after the page loads, so the first render matches the server.
- Audi branding on the Audi F1 look needs Audi's OK before students see it.
- Looks page preview (12 Nov, night): the stage repeats every look (action, its 4 s idle, action). After a tap, a look's sound restarts with every action. Sound runs on Web Audio (decoded once per visit) and each animation is decoded before it shows, so both start together; on iPhone the sound follows the silent switch. Leaving the page stops the loop. The hub gets the worn look's sound ready on open.
- Abood Yowda and Hamdha use audio from viral clips; check the rights with the people in them before students see them.
