# Dependency validation — 2026-10-19

- lint exit: 0
- typecheck exit: 0
- build exit: 1

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
✓ Running next.config.js took 21ms
⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry


  Creating an optimized production build ...
Browserslist: browsers data (caniuse-lite) is 6 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
✓ Compiled successfully in 7.2s
  Running TypeScript ...
  Finished TypeScript in 5.0s ...
  Collecting page data using 3 workers ...
⚠ The Edge Runtime is deprecated. You can use the "nodejs" runtime instead. Learn more: https://nextjs.org/docs/messages/edge-runtime-deprecated
⚠ Using edge runtime on a page currently disables static generation for that page
  Generating static pages using 3 workers (0/20) ...
  Generating static pages using 3 workers (5/20) 
Error occurred prerendering page "/auth/login". Read more: https://nextjs.org/docs/messages/prerender-error
Error: @supabase/ssr: Your project's URL and API key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api
    at <unknown> (https://supabase.com/dashboard/project/_/settings/api)
    at <unknown> (app/auth/login/page.tsx:13:20)
  11 | export default function LoginPage() {
  12 |   const router = useRouter();
> 13 |   const supabase = createClient();
     |                    ^
  14 |
  15 |   const [email, setEmail] = useState('');
  16 |   const [password, setPassword] = useState(''); {
  digest: '1330575382'
}
Export encountered an error on /auth/login/page: /auth/login, exiting the build.
⨯ Next.js build worker exited with code: 1 and signal: null

```
