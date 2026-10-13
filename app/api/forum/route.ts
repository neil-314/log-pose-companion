import {json} from '../../../lib/accounts';
import {transact} from '../../../lib/forum-preview-store';
export const runtime='nodejs';
export async function POST(request:Request){
 const host=new URL(request.url).hostname;
 if(process.env.NODE_ENV!=='development'||process.env.LP_PRIVATE_PREVIEW!=='true'||!['localhost','127.0.0.1'].includes(host))return json({error:'Not found.'},404);
 const origin=request.headers.get('origin');let validOrigin=false;try{const parsed=new URL(origin||'');validOrigin=parsed.protocol==='http:'&&['localhost','127.0.0.1'].includes(parsed.hostname)&&parsed.host===request.headers.get('host');}catch{} if(!validOrigin)return json({error:'Use the private preview origin.'},403);
 if(Number(request.headers.get('content-length'))>20000)return json({error:'Request too large.'},413);
 try{const raw=await request.text();if(raw.length>20000)return json({error:'Request too large.'},413);const body=JSON.parse(raw);const user=request.headers.get('x-preview-persona')||'early';if(!['early','caughtup','moderator'].includes(user))return json({error:'Unknown demo account.'},401);return json(await transact(user,body.op,body.args));}
 catch(e:any){return json({error:e.status?e.message:'The private preview could not complete this action.'},e.status||500);}
}

