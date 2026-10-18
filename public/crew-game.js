import {ADDITIONAL_CREW} from './crew-roster-data.js';
import {canBuildCrew,crewUnlockMessage} from './crew-access.js';
import {CREW_ROSTER as FEATURED_ROSTER,introduced} from './featured-roster.js';
export const CREW_ROLES=['captain','swordsman','navigator','cook','doctor','vicecaptain','sniper','wildcard1','wildcard2','wildcard3'];
// Editorial role fit: leadership, swordsmanship, navigation, cooking,
// medicine, vice-captain support, marksmanship and wildcard utility.
// Hybrid exploration rewards navigation and archaeology. Top fighters have an 80-point floor.
const fit={
 luffy:[100,22,0,2,0,85,18,99],zoro:[87,100,0,14,8,97,30,95],
 nami:[72,8,100,65,28,86,61,78],usopp:[56,12,63,53,39,69,100,81],
 sanji:[78,35,71,100,44,96,41,94],chopper:[35,9,42,48,100,64,22,77],
 robin:[81,18,100,69,43,94,46,87],franky:[69,27,72,64,26,82,91,90],
 brook:[62,92,47,29,12,78,37,85],jinbe:[88,38,100,62,32,98,55,94],
 shanks:[100,100,79,46,19,99,65,100],ace:[84,24,63,41,10,92,57,91],
 law:[93,92,73,38,100,96,54,96],buggy:[90,45,66,39,14,80,59,62],
 mihawk:[61,100,69,75,22,90,78,99],vivi:[83,34,57,60,36,86,40,63],
 crocodile:[89,36,68,24,13,93,64,90],smoker:[75,66,58,32,21,86,49,82],
 lucci:[51,44,60,23,31,82,72,89],hancock:[90,30,61,78,24,88,70,95],
 doflamingo:[91,73,70,18,27,91,86,96],sabo:[89,67,75,45,29,98,62,95],
 whitebeard:[100,96,77,31,12,99,56,100],garp:[87,22,49,20,15,94,85,98],
 katakuri:[82,80,58,56,19,99,96,95],kaido:[92,69,62,6,3,87,67,98],
 sogeking:[58,14,60,52,36,70,96,81],chouchou:[12,0,7,0,0,9,0,18],
 pappag:[29,2,18,24,5,34,8,31],kid:[85,68,52,11,16,83,87,93],
 dragon:[97,41,85,34,30,98,67,98],roger:[100,99,82,43,20,99,62,99],
 blackbeard:[94,44,71,27,15,85,87,97],bigmom:[96,94,78,100,7,86,68,98],
 kuma:[72,25,94,65,94,90,77,94],shiki:[95,97,98,28,17,90,63,97],
 joyboy:[100,52,71,37,25,99,56,100],sengoku:[96,42,78,48,33,98,59,98],
 kizaru:[70,86,64,30,18,84,95,96],akainu:[88,38,61,16,9,88,76,97],
 aokiji:[80,77,84,47,23,94,81,96],fujitora:[86,95,88,51,28,95,69,96],
 ryokugyu:[63,57,66,58,31,85,74,94],enel:[77,48,86,21,11,81,96,92],
 bonclay:[73,31,48,67,34,93,32,75],perona:[54,10,56,44,36,65,42,79],
 yamato:[76,85,39,26,17,94,51,94],marco:[89,36,81,54,100,99,60,96],
 imu:[100,100,100,100,100,100,100,100],
 oden:[94,99,100,83,80,97,82,98],
 yasopp:[64,18,58,35,14,82,100,80],augur:[60,22,62,18,13,78,99,80],
 beckman:[89,45,82,52,38,99,98,96],izo:[72,83,61,42,22,92,97,88],
 zeff:[86,24,73,99,35,88,28,86],streusen:[65,20,51,99,26,74,23,79],
 pudding:[39,8,48,98,25,52,20,64],kureha:[60,12,51,63,99,73,16,76],
 crocus:[68,17,79,58,97,81,29,78],laffitte:[72,48,97,29,18,83,78,87]
};
for(const character of ADDITIONAL_CREW)fit[character.id]=[...character.scores,Math.max(...character.scores)];
// Each support berth accepts either skill; never average two unrelated skills.
export const SUPPORT_PAIRS={navigator:['Navigator','Archaeologist'],cook:['Cook','Musician'],doctor:['Doctor','Shipwright']};
export const MUSICIAN_FIT={brook:100,apoo:98,aokiji:85,hancock:82,robin:72,franky:70,luffy:25,usopp:46,sanji:55,nami:40,chopper:35,bonclay:86,pappag:50};
export const SHIPWRIGHT_FIT={franky:100,usopp:88,sogeking:88,kuma:82,kid:87,law:52,robin:36,nami:45,sanji:31,brook:20,chopper:25};
for(const [id,scores] of Object.entries(fit)){
 scores[3]=Math.max(scores[3],MUSICIAN_FIT[id]||0);
 scores[4]=Math.max(scores[4],SHIPWRIGHT_FIT[id]||0);
}
// Primary captains transfer their leadership fit to Vice Captain.
export const CAPTAIN_MEMBERS=new Set(['luffy','jinbe','shanks','law','buggy','crocodile','hancock','doflamingo','whitebeard','kaido','kid','dragon','roger','blackbeard','bigmom','shiki','joyboy','zeff']);
export const VICE_CAPTAIN_MEMBERS=new Set(['zoro','sanji','sabo','katakuri','marco','beckman']);
for(const id of CAPTAIN_MEMBERS)fit[id][5]=fit[id][0];
for(const id of VICE_CAPTAIN_MEMBERS)fit[id][0]=fit[id][5]-10;
for(const id of ['joyboy','imu'])fit[id]=Array(8).fill(100);
export const WILDCARD_100_MEMBERS=new Set(['garp','sengoku','kizaru','akainu','aokiji','fujitora','ryokugyu']);
export const POWER_FLOOR_MEMBERS=new Set(['luffy','zoro','sanji','shanks','ace','law','mihawk','crocodile','lucci','hancock','doflamingo','sabo','whitebeard','garp','katakuri','kaido','kid','dragon','roger','blackbeard','bigmom','kuma','shiki','joyboy','sengoku','kizaru','akainu','aokiji','fujitora','ryokugyu','enel','yamato','marco','oden']);
export const roleLabel=role=>role==='vicecaptain'?'Vice Captain':SUPPORT_PAIRS[role]?SUPPORT_PAIRS[role].join(' / '):role.replace('wildcard','Wildcard ');
export function roleScore(id,role){const index=CREW_ROLES.indexOf(role==='musician'?'vicecaptain':role);if(index<0||!Object.hasOwn(fit,id))throw Error('Unknown crew member or role.');return Math.max(POWER_FLOOR_MEMBERS.has(id)?80:0,index>=7?(WILDCARD_100_MEMBERS.has(id)?100:Math.max(...fit[id].slice(0,7))):fit[id][index]);}
export function spinSlot(kind,progress,role,ids,randomInt){if(!canBuildCrew(kind,progress))throw Error(crewUnlockMessage(kind));if(!CREW_ROLES.includes(role))throw Error('Unknown role.');const eligible=FEATURED_ROSTER.filter(c=>introduced(c,kind,progress));if(eligible.length<10)throw Error('Meet at least ten featured characters before assembling a full crew.');const pool=eligible.filter(c=>!ids.includes(c.id)&&(perfectCount(ids)<9||roleScore(c.id,role)<100)),weighted=pool.flatMap(c=>Array(roleScore(c.id,role)>=96?1:4).fill(c.id));if(!weighted.length)throw Error('No eligible draw remains under the nine-perfect-berth rule.');const index=randomInt(weighted.length);if(!Number.isInteger(index)||index<0||index>=weighted.length)throw Error('Invalid random draw.');return weighted[index];}
export function scoreCrew(ids){if(!Array.isArray(ids)||ids.length!==10||new Set(ids).size!==10)throw Error('A crew needs ten distinct members.');let perfect=0;const points=ids.map((id,i)=>{const n=roleScore(id,CREW_ROLES[i]);return n===100&&++perfect>9?99:n;}),total=Math.min(999,points.reduce((a,b)=>a+b,0));return {scoringVersion:8,total,points,tier:total===1000?'PIRATE KING CREW':total>=990?'LEGENDARY CREW':total>=850?'EMPEROR CREW':total>=700?'NEW WORLD CREW':total>=500?'GRAND LINE CREW':'EAST BLUE CREW',max:1000};}
export function spinCrew(kind,progress,randomInt){const ids=[];for(const role of CREW_ROLES)ids.push(spinSlot(kind,progress,role,ids,randomInt));return {ids,...scoreCrew(ids),kind,progress,version:2};}
export function projectCrew(run,kind,value){return run&&run.ids.every(id=>{const c=FEATURED_ROSTER.find(c=>c.id===id);return c&&introduced(c,kind,value);})?{...run,...scoreCrew(run.ids)}:null;}
export const CREW_RULES='Reveal one character, then assign them to any empty berth. Assign before drawing again. Characters and filled berths cannot be rerolled or moved; start a new voyage to try again. No duplicates or characters beyond your checkpoint. Each eligible character whose best role scores 96–100 has draw weight 1; others have weight 4. Exact odds change with progress and previous draws. Role points are revealed only after you commit a character to a berth. Wildcard uses the character’s best specialist score, with designated elite fighters receiving 100 for overall utility. Primary captains have the same leadership score as Vice Captain. Dedicated vice captains score ten points less as Captain. Three support berths each accept either skill: Navigator / Archaeologist, Cook / Musician, and Doctor / Shipwright. Each uses the higher skill score, never an average, so either specialist can fill the berth. Every Straw Hat scores 100 in their specialist berth; navigation also rewards expert helmsmanship. Designated top fighters have a minimum of 80 in every role, with specialist bonuses above that floor. These are editorial game choices, not claims of professional training. The maximum voyage score is 999: at most nine berths can score 100. After nine perfect placements, draws exclude anyone who could score 100 in an empty role. Existing ten-perfect lineups have their final perfect berth scored 99 under current rules. Keep trying for your best crew. No pity boosts. Editorial game scores, not canonical power levels. Retained crew lineups are scored under the current balance.';

const bestFit=Object.fromEntries(Object.entries(fit).map(([id,scores])=>[id,WILDCARD_100_MEMBERS.has(id)?100:Math.max(...scores.slice(0,7))]));
export const perfectCount=ids=>ids.reduce((n,id,i)=>n+(id&&roleScore(id,CREW_ROLES[i])===100?1:0),0);
export function drawCharacter(kind,progress,ids,randomInt,slots=ids){if(!canBuildCrew(kind,progress))throw Error(crewUnlockMessage(kind));const eligible=FEATURED_ROSTER.filter(c=>introduced(c,kind,progress));if(eligible.length<10)throw Error('Meet at least ten featured characters before assembling a full crew.');const empty=CREW_ROLES.filter((_,i)=>!slots[i]);const pool=eligible.filter(c=>!ids.includes(c.id)&&(perfectCount(slots)<9||empty.every(role=>roleScore(c.id,role)<100))),weighted=pool.flatMap(c=>Array(bestFit[c.id]>=96?1:4).fill(c.id));if(!weighted.length)throw Error('No eligible draw remains under the nine-perfect-berth rule.');const i=randomInt(weighted.length);if(!Number.isInteger(i)||i<0||i>=weighted.length)throw Error('Invalid random draw.');return weighted[i];}
