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

/* Success state for the request form, shared by app.js (Home) and editorial.js. */
(() => {
  'use strict';
  const copy = {
    sample: 'We are reviewing your ICP. Expect an email with your sample file within 24 hours.',
    order: 'We are reviewing your request. Expect an email to confirm the scope, timing and price.',
  };
  // When the portal answered with a live order page, the visitor goes straight there.
  const trackCopy = {
    sample: 'We are reviewing your ICP. Follow your sample live on your order page.',
    order: 'We are reviewing your request. Follow it live on your order page.',
  };
  const REDIRECT_MS = 2600;
  const timers = new WeakMap();
  const markup = `
    <svg class="form-success-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle class="form-success-ring" cx="32" cy="32" r="29" />
      <path class="form-success-tick" d="M20.5 33.5 29 42 44.5 25" />
    </svg>
    <h3 class="form-success-title">Request Received.</h3>
    <p class="form-success-copy"></p>
    <a class="form-success-open" hidden>Open my order page <span aria-hidden="true">→</span></a>
    <p class="form-success-redirect" hidden>Opening your order page…</p>
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
    const track = form.dataset.track || '';
    const open = panel.querySelector('.form-success-open');
    const redirect = panel.querySelector('.form-success-redirect');
    clearTimeout(timers.get(form));
    if (track) {
      panel.querySelector('.form-success-copy').textContent = sample ? trackCopy.sample : trackCopy.order;
      open.href = track;
      open.hidden = false;
      redirect.hidden = false;
      timers.set(form, setTimeout(() => window.location.assign(track), REDIRECT_MS));
    } else {
      // When the portal also took the request, say where to follow it.
      const portal = form.dataset.portal === '1'
        ? ' We also emailed you a link to follow it in your Clean Rows portal.'
        : '';
      panel.querySelector('.form-success-copy').textContent = (sample ? copy.sample : copy.order) + portal;
      open.hidden = true;
      redirect.hidden = true;
    }
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
    clearTimeout(timers.get(form));
    timers.delete(form);
    delete form.dataset.track;
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
  // The client portal (app.cleanrowsdata.com) also receives each request, creates
  // the order and answers with a private link to its live order page. The webhook
  // and the portal run at the same time; whichever confirms first is enough.
  const PORTAL = window.CleanRowsPortalEndpoint || 'https://doaejavwazvrkfpxvlyo.supabase.co/functions/v1/website-lead';
  const TRACK_PREFIX = (window.CleanRowsPortalApp || 'https://app.cleanrowsdata.com') + '/track/';
  // Resolves with the portal's JSON reply, or null when it fails or times out.
  function sendToPortal(body, signal) {
    // Form-encoded with no custom headers: a CORS "simple request", no preflight.
    return fetch(PORTAL, { method: 'POST', body: new URLSearchParams(body), signal })
      .then((r) => r.json().then((j) => (r.ok && j && typeof j === 'object' ? j : null)))
      .catch(() => null);
  }
  // Apps Script cold starts plus the sheet write and email can take several seconds.
  const TIMEOUT_MS = 30000;
  // A retry of the same request reuses its id, so the webhook and the portal can drop
  // a duplicate when an earlier attempt was saved but its reply arrived too late. The
  // id is tied to what the visitor typed (not attribution), and kept in this tab so a
  // reload does not create a second lead. Only a digest is stored, never the brief itself.
  const IDENTITY = ['name', 'email', 'company', 'type', 'icp', 'volume', 'timeline', 'notes'];
  const pending = new Map();
  const newId = () => (window.crypto && crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2));
  async function requestKey(body) {
    const identity = IDENTITY.map((k) => k + '=' + (body.get(k) || '')).join('&');
    try {
      const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(identity));
      return 'cr-request:' + Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
    } catch {
      return 'cr-request:' + identity.length + ':' + identity.slice(0, 64);
    }
  }

  // The free sample is for work addresses: a new Gmail takes seconds to make.
  // Same list as the portal's is_personal_email_domain().
  const PERSONAL = new Set(('gmail.com googlemail.com icloud.com me.com mac.com proton.me pm.me tutanota.com tutanota.de tutamail.com ' +
    'tuta.io tuta.com zoho.com zohomail.com zohomail.in mail.com email.com inbox.com fastmail.com fastmail.fm hey.com hushmail.com ' +
    'mailfence.com rediffmail.com rediff.com qq.com 163.com 126.com yeah.net sina.com naver.com daum.net hanmail.net seznam.cz wp.pl ' +
    'o2.pl interia.pl onet.pl libero.it virgilio.it alice.it tiscali.it orange.fr wanadoo.fr free.fr laposte.net sfr.fr t-online.de ' +
    'web.de freenet.de mail.ru bk.ru list.ru inbox.ru rambler.ru ukr.net bigpond.com optusnet.com.au btinternet.com sky.com ' +
    'virginmedia.com talktalk.net ntlworld.com comcast.net verizon.net att.net sbcglobal.net cox.net charter.net earthlink.net juno.com ' +
    'shaw.ca rogers.com sympatico.ca telus.net terra.com.br uol.com.br bol.com.br yopmail.com mailinator.com guerrillamail.com ' +
    'sharklasers.com 10minutemail.com temp-mail.org tempmail.com trashmail.com dispostable.com getnada.com maildrop.cc mohmal.com ' +
    'emailondeck.com throwawaymail.com fakeinbox.com mintemail.com mailnesia.com tempr.email discard.email mailpoof.com').split(' '));
  const isPersonalEmail = (email) => {
    const domain = String(email || '').trim().toLowerCase().split('@')[1] || '';
    return PERSONAL.has(domain) || /^(yahoo|ymail|hotmail|outlook|live|windowslive|msn|aol|gmx|yandex|rocketmail|protonmail)\.[a-z.]+$/.test(domain);
  };

  window.CleanRowsSubmit = async (form, formData) => {
    if (formData.get('volume') === '100' && isPersonalEmail(formData.get('email'))) {
      const error = new Error('Free sample needs a work email');
      error.code = 'work_email';
      error.canChangeVolume = !!form.querySelector('select[name="volume"]');
      throw error;
    }
    const body = new URLSearchParams(formData);
    const key = await requestKey(body);
    let id = pending.get(key);
    if (!id) { try { id = sessionStorage.getItem(key); } catch {} }
    if (!id) id = newId();
    pending.set(key, id);
    try { sessionStorage.setItem(key, id); } catch {}
    body.set('request_id', id);
    form.dataset.portal = '';
    delete form.dataset.track;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    // keepalive lets the webhook finish even after the visitor leaves for the order page.
    // A form-encoded POST without custom headers is a CORS "simple request",
    // so Apps Script's JSON reply can be read without a preflight.
    const webhook = fetch(ENDPOINT, { method: 'POST', body, signal: controller.signal, keepalive: true })
      .then(async (response) => {
        const result = await response.json().catch(() => null);
        if (!response.ok || !result || result.status !== 'success') {
          throw new Error('Lead webhook error: ' + (result && result.message || response.status));
        }
        return result;
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          const timeout = new Error('Lead webhook timed out');
          timeout.code = 'timeout';
          throw timeout;
        }
        throw error;
      });
    const portal = sendToPortal(body, controller.signal).then((reply) => {
      if (!reply || reply.ok !== true) throw new Error('Portal did not confirm the request');
      form.dataset.portal = '1';
      if (typeof reply.track_url === 'string' && reply.track_url.startsWith(TRACK_PREFIX)) {
        form.dataset.track = reply.track_url;
      }
      return reply;
    });

    try {
      const result = await Promise.any([webhook, portal]);
      pending.delete(key);
      try { sessionStorage.removeItem(key); } catch {}
      // GA4: one event per confirmed new lead (a resend of the same request is not counted).
      // No personal details are sent. Mark "generate_lead" as a key event in GA4.
      if (!result.duplicate && typeof window.gtag === 'function') {
        const volume = formData.get('volume') || '';
        window.gtag('event', 'generate_lead', {
          lead_type: volume === '100' ? 'free_sample' : 'order',
          lead_volume: volume,
          team_type: formData.get('type') || '',
          cta: formData.get('cta') || '',
          form_page: location.pathname,
        });
      }
      return result;
    } catch (failure) {
      // Both failed. Report the webhook's error, so a timeout keeps its wording.
      const errors = failure && failure.errors ? failure.errors : [failure];
      throw errors.find((e) => e && e.code === 'timeout') || errors[0];
    } finally {
      // The webhook may still be running: it must not be cut off by a later abort.
      webhook.finally(() => clearTimeout(timer)).catch(() => {});
    }
  };

  // Wording for a failed submission. A timeout may still have reached us.
  window.CleanRowsSubmitError = (error) => error && error.code === 'work_email'
    ? (error.canChangeVolume
      ? 'The free sample is for work email addresses, such as you@yourcompany.com. Go back and use your work email, or choose a paid package under Lead volume.'
      : 'The free sample is for work email addresses, such as you@yourcompany.com. Go back and use your work email.')
    : error && error.code === 'timeout'
    ? 'This is taking longer than usual and your request may still reach us. Please wait a minute before trying again, or email hello@cleanrowsdata.com.'
    : 'We couldn’t confirm your request. Your details are still on this page. Please try again or email hello@cleanrowsdata.com.';
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
    if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: choice });
    banner.hidden = true;
  });
  document.querySelectorAll('[data-cookie-settings]').forEach((button) => {
    button.addEventListener('click', () => {
      show();
      banner.querySelector('[data-consent="granted"]').focus();
    });
  });
})();
