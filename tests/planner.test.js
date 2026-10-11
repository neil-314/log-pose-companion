import {test} from 'node:test';
import assert from 'node:assert/strict';
import {plan} from '../public/planner.js';
const data=[{mal_id:1},{mal_id:2,filler:true},{mal_id:3,recap:true},{mal_id:4},{mal_id:5}];
test('respects progress, time budget and both skip flags',()=>{const p=plan(data,{current:1,budget:48});assert.deepEqual(p.queue.map(e=>e.mal_id),[4,5]);assert.equal(p.skipped,2);assert.equal(p.minutes,48);});
test('includes flagged episodes when requested',()=>assert.deepEqual(plan(data,{current:1,budget:24,skipFiller:false}).queue.map(e=>e.mal_id),[2]));
test('empty future has zero weeks',()=>assert.equal(plan(data,{current:5,budget:24}).weeks,0));
test('rejects invalid inputs',()=>{for(const current of [-1,1.5,NaN])assert.throws(()=>plan(data,{current,budget:48}));assert.throws(()=>plan(data,{current:0,budget:0}));});

