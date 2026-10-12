const $=id=>document.getElementById(id),dialog=$('account-dialog'),form=$('account-form');
let configured=false,sent=false,email='',busy=false,opener=null,verified=false;
async function request(body){
 const response=await fetch('/api/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(16000)});
 const data=await response.json();if(!response.ok)throw Error(data.error||'Account request failed.');return data;
}
function close(){if(busy)return;dialog.close();opener?.focus();}
$('account-close').onclick=close;
dialog.addEventListener('cancel',e=>{if(busy)e.preventDefault();});
$('account-link').onclick=async()=>{
 if(window.lpSignedIn){
  $('signout-message').textContent='';$('signout-dialog').showModal();$('signout-cancel').focus();return;
 }
 opener=document.activeElement;dialog.showModal();$('account-email').focus();
};
$('account-change').onclick=()=>{sent=false;verified=false;$('account-code-field').hidden=true;$('account-email').readOnly=false;$('account-submit').textContent='Send sign-in code';$('account-message').textContent='';$('account-email').focus();};
form.onsubmit=async e=>{
 e.preventDefault();if(busy||!configured)return;
 busy=true;$('account-submit').disabled=true;$('account-change').disabled=true;$('account-close').disabled=true;
 try{
  if(!sent){
   email=$('account-email').value.trim();const data=await request({action:'send',email});sent=true;
   $('account-code-field').hidden=false;$('account-email').readOnly=true;$('account-submit').textContent='Verify & sign in';$('account-message').textContent=data.message;$('account-code').focus();
  }else{
   if(!verified){await request({action:'verify',email,code:$('account-code').value.trim()});verified=true;}
   $('account-submit').textContent='Load my logbook';
   await window.lpLoadAccount?.(true);
   $('account-message').textContent='Email verified. Welcome aboard!';dialog.close();opener?.focus();
  }
 }catch(error){$('account-message').textContent=error.message;}
 finally{busy=false;$('account-submit').disabled=!configured;$('account-change').disabled=false;$('account-close').disabled=false;}
};
(async()=>{
 try{const r=await fetch('/api/auth',{cache:'no-store',signal:AbortSignal.timeout(16000)});if(!r.ok)throw Error();const data=await r.json();configured=data.configured===true;}
 catch{$('account-message').textContent='Account service is temporarily unavailable. Guest exploration still works.';}
 $('account-submit').disabled=!configured;
 if(!configured&&!$('account-message').textContent)$('account-message').textContent='Account saving is being set up. For now, explore as a guest and export your logbook to keep it.';
})();

let signingOut=false;
$('signout-cancel').onclick=()=>{if(signingOut)return;$('signout-dialog').close();$('account-link').focus();};
$('signout-dialog').addEventListener('cancel',e=>{if(signingOut)e.preventDefault();});
$('signout-confirm').onclick=async()=>{
 if(signingOut)return;signingOut=true;$('signout-confirm').disabled=true;$('signout-cancel').disabled=true;$('signout-message').textContent='Saving your logbook before signing out…';
 try{await window.lpFlushAccount?.();await request({action:'logout'});window.location.reload();}
 catch(e){$('signout-message').textContent=e.message;}
 finally{signingOut=false;$('signout-confirm').disabled=false;$('signout-cancel').disabled=false;}
};
