import {spawn} from 'node:child_process';
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname','127.0.0.1','--port','4400'],{stdio:'inherit',env:{...process.env,LP_PRIVATE_PREVIEW:'true'}});child.on('exit',code=>process.exit(code??1));
