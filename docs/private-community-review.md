# Private community review — October 13, 2026

This branch is a local prototype, not a released feature. No GitHub push, Vercel deployment or production database change was performed.

## Try it

Run `npm run dev:private`, then open http://127.0.0.1:4400/community-preview. Three labelled demo personas let reviewers compare early progress, caught-up progress and moderation. State persists in ignored `.private-preview/community.json`. These are fixtures, not separate real identities or live accounts. Production builds return 404 for both preview routes.

## Implemented locally

- Server-filtered anime/manga discussions, room ceilings, fixed reply ceilings, search and notifications. New threads/replies wait for moderator approval. Spoiler reports quarantine public content. Moderators can approve/remove/lock/suspend with an audit trail.
- Opt-in pseudonymous profile fields; viewer-filtered arc ratings, character rankings and crew lineups. Emails and private logbooks are never returned by the preview API.
- Consent-based message requests, accepted conversations with fixed ceilings, bilateral blocking, reported-message review and per-action rate limits.
- Ten-slot animated crew draws, unique eligible characters, server-generated randomness, personal best persistence and a checkpoint-filtered scoring table. Scores are playful editorial rules. Pirate King requires exactly 1000 points; an example eligible perfect lineup is covered by a test. Early checkpoints may not have every specialist available.
- 48 featured characters, deduplicated, with the requested pet exceptions only. Introduction gates remain in place, including direct Favourite and Add to ranking actions. Shiki/Joy Boy are legends rather than labelled Emperors. Joy Boy has an honest placeholder rather than an invented portrait.
- Keyboard controls, reduced-motion CSS, responsive layouts and a private Night watch theme.

## Feedback reviewed

The SideProject reply supported arc discussions locked by progress, asked whether rankings can be reordered, and requested dark mode: https://www.reddit.com/r/SideProject/comments/1x4dhc6/i_built_a_one_piece_companion_with_spoileraware/

No replies were visible on the reviewed JustOnePiece, alphaandbetausers, TestMyApp, IMadeThis, WebApps, indiehackers or buildinpublic promotion posts. No posts, replies or messages were sent during this review. Dark mode is prototyped in the private harbour; ranking reorder feedback remains a follow-up for the existing ranker.

## Validation and limitations

Domain tests exercise direct-access/search/notification spoiler gates, opt-in projection, approval/quarantine, consent/blocking, verified-user requirements, rate limits, random uniqueness, score rules and personal bests. The existing full suite and production build passed. Browser checks covered loaded early-viewer feed, spoiler-filtered profiles, saved crew spins and recipient consent. HTTP checks exercise the actual local endpoint. The draft migration was applied only to an ephemeral PGlite database: all 13 tables have RLS, and anonymous/authenticated direct queries are denied. Local Supabase CLI validation is unavailable because Docker/Podman is not installed.

This is **not yet a Supabase-backed forum**. The local demo transport must be replaced with a server adapter using the existing verified Supabase account and authoritative saved progress, transactional database persistence, database-backed rate limits and server-owned moderator roles. The SQL draft deliberately grants no browser access. Never deploy the persona-header transport. No real-account persistence or cross-device forum access has been verified.

Checkpoint gates cannot determine whether arbitrary prose contains a later-story revelation. Prepublication human moderation remains necessary; names/handles also need review. Messages are recipient-consented but cannot guarantee semantic spoiler detection. Abuse load testing, retention/deletion policies, moderator staffing, accessibility review and concurrent hosted-database tests remain before launch.

## Required next setup

Provide a separate Supabase staging project (or local Supabase with Docker). Then implement the authenticated database adapter, review/apply this migration **only there**, and test two verified staging accounts plus a moderator. No production credentials or data migration are needed for the current local review. Deployment remains unauthorized for this private task.

## Proposed launch metrics

Measure unlocked-thread to first-reply conversion, seven-day discussion return rate, message-request acceptance, crew-spin completion and repeat play. Track spoiler reports per 1000 reads, quarantine/response time and block/report rates. Start with zero unauthorized-record disclosures in boundary tests and review every confirmed spoiler leak; establish engagement targets from a small consented beta rather than inventing user counts.

Final checks: both private routes returned HTTP 404 under a production server. The saved crew best survived stopping and restarting the local server. The one-time follow-up was paused after this review.

Crew revision: spin one role at a time in any order; no rerolling locked berths within a voyage. Server persists the draft. Current scoring version is 2, with separate bests. Near-perfect matches (96–100) have weight 1 versus 4 for other eligible matches. Role scores and weights are visible. 990–999 can occur; 1000 requires perfect role matches and three perfect wildcards. Old full-crew API is disabled. Individual-slot locking, resets and a reachable 999 are tested.
