(function(){
 let pending=null;
 async function api(op,args={}){const r=await fetch('/api/forum',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({op,args})});const data=await r.json();if(!r.ok)throw Error(data.error||'Could not save your username.');return data;}
 window.lpEnsureUsername=()=>pending||(pending=(async()=>{
  if(document.body.dataset.crewOnly==='true'||document.body.dataset.demo==='true')return;
  let user;try{({user}=await api('session'));}catch{return;}
  if(!user?.needsUsername)return;
  // Pause the tour while the account owner chooses their identity.
  window.dispatchEvent(new Event('lp:username-opening'));
  return new Promise(resolve=>{
   const d=document.createElement('dialog');d.className='tour-dialog username-dialog';d.setAttribute('aria-labelledby','username-heading');
   d.innerHTML='<form><p class="tour-progress">WELCOME ABOARD</p><h2 id="username-heading">Choose your sailor name</h2><p>Your email stays private. Pick a unique username for Harbour. Your profile stays private until you choose to share it.</p><label for="sailor-name">Username</label><input id="sailor-name" name="username" autocomplete="username" minlength="3" maxlength="24" pattern="[a-zA-Z0-9_]+" required aria-describedby="username-help"><p id="username-help">3–24 letters, numbers or underscores. Usernames are unique. You can report profiles that break the rules.</p><p role="status" aria-live="polite"></p><div class="tour-actions"><button type="button" class="back">Later</button><button class="primary" type="submit">Reserve my username</button></div></form>';
   document.body.append(d);let busy=false;const done=()=>{if(busy)return;d.close();d.remove();resolve();window.dispatchEvent(new Event('lp:username-closed'));};
   d.querySelector('[type=button]').onclick=done;d.addEventListener('cancel',e=>{e.preventDefault();done();});
   d.querySelector('form').onsubmit=async e=>{e.preventDefault();if(busy)return;busy=true;d.querySelectorAll('button').forEach(b=>b.disabled=true);try{await api('username',{handle:d.querySelector('input').value.trim()});busy=false;done();window.dispatchEvent(new Event('lp:username-saved'));}catch(e){d.querySelector('[role=status]').textContent=e.message;}finally{busy=false;d.querySelectorAll('button').forEach(b=>b.disabled=false);}};
   d.showModal();d.querySelector('input').focus();
  });
 })().finally(()=>{pending=null;}));
 window.addEventListener('lp:account-ready',()=>{if(window.lpSignedIn&&!document.querySelector('#account-dialog[open]'))window.lpEnsureUsername();});
 document.addEventListener('DOMContentLoaded',()=>{if(document.body.dataset.harbour==='true')window.lpEnsureUsername();});
})();
