export async function GET(request:Request){
 const page=Number(new URL(request.url).searchParams.get('page'));
 if(!Number.isInteger(page)||page<1||page>200)return Response.json({error:'Invalid page.'},{status:400});
 try{const response=await fetch(`https://api.jikan.moe/v4/anime/21/episodes?page=${page}`,{headers:{'User-Agent':'Mozilla/5.0 (compatible; LogPose/1.0)'},signal:AbortSignal.timeout(6000),cf:{cacheTtl:3600,cacheEverything:true}} as RequestInit);if(!response.ok)throw Error();const data=await response.json();return Response.json(data,{headers:{'Cache-Control':'public, max-age=3600'}});}catch{return Response.json({error:'Episode service is unavailable.'},{status:503});}
}
