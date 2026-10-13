import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
export async function GET(){return new Response((await readFile(join(process.cwd(),'public/index.html'),'utf8')).replace('<body>','<body data-private-preview="'+String(process.env.NODE_ENV==='development'&&process.env.LP_PRIVATE_PREVIEW==='true')+'">'),{headers:{'Content-Type':'text/html; charset=utf-8'}});}
