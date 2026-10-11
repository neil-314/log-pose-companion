import {test} from 'node:test';
import assert from 'node:assert/strict';
import {basicRoute,loadRoute} from '../public/data.js';
test('episode 500 steady sailing has a usable six-episode outage route',async()=>{const r=await loadRoute(500,6,{fetcher:async()=>{throw Error('offline')}});assert.equal(r.mode,'basic');assert.deepEqual(r.episodes.map(e=>e.mal_id),[501,502,503,504,505,506]);assert.ok(r.episodes.every(e=>e.unverified));});
test('requests page 6 directly for episode 500 and uses live data',async()=>{let url;const r=await loadRoute(500,6,{fetcher:async u=>{url=u;return {ok:true,json:async()=>({data:basicRoute(500,6).map(({mal_id})=>({mal_id})),pagination:{has_next_page:true}})}}});assert.ok(url.endsWith('page=6'));assert.equal(r.mode,'verified');});
test('uses older cache on API failure and discloses staleness',async()=>{const r=await loadRoute(500,6,{fetcher:async()=>{throw Error('429')},read:()=>({at:1,data:basicRoute(500,6),pagination:{has_next_page:false}})});assert.equal(r.stale,true);assert.equal(r.mode,'verified');});
test('does not invent episodes beyond a verified catalogue',async()=>{const r=await loadRoute(9999,6,{fetcher:async()=>({ok:true,json:async()=>({data:[],pagination:{has_next_page:false}})})});assert.equal(r.episodes.length,0);assert.equal(r.mode,'verified');});

