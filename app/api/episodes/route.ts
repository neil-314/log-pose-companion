export async function GET(request:Request){
 const page=Number(new URL(request.url).searchParams.get('page'));
 if(!Number.isInteger(page)||page<1||page>200)return Response.json({error:'Invalid page.'},{status:400});
 try{
  const response=await fetch('https://api.jikan.moe/v4/anime/21/episodes?page='+page,{signal:AbortSignal.timeout(3000),next:{revalidate:3600}});
  if(!response.ok)throw Error();const body=await response.json();if(!Array.isArray(body.data)||!body.pagination)throw Error();
  return Response.json({...body,source:'Jikan / MyAnimeList',flagsAvailable:true},{headers:{'Cache-Control':'public, max-age=3600'}});
 }catch{}
 try{
  const response=await fetch('https://api.api-onepiece.com/v2/episodes/en',{signal:AbortSignal.timeout(8000),next:{revalidate:3600}});
  if(!response.ok)throw Error();const rows=await response.json();if(!Array.isArray(rows))throw Error();
  const episodes=rows.map((e:any)=>({mal_id:Number(String(e.number).replace(/[^0-9]/g,'')),title:e.title,aired:e.release_date})).filter((e:any)=>Number.isInteger(e.mal_id)&&e.mal_id>0&&e.aired&&new Date(e.aired).getTime()<=Date.now()).sort((a:any,b:any)=>a.mal_id-b.mal_id);
  if(!episodes.length)throw Error();const start=(page-1)*100;
  return Response.json({data:episodes.slice(start,start+100),pagination:{has_next_page:start+100<episodes.length},source:'One Piece API',flagsAvailable:false},{headers:{'Cache-Control':'public, max-age=3600'}});
 }catch{return Response.json({error:'Both episode sources are unavailable. Please retry shortly.'},{status:503});}
}
