"""Convert a Design canvas .dc.html board into a React page (TSX), its logic hook, and scoped CSS.

Usage: python3 dc2react.py <in.dc.html> <key> <Component> <outdir>
Writes: <outdir>/pages/<Component>.tsx, <outdir>/logic/<key>.ts, <outdir>/styles/<key>.css
Markup and inline styles are copied value for value, so the result matches the canvas 1:1.
"""
import json, re, sys
from html.parser import HTMLParser

VOID = {"img", "input", "br", "hr", "meta", "link", "source"}
ROUTES = {
    "Character.dc.html": "/haiba",
    "Plans.dc.html": "/haiba/plans",
    "Points.dc.html": "/haiba/points",
    "Story.dc.html": "/haiba/welcome",
    "Wallet.dc.html": "/haiba/wallet",
    "Offer.dc.html": "/shop/coffee-bean/redeem",
    "Shop.dc.html": "/shop/coffee-bean",
    "Basket.dc.html": "/haiba/basket",
    "Travel.dc.html": "/haiba/travel",
    "Rewards.dc.html": "/haiba/rewards",
    "BirdLooks.dc.html": "/haiba/looks",
    "Earn.dc.html": "/haiba/earn",
    "Cod01RewardCode.dc.html": "/haiba/code?kind=reward",
    "Hlp01Help.dc.html": "/haiba/help",
    "Mem01Membership.dc.html": "/haiba/membership",
    "Sav01Saved.dc.html": "/haiba/saved",
    "Sub01Offers.dc.html": "/haiba/subscriptions",
}
BLOBS = {
    # 12 Nov: smaller Haiba pages art (focus_pages4)
    "b89c59f74e9345d64a3368bbb57d8fd6": "/haiba/promo/box.webp",
    "6ba918ff45118bc3f2a4fa6759ce0caa": "/haiba/promo/pile.webp",
    "44a51158d820fc55347ada5641ed0eaf": "/haiba/promo/boost.webp",
    "73fe226dd1d28656ad2a00e30f719fd7": "/haiba/promo/phone-code.webp",
    "811f87a61b73f6be7103749c3192ab3e": "/haiba/promo/coins-cup.webp",
    "13ef4eddeb8722122e442bab10365ada": "/haiba/promo/phone-pick.webp",
    "438ab92e63e6958ff1c501917665f598": "/haiba/promo/phone-coupon.webp",
    "7ab45e5eada618030c6795af3ceeaaac": "/haiba/coins/coin-stack-3d.webp",
    "063548d55310ed6e3f9895fe48ccf152": "/haiba/categories/cafes.webp",
    "722775ab748379b280473732bf12710d": "/haiba/categories/restaurants.webp",
    "84d295bbf4afd632e8b18a6926df6a4c": "/haiba/categories/fitness.webp",
    "3fb8a343580276b905f080452e633175": "/haiba/categories/self-care.webp",
    "edf51bb65e92d42087797b296a1da245": "/haiba/categories/entertainment.webp",
    "ff418f59e74495300d31b877a88d880e": "/haiba/categories/car-care.webp",
    # Flags: flag-icons package (MIT), 1x1 set
    "c58fbb4c6f9b22d936ee81358bb04daf": "/haiba/flags/bh.svg",
    "89985deb2d8ae7f5ab82475d1109c20b": "/haiba/flags/sa.svg",
    "537cc5876b8492105f295bf693e5ee03": "/haiba/flags/qa.svg",
    "9c87e2a613f2a605c125653d1a5aba4e": "/haiba/flags/om.svg",
    "9eda5527dade7e2e5f147b0df22bbfcc": "/haiba/brands/airalo.svg",
    "b682e59521986d75feebe95b9ccc1959": "/haiba/brands/airalo-white.svg",
    "141cfa71010b236a2146739792a8988e": "/haiba/brands/airalo-mark.svg",
    "e154a7d6a14c5881781f8dfe345cd94f": "/haiba/birds/01-cheer.png",
    "cfdeab93c544baa3ae4e63b0a0685ee8": "/haiba/emoji/drink.webp",
    "c8e70b460b3f9f7794cdca22ce6e8d8c": "/haiba/emoji/iced.webp",
    "efe4891cba0770192685e50c7727c1ab": "/haiba/emoji/cookie.webp",
    "249f05272d9c279a06cce209b7e78579": "/haiba/emoji/pastry.webp",
    "970d79b8d5a81a41c76c59044162a24c": "/haiba/emoji/tea.webp",
    "110f04e1f78509f33375007653c36170": "/haiba/emoji/crepe.webp",
    "8a1aceef084613d7f84dc2a86c4be8fb": "/haiba/emoji/fries.webp",
    "7966dbe5a66af347ddac1fc8f64b3428": "/haiba/emoji/samosa.webp",
    "9ccd22feb952f171794172a117d49029": "/haiba/emoji/wings.webp",
    "88e03b3a3060701a521e92ab3fc0169d": "/haiba/emoji/shake.webp",
    "09310fbc521bbf3a9e4a3123b5dd572c": "/haiba/emoji/perfume.webp",
    "62ada640f1840ceac1e5d1e8785a4bd0": "/haiba/emoji/popcorn.webp",
    "9dadbc27e7c59cba16bf71739c3f4590": "/haiba/emoji/car.webp",
    "098808e3057c4073a7b794d8267f5021": "/haiba/emoji/gift.webp",
    "bef00874c9eda12fb49ec33a376a748f": "/haiba/emoji/ticket.webp",
    "f8ba90e466a8ec9c015df35f9cc9e5f4": "/haiba/emoji/music.webp",
    "a23264a0b0f412cb1f5ffe249580d581": "/haiba/emoji/sparkles.webp",
    "479610668f0853754cecc6e9d39fd057": "/haiba/emoji/receipt.webp",
    "a56dc6ee08257c34885c07a7d0bbe77f": "/haiba/emoji/card.webp",
    "0312f08de9b3249e6083dccc1c2b539b": "/haiba/emoji/party.webp",
    "7a36a684d1a670ea4d356cf20aae0b2a": "/haiba/emoji/hourglass.webp",
    "08cada69fb33d628ae0409ca3bcb23b8": "/haiba/emoji/calendar.webp",
    "b7b4d244b79b4cf61f7ceadfed4bc0f0": "/haiba/birds/02-jump.png",
    "af2d09322c5597090fa6cd876caa6379": "/haiba/birds/03-wink.png",
    "051ee61596c8a0a893f6b31eebf6be20": "/haiba/birds/04-peek.png",
    "6f7c6bd8956b97b8e369d6e7440ea8b1": "/haiba/birds/05-shrug.png",
    "41315a46f759aff93b0a2ae419a1f516": "/haiba/birds/06-coin.png",
    "f89753a5902c9f4b4920af0bd411be06": "/haiba/birds/07-phone.png",
    "b31e280f2b4f6a505ba69e049258f788": "/haiba/birds/08-stamp.png",
    "763d14b8c7f9dc30bebaded40b37de81": "/haiba/birds/09-show.png",
    "75d130321ac949a1dc131f57a8a8d046": "/haiba/birds/10-gift.png",
    "3923955722f925a9729fdc7b4b68067f": "/haiba/birds/11-run.png",
    "e483d75f4499733806d4c208090459ca": "/haiba/birds/12-ledge.png",
    "757d3f02182442a8b9da690032dcc4b2": "/haiba/birds/13-fist.png",
    "9eab2ffacb4657a867fecb1645d4cbff": "/haiba/birds/14-sit.png",
    "b976d41864d816b6395e757d2480b750": "/haiba/birds/15-receipt.png",
    "36a5914ac8036e7186a3395e9a9de81b": "/haiba/birds/16-torn.png",
    "7f6ac18dcfbb818170a44d52804fa31d": "/haiba/logo-lime.svg",
    "11627cd42f9669ec15cd306145b7e143": "/haiba/logo-purple.svg",
    "0d4c5d010234f99775c06dab4dc63dac": "/haiba/brands/vox.webp",
    "b3ce18ae9ceabe70d7fdb718dccf7f32": "/haiba/brands/coffee-bean.webp",
    "50e30abfee8086245e24b82e5f33529b": "/haiba/brands/alkuwaiti.webp",
    "82364cb26b1195be0a503039925a2eb0": "/haiba/brands/grip.webp",
    "9163726a14d1e4869c71e417a3a87155": "/haiba/brands/albayan.webp",
    "c1e6f5f43bf6c8ea66f354b776557213": "/haiba/brands/wingman.webp",
    "8b3c887e681b9be68b9f81af3de4af22": "/haiba/brands/chatgpt.webp",
    # 11 Nov: subscription partners. Bahrain talabat pro and ChatGPT Go, Saudi HungerStation Plus and YouTube Premium Lite.
    "f376a7a0fb72b7ae5fc57dd85a2b1b70": "/haiba/brands/talabat.webp",
    "67c19a5c31e6b3403b41d2cb6520cd0f": "/haiba/brands/hungerstation.webp",
    "6bfd0bd9fb669736cf937365ec7568f3": "/haiba/brands/youtube.webp",
    "badc2628e905d2a79b03cb243d1a8c66": "/haiba/birds/17-coin-toss.webp",
    "f1899123e4534d5b5d0a8161aa0ef50f": "/haiba/birds/17-coin-toss.webp",
    "9fe36060ebeb5decae4a3f854cbec118": "/haiba/coins/coin-front.webp",
    "9291b1502bc66437ec6d75fd7f955c77": "/haiba/coins/coin-34.webp",
    "84fd2f8fb8654cb616f9930c21d9459c": "/haiba/coins/coin-flip.webp",
    "0d9e8a337892ba1efe85bd1f2977f6cb": "/haiba/coins/coin-stack.webp",
    "0fa51e8e02bf88165020c9ea064d42fb": "/haiba/icons/hadiya.webp",
    "04457c14b2e45ec071989f35db4b0ca8": "/haiba/birds/18-joined.webp",
    "413483a80b085a72e185af89d489bed5": "/haiba/motion/hub-shades.webp",
    "46c8e5aa381bb35a0f4c84743e87a87d": "/haiba/motion/hub-coin.webp",
    "6dc8f1d17323a7e9b0b8e9d50368a752": "/haiba/motion/hub-still.webp",
    # 12 Nov: look stills at full width (tiles and previews centre on his feet), from the bird-looks folder in Cloud.
    # 12 Nov (evening): final bird look stills, in Lovable Cloud
    "ce43a12b3fa7a585954bc4c2e7e2aff1": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/fish-still.webp",
    "ec53da96493c825a2775d055b5a068e5": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/melon-still.webp",
    "92896f197ff2d0f0ffe17bafd86bd74e": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/gold-wide-still.webp",
    "a7de253f602520b5c1d2821d713cd216": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/f1-wide-still.webp",
    "d31ce242c4d4af7fc98023b5e8e34756": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/dragon-wide-still.webp",
    "70fbbb11d2bdbe7c11b9b38c39a9e4e4": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/football-wide-still.webp",
    "f301acfb20ab2b394c46ab93a722f3fd": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/karak-wide-still.webp",
    "e8cf4b91660834a29d2656867095d4a5": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/pearl-wide-still.webp",
    "af699b996cb4e9ce80ca2b30812ed6c8": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/falcon-still.webp",
    "b0f31d68b9a236fb648c32674f58d7d6": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/ghutra-still.webp",
    "3b349a07ea97e491133d82cfc050b1d1": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/shemagh-still.webp",
    "f7ebb9c2c486eaa7038041eee5af8ccc": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/gold-wide-still.webp",
    "07dc77553ad1f4fd2c2e5cb4e6b6ae1b": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/f1-wide-still.webp",
    "ae241374264076fa51f1b0bdd1e8ec37": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/dragon-still.webp",
    "4fb04a89e54f23a7da9d7bf43d93b957": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/football-still.webp",
    "64f9eed6fae717cd3998e7a7c6a4a60f": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/karak-still-2.webp",
    "a3c66d04fbea5dd03fabcd573359560a": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/pearl-still.webp",
    # 12 Nov: legend bird looks, their stills, from the bird-looks folder in Lovable Cloud (same files the hub plays).
    "ae876cc4dea11ec8d00332e8c5a350fb": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/f1-still.webp",
    "1c3d70a34d95c7399078e2bf8a089a6d": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/gold-still.webp",
    "9e12c2bf06b222b245c164ccf11abb13": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/dragon-card.webp",
    "11caeb0d2594d4d046949fc305429478": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/football-card.webp",
    "4647dc88d42ac3f352033d790258b6f1": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/karak-still-2.webp",
    "827e237a0d8b60f37bbb3c6fd404e53b": "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/pearl-still.webp",
    "ff3c167255aa34baeeb95157156a51a9": "/haiba/birds/26-gift.webp",
    "13b432061e8e721b86b394f8f645d382": "/haiba/birds/27-coin.webp",
    "232f6e4b206d3bd4b7d69ae96c2c74a6": "/haiba/motion/hub-idle.webp",
    "3790ebcba1e76f32fc239671d0b58df1": "/haiba/birds/19-hourglass.webp",
    "200592c8713b1c9cf0122135f51f3502": "/haiba/birds/20-code-expired.webp",
    "60b8b163002a266128dec43c5a4f8379": "/haiba/birds/21-student-id.webp",
    "b26e8037e044d905bcb9f3f346f9cc17": "/haiba/birds/22-rope.webp",
    "ca15ceac418929def4be2aecc493953b": "/haiba/birds/23-map.webp",
    "df2214a10b7bce9f68be702197332d22": "/haiba/birds/24-hug.webp",
    "b756321a0a61390fcd596b777c61b4d6": "/haiba/birds/25-empty-box.webp",
}
ATTR_CASE = {
    "viewbox": "viewBox", "preserveaspectratio": "preserveAspectRatio", "onclick": "onClick", "oninput": "onInput", "onchange": "onChange", "ondragstart": "onDragStart", "ondragover": "onDragOver", "ondrop": "onDrop", "ondragend": "onDragEnd",
    "tabindex": "tabIndex", "class": "className", "for": "htmlFor", "readonly": "readOnly",
    "maxlength": "maxLength", "autocomplete": "autoComplete", "gradientunits": "gradientUnits",
}


def blob(s):
    return re.sub(r"/_blob/([0-9a-f]{32})", lambda m: BLOBS.get(m.group(1), m.group(0)), s)


class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent, self.children = tag, attrs, parent, []


class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("#root", [], None)
        self.cur = self.root
        self.raw_style = []
        self.in_style = False

    def handle_starttag(self, tag, attrs):
        if tag == "style":
            self.in_style = True
            return
        n = Node(tag, attrs, self.cur)
        self.cur.children.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        n = Node(tag, attrs, self.cur)
        self.cur.children.append(n)

    def handle_endtag(self, tag):
        if tag == "style":
            self.in_style = False
            return
        if tag in VOID:
            return
        n = self.cur
        while n is not None and n.tag != tag:
            n = n.parent
        if n is not None and n.parent is not None:
            self.cur = n.parent

    def handle_data(self, data):
        if self.in_style:
            self.raw_style.append(data)
            return
        self.cur.children.append(data)


HOLE = re.compile(r"\{\{\s*([^}]+?)\s*\}\}")


class Conv:
    def __init__(self, key):
        self.key = key
        self.scope = []  # loop variable names, innermost last

    def expr(self, path):
        path = path.strip()
        if path in ("true", "false"):
            return path
        head = path.split(".")[0]
        if head == "$index":
            return "idx%d" % (len(self.scope) - 1)
        if head in self.scope:
            return path
        return "v." + path

    def interp(self, s):
        """attribute value -> JSX expression string"""
        s = blob(s)
        parts = HOLE.split(s)
        if len(parts) == 1:
            return json.dumps(s)
        if len(parts) == 3 and parts[0] == "" and parts[2] == "":
            return self.expr(parts[1])
        out = []
        for i, p in enumerate(parts):
            if i % 2:
                out.append("${" + self.expr(p) + "}")
            else:
                out.append(p.replace("`", "\\`").replace("${", "\\${"))
        return "`" + "".join(out) + "`"

    def style(self, s):
        decls, depth, buf, q = [], 0, "", None
        for ch in s:
            if q:
                buf += ch
                if ch == q:
                    q = None
                continue
            if ch in "'\"":
                q = ch
            elif ch == "(":
                depth += 1
            elif ch == ")":
                depth -= 1
            if ch == ";" and depth == 0:
                decls.append(buf)
                buf = ""
            else:
                buf += ch
        decls.append(buf)
        items = []
        for d in decls:
            if ":" not in d:
                continue
            k, val = d.split(":", 1)
            k, val = k.strip(), val.strip()
            if not k:
                continue
            ck = re.sub(r"-([a-z])", lambda m: m.group(1).upper(), k)
            items.append("%s: %s" % (ck, self.interp(val)))
        return "{{ " + ", ".join(items) + " }}"

    def attrs(self, n, extra=None):
        out = []
        for k, val in n.attrs:
            if k.startswith("hint-"):
                continue
            val = "" if val is None else val
            name = ATTR_CASE.get(k, k)
            if name.startswith(("aria-", "data-")) or name == "role":
                pass
            elif "-" in name:
                name = re.sub(r"-([a-z])", lambda m: m.group(1).upper(), name)
            if name == "style":
                out.append("style=" + self.style(val))
                continue
            if name == "href":
                continue
            e = self.interp(val)
            out.append("%s={%s}" % (name, e) if not e.startswith('"') else "%s=%s" % (name, e))
        if extra:
            out.extend(extra)
        return (" " + " ".join(out)) if out else ""

    def text(self, t, ind):
        t = re.sub(r"\s+", " ", t)
        if t.strip() == "":
            return ""
        parts = HOLE.split(t)
        out = []
        for i, p in enumerate(parts):
            if i % 2:
                out.append("{" + self.expr(p) + "}")
            elif p:
                out.append("{" + json.dumps(p) + "}")
        return ind + "".join(out) + "\n"

    def is_root_level(self, n, root):
        p = n.parent
        while p is not None and p.tag == "sc-if":
            p = p.parent
        return p is root

    def emit(self, n, ind, root):
        if isinstance(n, str):
            return self.text(n, ind)
        if n.tag == "sc-for":
            a = dict(n.attrs)
            lst = HOLE.search(a["list"]).group(1)
            var = a["as"]
            depth = len(self.scope)
            le = self.expr(lst)
            self.scope.append(var)
            inner = "".join(self.emit(c, ind + "    ", root) for c in n.children)
            self.scope.pop()
            return "%s{(%s || []).map((%s: any, idx%d: number) => (\n%s  <Fragment key={idx%d}>\n%s%s  </Fragment>\n%s))}\n" % (
                ind, le, var, depth, ind, depth, inner, ind, ind)
        if n.tag == "sc-if":
            cond = self.expr(HOLE.search(dict(n.attrs)["value"]).group(1))
            inner = "".join(self.emit(c, ind + "  ", root) for c in n.children)
            return "%s{%s ? (\n%s  <>\n%s%s  </>\n%s) : null}\n" % (ind, cond, ind, inner, ind, ind)
        tag = n.tag
        a = dict(n.attrs)
        extra = []
        if tag == "a":
            href = a.get("href", "#")
            page, _, frag = href.partition("#")
            if page.endswith(".dc.html"):
                tag = "Link"
                extra.append('to="%s"' % ROUTES.get(page.split("/")[-1], "/"))
                if frag:  # 12 Nov: a link can open a section, for example Mem01Membership.dc.html#bird
                    extra.append('hash="%s"' % frag)
            else:
                extra.append('href="%s"' % href)
                if href == "#":
                    extra.append("onClick={(e: any) => e.preventDefault()}")
        at = self.attrs(n, extra)
        fixed = False
        if n is not root and self.is_root_level(n, root):
            st = a.get("style", "") or ""
            if "position: absolute" in st and re.search(r"(^|;)\s*bottom:", st):
                fixed = True
        if tag in VOID:
            s = "%s<%s%s />\n" % (ind, tag, at)
        else:
            inner = "".join(self.emit(c, ind + "  ", root) for c in n.children)
            if inner.strip():
                s = "%s<%s%s>\n%s%s</%s>\n" % (ind, tag, at, inner, ind, tag)
            else:
                s = "%s<%s%s></%s>\n" % (ind, tag, at, tag)
        if fixed:
            s = '%s<div className="hb-fixed-bottom"><div className="hb-fixed-inner">\n%s%s</div></div>\n' % (ind, s, ind)
        return s


def scope_css(css, key):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    names = re.findall(r"@keyframes\s+([\w-]+)", css)
    out = []
    i = 0

    def block(start):
        depth, j = 0, start
        while j < len(css):
            if css[j] == "{":
                depth += 1
            elif css[j] == "}":
                depth -= 1
                if depth == 0:
                    return j
            j += 1
        return j

    def prefix(sel):
        res = []
        for s in sel.split(","):
            s = s.strip()
            if not s or s == "body":
                continue
            res.append(".pg-%s %s" % (key, s))
        return ",".join(res)

    def rename(body):
        for nm in sorted(names, key=len, reverse=True):
            body = re.sub(r"(animation:\s*)%s(\b)" % re.escape(nm), r"\g<1>%s-%s\2" % (key, nm), body)
        return body

    def walk(text):
        res, i = [], 0
        while True:
            k = text.find("{", i)
            if k < 0:
                break
            head = text[i:k].strip()
            depth, j = 0, k
            while j < len(text):
                if text[j] == "{":
                    depth += 1
                elif text[j] == "}":
                    depth -= 1
                    if depth == 0:
                        break
                j += 1
            body = text[k + 1:j]
            if head.startswith("@keyframes"):
                nm = head.split()[1]
                res.append("@keyframes %s-%s{%s}" % (key, nm, body))
            elif head.startswith("@media"):
                res.append("%s{%s}" % (head, walk(body)))
            else:
                p = prefix(head)
                if p:
                    res.append("%s{%s}" % (p, rename(body)))
            i = j + 1
        return "\n".join(res)

    return walk(css) + "\n"


def port_logic(script, key):
    m = re.search(r"data-props='([^']*)'", script)
    body = script[script.index("class Component"):script.rindex("</script>")].rstrip() + "\n"
    init = "{}"
    mc = re.search(r"constructor\(props\)\s*\{\s*super\(props\);\s*this\.state\s*=\s*(\{.*?\});\s*\}", body, re.S)
    if mc:
        init = mc.group(1)
    mount = ""
    mm = re.search(r"componentDidMount\(\)\s*\{(.*?)\n  \}\n  renderVals", body, re.S)
    if mm:
        mount = mm.group(1)
    mr = re.search(r"renderVals\(\)\s*\{(.*)\n\s*\}\s*\n\}\s*$", body, re.S)
    rv = mr.group(1)

    def fix(s):
        s = s.replace("var self = this;", "")
        s = s.replace("self.setState(", "setState(").replace("this.setState(", "setState(")
        s = s.replace("self.state", "state").replace("this.state", "state").replace("this.props", "props")
        return blob(s)

    return """// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC(%s);
  useEffect(() => {%s
  }, []);
%s
}
""" % (fix(init), fix(mount), fix(rv))


def main():
    src, key, comp, outdir = sys.argv[1:5]
    html = open(src, encoding="utf-8").read()
    p = P()
    p.feed(html)
    xdc = None

    def find(n):
        nonlocal xdc
        for c in n.children:
            if isinstance(c, Node):
                if c.tag == "x-dc":
                    xdc = c
                    return
                find(c)

    find(p.root)
    roots = [c for c in xdc.children if isinstance(c, Node) and c.tag not in ("helmet",)]
    root = roots[0]
    # root sizing: phone width column that grows with content
    new = []
    for k, val in root.attrs:
        if k == "style":
            val = re.sub(r"width:\s*390px;", "width: 100%; max-width: 390px; margin: 0 auto;", val)
            val = re.sub(r"(^|;\s*)height:\s*\d+px;", r"\1min-height: 100svh;", val)
        new.append((k, val))
    root.attrs = new
    c = Conv(key)
    jsx = c.emit(root, "      ", root)
    tsx = """// @ts-nocheck
// Ported 1:1 from the Design canvas board "%s". Styles are copied value for value.
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useVals } from "../logic/%s";
import "../styles/%s.css";

export default function %s() {
  const v: any = useVals();
  return (
    <div className="pg-%s">
%s    </div>
  );
}
""" % (src.split("/")[-1], key, key, comp, key, jsx)
    import os
    for d in ("pages", "logic", "styles"):
        os.makedirs(os.path.join(outdir, d), exist_ok=True)
    open(os.path.join(outdir, "pages", comp + ".tsx"), "w").write(tsx)
    open(os.path.join(outdir, "styles", key + ".css"), "w").write(scope_css("".join(p.raw_style), key))
    script = re.search(r'<script type="text/x-dc".*?</script>', html, re.S).group(0)
    open(os.path.join(outdir, "logic", key + ".ts"), "w").write(port_logic(script, key))
    print("ok", comp)


main()
