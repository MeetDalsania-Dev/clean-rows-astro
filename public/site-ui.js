(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const menu=$('#menu'),menuButton=$('.menu-toggle');
  function closeMenu(){menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');}
  menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
  matchMedia('(max-width: 800px)').addEventListener('change',closeMenu);
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();menuButton.focus();}});
  let framePending=false;
  function onScroll(){const max=document.documentElement.scrollHeight-innerHeight;$('#reading-progress').style.transform=`scaleX(${max>0?scrollY/max:0})`;const contact=$('#contact')?.getBoundingClientRect();$('.mobile-cta')?.classList.toggle('visible',!!contact&&scrollY>700&&contact.top>innerHeight*.8);framePending=false;}
  addEventListener('scroll',()=>{if(!framePending){framePending=true;requestAnimationFrame(onScroll);}},{passive:true});onScroll();
})();

/* Success state for the request form, shared by app.js (Home) and editorial.js. */
(() => {
  'use strict';
  const copy = {
    sample: 'We are reviewing your ICP. Expect an email with your sample file within 24 hours.',
    order: 'We are reviewing your request. Expect an email to confirm the scope, timing and price.',
  };
  const markup = `
    <svg class="form-success-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle class="form-success-ring" cx="32" cy="32" r="29" />
      <path class="form-success-tick" d="M20.5 33.5 29 42 44.5 25" />
    </svg>
    <h3 class="form-success-title">Request Received.</h3>
    <p class="form-success-copy"></p>
    <button type="button" class="form-success-again">Send another request</button>`;

  function show(form, { sample = true } = {}) {
    let panel = form.querySelector('.form-success');
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'form-success';
      panel.setAttribute('role', 'status');
      panel.tabIndex = -1;
      panel.innerHTML = markup;
      panel.querySelector('.form-success-again').addEventListener('click', () => reset(form));
      form.append(panel);
    }
    panel.querySelector('.form-success-copy').textContent = sample ? copy.sample : copy.order;
    // Keep the card's height so the page below does not jump when the fields disappear.
    form.style.minHeight = Math.min(form.getBoundingClientRect().height, innerWidth < 600 ? 420 : 560) + 'px';
    form.classList.add('is-sent');
    panel.classList.remove('is-playing');
    void panel.offsetWidth; // restart the draw animation on repeat submissions
    panel.classList.add('is-playing');
    panel.focus({ preventScroll: true });
    if (form.getBoundingClientRect().top < 0) {
      form.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }

  function reset(form) {
    form.classList.remove('is-sent');
    form.style.minHeight = '';
    form.reset();
    form.querySelector('[name="name"]')?.focus();
  }

  window.CleanRowsSuccess = { show, reset };
})();
