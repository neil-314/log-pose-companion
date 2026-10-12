import test from 'node:test';import assert from 'node:assert/strict';import {validateContribution} from '../lib/community.js';
test('community validates scores and identities without accepting user IDs',()=>{
 assert.deepEqual(validateContribution({type:'arc',id:'marineford',score:9,user_id:'forged'}),{kind:'arc',item_id:'marineford',score:9});
 assert.equal(validateContribution({type:'character',id:'sogeking'}).item_id,'sogeking');
 for(const raw of [{type:'arc',id:'marineford',score:11},{type:'arc',id:'missing',score:5},{type:'character',id:'missing'},null])assert.throws(()=>validateContribution(raw));
});
