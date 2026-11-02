## Smooth all welcome videos, set video 5 to normal speed

1. Add in-between frames to videos 1, 2, 4 and 5 (24 to 48 frames a second), the same way video 3 was done. If any video shows wobble or smearing, I'll keep its original.
2. Video 5 plays at normal speed. Videos 1, 2 and 3 stay at 2x, and video 4 stays at normal speed.

### Technical details
- Download each packed asset and run ffmpeg `minterpolate=fps=48:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1` on the full packed frame. Encode H.264 at CRF 19 (the same as video 3) with faststart.
- Check sample frames from each video for warping before switching it over.
- Video 1 is opaque footage with its background intact. Video 4 opens on empty frames, so trimming isn't needed; I'll confirm that frame 0 is still empty after interpolation.
- Upload the new files as assets and update `welcomeVideos.ts`. Video 5 changes to `rate: 1`.
- Update the expected rate in the test table (step 5 becomes 1), then run the tests and step through all five pages with Playwright.
