# Harbour launch — October 13, 2026

## Product integration

Harbour lives at `/harbour` on the existing Vercel website. It is linked in the header and beside the logbook tabs. It reuses verified email accounts and saved anime/manga progress. Guests retain the existing main-site experience; community actions require sign-in.

The crew game now reveals one character before the player assigns an empty berth. Reveals and assignments are separate server operations, with a persistent pending character. No duplicate characters or selective rerolls. The score is capped at 999, and perfect combinations cannot produce 1000. Matches with a maximum role score of 96–100 have character draw weight 1; others have weight 4. A deterministic balance regression sampled 2,000 draws and optimized assignments; none exceeded 990. This is a test result, not an exact probability claim.

## Community controls

Separate anime/manga boundaries apply server-side to titles, bodies, search, notifications and profile projections. Replies inherit the fixed thread ceiling. New discussions and changed/public profile handles require moderator review. Profiles start private, and each display field is opt-in. Private messages require recipient consent, with blocking and reporting. Only reported private-message text is exposed to moderation. Public text moderation remains necessary because a checkpoint does not detect arbitrary prose spoilers.

The moderator email supplied by the owner is stored only in a server environment variable. That mailbox must sign in and verify its email to access Harbour watch. No email is published. Temporary test moderator privileges existed only in the local test server's environment.

## Storage and checks

An additive server-only `harbour_runtime` table was created. Browser roles have no privileges, and RLS is enabled with no browser policies intentionally. Revision compare-and-swap updates prevent concurrent requests losing data. Existing logbooks and community votes were not migrated or overwritten. An 8 MB capacity limit keeps this a bounded beta; normalize before large-scale traffic. The earlier normalized schema remains an unapplied design draft under `docs/drafts`.

Passed: full existing test suite, production build, domain spoiler/privacy tests, authenticated server tests using three temporary accounts, forged demo-header rejection, cross-origin rejection, authoritative progress, role restrictions, message consent/blocking, profile moderation, simultaneous reveals, draft/best persistence and score cap. Temporary test records are removed before/after live verification. The tests exercised real Supabase Auth and storage; they did not retest SMTP email delivery.

Supabase advisors found the intentional RLS-with-no-browser-policy info notice for the new table. Existing community-summary aggregate function and password-protection notices predated this feature. The new runtime adds no security-definer function.

## Reddit review and cleanup

All eight old Log Pose posts were reviewed, then deleted after the owner's explicit final confirmation. Other project posts were untouched. SideProject had one reply supporting progress-gated discussions and requesting dark mode and reorderable rankings. The other seven had no comments; buildinpublic was filtered and indiehackers was moderator-removed. Fresh promotion avoids those two destinations. New posts describe the verified beta and ask for focused feedback; no traction is claimed.

## Verified release outcome

Production deployment: `dpl_FD52ZRUbB6Ubm3crqrvTFFsNff5Y`, code revision `70c63fe`, https://log-pose-companion.vercel.app/harbour. Live HTTP checks passed for real verified identity, saved progress, forged demo-header rejection, moderator denial, persistent reveal/assign drafts and the 999 cap. The owner’s existing signed-in browser also loaded Harbour and revealed a character successfully. The main header and logbook tabs both expose Harbour. The three marked test accounts and their community records were removed without changing existing logbooks.

Fresh update in JustOnePiece: https://www.reddit.com/r/JustOnePiece/comments/1x53fxw/i_made_a_one_piece_harbour_with_progressgated/ — visible at verification.

Fresh SideProject submission: https://www.reddit.com/r/SideProject/comments/1x53kau/i_added_a_progressgated_community_and_a/ — removed by Reddit’s filters. It was not reposted to bypass the filter.

The owner still needs to sign in and verify the designated moderator mailbox to use Harbour watch. No moderator account or verification was fabricated. The separate local test server used temporary fixture IDs for moderation tests; production authorizes only the owner-supplied verified email.

## Main-app navigation and loading update

Build Your Crew now lives in a main logbook tab beside quizzes and favourite characters. Harbour is focused on discussions, profiles, messages and moderation, with a link back to the main crew tab. `/crew` redirects to `/?crew=1`; its same-origin embedded view is loaded only after opening the tab. The parent waits for pending account saves, validates frame-ready/height messages and resizes to the content. Signed-in checkpoints come from the server; guest checkpoints are limited to the guest game and never update account records.

Guests can reveal and assign characters for the current visit, using the same spoiler gates, scoring and secure random source. Guest drafts/bests stay in memory and are never imported into an account or community leaderboard. Guest spins do not repeatedly call account storage. Community operations still require a verified account. The discovery and notes panels no longer render twice on each refresh.

Validation: main crew lazy-loading/failed-save/resize tests, memory-only guest crew and identity-switch tests, existing Harbour guest guidance tests, full regression suite and production build. Browser checks confirmed the main-tab game rendered and offered role assignments.
