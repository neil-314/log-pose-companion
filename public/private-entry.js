import {canBuildCrew,crewUnlockMessage} from './crew-access.js';
import {showCrewPointsDialog} from './crew-points-dialog.js';
const link=document.createElement('a');link.href='/harbour';link.className='small';link.textContent='Harbour';link.title='Community discussions, opt-in profiles and private messages';document.querySelector('.header-actions')?.append(link);
const tabs=document.querySelector('.dashboard-tabs');if(tabs){const entry=document.createElement('a');entry.href='/harbour';entry.className='harbour-tab';entry.textContent='Harbour · Discussions';tabs.append(entry);}
const crewButton=document.getElementById('open-crew-builder'),frame=document.getElementById('crew-builder-frame'),crewStatus=document.getElementById('crew-load-status');
let accessCheckpoint='';
const checkpoint=()=>window.lpCrewCheckpoint?.()||{kind:'anime',value:0};
function updateCrewAccess(){const cp=checkpoint(),key=cp.kind+':'+cp.value;if(accessCheckpoint&&key!==accessCheckpoint)document.querySelector('.crew-points-dialog')?.close();accessCheckpoint=key;const allowed=canBuildCrew(cp.kind,cp.value);crewButton?.setAttribute('aria-disabled',String(!allowed));if(crewButton)crewButton.title=allowed?'Build your crew':crewUnlockMessage(cp.kind);const island=document.querySelector('[data-tour-section="crew-builder"]');if(island){island.setAttribute('aria-disabled',String(!allowed));island.title=crewButton.title;}if(!allowed){frame.hidden=true;frame.removeAttribute('src');crewStatus.textContent=crewUnlockMessage(cp.kind);}else if(!frame.getAttribute('src'))crewStatus.textContent='';return allowed;}
crewButton?.addEventListener('click',async()=>{if(!updateCrewAccess())return;crewStatus.textContent='Preparing your crew deck…';frame.hidden=true;try{await window.lpFlushAccount?.();if(!updateCrewAccess())return;if(!frame.getAttribute('src')){const cp=window.lpSignedIn?null:checkpoint();frame.src='/crew?embedded=1'+(cp?'&kind='+encodeURIComponent(cp.kind)+'&progress='+encodeURIComponent(cp.value):'');}else frame.contentWindow.postMessage({type:'lp:crew-refresh',checkpoint:window.lpSignedIn?undefined:checkpoint()},location.origin);}catch(e){crewStatus.textContent=e.message;}});
window.addEventListener('message',e=>{
 if(e.origin!==location.origin||e.source!==frame?.contentWindow||!['lp:crew-height','lp:crew-ready','lp:crew-logbook','lp:crew-explanation'].includes(e.data?.type))return;
 if(e.data.type==='lp:crew-logbook'){window.lpTourSection?.('overview');document.getElementById('voyage-recap')?.scrollIntoView({block:'start'});return;}
 if(!updateCrewAccess())return;
 if(e.data.type==='lp:crew-explanation'){const d=e.data.details;if(!d||!Number.isInteger(d.score)||d.score<0||d.score>100||!['name','label','reason'].every(k=>typeof d[k]==='string'&&d[k].length>0&&d[k].length<3000))return;showCrewPointsDialog(document,d,()=>frame.contentWindow?.postMessage({type:'lp:crew-explanation-closed'},location.origin));return;}
 if(e.data.type==='lp:crew-ready'){frame.hidden=false;crewStatus.textContent='';return;}
 const height=Number(e.data.height);if(Number.isFinite(height)&&height>=200&&height<=100000)frame.style.height=Math.ceil(height)+'px';
});
if(new URLSearchParams(location.search).get('crew')==='1'){const open=document.getElementById('open-dashboard');const enter=()=>{if(open.disabled)return;observer.disconnect();open.click();crewButton?.click();};const observer=new MutationObserver(enter);observer.observe(open,{attributes:true,attributeFilter:['disabled']});enter();}
for(const event of ['lp:open','lp:watched'])window.addEventListener(event,()=>{updateCrewAccess();if(crewButton?.classList.contains('selected'))crewButton.click();});
window.addEventListener('lp:recap',updateCrewAccess);updateCrewAccess();
document.getElementById('crew-update-progress')?.addEventListener('click',()=>{document.getElementById('update-progress').click();document.getElementById('current').focus();});

// A native picker keeps all sections reachable without a wall of tiny buttons on phones.
if(tabs){
 const label=document.createElement('label');label.className='mobile-section-nav';label.textContent='Logbook section';
 const select=document.createElement('select');select.id='mobile-logbook-section';
 for(const button of tabs.querySelectorAll('button[data-panel]')){const option=document.createElement('option');option.value=button.dataset.panel;option.textContent=button.textContent;select.append(option);}
 const harbour=document.createElement('option');harbour.value='harbour';harbour.textContent='Harbour · Discussions';select.append(harbour);label.append(select);tabs.before(label);
 const sync=()=>{const selected=tabs.querySelector('button.selected');if(selected)select.value=selected.dataset.panel;};
 select.addEventListener('change',()=>{if(select.value==='harbour'){location.assign('/harbour');return;}[...tabs.querySelectorAll('button[data-panel]')].find(button=>button.dataset.panel===select.value)?.click();});
 new MutationObserver(sync).observe(tabs,{subtree:true,attributes:true,attributeFilter:['class']});sync();
}
