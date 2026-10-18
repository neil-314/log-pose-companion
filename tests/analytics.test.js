import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
const source=readFileSync('public/analytics.js','utf8');
test('analytics drops non-page events and redacts sign-in query and fragment',()=>{
 const dom=new JSDOM('<head></head>',{url:'https://log-pose-companion.vercel.app/?signin=1&email=private@example.com#code=secret',runScripts:'outside-only'});
 dom.window.eval(source);
 const redact=dom.window.vaq[0][1];
 assert.equal(redact({type:'pageview',url:dom.window.location.href}).url,'https://log-pose-companion.vercel.app/');
 assert.equal(redact({type:'event',url:dom.window.location.href}),null);
 assert.equal(dom.window.document.querySelectorAll('script').length,1);
 dom.window.close();
});
test('local development does not send analytics',()=>{
 const dom=new JSDOM('<head></head>',{url:'http://localhost:4410',runScripts:'outside-only'});
 dom.window.eval(source);assert.equal(dom.window.va,undefined);assert.equal(dom.window.document.querySelector('script'),null);dom.window.close();
});
