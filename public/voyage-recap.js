import {voyageRecap} from './recap-data.js';
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
let selected='all';
function render(){
 const data=window.lpRecapSnapshot?.(),parent=document.getElementById('panel-overview');if(!data||!parent)return;
 let card=document.getElementById('voyage-recap');if(!card){card=el('section',undefined,'companion-card voyage-recap');card.id='voyage-recap';parent.prepend(card);}const focused=document.activeElement?.id==='recap-period';card.replaceChildren();
 card.append(el('p','YOUR VOYAGE, REMEMBERED','eyebrow'),el('h2','Your voyage recap'));
 const label=el('label','Logged revisits from '),select=el('select');select.id='recap-period';select.append(new Option('All time','all'));
 const years=new Set([new Date().getUTCFullYear()]);for(const v of [...data.state.voyages,...data.state.history]){const y=new Date(v.at).getUTCFullYear();if(Number.isFinite(y))years.add(y);}for(const y of [...years].sort((a,b)=>b-a))select.append(new Option(String(y),String(y)));
 if(![...select.options].some(o=>o.value===selected))selected='all';select.value=selected;select.onchange=()=>{selected=select.value;render();document.getElementById('recap-period').focus();};label.append(select);card.append(label);
 const recap=voyageRecap(data.state,data.ratings,data.arcs,selected),stats=el('div',undefined,'journey-stats');
 for(const [v,name] of [[recap.loggedFullRewatches,'FULL REWATCH RUNS'],[recap.loggedFullRereads,'FULL REREAD RUNS'],[recap.loggedRewatchedEpisodes,'REWATCHED EPISODES'],[recap.loggedRereadChapters,'REREAD CHAPTERS']]){const stat=el('div',undefined,'journey-stat');stat.append(el('strong',String(v)),el('span',name));stats.append(stat);}card.append(stats);
 card.append(el('p',recap.loggedRewatchedEpisodes||recap.loggedRereadChapters?`${recap.period}: ${Number((recap.estimatedRewatchMinutes/60).toFixed(1))} estimated rewatch hours logged. Reading time is not estimated.`:'No revisits logged for this period yet. Add a rewatch or reread below to start your recap.'));
 card.append(el('h3','Your current arc ratings'),el('p',`${recap.currentRatings.length} rated · ${recap.currentCompletedArcs} completed at your checkpoint${recap.currentAverageRating!==null?' · '+recap.currentAverageRating+'/10 average':''}. These are your current ratings across all time.`));
 const list=el('ol',undefined,'recap-ratings');for(const arc of recap.currentRatings.slice(0,3))list.append(el('li',`${arc.name} · ${arc.score}/10`));if(list.children.length)card.append(list);else card.append(el('p','Rate a completed arc in Arcs & recaps to see your favourites here.','fine'));
 const actions=el('div',undefined,'recap-actions'),download=el('button','Download this recap ↓','primary');download.type='button';download.onclick=()=>{const a=el('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({product:'Log Pose',generatedAt:new Date().toISOString(),...recap},null,2)],{type:'application/json'}));a.download=`log-pose-recap-${selected}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};
 const backup=el('button','Export full logbook ↓','back');backup.type='button';backup.onclick=()=>document.getElementById('export-log').click();actions.append(download,backup);card.append(actions,el('p','Exports are optional personal copies. Signed-in logbooks already save to your account.','fine'));
 const details=el('details'),summary=el('summary','How this recap is counted');details.append(summary,el('p',recap.limits,'fine'));card.append(details);if(focused)select.focus();
}
window.addEventListener('lp:recap',render);render();
