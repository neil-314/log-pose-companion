import {test} from 'node:test';
import assert from 'node:assert/strict';
import {CREW_ROSTER} from '../public/featured-roster.js';
import {roleScore} from '../public/crew-game.js';
import {characterRoleBreakdown} from '../public/crew-explanations.js';
test('every drawable character has a complete, accurate role explanation',()=>{
 for(const c of CREW_ROSTER){const rows=characterRoleBreakdown(c.id,'anime',2000);assert.equal(rows.length,8,c.id);for(const row of rows){assert.equal(row.score,roleScore(c.id,row.role));assert.ok(row.reason.length>55,`${c.id}/${row.role}`);}assert.equal(new Set(rows.map(r=>r.reason)).size,8,c.id);}
});
test('Robin explains archaeology, wildcard, weaker professions and gates later lore',()=>{
 const early=characterRoleBreakdown('robin','anime',67),late=characterRoleBreakdown('robin','anime',130);
 assert.equal(early[2].score,100);assert.match(early[2].reason,/archaeology/);assert.match(early[7].reason,/historical research/);assert.doesNotMatch(early.map(r=>r.reason).join(' '),/Poneglyph/);assert.match(late[2].reason,/Poneglyph/);assert.match(early[4].reason,/not medical/);
 assert.doesNotMatch(characterRoleBreakdown('robin','manga',217)[2].reason,/Poneglyph/);assert.match(characterRoleBreakdown('robin','manga',218)[2].reason,/Poneglyph/);
});
test('role explanations distinguish game bonuses from canonical qualifications',()=>{
 assert.match(characterRoleBreakdown('zoro')[2].reason,/sense of direction.*floor/);
 assert.match(characterRoleBreakdown('garp')[7].reason,/bonus of 100/);
 assert.match(characterRoleBreakdown('imu')[4].reason,/speculative editorial choice/);
 assert.match(characterRoleBreakdown('franky')[4].reason,/shipwright side/);
 assert.match(characterRoleBreakdown('brook')[3].reason,/music side/);
});
