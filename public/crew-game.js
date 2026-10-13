import {FEATURED_ROSTER,introduced} from './featured-roster.js';
export const CREW_ROLES=['captain','swordsman','navigator','cook','doctor','musician','sniper','wildcard1','wildcard2','wildcard3'];
// Editorial role fit: leadership, swordsmanship, navigation, cooking,
// medicine, music, marksmanship and wildcard utility (in that order).
// Every member has a deliberate profile; combat strength is not a job qualification.
const fit={
 luffy:[99,22,0,2,0,12,18,99],zoro:[64,99,0,14,8,9,30,95],
 nami:[72,8,100,65,28,25,61,78],usopp:[56,12,63,53,39,46,100,81],
 sanji:[78,35,71,100,44,30,41,94],chopper:[35,9,42,48,97,24,22,77],
 robin:[81,18,76,69,43,48,46,87],franky:[69,27,72,64,26,66,91,90],
 brook:[62,92,47,29,12,100,37,85],jinbe:[88,38,91,62,32,42,55,94],
 shanks:[99,98,79,46,19,52,65,100],ace:[84,24,63,41,10,21,57,91],
 law:[93,92,73,38,100,16,54,96],buggy:[90,45,66,39,14,68,59,62],
 mihawk:[61,100,69,75,22,33,78,99],vivi:[83,34,57,60,36,51,40,63],
 crocodile:[89,36,68,24,13,10,64,90],smoker:[75,66,58,32,21,8,49,82],
 lucci:[51,44,60,23,31,5,72,89],hancock:[90,30,61,78,24,39,70,95],
 doflamingo:[91,73,70,18,27,36,86,96],sabo:[89,67,75,45,29,28,62,95],
 whitebeard:[100,96,77,31,12,49,56,100],garp:[87,22,49,20,15,14,85,98],
 katakuri:[82,80,58,56,19,18,96,95],kaido:[92,69,62,6,3,27,67,98],
 sogeking:[58,14,60,52,36,73,99,81],chouchou:[12,0,7,0,0,4,0,18],
 pappag:[29,2,18,24,5,61,8,31],kid:[85,68,52,11,16,22,87,93],
 dragon:[97,41,85,34,30,17,67,98],roger:[100,98,82,43,20,51,62,99],
 blackbeard:[94,44,71,27,15,35,87,97],bigmom:[96,94,78,82,7,72,68,98],
 kuma:[72,25,83,41,49,16,77,94],shiki:[95,97,74,28,17,34,63,97],
 joyboy:[98,52,71,37,25,64,56,100],sengoku:[96,42,78,48,33,26,59,98],
 kizaru:[70,86,64,30,18,32,95,96],akainu:[88,38,61,16,9,3,76,97],
 aokiji:[80,77,84,47,23,41,81,96],fujitora:[86,95,88,51,28,35,69,96],
 ryokugyu:[63,57,66,58,31,19,74,94],enel:[77,48,86,21,11,29,98,92],
 bonclay:[73,31,48,67,34,83,32,75],perona:[54,10,56,44,36,38,42,79],
 yamato:[76,85,39,26,17,33,51,94],marco:[87,36,81,54,98,23,60,96]
};
export function roleScore(id,role){const index=CREW_ROLES.indexOf(role);if(index<0||!Object.hasOwn(fit,id))throw Error('Unknown crew member or role.');return fit[id][Math.min(index,7)];}
export function spinSlot(kind,progress,role,ids,randomInt){if(!CREW_ROLES.includes(role))throw Error('Unknown role.');const eligible=FEATURED_ROSTER.filter(c=>introduced(c,kind,progress));if(eligible.length<10)throw Error('Meet at least ten featured characters before assembling a full crew.');const pool=eligible.filter(c=>!ids.includes(c.id)),weighted=pool.flatMap(c=>Array(roleScore(c.id,role)>=96?1:4).fill(c.id));const index=randomInt(weighted.length);if(!Number.isInteger(index)||index<0||index>=weighted.length)throw Error('Invalid random draw.');return weighted[index];}
export function scoreCrew(ids){if(!Array.isArray(ids)||ids.length!==10||new Set(ids).size!==10)throw Error('A crew needs ten distinct members.');const points=ids.map((id,i)=>roleScore(id,CREW_ROLES[i])),total=Math.min(999,points.reduce((a,b)=>a+b,0));return {scoringVersion:2,total,points,tier:total>=990?'LEGENDARY CREW':total>=850?'EMPEROR CREW':total>=700?'NEW WORLD CREW':total>=500?'GRAND LINE CREW':'EAST BLUE CREW',max:1000};}
export function spinCrew(kind,progress,randomInt){const ids=[];for(const role of CREW_ROLES)ids.push(spinSlot(kind,progress,role,ids,randomInt));return {ids,...scoreCrew(ids),kind,progress,version:2};}
export function projectCrew(run,kind,value){return run&&run.ids.every(id=>{const c=FEATURED_ROSTER.find(c=>c.id===id);return c&&introduced(c,kind,value);})?{...run,...scoreCrew(run.ids)}:null;}
export const CREW_RULES='Reveal one character, then assign them to any empty berth. Assign before drawing again. Characters and filled berths cannot be rerolled or moved; start a new voyage to try again. No duplicates or characters beyond your checkpoint. Each eligible character whose best role scores 96–100 has draw weight 1; others have weight 4. Exact odds change with progress and previous draws. Role points are revealed only after you commit a character to a berth. Fit rewards leadership, practical skills and useful abilities, not just combat strength. 990–999 needs an exceptionally rare combination and smart assignments. Scores are capped at 999, even for a perfect combination: 1000 and Pirate King Crew are unattainable in this mode. No pity boosts or forced near misses. Editorial game scores, not canonical power levels. Retained crew lineups are scored under the current balance.';

const bestFit=Object.fromEntries(Object.entries(fit).map(([id,scores])=>[id,Math.max(...scores)]));
export function drawCharacter(kind,progress,ids,randomInt){const eligible=FEATURED_ROSTER.filter(c=>introduced(c,kind,progress));if(eligible.length<10)throw Error('Meet at least ten featured characters before assembling a full crew.');const pool=eligible.filter(c=>!ids.includes(c.id)),weighted=pool.flatMap(c=>Array(bestFit[c.id]>=96?1:4).fill(c.id));const i=randomInt(weighted.length);if(!Number.isInteger(i)||i<0||i>=weighted.length)throw Error('Invalid random draw.');return weighted[i];}
