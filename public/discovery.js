// Conservative viewing checkpoints, not official chronology. Film plots are
// separate adventures and can reveal later character designs and abilities.
export const MOVIES=[
 ['movie-1','One Piece: The Movie',18,41,'An early East Blue side adventure.'],
 ['movie-2','Clockwork Island Adventure',53,100,'A crew adventure after your East Blue voyage.'],
 ['movie-3','Chopper’s Kingdom on the Island of Strange Animals',130,217,'A Chopper-focused island adventure.'],
 ['movie-4','Dead End Adventure',195,302,'A pirate race with the early Grand Line crew.'],
 ['movie-5','The Cursed Holy Sword',195,302,'A sword-centred side adventure.'],
 ['movie-6','Baron Omatsuri and the Secret Island',224,321,'A darker, unusually styled island story.'],
 ['movie-7','The Giant Mechanical Soldier of Karakuri Castle',325,441,'A mechanical-island adventure; this guide waits until after Enies Lobby.'],
 ['movie-8','Episode of Alabasta',130,217,'A compressed retelling of Alabasta; not a replacement for the full arc.'],
 ['movie-9','Episode of Chopper Plus',325,441,'An alternate Drum Island retelling with a later crew lineup.'],
 ['movie-10','Strong World',381,489,'A standalone adventure after Thriller Bark.'],
 ['movie-11','One Piece 3D: Straw Hat Chase',381,489,'A short 3D adventure with the post-Thriller Bark crew.'],
 ['movie-12','Film Z',625,699,'This conservative guide waits until the end of Punk Hazard.'],
 ['movie-13','Film Gold',746,801,'A casino-ship adventure after Dressrosa.'],
 ['movie-14','Stampede',1085,1057,'Conservatively held until after Wano because of later-series references.'],
 ['movie-15','Film Red',1085,1057,'Wait until after Wano for later abilities and designs; no plot synopsis here.']
].map(([id,title,episode,chapter,note])=>({id,title,episode,chapter,note}));
// Cover ranges verified against the One Piece Wiki Story Arcs serial listing.
// Anime gates wait until the arc containing the last cover chapter is complete.
// These are recommended reading checkpoints, not adaptation claims.
export const COVERS=[
 ['cover-buggy','Buggy’s Crew Adventure Chronicles',35,75,47,'Adapted in episodes 46–47.'],
 ['cover-koby','Diary of Koby-Meppo',83,119,77,'Adapted in episodes 68–69.'],
 ['cover-jango','Jango’s Dance Paradise',126,172,130,'Mostly manga-only; a separate dance short uses some material.'],
 ['cover-hatchan','Hatchan’s Sea-Floor Stroll',182,228,152,'A manga side story that helps connect later encounters.'],
 ['cover-wapol','Wapol’s Omnivorous Hurrah',236,262,195,'Only partly adapted later in the anime.'],
 ['cover-ace','Ace’s Great Blackbeard Search',272,305,219,'A manga side journey.'],
 ['cover-gedatsu','Gedatsu’s Accidental Blue-Sea Life',314,348,263,'A manga side journey.'],
 ['cover-baroque','Miss Goldenweek’s Operation: Meet Baroque Works',359,413,312,'A manga side journey after Alabasta.'],
 ['cover-enel','Enel’s Great Space Operations',428,474,381,'A manga-only journey the anime largely leaves out.'],
 ['cover-cp9','CP9’s Independent Report',491,528,452,'A manga follow-up; this guide waits for Impel Down.'],
 ['cover-decks','From the Decks of the World',613,668,625,'A manga look across the world.'],
 ['cover-caribou','Caribou’s Kehihihihi in the New World',674,731,746,'A manga side journey.'],
 ['cover-jinbe','Solo Journey of Jinbe, Knight of the Sea',751,785,746,'A manga side journey.'],
 ['cover-decks2','From the Decks of the World: The 500,000,000 Man Arc',805,838,877,'A manga look across the world.'],
 ['cover-fleet','The Stories of the Self-Proclaimed Straw Hat Grand Fleet',864,919,1085,'A manga collection of side adventures.'],
 ['cover-bege','Gang Bege’s Oh My Family',948,994,1085,'A manga side journey.'],
 ['cover-germa','Germa 66’s Ahh… An Emotionless Excursion',1035,1078,1155,'A manga side journey; this guide waits until Egghead is complete.']
].map(([id,title,start,chapter,episode,note])=>({id,title,start,chapter,episode,note}));
export function unlockedDiscovery(rows,kind,value){return rows.filter(row=>row[kind==='manga'?'chapter':'episode']<=value);}
