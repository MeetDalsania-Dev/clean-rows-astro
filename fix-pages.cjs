const fs = require('fs');

['src/pages/for/agencies.astro', 'src/pages/lists/ceos.astro'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove SampleTable from its current position
  content = content.replace(/<SampleTable \/>\n/s, '');
  
  // Insert SampleTable right before <Contact />
  content = content.replace(/<Contact \/>/s, '<SampleTable />\n<Contact />');
  
  fs.writeFileSync(file, content);
});
console.log('Fixed pages');
