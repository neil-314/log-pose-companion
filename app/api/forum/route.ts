import {after} from 'next/server';
import {deliverReportAlerts,reportMailReady} from '../../../lib/report-alert-server';
import {json,verifiedAccount,sameOrigin} from '../../../lib/accounts';
import {transact} from '../../../lib/forum-preview-store';
import {harbourReady,harbourTransaction} from '../../../lib/forum-server';
export const runtime='nodejs';export const maxDuration=30;
export async function POST(request:Request){
 const host=new URL(request.url).hostname;
 const demo=process.env.NODE_ENV==='development'&&process.env.LP_PRIVATE_PREVIEW==='true'&&['localhost','127.0.0.1'].includes(host);
 if(!demo&&!harbourReady())return json({error:'Harbour is not available yet.'},503);
 const origin=request.headers.get('origin');let validOrigin=false;try{const parsed=new URL(origin||'');validOrigin=demo?parsed.protocol==='http:'&&['localhost','127.0.0.1'].includes(parsed.hostname)&&parsed.host===request.headers.get('host'):sameOrigin(request);}catch{}
 if(!validOrigin)return json({error:'Please use Harbour from this site.'},403);
 if(Number(request.headers.get('content-length'))>20000)return json({error:'Request too large.'},413);
 try{
  const raw=await request.text();if(Buffer.byteLength(raw)>20000)return json({error:'Request too large.'},413);
  let body;try{body=JSON.parse(raw);}catch{return json({error:'Invalid request.'},400);}
  if(demo){const user=request.headers.get('x-preview-persona')||'early';if(!['early','caughtup','moderator'].includes(user))return json({error:'Unknown demo account.'},401);return json(await transact(user,body.op,body.args));}
  const account=await verifiedAccount();if(!account)return json({error:'Sign in with your verified email to use Harbour.'},401);
  const result=await harbourTransaction(account,body.op,body.args||{});if(body.op==='moderation')result.emailAlertsConfigured=reportMailReady();if(body.op==='report'&&result.id)after(async()=>{try{await deliverReportAlerts({id:result.id,limit:1});}catch{console.error('Report email remains queued for retry.');}});return json(result);
 }catch(e:any){return json({error:e.status?e.message:'Harbour is temporarily unavailable.'},e.status||500);}
}
