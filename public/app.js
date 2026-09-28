(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const content = window.CLEAN_ROWS_CONTENT;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  function setMotion(value){paused=value;document.documentElement.classList.toggle('motion-paused',value);}
  setMotion(paused);
  reduced.addEventListener('change',e=>setMotion(e.matches));
  document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('motion-paused',paused||document.hidden));
  document.documentElement.classList.add('js');
  const reveals = $$('.reveal');
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:.12});reveals.forEach(el=>observer.observe(el));}else reveals.forEach(el=>el.classList.add('in-view'));
  function animate(el){if(paused||reduced.matches)return;el.classList.remove('swap-in');void el.offsetWidth;el.classList.add('swap-in');}
  function tabs(selector,action){const buttons=$$(selector);function choose(button,focus=false){buttons.forEach(b=>{const selected=b===button;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});if(focus)button.focus();action(button);}
    buttons.forEach((button,i)=>{button.addEventListener('click',()=>choose(button));button.addEventListener('keydown',event=>{let next=i;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(i+1)%buttons.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(i-1+buttons.length)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();choose(buttons[next],true);});});return choose;}
  $$('[data-target]').forEach(button=>button.addEventListener('click',()=>{const companies=button.dataset.target==='companies';$$('[data-target]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$('.target-demo').classList.toggle('companies',companies);$('#target-value').textContent=companies?'Companies':'People';$('#target-caption').textContent=companies?'Target accounts, company size, industry and location':'Decision-makers, relevant roles and LinkedIn profiles';animate($('.target-display'));}));
  const fieldValues=["Maya Patel", "m.patel@northwind.io", "linkedin.com/in/mayapatel", "linkedin.com/company/northwind", "+1 (415) 555-0148", "+1 (415) 555-0100", "VP of Sales", "Northwind · northwind.io", "120 employees · B2B SaaS", "San Francisco, CA · US"];
  tabs('[data-field]',button=>{const i=Number(button.dataset.field),field=content.features.fields[i];$('#field-name').textContent=field.title.toUpperCase();$('#field-value').textContent=fieldValues[i];$('#field-description').textContent=field.body;$('#field-detail').setAttribute('aria-labelledby',button.id);animate($('#field-detail'));});
  const receipts=[["2 MINUTES","YOUR IDEAL CUSTOMER","VP of Sales\nHead of Growth","B2B SaaS · Fintech\n50–500 · US, UK, EU","A sentence is enough to start."],["FREE. NO CARD.","YOUR FREE SAMPLE","100 real prospects.\nYour exact ICP.","Review profiles, roles and companies.\nApprove before we scale.","Nothing to pay until you approve."],["BUILT AROUND YOUR ICP","QUALITY CHECK","Profile & company ✓\nBusiness email ✓","Source → enrich → deduplicate\nContact checks → human review","One reviewed prospect file."],["READY FOR YOUR WORKFLOW","YOUR DELIVERY","10,000 rows.\nYour next campaign.","CSV or Google Sheet\nCustom columns and per-client splits","LinkedIn · CRM · email"],["A HUMAN ON YOUR SIDE","SUPPORT AFTER DELIVERY","Check the fit.\nWe’re here to help.","Rebuild or refund if the list\ndoes not match your agreed brief.","Message us on WhatsApp."]];
  tabs('[data-step]',button=>{const i=Number(button.dataset.step),step=content.how.steps[i],receipt=receipts[i];$('#step-time').textContent=receipt[0];$('#step-title').textContent=step.title;$('#step-body').textContent=step.body;$('#step-big').textContent='0'+(i+1);$('#receipt-title').textContent=receipt[1];$('#receipt-main').textContent=receipt[2];$('#receipt-sub').textContent=receipt[3];$('#receipt-foot').textContent=receipt[4];$('#step-panel').setAttribute('aria-labelledby',button.id);animate($('.step-copy'));animate($('.step-art'));});
  tabs('[data-audience]',button=>{const i=Number(button.dataset.audience),item=content.who.items[i];$('#audience-title').textContent=item.title;$('#audience-body').textContent=item.body;$('#audience-index').textContent=['01 / AGENCIES','02 / ENTERPRISE & SAAS','03 / YOUR NICHE'][i];const list=$('#audience-list');list.replaceChildren(...item.items.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));$('#audience-panel').setAttribute('aria-labelledby',button.id);animate($('#audience-panel'));});
  const form=$('#lead-form'),status=$('#form-status'),submit=$('#send-request');
  const volumeField=form.querySelector('[name=volume]');
  const planNames={'1000':'Starter','10000':'Growth','50000':'Scale','100000+':'Enterprise'};
  const planLabels={'100':'100 free sample leads','1000':'Starter: 1,000 leads for $25 USD','10000':'Growth: 10,000 leads for $199 USD','50000':'Scale: 50,000 leads for $799 USD','100000+':'Enterprise: 100,000+ leads, custom quote'};
  function updateRequest(){const volume=volumeField.value;$('#request-heading').textContent=volume==='100'?'Your first 100 are on us.':volume==='100000+'?'Request an Enterprise quote':planNames[volume]?'Request the '+planNames[volume]+' plan':'Request a prospect list';}
  $$('[data-plan]').forEach(a=>a.addEventListener('click',()=>{volumeField.value=a.dataset.plan;$('.form-options').open=true;updateRequest();}));
  $$('[data-sample]').forEach(a=>a.addEventListener('click',()=>{volumeField.value='100';updateRequest();}));
  volumeField.addEventListener('change',updateRequest);
  const onNetlify=location.hostname.endsWith('.netlify.app')||document.body.dataset.contactMode==='netlify';
  if(onNetlify){submit.innerHTML='Send my request <span aria-hidden="true">↗︎</span>';$('#form-note').textContent='No card required. We reply within hours, often minutes.';}
  function statusMessage(message,url,label){status.replaceChildren();const p=document.createElement('p');p.textContent=message;status.append(p);if(url){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';a.textContent=label;status.append(a);}status.focus({preventScroll:true});}
  function fillAttribution(){const tracking=window.CleanRowsTracking;if(!tracking)return;for(const [key,value] of Object.entries(tracking.data())){const input=form.querySelector('input[type=hidden][name="'+key+'"]');if(input)input.value=value;}}
  form.addEventListener('submit',async event=>{event.preventDefault();if(!form.reportValidity())return;fillAttribution();const data=new FormData(form);if(String(data.get('bot-field')||''))return;
    if(!onNetlify){const labels={name:'Name',email:'Work email',icp:'Ideal customer',company:'Company',type:'Team',volume:'Volume',timeline:'Timeline',notes:'Notes'},lines=[String(data.get('volume'))==='100'?'Hi Clean Rows, I’d like my 100 free verified leads.':'Hi Clean Rows, I’d like to discuss the '+(planNames[String(data.get('volume'))]||'requested')+' prospect list plan.'];for(const [key,label] of Object.entries(labels)){const value=String(data.get(key)||'').trim();if(value)lines.push(label+': '+(key==='volume'?(planLabels[value]||value):value));}
      if(window.CleanRowsTracking)lines.push('','Ref: '+window.CleanRowsTracking.summary());const url='https://wa.me/918469847308?text='+encodeURIComponent(lines.join('\n'));statusMessage('Your request is ready. Review the message in WhatsApp and press Send to complete it.',url,'Open my request in WhatsApp ↗︎');window.open(url,'_blank','noopener');return;}
    submit.disabled=true;submit.textContent='Sending…';try{const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data).toString()});if(!response.ok)throw Error('Submission failed');statusMessage('Your request is received. We will reply to confirm your requirements and next steps.');form.reset();updateRequest();}catch{statusMessage('Your request didn’t send. Your answers are still here. Try again or message us on WhatsApp.','https://wa.me/918469847308','Message Clean Rows ↗︎');}finally{submit.disabled=false;submit.innerHTML='Send my request <span aria-hidden="true">↗︎</span>';}});
  $('#copy-slack-email').addEventListener('click',async()=>{
    const email=$('#slack-email').textContent.trim();
    const status=$('#slack-copy-status');
    try {
      await navigator.clipboard.writeText(email);
      status.textContent='Email copied. Paste it into your Slack workspace invitation.';
    } catch {
      status.textContent='Select and copy the email above, then paste it into your Slack workspace invitation.';
    }
  });
})();
