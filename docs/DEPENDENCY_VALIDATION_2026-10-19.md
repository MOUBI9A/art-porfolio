# Dependency validation — 2026-10-19

- lint exit: 0
- typecheck exit: 0
- build exit: 0

## Lint

```text

> artifact-os@0.1.0 lint
> eslint .


/home/runner/work/art-porfolio/art-porfolio/app/api/og/route.tsx
  86:15  warning  Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element

✖ 1 problem (0 errors, 1 warning)


```

## Typecheck

```text

```

## Build

```text

> artifact-os@0.1.0 build
> next build

▲ Next.js 16.4.2 (Turbopack)
⚠ React 18 support is deprecated in Next.js 16 and will be removed in Next.js 17. Please upgrade to React 19. Learn more: https://nextjs.org/docs/messages/react-version
✓ Running next.config.js took 18ms
⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry


  Creating an optimized production build ...
Browserslist: browsers data (caniuse-lite) is 6 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
✓ Compiled successfully in 4.8s
  Running TypeScript ...
  Finished TypeScript in 3.2s ...
  Collecting page data using 3 workers ...
⚠ The Edge Runtime is deprecated. You can use the "nodejs" runtime instead. Learn more: https://nextjs.org/docs/messages/edge-runtime-deprecated
⚠ Using edge runtime on a page currently disables static generation for that page
  Generating static pages using 3 workers (0/20) ...
  Generating static pages using 3 workers (5/20) 
  Generating static pages using 3 workers (10/20) 
  Generating static pages using 3 workers (15/20) 
✓ Generating static pages using 3 workers (20/20) in 300ms
  Finalizing page optimization ...

Route (app)                      Revalidate  Expire
┌ ○ /                                    1m      1y
├ ○ /_not-found
├ ƒ /admin
├ ƒ /api/auth/callback
├ ƒ /api/og
├ ƒ /api/v1/analytics/stats
├ ƒ /api/v1/analytics/track
├ ƒ /api/v1/projects/[username]
├ ○ /auth/forgot-password
├ ○ /auth/login
├ ○ /auth/signup
├ ○ /auth/unavailable
├ ○ /auth/update-password
├ ƒ /dashboard
├ ƒ /dashboard/experience
├ ƒ /dashboard/projects
├ ƒ /dashboard/projects/[id]
├ ƒ /dashboard/projects/new
├ ƒ /dashboard/settings
├ ○ /pricing
├ ○ /privacy
├ ƒ /projects/[slug]
├ ○ /terms
└ ƒ /u/[username]


ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand


```
