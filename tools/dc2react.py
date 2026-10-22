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
}
BLOBS = {
    "e154a7d6a14c5881781f8dfe345cd94f": "/haiba/birds/01-cheer.png",
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
    "badc2628e905d2a79b03cb243d1a8c66": "/haiba/birds/17-coin-toss.webp",
    "9fe36060ebeb5decae4a3f854cbec118": "/haiba/coins/coin-front.webp",
    "9291b1502bc66437ec6d75fd7f955c77": "/haiba/coins/coin-34.webp",
    "84fd2f8fb8654cb616f9930c21d9459c": "/haiba/coins/coin-flip.webp",
    "0d9e8a337892ba1efe85bd1f2977f6cb": "/haiba/coins/coin-stack.webp",
}
ATTR_CASE = {
    "viewbox": "viewBox", "preserveaspectratio": "preserveAspectRatio", "onclick": "onClick",
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
            if href.endswith(".dc.html"):
                tag = "Link"
                extra.append('to="%s"' % ROUTES.get(href.split("/")[-1], "/"))
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
            val = re.sub(r"(^|;\s*)height:\s*\d+px;", r"\1min-height: 100vh;", val)
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
