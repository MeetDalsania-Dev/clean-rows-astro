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
  heroFile: { fileName: string; subline: string; rows: [string, string][]; chips: string[] };
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
  /** Optional section for secondary search terms, shown after the count section. */
  extra?: { kicker: string; heading: string; paragraphs: string[] };
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
  ["Starter", "1,000", "$25", "$25.00", "About 3 hours"],
  ["Growth", "10,000", "$199", "$19.90", "24 hours"],
  ["Scale", "50,000", "$799", "$15.98", "48 hours"],
  ["Enterprise", "100,000+", "Custom quote", "Quoted for your brief", "5 to 7 business days"],
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
  ["Count and price", "We confirm the exact count and price for your ICP before you pay."],
  ["Research", "We research every row fresh from [public B2B sources](/data-sources): LinkedIn, company websites, public directories and public filings."],
  ["Email verification", "Each email passes two verification tools."],
  ["Deduplication", "Duplicate people and rows are removed."],
  ["Human review", "A person checks titles, companies and fit against your brief."],
  ["Delivery", "You get a CSV or Google Sheet, ready for your CRM or sequencing tool."],
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
    title: "VP of Sales Email List: 10,000 for $199 | Clean Rows",
    description:
      "Buy a VP of Sales email list built to your ICP: sales VPs, CROs and chief sales officers. 10,000 verified contacts for $199, one time, CSV in 24 hours.",
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
  heroFile: {
    fileName: "vp_of_sales_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["VS", "VP of Sales, SVP Sales, EVP Sales"],
      ["HS", "Head of Sales"],
      ["CR", "Chief Revenue Officer (CRO)"],
    ],
    chips: ["Verified emails", "LinkedIn profiles"],
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
    ["What is a VP email list?", "A VP email list is a file of vice presidents in one or more functions, such as sales, marketing or finance, with verified business emails and company details. We build it to your brief, so you choose the functions, seniority and company filters. Sales tool vendors usually start with VPs of Sales because they own the number."],
    ["Can you include chief sales officers?", "Yes. Chief sales officers, Chief Revenue Officers and SVPs of Sales can sit in the same file as VPs of Sales. You choose the titles in the brief and we agree the title map before research starts."],
  ],
  closing: {
    heading: "Get a VP of Sales sample built to your brief",
    body: "Tell us the titles, industries, company size and locations you want. We send a free sample within 24 hours, then confirm the count and price for your full list. No card, no call and no signup.",
    crossLink: "Selling to the top of the company instead? See our [CEO and founder email lists](/lists/ceo-email-list). Need another role, such as VP of Operations? We build it as a [custom lead list to your brief](/services/custom-lists).",
  },  extra: {
    "kicker": "VP EMAIL LIST",
    "heading": "VP email list or chief sales officer email list",
    "paragraphs": [
      "A VP email list can cover any function, so start with the one that owns your buyer's budget. For sales tools and services that is the VP of Sales. At larger companies the chief sales officer or Chief Revenue Officer sits above them.",
      "Tell us the titles you want in the brief. A chief sales officer email list for enterprise accounts and a VP of Sales list for mid market software companies can come from the same brief with different title maps. If your buyer sits elsewhere in the company, see the [CEO email list](/lists/ceo-email-list) or the [CFO email list](/lists/cfo-email-list).",
      "Package prices are on the [B2B lead list pricing page](/pricing): 10,000 contacts cost $199, paid once. Or start with a free sample built to your brief."
    ]
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
    title: "CEO Email List: 10,000 Contacts for $199 | Clean Rows",
    description:
      "Buy a CEO email list built to your ICP: CEOs, founders and owners with verified emails. A CEO email database option: 10,000 contacts for $199, one time.",
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
  heroFile: {
    fileName: "ceo_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["CE", "CEO, Chief Executive Officer"],
      ["FO", "Founder, Cofounder"],
      ["MD", "Managing Director"],
    ],
    chips: ["Verified emails", "LinkedIn profiles"],
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
    ["Is a CEO mailing list the same as a CEO email list?", "Mostly yes. Both are files of company leaders with contact details, but a mailing list can also mean postal addresses. Our CEO email list has verified business emails, LinkedIn URLs and company details, with mobiles marked where we find them."],
    ["Can I get chief executive officer emails for one industry only?", "Yes. Industry is part of the brief, along with company size and locations. We confirm the count for that slice before you pay, so you know what the file will hold."],
  ],
  closing: {
    heading: "Get a CEO sample built to your brief",
    body: "Tell us the titles, industries, company size and locations you want. We send a free sample within 24 hours, then confirm the count and price for your full list. No card, no call and no signup.",
    crossLink: "Selling to the person who runs daily operations? See the [general managers email list](/lists/general-managers-email-list). Need a role that is not here? We build it as a [custom lead list to your brief](/services/custom-lists).",
  },  extra: {
    "kicker": "CEO EMAIL DATABASE",
    "heading": "CEO email database, CEO mailing list or a list built to your brief",
    "paragraphs": [
      "A CEO email database is a platform you search and export yourself, usually on a subscription. A CEO mailing list from a list seller is a fixed file that someone else defined. Clean Rows does neither: we research chief executive officer email addresses for your brief and deliver the finished file.",
      "The CEOs, founders and managing directors in your file match your industries, company size and locations. Every address is checked with two verification tools. If the CEO is not your buyer, the [VP of Sales email list](/lists/vp-of-sales-email-list) and the [CFO email list](/lists/cfo-email-list) cover the leaders who often own the budget.",
      "Package prices are on the [B2B lead list pricing page](/pricing): 10,000 contacts cost $199, paid once. Or start with a free sample built to your brief."
    ]
  },

  serviceSchema: serviceSchema(
    "CEO email list",
    "CEO and founder email lists built fresh to the buyer's ICP from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/ceo-email-list`,
    "Growth: 10,000 CEO contacts"
  ),
  related: [
    ["/lists/vp-of-sales-email-list", "Selling to sales leaders", "VP of Sales and CRO title map."],
    ["/lists/business-owners-email-list", "Small business owners", "Owners and founders of small companies."],
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
    title: "HR Directors Email List: 10,000 for $199 | Clean Rows",
    description:
      "Buy an HR directors email list built to your ICP: HR Directors, Heads of People and CHROs. An HR email database alternative: 10,000 contacts for $199.",
    label: "HR Director email list",
    serviceName: "HR Director email list",
    audience: "B2B teams selling to HR and people leaders",
  },
  hero: {
    title: "HR directors email list",
    accent: "built fresh to your ICP",
    intro:
      "An HR directors email list (an HR Director email list) is a file of HR leaders, such as HR Directors, Heads of People and CHROs, with verified business emails, phone numbers and company details, ready to load into your outreach tool. Clean Rows builds yours fresh to your ICP and delivers it as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 HR Director contacts for $199. One time. No seats.",
  },
  heroFile: {
    fileName: "hr_director_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["CH", "CHRO, Chief People Officer"],
      ["VP", "VP of HR, VP People"],
      ["HR", "HR Director, Director of People"],
    ],
    chips: ["Verified emails", "LinkedIn profiles"],
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
    ["Can I get a CHRO email list?", "Yes. Add CHRO, Chief People Officer and VP of HR to the titles in your brief. We can deliver them on their own or alongside HR Directors. We confirm the count before you pay."],
    ["What is in an HR email database from Clean Rows?", "Each row has the name, exact job title, company, domain, verified business email, company HQ phone, LinkedIn URLs, company size, industry and location. Mobiles are found for roughly 50 to 60 percent of rows and marked."],
  ],
  closing: {
    heading: "Get an HR Director sample built to your brief",
    body: "Tell us the titles, industries, company size and locations you want. We send a free sample within 24 hours, then confirm the count and price for your full list. No card, no call and no signup.",
    crossLink: "Selling to sales or company leaders too? See our [VP of Sales email list](/lists/vp-of-sales-email-list). Need another role? We build it as a [custom lead list to your brief](/services/custom-lists).",
  },  extra: {
    "kicker": "CHRO AND HR EXECUTIVES",
    "heading": "CHRO email list and HR executives email list",
    "paragraphs": [
      "At larger companies the Chief Human Resources Officer (CHRO) owns people strategy and the budget for HR software, benefits and training. A CHRO email list reaches that person directly. HR Directors and Heads of People run the work day to day.",
      "Most briefs combine both levels into one human resources email list: CHROs and VPs of HR for enterprise accounts, HR Directors and Heads of People for mid market companies. An HR executives email list is the same file with the senior titles only. You choose the titles and we agree the title map before research starts.",
      "Use the file as your HR email database for outreach and CRM import. Selling to other leaders as well? See the [marketing directors email list](/lists/marketing-director-email-list) and the [CFO email list](/lists/cfo-email-list).",
      "Package prices are on the [B2B lead list pricing page](/pricing): 10,000 contacts cost $199, paid once. Or start with a free sample built to your brief."
    ]
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
    title: "Marketing Directors Email List: 10,000 Leads | Clean Rows",
    description:
      "A marketing directors email list built to your ICP: Marketing Directors, VPs of Marketing and CMOs. A CMO email database alternative at $199 per 10,000.",
    label: "Marketing Director email list",
    serviceName: "Marketing Director email list",
    audience: "B2B teams selling to marketing leaders",
  },
  hero: {
    title: "Marketing directors email list",
    accent: "built fresh to your ICP",
    intro:
      "A marketing directors email list, also called a Marketing Director email list, is a file of marketing leaders, such as CMOs, VPs of Marketing and Marketing Directors, with verified business emails, phone numbers and company details, ready to load into your outreach tool. Clean Rows builds yours fresh to your ICP and delivers it as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 Marketing Director contacts for $199. One time. No seats.",
  },
  heroFile: {
    fileName: "marketing_director_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["CM", "CMO, Chief Marketing Officer"],
      ["VM", "VP of Marketing"],
      ["MK", "Marketing Director, Director of Marketing"],
    ],
    chips: ["Verified emails", "LinkedIn profiles"],
  },
  sample: { heading: "Sample rows from a Marketing Director email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every Marketing Director contact list",
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
    ["Is there a CMO email database I can search myself?", "Not with Clean Rows. We do not sell database access; we research a CMO list to your brief and deliver the finished file. 10,000 contacts cost $199, paid once, with no seats."],
    ["Can one list mix CMOs, Marketing Directors and Marketing Managers?", "Yes. You choose which titles count in the brief and we agree the title map before research starts. Each row shows the exact job title, so you can split the file by level in your outreach tool."],
  ],
  closing: {
    heading: "Get a Marketing Director sample built to your brief",
    body: "Tell us the titles, industries, company size and locations you want. We send a free sample within 24 hours, then confirm the count and price for your full list. No card, no call and no signup.",
    crossLink: "Selling to sales leaders as well? See our [VP of Sales email list](/lists/vp-of-sales-email-list). Need another role? We build it as a [custom lead list to your brief](/services/custom-lists).",
  },  extra: {
    "kicker": "MANAGERS AND CMOS",
    "heading": "Marketing managers email list and CMO email database",
    "paragraphs": [
      "Marketing Directors usually run the team and the campaign budget. CMOs set strategy at larger companies and Marketing Managers own channels such as email, events or paid search. The level you need depends on who signs off on what you sell.",
      "One brief can cover all three: CMOs for enterprise accounts, Marketing Directors for mid market companies and a marketing managers email list for teams that buy channel tools. We do not sell a CMO email database to search; we research the titles you choose and agree the title map before research starts.",
      "Need other leaders too? See the [HR directors email list](/lists/hr-director-email-list) and the [VP of Sales email list](/lists/vp-of-sales-email-list).",
      "Package prices are on the [B2B lead list pricing page](/pricing): 10,000 contacts cost $199, paid once. Or start with a free sample built to your brief."
    ]
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
    title: "CFO Email List: 10,000 Contacts for $199 | Clean Rows",
    description:
      "Buy a CFO email list built to your ICP: CFOs, VPs of Finance and finance directors. A chief financial officer email list at $199 per 10,000, paid once.",
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
  heroFile: {
    fileName: "cfo_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["CF", "CFO, Chief Financial Officer"],
      ["VF", "VP of Finance"],
      ["FD", "Finance Director, Director of Finance"],
    ],
    chips: ["Verified emails", "LinkedIn profiles"],
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
    ["Can I get a hospital CFO email list?", "Yes. Add hospitals or health systems to your brief, along with company size and location. We build the list to those filters. We confirm the count before you pay. The free sample shows rows built to your brief."],
    ["Is a CFO email database different from a CFO email list?", "A database is a platform you search yourself, usually on a subscription with seats. Our chief financial officer email list is a finished file built to your brief and paid once: 10,000 contacts for $199."],
  ],
  closing: {
    heading: "Get a CFO sample built to your brief",
    body: "Tell us the titles, industries, company size and locations you want. We send a free sample within 24 hours, then confirm the count and price for your full list. No card, no call and no signup.",
    crossLink: "Selling to the person who runs the company too? See our [CEO and founder email lists](/lists/ceo-email-list). Need another role? We build it as a [custom lead list to your brief](/services/custom-lists).",
  },  extra: {
    "kicker": "HOSPITAL AND HEALTHCARE CFOS",
    "heading": "Hospital CFO email list and healthcare finance leaders",
    "paragraphs": [
      "A hospital CFO email list follows the same brief as any other CFO list, with healthcare filters on top. You can ask for hospitals, health systems, clinics and other healthcare providers by company size and location.",
      "Finance titles in healthcare vary. Alongside the CFO, a brief often includes the VP of Finance, the Controller and the director who runs revenue cycle. Tell us which titles count and we agree the title map before research starts.",
      "The same file works as a CFO email database for your CRM: verified business emails, company HQ phones and LinkedIn URLs, with mobiles marked where we find them. Selling to other leaders too? See the [CEO email list](/lists/ceo-email-list) and the [HR directors email list](/lists/hr-director-email-list).",
      "Package prices are on the [B2B lead list pricing page](/pricing): 10,000 contacts cost $199, paid once. Or start with a free sample built to your brief."
    ]
  },

  serviceSchema: serviceSchema(
    "CFO email list",
    "CFO email lists built fresh to the buyer's ICP from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/cfo-email-list`,
    "Growth: 10,000 CFO contacts"
  ),
  related: [
    ["/lists/ceo-email-list", "The top of the company", "CEO and founder title rules."],
    ["/lists/accountants-email-list", "Accounting firms", "CPAs, partners and firm owners."],
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
    title: "CTO Email List: 10,000 Contacts for $199 | Clean Rows",
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
  heroFile: {
    fileName: "cto_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["CT", "CTO, Chief Technology Officer"],
      ["VE", "VP of Engineering"],
      ["HE", "Head of Engineering"],
    ],
    chips: ["Verified emails", "LinkedIn profiles"],
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
    crossLink: "Selling to the engineers on their team? See the [software engineers email list](/lists/software-engineers-email-list). Selling to the person who runs the company too? See our [CEO and founder email lists](/lists/ceo-email-list). Need another role? We build it as a [custom lead list to your brief](/services/custom-lists).",
  },
  serviceSchema: serviceSchema(
    "CTO email list",
    "CTO email lists built fresh to the buyer's ICP from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/cto-email-list`,
    "Growth: 10,000 CTO contacts"
  ),
  related: [
    ["/lists/ceo-email-list", "The top of the company", "CEO and founder title rules."],
    ["/lists/cio-email-list", "IT leaders", "CIO, VP of IT and IT Director titles."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 08 CIO
// ---------------------------------------------------------------------------
rolePages.push({
  key: "cio",
  slug: "cio-email-list",
  meta: {
    title: "CIO Email List: 10,000 IT Leaders for $199 | Clean Rows",
    description:
      "A CIO email list built to your ICP: CIOs, VPs of IT, IT Directors and Heads of IT with verified emails. An IT decision makers email list, $199 per 10,000.",
    label: "CIO email list",
    serviceName: "CIO email list",
    audience: "B2B teams selling infrastructure, security and software to IT buyers",
  },
  hero: {
    title: "CIO email list",
    accent: "for the people who buy IT",
    intro:
      "A CIO email list from Clean Rows gives you the CIOs, VPs of IT, IT Directors and Heads of IT at the companies you target, with exact titles, verified business emails, phone numbers and company details. We research it fresh to your brief and deliver 10,000 contacts as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 CIO and IT leader contacts for $199. One time. No seats.",
  },
  heroFile: {
    fileName: "cio_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["CI", "CIO, Chief Information Officer"],
      ["VI", "VP of IT"],
      ["ID", "IT Director, Head of IT"],
    ],
    chips: ["Verified emails", "LinkedIn profiles"],
  },
  sample: { heading: "Sample rows from a CIO email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every CIO contact list",
    intro: fieldsIntro,
    titleExample: "VP, Information Technology",
    titleNote: "Every row, checked against your IT title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which IT leadership titles a CIO list can cover",
    intro:
      "A CIO buys for the business, not for a product team. CIOs and IT Directors choose the infrastructure, security tools, business software and IT services the whole company runs on. That makes them a different buyer from the CTO, who leads engineering at software companies. You pick the IT titles and we agree the title map before research starts.",
    rows: [
      ["CIO, Chief Information Officer", "Owns IT strategy, budget and vendors for the whole company", "Always"],
      ["VP of IT, VP Information Technology", "Runs IT operations and often signs vendor contracts", "You sell to larger companies where the CIO delegates buying"],
      ["IT Director", "Manages systems, support and suppliers day to day", "You sell to mid sized companies or need a hands on buyer"],
      ["Head of IT, IT Manager at smaller firms", "The most senior IT person at companies without a CIO", "You sell to companies under a few hundred staff"],
      ["Head of Infrastructure, Director of IT Operations", "Owns networks, cloud, data centers and uptime", "You sell infrastructure, cloud or managed services"],
      ["CISO, Director of IT Security", "Owns security tools, risk and audits", "You sell security software or security services"],
    ],
    closing:
      "Tell us which rows you want and whether IT Managers count at smaller firms. We leave out help desk staff, engineers and technicians unless you ask for them. A Head of IT list for growing companies and a CIO list for large enterprises can sit in one order with two title rules.",
  },
  count: {
    heading: "How many CIO contacts can you get?",
    p1: "There is no standard file size because we research each list to your brief. Large companies often have a CIO, while smaller ones give the same job to an IT Director or Head of IT. So the titles you include change your count as much as your industries and company size.",
    p2: COUNT_P2,
  },
  extra: {
    kicker: "IT BUYERS",
    heading: "IT decision makers email list and IT directors email list",
    paragraphs: [
      "An IT decision makers email list covers everyone who can approve or shape an IT purchase: the CIO, the VP of IT and the IT Director, plus security and infrastructure heads where you need them. An IT directors email list is a narrower order that stays with the people who run IT day to day.",
      "Both come from the same brief. Choose the titles, then set industry, company size and location so the file only holds companies that buy what you sell. If your buyer leads engineering at a software company instead, see the [CTO email list](/lists/cto-email-list). If finance signs off the budget, add the [CFO email list](/lists/cfo-email-list).",
      "Prices are on the [B2B lead list pricing page](/pricing): 10,000 contacts cost $199, paid once. Or start with a free sample built to your IT brief.",
    ],
  },
  filters: {
    heading: "IT buyer filters you set",
    rows: [
      ["Industry", "The sectors you sell into, such as healthcare, manufacturing, retail or financial services, plus any to leave out"],
      ["Company size", "Employee bands, for example 200 to 1,000 or 1,000 to 5,000"],
      ["Location", "The locations of the companies or IT leaders you sell to"],
      ["IT seniority", "CIO and VP of IT only or also IT Directors and Heads of IT"],
      ["Function within IT", "General IT leadership, infrastructure, security or business systems"],
      ["Exclusions", "Current customers, open deals or any domains to leave out"],
    ],
    calc: CALC_LINE,
  },
  built: {
    heading: "How each CIO list is built",
    steps: builtSteps(["Brief", "You send the IT titles, industries, company size, locations and exclusions. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "CIO email list pricing",
    lead: "10,000 CIO and IT leader contacts cost $199. That works out at $19.90 per 1,000, paid once, with no seats and no credits to use up.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 CIO contacts",
  },
  prebuilt: {
    heading: "Prebuilt CIO database or a list built to your brief",
    intro: "You can buy IT leader contacts as a prebuilt CIO database or as a list researched for your order. This is how the two compare.",
    rows: PREBUILT_ROWS,
    close: "A prebuilt file can work when its industry and size categories match your market exactly. If you sell something specific, such as backup software to IT Directors at hospitals and clinics, a list built to your brief keeps the wrong companies out. Comparing this with a seat based data platform? See [B2B data subscription or pay per list](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses a CIO email list",
    rows: [
      ["Managed IT and cloud service providers", "Reach the IT leaders who choose outside partners for support, hosting and migration."],
      ["Security software and security services firms", "Pitch CIOs and CISOs who own risk, audits and security budgets."],
      ["Business software vendors", "Reach the IT Directors who approve and roll out systems such as ERP, HR or finance software. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Agencies running IT outbound for clients", "Build one CIO list per client. See [B2B lead lists for agencies](/for/agencies)."],
    ],
    tipsHeading: "How to get replies from CIOs",
    tips: [
      "Talk about the business result. CIOs answer to the board for uptime, risk and cost, so lead with one of those.",
      "Send the technical detail to the IT Director. The CIO sets direction while the IT Director often runs the evaluation.",
      "Name the trigger you saw, such as a new office, a merger or a job post for an infrastructure role.",
      "Keep the first email short and offer one clear next step, such as a short call or a two page summary.",
      "Expect a longer cycle. IT purchases often need security review and finance approval before a contract.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a CIO email list?", "A CIO email list is a file of Chief Information Officers and other IT leaders with names, exact titles, verified business emails and company details. Vendors of infrastructure, security and business software use it to reach the people who approve IT spend. Clean Rows researches each list fresh to the buyer's brief."],
    ["What is the difference between a CIO list and a CTO list?", "A CIO runs internal IT for the whole company, so they buy infrastructure, security tools and business systems. A CTO usually leads engineering at a software company and buys tools for the product team. If you sell to IT departments, start with the CIO list; if you sell to developers, see the CTO list."],
    ["Can I get an IT decision makers email list instead of only CIOs?", "Yes. Add VPs of IT, IT Directors, Heads of IT and security or infrastructure heads to the same brief. We agree the title map before research, so the file only holds the IT roles you want."],
    ["How much does a CIO email list cost?", "10,000 CIO and IT leader contacts cost $199 at Clean Rows, paid once. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Can you target IT Directors at mid sized companies only?", "Yes. Set employee bands in the brief (for example 200 to 1,000) and choose IT Director as the title. We confirm the exact count for that slice before you pay."],
    ["Do you include CISOs?", "Only if you ask for them. Security leaders can sit in the same file as CIOs and IT Directors. They can also go in a separate order if you run a security campaign."],
    ["How do you verify CIO emails?", "Every business email is checked with two separate verification tools. A person then reviews titles and companies against your brief before the file is delivered."],
    ["Can I see a sample of the CIO list first?", "Yes. Send your IT brief and we deliver a free sample built to it within 24 hours. No card, no call and no signup."],
    ["Is it legal to email CIOs?", "Emailing business contacts from public B2B sources is allowed in most places when you follow the outreach rules. Use honest sender details, include a working opt out and honor every removal request; in the UK and EU, GDPR also applies. This is general information, not legal advice."],
  ],
  closing: {
    heading: "Get a CIO sample built to your brief",
    body: "Send the IT titles, industries, company size and locations you want. We deliver a free sample within 24 hours, then confirm the count and price for the full list. No card, no call and no signup.",
    crossLink: "Selling to engineering leaders as well? See the [CTO email list](/lists/cto-email-list). Need finance sign off too? See the [CFO email list](/lists/cfo-email-list).",
  },
  serviceSchema: serviceSchema(
    "CIO email list",
    "CIO and IT leader email lists built fresh to the buyer's brief from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/cio-email-list`,
    "Growth: 10,000 CIO contacts"
  ),
  related: [
    ["/lists/cto-email-list", "Engineering leaders", "CTO and VP of Engineering titles."],
    ["/lists/cfo-email-list", "Finance sign off", "CFO and finance title map."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 09 Lawyers and law firms
// ---------------------------------------------------------------------------
rolePages.push({
  key: "law-firms",
  slug: "law-firms-email-list",
  meta: {
    title: "Lawyers Email List: 10,000 Attorneys for $199 | Clean Rows",
    description:
      "A lawyers email list built to your brief: partners, attorneys and firm administrators by practice area, firm size and location. 10,000 for $199, paid once.",
    label: "Lawyers email list",
    serviceName: "Lawyers email list",
    audience: "B2B teams selling services and software to law firms",
  },
  hero: {
    title: "Lawyers email list",
    accent: "by practice area and firm size",
    intro:
      "A lawyers email list from Clean Rows gives you the managing partners, partners, attorneys and firm administrators at the law firms you choose, with verified business emails, phone numbers and firm details. We build it to your practice areas and firm sizes and deliver 10,000 contacts as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 lawyer and law firm contacts for $199. One time. No seats.",
  },
  heroFile: {
    fileName: "lawyers_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["MP", "Managing Partner"],
      ["AT", "Partner, Attorney, Associate"],
      ["FA", "Firm Administrator"],
    ],
    chips: ["Verified emails", "Practice areas"],
  },
  sample: { heading: "Sample rows from a lawyers email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every law firm contact list",
    intro: fieldsIntro,
    titleExample: "Managing Partner",
    titleNote: "Every row, checked against your legal title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which law firm roles a lawyers email list can cover",
    intro:
      "Who buys at a law firm depends on what you sell. Partners decide on anything that touches clients or fees, while firm administrators and legal operations staff run software, billing and suppliers. At a small firm the founding attorney often does all of it. You choose the roles and we agree the title map before research starts.",
    rows: [
      ["Managing Partner, Founding Partner", "Runs the firm and signs off spend", "Always, for anything that changes how the firm runs"],
      ["Partner, Equity Partner", "Owns a practice group and its clients", "You sell to a practice area, such as marketing for personal injury firms"],
      ["Attorney, Associate, Of Counsel", "Does the legal work and often refers suppliers", "You sell research tools, expert services or legal training"],
      ["Solo practitioner, Principal Attorney", "Owns a one person or very small firm", "You sell to small firms where the lawyer is the buyer"],
      ["Firm Administrator, Office Manager", "Runs operations, staff and suppliers", "You sell software, IT, office services or payroll"],
      ["Director of Legal Operations, COO", "Owns systems and process at larger firms", "You sell practice management, billing or document software"],
    ],
    closing:
      "Tell us which rows you want and whether paralegals or in house counsel count. We leave them out by default, since in house legal teams belong to companies rather than law firms. A list of personal injury partners and a list of firm administrators at mid sized firms can come from one order with two title rules.",
  },
  count: {
    heading: "How many lawyer contacts can you get?",
    p1: "We do not sell a fixed file of attorneys, so there is no standard size. Practice area changes the count most: a brief for one narrow specialty in a few locations is far smaller than one for every civil litigation firm in a large region.",
    p2: COUNT_P2,
  },
  extra: {
    kicker: "ATTORNEY LISTS",
    heading: "Attorney email list, law firms email list or personal injury lawyers",
    paragraphs: [
      "An attorney email list and a law firms email list are the same order looked at two ways. One starts with the people, the other with the firms. Tell us which matters more and we build around it: every partner at the firms you name or one decision maker per firm across a whole practice area.",
      "A personal injury lawyers email list is the most common practice area brief, because legal marketing, case funding, medical record and expert witness services all sell to these firms. Family, immigration, estate planning, employment and criminal defense firms work the same way. Pick the areas and we check each firm's own website for them.",
      "Many buyers call the same file an attorney mailing list. Every row carries the firm name, domain, HQ phone and location next to the verified email, so you can run email and phone outreach from one file. Package prices sit on the [B2B lead list pricing page](/pricing). The free sample comes first.",
    ],
  },
  filters: {
    heading: "Law firm filters you set",
    rows: [
      ["Practice area", "Personal injury, family, immigration, estate planning, employment, criminal defense, corporate or any area the firm lists"],
      ["Firm size", "Solo and small firms, mid sized firms or large firms, set by employee band"],
      ["Location", "The locations of the firms or offices you sell to"],
      ["Role", "Managing partners only, all partners or also attorneys and firm administrators"],
      ["Target firms", "Your own list of firm names or domains to build from"],
      ["Exclusions", "Current clients, open deals or any firms to leave out"],
    ],
    calc: CALC_LINE,
  },
  built: {
    heading: "How each law firm list is built",
    steps: builtSteps(["Brief", "You send practice areas, firm sizes, locations, the roles you want and any firms to leave out. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "Lawyers email list pricing",
    lead: "10,000 lawyer and law firm contacts cost $199, which is $19.90 per 1,000. You pay once. There are no seats, no subscription and no credits.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 law firm contacts",
  },
  prebuilt: {
    heading: "Prebuilt attorney database or a list built to your brief",
    intro: "Law firm contacts are sold as prebuilt attorney databases and as lists researched for one order. Here is how the two differ.",
    rows: PREBUILT_ROWS,
    close: "A prebuilt database can be enough when you want every firm in a broad category. When your offer only suits one practice area or firm size, such as intake software for personal injury firms with 10 to 50 staff, a list built to your brief keeps every row relevant. Weighing a data platform instead? See [B2B data subscription or pay per list](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses a lawyers email list",
    rows: [
      ["Legal marketing and lead generation agencies", "Reach managing partners at firms in the practice areas you serve. See [B2B lead lists for agencies](/for/agencies)."],
      ["Legal software companies", "Pitch practice management, billing, intake and document tools to firm administrators and legal operations leaders. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Expert witness, court reporting and record retrieval firms", "Reach the litigation partners and attorneys who hire outside experts and services."],
      ["Legal recruiters", "Pitch partners who are hiring associates or approach attorneys as candidates. See [B2B lead lists for recruiters](/for/recruitment)."],
    ],
    tipsHeading: "How to get replies from law firm partners",
    tips: [
      "Write to their practice. A personal injury partner and an estate planning partner have very different problems.",
      "Lead with time or cases. Partners bill by the hour or work on contingency, so show what your offer saves or wins.",
      "Keep it formal and short. Lawyers read carefully, so skip slang and make one clear ask.",
      "Copy the firm administrator for software and services. They often run the evaluation for the partners.",
      "Leave out claims you could not back up. Lawyers notice them at once.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a lawyers email list?", "A lawyers email list is a file of attorneys and law firm decision makers with names, titles, verified business emails and firm details. Legal marketing agencies, legal software companies and litigation service firms use it for outreach. Clean Rows builds each list fresh to the practice areas and firm sizes you choose."],
    ["Can I get a personal injury lawyers email list?", "Yes. Choose personal injury as the practice area and we only include firms whose own website lists that work. You can add firm size, location and roles to narrow it further."],
    ["Is an attorney email list different from a law firms email list?", "Only in focus. An attorney list can include several lawyers at each firm, while a law firms list usually holds one or two decision makers per firm. Tell us which you need and we set the brief that way."],
    ["Do you include in house counsel?", "Not by default, because in house lawyers work at companies rather than law firms. If you sell to legal departments, ask for General Counsel and in house legal titles and we build that as a separate brief."],
    ["How much does a lawyers email list cost?", "10,000 lawyer and law firm contacts cost $199 at Clean Rows, paid once. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Can I use the list as an attorney mailing list?", "Yes, for email campaigns. Every row has a verified business email plus the firm name, domain, HQ phone and location. Postal addresses are not part of the standard fields."],
    ["How do you check the emails?", "Each business email is checked with two separate verification tools. A person then reviews firm names, practice areas and titles against your brief before delivery."],
    ["Can I get a free sample of a law firm list?", "Yes. Send your practice areas, firm size and locations and we deliver a free sample within 24 hours. No card, no call and no signup."],
    ["Is it legal to send cold emails to lawyers?", "Business outreach to lawyers at their work address is allowed in most places when you follow the email rules. Use honest sender details, include a working opt out and remove anyone who asks; in the UK and EU, GDPR also applies. This is general information, not legal advice."],
  ],
  closing: {
    heading: "Get a lawyers email list sample built to your brief",
    body: "Send the practice areas, firm sizes, locations and roles you want. Your free sample arrives within 24 hours. After that we confirm the count and price for the full list, with no card, no call and no signup.",
    crossLink: "Selling to accounting firms too? See the [accountants email list](/lists/accountants-email-list). Selling to the owners of small firms in any field? See the [small business email list](/lists/business-owners-email-list).",
  },
  serviceSchema: serviceSchema(
    "Lawyers email list",
    "Lawyer and law firm email lists built fresh to the buyer's brief by practice area, firm size and location from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/law-firms-email-list`,
    "Growth: 10,000 law firm contacts"
  ),
  related: [
    ["/lists/accountants-email-list", "Accounting firms", "CPAs, partners and firm owners."],
    ["/lists/business-owners-email-list", "Small business owners", "Owners and founders of small companies."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 10 Manufacturing
// ---------------------------------------------------------------------------
rolePages.push({
  key: "manufacturing",
  slug: "manufacturing-email-list",
  meta: {
    title: "Manufacturing Industry Email List to Your ICP | Clean Rows",
    description:
      "A manufacturing industry email list built to your ICP: plant, operations and procurement leaders and owners by sub sector. 10,000 for $199, paid once.",
    label: "Manufacturing industry email list",
    serviceName: "Manufacturing industry email list",
    audience: "B2B teams selling equipment, supplies, software and services to manufacturers",
  },
  hero: {
    title: "Manufacturing industry email list",
    accent: "plant, operations and procurement leaders",
    intro:
      "A manufacturing industry email list from Clean Rows gives you the plant managers, operations directors, procurement and supply chain heads and owners at the manufacturers you target, with verified business emails, phone numbers and company details. We research it to your sub sectors and company sizes and deliver 10,000 contacts as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 manufacturing contacts for $199. One time. No seats.",
  },
  heroFile: {
    fileName: "manufacturing_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["PM", "Plant Manager, Site Director"],
      ["OD", "VP Operations, Operations Director"],
      ["PR", "Head of Procurement"],
    ],
    chips: ["Verified emails", "Sub sectors"],
  },
  sample: { heading: "Sample rows from a manufacturing email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every manufacturing contact list",
    intro: fieldsIntro,
    titleExample: "Plant Manager",
    titleNote: "Every row, checked against your plant and operations title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which manufacturing roles the list can cover",
    intro:
      "Buying at a manufacturer is split by what you sell. The plant manager decides what runs on the floor, procurement decides who supplies it and the owner or operations head signs off anything large. Pick the roles and we agree the title map with you before any research.",
    rows: [
      ["Owner, President, Managing Director", "Runs the company, common at family and privately held manufacturers", "You sell to smaller manufacturers or need final sign off"],
      ["VP Operations, Operations Director, COO", "Owns output, cost and every plant", "You sell anything that changes how production runs"],
      ["Plant Manager, Site Director", "Runs one site, its staff and its equipment", "You sell machinery, maintenance, safety or floor software"],
      ["Head of Procurement, Purchasing Manager", "Chooses suppliers and negotiates contracts", "You sell raw materials, parts, packaging or MRO supplies"],
      ["Supply Chain Director, Logistics Manager", "Owns inbound materials, stock and shipping", "You sell freight, warehousing or planning software"],
      ["Quality Manager, EHS Manager", "Owns quality systems, audits and safety", "You sell testing, certification, training or safety products"],
    ],
    closing:
      "Tell us which rows you want and whether you need one contact per site or several per company. We leave out shift supervisors, line operators and technicians unless you ask for them. A plant manager list for food producers and a procurement list for metal fabricators can come from one order with two title rules.",
  },
  count: {
    heading: "How many manufacturing contacts can you get?",
    p1: "Every manufacturing list is researched to your brief, so there is no fixed file size. Sub sector and company size set the count: a brief for plastics molders with 50 to 200 staff in a few regions is far smaller than one for every food and beverage producer.",
    p2: COUNT_P2,
  },
  extra: {
    kicker: "BY SUB SECTOR",
    heading: "A manufacturing email list split by sub sector",
    paragraphs: [
      "Manufacturing covers very different businesses, so a single manufacturing email list for every factory rarely works. A supplier of food grade packaging needs food and beverage producers, while a CNC tooling company needs machine shops and metal fabricators. We build the list around the sub sectors you name.",
      "Common sub sectors in our briefs are food and beverage, industrial machinery, metal fabrication, plastics and rubber, electronics, automotive parts, chemicals, building products and packaging. Name yours, add company size and location and we check each company's own website before it goes in the file.",
      "If the owner signs off every purchase at the companies you target, add the [CEO email list](/lists/ceo-email-list) titles to the same brief. For finance approval, see the [CFO email list](/lists/cfo-email-list). Every package is listed on the [B2B lead list pricing page](/pricing).",
    ],
  },
  filters: {
    heading: "Manufacturer filters you set",
    rows: [
      ["Sub sector", "Food and beverage, machinery, metal fabrication, plastics, electronics, automotive parts, chemicals or any other"],
      ["Company size", "Employee bands, for example 50 to 200 or 500 to 2,000"],
      ["Location", "The locations of the companies or plants you sell to"],
      ["Function", "Plant and operations, procurement and supply chain, quality and safety or ownership"],
      ["Target accounts", "Your own list of manufacturers or domains to build from"],
      ["Exclusions", "Current customers, distributors, open deals or any domains to leave out"],
    ],
    calc: CALC_LINE,
  },
  built: {
    heading: "How each manufacturing list is built",
    steps: builtSteps(["Brief", "You send sub sectors, company size, locations, the plant or purchasing roles you want and any exclusions. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "Manufacturing industry email list pricing",
    lead: "10,000 manufacturing contacts cost $199. That is $19.90 per 1,000, paid once, with no seats, no subscription and no credits to use up.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 manufacturing contacts",
  },
  prebuilt: {
    heading: "Prebuilt manufacturing database or a list built to your brief",
    intro: "Manufacturer contacts come as prebuilt databases or as lists researched for your order. Here is how they compare.",
    rows: PREBUILT_ROWS,
    close: "A prebuilt file can be quicker if its industry codes match your market. Industry codes often lump distributors and resellers in with real producers, so a list built to your brief checks that each company actually makes things in your sub sector. Comparing with a data platform? See [B2B data subscription or pay per list](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses a manufacturing industry email list",
    rows: [
      ["Industrial equipment and parts suppliers", "Reach plant managers and procurement heads at the producers who use your products."],
      ["Manufacturing software companies", "Pitch ERP, MES, maintenance and quality software to operations leaders. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Logistics and packaging companies", "Reach supply chain directors and purchasing managers who choose carriers and packaging suppliers."],
      ["Industrial recruiters and agencies", "Pitch plant leaders who are hiring or run outbound for industrial clients. See [B2B lead lists for agencies](/for/agencies)."],
    ],
    tipsHeading: "How to get replies from plant and operations leaders",
    tips: [
      "Talk about downtime, scrap, lead times or cost per unit. Those are the numbers plant leaders are judged on.",
      "Name their sub sector. A food producer and a metal fabricator worry about very different audits and machines.",
      "Call where a mobile is found. Plant managers spend much of the day on the floor, away from their inbox.",
      "Send procurement the commercial detail and the plant manager the operational detail. Both often sit on the same decision.",
      "Offer a site visit or a short trial. Manufacturers like to see equipment and services work before they commit.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a manufacturing industry email list?", "A manufacturing industry email list is a file of decision makers at manufacturers, such as plant managers, operations directors, procurement heads and owners, with verified business emails and company details. Equipment suppliers, software vendors and logistics firms use it for outreach. Clean Rows builds each list fresh to the sub sectors and company sizes you choose."],
    ["Can you split a manufacturing email list by sub sector?", "Yes. We recommend it. Name the sub sectors you sell to (such as food and beverage or metal fabrication) and we check each company's website to confirm what it makes. You can also leave out sub sectors you do not serve."],
    ["Do you separate manufacturers from distributors?", "Yes. Industry codes often mix producers with wholesalers and resellers, so a person checks whether each company makes products itself. Tell us if you want distributors included as a separate group."],
    ["Who should I contact at a manufacturer?", "Contact the plant manager for anything used on the production floor and procurement for materials, parts and supplies. Contact the operations director or owner for larger purchases that affect every site. You can include all of them in one brief."],
    ["How much does a manufacturing email list cost?", "10,000 manufacturing contacts cost $199 at Clean Rows, paid once. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Can I get contacts for several plants at one company?", "Yes. Ask for one contact per site and we look for the plant manager at each location the company lists. Coverage depends on what each company publishes, so we confirm the count before you pay."],
    ["How do you verify the emails?", "We run every business email through two separate verification tools. A person then checks titles, companies and sub sectors against your brief before delivery."],
    ["Can I try a manufacturing list before I buy?", "Yes. Send your sub sectors, company size and roles and we deliver a free sample within 24 hours. No card, no call and no signup."],
  ],
  closing: {
    heading: "Get a manufacturing list sample built to your brief",
    body: "Send the sub sectors, company size, locations and roles you want. A free sample reaches you within 24 hours and we confirm the full count and price after you review it. No card, no call and no signup.",
    crossLink: "Selling to the owner or the top of the company? See the [CEO email list](/lists/ceo-email-list). Need finance approval too? See the [CFO email list](/lists/cfo-email-list).",
  },
  serviceSchema: serviceSchema(
    "Manufacturing industry email list",
    "Manufacturing industry email lists built fresh to the buyer's brief by sub sector, company size and location from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/manufacturing-email-list`,
    "Growth: 10,000 manufacturing contacts"
  ),
  related: [
    ["/lists/ceo-email-list", "Owners and CEOs", "CEO, founder and owner title rules."],
    ["/lists/cfo-email-list", "Finance sign off", "CFO and finance title map."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 11 Accountants
// ---------------------------------------------------------------------------
rolePages.push({
  key: "accountants",
  slug: "accountants-email-list",
  meta: {
    title: "Accountants Email List: 10,000 CPAs for $199 | Clean Rows",
    description:
      "An accountants email list built to your brief: CPAs, partners and firm owners by firm size, services and location. A CPA email list at $199 per 10,000.",
    label: "Accountants email list",
    serviceName: "Accountants email list",
    audience: "B2B teams selling software and services to accounting firms and finance teams",
  },
  hero: {
    title: "Accountants email list",
    accent: "CPAs, partners and firm owners",
    intro:
      "An accountants email list from Clean Rows gives you the CPAs, partners and owners of the accounting firms you target, plus finance controllers where you need them, with verified business emails, phone numbers and firm details. We build it to your firm sizes, services and locations and deliver 10,000 contacts as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 accountant and CPA contacts for $199. One time. No seats.",
  },
  heroFile: {
    fileName: "accountants_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["MP", "Managing Partner, Firm Owner"],
      ["CP", "CPA, Partner, Tax Partner"],
      ["FC", "Financial Controller"],
    ],
    chips: ["Verified emails", "Services offered"],
  },
  sample: { heading: "Sample rows from an accountants email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every accountant contact list",
    intro: fieldsIntro,
    titleExample: "Tax Partner, CPA",
    titleNote: "Every row, checked against your accounting title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which accounting roles an accountants email list can cover",
    intro:
      "Accounting buyers sit in two places. At accounting firms the partners and owners choose software, staff and suppliers for the practice. Inside other companies the controller runs the books and often picks the tools. You choose which side you sell to and we agree the title map before research starts.",
    rows: [
      ["Managing Partner, Firm Owner", "Runs the accounting firm and signs off spend", "Always, when you sell to firms"],
      ["Partner, Tax Partner, Audit Partner", "Owns a service line and its clients", "You sell to one service, such as tax software or audit tools"],
      ["CPA, Senior Accountant at small firms", "Does client work and often owns the practice at small firms", "You sell to sole practitioners and small firms"],
      ["Practice Manager, Firm Administrator", "Runs operations, staff and systems", "You sell practice management, IT or office services"],
      ["Financial Controller, Controller", "Runs accounting inside a company, not a firm", "You sell finance software or services to company finance teams"],
      ["Bookkeeping Firm Owner", "Owns a bookkeeping or payroll practice", "You sell tools or services built for bookkeepers"],
    ],
    closing:
      "Tell us which rows you want and whether controllers inside companies count. We leave out junior staff, trainees and assistants unless you ask for them. A list of tax partners at small firms and a list of controllers at mid sized companies can come from one order with two title rules.",
  },
  count: {
    heading: "How many accountant contacts can you get?",
    p1: "Each accountants email list is researched to your brief, so there is no standard size. The services you pick and the firm sizes you allow set the count; a brief for audit firms with 20 to 150 staff is much smaller than one for every tax practice in a wide region.",
    p2: COUNT_P2,
  },
  extra: {
    kicker: "CPA LISTS",
    heading: "CPA email list, accountants mailing list and accountant email database",
    paragraphs: [
      "A CPA email list keeps to licensed accountants and the firms they own. An accountants mailing list is often wider and also covers bookkeepers, enrolled agents and practice managers. Tell us which you want and we set the title map to match, so every row fits the campaign.",
      "Many buyers search for an accountant email database to filter themselves. Instead, we research the file for your order, filtered by the services each firm offers: tax, audit, bookkeeping, payroll, advisory or outsourced CFO work. We check each firm's own website for those services before it goes in the list.",
      "Selling to finance leaders inside companies instead of firms? See the [CFO email list](/lists/cfo-email-list). Full package prices are on the [B2B lead list pricing page](/pricing). You can start with a free sample.",
    ],
  },
  filters: {
    heading: "Accounting firm filters you set",
    rows: [
      ["Services offered", "Tax, audit, bookkeeping, payroll, advisory or outsourced CFO work"],
      ["Firm size", "Sole practitioners, small firms or larger firms, set by employee band"],
      ["Location", "The locations of the firms or offices you sell to"],
      ["Role", "Partners and owners only or also CPAs, practice managers and controllers"],
      ["Firm or company", "Accounting firms, finance teams inside companies or both"],
      ["Exclusions", "Current clients, open deals or any firms to leave out"],
    ],
    calc: CALC_LINE,
  },
  built: {
    heading: "How each accountants list is built",
    steps: builtSteps(["Brief", "You send the services, firm sizes, locations and roles you want, plus any firms to leave out. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "Accountants email list pricing",
    lead: "10,000 accountant and CPA contacts cost $199. You pay $19.90 per 1,000 once, with no seats, no subscription and no credits.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 accountant contacts",
  },
  prebuilt: {
    heading: "Prebuilt accountant database or a list built to your brief",
    intro: "You can buy accountant contacts as a prebuilt database or as a list researched for your order. Here is how the two compare.",
    rows: PREBUILT_ROWS,
    close: "A prebuilt database can be enough if you want every accounting firm in a category. When your product fits one service, such as payroll software for small bookkeeping firms, a list built to your brief keeps tax and audit firms that will never buy out of the file. Comparing with a data platform? See [B2B data subscription or pay per list](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses an accountants email list",
    rows: [
      ["Accounting and tax software companies", "Reach partners and practice managers who choose the firm's software. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Outsourcing and offshore staffing firms", "Pitch firm owners who need extra capacity during tax season."],
      ["Financial service providers", "Reach CPAs who refer clients for lending, insurance or wealth services."],
      ["Agencies and recruiters", "Run outbound for clients that sell to accounting firms or pitch firms that are hiring. See [B2B lead lists for agencies](/for/agencies)."],
    ],
    tipsHeading: "How to get replies from accountants",
    tips: [
      "Time it around their calendar. Firm owners have little time during the busiest weeks of tax season.",
      "Lead with billable hours. Show how your offer saves staff time or lets the firm take on more clients.",
      "Be precise. Accountants trust exact numbers and clear terms more than broad promises.",
      "Name the service you fit. A payroll practice and an audit firm need very different tools.",
      "Copy the practice manager at larger firms. They often run the evaluation for the partners.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is an accountants email list?", "An accountants email list is a file of CPAs, partners and accounting firm owners with names, titles, verified business emails and firm details. Accounting software companies, outsourcing firms and financial service providers use it for outreach. Clean Rows builds each list fresh to the firm sizes, services and locations you choose."],
    ["Is a CPA email list the same as an accountants email list?", "Not quite. A CPA email list keeps to licensed accountants, while an accountants email list can also include bookkeepers, enrolled agents and practice managers. Tell us which titles count and we agree the title map before research."],
    ["Can I filter accounting firms by the services they offer?", "Yes. Choose tax, audit, bookkeeping, payroll, advisory or outsourced CFO work and we check each firm's own website for those services. You can also leave out firms that only offer services you do not support."],
    ["Can you include controllers at companies, not just firms?", "Yes. Financial controllers inside companies can sit in the same file or a separate one. For more senior finance leaders, see the CFO email list."],
    ["How much does an accountants email list cost?", "10,000 accountant and CPA contacts cost $199 at Clean Rows, paid once. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["When should I email accountants?", "Avoid the weeks right before major tax deadlines, when firm owners have the least time. Plan the campaign for the weeks after the busy season, when firms have room to review software and staffing. Your free sample arrives in 24 hours, so you can plan around those dates."],
    ["How do you verify accountant emails?", "Two separate verification tools check every business email. A person then reviews firm names, services and titles against your brief before delivery."],
    ["Can I get a free sample of an accountants list?", "Yes. Send your firm size, services, locations and roles and we deliver a free sample within 24 hours. No card, no call and no signup."],
  ],
  closing: {
    heading: "Get an accountants email list sample built to your brief",
    body: "Send the firm sizes, services, locations and roles you want. We send a free sample within 24 hours, then quote the exact count and price for the full list. No card, no call and no signup.",
    crossLink: "Selling to finance leaders inside companies? See the [CFO email list](/lists/cfo-email-list). Selling to other professional firms? See the [lawyers email list](/lists/law-firms-email-list).",
  },
  serviceSchema: serviceSchema(
    "Accountants email list",
    "Accountant and CPA email lists built fresh to the buyer's brief by firm size, services offered and location from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/accountants-email-list`,
    "Growth: 10,000 accountant contacts"
  ),
  related: [
    ["/lists/cfo-email-list", "Finance leaders", "CFO, VP of Finance and controller titles."],
    ["/lists/law-firms-email-list", "Law firms", "Partners, attorneys and firm administrators."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 12 Small business owners
// ---------------------------------------------------------------------------
rolePages.push({
  key: "business-owners",
  slug: "business-owners-email-list",
  meta: {
    title: "Small Business Email List: 10,000 Owners | Clean Rows",
    description:
      "A small business email list built to your brief: owners, founders and presidents of small firms and local service businesses. 10,000 for $199, paid once.",
    label: "Small business email list",
    serviceName: "Small business email list",
    audience: "B2B teams selling to the owners of small companies",
  },
  hero: {
    title: "Small business email list",
    accent: "the owner of every company, by name",
    intro:
      "A small business email list from Clean Rows gives you the owners, founders, presidents and managing directors of the small companies you target, with their names, verified business emails, phone numbers and company details. We build it to your industries, company sizes and locations and deliver 10,000 contacts as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 small business owner contacts for $199. One time. No seats.",
  },
  heroFile: {
    fileName: "small_business_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["OW", "Owner, Co Owner"],
      ["FO", "Founder, President"],
      ["MD", "Managing Director"],
    ],
    chips: ["Verified emails", "Owner names"],
  },
  sample: { heading: "Sample rows from a small business email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every small business owner list",
    intro: fieldsIntro,
    titleExample: "Owner and President",
    titleNote: "Every row, checked against your owner title rules",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which owner titles a small business email list can cover",
    intro:
      "Small companies rarely have a buying committee. The owner reads the email, decides and pays. But owners call themselves many things, from Owner to President to Managing Director, so we agree the title rules with you before research starts.",
    rows: [
      ["Owner, Co Owner", "The person who owns the business and makes the decisions", "Always"],
      ["Founder, Cofounder", "Started the company and usually still runs it", "You sell to younger or fast growing small companies"],
      ["President", "A common title for the owner of a small company", "You sell to established small firms"],
      ["Managing Director, General Manager", "Runs the business day to day, sometimes for an owner", "You want the person who runs operations"],
      ["Principal, Managing Partner", "The owner title at small professional practices", "You sell to agencies, studios or consulting firms"],
      ["Operations Manager, Office Manager", "Handles suppliers and admin for the owner", "You sell office services and the owner delegates buying"],
    ],
    closing:
      "Tell us which rows you want and whether one contact per company is enough. Most small business briefs ask for the owner only. We leave out staff roles unless you ask, so you reach the person who can say yes.",
  },
  count: {
    heading: "How many small business contacts can you get?",
    p1: "There is no fixed file of small businesses, because we research each list to your brief. Industry and location set most of the count: a brief for dental practices in a few cities is much smaller than one for every home services company in a large region.",
    p2: COUNT_P2,
  },
  extra: {
    kicker: "OWNER CONTACTS",
    heading: "Small business owners email list with the owner's name and email",
    paragraphs: [
      "A small business owners email list is only useful if it reaches the owner, not a general inbox. So every row gives you the company owner name and email, so the owner contact email for each company sits next to the company HQ phone as a second route.",
      "Local service businesses are a common brief: plumbers, electricians, HVAC and roofing companies, landscapers, cleaning companies, dental and medical practices, salons, auto repair shops and restaurants. Name the trades or business types you sell to, then set company size and location for the areas you serve.",
      "For owners and CEOs of larger companies, see the [CEO email list](/lists/ceo-email-list). For small accounting practices, see the [accountants email list](/lists/accountants-email-list). See the [B2B lead list pricing page](/pricing) for every package.",
    ],
  },
  filters: {
    heading: "Small business filters you set",
    rows: [
      ["Business type", "Trades and local services, retail, restaurants, practices, agencies or any type you name"],
      ["Company size", "Employee bands, for example 1 to 10 or 10 to 50"],
      ["Location", "The service areas or locations of the businesses you sell to"],
      ["Owner title", "Owner only or also founders, presidents and managing directors"],
      ["Contacts per company", "One owner per company or several leaders where they exist"],
      ["Exclusions", "Franchise locations, current customers or any domains to leave out"],
    ],
    calc: CALC_LINE,
  },
  built: {
    heading: "How each small business list is built",
    steps: builtSteps(["Brief", "You send the business types, company size, locations and owner titles you want, plus any exclusions. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "Small business email list pricing",
    lead: "10,000 small business owner contacts cost $199, which is $19.90 per 1,000. One payment covers the list. No seats, no subscription and no credits.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 owner contacts",
  },
  prebuilt: {
    heading: "Prebuilt small business database or a list built to your brief",
    intro: "Small business contacts are sold as prebuilt databases and as lists researched for one order. This is how they differ.",
    rows: PREBUILT_ROWS,
    close: "Small businesses open, close and change owners often, so the date the data was gathered matters more here than for most lists. A list built to your brief is researched after you order. A person checks every owner against your brief before delivery. Weighing a data platform instead? See [B2B data subscription or pay per list](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses a small business email list",
    rows: [
      ["Marketing and web agencies", "Reach owners who need websites, local search, ads or reviews. See [B2B lead lists for agencies](/for/agencies)."],
      ["Software for small businesses", "Pitch booking, invoicing, payroll and field service tools to the owner who buys them. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Business services and suppliers", "Reach owners who choose insurance, payment processing, equipment leasing or business funding."],
      ["Franchise development teams", "Reach owners of independent businesses who may want to convert or expand."],
    ],
    tipsHeading: "How to get replies from small business owners",
    tips: [
      "Write like a person, not a company. Owners reply to short, plain emails from someone they could call.",
      "Name their trade and area. A message for HVAC companies should talk about HVAC jobs, not small business in general.",
      "Lead with money or time: more jobs booked, fewer hours on admin or a lower monthly bill.",
      "Call where a mobile is found. Many owners work away from a desk and answer the phone first.",
      "Make the next step small, such as a five minute call or a quick reply with one number.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a small business email list?", "A small business email list is a file of owners and founders of small companies with names, titles, verified business emails and company details. Agencies, software companies and business service providers use it to reach the person who makes every buying decision. Clean Rows researches each list to the business types and locations you choose."],
    ["Does the list give me the company owner name and email?", "Yes. Each row names the owner or the most senior leader we can confirm, with their verified business email. You agree the owner titles in the brief before research starts."],
    ["Can I target local service businesses?", "Yes. Name the trades or business types (such as plumbers, HVAC companies, dental practices or salons) and set the locations you serve. We check each business's own website before it goes in the list."],
    ["How much does a small business email list cost?", "10,000 small business owner contacts cost $199 at Clean Rows, paid once. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Can I get one owner per company only?", "Yes. Most small business briefs ask for exactly that. We find the owner or most senior leader at each company, so you send one email per business. If a company has two owners, tell us whether you want both."],
    ["Can you leave out franchise locations?", "Yes. Ask for independent businesses only and we leave out franchise locations and chain branches. You can also ask for franchise owners as a separate group."],
    ["How do you keep small business data fresh?", "We research each list after you order, so it reflects who runs each business at that point. Every email passes two verification tools and a person reviews the list before delivery."],
    ["Can I get a free sample of a small business list?", "Yes. Send your business types, company size and locations and we deliver a free sample within 24 hours. No card, no call and no signup."],
  ],
  closing: {
    heading: "Get a small business email list sample built to your brief",
    body: "Send the business types, company size, locations and owner titles you want. You get a free sample within 24 hours. Then we confirm how many owners match and what the full list costs. No card, no call and no signup.",
    crossLink: "Selling to the CEOs of larger companies? See the [CEO email list](/lists/ceo-email-list). Selling to the people who run operations? See the [general managers email list](/lists/general-managers-email-list). Selling to online stores? See the [Shopify store owners email list](/lists/shopify-store-owners-email-list).",
  },
  serviceSchema: serviceSchema(
    "Small business email list",
    "Small business owner email lists built fresh to the buyer's brief by business type, company size and location from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/business-owners-email-list`,
    "Growth: 10,000 small business owner contacts"
  ),
  related: [
    ["/lists/ceo-email-list", "CEOs of larger companies", "CEO, founder and owner title rules."],
    ["/lists/accountants-email-list", "Accounting practices", "CPAs, partners and firm owners."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 13 Hotels
// ---------------------------------------------------------------------------
rolePages.push({
  key: "hotels",
  slug: "hotel-email-list",
  meta: {
    title: "Hotel Email List: 10,000 Contacts for $199 | Clean Rows",
    description:
      "A hotel email list built to your brief: general managers, directors of sales, revenue managers and owners at independent or chain hotels. $199 per 10,000.",
    label: "Hotel email list",
    serviceName: "Hotel email list",
    audience: "B2B teams selling products, software and services to hotels",
  },
  hero: {
    title: "Hotel email list",
    accent: "independent and chain properties",
    intro:
      "A hotel email list from Clean Rows gives you the general managers, directors of sales, revenue managers, owners and group executives at the hotels you target, with verified business emails, phone numbers and property details. We build it to your property types, sizes and locations and deliver 10,000 contacts as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 hotel contacts for $199. One time. No seats.",
  },
  heroFile: {
    fileName: "hotel_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["GM", "General Manager, Hotel Manager"],
      ["DS", "Director of Sales and Marketing"],
      ["RM", "Revenue Manager"],
    ],
    chips: ["Verified emails", "Independent or chain"],
  },
  sample: { heading: "Sample rows from a hotel email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every hotel contact list",
    intro: fieldsIntro,
    titleExample: "Director of Sales and Marketing",
    titleNote: "Every row, checked against your hotel title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which hotel roles a hotel email list can cover",
    intro:
      "A hotel buys in two places. The property team runs the building, rooms and guests, while the owner or management group signs off larger spend across several hotels. Which one you need depends on what you sell, so we agree the title map with you before research starts.",
    rows: [
      ["General Manager, Hotel Manager", "Runs the property and its budget", "Always, for anything used at the hotel"],
      ["Director of Sales, Director of Sales and Marketing", "Owns group, corporate and event bookings", "You sell marketing, booking channels or event services"],
      ["Revenue Manager, Director of Revenue", "Sets room rates and channel strategy", "You sell revenue, pricing or distribution software"],
      ["Owner, Owner Operator", "Owns one or more independent hotels", "You sell to independent hotels where the owner decides"],
      ["Hospitality group executive, VP Operations", "Runs several properties for a group or management company", "You sell across a portfolio of hotels"],
      ["Director of Operations, Rooms Division Manager", "Runs housekeeping, front desk and guest services", "You sell supplies, linen, cleaning or guest technology"],
    ],
    closing:
      "Tell us which rows you want and whether you need one contact per hotel or several. We leave out front desk, kitchen and housekeeping staff unless you ask for them. A general manager list for independent hotels and a group executive list for chains can come from one order with two title rules.",
  },
  count: {
    heading: "How many hotel contacts can you get?",
    p1: "We research every hotel list to your brief, so there is no standard size. Property type sets most of the count: a brief for independent boutique hotels in a few regions is much smaller than one for every chain property across a wide area.",
    p2: COUNT_P2,
  },
  extra: {
    kicker: "HOTELS AND HOSPITALITY",
    heading: "An email list of hotels or a hospitality industry email list",
    paragraphs: [
      "An email list of hotels starts with the properties: one or two decision makers at each hotel you target. A hospitality industry email list is wider and can add hospitality groups, management companies, resorts and serviced apartments. Tell us which you need and we set the brief to match.",
      "For a hotels email list split by property, choose independent hotels, chain and franchise properties or both, then set property size and location. Independent hotels usually buy through the owner or general manager, while chain properties often follow decisions made by the brand or the management group.",
      "If you also sell to small hospitality businesses such as guesthouses or restaurants, see the [small business email list](/lists/business-owners-email-list). For hotel marketing leaders at group level, see the [marketing directors email list](/lists/marketing-director-email-list). Prices are on the [B2B lead list pricing page](/pricing).",
    ],
  },
  filters: {
    heading: "Hotel filters you set",
    rows: [
      ["Independent or chain", "Independent hotels, chain and franchise properties or both"],
      ["Property size", "Small, mid sized or large properties, set by employee band"],
      ["Location", "The locations of the hotels or groups you sell to"],
      ["Property type", "City hotels, resorts, boutique hotels, extended stay or serviced apartments"],
      ["Level", "Property team, owner or the management group above several hotels"],
      ["Exclusions", "Current customers, open deals or any brands to leave out"],
    ],
    calc: CALC_LINE,
  },
  built: {
    heading: "How each hotel list is built",
    steps: builtSteps(["Brief", "You send property types, independent or chain, property size, locations and the hotel roles you want. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "Hotel email list pricing",
    lead: "10,000 hotel contacts cost $199. That is $19.90 per 1,000 contacts, paid once. No seats, no subscription and no credits to use up.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 hotel contacts",
  },
  prebuilt: {
    heading: "Prebuilt hotel database or a list built to your brief",
    intro: "Hotel contacts are sold as prebuilt hospitality databases and as lists researched for your order. Here is how they compare.",
    rows: PREBUILT_ROWS,
    close: "Hotel teams change often, so a general manager in a prebuilt database may have moved on. A list built to your brief is researched after you order, so it reflects the team at each property at that point. Comparing with a data platform? See [B2B data subscription or pay per list](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses a hotel email list",
    rows: [
      ["Hotel software companies", "Pitch property management, booking engine, revenue and guest messaging tools to general managers and revenue teams. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Hospitality suppliers", "Reach operations and rooms leaders who buy linen, amenities, furniture, cleaning and food service supplies."],
      ["Travel and event companies", "Reach directors of sales who handle group, corporate and event bookings."],
      ["Hospitality agencies and recruiters", "Run outbound for hotel marketing clients or pitch properties that are hiring. See [B2B lead lists for agencies](/for/agencies)."],
    ],
    tipsHeading: "How to get replies from hotel managers",
    tips: [
      "Talk about occupancy, average rate, guest reviews or labor cost. Those are the numbers hotel managers are judged on.",
      "Time it around their seasons. Managers have more time for new suppliers before the busy months, not during them.",
      "Write to the property type. A resort, a city hotel and an extended stay property have different problems.",
      "For chain properties, ask who decides. Many purchases are made by the brand or the management group, not the hotel.",
      "Offer a short demo or a trial at one property before a group wide deal.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a hotel email list?", "A hotel email list is a file of hotel decision makers, such as general managers, directors of sales, revenue managers and owners, with verified business emails and property details. Hotel software companies, hospitality suppliers and event companies use it for outreach. Clean Rows builds each list fresh to the property types and locations you choose."],
    ["Can I target independent hotels only?", "Yes. Choose independent hotels in your brief and we leave out chain and franchise properties. You can add property size, property type and location to narrow it further."],
    ["Who should I contact at a hotel?", "Contact the general manager for anything used at the property and the director of sales for marketing, booking and event services. Contact the revenue manager for pricing and distribution tools. For chain hotels, add the management group, which often makes the decision."],
    ["Is a hospitality industry email list different from a hotel list?", "Yes. A hotel list covers hotel properties, while a hospitality industry email list can also include hospitality groups, management companies, resorts and serviced apartments. Tell us how wide you want it and we agree the brief before research."],
    ["How much does a hotel email list cost?", "10,000 hotel contacts cost $199 at Clean Rows, paid once. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Can I get several contacts at each hotel?", "Yes. Ask for the general manager, director of sales and revenue manager at each property and we look for all three. Coverage depends on what each hotel publishes, so we confirm the count before you pay."],
    ["How do you verify hotel emails?", "Every business email passes two separate verification tools. A person then checks titles and properties against your brief before delivery."],
    ["Can I get a free sample of a hotel list?", "Yes. Send your property types, sizes, locations and roles and we deliver a free sample within 24 hours. No card, no call and no signup."],
  ],
  closing: {
    heading: "Get a hotel email list sample built to your brief",
    body: "Send the property types, sizes, locations and hotel roles you want. We build a free sample within 24 hours and then confirm the count and price for every property in your brief. No card, no call and no signup.",
    crossLink: "Selling to small hospitality businesses too? See the [small business email list](/lists/business-owners-email-list). Selling to marketing leaders at hotel groups? See the [marketing directors email list](/lists/marketing-director-email-list).",
  },
  serviceSchema: serviceSchema(
    "Hotel email list",
    "Hotel email lists built fresh to the buyer's brief by property type, independent or chain, property size and location from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/hotel-email-list`,
    "Growth: 10,000 hotel contacts"
  ),
  related: [
    ["/lists/business-owners-email-list", "Small business owners", "Owners of small and local businesses."],
    ["/lists/marketing-director-email-list", "Marketing leaders", "CMO, VP and Head of Marketing titles."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 14 Retail
// ---------------------------------------------------------------------------
rolePages.push({
  key: "retail",
  slug: "retail-email-list",
  meta: {
    title: "Retail Industry Email List: 10,000 for $199 | Clean Rows",
    description:
      "A retail industry email list built to your brief: owners, store directors, buyers and ecommerce heads by category and store count. $199 per 10,000.",
    label: "Retail industry email list",
    serviceName: "Retail industry email list",
    audience: "B2B teams selling products, software and services to retailers",
  },
  hero: {
    title: "Retail industry email list",
    accent: "store, buying and ecommerce leaders",
    intro:
      "A retail industry email list from Clean Rows gives you the owners, operations and store directors, merchandising and buying heads and ecommerce leaders at the retailers you target, with verified business emails, phone numbers and company details. We build it to your categories, store counts and locations and deliver 10,000 contacts as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 retail contacts for $199. One time. No seats.",
  },
  heroFile: {
    fileName: "retail_industry_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["OW", "Owner, President"],
      ["SD", "Director of Stores"],
      ["BU", "Head of Buying"],
    ],
    chips: ["Verified emails", "Store count"],
  },
  sample: { heading: "Sample rows from a retail industry email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every retail contact list",
    intro: fieldsIntro,
    titleExample: "Director of Store Operations",
    titleNote: "Every row, checked against your retail title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which retail roles a retail industry email list can cover",
    intro:
      "Retailers buy in three places. Store operations decide what happens on the shop floor, merchandising decides what goes on the shelf and ecommerce runs the website and online orders. At an independent shop the owner covers all three. Pick the retail roles and we agree the title map with you first.",
    rows: [
      ["Owner, President, CEO", "Runs an independent retailer or a small chain", "You sell to single stores and small chains where the owner decides"],
      ["VP Retail Operations, Director of Stores", "Owns every store, its staff and its standards", "You sell store technology, fixtures, staffing or services"],
      ["Regional Manager, District Manager", "Runs a group of stores in one area", "You sell to larger chains and need the person closest to the stores"],
      ["Head of Merchandising, Buying Director, Category Manager", "Chooses which products the stores carry", "You are a brand or wholesaler selling products into stores"],
      ["Head of Ecommerce, Director of Digital", "Runs the online store and online orders", "You sell ecommerce software, marketing or fulfillment"],
      ["Head of Loss Prevention, Head of Store Development", "Owns shrink, security or new store openings", "You sell security, store design or construction services"],
    ],
    closing:
      "Tell us which rows you want and whether store managers count at large chains. We leave out sales associates and cashiers unless you ask for them. A buyer list for specialty food stores and an operations list for apparel chains can come from one order with two title rules.",
  },
  count: {
    heading: "How many retail contacts can you get?",
    p1: "We research every retail list to your brief, so there is no fixed file size. Category and store count set most of the count: independent bookshops in a few regions return far fewer rows than every apparel retailer with five or more stores.",
    p2: COUNT_P2,
  },
  extra: {
    kicker: "RETAIL EMAIL LISTS",
    heading: "Retail email lists by category, channel and store count",
    paragraphs: [
      "Retail email lists work well when they follow how your buyer shops for suppliers. A brand pitching new products needs category buyers, while a point of sale company needs the owner of a single shop or the operations head of a chain. So we split the brief by category, store count and channel before research starts.",
      "Common categories in our retail briefs are apparel and footwear, grocery and specialty food, home and furniture, beauty and personal care, sporting goods, electronics, pet supplies and gift shops. You can ask for store based retailers, online only retailers or both.",
      "Selling to online stores built on Shopify? See the [Shopify store owners email list](/lists/shopify-store-owners-email-list). Selling to small local shops of every kind? See the [small business email list](/lists/business-owners-email-list). Prices for every package sit on the [B2B lead list pricing page](/pricing).",
    ],
  },
  filters: {
    heading: "Retailer filters you set",
    rows: [
      ["Store count", "Single store retailers, small chains or chains with many stores"],
      ["Category", "Apparel, grocery, home, beauty, sporting goods, electronics or any category you name"],
      ["Company size", "Employee bands, for example 10 to 50 or 200 to 1,000"],
      ["Location", "The locations of the retailers or stores you sell to"],
      ["Channel", "Store based, online only or both"],
      ["Exclusions", "Current customers, franchise stores or any domains to leave out"],
    ],
    calc: CALC_LINE,
  },
  built: {
    heading: "How each retail list is built",
    steps: builtSteps(["Brief", "You send categories, store counts, channels, locations and the retail roles you want. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "Retail industry email list pricing",
    lead: "10,000 retail contacts cost $199. That comes to $19.90 per 1,000, paid once, with no seats, no subscription and no credits.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 retail contacts",
  },
  prebuilt: {
    heading: "Prebuilt retail database or a list built to your brief",
    intro: "Retailer contacts are sold as prebuilt databases and as lists researched for one order. Here is how they differ.",
    rows: PREBUILT_ROWS,
    close: "A prebuilt file can be enough when you want every retailer in a broad category. Store counts and channels change often in retail, so a list built to your brief checks each retailer's current website and stores before it goes in the file. Weighing a data platform instead? See [B2B data subscription or pay per list](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses a retail industry email list",
    rows: [
      ["Brands and wholesalers", "Reach the buyers and category managers who decide which products go into stores."],
      ["Retail software companies", "Pitch point of sale, inventory, workforce and ecommerce tools to operations and ecommerce leaders. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Store services and suppliers", "Reach the directors of stores who buy fixtures, security, cleaning, signage and logistics."],
      ["Agencies running retail outbound", "Build one retail list per client. See [B2B lead lists for agencies](/for/agencies)."],
    ],
    tipsHeading: "How to get replies from retail buyers and operators",
    tips: [
      "Talk about sales per square foot, margin, stock levels or staff hours. Those are the numbers retail leaders watch.",
      "Pitch buyers on the product, with price, margin and minimum order in the first email.",
      "Avoid their peak season. Retailers have little time for new suppliers in the weeks before major holidays.",
      "Name their category and channel. A grocery chain and an online beauty store have very different problems.",
      "Offer a trial in one store or one region before a chain wide rollout.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a retail industry email list?", "A retail industry email list is a file of decision makers at retailers, such as owners, directors of stores, buyers and ecommerce heads, with verified business emails and company details. Brands, wholesalers and retail software companies use it for outreach. Clean Rows builds each list fresh to the categories and store counts you choose."],
    ["Can I filter retailers by store count?", "Yes. Choose single store retailers, small chains or larger chains and we check each retailer's store locator or website for the count. Coverage depends on what each retailer publishes, so we confirm the total before you pay."],
    ["Can I reach retail buyers for my products?", "Yes. Ask for merchandising heads, buying directors and category managers in your product category. Larger chains usually have a buyer per category, while smaller retailers leave buying to the owner."],
    ["Do you include online only retailers?", "Yes, if you ask for them. Choose store based retailers, online only retailers or both. For stores built on Shopify, see the Shopify store owners email list."],
    ["How much does a retail industry email list cost?", "10,000 retail contacts cost $199 at Clean Rows, paid once. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Can you leave out franchise stores?", "Yes. Ask for independent and corporate stores only and we leave franchise locations out. Franchise owners can come as a separate group if you want them."],
    ["How do you verify retail contacts?", "We check every business email with two separate verification tools. A person then reviews titles, categories and store counts against your brief before delivery."],
    ["Can I get a free sample of a retail list?", "Yes. Send your categories, store counts, locations and roles and we deliver a free sample within 24 hours. No card, no call and no signup."],
  ],
  closing: {
    heading: "Get a retail industry email list sample built to your brief",
    body: "Send the categories, store counts, channels and roles you want. A free sample arrives within 24 hours, then we confirm the count and price for the full list. No card, no call and no signup.",
    crossLink: "Selling to online stores on Shopify? See the [Shopify store owners email list](/lists/shopify-store-owners-email-list). Selling to local shop owners? See the [small business email list](/lists/business-owners-email-list).",
  },
  serviceSchema: serviceSchema(
    "Retail industry email list",
    "Retail industry email lists built fresh to the buyer's brief by category, store count, channel and location from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/retail-email-list`,
    "Growth: 10,000 retail contacts"
  ),
  related: [
    ["/lists/shopify-store-owners-email-list", "Shopify store owners", "Owners and ecommerce managers of Shopify stores."],
    ["/lists/business-owners-email-list", "Small business owners", "Owners of small and local businesses."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 15 Banking
// ---------------------------------------------------------------------------
rolePages.push({
  key: "banking",
  slug: "banking-email-list",
  meta: {
    title: "Banking Industry Email List: 10,000 for $199 | Clean Rows",
    description:
      "A banking industry email list built to your brief: bank and credit union executives, branch managers and compliance, risk and IT leaders. $199 per 10,000.",
    label: "Banking industry email list",
    serviceName: "Banking industry email list",
    audience: "B2B teams selling software, services and advice to banks and credit unions",
  },
  hero: {
    title: "Banking industry email list",
    accent: "banks and credit unions",
    intro:
      "A banking industry email list from Clean Rows gives you the executives, branch and regional managers and compliance, risk and IT leaders at the banks and credit unions you target, with verified business emails, phone numbers and institution details. We build it to your institution types, sizes and locations and deliver 10,000 contacts as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 banking contacts for $199. One time. No seats.",
  },
  heroFile: {
    fileName: "banking_industry_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["EX", "President, CEO"],
      ["BR", "Branch Manager"],
      ["CO", "Chief Compliance Officer"],
    ],
    chips: ["Verified emails", "Banks and credit unions"],
  },
  sample: { heading: "Sample rows from a banking industry email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every banking contact list",
    intro: fieldsIntro,
    titleExample: "SVP, Chief Risk Officer",
    titleNote: "Every row, checked against your banking title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which bank and credit union roles the list can cover",
    intro:
      "Banks buy carefully and several people usually sign off. Executives approve the budget, compliance and risk check every new supplier and IT decides whether a system can connect to the core. Branch leaders run the customer side. Tell us which roles to include and we agree the title map before any research.",
    rows: [
      ["President, CEO", "Runs the bank or credit union", "You sell strategy, advice or anything the board signs off"],
      ["CFO, Chief Lending Officer, Chief Operating Officer", "Owns finance, lending or operations across the institution", "You sell lending, payments or operations software"],
      ["Branch Manager, Regional Manager", "Runs one branch or a group of branches", "You sell branch services, equipment or customer experience tools"],
      ["Chief Compliance Officer, BSA Officer", "Owns regulatory compliance and anti money laundering checks", "You sell compliance software, audits or training"],
      ["Chief Risk Officer, Head of Risk", "Owns credit, operational and vendor risk", "You sell risk, fraud or vendor management tools"],
      ["CIO, CTO, CISO, IT Director", "Owns core systems, digital banking and security", "You sell software, security or IT services that must connect to the core"],
    ],
    closing:
      "Tell us which rows you want and whether branch staff below manager level count. We leave out tellers and loan officers unless you ask for them. A compliance list for community banks and a branch manager list for credit unions can come from one order with two title rules.",
  },
  count: {
    heading: "How many banking contacts can you get?",
    p1: "There is no fixed banking file, because each list is researched to your brief. Institution type and size set the count: compliance officers at small credit unions return far fewer rows than branch managers at every regional bank in a wide area.",
    p2: COUNT_P2,
  },
  extra: {
    kicker: "BANKING EMAIL LIST",
    heading: "A banking email list or a banking and finance industry email list",
    paragraphs: [
      "A banking email list stays with deposit taking institutions: commercial banks, community banks, savings institutions and credit unions. A banking and finance industry email list is wider and can add lenders, payment companies, wealth managers and insurers. Tell us how wide you want it and we set the brief to match.",
      "Selling to the companies that build financial products rather than the banks that use them? The [fintech companies email list](/lists/fintech) splits fintech by subsector before any contacts are added. For finance leaders at companies outside banking, see the [CFO email list](/lists/cfo-email-list).",
      "The [B2B lead list pricing page](/pricing) has every package: 10,000 contacts cost $199, paid once. Or start with a free sample built to your banking brief.",
    ],
  },
  filters: {
    heading: "Bank and credit union filters you set",
    rows: [
      ["Institution type", "Commercial banks, community banks, savings institutions or credit unions"],
      ["Institution size", "Employee bands or branch count, for example single branch or 10 to 50 branches"],
      ["Location", "The locations of the institutions or branches you sell to"],
      ["Function", "Executive, branch, compliance and risk or IT and security"],
      ["Target institutions", "Your own list of banks or credit unions to build from"],
      ["Exclusions", "Current customers, open deals or any institutions to leave out"],
    ],
    calc: CALC_LINE,
  },
  built: {
    heading: "How each banking list is built",
    steps: builtSteps(["Brief", "You send institution types, sizes, locations and the banking roles you want, plus any institutions to leave out. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "Banking industry email list pricing",
    lead: "10,000 banking contacts cost $199, which is $19.90 per 1,000. You pay once, with no seats, no subscription and no credits.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 banking contacts",
  },
  prebuilt: {
    heading: "Prebuilt banking database or a list built to your brief",
    intro: "Banking contacts come as prebuilt databases or as lists researched for your order. This is how they compare.",
    rows: PREBUILT_ROWS,
    close: "A prebuilt database can work when you want every bank in a broad category. When your product fits one institution type or function, such as fraud tools for credit union risk teams, a list built to your brief keeps the file to buyers who can say yes. Comparing with a data platform? See [B2B data subscription or pay per list](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses a banking industry email list",
    rows: [
      ["Banking software vendors", "Pitch digital banking, lending, payments and core related tools to executives and IT leaders. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Compliance and risk firms", "Reach compliance and risk officers who buy audits, training, monitoring and regulatory software."],
      ["Security and IT service providers", "Reach CIOs and CISOs who own security, infrastructure and vendor reviews."],
      ["Consultants and agencies", "Reach executives who buy strategy, marketing or growth programs. See [B2B lead lists for agencies](/for/agencies)."],
    ],
    tipsHeading: "How to get replies from bank and credit union leaders",
    tips: [
      "Lead with risk and regulation. Bankers ask first whether something is safe and compliant, then whether it works.",
      "Name the institution type. A credit union and a commercial bank have different members, rules and priorities.",
      "Mention institutions like theirs only when you can name them with permission.",
      "Expect vendor review. Offer your security and compliance documents early to shorten the cycle.",
      "Write to compliance and IT as well as the executive. They often hold a veto even when they do not sign.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a banking industry email list?", "A banking industry email list is a file of decision makers at banks and credit unions, such as executives, branch managers and compliance, risk and IT leaders, with verified business emails and institution details. Banking software vendors, compliance firms and consultants use it for outreach. Clean Rows researches each list fresh to the institution types and sizes you choose."],
    ["Do you include credit unions?", "Yes. Choose credit unions, banks or both in your brief. Credit unions often have smaller teams, so the CEO or a senior manager may cover several roles."],
    ["Can I target compliance and risk officers only?", "Yes. Ask for Chief Compliance Officers, BSA Officers and Chief Risk Officers and we leave other roles out. We confirm the count for that slice before you pay."],
    ["Is a banking email list the same as a fintech list?", "No. A banking email list covers banks and credit unions that hold deposits, while a fintech list covers technology companies that build financial products. If you sell to both, the fintech companies email list can sit in the same order."],
    ["How much does a banking industry email list cost?", "10,000 banking contacts cost $199 at Clean Rows, paid once. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Can I get branch managers for every branch?", "Yes. Ask for one contact per branch and we look for the manager at each branch the institution lists. Coverage depends on what each institution publishes, so we confirm the count first."],
    ["How do you verify banking contacts?", "Each business email passes two separate verification tools. A person then checks titles, institutions and locations against your brief before delivery."],
    ["Can I see a free sample of a banking list?", "Yes. Send your institution types, sizes, locations and roles and we deliver a free sample within 24 hours. No card, no call and no signup."],
    ["Is it legal to email bank executives?", "Emailing bank leaders at their work address is allowed in most places when you follow the outreach rules. Identify yourself honestly, give a working opt out and act on every removal request; GDPR also applies in the UK and EU. This is general information, not legal advice."],
  ],
  closing: {
    heading: "Get a banking industry email list sample built to your brief",
    body: "Send the institution types, sizes, locations and roles you want. We deliver a free sample within 24 hours and then confirm the count and price for the full list. No card, no call and no signup.",
    crossLink: "Selling to fintech companies too? See the [fintech companies email list](/lists/fintech). Selling to finance leaders outside banking? See the [CFO email list](/lists/cfo-email-list).",
  },
  serviceSchema: serviceSchema(
    "Banking industry email list",
    "Banking industry email lists built fresh to the buyer's brief by institution type, size and location from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/banking-email-list`,
    "Growth: 10,000 banking contacts"
  ),
  related: [
    ["/lists/fintech", "Fintech companies", "Fintech leaders, split by subsector."],
    ["/lists/cfo-email-list", "Finance leaders", "CFO, VP of Finance and controller titles."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 16 General managers
// ---------------------------------------------------------------------------
rolePages.push({
  key: "general-managers",
  slug: "general-managers-email-list",
  meta: {
    title: "General Managers Email List: 10,000 for $199 | Clean Rows",
    description:
      "A general managers email list built to your brief: general managers, COOs and operations directors who run the business day to day. $199 per 10,000.",
    label: "General managers email list",
    serviceName: "General managers email list",
    audience: "B2B teams selling to the people who run day to day operations",
  },
  hero: {
    title: "General managers email list",
    accent: "the people who run the day to day",
    intro:
      "A general managers email list from Clean Rows gives you the general managers, COOs, operations directors and operations managers at the companies you target, with verified business emails, phone numbers and company details. We research it to your industries, company sizes and sites and deliver 10,000 contacts as a CSV or Google Sheet within 24 hours.",
    proof: "10,000 general manager contacts for $199. One time. No seats.",
  },
  heroFile: {
    fileName: "general_managers_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["GM", "General Manager"],
      ["CO", "COO, VP Operations"],
      ["OD", "Operations Director"],
    ],
    chips: ["Verified emails", "LinkedIn profiles"],
  },
  sample: { heading: "Sample rows from a general managers email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every general manager contact list",
    intro: fieldsIntro,
    titleExample: "General Manager, Western Region",
    titleNote: "Every row, checked against your operations title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which operations titles a general managers email list can cover",
    intro:
      "The general manager is often the person who actually buys. The CEO sets direction, but the GM or operations head chooses the suppliers, tools and services that keep the business running. The title changes with company size and industry, so you choose the titles and we agree the title map before research starts.",
    rows: [
      ["General Manager", "Runs a company, site or business unit with profit responsibility", "Always"],
      ["COO, Chief Operating Officer", "Runs operations across the whole company", "You sell to larger companies where operations has its own executive"],
      ["VP Operations, Operations Director", "Owns processes, teams and suppliers across sites", "You sell anything that changes how the company runs"],
      ["Operations Manager", "Runs daily operations at smaller companies or one site", "You sell to small and mid sized companies or need a hands on buyer"],
      ["Site General Manager, Branch Manager", "Runs one location of a multi site business", "You sell to each location of a chain or group"],
      ["Managing Director", "The top operating role at many private companies", "You sell to private companies where the MD runs the business"],
    ],
    closing:
      "Tell us which rows you want and whether you need one contact per company or one per site. We leave out supervisors and team leads unless you ask for them. A GM list for car dealerships and an operations director list for logistics firms can come from one order with two title rules.",
  },
  count: {
    heading: "How many general manager contacts can you get?",
    p1: "We research every list to your brief, so there is no standard size. Industry decides how common the GM title is: dealerships, hotels and restaurants use it at every site, while many offices use Operations Director instead. The titles you include change the count a lot.",
    p2: COUNT_P2,
  },
  extra: {
    kicker: "OPERATIONS LEADERS",
    heading: "Operations directors email list and operating manager contacts",
    paragraphs: [
      "An operations directors email list is the same brief one level wider: the directors and VPs who own operations across several sites or teams. Many buyers order both, with general managers for each site and operations directors for the company as a whole.",
      "Looking for the company operating manager name and email for a set of accounts? Send your company names or domains and we find the person who runs operations at each one, with their verified business email, title and LinkedIn URL.",
      "If the owner or CEO makes the final call, add titles from the [CEO email list](/lists/ceo-email-list). For owners of small companies, see the [small business email list](/lists/business-owners-email-list). The [B2B lead list pricing page](/pricing) lists every package.",
    ],
  },
  filters: {
    heading: "Operations filters you set",
    rows: [
      ["Industry", "Dealerships, logistics, construction, healthcare, hospitality or any industry you name"],
      ["Company size", "Employee bands, for example 50 to 200 or 500 to 2,000"],
      ["Location", "The locations of the companies or sites you sell to"],
      ["Level", "General managers only or also COOs, VPs and operations managers"],
      ["Contacts per company", "One per company or one per site"],
      ["Target accounts and exclusions", "Your own account list to build from, plus customers or domains to leave out"],
    ],
    calc: CALC_LINE,
  },
  built: {
    heading: "How each general managers list is built",
    steps: builtSteps(["Brief", "You send industries, company size, locations, operations titles and any accounts to include or leave out. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "General managers email list pricing",
    lead: "10,000 general manager contacts cost $199, which works out at $19.90 per 1,000. One payment, no seats, no subscription and no credits.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 general manager contacts",
  },
  prebuilt: {
    heading: "Prebuilt operations database or a list built to your brief",
    intro: "General manager contacts are sold as prebuilt databases and as lists researched for your order. Here is how the two compare.",
    rows: PREBUILT_ROWS,
    close: "General manager is one of the broadest titles in business, so a prebuilt file often mixes site managers, sales GMs and business unit heads. A list built to your brief agrees exactly which kind of GM you want before research starts. Weighing a data platform instead? See [B2B data subscription or pay per list](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses a general managers email list",
    rows: [
      ["Operations software companies", "Pitch scheduling, field service, maintenance and facilities tools to the people who run them. See [lead lists for SaaS sales teams](/for/saas)."],
      ["B2B service providers", "Reach GMs who choose staffing, cleaning, security, waste and logistics suppliers."],
      ["Equipment and supply companies", "Reach operations directors who approve equipment, vehicles and supplies across sites."],
      ["Agencies running outbound for operations focused clients", "Build one list per client. See [B2B lead lists for agencies](/for/agencies)."],
    ],
    tipsHeading: "How to get replies from general managers",
    tips: [
      "Talk about the problem on their desk this week: staff shortages, downtime, cost overruns or slow processes.",
      "Keep it practical. GMs want to know what changes on Monday morning, not a long product story.",
      "Name their site or region when the title shows it.",
      "Call where a mobile is found. Many GMs spend the day on site, away from email.",
      "Copy the operations director when a decision covers several sites.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a general managers email list?", "A general managers email list is a file of general managers, COOs and operations leaders with names, exact titles, verified business emails and company details. Operations software companies and B2B service providers use it to reach the people who run the business day to day. Clean Rows builds each list fresh to the industries and company sizes you choose."],
    ["Should I contact the general manager or the CEO?", "Contact the general manager for anything used in daily operations, such as services, equipment or operations software. Contact the CEO for company wide decisions or when the company is small enough that the CEO runs operations. You can include both in one brief."],
    ["Can I get an operations directors email list too?", "Yes. Add Operations Directors, VPs of Operations and COOs to the same brief and we agree the title map before research. Many buyers order both levels together."],
    ["Can I get the operating manager for each of my target accounts?", "Yes. Send your company names or domains and we find the person who runs operations at each one. We confirm how many accounts we can match before you pay."],
    ["How much does a general managers email list cost?", "10,000 general manager contacts cost $199 at Clean Rows, paid once. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Can I get one general manager per site?", "Yes. Ask for one contact per site and we look for the general manager at each location the company lists. Coverage depends on what each company publishes, so we confirm the count first."],
    ["How do you verify the emails?", "Every business email goes through two separate verification tools. A person then checks titles, companies and sites against your brief before delivery."],
    ["Can I get a free sample first?", "Yes. Send your industries, company size, locations and titles and we deliver a free sample within 24 hours. No card, no call and no signup."],
  ],
  closing: {
    heading: "Get a general managers email list sample built to your brief",
    body: "Send the industries, company size, locations and operations titles you want. Your free sample arrives within 24 hours, then we confirm the count and price for the full list. No card, no call and no signup.",
    crossLink: "Selling to the CEO as well? See the [CEO email list](/lists/ceo-email-list). Selling to owners of small companies? See the [small business email list](/lists/business-owners-email-list).",
  },
  serviceSchema: serviceSchema(
    "General managers email list",
    "General manager and operations leader email lists built fresh to the buyer's brief by industry, company size and location from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/general-managers-email-list`,
    "Growth: 10,000 general manager contacts"
  ),
  related: [
    ["/lists/ceo-email-list", "CEOs and founders", "CEO, founder and owner title rules."],
    ["/lists/business-owners-email-list", "Small business owners", "Owners and founders of small companies."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

// ---------------------------------------------------------------------------
// 17 Software engineers
// ---------------------------------------------------------------------------
rolePages.push({
  key: "software-engineers",
  slug: "software-engineers-email-list",
  meta: {
    title: "Software Engineers Email List: 10,000 for $199 | Clean Rows",
    description:
      "A software engineers email list built to your brief: senior and staff engineers and engineering managers with verified work emails. $199 per 10,000.",
    label: "Software engineers email list",
    serviceName: "Software engineers email list",
    audience: "Technical recruiters and developer tool companies",
  },
  hero: {
    title: "Software engineers email list",
    accent: "for tech recruiters and developer tools",
    intro:
      "A software engineers email list from Clean Rows gives you software engineers, senior and staff engineers and engineering managers at the companies you target, with exact titles, verified work emails, LinkedIn URLs and company details. We build it to your specialties, seniority and locations and deliver 10,000 contacts as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 software engineer contacts for $199. One time. No seats.",
  },
  heroFile: {
    fileName: "software_engineers_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["SE", "Senior Software Engineer"],
      ["ST", "Staff Engineer"],
      ["EM", "Engineering Manager"],
    ],
    chips: ["Verified work emails", "LinkedIn profiles"],
  },
  sample: { heading: "Sample rows from a software engineers email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every software engineer contact list",
    intro: fieldsIntro,
    titleExample: "Senior Backend Engineer",
    titleNote: "Every row, checked against your engineering title map",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which engineering titles a software engineers email list can cover",
    intro:
      "Engineering titles say a lot about the person: their seniority, their specialty and sometimes their main language. Recruiters filling a senior backend role and a developer tool company looking for early users need very different slices. You choose the titles and we agree the title map before research starts.",
    rows: [
      ["Software Engineer, Developer", "Builds and ships product code", "You need a wide base of engineers at your target companies"],
      ["Senior Software Engineer", "Leads features and reviews others' code", "You recruit for senior roles or sell tools engineers pick themselves"],
      ["Staff Engineer, Principal Engineer", "Sets technical direction across teams", "You sell architecture, platform or developer experience tools"],
      ["Engineering Manager", "Runs a team of engineers and hires for it", "You sell team tools or recruit through the hiring manager"],
      ["Backend, Frontend, Full Stack or Mobile Engineer", "Engineers named by specialty in their title", "You need one specialty for a role or a product"],
      ["DevOps, Platform, Data or Machine Learning Engineer", "Engineers who run infrastructure, data or models", "You sell infrastructure, data or machine learning tools"],
    ],
    closing:
      "Tell us which rows you want and how senior the engineers should be. We leave out interns, students and non engineering roles unless you ask. A staff engineer list for platform tools and an engineering manager list for recruiters can come from one order with two title rules.",
  },
  count: {
    heading: "How many software engineer contacts can you get?",
    p1: "We do not sell a fixed file of developers, so there is no standard size. Specialty and seniority change the count most: staff level machine learning engineers at mid sized companies return far fewer rows than all software engineers at those companies.",
    p2: COUNT_P2,
  },
  extra: {
    kicker: "ENGINEERING EMAIL LIST",
    heading: "An engineering email list for recruiters and developer tool companies",
    paragraphs: [
      "Technical recruiters use an engineering email list in two ways. They reach engineering managers who are hiring and they approach engineers at their work address about a new role. The file holds work contacts only: no CVs, no candidate profiles and no personal emails. For lists of employers to win as clients, see [B2B lead lists for recruiters](/for/recruitment).",
      "Developer tool companies use the same list to reach the engineers who will try the product first, then the [CTO email list](/lists/cto-email-list) to reach the person who signs the contract. A staff engineer who likes a tool is often the one who brings it to the CTO.",
      "If your buyer runs internal IT rather than product engineering, see the [CIO email list](/lists/cio-email-list). See every package on the [B2B lead list pricing page](/pricing).",
    ],
  },
  filters: {
    heading: "Engineering filters you set",
    rows: [
      ["Specialty", "Backend, frontend, full stack, mobile, DevOps, data or machine learning"],
      ["Seniority", "Engineers, senior and staff engineers or engineering managers"],
      ["Language in the title", "For example Python, Java or Go, where engineers name it in their job title"],
      ["Company type and size", "Software companies or tech teams inside other industries, by employee band"],
      ["Location", "The locations of the engineers or companies you want"],
      ["Exclusions", "Your clients, current customers or any companies to leave out"],
    ],
    calc: CALC_LINE,
  },
  built: {
    heading: "How each software engineers list is built",
    steps: builtSteps(["Brief", "You send specialties, seniority, company types, locations and any companies to leave out, such as your own clients. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "Software engineers email list pricing",
    lead: "10,000 software engineer contacts cost $199. Each 1,000 contacts works out at $19.90, paid once, with no seats and no subscription.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 engineer contacts",
  },
  prebuilt: {
    heading: "Prebuilt developer database or a list built to your brief",
    intro: "Engineer contacts are sold as prebuilt developer databases and as lists researched for one order. Here is how they differ.",
    rows: PREBUILT_ROWS,
    close: "Engineers change jobs often, so the date a file was gathered matters a lot for this list. A list built to your brief is researched after you order, against the specialty and seniority you set. Comparing with a seat based platform? See [B2B data subscription or pay per list](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses a software engineers email list",
    rows: [
      ["Technical recruiters and agencies", "Reach engineering managers who are hiring and engineers who match an open role. See [B2B lead lists for recruiters](/for/recruitment)."],
      ["Developer tool companies", "Reach the engineers who try tools first, then their managers. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Developer events and training providers", "Invite engineers by specialty to events, courses and certification programs."],
      ["Developer relations teams", "Reach engineers at target accounts before a sales conversation starts."],
    ],
    tipsHeading: "How to get replies from software engineers",
    tips: [
      "Be specific. Name the stack, the problem or the role in the first line.",
      "Skip the hype. Engineers reply to plain facts, a short example and a clear ask.",
      "For roles, share the salary range, team and tech up front. Engineers rarely reply to vague openings.",
      "For tools, offer a free tier, docs or a repo link instead of a sales call.",
      "Send one follow up at most. Engineers notice and dislike long automated sequences.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a software engineers email list?", "A software engineers email list is a file of engineers and engineering managers with names, exact titles, verified work emails, LinkedIn URLs and company details. Technical recruiters and developer tool companies use it for outreach. Clean Rows builds each list fresh to the specialties and seniority you choose."],
    ["Is this a candidate database?", "No. The file holds work contacts for outreach: names, titles, work emails and company details. It has no CVs, candidate profiles or personal emails."],
    ["Do you include personal or GitHub emails?", "No. We only include verified business emails at the engineer's current company. LinkedIn URLs are included, so you can also reach engineers there."],
    ["Can I filter engineers by programming language?", "Only through the job title. If engineers name a language in their title, such as Senior Python Engineer, we can filter on it. We do not sell tech stack data, so there is no language field beyond the title."],
    ["How much does a software engineers email list cost?", "10,000 software engineer contacts cost $199 at Clean Rows, paid once. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Can I leave out my clients' engineers?", "Yes. Send your client and off limits company list and we leave those companies out. Recruiters usually send this list with every brief."],
    ["How do you verify engineer emails?", "Every work email passes two separate verification tools. A person then checks titles, specialties and companies against your brief before delivery."],
    ["Can I get a free sample of an engineering list?", "Yes. Send your specialties, seniority, company types and locations and we deliver a free sample within 24 hours. No card, no call and no signup."],
  ],
  closing: {
    heading: "Get a software engineers email list sample built to your brief",
    body: "Send the specialties, seniority, company types and locations you want. We deliver a free sample in 24 hours and confirm the count and price for the full engineering list afterwards. No card, no call and no signup.",
    crossLink: "Selling to the person who signs for engineering tools? See the [CTO email list](/lists/cto-email-list). Recruiting? See [B2B lead lists for recruiters](/for/recruitment).",
  },
  serviceSchema: serviceSchema(
    "Software engineers email list",
    "Software engineer and engineering manager email lists built fresh to the buyer's brief by specialty, seniority and location from public B2B sources. Work emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/software-engineers-email-list`,
    "Growth: 10,000 software engineer contacts"
  ),
  related: [
    ["/lists/cto-email-list", "Engineering leaders", "CTO, VP and Head of Engineering titles."],
    ["/lists/cio-email-list", "IT leaders", "CIO and IT Director title map."],
    ["/for/recruitment", "Lists for recruiters", "Employer lists to win new clients."],
  ],
});

// ---------------------------------------------------------------------------
// 18 Shopify store owners
// ---------------------------------------------------------------------------
rolePages.push({
  key: "shopify-store-owners",
  slug: "shopify-store-owners-email-list",
  meta: {
    title: "Shopify Store Owners Email List: 10,000 Leads | Clean Rows",
    description:
      "A Shopify store owners email list built to your brief: owners, founders and ecommerce managers by category, store size and location. $199 per 10,000.",
    label: "Shopify store owners email list",
    serviceName: "Shopify store owners email list",
    audience: "B2B teams selling apps, services and supplies to Shopify stores",
  },
  hero: {
    title: "Shopify store owners email list",
    accent: "owners and ecommerce managers",
    intro:
      "A Shopify store owners email list from Clean Rows gives you the owners, founders and ecommerce managers of the Shopify stores you target, with verified business emails, phone numbers, store URLs and company details. We build it to your product categories, store sizes and locations and deliver 10,000 contacts as a CSV or Google Sheet in 24 hours.",
    proof: "10,000 Shopify store contacts for $199. One time. No seats.",
  },
  heroFile: {
    fileName: "shopify_store_owners_email_list.csv",
    subline: "10,000 contacts · 10 field groups",
    rows: [
      ["OW", "Store Owner, Founder"],
      ["EM", "Ecommerce Manager"],
      ["HG", "Head of Growth"],
    ],
    chips: ["Verified emails", "Store URLs"],
  },
  sample: { heading: "Sample rows from a Shopify store owners email list", intro: "Real rows with emails and phone numbers masked. Every list you order has these columns.", columns: SAMPLE_COLUMNS, rows: [] },
  fields: {
    heading: "What is in every Shopify store contact list",
    intro: fieldsIntro + " On this list the domain field is the store URL.",
    titleExample: "Founder and CEO",
    titleNote: "Every row, checked against your store title rules",
    notIncluded: NOT_INCLUDED,
  },
  titleMap: {
    heading: "Which roles a Shopify store owners email list can cover",
    intro:
      "Most Shopify stores are small teams, so the owner or founder decides almost everything. Growing brands add an ecommerce manager or a head of growth who chooses apps, agencies and marketing. You choose the roles and we agree the title rules before research starts.",
    rows: [
      ["Owner, Store Owner", "Owns and runs the store", "Always"],
      ["Founder, Cofounder, CEO", "Started the brand and usually still decides on spend", "You sell to brands rather than one person shops"],
      ["Ecommerce Manager, Head of Ecommerce", "Runs the store, apps, orders and fulfillment", "You sell Shopify apps, fulfillment or store services"],
      ["Head of Growth, Marketing Manager", "Owns ads, email, reviews and conversion", "You sell marketing tools or agency services"],
      ["Operations Manager", "Runs stock, suppliers and shipping", "You sell logistics, packaging or inventory tools"],
      ["Brand Manager at larger stores", "Owns the brand and product launches", "You sell creative, content or product services"],
    ],
    closing:
      "Tell us which rows you want and whether one contact per store is enough. Most Shopify briefs ask for the owner or founder only. We leave out customer service and warehouse staff unless you ask for them.",
  },
  count: {
    heading: "How many Shopify store contacts can you get?",
    p1: "We research every Shopify list to your brief, so there is no fixed file size. Product category and store size set the count: pet supply stores with a small team return far fewer rows than every apparel store on the platform.",
    p2: COUNT_P2,
  },
  extra: {
    kicker: "SHOPIFY STORES LIST",
    heading: "A Shopify stores list with the owner behind each store",
    paragraphs: [
      "A Shopify stores list on its own gives you storefronts. This list adds the person who runs each one: the owner, founder or ecommerce manager, with a verified business email. The store URL sits in the domain field, so you can open each storefront before you write.",
      "Store platform is part of the brief, not a column in the file: every store is checked during research to confirm it runs on Shopify. Clean Rows is not affiliated with Shopify. The file still has no tech stack data beyond that targeting rule.",
      "Selling to retailers with physical stores too? See the [retail industry email list](/lists/retail-email-list). For owners of local businesses of every kind, see the [small business email list](/lists/business-owners-email-list). You will find every package on the [B2B lead list pricing page](/pricing).",
    ],
  },
  filters: {
    heading: "Shopify store filters you set",
    rows: [
      ["Product category", "Apparel, beauty, home, food and drink, pet, fitness, jewelry or any category you name"],
      ["Store size", "Employee bands, for example 1 to 10 or 10 to 50"],
      ["Location", "The locations of the stores or brands you sell to"],
      ["Role", "Owners and founders only or also ecommerce and growth managers"],
      ["Target stores", "Your own list of store URLs to build from"],
      ["Exclusions", "Current customers, open deals or any store URLs to leave out"],
    ],
    calc: CALC_LINE,
  },
  built: {
    heading: "How each Shopify store list is built",
    steps: builtSteps(["Brief", "You send product categories, store sizes, locations and the roles you want, plus any stores to leave out. A short form or an email to sales@cleanrowsdata.com is enough."]),
    delivery: DELIVERY_ROWS,
  },
  packages: {
    heading: "Shopify store owners email list pricing",
    lead: "10,000 Shopify store contacts cost $199. You pay $19.90 per 1,000 once. No seats, no subscription and no credits.",
    rows: PACKAGE_ROWS,
    note: "Every package has the same standard fields. If the list misses the agreed brief, we rebuild it free or refund you. See the [B2B lead list pricing page](/pricing) for full package details.",
    cta: "Order 10,000 Shopify store contacts",
  },
  prebuilt: {
    heading: "Prebuilt store database or a list built to your brief",
    intro: "Shopify store contacts come as prebuilt store databases or as lists researched for your order. This is how they compare.",
    rows: PREBUILT_ROWS,
    close: "Online stores open, close and change platforms often, so a prebuilt store database ages quickly. A list built to your brief is researched only after you order. Every store is checked against your brief before delivery. Weighing a data platform instead? See [B2B data subscription or pay per list](/compare/b2b-data-subscriptions).",
  },
  useCases: {
    heading: "Who uses a Shopify store owners email list",
    rows: [
      ["Shopify app developers", "Reach owners and ecommerce managers who install apps for reviews, upsells, subscriptions or shipping. See [lead lists for SaaS sales teams](/for/saas)."],
      ["Ecommerce agencies", "Pitch design, ads, email marketing and conversion work to store owners. See [B2B lead lists for agencies](/for/agencies)."],
      ["Fulfillment, packaging and logistics companies", "Reach the operations side of growing stores."],
      ["Suppliers and manufacturers", "Offer products, private label or wholesale terms to stores in your category."],
    ],
    tipsHeading: "How to get replies from Shopify store owners",
    tips: [
      "Visit the store first and mention one real detail, such as a product or a page you would improve.",
      "Lead with revenue: more orders, a higher average order value or fewer abandoned carts.",
      "Keep it short and personal. Store owners get many app and agency pitches every week.",
      "Offer something they can try alone, such as a free trial, a short audit or a sample.",
      "Avoid their busiest weeks, such as the run up to major sale days.",
    ],
  },
  sources: { heading: "Data sources and compliance", p1: SOURCES_P1, p2: SOURCES_P2 },
  faqs: [
    ["What is a Shopify store owners email list?", "A Shopify store owners email list is a file of the owners, founders and ecommerce managers of stores built on Shopify, with verified business emails, store URLs and company details. App developers, ecommerce agencies and suppliers use it for outreach. Clean Rows builds each list fresh to the product categories and store sizes you choose."],
    ["How do you know a store runs on Shopify?", "Each store is checked during research before it goes in the list. Platform is a targeting rule in the brief, not a tech stack column in the file."],
    ["Is the store URL included?", "Yes. On this list the domain field is the store URL, so every row links to the storefront. You can open it before you write your first line."],
    ["Can I filter stores by product category?", "Yes. Name the categories you sell to (such as beauty, apparel or pet supplies) and we check each store's products against them. You can also leave out categories you do not serve."],
    ["How much does a Shopify store owners email list cost?", "10,000 Shopify store contacts cost $199 at Clean Rows, paid once. 50,000 contacts cost $799 and 100,000 or more get a custom quote. There are no seats or subscriptions."],
    ["Is Clean Rows connected to Shopify?", "No. Clean Rows is not affiliated with Shopify. We research store owners from public B2B sources such as store websites, LinkedIn and public directories."],
    ["How do you verify store owner emails?", "Each store owner email passes two separate verification tools. A person then checks owners, categories and store URLs against your brief before delivery."],
    ["Can I get a free sample of a Shopify store list?", "Yes. Send your product categories, store sizes, locations and roles and we deliver a free sample within 24 hours. No card, no call and no signup."],
  ],
  closing: {
    heading: "Get a Shopify store owners email list sample built to your brief",
    body: "Send the product categories, store sizes, locations and roles you want. You get a free sample within 24 hours and then a confirmed count and price for the full list. No card, no call and no signup.",
    crossLink: "Selling to retailers with physical stores? See the [retail industry email list](/lists/retail-email-list). Selling to owners of local businesses? See the [small business email list](/lists/business-owners-email-list).",
  },
  serviceSchema: serviceSchema(
    "Shopify store owners email list",
    "Shopify store owner email lists built fresh to the buyer's brief by product category, store size and location from public B2B sources. Emails checked with two verification tools and every list reviewed by a person. Delivered as a CSV or Google Sheet.",
    `${site}/lists/shopify-store-owners-email-list`,
    "Growth: 10,000 Shopify store contacts"
  ),
  related: [
    ["/lists/retail-email-list", "Retailers", "Store, buying and ecommerce leaders."],
    ["/lists/business-owners-email-list", "Small business owners", "Owners of local and small businesses."],
    ["/buy-b2b-leads", "Browse all lists", "Every role and industry list."],
  ],
});

export const roleKeys = rolePages.map((r) => r.key);
