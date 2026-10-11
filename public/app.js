import {plan} from './planner.js';
import {loadRoute} from './data.js';
const $=id=>document.getElementById(id);
const read=(key,fallback=null)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const save=(key,value)=>{if(key!=='lp-reduce-motion'&&!window.lpSignedIn)return;try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
let metrics={plans:0,watched:0,fetches:0,failures:0};
let budget=144,episodes=[],result=null,route=null,busy=false,step=0;
const settings={};
if(settings.current!==undefined)$('current').value=settings.current;
if([72,144,288].includes(Number(settings.budget)))budget=Number(settings.budget);
for(const id of ['filler','recap'])if(settings[id]!==undefined)$(id).checked=settings[id];
function invalidate(){route=null;result=null;$('route-nav').disabled=true;}
function setPace(value){if(budget!==value)invalidate();budget=value;document.querySelectorAll('.pace').forEach(b=>{const active=Number(b.dataset.budget)===budget;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active));});}
setPace(budget);
function logbook(){ $('metrics').textContent=`Your device: ${metrics.plans} routes charted · ${metrics.watched} episodes logged.`;save('lp-metrics',metrics); }
logbook();
function valid(){const current=Number($('current').value);if($('current').value.trim()===''||!Number.isInteger(current)||current<0||current>100000){$('input-error').textContent='Enter a whole episode number between 0 and 100000.';return false;}$('input-error').textContent='';return true;}
function go(next){if(busy)return;if(next>0&&!valid())return;if(next===3&&!route)return;step=next;window.dispatchEvent(new CustomEvent('lp:scene',{detail:{step}}));document.querySelectorAll('.screen').forEach((el,i)=>el.classList.toggle('active',i===step));document.querySelectorAll('[data-step]').forEach(el=>{if(Number(el.dataset.step)===step)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});$('next-episode').textContent=Number($('current').value)+1;window.scrollTo({top:0,behavior:document.body.classList.contains('reduce-motion')?'instant':'smooth'});}
$('next-0').onclick=()=>{if(valid())window.dispatchEvent(new Event('lp:open'));};$('next-1').onclick=()=>go(2);$('edit').onclick=()=>go(0);
window.logPosePlanner={go,setAnime(value){$('current').value=value;invalidate();},getAnime:()=>Number($('current').value)};
document.querySelectorAll('[data-back],[data-step]').forEach(b=>b.onclick=()=>go(Number(b.dataset.back??b.dataset.step)));
document.querySelectorAll('[data-budget]').forEach(b=>b.onclick=()=>setPace(Number(b.dataset.budget)));
$('current').addEventListener('keydown',e=>{if(e.key==='Enter'&&valid())window.dispatchEvent(new Event('lp:open'));});
for(const id of ['current','filler','recap','titles'])$(id).addEventListener('change',invalidate);
function options(){return {current:Number($('current').value),budget,skipFiller:route?.mode==='verified'&&$('filler').checked,skipRecap:route?.mode==='verified'&&$('recap').checked};}
function render(){
 result=plan(episodes,options());$('queue').replaceChildren();$('stats').replaceChildren();
 for(const [value,label] of [[result.queue.length,'EPISODES THIS WEEK'],[`${result.minutes}m`,'YOUR WATCH TIME'],[route.mode==='basic'?'—':result.skipped,'FLAGGED & SKIPPED']]){const d=document.createElement('div');d.className='stat';const s=document.createElement('strong');s.textContent=value;const l=document.createElement('span');l.textContent=label;d.append(s,l);$('stats').append(d);}
 for(const e of result.queue){const li=document.createElement('li');const n=document.createElement('span');n.className='number';n.textContent=e.mal_id;const d=document.createElement('div');const title=document.createElement('span');title.className='episode-title';title.textContent=$('titles').checked&&e.title?e.title:`Episode ${e.mal_id}`;const meta=document.createElement('span');meta.className='episode-meta';meta.textContent=route.mode==='basic'?'24 min estimate · metadata not verified':`24 min estimate${e.filler?' · filler':''}${e.recap?' · recap':''}${!$('titles').checked?' · title hidden':''}`;d.append(title,meta);li.append(n,d);$('queue').append(li);}
 $('actions').hidden=!result.queue.length;$('departure').textContent=`EP. ${$('current').value}`;$('destination').textContent=result.queue.length?`EP. ${result.queue.at(-1).mal_id}`:'CATALOGUE COMPLETE';
 $('source').textContent=route.mode==='basic'?'BASIC ROUTE · OFFLINE':route.stale?'VERIFIED CACHE · STALE':'JIKAN / MAL DATA';$('source').classList.toggle('basic',route.mode==='basic');
 $('status').textContent=route.mode==='basic'?'The episode service couldn’t be reached. Your basic route is ready: sequential episode numbers only. Filler/recap filters and title lookup are unavailable; episode availability is not verified.':result.queue.length?'Your next week is ready. Follow the islands, enjoy the crew, and log each episode as you go.':'You’ve reached the end of the available catalogue for these settings.';
 $('coverage').textContent=route.mode==='basic'?'This route is calculated from your episode number and time budget, not live metadata. Refresh to verify it when the service returns.':`${route.stale?'Older cached data. ':''}Data fetched ${new Date(route.at).toLocaleString()}. Flags come from Jikan and may be incomplete. This is a weekly plan, not a full-series estimate.`;
 save('lp-settings',{current:$('current').value,budget,filler:$('filler').checked,recap:$('recap').checked});
}
async function chart(){if(busy||!valid())return;busy=true;$('sailing').hidden=false;$('submit').disabled=true;$('complete').disabled=true;
 try{route=await loadRoute(Number($('current').value),Math.floor(budget/24),{read,write:save,fetcher:async(...args)=>{metrics.fetches++;try{const r=await fetch(...args);if(!r.ok)metrics.failures++;return r;}catch(e){metrics.failures++;throw e;}}});episodes=route.episodes;render();metrics.plans++;logbook();$('route-nav').disabled=false;}catch(e){$('input-error').textContent=e.message;route=null;}finally{busy=false;$('sailing').hidden=true;$('submit').disabled=false;$('complete').disabled=false;if(route)go(3);else go(0);}}
$('submit').onclick=chart;$('retry').onclick=chart;
$('complete').onclick=async()=>{if(!result?.queue.length||busy)return;$('current').value=result.queue[0].mal_id;window.dispatchEvent(new CustomEvent('lp:watched',{detail:{episode:Number($('current').value)}}));metrics.watched++;logbook();$('toast').textContent='Another episode in the captain’s log!';$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2500);await chart();};
$('export').onclick=()=>{if(!result)return;const blob=new Blob([JSON.stringify({project:'Log Pose',mode:route.mode,metadataVerified:route.mode==='verified',options:options(),episodeIds:result.queue.map(e=>e.mal_id),estimatedMinutes:result.minutes},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='log-pose-plan.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};
let reduced=read('lp-reduce-motion',matchMedia('(prefers-reduced-motion: reduce)').matches);
function motion(){document.body.classList.toggle('reduce-motion',reduced);$('motion').textContent=`Motion: ${reduced?'off':'on'}`;save('lp-reduce-motion',reduced);}motion();$('motion').onclick=()=>{reduced=!reduced;motion();};
