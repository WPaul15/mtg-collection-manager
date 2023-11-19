import { EnumValue, createEnumSchema } from './EnumSchema';

const Rarity: Record<string, EnumValue> = {
  COMMON: { apiValue: 'common', displayValue: 'Common' },
  UNCOMMON: { apiValue: 'uncommon', displayValue: 'Uncommon' },
  RARE: { apiValue: 'rare', displayValue: 'Rare' },
  MYTHIC: { apiValue: 'mythic', displayValue: 'Mythic Rare' },
  SPECIAL: { apiValue: 'special', displayValue: 'Special' },
  BONUS: { apiValue: 'bonus', displayValue: 'Bonus' },
} as const;

const RaritySchema = createEnumSchema(Rarity);

export { Rarity, RaritySchema };
