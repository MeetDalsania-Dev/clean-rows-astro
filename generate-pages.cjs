const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'about', title: 'About Clean Rows | Our Mission', type: 'utility' },
  { path: 'pricing', title: 'B2B Data Pricing | Pay As You Go', type: 'utility' },
  { path: 'free-sample', title: 'Get 100 Free B2B Leads', type: 'utility' },
  { path: 'whats-in-the-file', title: 'B2B Lead Data Fields Explained', type: 'utility' },
  { path: 'data-sources', title: 'Where Does B2B Data Come From? | Compliance', type: 'utility' },
  { path: 'services/custom-lists', title: 'Targeted B2B Email Lists & ICP Building', type: 'service' },
  { path: 'for/saas', title: 'B2B Leads for SaaS Companies', type: 'segment' },
  { path: 'for/recruitment', title: 'B2B Leads for Recruitment Agencies', type: 'segment' },
  { path: 'lists/fintech', title: 'Fintech Email List & Contact Data', type: 'list' },
  { path: 'lists/vp-sales', title: 'VP of Sales Email List', type: 'list' },
  { path: 'compare/apollo', title: 'Clean Rows vs Apollo.io', type: 'compare', competitor: 'Apollo.io' },
  { path: 'compare/zoominfo', title: 'Clean Rows vs ZoomInfo', type: 'compare', competitor: 'ZoomInfo' }
];

const ensureDir = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

pages.forEach(p => {
  const fullPath = `src/pages/${p.path}.astro`;
  ensureDir(fullPath);
  
  const depth = p.path.split('/').length;
  const rel = depth === 1 ? '../' : '../../';

  let imports = `import BaseLayout from '${rel}layouts/BaseLayout.astro';
import Contact from '${rel}components/Contact.astro';
import FAQ from '${rel}components/FAQ.astro';
import How from '${rel}components/How.astro';
import Pricing from '${rel}components/Pricing.astro';
import Results from '${rel}components/Results.astro';
import Compliance from '${rel}components/Compliance.astro';
import WhoNotFor from '${rel}components/WhoNotFor.astro';
import Founder from '${rel}components/Founder.astro';
import SampleTable from '${rel}components/SampleTable.astro';`;

  let components = '';

  if (p.type === 'compare') {
    imports += `\nimport CompareTable from '${rel}components/CompareTable.astro';`;
    components = `
<section class="hero" style="padding: 10rem 0 5rem;"><div class="section-heading"><h1>${p.title}</h1></div></section>
<CompareTable competitorName="${p.competitor}" />
<SampleTable />
<Compliance />
<FAQ />
<Contact />`;
  } else if (p.type === 'segment' || p.type === 'list' || p.type === 'service') {
    components = `
<section class="hero" style="padding: 10rem 0 5rem;"><div class="section-heading"><h1>${p.title}</h1><p>Fresh, custom-built lists to fuel your outbound.</p></div></section>
<How />
<Results />
<SampleTable />
<Compliance />
<WhoNotFor />
<Founder />
<Pricing />
<FAQ />
<Contact />`;
  } else {
    components = `
<section class="hero" style="padding: 10rem 0 5rem;"><div class="section-heading"><h1>${p.title}</h1></div></section>
<SampleTable />
<Compliance />
<FAQ />
<Contact />`;
  }

  const content = `---
${imports}
---
<BaseLayout title="${p.title}" description="Custom B2B data lists built for your ICP.">
${components}
</BaseLayout>
`;

  fs.writeFileSync(fullPath, content);
});

console.log('Generated 12 pages');
