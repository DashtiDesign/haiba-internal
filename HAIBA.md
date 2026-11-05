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
| Haiba tab: plans for non members, hub for members | `/haiba`                   |
| Choose your plan (Free vs Haiba)                  | `/haiba/plans`             |
| How points work                                   | `/haiba/points`            |
| How it works (after joining)                      | `/haiba/welcome`           |
| Points wallet (out of the flow, kept for reference) | `/haiba/wallet`          |
| System states preview (loading, empty, error, offline, safe error) | `/haiba/status?show=error` |
| Basket and codes (out of the flow, kept for reference) | `/haiba/basket`       |
| Shop page, The Coffee Bean                        | `/shop/coffee-bean`        |
| Redeem an offer, earn points                      | `/shop/coffee-bean/redeem` |

Join on the plans page makes you a new member with 500 points.

Rewards: on the shop page, tap Use on a reward, confirm, and the code shows right there. One code per item, no basket. Held codes also show on the hub under Ready to use; tap one to show it.

## App parameters

The Unipal app opens every Haiba page with `user_id`, `lang` (`en` or `ar`) and `country` (`bahrain` or `saudi`). They stay in the URL as the student moves between pages. The stand in home at `/` adds `user_id=100245&lang=en&country=bahrain` when they are missing, like the real app would.

New screens read them only through `src/haiba/journey/session.ts`, so a signed token can replace the plain `user_id` later. A missing or edited `user_id`, or an unknown country, shows a safe error page with no student data.

Arabic is right to left. New screens use start and end, never left and right, so they mirror on their own. Figtree has no Arabic letters, so Arabic text uses the phone's Arabic font.

## Settings

Prices on offer, the price a student sees, VAT, deposit, hold days, launch date and the prototype clock live in `src/haiba/journey/settings.ts` and are edited in the prototype panel. Screens never hardcode them.

## Prototype panel

The dark "Prototype" tab on the right edge opens it. Testers can:

- set what the app passes: country, language, and a good, missing or edited student id
- jump to any student state (not reserved, payment pending, reserved, refunds, pay the rest, hold expired, member, renewal, cancelled, ended)
- change prices, force one price, and set VAT, deposit, hold days, launch date and today's date
- make the shop accept all held codes, make Airalo accept the travel code, reset the student
- preview loading, empty, error, offline and the safe error pages
- open the promo pages and jump to any screen

Students never see this panel.

## Where things live

- `src/routes/`: one small file per screen (TanStack file routes).
- `src/haiba/screens/`: the screens, ported 1:1 from the design canvas. Styles are copied value for value.
- `src/haiba/logic/`: each screen's data and behaviour, ported 1:1 from the canvas.
- `src/haiba/styles/`: each screen's animations, scoped with `.pg-<screen>`.
- `src/haiba/store.tsx`: the one shared state (member, codes, points, settings, and the student journey).
- `src/haiba/journey/`: the new student screens' shared parts: settings, the student state machine (`states.ts`), app parameters and prices (`session.ts`), English and Arabic words (`strings.ts`), money and date formats (`format.ts`), and the building blocks (`ui.tsx`, styled by `src/haiba/styles/journey.css`).
- `src/haiba/data/haiba-fake-data.json`: shops, rewards, Unipass and the points rules.
- `public/haiba/`: the 16 bird poses and the two Haiba logos.
- `public/fonts/`: Figtree, self hosted.
- `tools/dc2react.py`: the converter used to port a canvas board into a screen.

## Rules to keep

- Money is shown as BHD or SAR with two decimals, never fils. In Arabic: 20.00 د.ب.
- Points are shown as points. Rewards are described as items, never as money.
- "You saved" counts a reward only when the shop accepts the code.
- Copy is simple English, no dashes.
- Font: Figtree for everything, text, numbers and headlines. Never Syne.
