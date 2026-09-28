const fs = require('fs');
const html = fs.readFileSync('src/pages/index.astro', 'utf8');

function extractSection(id) {
  const startTag = `id="${id}"`;
  const startIndex = html.indexOf(startTag);
  if (startIndex === -1) return '';
  const actualStart = html.lastIndexOf('<section', startIndex);
  let endIndex = html.indexOf('<section', startIndex);
  if (endIndex === -1) endIndex = html.indexOf('</BaseLayout>', startIndex);
  
  return html.substring(actualStart, endIndex);
}

const components = ['pricing', 'faq', 'contact', 'how', 'results'];
components.forEach(comp => {
  const content = extractSection(comp);
  fs.writeFileSync(`src/components/${comp}.astro`, '---\n---\n' + content);
});

let newIndex = html;
components.forEach(comp => {
  newIndex = newIndex.replace(extractSection(comp), `<${comp} />\n`);
});

const imports = components.map(c => `import ${c} from '../components/${c}.astro';`).join('\n');
newIndex = newIndex.replace(/---\n/, `---\n${imports}\n`);

fs.writeFileSync('src/pages/index.astro', newIndex);
console.log('Extraction complete');
