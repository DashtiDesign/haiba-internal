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
| Basket and codes (out of the flow, kept for reference) | `/haiba/basket`       |
| Shop page, The Coffee Bean                        | `/shop/coffee-bean`        |
| Redeem an offer, earn points                      | `/shop/coffee-bean/redeem` |

Join on the plans page makes you a new member with 500 points.

Rewards: on the shop page, tap Use on a reward, confirm, and the code shows right there. One code per item, no basket. Held codes also show on the hub under Ready to use; tap one to show it.

## Prototype panel

The dark "Prototype" tab on the right edge opens it. Testers can:

- switch between Not a member, New member and Active member
- pick the 1st, 3rd or 5th visit on the Redeem screen
- make the shop accept all held codes
- reset everything
- jump to any screen

Students never see this panel.

## Where things live

- `src/routes/`: one small file per screen (TanStack file routes).
- `src/haiba/screens/`: the screens, ported 1:1 from the design canvas. Styles are copied value for value.
- `src/haiba/logic/`: each screen's data and behaviour, ported 1:1 from the canvas.
- `src/haiba/styles/`: each screen's animations, scoped with `.pg-<screen>`.
- `src/haiba/store.tsx`: the one shared state (member, basket, codes, accepted codes, points).
- `src/haiba/data/haiba-fake-data.json`: shops, rewards, Unipass and the points rules.
- `public/haiba/`: the 16 bird poses and the two Haiba logos.
- `public/fonts/`: Figtree, self hosted.
- `tools/dc2react.py`: the converter used to port a canvas board into a screen.

## Rules to keep

- Money is shown as BHD with two decimals, never fils.
- Points are shown as points. Rewards are described as items, never as money.
- "You saved" counts a reward only when the shop accepts the code.
- Copy is simple English, no dashes.
- Font: Figtree for everything, text, numbers and headlines. Never Syne.
