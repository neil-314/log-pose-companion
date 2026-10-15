# Crew balance v3: flexible roles and fighter utility

The ten berths are Captain, Swordsman, Navigator / Archaeologist, Cook, Doctor, Vice Captain, Sniper and three Wildcards. Vice Captain replaces Musician. Saved lineups keep their ten positions and members; the former music position is rescored as vice captain. Old clients submitting the music key are mapped to that slot. Best comparisons use current scores.

The crew pool now has 49 members. Oden is crew-only; the featured gallery remains 48. He unlocks conservatively at episode/chapter 960, his full introduction. His portrait uses the existing dex asset. References: https://one-piece.com/character/Kozuki_Oden/index.html and https://one-piece.com/anime/o5667/index.html.

Navigator / Archaeologist accepts navigation OR exploration and historical knowledge. Nami, Robin and Oden score 100 there, without claiming identical professional skills. Vice Captain rewards leadership and support: Zoro 100, Marco 99, Jinbe and Sabo 98. Doctor remains Law 100, Marco 98, Chopper 97.

POWER_FLOOR_MEMBERS in public/crew-game.js publishes the editorial top-fighter group. Every listed member receives at least 80 in EVERY role, representing general strength and crew utility rather than professional training. Specialist bonuses still matter. Other characters retain varied profiles and low scores for weak placements. All scores are playful editorial judgments, not canonical power rankings.

Exact character scores remain hidden until assignment. In-game rules do not name future characters. Public source code is not cheat-proof secrecy.

Draw weights remain 1 for characters whose best role scores 96–100 and 4 for others. No duplicates, introduction gates, no forced wins or near misses. Total stays capped at 999; 1000 and Pirate King Crew remain impossible. Ten distinct ideal matches can still reach the cap. Regression checks include 20,000 random-assignment runs and 2,000 optimally assigned draws; these are balance checks, not exact published odds.