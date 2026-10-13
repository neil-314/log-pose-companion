(function(){
 const key='lp-display-theme',root=document.documentElement;let current='day';try{const saved=localStorage.getItem(key);if(['day','night'].includes(saved))current=saved;}catch{}
 function apply(value){current=value==='night'?'night':'day';root.dataset.theme=current;root.style.colorScheme=current==='night'?'dark':'light';if(document.body)document.body.classList.toggle('dark',current==='night');const toggle=document.querySelector('[data-theme-toggle]');if(toggle){toggle.textContent=current==='night'?'Day watch':'Night watch';toggle.setAttribute('aria-pressed',String(current==='night'));toggle.title=current==='night'?'Switch to the daytime palette':'Switch to the nighttime palette';}document.querySelector('meta[name="theme-color"]')?.setAttribute('content',current==='night'?'#082734':'#087ca1');}
 apply(current);
 document.addEventListener('DOMContentLoaded',()=>{apply(current);if(document.body.dataset.crewOnly==='true')return;let toggle=document.getElementById('theme');if(!toggle){toggle=document.createElement('button');toggle.id='night-watch';toggle.type='button';toggle.className='small';const target=document.querySelector('.header-actions')||document.querySelector('header');target?.append(toggle);}toggle.dataset.themeToggle='true';toggle.addEventListener('click',()=>{apply(current==='night'?'day':'night');try{localStorage.setItem(key,current);}catch{}window.dispatchEvent(new CustomEvent('lp:theme-change',{detail:current}));});apply(current);});
 window.addEventListener('storage',e=>{if(e.key===key)apply(e.newValue);});
 window.lpTheme={get:()=>current,set:value=>{apply(value);try{localStorage.setItem(key,current);}catch{}}};
})();
// Keep navigation separate from display and help controls on every page.
document.addEventListener('DOMContentLoaded',()=>{
 if(document.body.dataset.crewOnly==='true')return;
 const header=document.querySelector('header');if(!header)return;
 let nav=header.querySelector('.header-actions');if(!nav){nav=document.createElement('nav');nav.className='header-actions';nav.setAttribute('aria-label','Account and logbook');const log=document.createElement('a');log.href='/';log.textContent='My logbook';nav.append(log);header.append(nav);}
 const tools=document.createElement('details');tools.className='header-tools';const label=document.createElement('summary');label.textContent='Tools';const menu=document.createElement('div');menu.className='header-tools-menu';tools.append(label,menu);nav.append(tools);
 const organize=()=>{const account=header.querySelector('#account-link');if(account&&account.nextElementSibling!==tools)nav.insertBefore(account,tools);for(const selector of ['#find-character','#motion','[data-theme-toggle]','.tour-launch']){const item=header.querySelector(selector);if(item&&item.parentElement!==menu)menu.append(item);}};
 organize();new MutationObserver(organize).observe(header,{childList:true,subtree:true});
 document.addEventListener('click',e=>{if(!tools.contains(e.target))tools.open=false;});header.addEventListener('keydown',e=>{if(e.key==='Escape'){tools.open=false;label.focus();}});
});
