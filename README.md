# StreamSimple

A minimal movie/show streaming site. Frontend is plain HTML/CSS/JS in
`/public`; backend is a handful of Vercel serverless functions in `/api`
that proxy the MovieBox/Cinexora API (`moviebox-api-1-u2go.onrender.com`).

## Why the backend exists

The upstream API appears to check the `Referer`/`Origin` header
server-side and rejects direct browser requests. Browsers won't let
client-side JS set those headers, so the `/api/*` functions here make the
real request server-side with a spoofed `Referer`/`Origin` matching the
real Cinexora frontend, then hand the JSON back to your page same-origin
— no CORS or header issues on the browser side.

## Deploy

1. Push this folder to a GitHub repo (or `vercel` CLI directly from here).
2. Import it in Vercel — no build step needed, it auto-detects the
   `/api` functions and serves `/public` as static files.
3. Open the deployed URL.

## ⚠️ Not yet verified live

This was built without being able to reach the upstream API directly (the
build environment's network is locked down to package registries only),
so two things are unverified and may need a quick fix once you deploy
and test:

1. **Whether the Referer/Origin spoof actually works.** If `/api/trending`
   still comes back denied once deployed, the upstream may be checking
   something else (a session cookie, a signed token, a stricter
   User-Agent check, etc.) — open the Network tab on the *real* Cinexora
   site and compare the full request headers against what `api/_upstream.js`
   sends.
2. **Exact JSON field names.** `app.js` guesses common field names for
   id/title/poster/stream-url (see `extractItems`, `itemTitle`,
   `itemPoster`, `findStreamUrl`). Every API response is also logged to
   the browser console (`[api] ...`), and if a playable URL can't be
   auto-detected, the detail page shows the raw JSON instead of a blank
   player — copy that back so the field names can be tightened up.
