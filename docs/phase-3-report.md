# Phase 3: Segment pages

Status: implemented locally, awaiting review. Not committed or deployed.

## Pages

### /for/agencies
- Search intent: an agency owner looking for a data supplier that can serve several clients.
- Primary keyword: B2B lead lists for agencies.
- Secondary: white-label lead lists, prospect lists for lead generation agencies, outbound agency data.
- Story: client roster problem, how each client brief stays separate, two fictional client briefs, what the client receives, sample-first process, contextual pricing (no seat fees, white-label), FAQs, request form with package selection.
- Schema: WebPage, BreadcrumbList, FAQPage (7 visible), Service with the package offers, since the page shows the packages.

### /for/saas
- Search intent: SaaS founders, sales leaders and SDR teams looking for prospect lists by ICP or territory.
- Primary keyword: B2B SaaS prospect lists.
- Secondary: SaaS lead lists by territory, target account contact lists, SDR prospect lists.
- Story: three jobs (market test, territory, target accounts), a buyer-role and title-variation table, company fit next to each contact, not-included items (no tech stack, no native integrations), CRM import workflow, a "research, not pipeline" boundary, FAQs, sample-only request.
- Schema: WebPage, BreadcrumbList, FAQPage (7), Service without offers. No packages are shown on the page.

### /for/recruitment
- Search intent: recruitment agencies looking for employer business-development data.
- Primary keyword: employer lead lists for recruitment agencies.
- Secondary: recruitment business development leads, hiring manager contact lists, HR and talent acquisition contacts.
- Story: "not a candidate database" boundary right after the hero, the desk-based approach, a desk-by-desk table of contacts and exclusions, a relevance review checklist, included versus not included, FAQs, sample-only request.
- Schema: WebPage, BreadcrumbList, FAQPage (6), Service without offers.

## Shared changes
- `BaseLayout.astro`: optional `planHref` prop. "Choose a plan" in the header goes to `#pricing` only on pages that have one. The primary nav now marks the current page with `aria-current` on every editorial page, not only on Pricing.
- `EditorialLayout.astro`: optional `serviceName`, `audience` (BusinessAudience) and `serviceOffers` props. The default behavior is unchanged for Pricing.
- New `components/editorial/PlanStrip.astro`: a compact package list with `data-plan` buttons wired to the existing form logic in `editorial.js`.
- `public/editorial.css`: appended scoped rules for the principles list, plan strip, paired briefs, wrapped reference tables and a mobile scroll hint.

## Verification
- `astro build`: clean, no errors or warnings.
- For each page:
  - one H1
  - no duplicate IDs
  - every `#` anchor resolves
  - all internal links point to existing routes
  - FAQ JSON-LD count matches the visible FAQs
  - no em dashes in the page copy
- Titles are 55–61 characters and descriptions 155–159.
- Horizontal overflow is 0 at 1440, 768, 390 and 320. Tables scroll inside a labelled, focusable region, with a hint on mobile.
- Forms:
  - agencies: choosing Scale sets the volume to 50000 and the message names Scale, the page and the team; the header sample link resets it to 100
  - SaaS and recruitment: sample-only
  - entered data is kept after the handoff
  - `window.open` was stubbed during tests, so no WhatsApp message was sent
- Regression: /pricing plan selection and its `#pricing` header link still work. Home still links to `/#pricing`.

## Open questions
1. White-label: are files guaranteed to carry no Clean Rows branding (file names, sheet titles, headers)? The agencies page says so, based on the old "white-label friendly" claim.
2. Exclusions: in what format can clients send suppression lists (domains, emails, company names), and is removing them part of the standard price?
3. Free sample for agencies: is it one per agency (before the first paid order) or one per client? The page says one before the first paid order.
4. Per-desk and per-territory file splits: are these included in standard packages or only "on request"? The pages say they are agreed before ordering.
5. Tracking: the "Ref: button" in the WhatsApp message is the last CTA clicked in the session, which can be from another page. The "Page:" line is always correct. This is existing `tracking.js` behavior and was not changed.
