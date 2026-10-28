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
}
PD = 'href="#" onClick={(e: any) => e.preventDefault()}'


def go(route):
    return 'href="#" onClick={(e: any) => { e.preventDefault(); go("%s"); }}' % route


def go_item(var):
    return 'href="#" onClick={(e: any) => { e.preventDefault(); if (%s.href) go(%s.href); }}' % (var, var)


GO_VAR = 'href="#" onClick={(e: any) => { e.preventDefault(); if (v.navTipHref) go(v.navTipHref); }}'

# Placeholder links (href="#") in the order they appear in each screen. None = stays a placeholder.
LINKS = {
    "Hub": [None, None, None, go_item("u"), GO_VAR, go("/"), None, None, None],
    "Plans": [None, go("/")],
    "Wallet": [go_item("a"), go("/shop/coffee-bean/redeem"), None, None, go("/shop/coffee-bean"), go("/shop/coffee-bean")],
}

# Extra text patches on the screen (TSX) and logic (TS) files.
SCREEN = {
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
    "Hub": [
        ("var target = isNew ? 500 : 1240;", "var target = props.available;"),
        ("      navTipCta:", "      navTipHref: isNew ? '' : '/shop/coffee-bean/redeem',\n      navTipCta:"),
    ],
    "Wallet": [
        ("points: n(isNew ? 500 : 1240),", "points: n(props.available),"),
        ("{ mark: '+', label: 'Earn' }", "{ mark: '+', label: 'Earn', href: '/shop/coffee-bean' }"),
        ("{ mark: '★', label: 'Rewards' }", "{ mark: '★', label: 'Rewards', href: '/shop/coffee-bean' }"),
        ("{ mark: '#', label: 'My codes' }", "{ mark: '#', label: 'My codes', href: '/haiba/basket' }"),
    ],
    "Shop": [
        ("var balance = 1240;", "var balance = props.base;"),
        # Lovable: one shared muted grey
        ("ptsInk: can || held || used ? '#4F25D6' : '#8A8A96',", "ptsInk: can || held || used ? '#4F25D6' : 'var(--hb-muted-ink)',"),
    ],
    "Welcome": [("if (st === 3) { setState({ step: 0, dir: 'l', gift: -1 }); }", "if (st === 3) { nav('/haiba'); }")],
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
            "reset: function () { setState({ done: false, cancelled: [], accepted: [], qty: [0, 0, 0], codesQty: null }); nav('/shop/coffee-bean'); },",
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
    if name.startswith("Promo"):
        # Promo tests: the CTA docks to the screen bottom and the "you are in early" sheet covers the screen
        s = s.replace('<div className="hb-fixed-bottom">', '<div className="hb-fixed-bottom hb-cta-dock">', 1)
        s = s.replace('padding: "36px 16px 20px 16px"', 'padding: "36px 16px calc(20px + env(safe-area-inset-bottom, 0px)) 16px"', 1)
        s = s.replace('position: "absolute", inset: "0", background: "rgba(20,16,40,0.5)", zIndex: "10"', 'position: "fixed", inset: "0", background: "rgba(20,16,40,0.5)", zIndex: "60"', 1)
        s = s.replace('padding: "0 20px 26px 20px", textAlign: "center"', 'padding: "0 20px calc(26px + env(safe-area-inset-bottom, 0px)) 20px", textAlign: "center", maxWidth: "430px", margin: "0 auto"', 1)
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
    for a, b in LOGIC.get(name, []):
        assert s.count(a) == 1, "%s logic patch failed: %s" % (name, a[:60])
        s = s.replace(a, b)
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
        print("ported", board, "->", name)


main()
