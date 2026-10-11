export async function GET(){return Response.json({error:'Community aggregates are available in the linked account edition.'},{status:503});}
export async function POST(){return Response.json({error:'Use the account edition to contribute.'},{status:401});}
