import {JSDOM} from 'jsdom';import fs from 'node:fs';import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8'),source=fs.readFileSync(new URL('../public/auth.js',import.meta.url),'utf8');
const tick=()=>new Promise(r=>setTimeout(r,20));
async function setup(configured=true){
 const w=new JSDOM(html,{url:'https://logpose.test',runScripts:'outside-only'}).window;
 w.AbortSignal=AbortSignal;w.confirm=()=>true;
 const calls=[];let failVerify=true,failLoad=true,loads=0;
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};
 w.fetch=async(url,options={})=>{const body=options.body?JSON.parse(options.body):null;calls.push(body);if(!body)return {ok:true,json:async()=>({configured,user:null})};if(body.action==='verify'&&failVerify)return {ok:false,json:async()=>({error:'Invalid or expired code.'})};return {ok:true,json:async()=>({ok:true,message:'Check your inbox.'})};};
 w.lpLoadAccount=async()=>{loads++;if(failLoad)throw Error('Storage unavailable. Retry loading your logbook.');};
 w.eval(source);await tick();return {w,calls,setVerify:v=>failVerify=v,setLoad:v=>failLoad=v,loads:()=>loads};
}
{
 const s=await setup(),$=id=>s.w.document.getElementById(id);
 $('account-link').click();assert.equal($('account-dialog').open,true);assert.equal(s.w.document.activeElement.id,'account-email');
 $('account-email').value='pirate@example.com';await $('account-form').onsubmit({preventDefault(){}});assert.equal($('account-code-field').hidden,false);
 $('account-code').value='123456';await $('account-form').onsubmit({preventDefault(){}});assert.match($('account-message').textContent,/expired/);assert.equal($('account-dialog').open,true);assert.equal(s.loads(),0);
 s.setVerify(false);await $('account-form').onsubmit({preventDefault(){}});assert.match($('account-message').textContent,/Storage unavailable/);const verifies=s.calls.filter(c=>c?.action==='verify').length;
 s.setLoad(false);await $('account-form').onsubmit({preventDefault(){}});assert.equal($('account-dialog').open,false);assert.equal(s.calls.filter(c=>c?.action==='verify').length,verifies);assert.equal(s.loads(),2);
}
{
 const s=await setup(false),$=id=>s.w.document.getElementById(id);$('account-link').click();assert.equal($('account-submit').disabled,true);assert.match($('account-message').textContent,/being set up/);assert.equal(s.calls.filter(Boolean).length,0);
}
console.log('Account dialog passed: optional entry, email code, invalid code, storage retry without reusing OTP, honest unconfigured state.');
