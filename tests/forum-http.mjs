import assert from 'node:assert/strict';
const base=process.env.PRIVATE_TEST_URL||'http://127.0.0.1:4400';
async function call(op,args={},persona='early',origin=base){const r=await fetch(base+'/api/forum',{method:'POST',headers:{'content-type':'application/json',origin,'x-preview-persona':persona},body:JSON.stringify({op,args})});return {status:r.status,body:await r.json()};}
assert.equal((await call('session',{},'early','https://example.com')).status,403);
assert.equal((await call('session',{},'invented')).status,401);
await call('checkpoint',{kind:'anime',value:100});
const feed=await call('feed');assert.equal(feed.status,200);assert.ok(!JSON.stringify(feed.body).includes('late-thread'));
assert.equal((await call('thread-detail',{id:'late-thread'})).status,404);
assert.equal((await call('feed',{query:'late'})).body.threads.length,0);
await call('crew-reset');let run;for(const role of ['captain','swordsman','navigator','cook','doctor','vicecaptain','sniper','wildcard1','wildcard2','wildcard3']){await call('crew-draw');run=await call('crew-assign',{role});}assert.equal(run.status,200);assert.equal(new Set(run.body.run.ids).size,10);
const best=await call('crew-best');assert.ok(best.body.best.total>=run.body.run.total);
const second=await call('crew-best');assert.deepEqual(second.body,best.body);
console.log('Private HTTP checks passed: origins, personas, spoiler gates, random crew, persisted best.');
