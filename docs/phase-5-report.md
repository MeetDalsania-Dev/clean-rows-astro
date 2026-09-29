# Phase 5: Competitor comparisons

Status: implemented locally, awaiting review. Not committed or deployed.

## Pages

### /compare/apollo
- Search intent: evaluating Apollo against a managed list service.
- Primary keyword: Apollo alternative / Clean Rows vs Apollo.
- Secondary: Apollo pricing per seat, Apollo credits, buy B2B list instead of Apollo.
- Story:
  - "Who does the searching?" (the two workflows side by side)
  - an 11-row comparison table
  - an honest "Apollo may fit better if" / "delivered list may fit if" section
  - what Clean Rows does not provide
  - FAQs, sources and a sample-only form

### /compare/zoominfo
- Search intent: evaluating ZoomInfo against a one-time list.
- Primary keyword: ZoomInfo alternative / Clean Rows vs ZoomInfo.
- Secondary: ZoomInfo pricing, ZoomInfo annual contract, ZoomInfo free plan.
- Story:
  - "A procurement decision, or a campaign decision?" (the two buying processes)
  - a 9-row comparison table
  - honest fit guidance
  - what Clean Rows does not provide
  - FAQs, sources and a sample-only form

Schema on both pages: WebPage, BreadcrumbList, FAQPage (6 visible). No Service or Product entities, and nothing asserted about the competitors in structured data.

## Sources (all checked 29 September 2026)

### Apollo: https://www.apollo.io/pricing, read directly in the browser
- Free $0 (900 credits per seat per year, granted monthly).
- Billed annually, per seat per month:
  - Basic $49 (30,000 credits per seat per year)
  - Professional $79 (48,000)
  - Organization $119, minimum 3 seats (72,000)
- Billed monthly, per seat per month:
  - Basic $65 (2,500 credits per seat per month)
  - Professional $99 (4,000)
  - Organization $149 (6,000)
- An email uses 1 credit; a phone number uses 8.
- 14-day trial on Basic and Professional.
- Integrations named in the FAQ: Salesforce, HubSpot, Outreach, Salesloft and others.
- Intent topics on all plans (1 on Free, 6 on Basic and Professional, 12 on Organization).
- FAQ statement: the listed plans are "permitted for internal business use only"; sharing data with customers or reselling requires a separate agreement.
- Prices exclude tax.
- Apollo's trial FAQ gives 100 trial credits, while an earlier fetch of the same page said 50. The page therefore does not state a trial credit count.

### ZoomInfo
- https://www.zoominfo.com/pricing and /faqs/pricing returned a bot check or a 403 and could not be read. The check was not bypassed.
- https://pipeline.zoominfo.com/sales/how-much-does-zoominfo-cost is ZoomInfo's own pricing guide, updated 7 July 2026. It says:
  - paid plans are custom-quoted and not published
  - the price depends on team size, credit volume, features (intent, technographics, WebSights), integrations and API access, and contract length
  - most paid plans are billed annually upfront, and monthly billing is not standard
  - ZoomInfo Lite is a free plan with 10 monthly credits
  - credits are consumed when downloading contact records
- ZoomInfo Form 10-K for fiscal 2025 (SEC): subscriptions are priced "based on the functionality, users, and records under management", and the platform integrates with CRM and sales and marketing automation systems.

Deliberately not claimed:
- competitor data quality or staleness
- minimum contract values
- response times, accuracy rates or savings
- that anyone is "switching"
- human verification versus automated verification

## Other changes
- New scoped CSS:
  - `.ed-flow-pair` (the paired workflows)
  - `.ed-compare` (tinted Clean Rows column; on mobile, sticky row headers and a caption that stays inside the viewport)
  - `.ed-sources` (the sources section)
- Removed `src/components/CompareTable.astro`. It had unsupported claims and is no longer used.

## Verification
- `astro build`: clean.
- On both pages:
  - one H1
  - no duplicate IDs
  - `#` anchors resolve
  - internal links resolve
  - FAQ JSON-LD matches the visible FAQs (6 each)
  - no em dashes or straight quotes in the copy
- Titles are 53–55 characters and descriptions 151–156.
- Horizontal page overflow is 0 at 1440, 768, 390 and 320.
- The table scrolls inside a labelled, focusable region. At 390px the row headers stay pinned while scrolling.
- Desktop and mobile full pages were reviewed. One style conflict (an oversized "Sources" heading) was found and fixed.

## Flagged outside this phase
- Home (`src/pages/index.astro`) renders `Founder.astro`, which still shows `[IMG]` and `[Founder Name]`. The same component is used on /about, /data-sources and /services/custom-lists. Phase 6 replaces it on those three pages. Home needs your decision.
- `src/components/Welcome.astro` is unused Astro starter code. It can be removed in Phase 7.
