# Log Pose — Your progress is the compass

**[Open the live app → log-pose-companion.vercel.app](https://log-pose-companion.vercel.app/)**

A One Piece companion for people who want more than a watchlist: an animated voyage, progress-aware recaps and quizzes, reading handoffs, ranked characters, and a record of every rewatch and reread.

## Why use a companion instead of asking a chatbot?

There is no exclusive information here. A chatbot can explain an arc, recommend a movie, answer trivia or estimate watch time. Log Pose's value is the connected workflow: one checkpoint applies across your recaps, discovery suggestions, quiz questions and character reveals. Your ranking and revisit log have explicit structure rather than depending on a conversation remembering everything correctly.

This is a product usability hypothesis, not a content moat. Its success depends on whether fans find this experience easier and return to it. The app makes no claim of traction or irreplaceability.

## What you can do

- Enter an anime episode or manga chapter, or fetch the latest released count.
- See estimated first-watch time, logged rewatch time, skipped-episode corrections and current arc progress.
- Log entire series rewatches and rereads. Each run freezes its episode/chapter count so later releases do not inflate it.
- Revisit 32 completed-arc summaries, temporary personal ratings and visual memories from the official story archive.
- Play three official Crunchyroll clips inside the relevant completed-arc recap: Sogeking's theme, Robin at Enies Lobby, and Zoro at Thriller Bark. Players load only after a click, never autoplay, and stop when you close the recap or leave the panel. Region and publisher restrictions can affect playback.
- Search a 768-entry normalized source dex, plus bonus names missing from that catalogue. **752 source entries have matched local portraits**; 16 are explicitly marked unavailable. Images come from the official catalogue and named One Piece Wiki infoboxes, with recorded sources.
- Explore 34 featured portraits, including all ten Straw Hats, Sogeking, Bepo, Karoo, Chouchou, Laboon, Hattori, Kung-Fu Dugong and Pappag. They are searchable and rankable alongside everyone else.
- Build and reorder a personal top 10, 15 or 20, with portraits in search results and the ranking list.
- Play 73 curated trivia questions across four tiers. Pirate King requires typed answers; daily five-question rounds are repeatable for the same date, level and progress.
- Discover 15 movies and 17 manga cover-story suggestions after conservative progress checkpoints.
- Keep progress-linked session notes and history, and export/import a JSON logbook.

## Persistence and current scope

The Vercel app is a public exploration beta. Progress, notes, rankings and quiz records last for the current visit; **independent account saving and community publishing are not configured in this repository**. Export/import provides manual persistence. There are no external account-site links; account saving will need a native integration before launch.

The public deployment never accepts client-supplied identity headers as authentication. Profile and community write endpoints return explicit unavailable/unauthenticated responses until independent authentication and storage are configured. No fake ratings, votes or user counts are seeded.

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
npm start
```

Deploy as a Next.js project on Vercel. Public data routes require no API secrets. Never put identity or database credentials in browser code. GitHub Actions runs tests and the production build on pushes and pull requests.

Tests cover planner budgets, progress/state validation, revisits, name aliases, quiz gates and answer checking, guest isolation, UI interactions, animation controls, portrait assets and spoiler reset. Media checks cover recap artwork gates, click-to-load embeds, player teardown, source coverage and README requirements. Mocked DOM tests verify behaviour, not visual quality or real-account authentication. Real-device visual review and independent account storage remain launch tasks.

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
- [Official story archive](https://one-piece.com/story/): 19 storyline stills with independent progress gates.
- [Soge King Theme](https://www.youtube.com/watch?v=PhXNmMLdivk), [Say You Want to Live!](https://www.youtube.com/watch?v=npufTv1ifNg), [Nothing Happened](https://www.youtube.com/watch?v=sAtZoIFW2Uw): official Crunchyroll uploads.
- [Official card game](https://en.onepiece-cardgame.com/cardlist/?series=569103): Sogeking sample card artwork. The SAMPLE marking is preserved.

`docs/dex-portrait-sources.json`, `docs/portrait-sources.json` and `docs/arc-artwork-sources.json` record media provenance. `docs/dex-audit.json` records spelling-audit evidence; ambiguous matches are not automatically treated as authority.

## Artwork and attribution

Unofficial fan project. One Piece and source character artwork belong to Eiichiro Oda / Shueisha, Toei Animation and the respective rights holders. Third-party portraits, story stills and card artwork are not original project artwork or covered by an implied open-source artwork license. The welcome illustration and transparent Thousand Sunny asset are generated fan illustrations, not official animation frames. Video files remain on the publisher's platform.
