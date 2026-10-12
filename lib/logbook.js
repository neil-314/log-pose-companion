import {validateState,ARCS,CHARACTERS} from '../public/companion-data.js';
export function validateLogbook(raw){
 const state=validateState(raw.state??raw),ratings={};
 for(const [id,score] of Object.entries(raw.ratings??{})){
  if(!ARCS.some(a=>a.id===id)||!Number.isInteger(score)||score<1||score>10)throw Error('Invalid arc rating.');
  ratings[id]=score;
 }
 const favourite=raw.favourite??'';
 if(favourite!==''&&!CHARACTERS.some(c=>c.id===favourite))throw Error('Invalid favourite.');
 return {state,ratings,favourite};
}
