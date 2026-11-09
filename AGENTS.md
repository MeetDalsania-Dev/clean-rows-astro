## Clean Rows project rules

These rules apply to every session that touches copy, pages or marketing content on this site.

### Company facts (use only these in copy, never invent)
- Clean Rows builds B2B lead lists fresh to each client's ICP (roles, seniority, industries, company size, locations). A service, not a database or software.
- Fields: first and last name, exact job title, company, domain, verified business email, mobile (roughly 50 to 60 percent of rows, marked), company HQ phone, personal and company LinkedIn URLs, company size, industry, location. No tech stack data.
- Two email verification tools, a person reviews every list, duplicates removed. Public B2B sources only, no personal emails, removal requests honored.
- Packages, one time, no seats: 1,000 $25, 10,000 $199, 50,000 $799, 100,000+ custom quote. Delivery about 3 hours, 24 hours, 48 hours, 5 to 7 business days. CSV or Google Sheet.
- Free sample within 24 hours, no card, no call, no signup. Free rebuild or refund if the list misses the brief. Founder Meet Dalsania. Public email sales@cleanrowsdata.com (never show meet@ publicly except the existing About page).

### Copy rules (visible text, titles, meta)
- No hyphens, en dashes or em dashes. No Oxford comma. No comma directly before "and" or "or".
- No hype words: best, ultimate, #1, revolutionary, game changing, world class, cutting edge, unlock, supercharge.
- No unprovable claims: no accuracy percentages, client counts, testimonials, awards, "we tested", "most popular".
- No fixed database size or typical build size; the count is confirmed for the buyer's ICP before payment.
- Lead with 10,000 contacts for $199. Never lead titles or headings with $25. No small numbers as proof of scale. The free sample size (100) may appear only in CTA buttons, the Contact component, the homepage, /free-sample, the legal pages (/terms and /refund) and llms.txt. Never in titles, headings, hero copy or body copy of other pages.
- Never label examples or sample rows as fictional or illustrative.
- Never use target countries as a selling point.
- Competitors: factual only, every price linked to their own pricing page with the month checked, never criticise.

### Design quality (every new or changed page)
- Match the homepage design system exactly: existing tokens, fonts and components only (EditorialLayout, editorial Hero with the file card panel, FAQ accordion, Related, PlanStrip, FeatureChart, Contact with the free sample heading, step cards, benefit strip). No new colors, fonts, images or libraries.
- Every H2 section is its own visual block with homepage spacing. Tables scroll inside their container on mobile with the sideways hint; the page never scrolls sideways.
- Mobile first at 390px and 1440px, 16px gutters, 44px tap targets, one H1, WCAG AA contrast.
- Before committing: screenshot changed pages at 390px and 1440px with scroll reveal animations forced visible, compare with the homepage, fix every issue.

### SEO and release checklist
- Primary keyword in title (max 60 characters), meta (140 to 155), H1, first 100 words, one H2 and the slug. FAQ answers 2 to 4 sentences, answer first; FAQPage schema generated from the same data as the visible FAQ.
- New URLs go into the sitemap and llms.txt. Old URLs get a 301 in vercel.json.
- IndexNow runs automatically after each Production deploy (GitHub Action). Use the workflow_dispatch run to resubmit manually.
- Production build must have zero new errors. Push from the login shell if the sandbox blocks it.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/guides/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Using styles or Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
