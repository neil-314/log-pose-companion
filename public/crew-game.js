import {CREW_ROSTER as FEATURED_ROSTER,introduced} from './featured-roster.js';
export const CREW_ROLES=['captain','swordsman','navigator','cook','doctor','vicecaptain','sniper','wildcard1','wildcard2','wildcard3'];
// Editorial role fit: leadership, swordsmanship, navigation, cooking,
// medicine, vice-captain support, marksmanship and wildcard utility.
// Hybrid exploration rewards navigation and archaeology. Top fighters have an 80-point floor.
const fit={
 luffy:[99,22,0,2,0,85,18,99],zoro:[64,99,0,14,8,100,30,95],
 nami:[72,8,100,65,28,86,61,78],usopp:[56,12,63,53,39,69,100,81],
 sanji:[78,35,71,100,44,96,41,94],chopper:[35,9,42,48,97,64,22,77],
 robin:[81,18,100,69,43,94,46,87],franky:[69,27,72,64,26,82,91,90],
 brook:[62,92,47,29,12,78,37,85],jinbe:[88,38,91,62,32,98,55,94],
 shanks:[99,98,79,46,19,99,65,100],ace:[84,24,63,41,10,92,57,91],
 law:[93,92,73,38,100,96,54,96],buggy:[90,45,66,39,14,80,59,62],
 mihawk:[61,100,69,75,22,90,78,99],vivi:[83,34,57,60,36,86,40,63],
 crocodile:[89,36,68,24,13,93,64,90],smoker:[75,66,58,32,21,86,49,82],
 lucci:[51,44,60,23,31,82,72,89],hancock:[90,30,61,78,24,88,70,95],
 doflamingo:[91,73,70,18,27,91,86,96],sabo:[89,67,75,45,29,98,62,95],
 whitebeard:[100,96,77,31,12,99,56,100],garp:[87,22,49,20,15,94,85,98],
 katakuri:[82,80,58,56,19,99,96,95],kaido:[92,69,62,6,3,87,67,98],
 sogeking:[58,14,60,52,36,70,96,81],chouchou:[12,0,7,0,0,9,0,18],
 pappag:[29,2,18,24,5,34,8,31],kid:[85,68,52,11,16,83,87,93],
 dragon:[97,41,85,34,30,98,67,98],roger:[100,98,82,43,20,99,62,99],
 blackbeard:[94,44,71,27,15,85,87,97],bigmom:[96,94,78,97,7,86,68,98],
 kuma:[72,25,94,65,94,90,77,94],shiki:[95,97,98,28,17,90,63,97],
 joyboy:[98,52,71,37,25,99,56,100],sengoku:[96,42,78,48,33,98,59,98],
 kizaru:[70,86,64,30,18,84,95,96],akainu:[88,38,61,16,9,88,76,97],
 aokiji:[80,77,84,47,23,94,81,96],fujitora:[86,95,88,51,28,95,69,96],
 ryokugyu:[63,57,66,58,31,85,74,94],enel:[77,48,86,21,11,81,96,92],
 bonclay:[73,31,48,67,34,93,32,75],perona:[54,10,56,44,36,65,42,79],
 yamato:[76,85,39,26,17,94,51,94],marco:[87,36,81,54,98,99,60,96],
 oden:[94,98,100,83,80,97,82,98],
 yasopp:[64,18,58,35,14,82,100,80],augur:[60,22,62,18,13,78,99,80],
 beckman:[93,45,82,52,38,100,98,96],izo:[72,83,61,42,22,92,97,88],
 zeff:[86,24,73,99,35,88,28,86],streusen:[65,20,51,99,26,74,23,79],
 pudding:[39,8,48,98,25,52,20,64],kureha:[60,12,51,63,99,73,16,76],
 crocus:[68,17,79,58,97,81,29,78],laffitte:[72,48,97,29,18,83,78,87]
};
export const POWER_FLOOR_MEMBERS=new Set(['luffy','zoro','sanji','shanks','ace','law','mihawk','crocodile','lucci','hancock','doflamingo','sabo','whitebeard','garp','katakuri','kaido','kid','dragon','roger','blackbeard','bigmom','kuma','shiki','joyboy','sengoku','kizaru','akainu','aokiji','fujitora','ryokugyu','enel','yamato','marco','oden']);
export const roleLabel=role=>role==='vicecaptain'?'Vice Captain':role==='navigator'?'Navigator / Archaeologist':role.replace('wildcard','Wildcard ');
export function roleScore(id,role){const index=CREW_ROLES.indexOf(role==='musician'?'vicecaptain':role);if(index<0||!Object.hasOwn(fit,id))throw Error('Unknown crew member or role.');return Math.max(POWER_FLOOR_MEMBERS.has(id)?80:0,index>=7?Math.max(...fit[id].slice(0,7)):fit[id][index]);}
export function spinSlot(kind,progress,role,ids,randomInt){if(!CREW_ROLES.includes(role))throw Error('Unknown role.');const eligible=FEATURED_ROSTER.filter(c=>introduced(c,kind,progress));if(eligible.length<10)throw Error('Meet at least ten featured characters before assembling a full crew.');const pool=eligible.filter(c=>!ids.includes(c.id)),weighted=pool.flatMap(c=>Array(roleScore(c.id,role)>=96?1:4).fill(c.id));const index=randomInt(weighted.length);if(!Number.isInteger(index)||index<0||index>=weighted.length)throw Error('Invalid random draw.');return weighted[index];}
export function scoreCrew(ids){if(!Array.isArray(ids)||ids.length!==10||new Set(ids).size!==10)throw Error('A crew needs ten distinct members.');const points=ids.map((id,i)=>roleScore(id,CREW_ROLES[i])),total=Math.min(999,points.reduce((a,b)=>a+b,0));return {scoringVersion:4,total,points,tier:total>=990?'LEGENDARY CREW':total>=850?'EMPEROR CREW':total>=700?'NEW WORLD CREW':total>=500?'GRAND LINE CREW':'EAST BLUE CREW',max:1000};}
export function spinCrew(kind,progress,randomInt){const ids=[];for(const role of CREW_ROLES)ids.push(spinSlot(kind,progress,role,ids,randomInt));return {ids,...scoreCrew(ids),kind,progress,version:2};}
export function projectCrew(run,kind,value){return run&&run.ids.every(id=>{const c=FEATURED_ROSTER.find(c=>c.id===id);return c&&introduced(c,kind,value);})?{...run,...scoreCrew(run.ids)}:null;}
export const CREW_RULES='Reveal one character, then assign them to any empty berth. Assign before drawing again. Characters and filled berths cannot be rerolled or moved; start a new voyage to try again. No duplicates or characters beyond your checkpoint. Each eligible character whose best role scores 96–100 has draw weight 1; others have weight 4. Exact odds change with progress and previous draws. Role points are revealed only after you commit a character to a berth. Wildcard always matches that character’s highest score across the seven specialist roles. Vice Captain rewards leadership and support. Navigator / Archaeologist rewards navigation, exploration and historical knowledge; characters with those skills can receive top fit. Designated top fighters have a minimum of 80 in every role, with specialist bonuses above that floor. These are editorial game choices, not claims of professional training. 990–999 needs an exceptionally rare combination and smart assignments. Scores are capped at 999, even for a perfect combination: 1000 and Pirate King Crew are unattainable in this mode. No pity boosts or forced near misses. Editorial game scores, not canonical power levels. Retained crew lineups are scored under the current balance.';

const bestFit=Object.fromEntries(Object.entries(fit).map(([id,scores])=>[id,Math.max(...scores.slice(0,7))]));
export function drawCharacter(kind,progress,ids,randomInt){const eligible=FEATURED_ROSTER.filter(c=>introduced(c,kind,progress));if(eligible.length<10)throw Error('Meet at least ten featured characters before assembling a full crew.');const pool=eligible.filter(c=>!ids.includes(c.id)),weighted=pool.flatMap(c=>Array(bestFit[c.id]>=96?1:4).fill(c.id));const i=randomInt(weighted.length);if(!Number.isInteger(i)||i<0||i>=weighted.length)throw Error('Invalid random draw.');return weighted[i];}
