// Calendar years use UTC consistently across devices and exported recaps.
export function voyageRecap(state,ratings,arcs,year='all'){
 const inPeriod=at=>year==='all'||new Date(at).getUTCFullYear()===Number(year);
 const voyages=(state.voyages||[]).filter(v=>inPeriod(v.at));
 const runs=voyages.reduce((s,v)=>{s[v.kind==='anime'?'rewatches':'rereads']+=v.passes;s[v.kind==='anime'?'episodes':'chapters']+=v.passes*v.length;return s;},{rewatches:0,rereads:0,episodes:0,chapters:0});
 const individual=year==='all'?state.rewatched||0:(state.history||[]).filter(h=>h.type==='rewatch'&&inPeriod(h.at)).reduce((s,h)=>s+h.count,0);
 const rated=arcs.filter(a=>Number.isInteger(ratings[a.id])&&ratings[a.id]>=1&&ratings[a.id]<=10).map(a=>({id:a.id,name:a.name,score:ratings[a.id]})).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name));
 return {period:year==='all'?'All time':String(year),calendar:'UTC',loggedFullRewatches:runs.rewatches,loggedFullRereads:runs.rereads,loggedRewatchedEpisodes:runs.episodes+individual,estimatedRewatchMinutes:(runs.episodes+individual)*24,loggedRereadChapters:runs.chapters,currentCompletedArcs:arcs.length,currentRatings:rated,currentAverageRating:rated.length?Number((rated.reduce((s,a)=>s+a.score,0)/rated.length).toFixed(1)):null,limits:'Revisits are grouped by the date you logged them, not when you watched/read. Current ratings and completed arcs are lifetime snapshots, not yearly activity. Yearly individual rewatches use retained history (up to 200 entries) and may be incomplete if history was cleared. Time is estimated at 24 minutes per episode.'};
}
