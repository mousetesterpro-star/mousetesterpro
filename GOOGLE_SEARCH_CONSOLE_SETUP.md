# Google Search Console Setup for mousetesterpro.com

## Recommended Setup: Domain Property (Single Verification)

### Option 1: Domain Property (RECOMMENDED)
**Enter in Google Search Console:** `mousetesterpro.com`

This single property covers ALL variations:
- ✅ `https://www.mousetesterpro.com`
- ✅ `https://mousetesterpro.com`
- ✅ `http://www.mousetesterpro.com`
- ✅ `http://mousetesterpro.com`
- ✅ All subdomains (blog.mousetesterpro.com, etc.)

**Verification Method:** DNS verification (add TXT record to your domain DNS)

---

## Alternative Setup: URL Prefix Properties (Multiple Verifications)

If you prefer URL prefix properties, add these individually:

### Primary URLs to Add:

1. **Main Site (with www)**
   - URL: `https://www.mousetesterpro.com`
   - This is your primary canonical URL (as set in your code)

2. **Main Site (without www)** - Optional
   - URL: `https://mousetesterpro.com`
   - Only if you want to track non-www separately

---

## All Site Pages (for Reference)

Based on your sitemap.xml, here are all the pages on your site:

### Main Pages:
- `https://www.mousetesterpro.com/` (Home)
- `https://www.mousetesterpro.com/leaderboard`
- `https://www.mousetesterpro.com/about`
- `https://www.mousetesterpro.com/blog`
- `https://www.mousetesterpro.com/contact`
- `https://www.mousetesterpro.com/guides`
- `https://www.mousetesterpro.com/accessibility`

### Blog Posts:
- `https://www.mousetesterpro.com/blog/top-5-ways-reduce-mouse-latency`
- `https://www.mousetesterpro.com/blog/why-input-lag-matters-gamers`
- `https://www.mousetesterpro.com/blog/mouse-latency-vs-response-time`
- `https://www.mousetesterpro.com/blog/how-to-test-mouse-latency`
- `https://www.mousetesterpro.com/blog/mouse-jitter-vs-polling-rate`
- `https://www.mousetesterpro.com/blog/mouse-test-latency`

---

## Setup Instructions

### Step 1: Choose Your Property Type

**RECOMMENDED:** Use **Domain Property**
- Enter: `mousetesterpro.com`
- Click "CONTINUE"
- Follow DNS verification steps

**OR** Use **URL Prefix Property**
- Enter: `https://www.mousetesterpro.com`
- Click "CONTINUE"
- Choose verification method (HTML file, meta tag, or Google Analytics)

### Step 2: Verification Methods

#### For Domain Property (DNS Verification):
1. Google will provide a TXT record
2. Add it to your domain's DNS settings
3. Wait for DNS propagation (can take up to 48 hours)
4. Click "Verify" in Search Console

#### For URL Prefix Property:
You can use any of these methods:

**Method 1: HTML Meta Tag** (Easiest)
- Google provides a meta tag
- Add it to your `src/app/layout.tsx` in the `<head>` section
- Already have: `google-site-verification: VuktZVfop_TtmjmC2sfWPPIxZtK5ovyB8wKHpY4OFfY`
- Use this if it matches the verification code

**Method 2: HTML File Upload**
- Download the HTML file from Google
- Upload it to your `public/` folder
- Deploy and verify

**Method 3: Google Analytics** (If already set up)
- If you have Google Analytics connected, you can verify automatically

### Step 3: Submit Sitemap

After verification, submit your sitemap:
- URL: `https://www.mousetesterpro.com/sitemap.xml`

---

## Important Notes

1. **Canonical URL:** Your site uses `https://www.mousetesterpro.com` as the canonical URL
2. **Sitemap:** Already configured at `https://www.mousetesterpro.com/sitemap.xml`
3. **Robots.txt:** Already configured at `https://www.mousetesterpro.com/robots.txt`
4. **Google Site Verification:** Already in your code: `VuktZVfop_TtmjmC2sfWPPIxZtK5ovyB8wKHpY4OFfY`

---

## Quick Setup Checklist

- [ ] Choose Domain Property or URL Prefix Property
- [ ] Complete verification (DNS or meta tag/file)
- [ ] Submit sitemap: `https://www.mousetesterpro.com/sitemap.xml`
- [ ] Wait for Google to crawl your site (can take a few days)
- [ ] Monitor Search Console for indexing status

---

## Recommendation

**Use Domain Property** (`mousetesterpro.com`) because:
- ✅ Single verification covers everything
- ✅ Automatically includes all subdomains
- ✅ Covers both HTTP and HTTPS
- ✅ Covers both www and non-www versions
- ✅ Future-proof for any new subdomains

