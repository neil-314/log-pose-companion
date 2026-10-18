# Crew roster and analytics — October 17, 2026

The crew game now contains 308 picks, including all 100 entries in the official 2026 global popularity results. Going Merry and Thousand Sunny are explicit novelty picks from that poll. Each of the seven specialist berths has at least 20 explicitly tagged suitable candidates; tags do not imply perfect scores. The homepage featured gallery is separate.

Source: https://onepiecewt100-2026.com/en/final-rankings/ (announced August 23, 2026 at https://one-piece.com/news/81812/index.html). The exact rank-to-ID mapping is in crew-popularity-2026.json. Roles were checked against official character profiles and story roles, with conservative arc-completion gates. Ratings are editorial gameplay values, not official rankings. Unknown portraits use the existing fallback.

The game unlocks after anime episode 30 or manga chapter 68. Both guest functions and authenticated server actions enforce it. Later characters remain checkpoint-gated. Each explanation shows only the assigned berth in a parent-page native dialog, outside the iframe layout; closing restores focus.

Vercel Web Analytics was enabled on the included Hobby plan (50,000 events/month, 30-day history). The home and Harbour pages load aggregate page-view analytics; embedded frames and local development do not. The beforeSend hook removes query strings and fragments and drops custom events. No account identity, logbook contents or replay integration is added. Historical visitor data cannot be recovered from before activation. TVM uses a separate PostHog integration; this project does not reuse its key or dashboard.

Validation: full domain/DOM suite and four crew UI checks passed, along with the production build, simulated auth-server checks and analytics redaction tests. Browser verified a 308-pick pool, locked early checkpoint, drawing/assigning Gerd and a berth-only dialog. No domain changes.
