# The Radiance — updated page (handoff)

Updated copy + component for `secretkey.vip/the-radiance`.

**Why this lives here:** the Secret Key website is a Vite SPA deployed to Vercel
(project `secret-key-site`) **via the Vercel CLI from a local machine** — its source
is not in this repository, nor in any repo reachable from this session. This folder
is a handoff package: drop these files into the real site source and deploy.

## What changed

| | Before (live) | After |
|---|---|---|
| Circle size | "Only 8 leaders" / "Solo 8 líderes" | No cap — circle held at **~50** |
| Form scarcity | "Eight spaces… closes forever" | Open invitation, ~50 people |
| The Big Bang | one passing clause in the subtitle | **its own section** — it began with a few, and it was magic |
| After the Big Bang | absent | **new section** — what has opened since |
| Closing intention | absent | **new section** — what we come to release |
| Photography | 4 Unsplash stock backgrounds | 3 real Bali photos + 3 stock still to replace |

Narrative arc is now: *it was magic for a few → look what it opened → now we open
it up, close the cycle with intention, and put down what no longer belongs to us.*

## Files

- `copy.json` — all 7 languages (`en, es, fr, pt, it, va, hi`), 26 keys each, key parity verified.
  Three keys are new: `bigBang/bigBangBody`, `opened/openedBody`, `release/releaseBody`.
- `TheRadiance.jsx` — the page component, de-minified from the live bundle and restructured.
  Verified to parse and bundle with esbuild.
- `images/` — the three Bali photos, EXIF-rotated, resized to 1800px, progressive JPEG.

## To ship

1. Copy `images/*` → site `public/images/the-radiance/`
2. Copy `copy.json` + `TheRadiance.jsx` → wherever the current Radiance component lives
   (it is minified as `Fm` in `assets/index-*.js`)
3. Fix the import on line 2 to point at your real language hook (minified as `je`)
4. `npm run build && vercel --prod`

The form still posts to `/api/conscious-real-estate-funnel` with
`source: "the-radiance"` — unchanged, so no backend work needed.

## Still open

- **Dates.** Left exactly as live: **17–21 October 2026**, in all 7 languages.
  Change the `eyebrow` key in each language block once confirmed.
- **Real photography.** Three backgrounds are still Unsplash — marked `STOCK` in the
  `IMAGES` map at the top of the component (`fiveDays`, `release`, `decision`, `form`).
  These want real Big Bang photos with faces: the circle, the fire ceremony, the room.
  The three supplied photos are arrival/atmosphere shots, not the gathering itself.
- **Specifics in the story.** `bigBangBody` and `openedBody` are written from what is
  true and known — intimate, few people, Bali, and that the circle kept working
  afterwards. No dates, headcounts, names or outcomes were invented. Drop real detail
  in and they get much stronger.
