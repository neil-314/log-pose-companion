import {accountClient,configured,emailReady,json,sameOrigin,verifiedAccount} from '../../../lib/accounts';
export async function GET(){
 if(!configured())return json({configured:false,user:null});
 try{const account=await verifiedAccount();return json({configured:emailReady(),user:account?{id:account.user.id,email:account.user.email}:null});}
 catch{return json({error:'Account service is temporarily unavailable.'},503);}
}
export async function POST(request:Request){
 if(!sameOrigin(request))return json({error:'Please use the account form on this site.'},403);
 if(!configured())return json({error:'Account saving is not activated yet. Explore as a guest and export your logbook.'},503);
 try{
  const text=await request.text();if(Buffer.byteLength(text)>4096)return json({error:'Request too large.'},413);
  const body=JSON.parse(text),client=await accountClient();
  if(body.action==='logout'){
   const {error}=await client.auth.signOut();
   if(error)return json({error:'Sign-out failed. Please try again.'},503);
   return json({ok:true});
  }
  const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';
  if(email.length>254||!/^\S+@\S+\.\S+$/.test(email))return json({error:'Enter a valid email address.'},400);
  if(body.action==='send'){
   if(!emailReady())return json({error:'Email sign-in is still being set up. You can explore as a guest and export your logbook.'},503);
   const {error}=await client.auth.signInWithOtp({email,options:{shouldCreateUser:true}});
   if(error)return json({error:error.status===429?'Too many attempts. Wait a minute before trying again.':error.code==='email_address_not_authorized'?'Email sign-in is currently limited to invited testers. You can explore as a guest.':'Could not send a code. Please try again shortly.'},error.status===429?429:503);
   return json({ok:true,message:'Check your inbox for your sign-in code. It also verifies your email.'});
  }
  if(body.action==='verify'){
   if(typeof body.code!=='string'||!/^\d{6,10}$/.test(body.code))return json({error:'Enter the code from your email.'},400);
   const {data,error}=await client.auth.verifyOtp({email,token:body.code,type:'email'});
   if(error||!data.user?.email_confirmed_at)return json({error:'That code is invalid or expired. Request a new one.'},400);
   return json({ok:true,user:{id:data.user.id,email:data.user.email}});
  }
  return json({error:'Unknown account action.'},400);
 }catch{return json({error:'Could not complete this account request.'},400);}
}
