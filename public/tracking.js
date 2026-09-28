(() => {
  'use strict';
  // Lead attribution: remembers where a visitor came from (UTM tags, ad click IDs,
  // referrer) and which button they pressed, so both travel with the lead request.
  const UTM_KEYS=['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
  const CLICK_IDS=['gclid','fbclid','li_fat_id','msclkid'];
  const local={get(k){try{return JSON.parse(localStorage.getItem(k)||'null');}catch{return null;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}};
  const session={get(k){try{return sessionStorage.getItem(k)||'';}catch{return '';}},set(k,v){try{sessionStorage.setItem(k,v);}catch{}}};
  const clean=v=>String(v||'').trim().slice(0,150);

  // 1. Capture the traffic source on arrival.
  const params=new URLSearchParams(location.search),visit={};
  [...UTM_KEYS,...CLICK_IDS].forEach(k=>{const v=clean(params.get(k));if(v)visit[k]=v;});
  let referrer='';
  try{if(document.referrer&&new URL(document.referrer).hostname!==location.hostname)referrer=clean(document.referrer);}catch{}
  const tagged=Object.keys(visit).length>0;
  // A direct revisit never overwrites a real source.
  if(tagged||referrer||!local.get('cr_last_touch')){
    if(!tagged){if(referrer){visit.utm_source=new URL(referrer).hostname.replace(/^www\./,'');visit.utm_medium='referral';}else{visit.utm_source='(direct)';visit.utm_medium='(none)';}}
    const touch={...visit,referrer,landing_page:clean(location.pathname+location.search),at:new Date().toISOString().slice(0,10)};
    local.set('cr_last_touch',touch);
    if(!local.get('cr_first_touch'))local.set('cr_first_touch',touch);
  }

  // 2. Label every call to action by page, section and purpose, e.g. "home-hero-free-leads".
  const page=/calculator/.test(location.pathname)?'calculator':'home';
  const planNames={'1000':'starter','10000':'growth','50000':'scale','100000+':'enterprise'};
  function placement(el){if(el.closest('nav'))return 'nav';if(el.closest('header'))return 'header';if(el.closest('footer'))return 'footer';if(el.closest('.hero'))return 'hero';const s=el.closest('section[id]');return s?s.id:'page';}
  function purpose(el){const href=el.getAttribute('href')||'';if(el.dataset.plan)return 'plan-'+(planNames[el.dataset.plan]||el.dataset.plan);if(el.hasAttribute('data-sample')||href.endsWith('#contact'))return 'free-leads';if(/#(pricing|plan-options)$/.test(href))return 'choose-plan';if(href.startsWith('https://wa.me'))return 'whatsapp';if(href.startsWith('mailto:')&&!/policy/i.test(href))return 'email';return '';}
  document.querySelectorAll('a[href]').forEach(el=>{if(el.dataset.cta)return;const p=purpose(el);if(p)el.dataset.cta=page+'-'+placement(el)+'-'+p;});

  function data(){const last=local.get('cr_last_touch')||{},first=local.get('cr_first_touch')||{};const out={};UTM_KEYS.forEach(k=>out[k]=last[k]||'');out.click_id=CLICK_IDS.filter(k=>last[k]).map(k=>k+'='+last[k]).join(' ');out.cta=session.get('cr_cta')||'none (scrolled to form)';out.landing_page=last.landing_page||'';out.referrer=last.referrer||'';out.first_touch=[first.utm_source,first.utm_medium,first.utm_campaign,first.at].filter(Boolean).join(' / ');return out;}
  function summary(){const d=data();return [UTM_KEYS.map(k=>d[k]).filter(Boolean).join(' / '),'button: '+d.cta].join(', ');}

  // 3. Remember the last button pressed; tag direct WhatsApp chats with their source too.
  document.addEventListener('click',e=>{const el=e.target.closest('[data-cta]');if(!el)return;session.set('cr_cta',el.dataset.cta);
    if(el.dataset.cta.endsWith('-whatsapp')){el.href=el.href.split('?')[0]+'?text='+encodeURIComponent('Hi Clean Rows, I have a question.\n\nRef: '+summary());}});

  window.CleanRowsTracking={data,summary};
})();
