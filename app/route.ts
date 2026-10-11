import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
export async function GET(){return new Response(await readFile(join(process.cwd(),'public/index.html'),'utf8'),{headers:{'Content-Type':'text/html; charset=utf-8'}});}
