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
