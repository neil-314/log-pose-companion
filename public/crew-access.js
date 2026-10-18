// Finish Baratie before entering the ten-berth game; later characters retain individual gates.
export const CREW_UNLOCK=Object.freeze({anime:30,manga:68});
export function canBuildCrew(kind,value){return Object.hasOwn(CREW_UNLOCK,kind)&&Number.isInteger(value)&&value>=CREW_UNLOCK[kind];}
export function crewUnlockMessage(kind='anime'){return `Build your crew unlocks after ${kind==='manga'?'chapter 68':'episode 30'} (the end of Baratie). Update your progress to enter.`;}
