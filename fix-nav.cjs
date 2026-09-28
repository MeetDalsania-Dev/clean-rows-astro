const fs = require('fs');

let layout = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf8');

// Update Header
layout = layout.replace(
  /<nav id="menu" aria-label="Primary">.*?<\/nav>/s,
  `<nav id="menu" aria-label="Primary">
      <a href="/for/agencies">For Agencies</a>
      <a href="/lists/ceos">CEO Lists</a>
      <a href="/pricing">Pricing</a>
      <a href="/about">About</a>
    </nav>`
);

// Update Footer
layout = layout.replace(
  /<div class="footer-links">.*?<\/div>/s,
  `<div class="footer-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 2rem; margin: 2rem 0; width: 100%;">
      <div class="footer-col">
        <strong>Use Cases</strong>
        <a href="/for/agencies" style="display:block; margin-top:0.5rem;">Marketing Agencies</a>
        <a href="/for/saas" style="display:block; margin-top:0.5rem;">B2B SaaS</a>
        <a href="/for/recruitment" style="display:block; margin-top:0.5rem;">Recruitment</a>
      </div>
      <div class="footer-col">
        <strong>Target Lists</strong>
        <a href="/lists/ceos" style="display:block; margin-top:0.5rem;">CEOs & Founders</a>
        <a href="/lists/vp-sales" style="display:block; margin-top:0.5rem;">VP of Sales</a>
        <a href="/lists/fintech" style="display:block; margin-top:0.5rem;">Fintech Companies</a>
      </div>
      <div class="footer-col">
        <strong>Compare</strong>
        <a href="/compare/apollo" style="display:block; margin-top:0.5rem;">vs Apollo.io</a>
        <a href="/compare/zoominfo" style="display:block; margin-top:0.5rem;">vs ZoomInfo</a>
      </div>
      <div class="footer-col">
        <strong>Company</strong>
        <a href="/about" style="display:block; margin-top:0.5rem;">About Us</a>
        <a href="/pricing" style="display:block; margin-top:0.5rem;">Pricing</a>
        <a href="/whats-in-the-file" style="display:block; margin-top:0.5rem;">Data Fields</a>
        <a href="/data-sources" style="display:block; margin-top:0.5rem;">Data Sources</a>
      </div>
    </div>`
);

fs.writeFileSync('src/layouts/BaseLayout.astro', layout);
console.log('Navigation updated');
