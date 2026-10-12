import {CATALOGUE_TRIVIA} from './catalogue-trivia.js';
import {ADVANCED_TRIVIA} from './advanced-trivia.js';
// Editorial questions unlock only after their reveal in both media.
export const TRIVIA=[
 ['What does Luffy dream of becoming?',['King of the Pirates','Fleet Admiral','World’s strongest swordsman','King of Alabasta'],0,1,1,'Luffy announces his dream at the very start of his voyage.'],
 ['How many swords does Zoro use in his signature style?',['One','Two','Three','Four'],2,3,6,'Santoryu means three-sword style.'],
 ['Which pirate is known as the Clown?',['Kuro','Buggy','Arlong','Krieg'],1,8,21,'Buggy the Clown is the captain encountered in Orange Town.'],
 ['Who tells stories of being a brave warrior of the sea?',['Usopp','Zoro','Sanji','Mihawk'],0,18,41,'Usopp’s dream is to become a brave warrior of the sea.'],
 ['What is the name of the floating restaurant?',['Baratie','Going Merry','Red Force','Thriller Bark'],0,30,68,'The Baratie is the sea restaurant where Sanji works.'],
 ['What is Nami’s role aboard the ship?',['Doctor','Navigator','Cook','Shipwright'],1,44,95,'Nami guides the crew as their navigator.'],
 ['Which town is associated with Roger’s execution?',['Orange Town','Loguetown','Water 7','Shells Town'],1,53,100,'Loguetown is known as the town of the beginning and the end.'],
 ['What animal is Laboon?',['Whale','Shark','Sea lion','Giant squid'],0,63,105,'Laboon waits at Reverse Mountain.'],
 ['Who is the Straw Hats’ doctor?',['Chopper','Dalton','Vivi','Usopp'],0,91,154,'Tony Tony Chopper joins as the crew’s doctor.'],
 ['Which kingdom is Vivi trying to save?',['Alabasta','Drum','Goa','Dressrosa'],0,130,217,'Vivi travels with the crew to stop the conspiracy in Alabasta.'],
 ['What is the name of the sky island the crew visits?',['Zou','Skypiea','Jaya','Little Garden'],1,195,302,'Skypiea lies high above the Blue Sea.'],
 ['Which contest does Foxy challenge the crew to?',['Davy Back Fight','Reverie','Colosseum tournament','Pirate Expo'],0,219,321,'A Davy Back Fight puts crewmates on the line.'],
 ['Who built the Thousand Sunny?',['Franky','Iceburg alone','Usopp alone','Kaya'],0,325,441,'Franky builds the Sunny with help from the shipwrights.'],
 ['Which instrument is Brook known for playing?',['Violin','Trumpet','Harp','Flute'],0,381,489,'Brook is the crew’s musician and plays the violin.'],
 ['Which prison does Luffy infiltrate to rescue Ace?',['Enies Lobby','Impel Down','Marineford','G-8'],1,452,549,'Impel Down is the great underwater prison.'],
 ['Where does the crew reunite after training?',['Sabaody Archipelago','Loguetown','Alabasta','Water 7'],0,522,602,'The Straw Hats return to Sabaody after two years.'],
 ['What kind of island is Zou located on?',['A floating ship','A giant elephant','A sky cloud','An iceberg'],1,779,824,'Zou rests on the back of the giant elephant Zunesha.'],
 ['Which family rules Whole Cake Island?',['Donquixote','Charlotte','Vinsmoke','Nefertari'],1,877,902,'Big Mom leads the Charlotte family.']
].map(([question,answers,correct,episode,chapter,explanation],index)=>({id:'e'+index,question,answers,correct,episode,chapter,explanation,difficulty:'easy'})).concat(ADVANCED_TRIVIA,CATALOGUE_TRIVIA);
export function unlockedTrivia(kind,value,difficulty='easy'){return TRIVIA.filter(q=>q.difficulty===difficulty&&q[kind==='manga'?'chapter':'episode']<=value);}
