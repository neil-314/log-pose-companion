import {JSDOM} from 'jsdom';import fs from 'node:fs';import assert from 'node:assert/strict';
import {plan} from '../public/planner.js';import * as companion from '../public/companion-data.js';import {unlockedTrivia} from '../public/trivia.js';
import * as advanced from '../public/advanced-trivia.js';import * as names from '../public/dex-names.js';import * as discovery from '../public/discovery.js';
const root=new URL('../public/',import.meta.url),dom=new JSDOM(fs.readFileSync(new URL('index.html',root),'utf8'),{url:'https://logpose.test',runScripts:'outside-only'}),w=dom.window;
w.scrollTo=()=>{};w.matchMedia=()=>({matches:false});w.AbortSignal=AbortSignal;
// A previous account's browser cache must never be adopted into guest mode.
w.localStorage.setItem('lp-companion',JSON.stringify({kind:'anime',anime:1000,manga:1000,skipped:0,rewatched:0,history:[],updatedAt:Date.now()}));
let writes=0;w.fetch=async(url,options={})=>{if(options.method==='PUT'||options.method==='POST')writes++;if(url==='/api/profile')return {ok:false,status:401,json:async()=>({error:'Sign in to sync progress.'})};return {ok:true,status:200,json:async()=>({arcs:[],characters:[],mine:[],signedIn:false})};};
w.qa={plan,loadRoute:async()=>({mode:'basic',episodes:[]}),...companion,...advanced,...names,...discovery,unlockedTrivia};
for(const [file,names] of [['app.js','plan,loadRoute'],['companion.js','ARCS,CHARACTERS,arcAt,completedArcs,timeStats,validateState,revisitStats,unlockedTrivia,DIFFICULTIES,checkTypedAnswer,selectRound,canonicalCharacter,normalizeCatalogue,matchesCharacter,MOVIES,COVERS,unlockedDiscovery']])w.eval(`(function(){const {${names}}=window.qa;${fs.readFileSync(new URL(file,root),'utf8').replace(/^import .*;\r?\n/gm,'')}})()`);
await new Promise(r=>setTimeout(r,30));const $=id=>w.document.getElementById(id);assert.equal($('current').value,'0');assert.match($('account-link').textContent,/Open account edition/);
$('current').value='500';$('next-0').click();$('series-passes').value='2';$('series-length').value='500';$('add-series').click();assert.match($('series-message').textContent,/2 revisits/);
await new Promise(r=>setTimeout(r,600));assert.equal(writes,0);assert.equal(JSON.parse(w.localStorage.getItem('lp-companion')).anime,1000);assert.match($('sync-status').textContent,/Guest voyage/);assert.match($('account-link').getAttribute('href'),/^\/signin-with-chatgpt/);assert.equal($('account-link').target,'_top');
console.log('Guest smoke passed: stale account cache ignored, anonymous exploration works, no profile writes or durable progress saves.');w.close();

