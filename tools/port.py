"""Port design canvas boards into the app, then wire them into the flow.

Usage: python3 tools/port.py <folder with the .dc.html boards> [Board ...]
Example: python3 tools/port.py ~/canvas/project Wallet Shop Basket

Step 1 runs dc2react.py (markup and styles copied 1:1).
Step 2 applies the small, named patches below: shared points from the store, links between
screens, router imports, and edits made later in Lovable that must survive a re-port.
Each patch matches on text, so a failed match stops the port loudly.
Before re-porting a screen, check `git log -p` for new Lovable edits to it and add them here.
"""
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "haiba")
BOARDS = {
    # board: (style key, screen name)
    "Character": ("hub", "Hub"),
    "Plans": ("plans", "Plans"),
    "Points": ("points", "Points"),
    # 12 Nov: bird looks, bought with points and worn on the hub
    "Story": ("story", "Welcome"),
    "Wallet": ("wallet", "Wallet"),
    "Offer": ("redeem", "Redeem"),
    "Shop": ("shop", "Shop"),
    "Basket": ("basket", "Basket"),
    # Promo page tests (fake door). Price, name and visits come from the URL, see dc.ts.
    "PromoWaitlist": ("promowaitlist", "PromoWaitlist"),
    "PromoValue": ("promovalue", "PromoValue"),
    "PromoCompare": ("promocompare", "PromoCompare"),
    "PromoYear": ("promoyear", "PromoYear"),
    "PromoDream": ("promodream", "PromoDream"),
    "PromoWinback": ("promowinback", "PromoWinback"),
    "PromoGift": ("promogift", "PromoGift"),
    # Paywall A/B test (4 Nov). Price, name, shop and state come from the URL, see dc.ts.
    "PaywallBase": ("paywallbase", "PaywallBase"),
    "PaywallTimeline": ("paywalltimeline", "PaywallTimeline"),
    "PlansConvert": ("plansconvert", "PlansConvert"),
    # 11 Nov: a smaller Haiba, to learn which part makes students pay (same price, less inside)
    "PaywallPoints": ("paywallpoints", "PaywallPoints"),
    "PaywallPointsApps": ("paywallpointsapps", "PaywallPointsApps"),
    "PaywallPointsGifts": ("paywallpointsgifts", "PaywallPointsGifts"),
    "PaywallStory": ("paywallstory", "PaywallStory"),
    "PaywallTable": ("paywalltable", "PaywallTable"),
    # Free travel data perk (Airalo). Plan and home country come from the store, see dc.ts.
    "Travel": ("travel", "Travel"),
    # Webview only: Haiba pages that replace the Haiba parts of core Unipal pages (shop, redeem).
    "Rewards": ("rewards", "Rewards"),
    "BirdLooks": ("birdlooks", "BirdLooks"),
    "Earn": ("earn", "Earn"),
}
PD = 'href="#" onClick={(e: any) => e.preventDefault()}'


def go(route):
    return 'href="#" onClick={(e: any) => { e.preventDefault(); go("%s"); }}' % route


def go_item(var):
    return 'href="#" onClick={(e: any) => { e.preventDefault(); if (%s.href) go(%s.href); }}' % (var, var)


GO_VAR = 'href="#" onClick={(e: any) => { e.preventDefault(); if (v.navTipHref) go(v.navTipHref); }}'
# 9 Nov: the hub's Hadiya card opens Hadiya, or the gift code once one is showing.
GO_GIFT = 'href="#" onClick={(e: any) => { e.preventDefault(); go(v.giftHref || "/haiba/hadiya"); }}'

# Placeholder links (href="#") in the order they appear in each screen. None = stays a placeholder.
LINKS = {
    # 8 Nov: the hub is grouped (Ready for you, Your points, Savings and activity); its Activity link is now a board link.
    # 9 Nov: the big and the small Hadiya card both open Hadiya (or the gift code).
    "Hub": [GO_GIFT, GO_GIFT, GO_VAR, go("/"), None, None, None],
    "Plans": [None, go("/")],
    "Wallet": [go_item("a"), go("/haiba/earn"), None, None, go("/haiba/rewards"), go("/haiba/rewards")],
}

# Extra text patches on the screen (TSX) and logic (TS) files.
SCREEN = {
    # 8 Nov: the hub bird is the HubBird loop player (real animated loops), not a still.
    "Hub": [
        ('import Artwork from "../Artwork";', 'import Artwork from "../Artwork";\nimport HubBird from "../HubBird";'),
        (re.compile(r'<button\s+aria-label="Say hi to the Haiba parrot".*?</button>', re.S), '<HubBird onTap={v.poke} />'),
        # 8 Nov: a reward code row opens the full code screen (4.6) with that reward; menu rows open their pages.
        (re.compile(r'<Link (className="hb-row" style=\{\{[^}]*\}\}) to="/haiba/code\?kind=reward">(.*?)</Link>', re.S),
         r'<a \1 href="#" onClick={(e: any) => { e.preventDefault(); go(r.href); }}>\2</a>'),
        ('href="{{m.href}}"', 'href="#" onClick={(e: any) => { e.preventDefault(); go(m.route); }}'),
        # The menu sheet covers the screen in the app, above the bottom nav and panel tab
        ('position: "absolute", inset: "0", background: "rgba(20,16,40,0.5)", zIndex: "30"', 'position: "fixed", inset: "0", background: "rgba(20,16,40,0.5)", zIndex: "70"'),
        ('role="dialog" aria-label="Haiba menu" style={{ position: "relative", width: "100%"', 'role="dialog" aria-label="Haiba menu" style={{ position: "relative", width: "100%", maxWidth: "430px", margin: "0 auto"'),
    ],
    # Lovable: the shop back button returns to the previous screen; hook class for small phones.
    "Shop": [
        ('import { useHaiba } from "../store";', 'import { useHaiba } from "../store";\nimport { useRouter } from "@tanstack/react-router";\nimport { Button } from "@/components/ui/button";'),
        ("  const hb = useHaiba();", "  const hb = useHaiba();\n  const router = useRouter();"),
        (re.compile(r'<Link aria-label="Back" className="hb-press" (style=\{\{.*?\}\}) to="/haiba">(.*?)</Link>', re.S),
         r'<Button type="button" variant="ghost" size="icon" aria-label="Back" title="Back" className="hb-press" \1 onClick={() => router.history.back()}>\2</Button>'),
    ],
    # Lovable: full opacity for the empty basket hint
    "Basket": [(re.compile(r'opacity: "0\.8" \}\}>(\s*)\{v\.ctaSub\}'), r'opacity: v.empty ? "1" : "0.8" }}>\1{v.ctaSub}')],
    # Lovable: the example under each rule opens with the shared MotionReveal panel
    "Points": [
        ('import { useHaiba } from "../store";', 'import { useHaiba } from "../store";\nimport MotionReveal from "../MotionReveal";'),
        (re.compile(r'\{r\.open \? \(\n(\s*)<>\n(.*?)\n(\s*)</>\n(\s*)\) : null\}', re.S), r'<MotionReveal open={r.open}>\n\2\n\4</MotionReveal>'),
    ],
    "Plans": [
        # Lovable: hook class for the small phone layout of the plan artwork
        ('<div style={{ position: "relative", height: "210px",', '<div className="hb-plan-artwork" style={{ position: "relative", height: "210px",'),
        ('to="/haiba/welcome"', 'to="/haiba/welcome" onClick={() => hb.join()}'),
        ('<button aria-label="Close"', '<button onClick={() => go("/")} aria-label="Close"'),
    ],
}
LOGIC = {
    "Rewards": [
        # 9 Nov: points held in reward codes are not spendable
        ("var balance = 1240;", "var balance = props.base - (props.heldPts || 0);"),
        # 8 Nov: Use on a reward opens the full code screen (4.6) with that shop and reward.
        (
            "    var goCode = function (sh, d) {};",
            "    var goCode = function (sh, d) {\n"
            "      var p = { kind: 'reward', id: (sh.name + '-' + d.name).toLowerCase().replace(/[^a-z0-9]+/g, '-'), new: 1, shop: sh.name, item: d.name, pts: d.pts, img: d.img, logo: sh.logo || '', mark: sh.mark || sh.name.charAt(0), bg: sh.bg || '#FFFFFF', value: d.value || 0 };\n"
            "      nav('/haiba/code?' + Object.keys(p).map(function (k) { return k + '=' + encodeURIComponent(p[k]); }).join('&'));\n"
            "    };",
        ),
    ],
    "Earn": [("var balance = 1240;", "var balance = props.base;")],
    # 12 Nov: the bird looks page spends the same points as Your points
    "BirdLooks": [("var balance = 1240;", "var balance = props.base - (props.heldPts || 0);")],
    "Hub": [
        ("var target = isNew ? 500 : 1240;", "var target = props.available;"),
        ("      navTipCta:", "      navTipHref: isNew && !(gUsed || gReady) ? '/haiba/hadiya' : '/haiba/earn',\n      navTipCta:"),
        # 8 Nov: the hub bird is HubBird in the app; the canvas loop player is not ported.
        ("        if (!self._reduce) self.playBird((self._last + 1) % BIRD_LOOPS.length);\n", ""),
    ],
    "Wallet": [
        ("points: n(isNew ? 500 : 1240),", "points: n(props.available),"),
        ("{ mark: '+', label: 'Earn' }", "{ mark: '+', label: 'Earn', href: '/haiba/earn' }"),
        ("{ mark: '★', label: 'Rewards' }", "{ mark: '★', label: 'Rewards', href: '/haiba/rewards' }"),
        ("{ mark: '#', label: 'My codes' }", "{ mark: '#', label: 'My codes', href: '/haiba/basket' }"),
    ],
    "Shop": [
        ("var balance = 1240;", "var balance = props.base;"),
        # Lovable: one shared muted grey
        ("ptsInk: can || held || used ? '#4F25D6' : '#8A8A96',", "ptsInk: can || held || used ? '#4F25D6' : 'var(--hb-muted-ink)',"),
    ],
    "Welcome": [],  # last step links to the hub with a real link, no logic patch needed
    "Basket": [
        ("var balance = 1240;", "var balance = props.base;"),
        # Lovable: one shared muted grey
        ("phInk: gone ? '#8A8A96' :", "phInk: gone ? 'var(--hb-muted-ink)' :"),
        ("ctaInk: empty ? '#8A8A96' : '#C0F402',", "ctaInk: empty ? 'var(--hb-muted-ink)' : '#C0F402',"),
        (
            "{ name: 'Cookie', pts: 700, value: 0.7, ph: 'COOKIE PHOTO', bg: '#F6E7D2', ink: '#7A4E2D' }",
            "{ name: 'Cookie', pts: 700, value: 0.7, ph: 'COOKIE PHOTO', bg: '#F6E7D2', ink: '#7A4E2D' },\n      { name: 'Regular drink', pts: 1900, value: 1.9, ph: 'DRINK PHOTO', bg: '#E3DCD6', ink: '#3B2A22' }",
        ),
        (
            "var q = state.qty;",
            "var draft = (state.qty || []).reduce(function (a, b) { return a + b; }, 0);\n    var showDone = state.done && draft === 0;\n    var q = showDone ? (state.codesQty || state.qty) : state.qty;",
        ),
        ("editing: !state.done,", "editing: !showDone,"),
        ("done: state.done,", "done: showDone,"),
        (
            "confirm: function () { if (!empty) setState({ done: true, cancelled: [], accepted: [] }); },",
            "confirm: function () { if (!empty) setState({ done: true, cancelled: [], accepted: [], codesQty: q, qty: [0, 0, 0] }); },",
        ),
        (
            "reset: function () { setState({ done: false, cancelled: [], accepted: [], qty: [1, 1] }); },",
            "reset: function () { setState({ done: false, cancelled: [], accepted: [], qty: [0, 0, 0], codesQty: null }); nav('/haiba/rewards'); },",
        ),
    ],
}


def patch_screen(name):
    p = os.path.join(OUT, "screens", name + ".tsx")
    s = open(p).read()
    s = s.replace('import { Link } from "react-router-dom";', 'import { Link, useNavigate } from "../nav";\nimport { useHaiba } from "../store";')
    s = re.sub(r'import "\.\./styles/[\w-]+\.css";\n', "", s)
    s = s.replace("  const v: any = useVals();", "  const v: any = useVals();\n  const go = useNavigate();\n  const hb = useHaiba();")
    if "/haiba/logo-purple.svg" in s:
        # Lovable: the purple logo is served from the asset registry
        s = s.replace('import { useHaiba } from "../store";', 'import { useHaiba } from "../store";\nimport haibaLogo from "@/assets/haiba/logo-purple.svg.asset.json";', 1)
        s = s.replace('src="/haiba/logo-purple.svg"', "src={haibaLogo.url}")
        s = s.replace('"url(/haiba/logo-purple.svg)"', "`url(${haibaLogo.url})`")
    if "<img" in s:
        # Lovable: images go through the shared Artwork component (WebP registry); the first one loads first
        s = s.replace('import { useHaiba } from "../store";', 'import { useHaiba } from "../store";\nimport Artwork from "../Artwork";', 1)
        s = s.replace("<img", "<Artwork priority", 1).replace("<img", "<Artwork")
    if name.startswith("Promo") or name == "Travel":
        # Promo tests and Travel: the CTA docks to the screen bottom and the "you are in early" sheet covers the screen
        s = s.replace('<div className="hb-fixed-bottom">', '<div className="hb-fixed-bottom hb-cta-dock">', 1)
        s = s.replace('padding: "36px 16px 20px 16px"', 'padding: "36px 16px calc(20px + env(safe-area-inset-bottom, 0px)) 16px"', 1)
        s = s.replace('position: "absolute", inset: "0", background: "rgba(20,16,40,0.5)", zIndex: "10"', 'position: "fixed", inset: "0", background: "rgba(20,16,40,0.5)", zIndex: "60"', 1)
        s = s.replace('padding: "0 20px 26px 20px", textAlign: "center"', 'padding: "0 20px calc(26px + env(safe-area-inset-bottom, 0px)) 20px", textAlign: "center", maxWidth: "430px", margin: "0 auto"', 1)
    if name.startswith("Paywall") or name == "PlansConvert":
        # Paywall test: CTA docks flush to the screen bottom and pads around the home bar (Lovable, 4 Nov)
        s = s.replace('<div className="hb-fixed-bottom">', '<div className="hb-fixed-bottom hb-cta-dock">')
        s = s.replace('padding: "30px 16px 16px 16px"', 'padding: "30px 16px calc(16px + env(safe-area-inset-bottom, 0px)) 16px"')
        s = s.replace('padding: "18px 16px 16px 16px", zIndex: "5"', 'padding: "18px 16px calc(16px + env(safe-area-inset-bottom, 0px)) 16px", zIndex: "5"')
        s = s.replace('bottom: "34px", display: "flex", justifyContent: "center"', 'bottom: "calc(34px + env(safe-area-inset-bottom, 0px))", display: "flex", justifyContent: "center"')
        # Sheets (exit, reserved, day one) must cover the fixed CTA dock (z 40), so they are fixed and above it
        for z in ("10", "11", "12"):
            s = s.replace('position: "absolute", inset: "0", background: "rgba(20,16,40,0.55)", zIndex: "%s"' % z,
                          'position: "fixed", inset: "0", background: "rgba(20,16,40,0.55)", zIndex: "5%s"' % z[-1])
    # 9 Nov: the story flows (top bar, content, footer) and fits any screen height; no fixed 844px layout any more.
    if name in ("Rewards", "Earn", "BirdLooks"):
        # Shop sheet covers the screen in the app, above the bottom nav and panel tab
        # (12 Nov: every sheet on the page, the shop sheet and the bird look preview)
        s = s.replace('position: "absolute", inset: "0", background: "rgba(20,16,40,0.5)", zIndex: "10"', 'position: "fixed", inset: "0", background: "rgba(20,16,40,0.5)", zIndex: "70"')
        s = s.replace('maxHeight: "86%"', 'maxHeight: "86vh", maxWidth: "430px", margin: "0 auto"', 1)
        s = s.replace('maxHeight: "92%"', 'maxHeight: "92vh", maxWidth: "430px", margin: "0 auto"', 1)
    plan = LINKS.get(name)
    if plan is not None:
        parts = s.split(PD)
        assert len(parts) - 1 == len(plan), "%s: expected %d placeholder links, found %d" % (name, len(plan), len(parts) - 1)
        out = parts[0]
        for rep, rest in zip(plan, parts[1:]):
            out += (rep or PD) + rest
        s = out
    for a, b in SCREEN.get(name, []):
        if hasattr(a, "subn"):
            s, n = a.subn(b, s, count=1)
            assert n == 1, "%s screen patch failed: %s" % (name, a.pattern[:60])
        else:
            assert s.count(a) == 1, "%s screen patch failed: %s" % (name, a[:60])
            s = s.replace(a, b)
    open(p, "w").write(s)


def patch_logic(key, name):
    p = os.path.join(OUT, "logic", key + ".ts")
    s = open(p).read()
    if "var t = state.t;" in s:
        # Lovable: count-ups use the shared Motion hook instead of a hand-written loop
        s = re.sub(r"  useEffect\(\(\) => \{.*?\n  \}, \[\]\);\n", "", s, count=1, flags=re.S)
        s = s.replace('import { useEffect } from "react";', 'import { useMotionProgress } from "../useMotionProgress";')
        s = s.replace("var t = state.t;", "var t = useMotionProgress();")
    if name in ("Rewards", "BirdLooks"):
        # Lovable (12 Nov): old prototype look purchases are cleared once before the page reads them
        a = 'import { useDC } from "../dc";'
        assert s.count(a) == 1, "%s logic patch failed: reset import" % name
        s = s.replace(a, a + '\nimport { resetPrototypeLooks } from "../resetPrototypeLooks";')
        a = "  useEffect(() => {\n"
        assert a in s, "%s logic patch failed: reset call" % name
        s = s.replace(a, a + "    resetPrototypeLooks();\n", 1)
    if name == "BirdLooks":
        # 12 Nov (night): leaving the Looks page stops its repeating preview and sound (boards have no unmount)
        a = "\n  }, []);\n"
        assert a in s, "BirdLooks logic patch failed: preview stop"
        s = s.replace(a, "\n    return function () { if (window.__hbLooks && window.__hbLooks.stopPreview) window.__hbLooks.stopPreview(); };" + a, 1)
    for a, b in LOGIC.get(name, []):
        assert s.count(a) == 1, "%s logic patch failed: %s" % (name, a[:60])
        s = s.replace(a, b)
    open(p, "w").write(s)


def add_style_import(key):
    """Each screen's scoped styles (keyframes like hb-marq) load from src/styles.css."""
    p = os.path.join(ROOT, "src", "styles.css")
    s = open(p).read()
    line = '@import "./haiba/styles/%s.css";' % key
    if line not in s:
        anchor = '@import "./haiba/styles/basket.css";'
        assert anchor in s, "styles.css: import anchor missing"
        s = s.replace(anchor, anchor + "\n" + line, 1)
        open(p, "w").write(s)


def main():
    src = sys.argv[1]
    names = sys.argv[2:] or list(BOARDS)
    tmp = os.path.join(ROOT, ".port-tmp")
    for board in names:
        key, name = BOARDS[board]
        subprocess.check_call([sys.executable, os.path.join(ROOT, "tools", "dc2react.py"), os.path.join(src, board + ".dc.html"), key, name, tmp])
        for sub, fn in (("pages", name + ".tsx"), ("logic", key + ".ts"), ("styles", key + ".css")):
            dst = os.path.join(OUT, "screens" if sub == "pages" else sub, fn)
            os.replace(os.path.join(tmp, sub, fn), dst)
        patch_screen(name)
        patch_logic(key, name)
        add_style_import(key)
        print("ported", board, "->", name)


main()
