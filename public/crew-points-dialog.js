// Called in the parent document for embedded games, so the overlay follows the screen,
// not the centre of a potentially tall iframe. Only the committed berth is supplied.
export function showCrewPointsDialog(doc,details,onClose=()=>{}){
 doc.querySelector('.crew-points-dialog')?.close();
 const dialog=doc.createElement('dialog');dialog.className='crew-points-dialog';
 const title=doc.createElement('h2');title.id='crew-points-title';title.textContent=`${details.name} · ${details.label}`;
 const score=doc.createElement('p');score.className='crew-points-score';score.textContent=`${details.score}/100 in this berth`;
 const reason=doc.createElement('p');reason.textContent=details.reason;
 const note=doc.createElement('p');note.className='fine';note.textContent='Editorial game rating, not an official character ranking.';
 const close=doc.createElement('button');close.type='button';close.className='primary';close.textContent='Back to my crew';close.setAttribute('aria-label','Close points explanation');close.onclick=()=>dialog.close();
 dialog.setAttribute('aria-labelledby',title.id);dialog.append(title,score,reason,note,close);
 dialog.addEventListener('close',()=>{dialog.remove();onClose();},{once:true});
 doc.body.append(dialog);dialog.showModal();close.focus();return dialog;
}
