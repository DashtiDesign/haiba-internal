## Welcome videos: speed, video 4 start, autoplay fix, smoothing trial

1. **Autoplay on every step.** Moving to the next step will always play that step's video. Tapping a video replays it once it has finished.
2. **2x speed** for videos 1, 2, 3 and 5. Video 4 keeps its normal speed.
3. **Video 4 start.** Its opening still and first frame will be a clear background with no parrot in view, so the parrot walks in cleanly instead of showing a stray wing and body at the edges.
4. **Smoothing trial on video 3.** I'll create in-between frames to take it from 24fps to 48fps. If the wings wobble or smear, I'll keep the original.

### Technical details
- **Autoplay (cause not yet confirmed).** `WelcomeVideo` stays mounted across steps, and `replay()` runs as soon as the step changes. The new `src` probably hasn't loaded yet, so `play()` gets aborted, the catch unlocks the video, and nothing retries. First, reproduce this with Playwright. Then fix it in two ways: key the component by step in `Welcome.tsx` so each step gets a fresh video element, and inside `replay()` wait for `loadeddata` when `readyState < 2` before calling `play()`. Re-verify by stepping 1 → 5.
- **Speed.** Add a `rate` field to each entry in `welcomeVideos.ts` (2, or 1 for step 4). Set `playbackRate` and `defaultPlaybackRate` from it before every `play()`. Step 4's tail fade uses `currentTime`, so it stays in sync.
- **Video 4.** Scan the packed asset's alpha half to find the first frame where coverage is near zero, then trim the clip to start there (ffmpeg `-ss`). Re-encode, regenerate the poster from that frame, upload both as new assets, and update the registry.
- **Video 3 smoothing.** Run ffmpeg `minterpolate=fps=48:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1` over the full packed frame (colour and alpha together). Encode H.264 at CRF 19, 720x720. Check sample frames for warping before switching step 3 over.
- **Tests.** Update `src/test/welcome-video.test.tsx` to cover: autoplay after a step change, the rate on each step (2, with 1 for step 4), and the tap lock. Run the tests.
