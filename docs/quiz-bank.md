# Den Den quiz bank

The expansion adds 1,000 distinct character/property questions from a frozen One Piece API snapshot retrieved on 2026-10-12. No runtime AI or paid quiz service is used. Topics include group/place associations, romanized Devil Fruit names and profile heights. Affiliations can include former memberships; profile facts are catalogue trivia, not present-day story status.

Each entry has a source URL, explanation, topic, unique ID and episode/chapter cutoff. These 1,000 questions unlock at episode 1122 or chapter 1125 (post-Egghead), conservatively protecting earlier readers from updated catalogue details. Existing editorial story questions retain their earlier gates. Movie-only character rows are excluded.

This is a structured-data expansion, not 1,000 individually researched plot questions. Source mistakes remain possible and should be corrected in the frozen snapshot and rebuilt. Avoid lowering cutoffs without checking the actual reveal. The snapshot omits biographies and descriptions.

Run node tools/build-quiz-bank.mjs to rebuild. The script refuses fewer than 1,000 valid facts rather than padding with paraphrases. Both answer choices and typed-answer rounds remain supported.
