// Keep vertical page scrolling native; only a deliberate sideways touch reveals.
export function enableSwipeReveal(surface,button){
 let start=null;
 surface.style.touchAction='pan-y';
 surface.addEventListener('pointerdown',event=>{start=(event.pointerType==='touch'||event.pointerType==='pen')&&!button.disabled?{x:event.clientX,y:event.clientY,id:event.pointerId}:null;});
 surface.addEventListener('pointercancel',()=>{start=null;});
 surface.addEventListener('pointerup',event=>{const from=start;start=null;if(!from||from.id!==event.pointerId||button.disabled)return;const dx=event.clientX-from.x,dy=event.clientY-from.y;if(Math.abs(dx)>=60&&Math.abs(dy)<=35)button.click();});
}
