import {ARCS,CHARACTERS} from '../public/companion-data.js';
export function validateContribution(raw){
 if(raw?.type==='arc'&&ARCS.some(a=>a.id===raw.id)&&Number.isInteger(raw.score)&&raw.score>=1&&raw.score<=10)return {kind:'arc',item_id:raw.id,score:raw.score};
 if(raw?.type==='character'&&CHARACTERS.some(c=>c.id===raw.id))return {kind:'character',item_id:raw.id,score:null};
 throw Error('Choose a valid arc score or character.');
}
