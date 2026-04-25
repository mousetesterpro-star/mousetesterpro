# Fix GSC "Explored, Not Indexed" + Canonical/Redirect Issues for AdSense Approval

## Root Cause Analysis

I investigated every layer: HTTP headers, Vercel hosting, Next.js config, robots.txt, sitemap.xml, and the canonical tag implementation. Here's what I found:

### 🔴 CRITICAL: Your domain is redirecting the WRONG direction

```
mousetesterpro.com → 307 redirect → www.mousetesterpro.com  ❌
```

Your Vercel project is configured with `www.mousetesterpro.com` as the **primary domain** and `mousetesterpro.com` as a redirect. But your **entire codebase** — sitemap, robots.txt, structured data, OG URLs — all point to `mousetesterpro.com` (non-www).

**This is the #1 reason pages are "Explored, not indexed":**
- Google crawls `mousetesterpro.com/blog/mouse-test-latency` (from your sitemap)
- Gets a 307 redirect to `www.mousetesterpro.com/blog/mouse-test-latency`
- The `www` version has NO server-side canonical tag (only a client-side JS one)
- Google sees a conflict: sitemap says `mousetesterpro.com`, redirect sends to `www`, no canonical to resolve it
- Result: "Explored, not indexed" — Google doesn't know which version to trust

### 🔴 CRITICAL: Canonical tags are client-side only (invisible to Googlebot)

Your `DynamicCanonical.tsx` component uses `useEffect` to inject canonical tags via JavaScript DOM manipulation. **Googlebot does NOT reliably execute client-side JavaScript for canonical tags.** Even when it does, the canonical appears after hydration — too late for Google's indexing pipeline.

This means: **Every single page on your site has NO canonical tag** as far as Google is concerned.

### 🟡 Font files showing as "Explored"

The `_next/static/media/*.woff2` URLs appearing in GSC are Next.js font files. They're being crawled because `robots.txt` doesn't block `/_next/static/`. These waste crawl budget.

### 🟡 Sitemap domain mismatch

Your sitemap uses `mousetesterpro.com` but Google is actually indexing from `www.mousetesterpro.com`. The sitemap URLs don't match the canonical domain Google is following.

---

## User Review Required

> [!CAUTION]
> **You need to choose: `www` or non-www.** Your Vercel is set to `www` as primary. Your code says non-www. You must pick ONE and make everything consistent.
>
> **My recommendation:** Change Vercel to make `mousetesterpro.com` (non-www) the primary domain, and make `www.mousetesterpro.com` redirect TO it. This matches all your existing code, sitemap, structured data, and robots.txt. It's the path with the least changes.
>
> **Alternative:** Keep `www` as primary but update ALL code references (sitemap, robots, structured data, etc.) to use `www`. This is more work.

> [!IMPORTANT]
> **Vercel domain change:** This is done in the Vercel dashboard, not in code. Go to **Vercel → Project Settings → Domains** and:
> 1. Set `mousetesterpro.com` as the **primary** domain
> 2. Set `www.mousetesterpro.com` to **redirect to** `mousetesterpro.com`
>
> I cannot make this change for you — it must be done in the Vercel dashboard.

---

## Proposed Changes

> Assuming you choose `mousetesterpro.com` (non-www) as canonical. If you want `www`, let me know and I'll adjust.

---

### Fix 1: Add `metadataBase` to Root Layout (Server-Side Canonical)

#### [MODIFY] [layout.tsx](file:///Users/macbookpro/Desktop/MouseTesterPro/src/app/layout.tsx)

Add `metadataBase` and `alternates.canonical` to the root metadata export. This makes Next.js emit a server-side `<link rel="canonical">` tag in the HTML — visible to Googlebot without JavaScript.

```diff
 export const metadata: Metadata = {
+  metadataBase: new URL('https://mousetesterpro.com'),
   title: "Mouse Latency Test - Check Input Delay For Free",
   ...
+  alternates: {
+    canonical: '/',
+  },
 };
```

Also remove the `DynamicCanonical` component import and usage — it's now handled server-side.

---

### Fix 2: Add Per-Page Canonical URLs

#### [MODIFY] All page.tsx files that export metadata

Every page should have its own `alternates.canonical` so Google knows the preferred URL. For example:

**Blog pages:**
```diff
 export const metadata: Metadata = {
   title: "Mouse Test Latency...",
+  alternates: {
+    canonical: '/blog/mouse-test-latency',
+  },
 };
```

Pages to update:
- `/blog/mouse-test-latency/page.tsx`
- `/blog/top-5-ways-reduce-mouse-latency/page.tsx`
- `/blog/how-to-test-mouse-latency/page.tsx`
- `/blog/mouse-jitter-vs-polling-rate/page.tsx`
- `/blog/why-input-lag-matters-gamers/page.tsx`
- `/blog/mouse-latency-vs-response-time/page.tsx`
- `/blog/welcome-to-mousetester-pro/page.tsx`
- `/blog/new-feature-shareable-results/page.tsx`
- `/blog/guides-faq-now-live/page.tsx`
- `/blog/page.tsx` (blog index)
- `/about/page.tsx`
- `/faq/page.tsx`
- `/guides/page.tsx`
- `/complete-guide/page.tsx`
- `/how-it-works/page.tsx`
- `/leaderboard/page.tsx`
- `/contact/page.tsx`
- `/privacy/page.tsx`
- `/terms/page.tsx`
- `/accessibility/page.tsx`

---

### Fix 3: Delete DynamicCanonical Component

#### [DELETE] [DynamicCanonical.tsx](file:///Users/macbookpro/Desktop/MouseTesterPro/src/components/DynamicCanonical.tsx)

Remove this client-side canonical component entirely. Server-side `metadataBase` + `alternates.canonical` replaces it correctly.

#### [MODIFY] [layout.tsx](file:///Users/macbookpro/Desktop/MouseTesterPro/src/app/layout.tsx)

Remove the import and `<DynamicCanonical />` from the body.

---

### Fix 4: Block `_next/static` in robots.txt

#### [MODIFY] [robots.txt](file:///Users/macbookpro/Desktop/MouseTesterPro/public/robots.txt)

Add a disallow for `/_next/static/` to stop Google from crawling font files and build chunks.

```diff
 User-agent: *
 Allow: /
 
 # Prevent crawling of internal system folders
 Disallow: /api/
 Disallow: /admin/
+Disallow: /_next/static/
```

---

### Fix 5: Ensure Sitemap Uses Correct Canonical Domain

#### [VERIFY] [sitemap.xml](file:///Users/macbookpro/Desktop/MouseTesterPro/public/sitemap.xml)

Currently uses `mousetesterpro.com` — this is correct IF you choose non-www as canonical. No changes needed here if you follow my recommendation.

---

## Summary of All "Explored, Not Indexed" URLs from GSC

| GSC URL | Root Cause | Fix |
|---------|-----------|-----|
| `mousetesterpro.com/blog/mouse-test-latency` | Redirects to www, no server canonical | Fixes 1-3 + Vercel domain |
| `www.mousetesterpro.com/_next/static/media/*.woff2` (×3 fonts) | No robots block on `_next/static` | Fix 4 |
| `mousetesterpro.com/blog/top-5-ways-reduce-mouse-latency` | Redirects to www, no server canonical | Fixes 1-3 + Vercel domain |
| `www.mousetesterpro.com/blog/top-5-ways-reduce-mouse-latency` | No server canonical | Fixes 1-3 |
| `mousetesterpro.com/complete-guide` | Redirects to www, no server canonical | Fixes 1-3 + Vercel domain |
| `www.mousetesterpro.com/favicon.ico` | Static asset, no issue (will self-resolve) | N/A |

---

## Verification Plan

### After Code Changes
- `npm run build` — verify no errors
- Check that built HTML contains `<link rel="canonical" href="https://mousetesterpro.com/...">` in the `<head>` of each page

### After Vercel Domain Fix
- `curl -sI https://www.mousetesterpro.com` → should return 301/307 to `mousetesterpro.com`
- `curl -sI https://mousetesterpro.com` → should return 200
- `curl -sI https://mousetesterpro.com/blog/mouse-test-latency` → should return 200

### After Deploy
- In GSC, use "URL Inspection" on each affected URL to request re-indexing
- Submit updated sitemap
- Monitor "Explored, not indexed" count over 1-2 weeks
