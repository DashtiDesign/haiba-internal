<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep shared mobile sizing and safe-area safeguards in `src/haiba/haiba.css`; use named screen classes for narrow-layout exceptions so the original canvas styles remain isolated.
- Use the shared MotionExperience layer for canvas animation hooks and control feedback; use Motion React at explicit panel boundaries so animations preserve inline transforms and fixed-bottom layout.
- Keep text-bearing entrance animations fully opaque and preserve decorative baseline opacity; motion must not reduce foreground/background contrast.
- Disable legacy canvas CSS animations before hydration and supply initial animated positions in styles so first paint is complete; preload route chunks on navigation intent.
- Deliver canvas bird images through the shared Artwork component and immutable WebP asset registry; preserve intrinsic dimensions and preload only initial route artwork to avoid late layout shifts and competing downloads.
- Keep home-screen installation manifest-only, with real public app icons and shared root head links; add no app-shell service worker unless offline support is explicitly requested, to avoid stale preview caches.
- Deliver welcome videos as padded, pre-keyed premultiplied RGB/alpha packed H.264 through WelcomeVideo's GPU renderer with matching transparent final-frame posters; preserve matte quality, clamp sampling within each half, and avoid applying alpha twice to prevent green fringes while keeping browser-compatible playback.
- Use a full-character idle poster for welcome footage that exits the source frame; feather source boundaries consistently on posters and playback to conceal baked-in square cuts.
