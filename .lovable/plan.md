## Play all welcome videos at 2x speed

All five welcome videos will play twice as fast on arrival and on tap-to-replay. The tap lock still lasts for the whole (now shorter) playback.

### Technical details
- In `src/haiba/WelcomeVideo.tsx`, set `video.playbackRate = 2` (and `defaultPlaybackRate = 2`) before every `play()` call.
- Keep step 4's time-based tail fade in sync. It uses `currentTime`, which follows the media timeline, so it stays aligned automatically.
- Leave the files unchanged. Nothing gets re-encoded, so loading speed stays the same.
- Update the welcome video test to check that the playback rate is 2, and run it.
