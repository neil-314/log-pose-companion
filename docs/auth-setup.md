# Activate native accounts

The implementation uses Supabase email OTP and PostgreSQL storage. There is no password database in this app and no redirect to another account site. `/api/auth` reports `configured:false` until server configuration exists. Missing configuration disables code submission while guest use remains available.

## Provider configuration

1. Create a Supabase project in the selected organization. The connected organization was `neil-314's Org`, ID `oqpsnsoutsoxmpiukjjj`, on the free plan. No project existed when implementation began. Confirm current provider pricing when creating one.
2. Apply `supabase/migrations/202610120001_logbooks.sql`. It creates one private row per authenticated user, enables row-level security and grants no access to anonymous users.
3. Enable email authentication and email confirmation. Set the site URL to `https://log-pose-companion.vercel.app`.
4. Configure BOTH the **Confirm signup** and **Magic Link** email templates to include `{{ .Token }}` as visible text, rather than relying on a link. The UI accepts a 6–10 digit OTP. Example body: `<h2>Your Log Pose sign-in code</h2><p>{{ .Token }}</p><p>Enter this code on Log Pose. If you did not request it, ignore this email.</p>`.
5. Configure a verified SMTP sender for public email delivery. Supabase's default mail service can restrict recipients and volume; do not call account access ready for everyone until actual delivery is tested. Retain provider OTP expiry and abuse rate limits; use CAPTCHA if promotion volume requires it.
6. Add `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` to Vercel's production environment and redeploy. Use the project's publishable key, not a service-role key. Keep real values out of Git. Local development uses ignored `.env.local`.

Provider references: [passwordless email authentication](https://supabase.com/docs/guides/auth/auth-email-passwordless), [email templates](https://supabase.com/docs/guides/auth/auth-email-templates), [custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp), [row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security).

## Release verification

- Run `npm test`, `npm run build` and `npm run test:auth-server`. The server test uses a simulator and does not send emails or prove actual database policies.
- Verify a real email receives its code; an incorrect/expired code fails; successful verification creates a secure cookie and stays on the Vercel domain.
- Save progress, a ranked character, a note, quiz results, an arc rating and a revisit. Sign out, sign back in, then verify the same data on another device.
- Verify guest progress is adopted only after sign-in; existing saved data is not replaced without the user's explicit choice.
- With two real test accounts, verify neither can read or update the other's database row, including direct Data API calls with the publishable key and authenticated token. Anonymous access must fail.
- Interrupt storage access and verify the app reports failed saves and retains export access. Sign-out waits for saving and stops if saving fails.

Current implementation uses a single snapshot per account. Concurrent editing on two devices is last-write-wins, not a merge system. Cloud sessions refresh in the account route handlers; data APIs are uncached. The email address is used for authentication, never exposed in public community data.

## Setup limitation encountered

The connected Supabase project's creation wrapper requires a legacy cost-confirmation ID, but its `get_cost` tool was unavailable. No project was created or billed. The browser-control runtimes also failed to initialize on this machine. Once the project is created through the dashboard, database setup and key retrieval can continue through the connected Supabase tools without asking for secret credentials in chat.
