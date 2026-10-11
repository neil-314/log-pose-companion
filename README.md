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

## Account-edition feature inventory and source notes

The following inventory describes the original account edition; cloud sync and community writes are intentionally unavailable in this Vercel edition.

# Log Pose — One Piece Companion

Track your One Piece journey, revisit completed arcs, compare real ratings, and bridge anime and manga. The weekly queue is an optional catch-up tool, rather than the whole product.

## What works
- Anime episode or manga chapter entry; explicit ↓ Latest button and ArrowDown shortcut fetch the catalogue release count before changing the input.
- Dashboard with estimated first-watch time, logged rewatch time, total watch time, manga progress, and current arc progress.
- Skipped-episode correction and rewatch logging with undo. Progress entry does not pretend to know historical viewing dates.
- History (last 200 entries), JSON export/import, optional ChatGPT account sign-in and signed-in cloud sync. Guests use in-memory state for the current visit; they are not required to sign in.
- 32 curated main-story arc ranges through Egghead. Completed arcs unlock short original recaps and ratings from 1–10; future arc cards remain hidden.
- Database-backed community averages and favourites. One rating per arc and one favourite per signed-in account, with replacement rather than duplicate votes. No seeded or fabricated community activity. The creator can submit ordinary ratings for early visitors to compare against.
- Exact episode-to-chapter lookup when source data is available, including a verified bundled mapping for episode 500 → chapters 585–586, with chapter 586 as a conservative reading continuation. Otherwise shows the current arc's starting chapter; it does not interpolate an exact match. Manga input similarly shows the corresponding anime arc range, not a falsely precise episode.
- Optional weekly anime planning with filler/recap flags, timeout, cache, and explicitly unverified sequential fallback.
- One Piece crew fan artwork, voyage animation, responsive layout, and reduced-motion support.

## Revisit logs, character dex and quiz
- Full-series anime rewatches and manga rereads are independent frozen snapshots (run length × pass count). Two rewatches and three rereads display five revisits. Future releases do not inflate earlier logs. Individual episode rewatches remain separate. Reread chapters never become watch-time estimates.
- Personal ordered top 10/15/20, with keyboard-accessible move and remove buttons. The live One Piece API currently supplies 786 raw rows; English names are normalized and 13 known duplicate rows plus five unnamed placeholders are removed, leaving 768 selectable entries; a dated names-only snapshot provides an outage fallback. No status, bounty, fruit or biography spoilers are sent to the browser. Full catalogue names require an explicit spoiler toggle. Source omissions can be added as custom names. This is not a claim to cover every named character in canon.
- 73 curated trivia questions across four difficulty levels, gated by anime/chapter reveal thresholds. Random or deterministic UTC daily five-question rounds, shuffled multiple choices in the first three levels, typed answers in Pirate King, reference links with external-spoiler warnings, per-level mastery badges, private knowledge points, spoiler-free result copying, completed-round count and best score; saved inside each signed-in profile. Quiz scores are personal and self-reported, not a competitive leaderboard.
- Account login uses platform-owned `/signin-with-chatgpt` and `/signout-with-chatgpt` flows. No separate password database or email verification service. Existing account data takes precedence over the optional guest-to-sign-in handoff in sessionStorage. Site access is public to support guest mode; writes remain authenticated and origin-checked. Rankings are private; original crew favourite votes are public aggregates.

## Review beta additions
- Side voyages: 15 curated movie checkpoints and 17 manga cover-story ranges, hidden until conservative progress gates. Checkpoints are editorial recommendations, not official movie chronology or exact chapter adaptation. Completed items save privately.
- Return-from-break walkthrough of the last three completed arc summaries. Current unfinished arcs stay excluded.
- Private notebook: up to 20 progress-linked notes, 800 characters each. Notes from another medium or beyond current progress are hidden. All experience panels reset when progress changes.
- Review beta labels and `/review.html`: editors prepare copyable/downloadable structured reports without automatic submission or new public content endpoints.
- Dex audit: all 786 rows inspected; 674 matched through French wiki interlanguage links and English redirect resolution. Ambiguous/group-page matches are not blindly applied. Common English/romanized display names override mistranslations; source spellings remain aliases. Scarlet the gorilla and Scarlett remain separate characters. `docs/dex-audit.json` records evidence. A complete editorial audit and real-device visual review remain launch tasks.

## Stack
Vinext / Vite, vanilla browser ES modules, Cloudflare Worker routes, Cloudflare D1 with Drizzle migrations, Node test runner, and jsdom UI interaction tests. The server serves the existing custom HTML interface while adding authenticated persistence and same-origin API access. No GenAI runtime or generated chat wrapper.

Routes: `/api/characters`, `/api/profile`, `/api/community`, `/api/episodes`, `/api/latest`, `/api/mapping`.

Profile and community writes require dispatch-owned signed-in identity and same-origin requests. User IDs remain server-side; profiles are scoped per account. Community responses expose aggregates and only the signed-in visitor's own rating. Progress is self-reported; this is not an anti-cheat system. Browser edits sync with last-save-wins semantics, not collaborative merging. Signed-in edits remain in the browser cache if sync fails; guest edits are temporary. Community publishing must be retried explicitly after reconnecting.

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

## Development
Node 22.13+:

```sh
npm ci
npm test
npm run build
npm start -- --port 4173
```

`npm run dev` starts the development server. Generate schema changes with `npm run db:generate`, inspect the SQL, and apply local migrations using the starter's documented Wrangler D1 command. Hosted migrations run during Sites deployment. Local QA records are not seeded into production.

## Verification
- 23 automated data/planner/state tests pass.
- DOM interaction smoke passes: episode/chapter entry, 500-episode stats, rewatch/undo, spoiler gate, arc rating, favourite vote, latest-arrow behaviour, exact mapping display, and persisted state. API data in this test is mocked, not claimed as live.
- Production build passes.
- Local Worker/D1 HTTP checks verify profile persistence, replacement of ratings and favourites, rejection of unfinished-arc ratings and invalid scores, authentication requirements, cross-origin write rejection, and the episode-500 mapping endpoint.
- Home page, browser modules, and artwork return HTTP 200.
- Visual browser automation is unavailable in this environment. External upstream API calls have previously timed out; latest-release and arbitrary-episode wiki lookup availability remain dependent on those services. Do not claim that every mapping or live request has been verified.

## Product success targets (not achieved results)
Pilot with 10 One Piece fans:

| KPI | Definition | Target |
| --- | --- | --- |
| Activation | Visitors saving progress and opening their logbook / pilot visitors | 80% |
| Time to value | Median time to see personal progress/stats | Under 30 seconds |
| Meaningful engagement | Activated users submitting a rating, logging a rewatch, or using a mapping | 60% |
| Seven-day return | Activated pilot visitors returning within seven days | 40% |
| Useful manga handoff | Mapping users who report successfully continuing in manga | 80% |
| Live service reliability | Successful external requests / attempted requests | 95% |

Measure these with consented pilot observations and real usage. The current UI's local counters do not establish global retention or adoption. Empty community counts are intentionally zero until someone contributes.

## Artwork
Generated fan illustration saved at `public/assets/crew-voyage.png`, using the built-in image-generation tool. Prompt: wide hand-drawn anime adventure scene of Luffy, Zoro, and Nami aboard Thousand Sunny; ship and characters on the right, open sky and turquoise water on the left, tropical islands, bright summer colours, no text or watermark, early-series designs. No new image generation was used for the companion upgrade.

Unofficial fan project. One Piece belongs to Eiichiro Oda and its respective rights holders. Hosted source is not a GitHub repository; the supplied source archive and CI workflow are ready to publish after choosing a license and completing browser/pilot checks. Site access remains private until explicitly changed.

### Release lookup verification update
The release service now races AniList's past-airing catalogue against Jikan, and sends a compatible identifying User-Agent to VIZ/wiki requests. Direct live source checks succeeded for anime and manga counts, and the wiki adaptation lookup succeeded for episode 501 (chapters 586–587, resume at 587). Reference: https://docs.anilist.co/reference/query and https://docs.anilist.co/reference/object/airingschedule. AniList notes that historical schedules are not guaranteed complete; the UI identifies the catalogue used. Jikan may still be unavailable and the basic planning fallback remains available.
The neutral hosted URL is https://log-pose-companion.tealmesa7.chatgpt.site. Anime latest-release lookup additionally uses the official dated catalogue at https://one-piece.com/anime/index.html, excluding future air dates. Browser latest responses are not cached, so a previous partial failure does not remain stuck for an hour.
