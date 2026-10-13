(function(){document.addEventListener('DOMContentLoaded',()=>{
 if(document.body.dataset.crewOnly==='true')return;const key='lp-tour-v1';let seen=false;try{seen=Boolean(localStorage.getItem(key));}catch{}
 const dialog=document.createElement('dialog');dialog.className='tour-dialog';dialog.setAttribute('aria-labelledby','tour-heading');const eyebrow=document.createElement('p');eyebrow.className='tour-progress';const title=document.createElement('h2');title.id='tour-heading';const copy=document.createElement('p');const actions=document.createElement('div');actions.className='tour-actions';dialog.append(eyebrow,title,copy,actions);document.body.append(dialog);
 let step=-1,opener=null,position=0,highlight=null;
 const steps=[
 ['Your checkpoint is the compass','Enter the last episode or chapter you finished. That checkpoint controls which recaps, characters and quizzes unlock.','#current'],
 ['Your logbook is the main deck','Open My logbook for arc ratings, favourite-character rankings, revisit history, quizzes, notes and opening videos. Guests can explore; a verified email account saves across devices.','#open-dashboard'],
 ['Build your crew on the main deck','Open the Build your crew tab beside the quiz. Reveal a sailor, choose an empty role, then draw again. Guests play for this visit; accounts keep drafts and bests. Scores stop at 999.','#open-crew-builder'],
 ['Harbour means community','Harbour is the social side: progress-gated anime/manga discussions, public captain profiles you opt into, and private messages that require recipient consent. It uses your existing verified account.','a[href="/harbour"], [data-view="forum"]'],
 ['Keep your own log private','Your email and notebook stay private. Public profiles share only the fields you choose, and new public handles/discussions wait for review. Report spoilers or block a sailor when needed.','#account-link, .identity'],
 ['Night watch follows you','Night watch changes the palette across the main app, Harbour and the crew game. Your choice stays on this browser. You can replay this tour from Take a tour.','[data-theme-toggle]']
 ];
 function button(text,action,primary=false){const b=document.createElement('button');b.type='button';b.className=primary?'primary':'back';b.textContent=text;b.onclick=action;actions.append(b);return b;}
 function clear(){highlight?.classList.remove('tour-highlight');highlight=null;}
 function finish(){clear();try{localStorage.setItem(key,'seen');}catch{}dialog.close();window.scrollTo?.(0,position);opener?.focus();}
 function render(){clear();actions.replaceChildren();if(step<0){eyebrow.textContent='WELCOME ABOARD';title.textContent='Take a quick tour?';copy.textContent='Find your way around the logbook, crew game and Harbour. It takes about a minute, and you can skip or replay it anytime.';button('Skip for now',finish);button('Take the tour',()=>{step=0;render();},true).focus();return;}
 const [heading,body,selector]=steps[step];eyebrow.textContent='YOUR LOG POSE · '+(step+1)+' / '+steps.length;title.textContent=heading;copy.textContent=body;const target=[...document.querySelectorAll(selector)].find(e=>e.getClientRects().length);if(target){highlight=target;highlight.classList.add('tour-highlight');highlight.scrollIntoView?.({behavior:'auto',block:'center'});}button('Skip tour',finish);if(step>0)button('Back',()=>{step--;render();});button(step===steps.length-1?'Ready to sail':'Next',()=>{if(step===steps.length-1)finish();else{step++;render();}},true).focus();}
 function open(replay=false){if(dialog.open)return;opener=document.activeElement;position=window.scrollY;step=replay?0:-1;dialog.showModal();render();}
 dialog.addEventListener('cancel',e=>{e.preventDefault();finish();});
 const launcher=document.createElement('button');launcher.type='button';launcher.className='small tour-launch';launcher.textContent='Take a tour';launcher.onclick=()=>open(true);(document.querySelector('.header-actions')||document.querySelector('header'))?.append(launcher);
 if(!seen&&!document.querySelector('dialog[open]'))open();
 window.lpTour={open:()=>open(true)};
});})();
