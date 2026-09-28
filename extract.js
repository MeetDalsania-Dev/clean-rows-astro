const fs = require('fs');
const html = fs.readFileSync('src/pages/index.astro', 'utf8');

function extractSection(id) {
  const startTag = `id="${id}"`;
  const startIndex = html.indexOf(startTag);
  if (startIndex === -1) return '';
  const actualStart = html.lastIndexOf('<section', startIndex);
  // find the next section or footer
  let endIndex = html.indexOf('<section', startIndex);
  if (endIndex === -1) endIndex = html.indexOf('</BaseLayout>', startIndex);
  
  return html.substring(actualStart, endIndex);
}

fs.writeFileSync('src/components/Pricing.astro', '---\n---\n' + extractSection('pricing'));
fs.writeFileSync('src/components/FAQ.astro', '---\n---\n' + extractSection('faq'));
// Contact is special because there is an about section between faq and contact, and it ends before BaseLayout
fs.writeFileSync('src/components/Contact.astro', '---\n---\n' + extractSection('contact'));

// Now replace the sections in index.astro with component imports
let newIndex = html;
newIndex = newIndex.replace(extractSection('pricing'), '<Pricing />\n');
newIndex = newIndex.replace(extractSection('faq'), '<FAQ />\n');
newIndex = newIndex.replace(extractSection('contact'), '<Contact />\n');

newIndex = "---\nimport BaseLayout from '../layouts/BaseLayout.astro';\nimport Pricing from '../components/Pricing.astro';\nimport FAQ from '../components/FAQ.astro';\nimport Contact from '../components/Contact.astro';\n---\n" + newIndex.replace(/---\nimport BaseLayout.*\n---\n/, '');

fs.writeFileSync('src/pages/index.astro', newIndex);

console.log('Extraction complete');
