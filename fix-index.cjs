const fs = require('fs');

let content = fs.readFileSync('src/pages/index.astro', 'utf8');

// Remove the old about section
content = content.replace(/<section class="section about" id="about">.*?<\/section>/s, '');

// Remove SampleTable from its current position
content = content.replace(/<SampleTable \/>\n/s, '');

// Insert SampleTable right before <Contact />
content = content.replace(/<Contact \/>/s, '<SampleTable />\n<Contact />');

fs.writeFileSync('src/pages/index.astro', content);
console.log('Fixed index.astro');
