export function plan(episodes,{current,budget,duration=24,skipFiller=true,skipRecap=true}) {
 if(!Number.isInteger(current)||current<0||!Number.isFinite(budget)||budget<24||budget>10080) throw new Error('Enter a valid episode and 24–10080 weekly minutes.');
 const future=episodes.filter(e=>e.mal_id>current).sort((a,b)=>a.mal_id-b.mal_id);
 const eligible=future.filter(e=>!(skipFiller&&e.filler)&&!(skipRecap&&e.recap));
 const capacity=Math.floor(budget/duration);
 return {queue:eligible.slice(0,capacity),skipped:future.filter(e=>!eligible.includes(e)).length,minutes:Math.min(capacity,eligible.length)*duration,remaining:eligible.length,weeks:Math.ceil(eligible.length/capacity)};
}
