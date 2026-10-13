# Log Pose — Your progress is the compass

**[Open the live app → log-pose-companion.vercel.app](https://log-pose-companion.vercel.app/)**

A One Piece companion with a shared Harbour for people who want more than a watchlist: an animated voyage, progress-aware recaps and quizzes, reading handoffs, ranked characters, and a record of every rewatch and reread.

## Why use a companion instead of asking a chatbot?

There is no exclusive information here. A chatbot can explain an arc, recommend a movie, answer trivia or estimate watch time. Log Pose's value is the connected workflow: one checkpoint applies across your recaps, discovery suggestions, quiz questions and character reveals. Your ranking and revisit log have explicit structure rather than depending on a conversation remembering everything correctly.

This is a product usability hypothesis, not a content moat. Its success depends on whether fans find this experience easier and return to it. The app makes no claim of traction or irreplaceability.

## What you can do

- Enter an anime episode or manga chapter, or fetch the latest released count.
- See estimated first-watch time, logged rewatch time, skipped-episode corrections and current arc progress.
- Log entire series rewatches and rereads. Each run freezes its episode/chapter count so later releases do not inflate it.
- Revisit 32 completed-arc summaries, temporary personal ratings and visual memories from the official story archive.
- Open 19 official clip embeds and nine gated openings. Playback starts only after a click; publisher and regional restrictions may apply.
- Search a 768-entry normalized source dex, plus bonus names missing from that catalogue. **752 source entries have matched local portraits**; 16 are explicitly marked unavailable. Images come from the official catalogue and named One Piece Wiki infoboxes, with recorded sources.
- Explore 48 featured characters with introduction gates and direct Favourite / Add to ranking actions. Featured pet exceptions are Chouchou and Pappag; Sogeking remains included. The full ranking dex retains other characters.
- Build and reorder a personal top 10, 15 or 20, with portraits in search results and the ranking list.
- Play four quiz tiers, including typed-answer challenges, with curated trivia and 1,000 source-backed catalogue facts.
- Discover 15 movies and 17 manga cover-story suggestions after conservative progress checkpoints.
- Keep progress-linked session notes and history, and export/import a JSON logbook.

## Persistence and current scope

Sign-in is optional. The native account flow verifies your email with a one-time code; no password or external account site is needed. A verified account saves progress, rankings, revisits, notes, quiz records, arc ratings and the selected favourite in one private logbook. Existing account data loads on return. If you have guest progress when signing in, you can choose whether to keep this visit or load the saved logbook.

**Activation status:** the Supabase project and private database are connected. Live database tests verified owner access, rejected cross-account and anonymous access, and rolled back test records. Email templates/delivery still need setup. The deployed form reports this honestly and does not send codes or claim cloud saves until configured. Follow [account setup](docs/auth-setup.md). Guests retain export/import for manual persistence. Public community publishing remains unavailable; private ratings are included in account saving.

The server verifies the session with Supabase before any account read or write. Session cookies are HttpOnly, secure in production and SameSite=Lax. Writes require a same-origin request, payloads are validated, and PostgreSQL row-level policies restrict each logbook to its owner. The API uses a publishable key, never a database service-role key. Account contents are not copied into persistent browser storage.

## Visual experience and spoiler boundaries

A detailed Thousand Sunny fan illustration sails across layered seas and islands. A living ocean chart animates between logbook destinations. Luffy's face is visible immediately, character portraits enter during departure, and the gallery responds to selection. Skip, Escape, reduced-motion preferences and the motion switch keep the experience usable.

Recaps unlock only after their arc is complete. Visual archive items have their own conservative storyline-completion gates, since one source page may cover several arcs. Clips are tied to their completed arcs. Full-dex names and all-featured portraits require explicit spoiler opt-in; the featured-portrait opt-in resets when progress is entered again. Catalogue portraits can use later costumes and designs, so these controls are not a guarantee against every visual spoiler.

Portraits and stills are static source artwork animated by the interface. They are not new frame-by-frame character animation. The story archive supplies **anime stills**, not a scanned manga reader. No episodes, full clips or manga chapters are rehosted; video playback uses the publisher's YouTube embed.

## Tech stack

Next.js 16.4, Node 24, browser-native JavaScript, CSS, SVG and Web Animations. Same-origin server routes fetch release counts, episode metadata, character names and adaptation references. External API failures use clearly identified caches or conservative fallbacks where available. There is no generative AI dependency in the product workflow.

## Run and validate

```sh
npm ci
npm test
npm run build
npm run test:auth-server
npm start
```

Deploy as a Next.js project on Vercel. Public data routes require no API secrets. Never put identity or database credentials in browser code. GitHub Actions runs tests and the production build on pushes and pull requests.

Tests cover planner budgets, progress/state validation, revisits, name aliases, quiz gates and answer checking, guest isolation, UI interactions, animation controls, portrait assets and spoiler reset. Media checks cover recap artwork gates, click-to-load embeds, player teardown, source coverage and README requirements. Mocked DOM tests verify behaviour, not visual quality or real-account authentication. The server integration test exercises real Next routes against a local provider simulator, including cookie flags, email verification, account scoping, invalid input and sign-out. Live database policies have also passed a transaction-scoped two-user isolation test. Live email delivery and real-device visual review still require verification before public launch.

## Success targets — not measured results

| Metric | Definition | Beta target |
| --- | --- | --- |
| Activation | Visitors entering a checkpoint and completing a useful action | 60% |
| Seven-day retention | Activated visitors returning within seven days | 25% |
| Utility | Testers finding a reading handoff or safe side voyage without assistance | 70% |
| Reliability | Successful monitored live-data requests, tracked separately from fallbacks | 95% |
| Experience | Testers who describe the departure as enjoyable | 80% |
| Spoiler quality | Known future-question leaks in automated progress checks | 0 |

No analytics collector is installed. Use a consented fan pilot before reporting adoption or retention. The app estimates watch time at 24 minutes per episode; it does not measure playback. Manga progress never silently becomes anime watch time.

## Data and media sources

- [Jikan / MyAnimeList](https://docs.api.jikan.moe/): episode metadata and aired-episode catalogue.
- [AniList](https://docs.anilist.co/reference/query) and [official anime catalogue](https://one-piece.com/anime/): release lookup fallbacks.
- [VIZ / Shonen Jump](https://www.viz.com/shonenjump/chapters/one-piece): latest listed chapter and official reading links.
- [One Piece API](https://documentation.api-onepiece.com/en): source character names. Corrections retain source aliases; the upstream catalogue can omit characters.
- [Official character catalogue](https://one-piece.com/character/): featured and dex portraits.
- [One Piece Wiki](https://onepiece.fandom.com/wiki/List_of_Canon_Characters): named infobox portraits, editorial arc boundaries and episode adaptation metadata. Exact mappings can be unavailable when upstream requests fail; no episode-to-chapter formula is invented.
- [Official story archive](https://one-piece.com/story/): 32 distinct arc scene images with independent progress gates.
- [Soge King Theme](https://www.youtube.com/watch?v=PhXNmMLdivk), [Say You Want to Live!](https://www.youtube.com/watch?v=npufTv1ifNg), [Nothing Happened](https://www.youtube.com/watch?v=sAtZoIFW2Uw): official Crunchyroll uploads.
- [Official card game](https://en.onepiece-cardgame.com/cardlist/?series=569103): Sogeking sample card artwork. The SAMPLE marking is preserved.

`docs/dex-portrait-sources.json`, `docs/portrait-sources.json` and `docs/arc-artwork-sources.json` record media provenance. `docs/dex-audit.json` records spelling-audit evidence; ambiguous matches are not automatically treated as authority.

## Artwork and attribution

Unofficial fan project. One Piece and source character artwork belong to Eiichiro Oda / Shueisha, Toei Animation and the respective rights holders. Third-party portraits, story stills and card artwork are not original project artwork or covered by an implied open-source artwork license. The welcome illustration and transparent Thousand Sunny asset are generated fan illustrations, not official animation frames. Video files remain on the publisher's platform.

## Arc scenes and music deck

Each of the 32 arcs has a separate official scene image. Scene sources are recorded in `docs/arc-artwork-sources.json`; duplicate image hashes are rejected by the media checks. There are 19 curated official highlight clips and 9 official opening uploads, with publisher links in `docs/video-sources.json`. Openings live under Discover → The Sunny’s Music Deck. Images, clips and opening visuals unlock only after their story boundaries. Players load on request, never autoplay, and stop when you switch panels or start another video. Region restrictions or disabled embedding can require opening the publisher’s YouTube page. Arcs without a verified official highlight provide an official viewing link instead. No video or audio is downloaded or rehosted.

## Main-deck crew game and Harbour beta

[Build your crew in the main logbook](https://log-pose-companion.vercel.app/?crew=1). The game has its own tab beside the quiz and favourite characters. Guests can play for the current visit; verified accounts save drafts and bests. The game loads on demand, saves pending account edits before entry and resizes inside the main page.

[Open Harbour](https://log-pose-companion.vercel.app/harbour). The same verified account and saved episode/chapter power discussions, character choices and profile visibility. Header navigation and the logbook tabs both lead there. Guests can continue using the main logbook; Harbour requires sign-in.

- Separate anime/manga rooms and immutable thread/reply spoiler ceilings. Filtering happens on the server before titles, previews, search and notifications are returned. New public text waits for moderator review; a checkpoint alone cannot detect spoilers hidden in prose.
- Opt-in pseudonymous profiles with separately selected progress, completed arc ratings, character rankings, quiz records and crew bests. Emails and private notes are never public.
- Consent-based private conversations, bilateral blocking, reporting, moderation audit records and per-account action limits. Only a reported message is shown to moderators.
- Build Your Crew: reveal a random eligible sailor, then choose an empty role. Assign before drawing again. No duplicates or selective rerolls. Personal drafts and bests save to the account. A published score table and draw weights describe these playful editorial rules. The hard cap is **999/1000**: 1000 is intentionally impossible, and scores above 990 require an exceptionally rare lineup.

The beta runtime is a server-only Supabase record guarded by RLS and revoked browser privileges; optimistic revision checks prevent lost concurrent updates. The server revalidates identity and uses saved logbook progress. Storage is limited to 8 MB and normalizing the community tables is required before large-scale promotion. The earlier 13-table migration is an **unapplied design draft**, not the deployed runtime. Do not deploy demo persona headers or enable LP_PRIVATE_PREVIEW in production.

Validation: domain boundary tests, real verified test-account HTTP flows, message consent/blocking, moderator restrictions, concurrent reveal requests, persistent crew drafts/bests and the 999 cap. Temporary test identities are removed after verification. Email delivery was previously user-verified; these new server tests do not claim a new SMTP delivery test.
