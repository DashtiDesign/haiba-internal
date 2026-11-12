# Key a Seedance look video (bird on flat green) into the hub format, matching the classic bird:
# 412 x 560 RGBA, 10 fps, bird scaled and placed like hub-still (crest at y 102, soles at y 545, centre x 184.5),
# loop ending on its own first frame. Writes <out>.webp, <out>.avif and, with --still, <stillout>.webp.
# usage: python3 -I key_look.py video.mp4 out_prefix [--still still_out.webp] [--dx px] [--xfade n] [--box l,t,b,cx]
import sys, os, subprocess, tempfile, glob, argparse
import numpy as np
from PIL import Image, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument("video"); ap.add_argument("out")
ap.add_argument("--still"); ap.add_argument("--dx", type=float, default=0)
ap.add_argument("--xfade", type=int, default=3)
ap.add_argument("--from-still", dest="from_still", help="blend the first and last frames into this still (when a video's first frame drifts from the look's still)")
ap.add_argument("--pad", help="L,R extra px for a wide look, to match its other file (use with --wide)")
ap.add_argument("--wide", action="store_true", help="keep the full video width (for looks that move past the classic box); prints the extra px left and right")
ap.add_argument("--trim", action="store_true", help="with --wide: keep only the room the look uses")
ap.add_argument("--padt",type=int, help="extra px on top for a wide look (default: all the room the video has above him)")
ap.add_argument("--edge", action="store_true", help="13 Nov: clean a 4 px edge band (no lime rule, despill); for golden or yellow characters that kept a green outline")
ap.add_argument("--padb", type=int, default=0, help="13 Nov: extra px below the classic box, for a look that reaches below his feet (the puppy running in front); with --trim only what is used is kept")
ap.add_argument("--box",help="top,bottom,cx in source px, to reuse the placement of another file of the same look")
a = ap.parse_args()

W, H, TOP, BOT, CX = 412, 560, 102, 545, 188.5  # CX = centre of his feet in hub-still

tmp = tempfile.mkdtemp()
subprocess.run(["ffmpeg", "-v", "error", "-i", a.video, "-vf", "fps=10", f"{tmp}/f%04d.png"], check=True)
files = sorted(glob.glob(f"{tmp}/f*.png"))

def key(rgb, bgc):
    # Alpha from the distance to the real backdrop colour, so lime and yellow (high red) stay solid.
    x = rgb.astype(float)
    d = np.sqrt(((x - bgc) ** 2).sum(-1))
    alpha = np.clip((d - 45) / 55, 0, 1)
    # Light green haze and glow (lit by the backdrop) is far from the backdrop colour but still green-dominant.
    # Lime props (the dragon's belly) stay under a spill of ~30, so they are kept solid.
    spill0 = x[..., 1] - np.maximum(x[..., 0], x[..., 2])
    # Lime and yellow (the Haiba lime logo, volt boots, fins: strong red, almost no blue) are not haze, so they stay.
    lime = (x[..., 0] > 120) & (x[..., 2] < x[..., 0] * 0.6)
    band = None
    if a.edge:
        # 13 Nov (puppy): at a golden edge the mix of gold and green also looks "lime", so the outline stayed green.
        # In a 4 px band next to the backdrop the lime rule does not apply and the green is taken out.
        bgm = Image.fromarray(((alpha < 0.5) * 255).astype("uint8"))
        band = (np.asarray(bgm.filter(ImageFilter.MaxFilter(9))) > 0) & (alpha >= 0.5)
        lime = lime & ~band
    alpha = np.where(lime, alpha, np.minimum(alpha, np.clip(1 - (spill0 - 28) / 34, 0, 1)))
    # Unmix the backdrop from soft pixels (edges, glow, sparkles, motion blur): colour = (pixel - (1 - a) * green) / a.
    ae = np.maximum(alpha, 0.2)[..., None]
    un = np.clip((x - (1 - ae) * bgc) / ae, 0, 255)
    x = np.where((alpha < 1)[..., None], un, x)
    r, g, b = x[..., 0], x[..., 1], x[..., 2]
    mx = np.maximum(r, b)
    x[..., 1] = np.where((alpha < 1) & (g > mx + 8), mx + 8, g)  # any green left in a soft pixel goes
    if band is not None:
        # edge pixels: green no higher than the average of red and blue (a standard despill), only in the band
        x[..., 1] = np.where(band, np.minimum(x[..., 1], (r + b) / 2 + 6), x[..., 1])
    im = Image.fromarray(np.dstack([x, alpha * 255]).astype("uint8"), "RGBA")
    al = im.getchannel("A").filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    im.putalpha(al)
    return im

first = np.array(Image.open(files[0]).convert("RGB"))
BGC = np.median(np.concatenate([first[:8].reshape(-1, 3), first[-8:].reshape(-1, 3)]), 0).astype(float)
if a.box:
    top, bot, cx = map(float, a.box.split(","))
else:
    m = np.sqrt(((first.astype(float) - BGC) ** 2).sum(-1)) > 72
    ys, xs = np.where(m)
    top, bot = ys.min(), ys.max()
    feet = ys > bot - (bot - top) * 0.06  # centre on his feet, so a prop beside him does not move him
    cx = (xs[feet].min() + xs[feet].max()) / 2
s = (BOT - TOP) / (bot - top)
L = cx - (CX - a.dx) / s
T = top - TOP / s
box = (L, T, L + W / s, T + H / s)
PADL = PADR = 0
if a.wide:
    srcw = first.shape[1]
    PADL, PADR = round(L * s), round((srcw - (L + W / s)) * s)
    if a.pad:
        PADL, PADR = map(int, a.pad.split(","))
    # 12 Nov: room on top too, for looks that fly or throw above his head (the falcon, the dragon's fire).
    PADT = max(0, round(T * s)) if a.padt is None else a.padt
    box = (L - PADL / s, T - PADT / s, L + W / s + PADR / s, T + H / s + a.padb / s)
    W = W + PADL + PADR
    H = H + PADT + a.padb
    print("wide: extra px left", PADL, "right", PADR, "top", PADT, "width", W, "height", H)
print("source", first.shape, "box top,bottom,cx =", f"{top},{bot},{cx}", "scale", round(s, 4))

frames = []
for f in files:
    rgb = Image.open(f).convert("RGB")
    # pad with the backdrop green so crops past the edge stay keyable. Not the frame's corner pixel: when a wing or
    # the fire covers the corner, that filled the area past the video with a solid bar (the dragon's green bar, 12 Nov).
    bg = tuple(int(v) for v in BGC)
    # enough green around the video for the whole crop (a wide look's idle can reach far past its smaller video)
    pad = int(max(400, -min(box[0], box[1]), max(box[2] - rgb.width, box[3] - rgb.height))) + 8
    big = Image.new("RGB", (rgb.width + 2 * pad, rgb.height + 2 * pad), bg)
    big.paste(rgb, (pad, pad))
    c = big.crop(tuple(round(v + pad) for v in box))
    frames.append(key(np.array(c), BGC).resize((W, H), Image.LANCZOS))

if a.wide and not a.pad and a.padt is None and a.trim:
    # A roomy video (bird small in the frame) leaves a lot of empty green. Keep only the room the look uses, plus a
    # 28 px margin, and never less than the classic 412 x 560 box. The idle then reuses these pads (--pad, --padt).
    un = np.zeros((H, W), bool)
    for fr in frames:
        un |= np.asarray(fr)[..., 3] > 8
    ys, xs = np.where(un)
    cl = max(0, min(PADL, xs.min() - 28))
    cr = min(W, max(PADL + 412, xs.max() + 29))
    ct = max(0, min(PADT, ys.min() - 28))
    # below his feet: keep the classic 560 px box, plus what a --padb look really uses (and an 8 px margin)
    base = H - a.padb
    cb = min(H, max(base, ys.max() + 9)) if a.padb else H
    frames = [fr.crop((cl, ct, cr, cb)) for fr in frames]
    PADL, PADR, PADT = PADL - cl, PADR - (W - cr), PADT - ct
    PADB = cb - base
    W, H = cr - cl, cb - ct
    print("trimmed: extra px left", PADL, "right", PADR, "top", PADT, "bottom", PADB, "width", W, "height", H)
if a.wide:
    # The video edge can cut through a wing or the fire; fade the outer 20 px so it never ends in a hard line.
    ramp = np.ones(W)
    f = 20
    ramp[:f] = np.linspace(0, 1, f)
    ramp[-f:] = np.linspace(1, 0, f)
    for i, fr in enumerate(frames):
        arr = np.array(fr).astype(float)
        arr[..., 3] *= ramp[None, :]
        frames[i] = Image.fromarray(arr.astype("uint8"), "RGBA")
if a.from_still:
    ref = Image.open(a.from_still).convert("RGBA")
    assert ref.size == frames[0].size, (ref.size, frames[0].size)
    for k in range(3):
        frames[k] = Image.blend(ref, frames[k], k / 3)
n = len(frames)
for k in range(a.xfade):
    t = (k + 1) / (a.xfade + 1)
    i = n - a.xfade + k
    frames[i] = Image.blend(frames[i], frames[0], t)
frames.append(frames[0].copy())  # hold the still for the last tick, like the classic loops

dur = 100
frames[0].save(a.out + ".webp", save_all=True, append_images=frames[1:], duration=dur, loop=0, quality=60,
               alpha_quality=60, method=6, minimize_size=True, allow_mixed=True, kmax=60)
frames[0].save(a.out + ".avif", save_all=True, append_images=frames[1:], duration=dur, loop=0, quality=55, speed=4)
if a.still:
    frames[0].save(a.still, "WEBP", quality=85)
print(a.out, len(frames), "frames,", len(frames) * dur, "ms,",
      os.path.getsize(a.out + ".webp"), "webp bytes,", os.path.getsize(a.out + ".avif"), "avif bytes")
