import snapshot from '../../../public/character-catalogue.json';
import {normalizeCatalogue} from '../../../public/dex-names.js';
export async function GET(){
 try{
  const r=await fetch('https://api.api-onepiece.com/v2/characters/en',{headers:{'User-Agent':'Mozilla/5.0 (compatible; LogPose/1.0)'},signal:AbortSignal.timeout(7000),cf:{cacheTtl:86400}} as RequestInit);
  if(!r.ok)throw Error('Catalogue unavailable');const data=await r.json() as {id:number,name:string}[];
  if(!Array.isArray(data)||data.length<100)throw Error('Invalid catalogue');
  return Response.json({characters:normalizeCatalogue(data.filter(c=>Number.isInteger(c.id)&&typeof c.name==='string').map(c=>({id:`dex-${c.id}`,name:c.name}))),source:snapshot.source,fetchedAt:new Date().toISOString(),cached:false},{headers:{'Cache-Control':'public, max-age=3600'}});
 }catch{return Response.json({...snapshot,characters:normalizeCatalogue(snapshot.characters),cached:true},{headers:{'Cache-Control':'public, max-age=300'}});}
}
