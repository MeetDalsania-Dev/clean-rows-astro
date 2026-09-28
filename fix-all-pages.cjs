const fs = require('fs');

const pages = [
  { path: 'free-sample', title: 'Get 100 Free B2B Leads', kicker: 'TEST OUR DATA', desc: 'Send your ICP and get 100 real prospects back within 24 hours. Review the LinkedIn profiles and job titles before you commit to a larger list.' },
  { path: 'whats-in-the-file', title: 'Data Fields Explained', kicker: 'WHAT YOU GET', desc: 'Every prospect list includes 10 enriched fields, including verified business emails, LinkedIn URLs, and company context.' },
  { path: 'data-sources', title: 'Where Does B2B Data Come From?', kicker: 'COMPLIANCE & SOURCES', desc: 'We strictly aggregate publicly available professional data. 100% GDPR and CCPA aligned.' },
  { path: 'services/custom-lists', title: 'Targeted B2B Email Lists', kicker: 'CUSTOM RESEARCH', desc: 'Stop relying on stale databases. We build bespoke outbound lists mapped exactly to your Ideal Customer Profile.' },
  { path: 'for/saas', title: 'B2B Leads for SaaS Companies', kicker: 'SCALE YOUR OUTBOUND', desc: 'Fuel your SDR team with fresh, accurate data. We build lists of decision makers at your target accounts.' },
  { path: 'for/recruitment', title: 'Leads for Recruitment Agencies', kicker: 'CLIENT ACQUISITION', desc: 'Find hiring managers and HR leaders actively growing their teams. Highly targeted lists for recruitment outreach.' },
  { path: 'lists/fintech', title: 'Fintech Email List & Contact Data', kicker: 'TARGET FINTECH', desc: 'Reach founders and executives at fast-growing financial technology companies globally.' },
  { path: 'lists/vp-sales', title: 'VP of Sales Email List', kicker: 'DECISION MAKERS', desc: 'Target the ultimate buyers of sales software and agency services. Verified contact data for VPs of Sales.' },
  { path: 'compare/apollo', title: 'Clean Rows vs Apollo.io', kicker: 'THE HONEST COMPARISON', desc: 'Why outbound teams are switching from expensive database subscriptions to our pay-as-you-go custom lists.' },
  { path: 'compare/zoominfo', title: 'Clean Rows vs ZoomInfo', kicker: 'THE HONEST COMPARISON', desc: 'Avoid $15k annual contracts. See why teams prefer our fresh, verified data over traditional bulk platforms.' }
];

pages.forEach(p => {
  const fullPath = `src/pages/${p.path}.astro`;
  let content = fs.readFileSync(fullPath, 'utf8');
  
  const beautifulHero = `
  <section class="hero" id="top">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow hero-kicker">${p.kicker}</p>
        <h1>${p.title.replace(' |', '<br><em>').replace('vs', 'vs <em>')}${p.title.includes('|') || p.title.includes('vs') ? '</em>' : ''}</h1>
        <p class="hero-description">${p.desc}</p>
        <div class="hero-actions">
          <div class="cta-pair">
            <a class="button lime cta-primary" href="#contact">Get 100 free leads</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;
  
  // Replace the ugly generic hero
  content = content.replace(/<section class="hero" style="padding: 10rem 0 5rem;"><div class="section-heading"><h1>.*?<\/h1>(<p>.*?<\/p>)?<\/div><\/section>/s, beautifulHero);
  
  fs.writeFileSync(fullPath, content);
});

console.log('Fixed all UI pages');
