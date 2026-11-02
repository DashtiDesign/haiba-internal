## Welcome videos: 2x speed, plus a smoothing trial on video 3

1. All five welcome videos play twice as fast, both on arrival and on tap-to-replay. The tap lock still lasts for the whole (now shorter) playback.
2. Trial on video 3 only: create in-between frames to go from 24fps to 48fps, so motion still looks fluid at 2x speed. If the wings wobble or smear, we keep the original.

### Technical details
- In `src/haiba/WelcomeVideo.tsx`, set `playbackRate` and `defaultPlaybackRate` to 2 before every `play()` call. Step 4's tail fade uses `currentTime`, so it stays in sync.
- Video 3: download the current packed asset and run ffmpeg `minterpolate=fps=48:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1` over the full packed frame, so the colour and alpha halves are interpolated together. Re-encode as H.264 (CRF 19, 720x720), upload it as a new asset, and point step 3 in `welcomeVideos.ts` at it. Check a few frames for warping before switching over.
- Update the welcome video test so it checks a playback rate of 2, and run it.
