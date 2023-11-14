import { z } from 'zod';

enum Rarity {
  Common = 'common',
  Uncommon = 'uncommon',
  Rare = 'rare',
  MythicRare = 'mythic',
  Special = 'special',
  Bonus = 'bonus',
}

const RaritySchema = z.nativeEnum(Rarity);

export { Rarity, RaritySchema };
