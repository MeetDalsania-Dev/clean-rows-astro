(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const volumes = [1000, 2500, 5000, 10000, 20000, 30000, 50000, 75000, 100000, 150000, 200000, 300000];
  const packages = [{volume: 1000, price: 25}, {volume: 10000, price: 199}, {volume: 50000, price: 799}];
  let period = 'month';
  const money = value => '$' + value.toLocaleString('en-US', {maximumFractionDigits: 2});

  // Find the least expensive published package combination covering this volume.
  // Never extrapolate a fixed price into the custom-quote tier.
  function estimateCleanRows(volume) {
    if (volume >= 100000) return null;
    const costs = [0];
    const units = Math.ceil(volume / 1000);
    for (let remaining = 1; remaining <= units; remaining++) {
      costs[remaining] = Math.min(...packages.map(plan =>
        plan.price + costs[Math.max(0, remaining - plan.volume / 1000)]
      ));
    }
    return costs[units];
  }

  function calculate(volume, seats, selectedPeriod) {
    const creditSeats = Math.ceil(volume / 1000);
    const needed = Math.max(seats, Math.min(creditSeats, 20));
    const us = estimateCleanRows(volume);
    const apollo = needed * 149;
    const zoom = (15000 + Math.max(0, needed - 3) * 2500) / 12;
    const multiplier = selectedPeriod === 'year' ? 12 : 1;
    return {
      us: us === null ? null : us * multiplier,
      apollo: apollo * multiplier,
      zoom: zoom * multiplier,
      savings: us === null ? null : Math.max(0, Math.min(apollo, zoom) - us) * 12,
      from: creditSeats > 20 || seats > 20
    };
  }

  function renderCalculator() {
    const volume = volumes[Number($('#volume').value)];
    let seats = Number($('#seats').value);
    if (!Number.isFinite(seats) || seats < 1) seats = 1;
    seats = Math.min(100, Math.round(seats));
    const result = calculate(volume, seats, period);
    const custom = result.us === null;
    $('#volume-label').textContent = volume.toLocaleString('en-US');
    $('#volume').setAttribute('aria-valuetext', volume.toLocaleString('en-US') + ' leads per month');
    $('#cost-us').textContent = custom ? 'Custom quote' : money(result.us);
    $('#cost-apollo').textContent = (result.from ? 'from ' : '') + money(result.apollo);
    $('#cost-zoom').textContent = (result.from ? 'from ' : '') + money(result.zoom);
    $('#savings').textContent = custom ? 'Quote required' : money(result.savings);
    $('#savings-label').textContent = custom
      ? 'Confirm your price before comparing costs'
      : 'Illustrative difference against the lower comparison estimate';
    $('#savings-period').hidden = custom;
    $('#custom-quote-link').hidden = !custom;
    $('#pricing-estimate-note').textContent = custom
      ? '100,000+ leads are quoted for your volume, targeting and required fields. Savings depend on your agreed quote.'
      : 'USD. Published package combinations cover your selected volume. Extra records may be included. Yearly assumes 12 monthly orders.';
    const max = Math.max(result.us || 0, result.apollo, result.zoom);
    ['us', 'apollo', 'zoom'].forEach(key => {
      const bar = $('#bar-' + key);
      bar.hidden = result[key] === null;
      bar.style.width = result[key] === null ? '0%' : Math.max(4, result[key] / max * 100) + '%';
    });
    $$('[data-volume]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.volume) === volume)));
    return {
      volume, period,
      cleanRows: custom ? 'Custom quote' : money(result.us),
      requiresQuote: custom,
      apolloEstimate: $('#cost-apollo').textContent,
      zoomInfoEstimate: $('#cost-zoom').textContent,
      annualSavings: custom ? null : money(result.savings)
    };
  }

  $('#volume').addEventListener('input', renderCalculator);
  $('#seats').addEventListener('input', renderCalculator);
  $('#seats').addEventListener('change', () => {
    $('#seats').value = String(Math.max(1, Math.min(100, Math.round(Number($('#seats').value) || 1))));
    renderCalculator();
  });
  $$('[data-volume]').forEach(button => button.addEventListener('click', () => {
    $('#volume').value = String(volumes.indexOf(Number(button.dataset.volume)));
    renderCalculator();
  }));
  $$('[data-period]').forEach(button => button.addEventListener('click', () => {
    period = button.dataset.period;
    $$('[data-period]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    renderCalculator();
  }));
  renderCalculator();

  if (document.modelContext?.registerTool) {
    const life = new AbortController();
    addEventListener('pagehide', () => life.abort(), {once: true});
    try {
      Promise.resolve(document.modelContext.registerTool({
        name: 'set_lead_volume',
        title: 'Estimate lead-list costs',
        description: 'Set the visible calculator to a supported monthly lead volume. Returns published-package estimates below 100,000 leads, or a custom-quote requirement at higher volumes. Does not order or send contact information.',
        inputSchema: {type: 'object', properties: {volume: {type: 'integer', enum: volumes}}, required: ['volume'], additionalProperties: false},
        annotations: {readOnlyHint: false, untrustedContentHint: false},
        execute(input) {
          if (!input || Object.keys(input).length !== 1 || !volumes.includes(input.volume)) throw Error('Choose a supported monthly volume.');
          $('#volume').value = String(volumes.indexOf(input.volume));
          return renderCalculator();
        }
      }, {signal: life.signal})).catch(() => {});
    } catch {}
  }
})();
