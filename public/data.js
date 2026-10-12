export function basicRoute(current,count){
 if(!Number.isInteger(current)||current<0||current>100000)throw Error('Enter a whole episode number from 0 to 100000.');
 return Array.from({length:count},(_,i)=>({mal_id:current+i+1,unverified:true}));
}
export async function loadRoute(current,count,{fetcher=fetch,read=()=>null,write=()=>{},now=Date.now}={}){
 const start=Math.floor(current/100)+1;let episodes=[];let stale=false;let at=now();let source='Jikan / MyAnimeList',flagsAvailable=true;
 try{
  for(let page=start;page<start+3;page++){
   const key=`lp-page-${page}`,cached=read(key);let entry;
   if(cached&&now()-cached.at<86400000)entry=cached;
   else{try{const response=await fetcher(`/api/episodes?page=${page}`,{signal:AbortSignal.timeout(16000)});if(!response.ok)throw Error(`Episode service returned ${response.status}`);const body=await response.json();if(!Array.isArray(body.data)||!body.pagination)throw Error('Invalid episode data');entry={data:body.data,pagination:body.pagination,source:body.source,flagsAvailable:body.flagsAvailable,at:now()};write(key,entry);}catch(e){if(!cached)throw e;entry=cached;stale=true;}}
   source=entry.source||source;flagsAvailable=flagsAvailable&&entry.flagsAvailable!==false;episodes.push(...entry.data);at=Math.min(at,entry.at);
   if(episodes.filter(e=>e.mal_id>current&&e.filler!==true&&e.recap!==true).length>=count||!entry.pagination.has_next_page)break;
   await new Promise(r=>setTimeout(r,1100));
  }
  if(!episodes.some(e=>e.mal_id>current))return {episodes:[],mode:'verified',at,stale,source,flagsAvailable};
  return {episodes,mode:'verified',at,stale,source,flagsAvailable};
 }catch(e){return {episodes:basicRoute(current,count),mode:'basic',reason:e.message,at:now()};}
}
