# Phase 6: Trust and service pages

Status: implemented locally, awaiting review. Not committed or deployed.

## Source of facts
No founder information or new methodology details were provided. Every factual statement on these pages comes from the published legal pages, all updated 25 September 2026, and is linked from the page:
- Terms of Service:
  - brief, sample, order and delivery steps
  - "publicly available business sources", "two verification services", "remove duplicates and review files before delivery"
  - mobiles "typically around 50–60%"
  - customer outreach responsibilities
  - the licence
- GDPR notice:
  - the source list (public professional profiles such as LinkedIn, company websites, directories and registries, regulatory filings such as SEC filings)
  - "we do not buy or resell private databases"
  - 90-day retention, suppression list, rights
  - "a named person handles every data request"
- Privacy Policy:
  - operated from India
  - serves mainly the US, UK, EU, Canada and Australia
  - enquiries and ICP are not sold or shared
- Refund Policy:
  - rebuild or refund within 7 days
  - hard bounces on first send within 14 days are replaced
  - acceptance criteria (rows outside the brief, excluded companies, duplicates, fewer rows, missing columns)
  - "a person reads every message"

Not used, because the facts register marks them POLICY? or RETAINED and unconfirmed:
- the founder story ("$15k annual contracts")
- 110M+, 800K+ and 18h
- anonymised client results
- names of the verification tools
- "every order is built fresh"

## Pages

### /about
- Search intent: who is behind Clean Rows and how it works.
- Primary keyword: about Clean Rows.
- Story: company facts, what we do and don't do, who we serve (linked to the /for pages), the five-step process, operating principles, FAQs, and a contact and sample form.
- Schema: AboutPage, BreadcrumbList, FAQPage (5).
- No founder, portrait, quote or history. The old `[Founder Name]`, `[IMG]`, "Meet the team" and the Results block are gone from this page.

### /data-sources
- Search intent: where B2B prospect data comes from and how it is checked.
- Primary keyword: B2B data sources.
- Secondary: how are B2B emails verified, is B2B data GDPR compliant.
- Story:
  - four source types
  - four-step process
  - what "verified" does and doesn't mean
  - coverage limits (mobiles, data decay, narrow audiences)
  - "public is not the same as permission"
  - rights of people in the lists
  - FAQs and a sample form
- Removed from the old page: "100% GDPR and CCPA aligned" and "strictly aggregate". The compliance FAQ explains that compliance depends on use.

### /services/custom-lists
- Search intent: commissioning a custom B2B list to a specific brief.
- Primary keyword: custom B2B prospect lists.
- Secondary: custom email list research, ICP list building service.
- Story:
  - vague versus useful fictional brief
  - the seven parts of a brief (table)
  - "a narrow audience stays narrow"
  - standard package versus custom quote
  - file splits, headers and format
  - scope, timing and acceptance before payment
  - FAQs and a form with package selection for quotes
- Schema: Service (no offers, since no prices are shown), BreadcrumbList, FAQPage (6).

## Consistency fixes to earlier phases
- Terms §7 licence: agencies "may use a list to run campaigns on behalf of their clients", but may not distribute the data as a dataset. The Agencies page and the Apollo comparison said files could be "passed to" or "shared with" clients. The copy now says agencies can run campaigns for clients, with no Clean Rows branding in the file, and that reselling is not permitted.
- US spelling: honored, honor, prioritize and specialty (was specialism).

## Shared UI changes
- `EditorialLayout`: optional `pageType` prop (used for AboutPage).
- CSS:
  - source grid and muted "vague brief" card
  - balanced boundary headings
  - on mobile, every reference table keeps its row-header column pinned and its caption inside the viewport (previously only the comparison tables did)

## Verification
- `astro build`: clean.
- On each page:
  - one H1
  - no duplicate IDs
  - anchors resolve
  - internal links resolve
  - FAQ JSON-LD matches the visible FAQs
  - no banned claims (100%, 110M, 800K, 24 hours, placeholders, em dashes)
- Titles are 51–58 characters and descriptions 149–160.
- Horizontal overflow is 0 on all 14 editorial pages at 390 and 320 (and at 1440 and 768 for Phase 6). Sticky table headers were confirmed after scrolling.
- Desktop and mobile full pages were reviewed. Fixed: a four-line Data Sources H1, orphaned panel titles, and an orphaned boundary heading on mobile.

## Questions for the founder
1. About: may we publish a founder or team name, photo and short bio? If not, the page stays company-only.
2. Home still shows `Founder.astro` with `[IMG]` and `[Founder Name]`. Replace the section with verified details, or remove it?
3. May the page say that each order is researched fresh rather than drawn from stored data (F10)? The GDPR notice supports "built to a specific brief rather than keeping a large database", and that wording is what the page uses.
4. Should the two email verification services be named publicly?
5. Is every file reviewed by a person before delivery (F14)? The pages currently say "reviewed", without "by a person".
