(function(){document.addEventListener('DOMContentLoaded',()=>{
 if(document.body.dataset.crewOnly==='true'||!['/','/harbour'].includes(location.pathname))return;
 const key='lp-tour-v2',resumeKey='lp-tour-route';let seen=false;try{seen=!!localStorage.getItem(key)||!!localStorage.getItem('lp-tour-v1');}catch{}
 const steps=[
 ['Your checkpoint is your compass','Enter the last episode or chapter you finished. Your checkpoint unlocks recaps, characters and questions without sending you into future story spoilers.','checkpoint','#current','/'],
 ['My logbook: your voyage at a glance','This is your home deck: progress, time watched or read, catch-up plans and the next arc. Sign in to keep it across devices.','overview','#panel-overview','/'],
 ['Arc journal','Open completed arcs for recaps, media and your own ratings. Save a rating without leaving the arc; close it whenever you are ready.','arcs','#panel-arcs','/'],
 ['Your favourite characters','Search characters introduced by your checkpoint. Pick your favourite and build a ranked list to make the logbook yours.','crew','#panel-crew','/'],
 ['Revisits count too','Log a rewatch or reread, including a whole-series revisit. Your history adds to your total time with the story.','history','#panel-history','/'],
 ['The Den Den quiz','Choose a difficulty and test what you remember. Questions follow your checkpoint; signed-in accounts keep their records.','quiz','#panel-quiz','/'],
 ['Reveal a sailor. Choose a role.','Draw one character, then assign them to an empty berth. No duplicates. Scores are a playful game: 990+ is extremely rare and the absolute cap is 999.','crew-builder','#panel-crew-builder','/'],
 ['More of the world','Explore unlocked discoveries and opening videos. Media can open an external player; nothing starts playing during this tour.','discover','#panel-discover','/'],
 ['Your private notebook','Keep theories and memories here. Notes stay in your own logbook and are never added to public profiles.','notes','#panel-notes','/'],
 ['An account keeps your voyage','Guests can explore. A verified email saves your logbook across devices, and you choose a unique sailor name for Harbour. Your email never appears on a captain card.','notes','#account-link','/'],
 ['Welcome to Harbour: the tavern','Harbour is the community side. Anime and manga have separate boundaries. The server hides titles, search results and replies beyond your checkpoint. Verified accounts can submit discussions for review.','forum','[data-view="forum"]','/harbour'],
 ['Captain cards, by choice','Pick what your public profile shares: progress, arc ratings, favourite rankings, quiz records and crew bests. Other sailors only see content their own checkpoint allows.','profiles','[data-view="profiles"]','/harbour'],
 ['Den Den messages','Private chats start with a request. The other sailor must accept, and both of you must have reached the conversation’s fixed spoiler ceiling. Blocking and reporting are available.','mail','[data-view="mail"]','/harbour'],
 ['Make it your own','Night watch works throughout the app. Replay this tour from the Tools menu whenever you need it. Ready to return to your logbook?','overview','[data-theme-toggle]','/']
 ];
 const dialog=document.createElement('dialog');dialog.className='tour-dialog guided-tour';dialog.setAttribute('aria-labelledby','tour-heading');const eyebrow=document.createElement('p');eyebrow.className='tour-progress';const title=document.createElement('h2');title.id='tour-heading';const copy=document.createElement('p');const actions=document.createElement('div');actions.className='tour-actions';dialog.append(eyebrow,title,copy,actions);document.body.append(dialog);
 let step=0,opener=null,highlight=null,active=false,paused=false,renderId=0;
 function clear(){highlight?.classList.remove('tour-highlight');highlight=null;}
 function store(){try{sessionStorage.setItem(resumeKey,String(step));}catch{}}
 function finish(){active=false;clear();try{localStorage.setItem(key,'seen');sessionStorage.removeItem(resumeKey);}catch{}dialog.close();opener?.focus();}
 function button(label,action,primary=false){const b=document.createElement('button');b.type='button';b.className=primary?'primary':'back';b.textContent=label;b.onclick=action;actions.append(b);return b;}
 async function render(){const token=++renderId;clear();const [heading,body,section,selector,path]=steps[step];store();if(location.pathname!==path){location.assign(path+'?tour=1&tourStep='+step);return;}
  if(!dialog.open&&!paused)dialog.showModal();eyebrow.textContent='WELCOME ABOARD · '+(step+1)+' / '+steps.length;title.textContent=heading;copy.textContent=body;actions.replaceChildren();button('Skip tour',finish);if(step)button('Back',()=>{step--;render();});button(step===steps.length-1?'Start my voyage':'Next',()=>{if(step===steps.length-1)finish();else{step++;render();}},true).focus();
  // Modules and account restoration can finish after this deferred script.
  for(let i=0;i<160;i++){if(!active||token!==renderId)return;const ready=path==='/harbour'?window.lpHarbourTour:window.lpTourSection;if(ready){try{await ready(section);}catch{}break;}await new Promise(r=>setTimeout(r,100));}
  if(!active||token!==renderId)return;const target=[...document.querySelectorAll(selector)].find(e=>!e.hidden);if(target){const menu=target.closest('details');if(menu)menu.open=true;highlight=target;target.classList.add('tour-highlight');target.scrollIntoView?.({behavior:'auto',block:target.getBoundingClientRect().height>window.innerHeight*.6?'start':'center'});}
 }
 function open(index=0){if(active)return;active=true;step=index;opener=document.activeElement;render();}
 dialog.addEventListener('cancel',e=>{e.preventDefault();finish();});
 window.addEventListener('lp:username-opening',()=>{paused=true;if(dialog.open)dialog.close();});window.addEventListener('lp:username-closed',()=>{paused=false;if(active)render();});
 const launcher=document.createElement('button');launcher.type='button';launcher.className='small tour-launch';launcher.textContent='Take a tour';launcher.onclick=()=>open(location.pathname==='/harbour'?10:0);(document.querySelector('.header-actions')||document.querySelector('header'))?.append(launcher);
 let resume=null;try{resume=sessionStorage.getItem(resumeKey);}catch{}if(resume===null&&new URLSearchParams(location.search).get('tour')==='1')resume=new URLSearchParams(location.search).get('tourStep');
 if(resume!==null&&/^\d+$/.test(resume)&&Number(resume)<steps.length)open(Number(resume));else if(!seen&&new URLSearchParams(location.search).get('signin')!=='1')open(location.pathname==='/harbour'?10:0);
 window.lpTour={open:()=>open(location.pathname==='/harbour'?10:0)};
});})();
