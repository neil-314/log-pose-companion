import {JSDOM} from 'jsdom';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const dom=new JSDOM('<button id="motion">motion</button><button id="open">open</button>',{runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window;w.matchMedia=()=>({matches:false,addEventListener(){}});w.eval(await readFile(new URL('../public/experience.js',import.meta.url),'utf8'));
w.document.getElementById('open').focus();w.dispatchEvent(new w.Event('lp:open'));assert.ok(w.document.querySelector('[role="dialog"]'));assert.equal(w.document.activeElement.className,'voyage-skip');w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(w.document.querySelector('.grand-voyage'),null);assert.equal(w.document.activeElement.id,'open');
w.document.body.classList.add('reduce-motion');w.dispatchEvent(new w.Event('lp:open'));assert.equal(w.document.querySelector('.grand-voyage'),null);w.document.body.classList.remove('reduce-motion');w.dispatchEvent(new w.Event('lp:open'));w.document.querySelector('.voyage-skip').click();assert.equal(w.document.querySelector('.grand-voyage'),null);dom.window.close();console.log('Departure animation: dialog, Escape, Skip, focus restoration and reduced motion passed.');
