# Reddit feedback review — October 17, 2026

Reviewed 13 current Log Pose post URLs from u/pedriglazer1536's submitted feed, plus the earlier deleted SideProject thread. Other projects on that account were excluded. Most threads had no reader comments; the LaunchMyStartup thread had an automated moderator comment, not product feedback.

## Feedback and resulting behavior

- [AppsWebappsFullstack](https://www.reddit.com/r/AppsWebappsFullstack/comments/1x67vht/): readers highlighted the logbook as the reason to return and requested yearly arc-rating/rewatch recaps and export. Existing revisit recap/export features were retained. New arc ratings now keep bounded, validated timestamps in private logbook state; recap exports include the latest dated rating per unlocked arc within the chosen UTC year. Earlier ratings retain lifetime scores without invented dates. Completed crew voyages now link back to the logbook/recap.
- [alphaandbetausers](https://www.reddit.com/r/alphaandbetausers/comments/1x58dzk/): a mobile tester requested a small explanation beside the crew score. Each filled berth now has a keyboard/touch-accessible “Why these points?” disclosure beside its points. The full scoring explanation remains available.
- [earlier SideProject thread](https://www.reddit.com/r/SideProject/comments/1x4dhc6/): progress-gated arc discussions, reorderable rankings and dark mode were requested. All three already exist; preserved their current behavior.
- The other AppsWebappsFullstack comment summarizes the app and needs no implementation change. Positive feedback on animation, recap speed and spoiler filtering is acknowledged by preserving those flows.

## Other reviewed post IDs

IMadeThis: 1x71y1s, 1x55miv; WebApps: 1x6ubh5, 1x5co47; OnePiece: 1x5rinn; betatesters: 1x5cpg0, 1x5a3az; LaunchMyStartup: 1x58hl9; TestMyApp: 1x55l0m; SideProject: 1x53kau; JustOnePiece: 1x53fxw.

## Validation

66 domain tests, standard DOM smoke suite, separate four-script crew UI suite, production build and simulated auth-server checks pass. New regressions cover legacy payload migration, invalid dated ratings, UTC year boundaries, latest rating per period, future-arc filtering, guest crew explanations/completion, trusted iframe navigation and account save inclusion. Browser inspection confirmed a new guest rating appears in the recap. No Supabase schema or provider settings changed.

## Promotion constraints

Do not revisit destinations that removed earlier submissions to bypass filters. Arlong Park Forums has a ban notice in the project mailbox; exclude it. IndieProjects requires posting approval. startups_promotion explicitly disallows Vercel URLs, so defer it until the owner obtains a domain. New publicity should use current behavior, identify the creator, avoid story spoilers and include any community-required AI disclosure. The domain remains on hold at the owner's request.
