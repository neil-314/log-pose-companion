import {canonicalCharacter} from './dex-names.js';
// Main-story ranges; anime-only gaps are intentional. Boundaries are editorial,
// not a claim that every episode adapts an entire chapter.
export const ARCS=[
 ['romance-dawn','Romance Dawn',1,3,1,7,'Luffy begins his voyage and finds his first crewmate.'],
 ['orange-town','Orange Town',4,8,8,21,'A small town becomes a battleground against Buggy.'],
 ['syrup-village','Syrup Village',9,18,22,41,'Usopp helps defend his home from a hidden threat.'],
 ['baratie','Baratie',19,30,42,68,'A floating restaurant brings Sanji into the adventure.'],
 ['arlong-park','Arlong Park',31,44,69,95,'The crew stands beside Nami against Arlong.'],
 ['loguetown','Loguetown',48,53,96,100,'The crew visits the town where Roger was executed.'],
 ['reverse-mountain','Reverse Mountain',62,63,101,105,'The Grand Line begins with a mountain and Laboon.'],
 ['whisky-peak','Whisky Peak',64,67,106,114,'A warm welcome conceals a dangerous trap.'],
 ['little-garden','Little Garden',70,77,115,129,'Giants and ancient creatures await on a prehistoric island.'],
 ['drum-island','Drum Island',78,91,130,154,'The search for a doctor leads to Chopper.'],
 ['arabasta','Alabasta',92,130,155,217,'The crew helps Vivi confront a kingdom-wide conspiracy.'],
 ['jaya','Jaya',144,152,218,236,'An impossible dream points the crew toward the sky.'],
 ['skypiea','Skypiea',153,195,237,302,'A sky island hides a conflict and a golden history.'],
 ['long-ring','Long Ring Long Land',207,219,303,321,'Foxy challenges the crew to the Davy Back Fight.'],
 ['water-seven','Water 7',229,263,322,374,'Ship repairs become a crisis of trust and loyalty.'],
 ['enies-lobby','Enies Lobby',264,312,375,430,'The Straw Hats challenge the government to save Robin.'],
 ['post-enies','Post-Enies Lobby',313,325,431,441,'The crew regroups and prepares a new ship.'],
 ['thriller-bark','Thriller Bark',337,381,442,489,'A haunted ship brings stolen shadows and Brook.'],
 ['sabaody','Sabaody Archipelago',385,405,490,513,'The crew meets a harsh reality before the New World.'],
 ['amazon-lily','Amazon Lily',408,417,514,524,'Luffy lands on an isolated island ruled by Hancock.'],
 ['impel-down','Impel Down',422,452,525,549,'Luffy breaks into a prison in pursuit of Ace.'],
 ['marineford','Marineford',457,489,550,580,'A rescue attempt becomes a clash between great powers.'],
 ['post-war','Post-War',490,516,581,597,'Luffy reflects on brotherhood and the road ahead.'],
 ['return-sabaody','Return to Sabaody',517,522,598,602,'The Straw Hats reunite after their training.'],
 ['fishman','Fish-Man Island',523,574,603,653,'An underwater kingdom confronts old hatred and new hopes.'],
 ['punk-hazard','Punk Hazard',579,625,654,699,'A divided island reveals dangerous experiments.'],
 ['dressrosa','Dressrosa',629,746,700,801,'The crew challenges Doflamingo and a kingdom of secrets.'],
 ['zou','Zou',751,779,802,824,'A moving island brings allies and a new direction.'],
 ['whole-cake','Whole Cake Island',783,877,825,902,'The crew enters Big Mom’s territory to retrieve Sanji.'],
 ['levely','Reverie',878,889,903,908,'World leaders assemble as news reshapes the seas.'],
 ['wano','Wano Country',890,1085,909,1057,'An alliance fights to liberate Wano from its rulers.'],
 ['egghead','Egghead',1086,1155,1058,1125,'A futuristic island places the crew amid a global crisis.']
].map(([id,name,es,ee,cs,ce,recap])=>({id,name,es,ee,cs,ce,recap}));
export const CHARACTERS=[
 ['luffy','Monkey D. Luffy','👒',1,1],['zoro','Roronoa Zoro','⚔️',2,3],['nami','Nami','🍊',1,8],['usopp','Usopp','🎯',9,23],['sanji','Sanji','🍳',20,43],['chopper','Tony Tony Chopper','🦌',81,134],['robin','Nico Robin','📚',67,114],['franky','Franky','🔧',233,329],['brook','Brook','🎻',337,442],['jinbe','Jinbe','🌊',430,528],['ace','Portgas D. Ace','🔥',91,154],['law','Trafalgar Law','🩺',392,498],['shanks','Shanks','🏴‍☠️',4,1]
].map(([id,name,icon,episode,chapter])=>({id,name,icon,episode,chapter}));
CHARACTERS.push(...[ ['sogeking','Sogeking',258,368],['bepo','Bepo',392,498],['karoo','Karoo',65,109],['chouchou','Chouchou',6,12],['laboon','Laboon',62,102],['hattori','Hattori',230,327],['kungfu-dugong','Kung-Fu Dugong',98,161],['pappag','Pappag',385,491] ].map(([id,name,episode,chapter])=>({id,name,episode,chapter,bonus:true,aliases:id==='sogeking'?['Soge King','Sniper King']:[]})));

export function arcAt(kind,value){return ARCS.find(a=>value>=a[kind==='manga'?'cs':'es']&&value<=a[kind==='manga'?'ce':'ee'])??null;}
export function completedArcs(kind,value){return ARCS.filter(a=>value>=a[kind==='manga'?'ce':'ee']);}
export function timeStats(episode,skipped=0,rewatched=0){
 for(const n of [episode,skipped,rewatched])if(!Number.isInteger(n)||n<0)throw Error('Counts must be non-negative whole numbers.');
 if(skipped>episode)throw Error('Skipped episodes cannot exceed anime progress.');
 const first=(episode-skipped)*24,repeat=rewatched*24;
 return {first,repeat,total:first+repeat};
}
export function validateState(raw){
 if(!raw||!['anime','manga'].includes(raw.kind))throw Error('Choose anime or manga.');
 const integer=(v,max=100000)=>{if(!Number.isInteger(v)||v<0||v>max)throw Error('Invalid progress count.');return v;};
 const anime=integer(raw.anime),manga=integer(raw.manga),skipped=integer(raw.skipped),rewatched=integer(raw.rewatched);
 timeStats(anime,skipped,rewatched);
 const history=Array.isArray(raw.history)?raw.history.slice(-200).map(h=>{if(!['progress','rewatch','correction','series'].includes(h.type)||!['anime','manga'].includes(h.kind))throw Error('Invalid history.');return {type:h.type,kind:h.kind,value:integer(h.value),count:integer(h.count??0),at:new Date(h.at).toISOString()};}):[];
 const voyages=(raw.voyages??[]).map(v=>{if(!['anime','manga'].includes(v.kind))throw Error('Invalid revisit.');const length=integer(v.length,100000),passes=integer(v.passes,100);if(!length||!passes)throw Error('A revisit needs a length and pass count.');return {kind:v.kind,length,passes,at:new Date(v.at).toISOString()};});if(voyages.length>100)throw Error('Too many revisit entries.');
 let rankings=(raw.rankings??[]).map(c=>{if(typeof c.id!=='string'||!/^([a-z0-9-]{1,80})$/.test(c.id)||typeof c.name!=='string'||!c.name.trim()||c.name.length>100)throw Error('Invalid ranking.');return {id:c.id,name:c.name.trim()};});if(rankings.length>20||new Set(rankings.map(c=>c.id)).size!==rankings.length)throw Error('Rank up to 20 different characters.');rankings=[...new Map(rankings.map(c=>{const fixed=canonicalCharacter(c);return [fixed.id,{id:fixed.id,name:fixed.name}];})).values()];
 const levels={};for(const level of ['easy','medium','hard','extreme'])levels[level]={rounds:integer(raw.quiz?.levels?.[level]?.rounds??(level==='easy'&&!raw.quiz?.levels?raw.quiz?.rounds??0:0)),best:integer(raw.quiz?.levels?.[level]?.best??(level==='easy'&&!raw.quiz?.levels?raw.quiz?.best??0:0),5)};
 const daily=raw.quiz?.daily??null;if(daily&&(!/^\d{4}-\d{2}-\d{2}$/.test(daily.date)||!['easy','medium','hard','extreme'].includes(daily.level)||!Number.isInteger(daily.score)||daily.score<0||daily.score>5))throw Error('Invalid daily result.');
 const quiz={rounds:integer(raw.quiz?.rounds??0),best:integer(raw.quiz?.best??0,5),levels,points:integer(raw.quiz?.points??0,10000000),daily:daily?{date:daily.date,level:daily.level,score:daily.score}:null};
 const discovered=(raw.discovered??[]).map(id=>{if(typeof id!=='string'||!/^((movie|cover)-[a-z0-9-]+)$/.test(id))throw Error('Invalid discovery item.');return id;});if(discovered.length>100)throw Error('Too many discoveries.');
 const notes=(raw.notes??[]).map(n=>{if(!['anime','manga'].includes(n.kind)||typeof n.text!=='string'||!n.text.trim()||n.text.length>800)throw Error('Invalid note.');return {kind:n.kind,value:integer(n.value),text:n.text.trim(),at:new Date(n.at).toISOString()};});if(notes.length>20)throw Error('Keep up to 20 notes.');
 return {kind:raw.kind,anime,manga,skipped,rewatched,history,voyages,rankings,quiz,discovered,notes,updatedAt:Number.isFinite(raw.updatedAt)?raw.updatedAt:Date.now()};
}
export function revisitStats(voyages=[]){return voyages.reduce((s,v)=>{s.passes+=v.passes;if(v.kind==='anime')s.episodes+=v.length*v.passes;else s.chapters+=v.length*v.passes;return s;},{passes:0,episodes:0,chapters:0});}
