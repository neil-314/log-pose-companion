import {accountClient,configured,json,sameOrigin,verifiedAccount} from '../../../lib/accounts';
import {validateContribution} from '../../../lib/community';
export async function GET(){
 if(!configured())return json({error:'Community data is temporarily unavailable.'},503);
 try{
  const account=await verifiedAccount(),client=account?.client??await accountClient();
  const {data,error}=await client.rpc('community_summary');
  if(error)return json({error:'Could not load community results.'},503);
  let mine:any[]=[];
  if(account){const result=await client.from('community_votes').select('kind,item_id,score').eq('user_id',account.user.id);if(result.error)throw result.error;mine=result.data??[];}
  return json({...data,signedIn:Boolean(account),mine:mine.filter(r=>r.kind==='arc').map(r=>({arc_id:r.item_id,score:r.score})),favourite:mine.find(r=>r.kind==='character')?{character_id:mine.find(r=>r.kind==='character').item_id}:null});
 }catch{return json({error:'Community data is temporarily unavailable.'},503);}
}
export async function POST(request:Request){
 if(!sameOrigin(request))return json({error:'Please vote from this site.'},403);
 try{
  const account=await verifiedAccount();if(!account)return json({error:'Sign in to publish your rating or vote. Your selection is kept for this visit.'},401);
  const text=await request.text();if(Buffer.byteLength(text)>2048)return json({error:'Vote is too large.'},413);
  let vote;try{vote=validateContribution(JSON.parse(text));}catch{return json({error:'Choose a valid arc score or character.'},400);}
  const {error}=await account.client.from('community_votes').upsert({user_id:account.user.id,...vote,slot:vote.kind==='arc'?vote.item_id:'favourite'},{onConflict:'user_id,kind,slot'});
  if(error)return json({error:'Could not publish your vote. Please retry.'},503);
  return json({ok:true});
 }catch{return json({error:'Community publishing is temporarily unavailable.'},503);}
}
