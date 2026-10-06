/* Presentation only: both steps stay in the same form and use the existing sender. */
(() => {
  'use strict';
  const form = document.querySelector('#lead-form');
  if (!form) return;
  const steps = [...form.querySelectorAll('[data-form-step]')];
  const next = form.querySelector('[data-form-next]');
  const back = form.querySelector('[data-form-back]');
  const submit = form.querySelector('#send-request');
  if (steps.length !== 2 || !next || !back || !submit) return;

  const progress = form.querySelector('.form-progress');
  const announcement = form.querySelector('.form-step-announcement');
  const note = form.querySelector('#form-note');
  const finalNote = note.textContent;
  let current = 1;

  function show(step, focus = true) {
    current = step;
    // Hidden fields remain enabled so FormData includes values from both steps.
    steps.forEach(panel => { panel.hidden = Number(panel.dataset.formStep) !== step; });
    next.hidden = step !== 1;
    back.hidden = step !== 2;
    submit.hidden = step !== 2;
    form.dataset.currentStep = String(step);
    progress.querySelectorAll('[data-progress-step]').forEach(item => {
      const number = Number(item.dataset.progressStep);
      if (number === step) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
      item.classList.toggle('is-complete', number < step);
      item.querySelector('.form-progress-number').textContent = number < step ? '✓' : String(number);
    });
    note.textContent = step === 1 ? 'Next: company and delivery preferences. All optional.' : finalNote;
    if (focus) {
      announcement.textContent = step === 1 ? 'Step 1 of 2: Your brief.' : 'Step 2 of 2: Preferences. All fields are optional.';
      const panel = steps[step - 1];
      const target = panel.querySelector('[data-step-heading], input:not([type="hidden"]), textarea, select');
      target?.focus({ preventScroll: true });
      if (form.getBoundingClientRect().top < 90) {
        form.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    }
  }

  function validate(scope) {
    const invalid = [...scope.querySelectorAll('input, textarea, select')]
      .find(field => field.willValidate && !field.checkValidity());
    if (!invalid) return true;
    const panel = invalid.closest('[data-form-step]');
    if (panel && Number(panel.dataset.formStep) !== current) show(Number(panel.dataset.formStep), false);
    invalid.setAttribute('aria-invalid', 'true');
    invalid.reportValidity();
    return false;
  }

  function advance() {
    if (!submit.disabled && validate(steps[0])) show(2);
  }
  next.addEventListener('click', advance);
  back.addEventListener('click', () => { if (!submit.disabled) show(1); });
  form.addEventListener('input', event => {
    if (event.target.hasAttribute('aria-invalid') && event.target.validity.valid) event.target.removeAttribute('aria-invalid');
  });
  // Validate the appropriate panel before native validation tries to focus a hidden field.
  // Capture prevents the existing Home/editorial submit handlers sending on step one.
  form.noValidate = true;
  form.addEventListener('submit', event => {
    if (current === 1 || submit.disabled || form.classList.contains('is-sent')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (current === 1 && !form.classList.contains('is-sent')) advance();
      return;
    }
    if (!validate(form)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  form.addEventListener('reset', () => {
    form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
    announcement.textContent = '';
    show(1, false);
  });
  new MutationObserver(() => { back.disabled = next.disabled = submit.disabled; })
    .observe(submit, { attributes: true, attributeFilter: ['disabled'] });

  progress.hidden = false;
  show(1, false);
  window.CleanRowsFormSteps = { show };
})();
