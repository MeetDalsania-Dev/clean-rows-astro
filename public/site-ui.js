(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const menu=$('#menu'),menuButton=$('.menu-toggle');
  function closeMenu(){menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');}
  menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');if(open)menu.querySelector('a')?.focus();});
  matchMedia('(max-width: 800px)').addEventListener('change',closeMenu);
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();menuButton.focus();}});
  let framePending=false;
  function onScroll(){const max=document.documentElement.scrollHeight-innerHeight;const scale=max>0?scrollY/max:0;const contact=$('#contact')?.getBoundingClientRect();const isVis=!!contact&&scrollY>700&&contact.top>innerHeight*0.8;$('#reading-progress').style.transform=`scaleX(${scale})`;$('.mobile-cta')?.classList.toggle('visible',isVis);framePending=false;}
  addEventListener('scroll',()=>{if(!framePending){framePending=true;requestAnimationFrame(onScroll);}},{passive:true});requestAnimationFrame(onScroll);
})();

// Cookie consent: analytics cookies stay off until the visitor accepts.
// The choice is stored locally and can be changed from "Cookie settings".
(() => {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  let saved = null;
  try { saved = localStorage.getItem('cr_consent'); } catch {}
  const show = () => { banner.hidden = false; };
  if (saved !== 'granted' && saved !== 'denied') show();
  banner.addEventListener('click', (event) => {
    const button = event.target.closest('[data-consent]');
    if (!button) return;
    const choice = button.dataset.consent;
    try { localStorage.setItem('cr_consent', choice); } catch {}
    // Shared with app.cleanrowsdata.com, so the client portal does not ask again.
    if (location.hostname.endsWith('cleanrowsdata.com')) document.cookie = `cr_consent=${choice}; Domain=.cleanrowsdata.com; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
    if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: choice });
    if (typeof window.clarity === 'function') window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: choice });
    banner.hidden = true;
  });
  document.querySelectorAll('[data-cookie-settings]').forEach((button) => {
    button.addEventListener('click', () => {
      show();
      banner.querySelector('[data-consent="granted"]').focus();
    });
  });
})();

