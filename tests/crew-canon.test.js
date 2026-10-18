import test from 'node:test';import assert from 'node:assert/strict';import {JSDOM} from 'jsdom';
import {MANGA_CANON_IDS,isMangaCrewMember} from '../public/crew-canon.js';import {CREW_ROSTER} from '../public/featured-roster.js';import {roleScore,projectCrew} from '../public/crew-game.js';import {characterRoleExplanation} from '../public/crew-explanations.js';import {enableSwipeReveal} from '../public/crew-reveal-controls.js';import {dispatch} from '../lib/forum-engine.js';import {seedForum} from '../lib/forum-preview-store.js';
test('unknown additions fail closed; removed and early checkpoint characters cannot survive a saved draft',()=>{
 assert.equal(isMangaCrewMember('unreviewed-film-character'),false);assert.deepEqual(new Set(CREW_ROSTER.map(c=>c.id)),MANGA_CANON_IDS);
 const s=seedForum(),u=s.users.find(u=>u.id==='caughtup');const call=(op,args={})=>dispatch(s,u.id,op,args,{demo:true,randomInt:()=>0});
 u.draft={version:3,kind:u.kind,progress:u[u.kind],ids:['rasa',...Array(9).fill(null)],pending:null};assert.equal(call('crew-state').draft,null);assert.ok(!call('crew-draw').draft.ids.includes('rasa'));
 u.draft={version:3,kind:u.kind,progress:u[u.kind],ids:Array(10).fill(null),pending:'uta'};assert.throws(()=>call('crew-assign',{role:'cook'}),/Reveal a character first/);
 assert.equal(projectCrew({ids:['rasa',...CREW_ROSTER.slice(0,9).map(c=>c.id)]},'manga',9999),null);
 u[u.kind]=1170;const ids=CREW_ROSTER.slice(0,9).map(c=>c.id);u.best={version:3,ids:['rasa',...ids],total:999};u.draft={version:3,kind:u.kind,progress:u[u.kind],ids:[...ids,null],pending:'jinbe'};const completed=call('crew-assign',{role:'wildcard3'});assert.ok(completed.best.ids.every(isMangaCrewMember));
 const rosinante=CREW_ROSTER.find(c=>c.id==='rosinante');assert.ok(rosinante.chapter>=767);assert.ok(rosinante.episode>=706);
});
test('support explanation names the skill rather than implying every doctor builds ships',()=>{
 assert.match(characterRoleExplanation('gerd','doctor','manga',1140).reason,/doctor.*Medical work.*rather than shipbuilding/i);
 assert.match(characterRoleExplanation('paulie','doctor').reason,/Shipwright side/i);
 assert.ok(roleScore('hongo','doctor')<80);assert.ok(roleScore('bonkpunch','cook')<80);
});
test('touch swipe reveals once; vertical scrolling, mouse drags and disabled controls do not',()=>{
 const dom=new JSDOM('<div id="tile"></div><button>Reveal</button>');const w=dom.window,tile=w.document.querySelector('div'),button=w.document.querySelector('button');let n=0;button.onclick=()=>n++;enableSwipeReveal(tile,button);
 const fire=(type,x,y,pointerType='touch')=>{const e=new w.Event(type);Object.assign(e,{clientX:x,clientY:y,pointerId:1,pointerType});tile.dispatchEvent(e);};
 fire('pointerdown',0,0);fire('pointerup',80,5);fire('pointerup',90,5);assert.equal(n,1);
 fire('pointerdown',0,0);fire('pointerup',5,90);fire('pointerdown',0,0,'mouse');fire('pointerup',90,0,'mouse');assert.equal(n,1);
 fire('pointerdown',0,0);fire('pointercancel',0,0);fire('pointerup',90,0);assert.equal(n,1);
 button.disabled=true;fire('pointerdown',0,0);fire('pointerup',90,0);assert.equal(n,1);assert.equal(tile.style.touchAction,'pan-y');dom.window.close();
});
