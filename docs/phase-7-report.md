# Phase 7: Site-wide verification

Status: verified locally on 29 September 2026. Not committed or deployed.

Test setup: `astro build`, then `astro preview` on localhost:4400. Checks used a static audit of `dist/`, the in-app browser (DOM, forms, console), headless Chrome full-page screenshots, and Lighthouse 12.8.2 (mobile preset, simulated throttling, local server).

## Issues found and fixed in this phase

| # | Issue | Cause | Fix |
|---|---|---|---|
| 1 | Legal pages and the calculator linked to `refund.html`, `terms.html`, `index.html#pricing`, etc. These 404 on the clean-URL deploy. | Leftover links from the static site | Replaced with absolute clean paths (`/refund`, `/#pricing`, …). Legal wording unchanged. |
| 2 | Legal pages and the calculator rendered with no container: text touched the screen edge and lines ran 1,440px wide | The migration dropped the original `<body class="legal-page">` and `<main class="section legal">` classes, so none of the legal CSS applied | `BaseLayout` takes `bodyClass` and `mainClass`; the five pages pass their original classes |
| 3 | The calculator did nothing: static numbers, slider and presets dead | `calculator.js` was never loaded; the page loaded the home scripts instead | `BaseLayout` `scripts` prop, so each page loads the scripts the original site used |
| 4 | JavaScript error (`Cannot read properties of null`) on the calculator and all legal pages | `app.js` assumed a form | A guard in `app.js`; legal pages no longer load the home scripts |
| 5 | "Request a custom quote" link visible at every volume | `.text-link` display overrode `[hidden]` | Scoped `#custom-quote-link[hidden]{display:none}` |
| 6 | No canonical, OG tags or JSON-LD on Home, the calculator and the legal pages; six pages shared one title and description | Head tags were only output on editorial pages | Canonical, OG, Twitter and the Organization and WebSite graph on every page; unique titles and descriptions for the legal pages and calculator |
| 7 | No `robots.txt` and no sitemap | Missing | `public/robots.txt` and `src/pages/sitemap.xml.ts` (all routes, no dependency); `site` set in `astro.config.mjs` |
| 8 | `[Founder Name]`, `[IMG]`, a `href="#"` LinkedIn link and an unverified quote on Home | `Founder.astro` placeholder | Section removed from Home and the component deleted. Restore it once verified founder details exist. |
| 9 | Em dashes in the Data Fields copy and the Pricing title | Copy guardrail | Replaced |
| 10 | Text below WCAG AA contrast in the shared form, the pricing cards, the legal pages and the calculator | Legacy palette in `site.css` | Scoped overrides (`.editorial`, `.legal-page`, `.calculator-page`); Home unchanged |
| 11 | The privacy table scroll area was not keyboard reachable | No `tabindex` or label | `role="region"`, `aria-label`, `tabindex="0"` |
| 12 | Logo link name did not contain its visible text (WCAG 2.5.3) | `aria-label="Clean Rows home"` | `aria-label="cleanrows home"` |
| 13 | LCP 2.7–2.9s: Google Fonts CSS blocked first render | Render-blocking stylesheet | Fonts preloaded and applied without blocking (with a `noscript` fallback) |

## Verification results

- Build: clean, 21 routes (20 pages plus `sitemap.xml`).
- Static audit of all 20 pages:
  - one H1 each
  - no duplicate IDs
  - every internal link and asset resolves
  - every in-page and cross-page anchor resolves
  - no relative links
  - JSON-LD parses on every page
  - FAQ JSON-LD count equals the visible FAQs on all 14 editorial pages
  - unique titles and descriptions
  - canonicals match the route on `https://clean-rows-astro.vercel.app`
  - no `noindex`
- Console: no errors on any page after the fixes.
- Layout: horizontal page overflow is 0 on all 20 pages at 1440, 1024, 768, 390 and 320. No element pokes out of the viewport and no button text is clipped. Tables scroll inside labelled, focusable regions, and on mobile the row headers stay pinned.
- Forms (14 editorial pages):
  - the prepared WhatsApp message names the correct page and encodes special characters
  - plan buttons set the package and the sample buttons reset it
  - sample-only pages send the sample request
  - entered data is kept after the handoff
  - `window.open` was stubbed, so no message was sent
- Home: step, audience and field tabs, plan selection, the WhatsApp message and the mobile menu all work.
- Calculator: presets, slider and the monthly/yearly toggle work; the custom quote appears only at 100,000+.
- CSV download returns 200.
- Contrast: all 14 editorial pages, the 4 legal pages and the calculator pass WCAG AA for text. Only `aria-hidden` decorative glyphs are below.

### Lighthouse (mobile, simulated throttling, local preview)

| Page | Perf | A11y | BP | SEO | FCP | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| / | 99 | 97 | 100 | 100 | 1.0s | 1.1s | 0.005 | 130ms |
| /pricing | 100 | 100 | 100 | 100 | 1.5s | 1.5s | 0.001 | 0ms |
| /for/agencies | 100 | 100 | 100 | 100 | 0.9s | 1.1s | 0.035 | 30ms |
| /compare/apollo | 100 | 100 | 100 | 100 | 0.9s | 1.2s | 0.001 | 20ms |
| /data-sources | 100 | 100 | 100 | 100 | 1.0s | 1.1s | 0.018 | 30ms |
| /privacy | 99 | 100 | 100 | 100 | 0.9s | 1.1s | 0.003 | 110ms |

Before the font change, Performance was 83–90 with LCP 2.7–2.9s. These are local-server results; production depends on Vercel's edge and real networks.

## Not changed, needs a decision

1. Home colour contrast (Lighthouse A11y 97). Many small Home texts are 2.2–4.4:1. Fixing this means changing Home's palette, which is a design decision.
2. Home still uses claims that need proof, per the facts register:
   - "GDPR & CCPA Aligned / Compliant processes"
   - "human-verified … 24 hours"
   - 110M+ and 800K+ (RETAINED under D8)
   - anonymised results
3. The Pricing page's Slack block shows a personal Gmail address (facts register F52).
4. The calculator's competitor figures ($149 per seat for Apollo, $15,000 a year for ZoomInfo) are labelled as illustrative assumptions. Apollo's published Organization monthly price is $149 per seat (minimum 3 seats); ZoomInfo publishes no price.
5. There is no OG image, and no custom 404 page.
6. Repo leftovers:
   - `src/components/Welcome.astro`, `src/layouts/Layout.astro`, `src/assets/*.svg`
   - the starter README and the `temp-astro` package name
   - root one-off scripts (`fix-*.cjs`, `inject*.cjs`, `extract.*`, `generate-pages.cjs`)
   - the Astro-default `AGENTS.md`
   - `netlify.toml` alongside `vercel.json`
7. `tracking.js` keeps the last CTA clicked in the session, so "Ref: button" can name another page's button. The "Page:" line is always correct.
8. Production origin: canonicals, the sitemap and robots use `clean-rows-astro.vercel.app` (from the brief). Change `site` in `astro.config.mjs` when `cleanrows.com` goes live.
