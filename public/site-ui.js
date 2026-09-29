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

/* Sends the request form to the lead webhook and resolves only on a confirmed success. */
(() => {
  'use strict';
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbyzuAM0Ru6S-W-wwn1M3KuXyAGsV03cSuE6BgxXYVL8r2G3_WdGxDkQZxc3XHugrcBB/exec';
  // Apps Script cold starts plus the sheet write and email can take several seconds.
  const TIMEOUT_MS = 30000;
  // A retry of the same request reuses its id, so the webhook can drop a duplicate
  // when an earlier attempt was saved but its reply arrived too late. Editing the
  // form starts a new request.
  const ids = new WeakMap();
  const watched = new WeakSet();
  const newId = () => (window.crypto && crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).slice(2));

  window.CleanRowsSubmit = async (form, formData) => {
    if (!watched.has(form)) {
      watched.add(form);
      form.addEventListener('input', () => ids.delete(form));
    }
    if (!ids.has(form)) ids.set(form, newId());
    const body = new URLSearchParams(formData);
    body.set('request_id', ids.get(form));

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      // A form-encoded POST without custom headers is a CORS "simple request",
      // so Apps Script's JSON reply can be read without a preflight.
      const response = await fetch(ENDPOINT, { method: 'POST', body, signal: controller.signal });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result || result.status !== 'success') {
        throw new Error('Lead webhook error: ' + (result && result.message || response.status));
      }
      ids.delete(form);
      return result;
    } catch (error) {
      if (error.name === 'AbortError') {
        const timeout = new Error('Lead webhook timed out');
        timeout.code = 'timeout';
        throw timeout;
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  };

  // Wording for a failed submission. A timeout may still have reached us.
  window.CleanRowsSubmitError = (error) => error && error.code === 'timeout'
    ? 'This is taking longer than usual and your request may still reach us. Please wait a minute before trying again, or email hello@cleanrows.com.'
    : 'Your request didn’t send. Please try again or email hello@cleanrows.com.';
})();
