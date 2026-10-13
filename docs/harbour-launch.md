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
