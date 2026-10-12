import {configured,json,sameOrigin,verifiedAccount} from '../../../lib/accounts';
import {validateLogbook} from '../../../lib/logbook';
export async function GET(){
 if(!configured())return json({error:'Account saving is not activated yet.'},401);
 try{
  const account=await verifiedAccount();if(!account)return json({error:'Sign in to save your logbook.'},401);
  const {data,error}=await account.client.from('logbooks').select('payload').eq('user_id',account.user.id).maybeSingle();
  if(error)return json({error:'Could not load your saved logbook. Your current visit is unchanged.'},503);
  return json({user:{id:account.user.id,email:account.user.email},state:data?.payload?.state??null,ratings:data?.payload?.ratings??{},favourite:data?.payload?.favourite??''});
 }catch{return json({error:'Account storage is temporarily unavailable.'},503);}
}
export async function PUT(request:Request){
 if(!sameOrigin(request))return json({error:'Please save from this site.'},403);
 if(!configured())return json({error:'Account saving is not activated yet.'},401);
 try{
  const account=await verifiedAccount();if(!account)return json({error:'Sign in to save your logbook.'},401);
  const text=await request.text();if(Buffer.byteLength(text)>100000)return json({error:'Logbook is too large.'},413);
  let payload;try{payload=validateLogbook(JSON.parse(text));}catch{return json({error:'Invalid logbook. Check your progress and try again.'},400);}
  payload.state.updatedAt=Date.now();
  const {error}=await account.client.from('logbooks').upsert({user_id:account.user.id,payload,updated_at:new Date().toISOString()},{onConflict:'user_id'});
  if(error)return json({error:'Could not save your logbook. Export a copy and retry.'},503);
  return json(payload);
 }catch{return json({error:'Account storage is temporarily unavailable.'},503);}
}
