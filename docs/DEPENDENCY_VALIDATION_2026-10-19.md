# Dependency validation — 2026-10-19

- lint exit: 1
- typecheck exit: 0
- build exit: 1

## Lint

```text

> artifact-os@0.1.0 lint
> eslint .


/home/runner/work/art-porfolio/art-porfolio/app/api/og/route.tsx
  86:15  warning  Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element

/home/runner/work/art-porfolio/art-porfolio/app/error.tsx
  41:11  error  Do not use an `<a>` element to navigate to `/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages

/home/runner/work/art-porfolio/art-porfolio/components/dashboard/ProjectFormClient.tsx
  56:7  error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

/home/runner/work/art-porfolio/art-porfolio/components/dashboard/ProjectFormClient.tsx:56:7
  54 |   useEffect(() => {
  55 |     if (mode === 'create' && formData.title) {
> 56 |       setFormData(prev => ({ ...prev, slug: generateSlug(formData.title) }));
     |       ^^^^^^^^^^^ Avoid calling setState() directly within an effect
  57 |     }
  58 |   }, [formData.title, mode]);
  59 |            react-hooks/set-state-in-effect
  63:7  error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

/home/runner/work/art-porfolio/art-porfolio/components/dashboard/ProjectFormClient.tsx:63:7
  61 |   useEffect(() => {
  62 |     if (formData.video_url) {
> 63 |       setVideoPreview(processVideoUrl(formData.video_url));
     |       ^^^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  64 |     } else {
  65 |       setVideoPreview({ embedUrl: '', type: 'unknown' });
  66 |     }  react-hooks/set-state-in-effect

/home/runner/work/art-porfolio/art-porfolio/components/public/CustomCursor.tsx
  19:5  error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

/home/runner/work/art-porfolio/art-porfolio/components/public/CustomCursor.tsx:19:5
  17 |
  18 |   useEffect(() => {
> 19 |     setMounted(true);
     |     ^^^^^^^^^^ Avoid calling setState() directly within an effect
  20 |
  21 |     const moveCursor = (e: MouseEvent) => {
  22 |       cursorX.set(e.clientX);  react-hooks/set-state-in-effect

✖ 5 problems (4 errors, 1 warning)


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
✓ Running next.config.js took 15ms
⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry


  Creating an optimized production build ...
Browserslist: browsers data (caniuse-lite) is 6 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
✓ Compiled successfully in 5.5s
  Running TypeScript ...
  Finished TypeScript in 3.5s ...
  Collecting page data using 3 workers ...
⚠ The Edge Runtime is deprecated. You can use the "nodejs" runtime instead. Learn more: https://nextjs.org/docs/messages/edge-runtime-deprecated
⚠ Using edge runtime on a page currently disables static generation for that page
  Generating static pages using 3 workers (0/20) ...
  Generating static pages using 3 workers (5/20) 
Error occurred prerendering page "/auth/forgot-password". Read more: https://nextjs.org/docs/messages/prerender-error
Error: @supabase/ssr: Your project's URL and API key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api
    at <unknown> (https://supabase.com/dashboard/project/_/settings/api)
    at <unknown> (app/auth/forgot-password/page.tsx:11:20)
   9 |
  10 | export default function ForgotPasswordPage() {
> 11 |   const supabase = createClient();
     |                    ^
  12 |   const [email, setEmail] = useState('');
  13 |   const [loading, setLoading] = useState(false);
  14 |   const [submitted, setSent] = useState(false); {
  digest: '2948458828'
}
Export encountered an error on /auth/forgot-password/page: /auth/forgot-password, exiting the build.
⨯ Next.js build worker exited with code: 1 and signal: null

```
