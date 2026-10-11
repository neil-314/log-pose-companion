export async function GET(){return Response.json({error:'Account saving is available on the linked ChatGPT Sites edition.'},{status:401});}
export async function PUT(){return Response.json({error:'Use the account edition to save.'},{status:401});}
export const POST=PUT;
