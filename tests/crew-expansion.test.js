import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {CREW_ROSTER,introduced} from '../public/featured-roster.js';import {CREW_ROLES,roleScore,drawCharacter} from '../public/crew-game.js';import {canBuildCrew,CREW_UNLOCK} from '../public/crew-access.js';import {characterRoleExplanation} from '../public/crew-explanations.js';
import {dispatch} from '../lib/forum-engine.js';import {seedForum} from '../lib/forum-preview-store.js';
test('expanded roster covers official top 100 and twenty qualified candidates per specialist berth',()=>{
 assert.ok(CREW_ROSTER.length>200);assert.equal(new Set(CREW_ROSTER.map(c=>c.id)).size,CREW_ROSTER.length);
 const poll=JSON.parse(fs.readFileSync('docs/crew-popularity-2026.json'));assert.equal(poll.top100.length,100);for(const c of poll.top100)assert.ok(CREW_ROSTER.some(x=>x.id===c.crewId),c.name);
 for(const role of CREW_ROLES.slice(0,7))assert.ok(CREW_ROSTER.filter(c=>c.roleFits.includes(role)).length>=20,role);
 assert.ok(CREW_ROSTER.some(c=>c.roleFits.includes('cook')&&roleScore(c.id,'cook')<90));assert.equal(roleScore('hancock','cook'),82);
});
test('every added character is bounded, explained, spoiler-gated and uses an existing portrait when supplied',()=>{
 for(const c of CREW_ROSTER){assert.ok(Number.isInteger(c.chapter)&&c.chapter>0,c.id);assert.ok(c.episode===null||Number.isInteger(c.episode)&&c.episode>0,c.id);if(c.src)assert.ok(fs.existsSync('public/'+c.src),c.id);
  for(const kind of ['anime','manga']){const gate=c[kind==='anime'?'episode':'chapter'];if(gate===null){assert.equal(introduced(c,kind,100000),false);continue;}assert.equal(introduced(c,kind,gate-1),false);assert.equal(introduced(c,kind,gate),true);}
  for(const role of CREW_ROLES){const row=characterRoleExplanation(c.id,role,'manga',2000);assert.equal(row.role,role);assert.equal(row.score,roleScore(c.id,role));assert.ok(row.reason.length>50);assert.ok(row.score>=0&&row.score<=100);}
 }
});
test('game access locks before Baratie in both media and server rejects bypasses',()=>{
 for(const kind of ['anime','manga']){const gate=CREW_UNLOCK[kind];assert.equal(canBuildCrew(kind,gate-1),false);assert.equal(canBuildCrew(kind,gate),true);assert.throws(()=>drawCharacter(kind,gate-1,[],()=>0),/unlocks after/);
 const s=seedForum(),u=s.users[0];u.kind=kind;u[kind]=gate-1;for(const op of ['crew-state','crew-reset','crew-draw','crew-assign','crew-best'])assert.throws(()=>dispatch(s,u.id,op,{role:'captain'},{randomInt:()=>0,demo:true}),e=>e.status===403&&/unlocks after/.test(e.message));}
});
test('locked character never appears in boundary draws and null anime gates remain inaccessible',()=>{
 const c=CREW_ROSTER.find(c=>c.id==='shamrock');let seen=false;for(let i=0;i<1500;i++){const before=drawCharacter('anime',c.episode-1,[],n=>i%n);assert.notEqual(before,c.id);const after=drawCharacter('anime',c.episode,[],n=>i%n);if(after===c.id)seen=true;}assert.ok(seen);
});
