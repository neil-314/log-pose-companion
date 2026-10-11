# Log Pose — Your progress is the compass

One Piece information is easy to ask an AI for. Keeping a coherent journey is the product.

## Why use this instead of asking ChatGPT or Claude?

**There is no exclusive information here.** A chatbot can explain arcs, suggest movies, answer trivia and estimate watch time. This project does not claim a content moat, an AI advantage, or an irreplaceable feature.

Log Pose turns one progress checkpoint into a repeatable interface: completed-arc recaps, progress-gated quizzes, movie and cover-story suggestions, anime-to-manga lookup, ordered character rankings, and a structured revisit log. You do not need to restate your episode and spoiler rules for every interaction. The account edition also retains notes, history and rankings between visits. Chatbots can reproduce individual results; the value being tested is whether this integrated workflow is easier and worth returning to.

**Honest limitation:** spoiler gates are editorial, not a guarantee against every spoiler. Mappings depend on available evidence. Watch time is estimated. No fabricated users, ratings or success statistics.

## Deployments and account portability

This repository is the independent **Vercel exploration edition**. Live public data, quizzes, rankings and logs work during a visit; it does not silently save guest progress. Export/import lets a visitor keep a manual copy. The account button opens the existing [ChatGPT Sites account edition](https://log-pose-companion.tealmesa7.chatgpt.site/), whose platform authentication and Cloudflare D1 storage are separate. Existing accounts and data have not been migrated to Vercel. A production independent account system requires a configured identity provider and database; spoofable identity headers are never accepted here.

## Animation as interaction

A full-screen Grand Line departure carries the ship between islands, with animated wave layers, compass bearings and a skippable voyage. The logbook changes scenes with page reveals; pointer movement tilts the hero, and actions send gold particles across the deck. Reduced-motion preferences, an explicit motion switch and Escape/Skip keep navigation usable. These are browser-native SVG/CSS/Web Animations, not generated video.

## Success criteria (targets, not measured results)

- Activation: 60% of consenting test visitors enter a checkpoint and finish a useful action.
- Retention: 25% return within seven days in a small closed beta.
- Utility: 70% of editor testers can find a reading handoff or safe side voyage without assistance.
- Quality: zero known future-question leaks in automated progress-gate checks; report and fix editorial failures.
- Reliability: successful live-data requests above 95% in monitored production; separately track fallback usage.
- Experience: 80% of testers describe the departure as enjoyable; reduced-motion users can complete every task.

No analytics collector is installed yet. These require an opt-in beta measurement plan before reporting any traction.

## Run and test

Node 22 or newer. `npm ci`, `npm test`, `npm run build`, `npm start`. Deploy as a Next.js project on Vercel. Public-source endpoints need no API secrets. Never put identity or database secrets in browser code.

## MVP scope and stack

Next.js 16.4 / Node 24 serve the HTML and same-origin data routes. Browser-native JavaScript, CSS and SVG implement the app; there is no generative AI dependency. Unit and jsdom interaction tests run in GitHub Actions.

The exploration edition includes anime/chapter entry, live latest-release lookup, estimated watch/revisit statistics, immutable full-series revisit snapshots, 32 curated arc ranges, completed-arc recaps and temporary ratings, up to 20 ranked characters, a names-only character dex, 73 questions across four tiers, daily rounds, 15 movie suggestions, 17 cover-story suggestions, private session notes, history and JSON export/import. Future quiz and discovery content is filtered by progress; full character names require spoiler opt-in.

Cloud profiles and community voting remain in the separate account edition. This repository returns explicit unavailable/unauthenticated responses for those services rather than accepting untrusted user-ID headers. The Vercel account link opens that separate site, and does not transfer this visit's state automatically.

## Verification and remaining work

23 unit tests plus interaction, guest-isolation and animation-control smoke tests pass. Production build and dependency audit pass. Mocked interaction tests verify UI logic; they do not establish real-user authentication or visual quality. Real-device visual review, independent account authentication/storage, analytics consent and fan-pilot validation remain outstanding. This is a review beta, not a claim of launch readiness.

## Sources and precision

- Character catalogue: https://documentation.api-onepiece.com/en and https://api.api-onepiece.com/v2/characters/en — names-only catalogue refreshed through a same-origin server endpoint; cached for an hour, with a dated bundled fallback.
- Jikan / MyAnimeList: https://docs.api.jikan.moe/ — episode metadata and latest aired catalogue entry. Upstream data can lag; server caches successful episode responses for an hour and the browser caches pages for 24 hours.
- VIZ chapter catalogue: https://www.viz.com/shonenjump/chapters/one-piece — latest listed chapter. Parsing failure leaves the count unknown; no hardcoded latest number is substituted.
- Story arc boundaries: https://onepiece.fandom.com/wiki/Story_Arcs — editorial ranges, not an episode-to-chapter formula. Filler interruptions can exist inside a range.
- Exact adaptation metadata: https://onepiece.fandom.com/wiki/Episode_500 and the wiki's episode infoboxes, fetched on demand. Episodes may cover partial chapters; re-reading the final adapted chapter avoids skipping pages. Exact mapping can be unavailable when the wiki blocks requests.
- Official reading/viewing links lead out to VIZ and https://one-piece.com/anime/; this app does not host episodes or manga pages.

Time watched is estimated from `(anime progress - self-reported skips) × 24 minutes`, plus `logged rewatched episodes × 24 minutes`. It is not measured playback. Manga chapter progress never silently becomes anime watch time. No automatic rewatch count is inferred just because someone is caught up.

Latest lookup reports source and fetch time. A failed lookup leaves the progress input unchanged. A successful latest jump only fills the input; the visitor must open the logbook to save it.

Recaps are brief original summaries, visible only for completed arcs. Opening external mapping sources can expose spoilers. The initial crew names are gated by introduction progress; full-dex names require opt-in; no late-story bounty/status biographies are shown.

## Artwork

Generated fan illustration saved at `public/assets/crew-voyage.png`, using the built-in image-generation tool. Prompt: wide hand-drawn anime adventure scene of Luffy, Zoro, and Nami aboard Thousand Sunny; ship and characters on the right, open sky and turquoise water on the left, tropical islands, bright summer colours, no text or watermark, early-series designs. No new image generation was used for the companion upgrade.


Unofficial fan project. One Piece belongs to Eiichiro Oda and its respective rights holders. No episodes or manga pages are hosted.
