// Facts are editorial, not generated at runtime. Conservative end-of-arc gates
// prevent details from appearing before their reveal. Reference pages accompany
// answers for review, but external wiki pages can contain later spoilers.
const wiki=page=>'https://onepiece.fandom.com/wiki/'+page;
export const DIFFICULTIES={
 easy:{name:'East Blue',subtitle:'Find your sea legs',icon:'⛵',weight:1},
 medium:{name:'Grand Line',subtitle:'Names, places and powers',icon:'🧭',weight:2},
 hard:{name:'New World',subtitle:'Small details. Close calls.',icon:'⚡',weight:3},
 extreme:{name:'Pirate King',subtitle:'Typed answers. No choices. No mercy.',icon:'👑',weight:5}
};
const choice=(id,question,answers,correct,episode,chapter,explanation,page,difficulty)=>({id,question,answers,correct,episode,chapter,explanation,source:wiki(page),difficulty});
const typed=(id,question,accepted,episode,chapter,explanation,page)=>({id,question,accepted,episode,chapter,explanation,source:wiki(page),difficulty:'extreme'});
export const ADVANCED_TRIVIA=[
 choice('m1','Which sword did Kuina leave behind?',['Wado Ichimonji','Sandai Kitetsu','Yubashiri','Shusui'],0,3,7,'Zoro carries Kuina’s Wado Ichimonji.','Wado_Ichimonji','medium'),
 choice('m2','Who gave the crew the Going Merry?',['Kaya','Zeff','Genzo','Iceburg'],0,18,41,'Kaya gives the crew the Going Merry after Syrup Village.','Going_Merry','medium'),
 choice('m3','What is the name of the sea Sanji dreams of finding?',['All Blue','Calm Belt','White Sea','Florian Triangle'],0,30,68,'The All Blue is the legendary sea of Sanji’s dream.','All_Blue','medium'),
 choice('m4','Who is the doctor living at Twin Cape?',['Crocus','Hiriluk','Kureha','Hogback'],0,63,105,'Crocus lives at Twin Cape and looks after Laboon.','Crocus','medium'),
 choice('m5','Which pair has been duelling on Little Garden?',['Dorry and Broggy','Oimo and Kashii','Jorul and Jarul','Hajrudin and Stansen'],0,77,129,'Dorry and Broggy are the giant captains on Little Garden.','Little_Garden','medium'),
 choice('m6','Which alias did Vivi use in Baroque Works?',['Miss Wednesday','Miss Monday','Miss Valentine','Miss Goldenweek'],0,130,217,'Vivi infiltrates Baroque Works as Miss Wednesday.','Nefertari_Vivi','medium'),
 choice('m7','What is the sky-island name for Observation Haki?',['Mantra','Rokushiki','Tekkai','Life Return'],0,195,302,'Skypiea’s Mantra is later identified as Observation Haki.','Haki/Kenbunshoku_Haki','medium'),
 choice('m8','Which ship does Enel build?',['Maxim','Ark Noah','Moby Dick','Oro Jackson'],0,195,302,'Enel’s flying ark is called Maxim.','Maxim','medium'),
 choice('m9','What is Franky’s birth name?',['Cutty Flam','Iceburg','Tom','Baskerville'],0,325,441,'Franky was born Cutty Flam.','Franky','medium'),
 choice('m10','What is the name of Brook’s former crew?',['Rumbar Pirates','Rocks Pirates','Sun Pirates','Nox Pirates'],0,381,489,'Brook sailed with the Rumbar Pirates.','Rumbar_Pirates','medium'),
 choice('m11','Who is the head jailer of Impel Down?',['Sadi','Domino','Hannyabal','Saldeath'],0,452,549,'Sadi is the chief of the Jailer Beasts and head jailer.','Sadi','medium'),
 choice('m12','What is the name of Law’s submarine?',['Polar Tang','Victoria Punk','Perfume Yuda','Nostra Castello'],0,516,597,'The Heart Pirates sail aboard the Polar Tang.','Polar_Tang','medium'),
 choice('m13','Which scientist runs the experiments on Punk Hazard?',['Caesar Clown','Vegapunk','Judge','Hogback'],0,625,699,'Caesar Clown runs the laboratory the crew encounters on Punk Hazard.','Caesar_Clown','medium'),
 choice('m14','Beneath which island is the Tontatta Kingdom?',['Green Bit','Jaya','Zou','Little Garden'],0,746,801,'The Tontatta Kingdom is beneath Green Bit.','Tontatta_Kingdom','medium'),
 choice('h1','What is the name of Kuro’s pirate ship?',['Bezan Black','Dreadnaught Sabre','Miss Love Duck','Red Force'],0,18,41,'Kuro’s Black Cat Pirates use the Bezan Black.','Bezan_Black','hard'),
 choice('h2','Which named ship belongs to Don Krieg?',['Dreadnaught Sabre','Bezan Black','Baratie','Big Top'],0,30,68,'The Dreadnaught Sabre is Krieg’s flagship.','Dreadnaught_Sabre','hard'),
 choice('h3','What animal is Baroque Works agent Mr. 13?',['Sea otter','Vulture','Weasel','Beaver'],0,130,217,'Mr. 13 is an otter; his partner Miss Friday is a vulture.','Mr._13','hard'),
 choice('h4','What is Miss Friday?',['Vulture','Falcon','Pelican','Owl'],0,130,217,'Miss Friday is the vulture half of the Unluckies.','Miss_Friday','hard'),
 choice('h5','What is the name of Shura’s bird?',['Fuza','Holy','Pierre','Nola'],0,195,302,'Fuza is the bird ridden by Shura.','Fuza','hard'),
 choice('h6','Which priest runs the Ordeal of Swamp?',['Gedatsu','Shura','Ohm','Satori'],0,195,302,'Gedatsu is responsible for the Ordeal of Swamp.','Gedatsu','hard'),
 choice('h7','Which priest’s ordeal is advertised with zero survival?',['Ohm','Satori','Shura','Gedatsu'],0,195,302,'Ohm’s Ordeal of Iron has a stated zero-percent survival rate.','Ohm','hard'),
 choice('h8','Which blade does Tashigi own in Loguetown?',['Shigure','Yubashiri','Kashu','Wado Ichimonji'],0,53,100,'Shigure is Tashigi’s katana at her introduction.','Shigure','hard'),
 choice('h9','What is the name of Spandam’s elephant sword?',['Funkfreed','Lassoo','Hassaikai','Durandal'],0,312,430,'Funkfreed is a sword that ate an elephant Zoan.','Funkfreed','hard'),
 choice('h10','What is the name of Tom’s experimental sea train?',['Rocketman','Puffing Tom','Battle Franky','Shark Submerge'],0,312,430,'Rocketman is the uncontrollable prototype; Puffing Tom is the successful sea train.','Rocketman','hard'),
 choice('h11','Which numbered Whitebeard division does Vista lead at Marineford?',['Fifth','Third','Fourth','Sixteenth'],0,489,580,'Vista commands the fifth division.','Vista','hard'),
 choice('h12','Which numbered Whitebeard division does Izo lead at Marineford?',['Sixteenth','Thirteenth','Fifth','Ninth'],0,489,580,'Izo commands the sixteenth division.','Izo','hard'),
 choice('h13','What is the name of the ship of the Sun Pirates led by Aladine?',['Snapper Head','Perfume Yuda','Nostra Castello','Numancia Flamingo'],0,877,902,'Snapper Head is the Sun Pirates’ ship in this period.','Snapper_Head','hard'),
 choice('h14','Which of these is one of Katakuri’s triplet siblings?',['Oven','Perospero','Cracker','Snack'],0,877,902,'Katakuri, Daifuku and Oven are triplets.','Charlotte_Katakuri','hard'),
 typed('x1','Name Alvida’s ship at the beginning of the story.',['Miss Love Duck','Love Duck'],3,7,'Her original ship is the Miss Love Duck.','Miss_Love_Duck'),
 typed('x2','Name the dog guarding its late owner’s pet-food shop in Orange Town.',['Chouchou','Shushu'],8,21,'Chouchou guards the shop after his owner’s death.','Chouchou'),
 typed('x3','Name Kuro’s pirate ship.',['Bezan Black'],18,41,'The Black Cat Pirates’ ship is the Bezan Black.','Bezan_Black'),
 typed('x4','Name Don Krieg’s flagship.',['Dreadnaught Sabre','Dreadnought Sabre','Dreadnaught Saber','Dreadnought Saber'],30,68,'Krieg’s flagship is the Dreadnaught Sabre.','Dreadnaught_Sabre'),
 typed('x5','In Skypiea, what percentage survival rate is stated for Satori’s ordeal?',['10','10%','10 percent','ten','ten percent'],195,302,'The Ordeal of Balls is advertised with a 10% survival rate.','Satori'),
 typed('x6','What percentage survival rate is stated for Shura’s ordeal?',['3','3%','3 percent','three','three percent'],195,302,'The Ordeal of String is advertised with a 3% survival rate.','Shura'),
 typed('x7','What percentage survival rate is stated for Gedatsu’s ordeal?',['50','50%','50 percent','fifty','fifty percent'],195,302,'The Ordeal of Swamp is advertised with a 50% survival rate.','Gedatsu'),
 typed('x8','Name the dog that fights alongside Ohm.',['Holy','Holly'],195,302,'Holy, also romanized Holly, is Ohm’s large dog.','Holy'),
 typed('x9','Name Shura’s bird.',['Fuza','Fuhza'],195,302,'Shura rides Fuza.','Fuza'),
 typed('x10','What Doriki does Fukurou measure for Jabra in chapter 379?',['2180','2,180'],312,430,'Jabra’s reading is 2,180. This is the specific CP9 measurement, not a present-day power ranking.','Chapter_379'),
 typed('x11','What Doriki does Fukurou measure for Kalifa in chapter 379?',['630'],312,430,'Kalifa’s reading is 630.','Chapter_379'),
 typed('x12','What Doriki does Fukurou measure for Spandam in chapter 379?',['9','nine'],312,430,'Spandam scores 9, below an armed ordinary soldier’s reference score.','Chapter_379'),
 typed('x13','Name the prototype sea train used to pursue the Puffing Tom.',['Rocketman','Rocket Man'],312,430,'The prototype is Rocketman.','Rocketman'),
 typed('x14','Name the railway sea train completed by Tom’s Workers.',['Puffing Tom'],325,441,'Puffing Tom connects Water 7 to other islands.','Puffing_Tom'),
 typed('x15','Name the ship Tom built for Gol D. Roger.',['Oro Jackson'],325,441,'Tom built the Oro Jackson.','Oro_Jackson'),
 typed('x16','What numbered division does Vista command at Marineford?',['5','fifth','5th'],489,580,'Vista commands the fifth division of the Whitebeard Pirates.','Vista'),
 typed('x17','What numbered division does Izo command at Marineford?',['16','sixteenth','16th'],489,580,'Izo commands the sixteenth division.','Izo'),
 typed('x18','Name the fourth-division commander whose murder led Ace to pursue Teach.',['Thatch'],489,580,'Thatch was the fourth-division commander.','Thatch'),
 typed('x19','Name the sword that ate the elephant Devil Fruit and belongs to Spandam.',['Funkfreed','Funk Freed'],312,430,'Funkfreed ate the Zou Zou no Mi.','Funkfreed'),
 typed('x20','Name Tashigi’s sword at her introduction in Loguetown.',['Shigure'],53,100,'Tashigi owns Shigure.','Shigure'),
 typed('x21','Name the Loguetown arms-shop owner who gives Zoro Yubashiri.',['Ipponmatsu','Ippon Matsu'],53,100,'Ipponmatsu rewards Zoro after the cursed-sword test.','Ipponmatsu'),
 typed('x22','Name the sea-train station in Water 7.',['Blue Station'],325,441,'The city’s sea-train station is Blue Station.','Water_7'),
 typed('x23','Which animal model is Smiley’s Zoan fruit?',['Axolotl','Sara Sara no Mi Model Axolotl'],625,699,'Smiley ate the Sara Sara no Mi, Model: Axolotl.','Smiley'),
 typed('x24','Name the lion mink who leads Inuarashi’s Musketeer Squad.',['Shishilian','Sicilian','Sicilion'],779,824,'Shishilian is one of the Three Inuarashi Musketeers and leads the squad.','Shishilian'),
 typed('x25','Name the Eternal Pose destination Robin offers after Whisky Peak.',['Nanimonai','Nanimonai Island'],77,129,'The destination is Nanimonai Island.','Nanimonai_Island'),
 typed('x26','Name the CP0 agent who interferes with Luffy and Kaido’s rooftop duel (named in SBS volume 104).',['Guernica','Guernika'],1085,1057,'The agent is Guernica; the name is supplied in SBS volume 104.','Guernica'),
 typed('x27','What is the name of Queen’s virus used on the Udon prisoners?',['Mummy','Mummy virus'],1085,1057,'The Udon outbreak is Mummy; Ice Oni is a different virus.','Queen')
];
export function normalizeAnswer(answer){return String(answer).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');}
export function checkTypedAnswer(question,answer){const clean=value=>normalizeAnswer(String(value).trim().replace(/^the\s+/i,'')),candidate=clean(answer);if(!candidate)return false;return question.accepted.some(a=>{const expected=clean(a);return expected===candidate||(/^\d+$/.test(expected)&&candidate.replace(/(?:doriki|douriki)$/,'')===expected);});}
export function selectRound(pool,seed=null){const rows=[...pool];let n=2166136261;if(seed!==null)for(const c of String(seed))n=Math.imul(n^c.charCodeAt(0),16777619);const random=()=>{if(seed===null)return Math.random();n^=n<<13;n^=n>>>17;n^=n<<5;return (n>>>0)/4294967296;};for(let i=rows.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[rows[i],rows[j]]=[rows[j],rows[i]];}return rows.slice(0,5);}
