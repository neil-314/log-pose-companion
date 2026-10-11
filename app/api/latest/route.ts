async function get(url:string){const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 (compatible; LogPose/1.0)'},signal:AbortSignal.timeout(6000),cf:{cacheTtl:3600,cacheEverything:true}} as RequestInit);if(!r.ok)throw Error();return r;}
export async function GET(){
 const results=await Promise.allSettled([
 Promise.any([
 (async()=>{const html=await (await get('https://one-piece.com/anime/index.html')).text();const dated=[...html.matchAll(/<h3>\s*(?:第)?(\d+)話[\s\S]{0,1200}?<time datetime="(\d{4}-\d{2}-\d{2})"/g)].filter(m=>Date.parse(`${m[2]}T23:59:59+09:00`)<=Date.now()).map(m=>Number(m[1]));if(!dated.length)throw Error();return {count:Math.max(...dated),source:'ONE PIECE.com dated anime catalogue'};})(),
 (async()=>{const response=await fetch('https://graphql.anilist.co',{method:'POST',headers:{'Content-Type':'application/json','User-Agent':'Mozilla/5.0 (compatible; LogPose/1.0)'},body:JSON.stringify({query:'{ Page(perPage:1) { airingSchedules(mediaId:21,notYetAired:false,sort:TIME_DESC) { episode airingAt } } }'}),signal:AbortSignal.timeout(6000)});if(!response.ok)throw Error();const body=await response.json() as any;const entry=body.data?.Page?.airingSchedules?.[0];if(!Number.isInteger(entry?.episode)||entry.episode<1||entry.airingAt*1000>Date.now())throw Error();return {count:entry.episode,source:'AniList aired-episode catalogue'};})(),
 (async()=>{const first=await (await get('https://api.jikan.moe/v4/anime/21/episodes?page=1')).json() as any;const last=first.pagination?.last_visible_page;if(!Number.isInteger(last)||last<1||last>200)throw Error();const batch=last===1?first:await (await get(`https://api.jikan.moe/v4/anime/21/episodes?page=${last}`)).json() as any;const aired=batch.data.filter((e:any)=>e.aired&&Date.parse(e.aired)<=Date.now()).map((e:any)=>e.mal_id);if(!aired.length)throw Error();return {count:Math.max(...aired),source:'Jikan / MyAnimeList'};})()
 ]),
 (async()=>{const html=await (await get('https://www.viz.com/shonenjump/chapters/one-piece?locale=en')).text();const text=html.replace(/<[^>]+>/g,' ');const chapters=[...text.matchAll(/Ch\.\s*(\d{1,5})\b/g)].map(m=>Number(m[1]));if(!chapters.length)throw Error();return Math.max(...chapters);})()
 ]);
 const anime=results[0].status==='fulfilled'?results[0].value.count:null,manga=results[1].status==='fulfilled'?results[1].value:null;
 return Response.json({anime,manga,fetchedAt:Date.now(),sources:{anime:results[0].status==='fulfilled'?results[0].value.source:'Unavailable',manga:'VIZ chapter catalogue'}},{status:anime||manga?200:503,headers:{'Cache-Control':'no-store'}});
}
