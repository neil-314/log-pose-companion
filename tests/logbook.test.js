import test from 'node:test';
import assert from 'node:assert/strict';
import {validateLogbook} from '../lib/logbook.js';
const state={kind:'anime',anime:500,manga:586,skipped:0,rewatched:0,history:[],notes:[{kind:'anime',value:500,text:'A memory',at:'2026-10-12T12:00:00Z'}],rankings:[{id:'sogeking',name:'Sogeking'}]};
test('account payload preserves notes, rankings, ratings and revisits together',()=>{
 const payload=validateLogbook({state:{...state,voyages:[{kind:'manga',length:586,passes:3,at:'2026-10-12T12:00:00Z'}]},ratings:{marineford:9},favourite:'sogeking',user_id:'someone-else'});
 assert.equal(payload.state.notes[0].text,'A memory');assert.equal(payload.state.rankings[0].id,'sogeking');assert.equal(payload.state.voyages[0].passes,3);assert.equal(payload.ratings.marineford,9);assert.equal(payload.favourite,'sogeking');assert.equal(payload.user_id,undefined);
});
test('account payload rejects invalid state, ratings and favourite IDs',()=>{
 for(const raw of [{state:{...state,anime:-1}},{state,ratings:{marineford:11}},{state,ratings:{invented:5}},{state,favourite:'someone-else'}])assert.throws(()=>validateLogbook(raw));
});

test('dated ratings survive account validation and old logbooks default to empty history',()=>{const event={id:'marineford',score:9,at:'2026-10-17T12:00:00.000Z'};assert.deepEqual(validateLogbook({state:{...state,ratingHistory:[event]}}).state.ratingHistory,[event]);assert.deepEqual(validateLogbook({state}).state.ratingHistory,[]);for(const rating of [{...event,id:'missing'},{...event,score:11},{...event,at:'invalid'}])assert.throws(()=>validateLogbook({state:{...state,ratingHistory:[rating]}}));});
