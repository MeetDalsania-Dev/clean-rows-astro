# Phase 4: Target list pages

Status: implemented locally, awaiting review. Not committed or deployed.

## Pages

### /lists/ceos
- Search intent: buyers looking for a CEO or founder email list for their ICP.
- Primary keyword: CEO email list.
- Secondary: founder email list, CEO contact list, managing director email list.
- Story:
  - a title-rules table (CEO, founder, MD, owner/president; former, fractional and advisor exclusions)
  - one leader versus several per account
  - company size, sector and geography
  - a "title is not a budget" boundary
  - contextual pricing (visible, so Service offers are included)
  - FAQs and a request form with package selection

### /lists/vp-sales
- Search intent: buyers looking for sales-leadership contacts.
- Primary keyword: VP of Sales email list.
- Secondary: sales leader contact list, CRO email list, Head of Sales list.
- Story:
  - a title map (usually in scope, agree first, usually out of scope), including the UK "Sales Executive" false friend
  - global versus regional responsibility
  - company and territory
  - a direct answer on email verification (no inbox-placement or firewall guarantee)
  - FAQs and a sample-only form

### /lists/fintech
- Search intent: buyers looking for contacts at financial technology companies.
- Primary keyword: fintech email list / fintech company contact list.
- Secondary: payments company contacts, lending fintech list, fintech founders list.
- Story:
  - six subsector cards, each with a "clarify in the brief" question
  - companies before contacts (3 steps)
  - functions to reach, with links to the CEO and VP Sales pages
  - headquarters versus operating-market rule
  - a not-included boundary (licensing, funding, tech stack, consumer financial records)
  - FAQs and a sample-only form

## Shared changes
- `public/editorial.css`:
  - scope panels (`.ed-scope`) and the subsector grid
  - `text-wrap: balance` on editorial H1s, which prevents one-word last lines
  - the plan strip action column is now fixed-width, so prices align on every row, including Agencies
- Typography: straight quotes and apostrophes replaced with typographic ones on the Phase 3 and Phase 4 pages, to match the completed pages.
- FAQ titles shortened to avoid orphaned words.

## Verification
- `astro build`: clean.
- For each page:
  - one H1
  - no duplicate IDs
  - `#` anchors resolve
  - internal links resolve to built routes
  - FAQ JSON-LD count matches the visible FAQs (6 per page)
  - no em dashes in the copy
- Titles are 49–56 characters and descriptions 154–160.
- Horizontal overflow is 0 at 1440, 390 and 320. Title tables scroll inside a labelled region, with a hint on mobile.
- Full-page desktop and mobile screenshots were reviewed section by section. Orphaned headings and misaligned prices were fixed.
- CEO page:
  - choosing Enterprise sets `100000+`
  - the message names the Enterprise quote and the page `/lists/ceos`
  - the header "Choose a plan" goes to `#pricing`
- VP Sales and Fintech: sample-only forms. The header "Choose a plan" goes to `/pricing`.

## Open questions
1. Title rules and per-account limits are described as agreed in the brief. Confirm there is no fixed default, such as one contact per company.
2. The CEO pricing strip says narrow audiences are flagged before payment. Confirm this matches how orders are handled.
