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
ap.add_argument("--wide", action="store_true", help="keep the full video width (for looks that move past the classic box); prints the extra px left and right")
ap.add_argument("--box", help="top,bottom,cx in source px, to reuse the placement of another file of the same look")
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
    alpha = np.minimum(alpha, np.clip(1 - (spill0 - 28) / 34, 0, 1))
    # Unmix the backdrop from soft pixels (edges, glow, sparkles, motion blur): colour = (pixel - (1 - a) * green) / a.
    ae = np.maximum(alpha, 0.2)[..., None]
    un = np.clip((x - (1 - ae) * bgc) / ae, 0, 255)
    x = np.where((alpha < 1)[..., None], un, x)
    r, g, b = x[..., 0], x[..., 1], x[..., 2]
    mx = np.maximum(r, b)
    x[..., 1] = np.where((alpha < 1) & (g > mx + 8), mx + 8, g)  # any green left in a soft pixel goes
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
    box = (L - PADL / s, T, L + W / s + PADR / s, T + H / s)
    W = W + PADL + PADR
    print("wide: extra px left", PADL, "right", PADR, "width", W)
print("source", first.shape, "box top,bottom,cx =", f"{top},{bot},{cx}", "scale", round(s, 4))

frames = []
for f in files:
    rgb = Image.open(f).convert("RGB")
    bg = rgb.getpixel((4, 4))
    # pad with the green so crops past the edge stay keyable
    pad = 400
    big = Image.new("RGB", (rgb.width + 2 * pad, rgb.height + 2 * pad), bg)
    big.paste(rgb, (pad, pad))
    c = big.crop(tuple(round(v + pad) for v in box))
    frames.append(key(np.array(c), BGC).resize((W, H), Image.LANCZOS))

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
