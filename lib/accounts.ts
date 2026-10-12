import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';
export const emailReady=()=>process.env.SUPABASE_EMAIL_READY==='true';
export const configured=()=>Boolean(process.env.SUPABASE_URL&&process.env.SUPABASE_PUBLISHABLE_KEY);
export const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store','Vary':'Cookie'}});
export const sameOrigin=(request:Request)=>request.headers.get('origin')===new URL(request.url).origin;
export async function accountClient(){
 if(!configured())throw Error('Account saving is not activated yet.');
 const jar=await cookies();
 return createServerClient(process.env.SUPABASE_URL!,process.env.SUPABASE_PUBLISHABLE_KEY!,{
  cookieOptions:{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/'},
  cookies:{getAll:()=>jar.getAll(),setAll:items=>{for(const {name,value,options} of items)jar.set(name,value,options);}}
 });
}
export async function verifiedAccount(){
 const client=await accountClient();
 const {data,error}=await client.auth.getUser();
 if(error||!data.user?.email_confirmed_at)return null;
 return {client,user:data.user};
}
