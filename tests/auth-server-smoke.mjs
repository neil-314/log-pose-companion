// Contract tests exercise actual Next routes against a local Supabase simulator.
// They do not replace live email delivery or PostgreSQL RLS verification.
import http from 'node:http';import {spawn} from 'node:child_process';import assert from 'node:assert/strict';import {once} from 'node:events';
const users={a:{id:'11111111-1111-4111-8111-111111111111',email:'a@example.test'},b:{id:'22222222-2222-4222-8222-222222222222',email:'b@example.test'}};
const now=Math.floor(Date.now()/1000);
const token=id=>['eyJhbGciOiJIUzI1NiJ9',Buffer.from(JSON.stringify({sub:users[id].id,aud:'authenticated',role:'authenticated',exp:now+3600,iat:now})).toString('base64url'),'test-signature'].join('.');
const store=new Map();let rejectUser=false;
const service=http.createServer(async(req,res)=>{
 let text='';for await(const c of req)text+=c;const body=text?JSON.parse(text):{};res.setHeader('Content-Type','application/json');
 const auth=req.headers.authorization?.slice(7),id=Object.keys(users).find(id=>token(id)===auth),user=id?{...users[id],aud:'authenticated',role:'authenticated',email_confirmed_at:'2026-10-12T00:00:00Z',app_metadata:{},user_metadata:{},created_at:'2026-10-12T00:00:00Z'}:null;
 const respond=(data,status=200)=>{res.statusCode=status;res.end(JSON.stringify(data));};
 if(req.url==='/auth/v1/otp')return respond({});
 if(req.url==='/auth/v1/verify'){
  if(body.token!=='123456')return respond({msg:'Invalid OTP'},400);
  const key=body.email.startsWith('b@')?'b':'a';return respond({access_token:token(key),refresh_token:'refresh-'+key,token_type:'bearer',expires_in:3600,user:{...users[key],aud:'authenticated',email_confirmed_at:'2026-10-12T00:00:00Z',app_metadata:{},user_metadata:{}}});
 }
 if(req.url==='/auth/v1/user')return user&&!rejectUser?respond(user):respond({msg:'Invalid JWT'},401);
 if(req.url?.startsWith('/auth/v1/logout'))return respond({});
 if(req.url?.startsWith('/rest/v1/logbooks')){
  if(!user)return respond({message:'Unauthorized'},401);
  if(req.method==='POST'){assert.equal(body.user_id,user.id);store.set(user.id,body.payload);return respond({});}
  const rows=store.has(user.id)?[{payload:store.get(user.id)}]:[];return respond(rows);
 }
 return respond({message:'Unexpected simulator request: '+req.url},404);
});
service.listen(0,'127.0.0.1');await once(service,'listening');const supabase='http://127.0.0.1:'+service.address().port;
const app='http://localhost:4398';let output='';
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--port','4398'],{cwd:new URL('..',import.meta.url),env:{...process.env,SUPABASE_URL:supabase,SUPABASE_PUBLISHABLE_KEY:'simulator-key',SUPABASE_EMAIL_READY:'true'},stdio:['ignore','pipe','pipe']});child.stdout.on('data',d=>output+=d);child.stderr.on('data',d=>output+=d);
try{
 let ready=false;for(let n=0;n<100;n++){try{const r=await fetch(app+'/api/auth');if(r.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}assert.ok(ready,output);
 const call=(path,body,cookie='',origin=app)=>fetch(app+path,{method:body===undefined?'GET':path==='/api/profile'?'PUT':'POST',headers:{'Content-Type':'application/json',Origin:origin,Cookie:cookie},body:body===undefined?undefined:JSON.stringify(body)});
 assert.equal((await call('/api/profile')).status,401);
 assert.equal((await call('/api/auth',{action:'send',email:'a@example.test'},'','https://evil.test')).status,403);
 assert.equal((await call('/api/auth',{action:'send',email:'invalid'})).status,400);
 assert.equal((await call('/api/auth',{action:'verify',email:'a@example.test',code:'999999'})).status,400);
 async function login(email){const r=await call('/api/auth',{action:'verify',email,code:'123456'});assert.equal(r.status,200);const headers=r.headers.getSetCookie();assert.ok(headers.some(s=>/HttpOnly/i.test(s)));assert.ok(headers.some(s=>/SameSite=lax/i.test(s)));return headers.map(c=>c.split(';')[0]).join('; ');}
 const a=await login('a@example.test'),b=await login('b@example.test');
 const state={kind:'anime',anime:500,manga:586,skipped:0,rewatched:0,history:[],notes:[{kind:'anime',value:500,text:'Private note',at:'2026-10-12T00:00:00Z'}]};
 assert.equal((await call('/api/profile',{state,ratings:{marineford:9},favourite:'sogeking',user_id:users.b.id},a)).status,200);
 assert.equal((await (await call('/api/profile',undefined,a)).json()).state.anime,500);
 assert.equal((await (await call('/api/profile',undefined,b)).json()).state,null);
 assert.equal(store.has(users.b.id),false);
 assert.equal((await call('/api/profile',{state:{...state,anime:-1}},a)).status,400);
 rejectUser=true;assert.equal((await call('/api/profile',undefined,a)).status,401);rejectUser=false;
 const logout=await call('/api/auth',{action:'logout'},a);assert.equal(logout.status,200);assert.ok(logout.headers.getSetCookie().some(c=>/Max-Age=0/i.test(c)));
 console.log('Server auth contract passed: verified cookies, CSRF, invalid OTP, account-scoped persistence, forged identity rejected, invalid payload and sign-out. Live provider email/RLS still require separate verification.');
}finally{child.kill();await new Promise(resolve=>service.close(resolve));}
