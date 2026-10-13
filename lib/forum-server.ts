import {createClient} from '@supabase/supabase-js';
import {randomInt,randomUUID} from 'node:crypto';
import {dispatch,ForumError} from './forum-engine.js';
export const harbourReady=()=>process.env.HARBOUR_ENABLED==='true'&&Boolean(process.env.SUPABASE_SECRET_KEY&&process.env.SUPABASE_URL);
export function harbourAdmin(){return createClient(process.env.SUPABASE_URL!,process.env.SUPABASE_SECRET_KEY!,{auth:{persistSession:false,autoRefreshToken:false}});}
export async function harbourTransaction(account:any,op:string,args:any){
 const admin=harbourAdmin();
 for(let attempt=0;attempt<8;attempt++){
  const {data:row,error}=await admin.from('harbour_runtime').select('revision,payload').eq('id',1).single();
  if(error||!row)throw new ForumError('Harbour storage is temporarily unavailable.',503);
  const s=row.payload;
  const {data:book,error:bookError}=await account.client.from('logbooks').select('payload').eq('user_id',account.user.id).maybeSingle();
  if(bookError)throw new ForumError('Save your logbook and try again.',503);
  const log=book?.payload||{},state=log.state||{};
  let u=s.users.find((x:any)=>x.id===account.user.id);
  if(!u){u={id:account.user.id,handle:'Sailor_'+account.user.id.replaceAll('-','').slice(0,12),public:false,share:{progress:false,ratings:false,rankings:false,quiz:false,crew:false}};s.users.push(u);}
  u.verified=true;u.kind=state.kind==='manga'?'manga':'anime';u.anime=Number(state.anime)||0;u.manga=Number(state.manga)||0;
  u.ratings=log.ratings||{};u.rankings=(state.rankings||[]).map((x:any)=>x.id);u.quiz=state.quiz?{best:state.quiz.best,rounds:state.quiz.rounds}:null;
  u.moderator=(process.env.HARBOUR_MODERATOR_IDS||'').split(',').includes(account.user.id)||(process.env.HARBOUR_MODERATOR_EMAILS||'').toLowerCase().split(',').includes((account.user.email||'').toLowerCase());
  let result:any,domainError:any;try{result=dispatch(s,u.id,op,args,{randomInt,uuid:randomUUID});}catch(e){domainError=e;}
  if(Buffer.byteLength(JSON.stringify(s))>8000000)throw new ForumError('Harbour capacity reached. Please try later.',503);
  const {data:saved,error:saveError}=await admin.from('harbour_runtime').update({revision:row.revision+1,payload:s,updated_at:new Date().toISOString()}).eq('id',1).eq('revision',row.revision).select('revision');
  if(saveError)throw new ForumError('Harbour could not save this action. Please retry.',503);
  if(saved?.length){if(domainError)throw domainError;return result;}
 }
 throw new ForumError('Harbour is busy. Please retry in a moment.',409);
}
