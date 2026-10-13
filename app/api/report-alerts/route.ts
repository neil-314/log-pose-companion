import {timingSafeEqual} from 'node:crypto';
import {deliverReportAlerts,reportMailReady} from '../../../lib/report-alert-server';
export const runtime='nodejs';export const maxDuration=60;
export async function GET(request:Request){const expected=process.env.CRON_SECRET,provided=request.headers.get('authorization')||'';const received=Buffer.from(provided),required=Buffer.from('Bearer '+expected);if(!expected||received.length!==required.length||!timingSafeEqual(received,required))return Response.json({error:'Unauthorized'},{status:401});if(!reportMailReady())return Response.json({configured:false},{status:503});try{return Response.json(await deliverReportAlerts({limit:5}));}catch{return Response.json({error:'Report queue unavailable'},{status:503});}}
