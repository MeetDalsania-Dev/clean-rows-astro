const fs = require('fs');

const extraImports = `
import Compliance from '../components/Compliance.astro';
import WhoNotFor from '../components/WhoNotFor.astro';
import Founder from '../components/Founder.astro';
import SampleTable from '../components/SampleTable.astro';
`;

const extraComponents = `
<SampleTable />
<Compliance />
<WhoNotFor />
<Founder />
`;

let content = fs.readFileSync('src/pages/index.astro', 'utf8');

// add imports
content = content.replace(/import Contact from '..\/components\/Contact.astro';/, "import Contact from '../components/Contact.astro';" + extraImports);

// inject components right before <Pricing />
content = content.replace(/<Pricing \/>/, extraComponents + "\n<Pricing />");

fs.writeFileSync('src/pages/index.astro', content);
console.log('Index injection complete');
