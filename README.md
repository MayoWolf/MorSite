# MorTorq — FRC Team 1515

The 2026 website for Beverly Hills High School's FIRST Robotics Competition
team. Built with React, TypeScript, and Next.js, then statically exported for
Netlify.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm test
```

## Netlify

Connect the repository to Netlify. The included `netlify.toml` runs the
production build and publishes the generated `out` directory automatically.

## PostHog analytics

The site includes privacy-conscious PostHog product analytics, Web Analytics,
heatmaps, Web Vitals, and session replay. Tracking initializes only on
`team1515.com` and `www.team1515.com`; local and deploy-preview traffic is
ignored unless debug mode is explicitly enabled.

1. Create a PostHog Cloud project and copy its **project token**. Do not use a
   personal API key.
2. In Netlify, add these production environment variables and redeploy:

   ```text
   NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=phc_your_project_token
   NEXT_PUBLIC_POSTHOG_HOST=/tq
   ```

   The included Netlify rules proxy `/tq` to the US PostHog ingest and asset
   hosts. This keeps analytics traffic first-party and makes collection more
   reliable in browsers with tracking protection, without requiring DNS
   changes. Update all three proxy targets if the project moves to EU Cloud.

For an intentional local analytics test, place the project token in
`.env.local`, use `NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com`, and add
`NEXT_PUBLIC_POSTHOG_DEBUG=true`. Never set the debug variable in Netlify
production.

The integration records anonymous pageviews/page-leaves, section views, scroll
depth, key site actions, gallery interactions, local-video progress, dead
clicks, heatmaps, Web Vitals, browser errors, and replay. Replay masks every
text node and input, removes query strings, and blocks images, videos, and
iframes. Product analytics masks element text and common personal-data query
parameters, ignores URL fragments, and respects Do Not Track. The site never
calls `posthog.identify()` or creates person profiles. It uses PostHog's
standard browser storage to keep anonymous visitor and session activity
connected; IP retention and GeoIP enrichment follow the project's PostHog
settings.

Useful dashboard events include `site_action`, `section_viewed`,
`scroll_depth_reached`, `video_started`, `video_progress_reached`, and
`video_completed`. PostHog also supplies `$pageview`, `$pageleave`,
`$autocapture`, and Web Vitals events.

## Media sources

- 2026 team photo: Beverly Hills Unified School District
- 2026 competition, pit, workshop, and celebration photography: MorTorq's
  team-supplied media library
- 2026 33-second finals recap: MorTorq's team-supplied media library,
  optimized and self-hosted for the web
- Full-match footage: official FIRST event webcast on YouTube
- Team mark: existing MorTorq site and matching team-supplied logo
- BIOCORE artwork: official FIRST season brand resources

Credits and direct source links are included on the site.
# MorSite
