// Role list page content, transcribed verbatim from the approved v3 page docs
// (content/pages/page-01-vp-sales.md through page-07-cto.md). Links are written
// in [anchor](/path) markdown and rendered as inline editorial links by the
// template. sample.rows stays empty until Meet's masked rows are added; the
// sample section renders nothing in the meantime.

export interface RolePage {
  key: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    label: string;
    serviceName: string;
    audience: string;
  };
  hero: { title: string; accent: string; intro: string; proof: string };
  sample: { heading: string; intro: string; columns: string[]; rows: string[][] };
  fields: {
    heading: string;
    intro: string;
    titleExample: string;
    titleNote: string;
    notIncluded: string;
  };
  titleMap: { heading: string; intro: string; rows: [string, string, string][]; closing: string };
  count: { heading: string; p1: string; p2: string };
  filters: { heading: string; rows: [string, string][]; calc: string };
  built: { heading: string; steps: [string, string][]; delivery: [string, string][] };
  packages: {
    heading: string;
    lead: string;
    rows: [string, string, string, string, string][];
    note: string;
    cta: string;
  };
  prebuilt: { heading: string; intro: string; rows: [string, string, string][]; close: string };
  useCases: {
    heading: string;
    rows: [string, string][];
    tipsHeading: string;
    tips: string[];
  };
  sources: { heading: string; p1: string; p2: string };
  faqs: [string, string][];
  closing: { heading: string; body: string; crossLink: string };
  serviceSchema: Record<string, unknown>;
  related: [string, string, string][];
}

const site = "https://www.cleanrowsdata.com";

const offerUrl = (slug: string) => `${site}/lists/${slug}#packages`;

const serviceSchema = (name: string, description: string, url: string, firstOffer: string) => {
  const anchor = offerUrl(url.split("/lists/")[1]);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: "B2B lead list building",
    description,
    url,
    provider: {
      "@type": "Organization",
      name: "Clean Rows",
      url: "https://www.cleanrowsdata.com/",
      email: "sales@cleanrowsdata.com",
      founder: { "@type": "Person", name: "Meet Dalsania" },
    },
    offers: [
      { "@type": "Offer", name: firstOffer, priceCurrency: "USD", url: anchor, availability: "https://schema.org/InStock", eligibleQuantity: { "@type": "QuantitativeValue", value: 10000, unitText: "contacts" }, price: "199" },
      { "@type": "Offer", name: "Scale: 50,000 contacts", priceCurrency: "USD", url: anchor, availability: "https://schema.org/InStock", eligibleQuantity: { "@type": "QuantitativeValue", value: 50000, unitText: "contacts" }, price: "799" },
      { "@type": "Offer", name: "Starter: 1,000 contacts", priceCurrency: "USD", url: anchor, availability: "https://schema.org/InStock", eligibleQuantity: { "@type": "QuantitativeValue", value: 1000, unitText: "contacts" }, price: "25" },
      { "@type": "Offer", name: "Enterprise: 100,000+ contacts, custom quote", priceCurrency: "USD", url: anchor, availability: "https://schema.org/InStock", eligibleQuantity: { "@type": "QuantitativeValue", value: 100000, unitText: "contacts" } },
    ],
  };
};

// Identical across role pages; only the marked spots swap per role.
const SAMPLE_COLUMNS = ["First name", "Last name", "Job title", "Company", "Domain", "Business email (masked)", "Mobile (masked or Not found)", "Company HQ phone (masked)", "Personal LinkedIn", "Company LinkedIn", "Company size", "Industry", "Location"];

const fieldRows = (titleExample: string, titleNote: string): [string, string, string][] => [
  ["First name and last name", "The name as the person writes it on their professional profile", "Every row"],
  ["Exact job title", `The title they use today, for example ${titleExample}`, titleNote],
  ["Company", "Company name", "Every row"],
  ["Domain", "The company website domain", "Every row, useful for CRM matching"],
  ["Verified business email", "Work email checked with two verification tools", "Every row. No personal emails"],
  ["Mobile number", "Direct mobile where one is found in public sources", "Roughly 50 to 60 percent of rows, marked per row"],
  ["Company HQ phone", "The main company number", "A second route when no mobile is found"],
  ["Personal LinkedIn URL", "Link to the leader's own profile", "For research and LinkedIn outreach"],
  ["Company LinkedIn URL", "Link to the company page", "For a quick read on headcount and hiring"],
  ["Company size", "Employee range", "Every row, matched to your brief"],
  ["Industry", "The company's industry", "Every row, matched to your brief"],
  ["Location", "Location for each row", "Every row, filtered to your brief"],
];

const NOT_INCLUDED =
  "Not included: tech stack data. We leave it out because its accuracy is not good enough to sell. We never include personal emails or consumer data.";

const fieldsIntro =
  "Every row carries the same standard fields, so you know what you are buying before you pay. See the [full CSV field specification](/whats-in-the-file) for column formats.";

const PREBUILT_ROWS: [string, string, string][] = [
  ["When is the data gathered?", "Before you buy, on the seller's own refresh schedule", "For your order, after you brief us"],
  ["Who decides which titles count?", "The seller's title rules", "You, agreed with us before research"],
  ["How many contacts?", "A fixed total for the whole file", "The exact count for your ICP, confirmed before payment"],
  ["How do you filter?", "By the seller's categories", "Industry, company size, location, seniority, target accounts and exclusions"],
  ["Is it reviewed by a person?", "Depends on the seller", "Yes, every list before delivery"],
  ["How is it priced?", "Set by each seller", "$199 for 10,000 contacts, one time"],
];

const PACKAGE_ROWS: [string, string, string, string, string][] = [
  ["Growth", "10,000", "$199", "$19.90", "24 hours"],
  ["Scale", "50,000", "$799", "$15.98", "48 hours"],
  ["Enterprise", "100,000+", "Custom quote", "Quoted for your brief", "5 to 7 business days"],
  ["Starter", "1,000", "$25", "$25.00", "About 3 hours"],
];

const DELIVERY_ROWS: [string, string][] = [
  ["10,000 contacts", "24 hours"],
  ["50,000 contacts", "48 hours"],
  ["100,000+ contacts", "5 to 7 business days"],
  ["1,000 contacts", "About 3 hours"],
];

const filterRows = (seniority: string, size: string): [string, string][] => [
  ["Industry", "One or many industries plus any sectors to leave out"],
  ["Company size", `Employee bands, for example ${size}`],
  ["Location", "The locations of the companies or leaders you sell to"],
  ["Seniority", seniority],
  ["Target accounts", "Your own list of company names or domains to build from"],
  ["Exclusions", "Current customers, open deals or any domains to leave out"],
];

const CALC_LINE =
  "[Estimate the size of your list with our calculator](/calculator), then send us the brief to confirm the exact count.";

const COUNT_P2 =
  "We confirm the exact count for your ICP before you pay. If your market holds fewer matching leaders than the package you picked, we tell you at that point and suggest the package that fits.";


const builtSteps = (step1: [string, string]): [string, string][] => [
  step1,
  ["Count and price.", "We confirm the exact count and price for your ICP before you pay."],
  ["Research.", "We research every row fresh from [public B2B sources](/data-sources): LinkedIn, company websites, public directories and public filings."],
  ["Email verification.", "Each email passes two verification tools."],
  ["Deduplication.", "Duplicate people and rows are removed."],
  ["Human review.", "A person checks titles, companies and fit against your brief."],
  ["Delivery.", "You get a CSV or Google Sheet, ready for your CRM or sequencing tool."],
];

const SOURCES_P1 =
  "We use public B2B sources only: LinkedIn, company websites, public directories and public filings. No consumer data and no personal emails. If someone asks to be removed, we remove them. Read [where our B2B data comes from](/data-sources) and [how we handle GDPR and data rights](/gdpr).";
const SOURCES_P2 =
  "Before you buy any list, run through our [checklist for buying a B2B email list](/blog/buy-b2b-email-list).";

export const rolePages: RolePage[] = [];
export const rolePage = (key: string): RolePage =>
  rolePages.find((r) => r.key === key);

// ---------------------------------------------------------------------------
// 01 VP of Sales
// ---------------------------------------------------------------------------
rolePages.push({
  key: "vp-of-sales",
  slug: "vp-of-sales-email-list",
  meta: {
    title: "VP of Sales Email List: 10,000 Contacts for $199",
    description:
      "Buy a VP of Sales email list built fresh to your ICP: 10,000 verified contacts for $199, one time. Exact titles, two email checks, CSV in 24 hours.",
    label: "VP of Sales email list",
    serviceName: "VP of Sales email list",
    audience: "B2B teams selling to sales leadership",
  },
  hero: {
    title: "VP of Sales email list",
    accent: "built fresh to your ICP",
    intro:
      "A VP of Sales email list is a file of sales leaders with their exact job titles, verified business emails, phone numbers and company details, ready to load into your outreach tool. Clean Rows builds yours fresh to your ICP and delivers it as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 VP of Sales contacts for $199. One time. No seats.",
  },
  sample: { heading: "Sample rows from a VP of Sales email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every VP of Sales contact list",
    intro: fieldsIntro,
    titleExample: "SVP, Global Sales",
    titleNote: "Every row, checked against your title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which sales leadership titles a VP of Sales list can cover",
    intro:
      "Sales leadership titles vary more than almost any other function. A Head of Sales at a 60 person company often owns the same number as a VP of Sales at a company ten times its size. So you choose the titles and we agree the title map with you before research starts.",
    rows: [
      ["VP of Sales, SVP Sales, EVP Sales", "The leader who owns the sales number and the sales team", "Always, unless you only want a narrower slice"],
      ["Head of Sales", "The top sales role at many smaller and fast growing companies", "You sell to companies under a few hundred staff"],
      ["Chief Revenue Officer (CRO)", "Owns sales, often marketing and customer success too", "You sell something that touches the whole revenue team"],
      ["Chief Sales Officer", "The top sales executive at larger companies", "You want a chief sales officer email list alongside VPs"],
      ["Sales Director", "Runs a team or region, often reports to the VP", "Smaller companies or when you sell to frontline sales leaders"],
      ["VP Business Development", "Owns new partnerships or new market deals", "Your product helps open new accounts or partners"],
    ],
    closing:
      "Tell us which rows of this table you want and whether regional leaders count. We also leave out the titles you do not want, such as Sales Managers, Account Executives and SDRs. A head of sales email list for startups and a VP list for large companies can be the same order with two title rules.",
  },
  count: {
    heading: "How many VP of Sales contacts can you get?",
    p1: "We do not sell a fixed file, so there is no standard size. The number of VP of Sales contacts depends on how wide your ICP is: your titles, industries, company size and locations set the count.",
    p2: COUNT_P2,
  },
  filters: {
    heading: "Company filters you set",
    rows: filterRows("VP and above only or also Directors and Heads of Sales", "50 to 200 or 200 to 1,000"),
    calc: CALC_LINE,
  },
  built: {
    heading: "How each VP of Sales list is built",
    steps: builtSteps(["Brief", "You send roles, seniority, industries, company size, locations, target accounts and exclusions. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "VP of Sales email list pricing",
    lead: "10,000 VP of Sales contacts cost $199. That is $19.90 per 1,000 contacts, paid once. No seats, no subscription and no credits to use up.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 VP of Sales contacts",
  },
  prebuilt: {
    heading: "Prebuilt list or a list built to your ICP",
    intro:
      "There are two ways to buy a VP of Sales email database. Here is how they differ, so you can pick the one that fits your campaign.",
    rows: PREBUILT_ROWS,
    close: "A prebuilt file can be quicker when your ICP matches the seller's categories exactly. If you sell to a specific slice, such as sales leaders at software companies with 200 to 1,000 staff, a list built to your brief means fewer wasted sends. Weighing a seat based data tool instead? See [per list vs per seat pricing compared](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses a VP of Sales contact list",
    rows: [
      ["Agencies running outbound for clients", "One list per client whose product sells to sales teams. See [B2B lead lists for agencies](/for/agencies)."],
      ["SaaS sales teams", "Reach the leaders who buy CRM, sales engagement, call recording, enablement or commission software. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Recruiters placing sales leaders", "Pitch VPs and CROs who hire Sales Directors and Account Executives. Or approach the leaders themselves as candidates."],
    ],
    tipsHeading: "How to get replies from VPs of Sales",
    tips: [
      "Lead with their number. VPs of Sales are judged on pipeline and quota, so open with a result that moves one of those.",
      "Write to their territory. The title often shows the region or segment they run. Mention it.",
      "Keep the first email under 100 words: one problem, one proof point and one easy question.",
      "Call where a mobile is found. A short follow up call two or three days after the first email gives you a second channel.",
      "Add Sales Operations for tool purchases. VPs of Sales often hand the evaluation to Sales or Revenue Operations.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a VP of Sales email list?", "A VP of Sales email list is a file of sales leaders with names, exact titles, verified business emails and company details. Sales teams and agencies use it for cold email, calls and LinkedIn outreach to the people who own the sales number. Clean Rows builds each list fresh to the buyer's ICP."],
    ["Where can I buy a VP of Sales email list?", "You can buy one from list sellers, data platforms or a list building service like Clean Rows. With Clean Rows you send your ICP and we confirm the exact count and price. Then you get 10,000 contacts for $199 within 24 hours."],
    ["How much does a VP of Sales email list cost?", "At Clean Rows, 10,000 VP of Sales contacts cost $199, one time, which is $19.90 per 1,000. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Is it legal to buy a VP of Sales email list?", "Buying business contact data from public B2B sources is legal in most places; the rules cover how you email people. US rules require honest sender details and subject lines, a postal address and a working opt out. In the UK and EU, GDPR also applies and B2B outreach usually relies on legitimate interest with a clear opt out. This is general information, not legal advice."],
    ["How many VPs of Sales will my list have?", "That depends on your ICP, so we confirm the exact count before you pay. We build every list fresh rather than selling one fixed file. If your market holds fewer matching leaders than your package, we tell you before payment."],
    ["How fresh is the data?", "Each list is researched for your order after you send the brief, not exported from a stored database. Every email is checked with two verification tools before the file is delivered."],
    ["How do you verify the emails?", "Every email is checked with two separate verification tools, then a person reviews the whole list before delivery. Duplicates are removed before the file reaches you."],
    ["Does every contact include a mobile number?", "No. We find mobile numbers for roughly 50 to 60 percent of rows and mark clearly which rows have one. The company HQ phone field gives you a second route."],
    ["What if the list misses my brief?", "We rebuild it free or refund you. The brief you agree before payment is the standard we check against, so titles, industries, company size and locations must match it."],
    ["Should I contact the VP of Sales or the VP of Sales Operations?", "Contact the VP of Sales when you sell an outcome they own, such as more pipeline, better win rates or faster hiring. Contact Sales or Revenue Operations when you sell a tool they would run day to day, like a CRM add on. You can include both in one brief."],
    ["Who reports to the VP of Sales?", "Usually regional sales directors and sales managers, with account executives and SDRs below them. In many companies Sales Operations and Sales Enablement report to the VP of Sales too. That makes the VP the right first contact for anything that changes how the whole team sells."],
    ["How do I find a VP of Sales email address?", "For one or two people, check the company website, their LinkedIn profile and the company's email pattern, then verify the address before you send. For hundreds or thousands of sales leaders, a list built to your ICP saves days of research. Clean Rows delivers 10,000 verified contacts in 24 hours."],
    ["How fast will I get my list?", "10,000 contacts arrive within 24 hours and 50,000 within 48 hours. A 1,000 contact list takes about 3 hours and 100,000 or more takes 5 to 7 business days. Files come as a CSV or Google Sheet."],
    ["Can I get a free sample first?", "Yes. Send your brief and we deliver a free sample built to it within 24 hours. No card, no call and no signup."],
    ["Do you include tech stack data?", "No. We leave out tech stack data because its accuracy is not good enough to sell. Every row has the standard contact and company fields listed above."],
  ],
  closing: {
    heading: "Get a VP of Sales sample built to your brief",
    body: "Tell us the titles, industries, company size and locations you want. We send a free sample within 24 hours, then confirm the count and price for your full list. No card, no call and no signup.",
    crossLink: "Selling to the top of the company instead? See our [CEO and founder email lists](/lists/ceo-email-list). Need another role, such as VP of Operations? We build it as a [custom lead list to your brief](/services/custom-lists).",
  },
  serviceSchema: serviceSchema(
    "VP of Sales email list",
    "VP of Sales email lists built fresh to the buyer's ICP from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/vp-of-sales-email-list`,
    "Growth: 10,000 VP of Sales contacts"
  ),
  related: [
    ["/lists/ceo-email-list", "The top of the company", "CEO and founder title rules."],
    ["/lists/cto-email-list", "Technology leaders", "CTO and CIO title map."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 03 CEO
// ---------------------------------------------------------------------------
rolePages.push({
  key: "ceo",
  slug: "ceo-email-list",
  meta: {
    title: "CEO Email List: 10,000 CEO and Founder Contacts for $199",
    description:
      "Buy a CEO email list built fresh to your ICP: CEOs, founders and owners. 10,000 verified contacts for $199, one time, as a CSV file in 24 hours.",
    label: "CEO email list",
    serviceName: "CEO email list",
    audience: "B2B teams selling to company leaders",
  },
  hero: {
    title: "CEO email list",
    accent: "built fresh to your ICP",
    intro:
      "A CEO email list is a file of company leaders, such as CEOs, founders, managing directors and owners, with verified business emails, phone numbers and company details, ready to load into your outreach tool. Clean Rows builds yours fresh to your ICP and delivers it as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 CEO contacts for $199. One time. No seats.",
  },
  sample: { heading: "Sample rows from a CEO email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every CEO contact list",
    intro: fieldsIntro,
    titleExample: "Founder and CEO",
    titleNote: "Every row, checked against your title rules",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which titles count in a CEO and founder list",
    intro:
      "The person running a company might call themselves CEO, Founder, Managing Director, Owner or President. Size and sector change which title is used, so you choose the titles and we agree the title rules with you before research starts.",
    rows: [
      ["CEO, Chief Executive Officer", "The most senior executive running the company", "Always"],
      ["Founder, Cofounder", "Started the business; may or may not still run it", "You want founders still in an operating role"],
      ["Managing Director", "Runs the company in many markets; at large groups it can mean a country or division head", "You want company wide MDs or country MDs as well"],
      ["Owner, President", "Common at small and family owned businesses", "You sell to smaller companies"],
      ["Former, fractional, interim, advisor", "Not currently running the target company", "Left out unless you ask for them"],
    ],
    closing:
      "Many startups have two or three cofounders. Choose whether you want only the most senior leader at each company or every founder still in the business. One leader per company keeps outreach clean; every founder gives you a second route in when the first one does not reply.",
  },
  count: {
    heading: "How many CEO contacts can you get?",
    p1: "Most companies have one CEO, so the count follows the number of companies that match your filters. Adding founders, owners and managing directors raises it. Your titles, industries, company size and locations set the final number.",
    p2: COUNT_P2,
  },
  filters: {
    heading: "Company filters you set",
    rows: filterRows("CEO only or also founders, owners and managing directors", "10 to 50 or 50 to 200"),
    calc: CALC_LINE,
  },
  built: {
    heading: "How each CEO list is built",
    steps: builtSteps(["Brief", "You send titles, leaders per company, industries, company size, locations, target accounts and exclusions. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "CEO email list pricing",
    lead: "10,000 CEO contacts cost $199. That is $19.90 per 1,000 contacts, paid once. No seats, no subscription and no credits to use up.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 CEO contacts",
  },
  prebuilt: {
    heading: "Prebuilt CEO database or a list built to your ICP",
    intro: "There are two ways to buy a CEO database. Here is how they differ, so you can pick the one that fits your campaign.",
    rows: PREBUILT_ROWS,
    close: "A prebuilt file can be quicker when your ICP matches the seller's categories exactly. If you sell to a specific slice, such as founders of B2B software companies with 10 to 50 staff, a list built to your brief means fewer wasted sends. Weighing a seat based data tool instead? See [per list vs per seat pricing compared](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses CEO lists",
    rows: [
      ["Agencies running outbound for clients", "One list per client that sells to founder led companies. See [B2B lead lists for agencies](/for/agencies)."],
      ["SaaS teams selling to smaller companies", "Where the CEO still signs off on tools. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Service firms", "Accountants, consultants, developers and agencies whose buyer is the owner."],
      ["Executive recruiters", "Pitch CEOs who hire senior leaders. Or approach leaders themselves as candidates."],
    ],
    tipsHeading: "How to get replies from CEOs",
    tips: [
      "Lead with an outcome they own: revenue, cost, time or risk. Skip the feature list.",
      "Keep it under 80 words with one clear question they can answer in a line.",
      "Write like a peer. No flattery and no fake familiarity.",
      "At larger companies a department head often owns the budget. Add them to the brief, for example with a [VP of Sales email list](/lists/vp-of-sales-email-list).",
      "Expect forwards. A CEO who passes your email to the right person has still helped you.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a CEO email list?", "A CEO email list is a file of company leaders, such as CEOs, founders and managing directors, with verified business emails, titles and company details. Sales teams and agencies use it to reach the person who runs each company they want to sell to. Clean Rows builds each list fresh to the buyer's ICP."],
    ["How do I find a CEO's email address?", "For one company, check the website, press releases and the CEO's LinkedIn profile, then guess the address from the company's email pattern and verify it before you send. For hundreds or thousands of CEOs, a list built to your ICP saves days of research. Clean Rows delivers 10,000 verified contacts in 24 hours."],
    ["Can I get a free list of CEO email addresses?", "Free sources such as company websites, LinkedIn and the free tiers of email finders work for a few names but take time at scale. Clean Rows offers a free sample built to your own brief within 24 hours, with no card, no call and no signup."],
    ["How can I contact the CEO of a company?", "Email works when you have a verified business address and a short, specific reason to write. LinkedIn and the company's main phone line are second routes. If you have a customer complaint, use the company's support channels first; our lists are for B2B outreach."],
    ["What format do CEO email addresses use?", "Most business addresses follow the company's pattern, such as first name at domain or first name dot last name at domain. Small companies often use the first name only. Always verify a guessed address before you send to protect your sender reputation."],
    ["Is it legal to buy a CEO email list?", "Buying business contact data from public B2B sources is legal in most places; the rules cover how you email people. US rules require honest sender details and subject lines, a postal address and a working opt out. In the UK and EU, GDPR also applies and B2B outreach usually relies on legitimate interest with a clear opt out. This is general information, not legal advice."],
    ["How much does a CEO email list cost?", "At Clean Rows, 10,000 CEO contacts cost $199, one time, which is $19.90 per 1,000. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["How many CEOs will my list have?", "That depends on your ICP, so we confirm the exact count before you pay. Most companies have one CEO, so the count follows the number of matching companies plus any founders you add. If your market holds fewer leaders than your package, we tell you before payment."],
    ["Can I get more than one leader per company?", "Yes. Choose the most senior leader only or every founder still in the business. The rule is set in your brief, not assumed."],
    ["Can former or fractional CEOs be left out?", "Yes. Former, fractional, interim and advisory titles are left out unless you ask for them. The human review checks that the rule held before delivery."],
    ["Can I get a CEO email list as a PDF?", "We deliver a CSV or Google Sheet, not a PDF. Both import straight into a CRM or outreach tool, which a PDF cannot do."],
    ["How fresh is the data?", "Each list is researched for your order after you send the brief, not exported from a stored database. Every email is checked with two verification tools before the file is delivered."],
    ["Does every contact include a mobile number?", "No. We find mobile numbers for roughly 50 to 60 percent of rows and mark clearly which rows have one. The company HQ phone field gives you a second route."],
    ["What if the list misses my brief?", "We rebuild it free or refund you. The brief you agree before payment is the standard we check against, so titles, industries, company size and locations must match it."],
    ["How fast will I get my list?", "10,000 contacts arrive within 24 hours and 50,000 within 48 hours. A 1,000 contact list takes about 3 hours and 100,000 or more takes 5 to 7 business days. Files come as a CSV or Google Sheet."],
  ],
  closing: {
    heading: "Get a CEO sample built to your brief",
    body: "Tell us the titles, industries, company size and locations you want. We send a free sample within 24 hours, then confirm the count and price for your full list. No card, no call and no signup.",
    crossLink: "Need a role that is not here? We build it as a [custom lead list to your brief](/services/custom-lists).",
  },
  serviceSchema: serviceSchema(
    "CEO email list",
    "CEO and founder email lists built fresh to the buyer's ICP from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/ceo-email-list`,
    "Growth: 10,000 CEO contacts"
  ),
  related: [
    ["/lists/vp-of-sales-email-list", "Selling to sales leaders", "VP of Sales and CRO title map."],
    ["/lists/cfo-email-list", "Finance decisions", "CFO and finance title map."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 04 HR Director
// ---------------------------------------------------------------------------
rolePages.push({
  key: "hr-director",
  slug: "hr-director-email-list",
  meta: {
    title: "HR Director Email List: 10,000 Contacts for $199",
    description:
      "Buy an HR Director email list built fresh to your ICP: 10,000 verified contacts for $199, one time. Exact titles, two email checks, CSV in 24 hours.",
    label: "HR Director email list",
    serviceName: "HR Director email list",
    audience: "B2B teams selling to HR and people leaders",
  },
  hero: {
    title: "HR Director email list",
    accent: "built fresh to your ICP",
    intro:
      "An HR Director email list is a file of HR leaders, such as HR Directors, Heads of People and CHROs, with verified business emails, phone numbers and company details, ready to load into your outreach tool. Clean Rows builds yours fresh to your ICP and delivers it as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 HR Director contacts for $199. One time. No seats.",
  },
  sample: { heading: "Sample rows from an HR Director email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every HR contact list",
    intro: fieldsIntro,
    titleExample: "Director of People and Culture",
    titleNote: "Every row, checked against your title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which HR leadership titles an HR Director list can cover",
    intro:
      "HR leaders go by many titles: HR Director, Head of People, VP People or Chief People Officer. Company size changes who owns the decision, so you choose the titles and we agree the title map with you before research starts.",
    rows: [
      ["CHRO, Chief People Officer", "The most senior HR executive at larger companies", "You sell something the whole people function signs off on"],
      ["VP of HR, VP People", "Runs HR across the company or a large division", "Always, unless you only want a narrower slice"],
      ["HR Director, Director of People", "Owns HR policy, people programs and the HR team", "Always"],
      ["Head of HR, Head of People", "The top HR role at many smaller and fast growing companies", "You sell to companies under a few hundred staff"],
      ["Head of Talent Acquisition, TA Director", "Owns hiring and recruiter teams", "You sell recruitment services or hiring tools"],
      ["HR Manager, HR Business Partner", "Runs HR day to day, often reports to the HR Director", "Smaller companies or when you sell to frontline HR teams"],
    ],
    closing:
      "Tell us which rows you want. We leave out the titles you do not want, such as HR Coordinators, HR Assistants, recruiters and payroll clerks. A Head of People list for startups and a CHRO list for large companies can be the same order with two title rules.",
  },
  count: {
    heading: "How many HR Director contacts can you get?",
    p1: "We do not sell a fixed file, so there is no standard size. Most companies with a dedicated HR team have one senior HR leader, so the count follows the number of matching companies plus any Talent Acquisition or HR Manager titles you add.",
    p2: COUNT_P2,
  },
  filters: {
    heading: "Company filters you set",
    rows: filterRows("Director and above only or also HR Managers and HR Business Partners", "50 to 200 or 200 to 1,000"),
    calc: CALC_LINE,
  },
  built: {
    heading: "How each HR Director list is built",
    steps: builtSteps(["Brief", "You send roles, seniority, industries, company size, locations, target accounts and exclusions. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "HR Director email list pricing",
    lead: "10,000 HR Director contacts cost $199. That is $19.90 per 1,000 contacts, paid once. No seats, no subscription and no credits to use up.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 HR Director contacts",
  },
  prebuilt: {
    heading: "Prebuilt HR email list or a list built to your ICP",
    intro: "There are two ways to buy an HR Director email list. Here is how they differ, so you can pick the one that fits your campaign.",
    rows: PREBUILT_ROWS,
    close: "A prebuilt file can be quicker when your ICP matches the seller's categories exactly. If you sell to a specific slice, such as HR leaders at manufacturers with 200 to 1,000 staff, a list built to your brief means fewer wasted sends. Weighing a seat based data tool instead? See [per list vs per seat pricing compared](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses HR Director email lists",
    rows: [
      ["Recruitment agencies", "Win new clients by pitching the HR and talent leaders who sign off on agency spend. See [HR contact lists for recruiters](/for/recruitment)."],
      ["HR tech SaaS teams", "Reach the leaders who buy HRIS, payroll, benefits, learning and engagement software. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Benefits, training and wellbeing providers", "Reach the HR leader who owns the budget for your program."],
      ["Agencies running outbound for clients", "One list per client whose buyer is the HR team."],
    ],
    tipsHeading: "How to get replies from HR Directors",
    tips: [
      "Lead with a people outcome they own: time to hire, retention, compliance or employee experience.",
      "Use a public signal, such as open roles on their careers page, to show why you are writing now.",
      "Keep the first email under 100 words with one clear question.",
      "Name the problem or role family you solve. Generic partnership pitches are easy to ignore.",
      "For HR software, add Talent Acquisition or HR Operations to your brief. They often run the evaluation.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is an HR Director email list?", "An HR Director email list is a file of HR leaders, such as HR Directors, Heads of People and CHROs, with verified business emails, titles and company details. Recruiters, HR tech companies and agencies use it to reach the people who own hiring and people budgets. Clean Rows builds each list fresh to the buyer's ICP."],
    ["Where can I buy an HR Director email list?", "You can buy one from list sellers, data platforms or a list building service like Clean Rows. With Clean Rows you send your ICP and we confirm the exact count and price. Then you get 10,000 contacts for $199 within 24 hours."],
    ["How much does an HR Director email list cost?", "At Clean Rows, 10,000 HR Director contacts cost $199, one time, which is $19.90 per 1,000. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Is it legal to buy an HR Director email list?", "Buying business contact data from public B2B sources is legal in most places; the rules cover how you email people. US rules require honest sender details and subject lines, a postal address and a working opt out. In the UK and EU, GDPR also applies and B2B outreach usually relies on legitimate interest with a clear opt out. This is general information, not legal advice."],
    ["How many HR Directors will my list have?", "That depends on your ICP, so we confirm the exact count before you pay. We build every list fresh rather than selling one fixed file. If your market holds fewer matching leaders than your package, we tell you before payment."],
    ["How fresh is the data?", "Each list is researched for your order after you send the brief, not exported from a stored database. Every email is checked with two verification tools before the file is delivered."],
    ["How do you verify the emails?", "Every email is checked with two separate verification tools, then a person reviews the whole list before delivery. Duplicates are removed before the file reaches you."],
    ["Does every contact include a mobile number?", "No. We find mobile numbers for roughly 50 to 60 percent of rows and mark clearly which rows have one. The company HQ phone field gives you a second route."],
    ["What if the list misses my brief?", "We rebuild it free or refund you. The brief you agree before payment is the standard we check against, so titles, industries, company size and locations must match it."],
    ["Should I contact the HR Director or Talent Acquisition?", "Contact Talent Acquisition when you sell recruiting services or hiring tools, since they own the hiring process. Contact the HR Director for HR software, benefits, training or policy work. You can include both in one brief."],
    ["Who reports to the HR Director?", "Usually HR Managers and HR Business Partners, plus teams for Talent Acquisition, Learning and Development, Payroll and Benefits. At larger companies the HR Director reports to a CHRO or Chief People Officer. That makes the HR Director the right first contact for anything that changes how the whole HR team works."],
    ["How do I find an HR Director's email address?", "For one company, check the website, the careers page and the person's LinkedIn profile, then guess the address from the company's email pattern and verify it before you send. For hundreds or thousands of HR leaders, a list built to your ICP saves days of research. Clean Rows delivers 10,000 verified contacts in 24 hours."],
    ["Where can I find an HR email list?", "You can buy an HR email list from a list seller or a data platform. You can also have one built to your ICP by a list building service like Clean Rows. We confirm the exact count and price for your brief before you pay. 10,000 HR contacts cost $199."],
    ["How do I contact HR through email?", "Write to a named HR leader with a short subject line that says why you are writing and one clear ask. If you are a job seeker or an employee, use the company's careers page or internal HR channels instead; our lists are for B2B outreach to HR teams as buyers."],
    ["Can I get a list of companies with HR contact details?", "Yes. Every row pairs the company name, domain and HQ phone with a named HR leader's verified business email and LinkedIn profile. Mobile numbers are added where found and marked per row."],
    ["How fast will I get my list?", "10,000 contacts arrive within 24 hours and 50,000 within 48 hours. A 1,000 contact list takes about 3 hours and 100,000 or more takes 5 to 7 business days. Files come as a CSV or Google Sheet."],
    ["Can I get a free sample first?", "Yes. Send your brief and we deliver a free sample built to it within 24 hours. No card, no call and no signup."],
    ["Do you include tech stack data?", "No. We leave out tech stack data because its accuracy is not good enough to sell. Every row has the standard contact and company fields listed above."],
  ],
  closing: {
    heading: "Get an HR Director sample built to your brief",
    body: "Tell us the titles, industries, company size and locations you want. We send a free sample within 24 hours, then confirm the count and price for your full list. No card, no call and no signup.",
    crossLink: "Selling to sales or company leaders too? See our [VP of Sales email list](/lists/vp-of-sales-email-list). Need another role? We build it as a [custom lead list to your brief](/services/custom-lists).",
  },
  serviceSchema: serviceSchema(
    "HR Director email list",
    "HR Director email lists built fresh to the buyer's ICP from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/hr-director-email-list`,
    "Growth: 10,000 HR Director contacts"
  ),
  related: [
    ["/lists/vp-of-sales-email-list", "Selling to sales leaders", "VP of Sales and CRO title map."],
    ["/lists/marketing-director-email-list", "Selling to marketing leaders", "CMO, VP and Head of Marketing titles."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 05 Marketing Director
// ---------------------------------------------------------------------------
rolePages.push({
  key: "marketing-director",
  slug: "marketing-director-email-list",
  meta: {
    title: "Marketing Director Email List: 10,000 Contacts for $199",
    description:
      "Buy a Marketing Director email list built to your ICP: CMOs, VPs and Heads of Marketing. 10,000 verified contacts for $199, one time, CSV in 24 hours.",
    label: "Marketing Director email list",
    serviceName: "Marketing Director email list",
    audience: "B2B teams selling to marketing leaders",
  },
  hero: {
    title: "Marketing Director email list",
    accent: "built fresh to your ICP",
    intro:
      "A Marketing Director email list is a file of marketing leaders, such as CMOs, VPs of Marketing and Marketing Directors, with verified business emails, phone numbers and company details, ready to load into your outreach tool. Clean Rows builds yours fresh to your ICP and delivers it as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 Marketing Director contacts for $199. One time. No seats.",
  },
  sample: { heading: "Sample rows from a Marketing Director email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every marketing director contact list",
    intro: fieldsIntro,
    titleExample: "VP, Demand Generation",
    titleNote: "Every row, checked against your title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which marketing titles a Marketing Director list can cover",
    intro:
      "Marketing leaders use more titles than most functions: CMO, VP Marketing, Head of Growth or Director of Demand Generation. Company size changes who owns the budget, so you choose the titles and we agree the title map with you before research starts.",
    rows: [
      ["CMO, Chief Marketing Officer", "The most senior marketing executive; owns brand, demand and the marketing budget", "You sell agency retainers, brand work or anything the whole marketing team uses"],
      ["VP of Marketing", "Runs marketing across the company or a large division", "Always, unless you only want a narrower slice"],
      ["Marketing Director, Director of Marketing", "Owns campaigns, channels and the marketing team", "Always"],
      ["Head of Marketing", "The top marketing role at many smaller and fast growing companies", "You sell to companies under a few hundred staff"],
      ["Head of Growth, Director of Demand Generation", "Owns pipeline targets and paid, email or outbound programs", "You sell tools or services measured on pipeline"],
      ["Marketing Manager", "Runs channels day to day, often reports to the Marketing Director", "Smaller companies or when you sell channel tools"],
    ],
    closing:
      "Tell us which rows you want. We leave out the titles you do not want, such as Marketing Coordinators, Marketing Assistants and specialists. A Head of Marketing list for startups and a CMO list for large companies can be the same order with two title rules.",
  },
  count: {
    heading: "How many Marketing Director contacts can you get?",
    p1: "We do not sell a fixed file, so there is no standard size. Most companies with a marketing team have one senior marketing leader, so the count follows the number of matching companies plus any Growth, Demand Generation or Marketing Manager titles you add.",
    p2: COUNT_P2,
  },
  filters: {
    heading: "Company filters you set",
    rows: filterRows("Director and above only or also Heads of Growth and Marketing Managers", "50 to 200 or 200 to 1,000"),
    calc: CALC_LINE,
  },
  built: {
    heading: "How each Marketing Director list is built",
    steps: builtSteps(["Brief", "You send roles, seniority, industries, company size, locations, target accounts and exclusions. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "Marketing Director email list pricing",
    lead: "10,000 Marketing Director contacts cost $199. That is $19.90 per 1,000 contacts, paid once. No seats, no subscription and no credits to use up.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 Marketing Director contacts",
  },
  prebuilt: {
    heading: "Prebuilt marketing email list or a list built to your ICP",
    intro: "There are two ways to buy a Marketing Director email list. Here is how they differ, so you can pick the one that fits your campaign.",
    rows: PREBUILT_ROWS,
    close: "A prebuilt file can be quicker when your ICP matches the seller's categories exactly. If you sell to a specific slice, such as marketing leaders at B2B software companies with 50 to 500 staff, a list built to your brief means fewer wasted sends. Weighing a seat based data tool instead? See [per list vs per seat pricing compared](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses Marketing Director email lists",
    rows: [
      ["Marketing and creative agencies", "Pitch the marketing leader who signs off on agency spend. See [B2B lead lists for agencies](/for/agencies)."],
      ["Martech SaaS teams", "Reach the leaders who buy marketing automation, analytics, ABM, content and SEO tools. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Media, events and sponsorship sellers", "Reach the leader who owns the events and paid media budget."],
      ["Recruiters placing marketing talent", "Pitch marketing leaders who are hiring. Or approach them as candidates."],
    ],
    tipsHeading: "How to get replies from Marketing Directors",
    tips: [
      "Lead with pipeline or revenue impact, not activity metrics such as clicks or impressions.",
      "Reference something public: a recent campaign, a product launch or open marketing roles.",
      "Keep the first email under 100 words with one clear question.",
      "Show the result for a similar type of company and say how you measured it.",
      "For martech, add Marketing Operations to your brief. They often run the evaluation and the setup.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a Marketing Director email list?", "A Marketing Director email list is a file of marketing leaders, such as CMOs, VPs of Marketing and Marketing Directors, with verified business emails, titles and company details. Agencies, martech companies and media sellers use it to reach the people who own marketing budgets. Clean Rows builds each list fresh to the buyer's ICP."],
    ["Where can I buy a Marketing Director email list?", "You can buy one from list sellers, data platforms or a list building service like Clean Rows. With Clean Rows you send your ICP and we confirm the exact count and price. Then you get 10,000 contacts for $199 within 24 hours."],
    ["How much does a Marketing Director email list cost?", "At Clean Rows, 10,000 Marketing Director contacts cost $199, one time, which is $19.90 per 1,000. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Is it legal to buy a Marketing Director email list?", "Buying business contact data from public B2B sources is legal in most places; the rules cover how you email people. US rules require honest sender details and subject lines, a postal address and a working opt out. In the UK and EU, GDPR also applies and B2B outreach usually relies on legitimate interest with a clear opt out. This is general information, not legal advice."],
    ["How many Marketing Directors will my list have?", "That depends on your ICP, so we confirm the exact count before you pay. We build every list fresh rather than selling one fixed file. If your market holds fewer matching leaders than your package, we tell you before payment."],
    ["How fresh is the data?", "Each list is researched for your order after you send the brief, not exported from a stored database. Every email is checked with two verification tools before the file is delivered."],
    ["How do you verify the emails?", "Every email is checked with two separate verification tools, then a person reviews the whole list before delivery. Duplicates are removed before the file reaches you."],
    ["Does every contact include a mobile number?", "No. We find mobile numbers for roughly 50 to 60 percent of rows and mark clearly which rows have one. The company HQ phone field gives you a second route."],
    ["What if the list misses my brief?", "We rebuild it free or refund you. The brief you agree before payment is the standard we check against, so titles, industries, company size and locations must match it."],
    ["Should I contact the CMO or the Marketing Director?", "Contact the CMO when you sell something strategic, such as a brand project or an agency retainer at a larger company. Contact the Marketing Director or Head of Marketing for campaigns, channels and tools. Add Marketing Operations when you sell martech."],
    ["Who reports to the Marketing Director?", "Usually managers for demand generation, content, brand, product marketing and marketing operations. At larger companies the Marketing Director reports to a VP of Marketing or CMO. That makes the Marketing Director the right first contact for anything that changes how campaigns run."],
    ["How do I find a Marketing Director's email address?", "For one company, check the website, press pages and the person's LinkedIn profile, then guess the address from the company's email pattern and verify it before you send. For hundreds or thousands of marketing leaders, a list built to your ICP saves days of research. Clean Rows delivers 10,000 verified contacts in 24 hours."],
    ["Can I include Marketing Managers?", "Yes. Add Marketing Managers to your title map and we include them alongside directors and above. You can ask for them in a separate file to run a different sequence."],
    ["Is a CMO email list the same as a Marketing Director list?", "Not quite. A CMO list holds only chief marketing officers, who sit mostly at larger companies. A Marketing Director list can include CMOs, VPs, Directors and Heads of Marketing, which covers smaller companies too."],
    ["How fast will I get my list?", "10,000 contacts arrive within 24 hours and 50,000 within 48 hours. A 1,000 contact list takes about 3 hours and 100,000 or more takes 5 to 7 business days. Files come as a CSV or Google Sheet."],
    ["Can I get a free sample first?", "Yes. Send your brief and we deliver a free sample built to it within 24 hours. No card, no call and no signup."],
    ["Do you include tech stack data?", "No. We leave out tech stack data because its accuracy is not good enough to sell. Every row has the standard contact and company fields listed above."],
  ],
  closing: {
    heading: "Get a Marketing Director sample built to your brief",
    body: "Tell us the titles, industries, company size and locations you want. We send a free sample within 24 hours, then confirm the count and price for your full list. No card, no call and no signup.",
    crossLink: "Selling to sales leaders as well? See our [VP of Sales email list](/lists/vp-of-sales-email-list). Need another role? We build it as a [custom lead list to your brief](/services/custom-lists).",
  },
  serviceSchema: serviceSchema(
    "Marketing Director email list",
    "Marketing Director email lists built fresh to the buyer's ICP from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/marketing-director-email-list`,
    "Growth: 10,000 Marketing Director contacts"
  ),
  related: [
    ["/lists/vp-of-sales-email-list", "Selling to sales leaders", "VP of Sales and CRO title map."],
    ["/lists/cto-email-list", "Selling to tech leaders", "CTO, CIO and VP of Engineering titles."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 06 CFO
// ---------------------------------------------------------------------------
rolePages.push({
  key: "cfo",
  slug: "cfo-email-list",
  meta: {
    title: "CFO Email List: 10,000 Contacts for $199",
    description:
      "Buy a CFO email list built fresh to your ICP: CFOs, VPs of Finance and Finance Directors. 10,000 verified contacts for $199, one time, CSV in 24 hours.",
    label: "CFO email list",
    serviceName: "CFO email list",
    audience: "B2B teams selling to finance leaders",
  },
  hero: {
    title: "CFO email list",
    accent: "built fresh to your ICP",
    intro:
      "A CFO email list is a file of finance leaders, such as CFOs, VPs of Finance and Finance Directors, with verified business emails, phone numbers and company details, ready to load into your outreach tool. Clean Rows builds yours fresh to your ICP and delivers it as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 CFO contacts for $199. One time. No seats.",
  },
  sample: { heading: "Sample rows from a CFO email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every CFO contact list",
    intro: fieldsIntro,
    titleExample: "Chief Financial Officer and Treasurer",
    titleNote: "Every row, checked against your title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which finance leadership titles a CFO list can cover",
    intro:
      "The top finance job changes title with company size: CFO at larger companies, Finance Director or Head of Finance at smaller ones. So you choose the titles and we agree the title map with you before research starts.",
    rows: [
      ["CFO, Chief Financial Officer", "The most senior finance executive; owns budgets, reporting and funding", "Always"],
      ["VP of Finance", "Runs finance across the company or a large division, often reports to the CFO", "You sell to larger companies where the VP runs the evaluation"],
      ["Finance Director, Director of Finance", "The top finance role at many mid sized companies", "Always, unless you only want chief officers"],
      ["Head of Finance", "The top finance role at many smaller and fast growing companies", "You sell to companies under a few hundred staff"],
      ["Financial Controller, Controller", "Owns accounting, the monthly close and controls", "You sell accounting, close or audit tools"],
      ["Head of FP&A, Treasurer", "Owns planning and cash", "You sell planning, forecasting or treasury tools"],
    ],
    closing:
      "Tell us which rows you want. We leave out the titles you do not want, such as accountants, analysts, bookkeepers and payables clerks. A Head of Finance list for startups and a CFO list for large companies can be the same order with two title rules.",
  },
  count: {
    heading: "How many CFO contacts can you get?",
    p1: "We do not sell a fixed file, so there is no standard size. Most companies have one top finance leader, so the count follows the number of matching companies plus any VP of Finance, Controller or FP&A titles you add.",
    p2: COUNT_P2,
  },
  filters: {
    heading: "Company filters you set",
    rows: filterRows("CFO only or also VPs of Finance, Finance Directors and Controllers", "50 to 200 or 200 to 1,000"),
    calc: CALC_LINE,
  },
  built: {
    heading: "How each CFO list is built",
    steps: builtSteps(["Brief", "You send roles, seniority, industries, company size, locations, target accounts and exclusions. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "CFO email list pricing",
    lead: "10,000 CFO contacts cost $199. That is $19.90 per 1,000 contacts, paid once. No seats, no subscription and no credits to use up.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 CFO contacts",
  },
  prebuilt: {
    heading: "Prebuilt CFO database or a list built to your ICP",
    intro: "There are two ways to buy a CFO database. Here is how they differ, so you can pick the one that fits your campaign.",
    rows: PREBUILT_ROWS,
    close: "A prebuilt file can be quicker when your ICP matches the seller's categories exactly. If you sell to a specific slice, such as finance leaders at logistics companies with 200 to 1,000 staff, a list built to your brief means fewer wasted sends. Weighing a seat based data tool instead? See [per list vs per seat pricing compared](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses CFO email lists",
    rows: [
      ["Finance software teams", "Reach the leaders who buy spend management, payables automation, planning and billing tools. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Agencies running outbound for clients", "One list per client whose buyer is the finance team. See [B2B lead lists for agencies](/for/agencies)."],
      ["Accounting, audit and advisory firms", "Reach the finance leader who appoints outside advisers."],
      ["Lenders and fintechs selling business credit", "Reach the person who owns funding and cash decisions."],
    ],
    tipsHeading: "How to get replies from CFOs",
    tips: [
      "Lead with a number: cost saved, cash freed or days cut from the monthly close.",
      "Be precise and show how you measured it. Finance leaders discount vague claims.",
      "Keep the first email under 100 words with one clear question.",
      "Expect the Controller or FP&A lead to run the evaluation. Add them to your brief.",
      "Avoid the busiest weeks of month end and quarter end when you can.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a CFO email list?", "A CFO email list is a file of finance leaders, such as CFOs, VPs of Finance and Finance Directors, with verified business emails, titles and company details. Finance software companies, advisers and agencies use it to reach the people who own budgets and spending decisions. Clean Rows builds each list fresh to the buyer's ICP."],
    ["Where can I buy a CFO email list?", "You can buy one from list sellers, data platforms or a list building service like Clean Rows. With Clean Rows you send your ICP and we confirm the exact count and price. Then you get 10,000 contacts for $199 within 24 hours."],
    ["How much does a CFO email list cost?", "At Clean Rows, 10,000 CFO contacts cost $199, one time, which is $19.90 per 1,000. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Is it legal to buy a CFO email list?", "Buying business contact data from public B2B sources is legal in most places; the rules cover how you email people. US rules require honest sender details and subject lines, a postal address and a working opt out. In the UK and EU, GDPR also applies and B2B outreach usually relies on legitimate interest with a clear opt out. This is general information, not legal advice."],
    ["How many CFOs will my list have?", "That depends on your ICP, so we confirm the exact count before you pay. We build every list fresh rather than selling one fixed file. If your market holds fewer matching leaders than your package, we tell you before payment."],
    ["How fresh is the data?", "Each list is researched for your order after you send the brief, not exported from a stored database. Every email is checked with two verification tools before the file is delivered."],
    ["How do you verify the emails?", "Every email is checked with two separate verification tools, then a person reviews the whole list before delivery. Duplicates are removed before the file reaches you."],
    ["Does every contact include a mobile number?", "No. We find mobile numbers for roughly 50 to 60 percent of rows and mark clearly which rows have one. The company HQ phone field gives you a second route."],
    ["What if the list misses my brief?", "We rebuild it free or refund you. The brief you agree before payment is the standard we check against, so titles, industries, company size and locations must match it."],
    ["Should I contact the CFO or the Controller?", "Contact the CFO when you sell something that changes cost, cash or risk across the company. Contact the Controller for accounting, close and audit tools, since they run that work day to day. You can include both in one brief."],
    ["Who reports to the CFO?", "Usually the Controller, the head of FP&A, the Treasurer and the heads of tax and accounting. At smaller companies a Finance Director or Head of Finance may cover several of these jobs. The CFO reports to the CEO and often works closely with the board."],
    ["How do I find a CFO's email address?", "For one company, check the website, investor or press pages and the CFO's LinkedIn profile, then guess the address from the company's email pattern and verify it before you send. For hundreds or thousands of finance leaders, a list built to your ICP saves days of research. Clean Rows delivers 10,000 verified contacts in 24 hours."],
    ["What is the difference between a CFO and a Finance Director?", "A CFO is the chief finance executive and usually sits on the leadership team of a larger company. A Finance Director often runs finance at a mid sized company or reports to the CFO at a larger one. Include both titles to cover every company size."],
    ["How fast will I get my list?", "10,000 contacts arrive within 24 hours and 50,000 within 48 hours. A 1,000 contact list takes about 3 hours and 100,000 or more takes 5 to 7 business days. Files come as a CSV or Google Sheet."],
    ["Can I get a free sample first?", "Yes. Send your brief and we deliver a free sample built to it within 24 hours. No card, no call and no signup."],
    ["Do you include tech stack data?", "No. We leave out tech stack data because its accuracy is not good enough to sell. Every row has the standard contact and company fields listed above."],
  ],
  closing: {
    heading: "Get a CFO sample built to your brief",
    body: "Tell us the titles, industries, company size and locations you want. We send a free sample within 24 hours, then confirm the count and price for your full list. No card, no call and no signup.",
    crossLink: "Selling to the person who runs the company too? See our [CEO and founder email lists](/lists/ceo-email-list). Need another role? We build it as a [custom lead list to your brief](/services/custom-lists).",
  },
  serviceSchema: serviceSchema(
    "CFO email list",
    "CFO email lists built fresh to the buyer's ICP from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/cfo-email-list`,
    "Growth: 10,000 CFO contacts"
  ),
  related: [
    ["/lists/ceo-email-list", "The top of the company", "CEO and founder title rules."],
    ["/lists/cto-email-list", "Selling to tech leaders", "CTO, CIO and VP of Engineering titles."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 07 CTO
// ---------------------------------------------------------------------------
rolePages.push({
  key: "cto",
  slug: "cto-email-list",
  meta: {
    title: "CTO Email List: 10,000 Contacts for $199",
    description:
      "Buy a CTO email list built fresh to your ICP: CTOs, VPs of Engineering and IT Directors. 10,000 verified contacts for $199, one time, CSV in 24 hours.",
    label: "CTO email list",
    serviceName: "CTO email list",
    audience: "B2B teams selling to technology leaders",
  },
  hero: {
    title: "CTO email list",
    accent: "built fresh to your ICP",
    intro:
      "A CTO email list is a file of technology leaders, such as CTOs, VPs of Engineering and IT Directors, with verified business emails, phone numbers and company details, ready to load into your outreach tool. Clean Rows builds yours fresh to your ICP and delivers it as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 CTO contacts for $199. One time. No seats.",
  },
  sample: { heading: "Sample rows from a CTO email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every CTO contact list",
    intro: fieldsIntro,
    titleExample: "Cofounder and CTO",
    titleNote: "Every row, checked against your title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which technology leadership titles a CTO list can cover",
    intro:
      "Technology leadership splits two ways. Software companies have a CTO and VPs of Engineering who build the product; other companies have a CIO or IT Director who runs internal systems. You choose the titles and we agree the title map with you before research starts.",
    rows: [
      ["CTO, Chief Technology Officer", "Owns technology and engineering, often a cofounder at startups", "Always"],
      ["VP of Engineering", "Runs the engineering team and delivery, often reports to the CTO", "You sell developer tools or engineering services"],
      ["Head of Engineering, Engineering Director", "The top engineering role at many smaller companies", "You sell to companies under a few hundred staff"],
      ["CIO, Chief Information Officer", "Owns internal IT and systems, common outside software companies", "You sell infrastructure, IT services or business systems"],
      ["IT Director, Head of IT", "Runs IT operations and vendors", "You sell to mid sized companies outside tech"],
      ["CISO, Head of Security", "Owns security and risk", "You sell security products or audits"],
    ],
    closing:
      "Tell us which rows you want. We leave out the titles you do not want, such as developers, engineers, IT support staff and team leads. A Head of Engineering list for startups and a CIO list for large companies can be the same order with two title rules.",
  },
  count: {
    heading: "How many CTO contacts can you get?",
    p1: "We do not sell a fixed file, so there is no standard size. Software companies usually have a CTO while many other companies have a CIO or IT Director instead, so your title choices change the count more than for most roles.",
    p2: COUNT_P2,
  },
  filters: {
    heading: "Company filters you set",
    rows: filterRows("CTO only or also VPs of Engineering, CIOs and IT Directors", "50 to 200 or 200 to 1,000"),
    calc: CALC_LINE,
  },
  built: {
    heading: "How each CTO list is built",
    steps: builtSteps(["Brief", "You send roles, seniority, industries, company size, locations, target accounts and exclusions. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "CTO email list pricing",
    lead: "10,000 CTO contacts cost $199. That is $19.90 per 1,000 contacts, paid once. No seats, no subscription and no credits to use up.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 CTO contacts",
  },
  prebuilt: {
    heading: "Prebuilt CTO database or a list built to your ICP",
    intro: "There are two ways to buy a CTO database. Here is how they differ, so you can pick the one that fits your campaign.",
    rows: PREBUILT_ROWS,
    close: "A prebuilt file can be quicker when your ICP matches the seller's categories exactly. If you sell to a specific slice, such as technology leaders at fintech companies with 50 to 500 staff, a list built to your brief means fewer wasted sends. Weighing a seat based data tool instead? See [per list vs per seat pricing compared](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses CTO email lists",
    rows: [
      ["Developer tool, cloud and security SaaS teams", "Reach the leaders who buy and approve technical tools. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Software development and IT services firms", "Pitch the CTO or IT Director who decides what to build in house and what to outsource."],
      ["Agencies running outbound for clients", "One list per client whose buyer is the technology team. See [B2B lead lists for agencies](/for/agencies)."],
      ["Tech recruiters", "Pitch technology leaders who are hiring engineers. Or approach them as candidates."],
    ],
    tipsHeading: "How to get replies from CTOs",
    tips: [
      "Lead with an engineering outcome: time saved, incidents avoided or infrastructure cost cut.",
      "Be technical and specific. Skip marketing language.",
      "Keep the first email under 100 words with one clear question.",
      "At larger companies VPs of Engineering and engineering managers run evaluations. Add them to your brief.",
      "Do not guess their stack in your first line. Use what they publish, such as an engineering blog or job posts.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a CTO email list?", "A CTO email list is a file of technology leaders, such as CTOs, VPs of Engineering and IT Directors, with verified business emails, titles and company details. Developer tool companies, IT services firms and agencies use it to reach the people who approve technical spend. Clean Rows builds each list fresh to the buyer's ICP."],
    ["Where can I buy a CTO email list?", "You can buy one from list sellers, data platforms or a list building service like Clean Rows. With Clean Rows you send your ICP and we confirm the exact count and price. Then you get 10,000 contacts for $199 within 24 hours."],
    ["How much does a CTO email list cost?", "At Clean Rows, 10,000 CTO contacts cost $199, one time, which is $19.90 per 1,000. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Is it legal to buy a CTO email list?", "Buying business contact data from public B2B sources is legal in most places; the rules cover how you email people. US rules require honest sender details and subject lines, a postal address and a working opt out. In the UK and EU, GDPR also applies and B2B outreach usually relies on legitimate interest with a clear opt out. This is general information, not legal advice."],
    ["How many CTOs will my list have?", "That depends on your ICP, so we confirm the exact count before you pay. We build every list fresh rather than selling one fixed file. If your market holds fewer matching leaders than your package, we tell you before payment."],
    ["How fresh is the data?", "Each list is researched for your order after you send the brief, not exported from a stored database. Every email is checked with two verification tools before the file is delivered."],
    ["How do you verify the emails?", "Every email is checked with two separate verification tools, then a person reviews the whole list before delivery. Duplicates are removed before the file reaches you."],
    ["Does every contact include a mobile number?", "No. We find mobile numbers for roughly 50 to 60 percent of rows and mark clearly which rows have one. The company HQ phone field gives you a second route."],
    ["What if the list misses my brief?", "We rebuild it free or refund you. The brief you agree before payment is the standard we check against, so titles, industries, company size and locations must match it."],
    ["Should I contact the CTO or the CIO?", "Contact the CTO at software companies, where the CTO owns the product and engineering team. Contact the CIO or IT Director at other companies, where they own internal systems and IT vendors. You can include both and let the company type decide."],
    ["Who reports to the CTO?", "Usually the VP of Engineering, engineering managers, architects and the heads of DevOps, data and security. At startups the CTO may still write code and lead a small team directly. The CTO reports to the CEO."],
    ["How do I find a CTO's email address?", "For one company, check the website, the engineering blog and the CTO's LinkedIn or GitHub profile, then guess the address from the company's email pattern and verify it before you send. For hundreds or thousands of technology leaders, a list built to your ICP saves days of research. Clean Rows delivers 10,000 verified contacts in 24 hours."],
    ["Can I get CTOs at startups only?", "Yes. Set company size bands in your brief, for example 10 to 50 staff. Then choose whether cofounders who hold the CTO title count. We confirm the exact count before you pay."],
    ["How fast will I get my list?", "10,000 contacts arrive within 24 hours and 50,000 within 48 hours. A 1,000 contact list takes about 3 hours and 100,000 or more takes 5 to 7 business days. Files come as a CSV or Google Sheet."],
    ["Can I get a free sample first?", "Yes. Send your brief and we deliver a free sample built to it within 24 hours. No card, no call and no signup."],
    ["Can I filter CTOs by the technology their company uses?", "No. We leave out tech stack data because its accuracy is not good enough to sell. Filter by industry, company size, location and title instead, then read each company's engineering blog or job posts before you write."],
  ],
  closing: {
    heading: "Get a CTO sample built to your brief",
    body: "Tell us the titles, industries, company size and locations you want. We send a free sample within 24 hours, then confirm the count and price for your full list. No card, no call and no signup.",
    crossLink: "Selling to the person who runs the company too? See our [CEO and founder email lists](/lists/ceo-email-list). Need another role? We build it as a [custom lead list to your brief](/services/custom-lists).",
  },
  serviceSchema: serviceSchema(
    "CTO email list",
    "CTO email lists built fresh to the buyer's ICP from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/cto-email-list`,
    "Growth: 10,000 CTO contacts"
  ),
  related: [
    ["/lists/ceo-email-list", "The top of the company", "CEO and founder title rules."],
    ["/lists/cfo-email-list", "Finance decisions", "CFO and finance title map."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

export const roleKeys = rolePages.map((r) => r.key);
