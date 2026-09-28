const fs = require('fs');

const imports = `
import How from '../../components/How.astro';
import Results from '../../components/Results.astro';
import Pricing from '../../components/Pricing.astro';
import FAQ from '../../components/FAQ.astro';
import Contact from '../../components/Contact.astro';
---
`;

const components = `
<How />
<Results />
<Pricing />
<FAQ />
<Contact />
</BaseLayout>
`;

['src/pages/for/agencies.astro', 'src/pages/lists/ceos.astro'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/---\n<BaseLayout/s, imports + '<BaseLayout');
  content = content.replace(/<\/BaseLayout>/, components);
  fs.writeFileSync(file, content);
});
console.log('Injection complete');
