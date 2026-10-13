# Harbour report moderation

Verified accounts publish discussions, replies, usernames and opt-in profile changes immediately. Fixed anime/manga spoiler ceilings, server-side title/search/profile filters, unique usernames, blocking, recipient consent, text validation and rate limits still apply. This does not automatically detect spoilers placed inside a falsely labelled discussion; readers can report them.

Harbour watch lists reports rather than every new post. A spoiler report quarantines the affected thread/reply. Dismissing the last open report restores quarantined content; removal keeps it hidden. Profiles and private messages can also be reported. Only reported private-message text is shown to moderators.

Old unreported pending submissions and explicitly opted-in pending profile choices are activated on the next verified Harbour transaction. Reported/quarantined content and suspended users remain restricted. No accounts, progress, rankings or private logbooks are reset.

## Email alerts

Recipient: logposecompanion@gmail.com. Emails contain the report reference/type and a link to Harbour watch, without reporter emails, reasons, private-message text or story contents. Sign-in and moderator authorization are required to view the report.

Each report has a durable alert state in the existing protected runtime snapshot. After the report commits, a background task attempts SMTP delivery. A daily authenticated Vercel job retries queued alerts at 13:00 UTC, up to five per invocation. Compare-and-swap claims prevent concurrent workers from sending the same alert. Expired leases recover interrupted workers. SMTP is at-least-once delivery: a crash after provider acceptance but before recording success can result in a duplicate email, with the same report reference/message ID. Provider acceptance is not proof that an inbox received a message.

Production settings:
- SMTP_USERNAME: the login shown in Brevo SMTP settings (configured).
- SMTP_FROM: the existing verified sender address (configured).
- SMTP_PASSWORD: the Brevo SMTP key (configured in Production; not the Gmail password).
- SMTP_HOST: optional; defaults to smtp-relay.brevo.com, port 587, required STARTTLS.
- CRON_SECRET: generated server secret (configured).

Add SMTP_PASSWORD through Vercel project Settings → Environment Variables, select Production, then redeploy. Never commit or paste it into chat. Until configured, reports still save and remain queued, and Harbour watch explicitly indicates that email setup is incomplete. The moderator-only Send test report email button validates delivery without creating a fake incident. It is limited to one test per minute.

Validation includes immediate publication, legacy activation, case-insensitive names, report quarantine/restoration, opt-in profile privacy, consent-based messages, concurrent claims, retry/backoff, expired claims, and email content minimization.

October 13 verification: SMTP_PASSWORD was saved as a Vercel Production secret. SMTP_FROM was corrected to the existing Brevo verified sender, logposecompanion@12443602.brevosend.com. A test sent through the deployed app was accepted by Brevo for logposecompanion@gmail.com. Inbox delivery must be distinguished from SMTP acceptance.
