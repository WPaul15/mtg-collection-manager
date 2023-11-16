import { z } from 'zod';

enum SetType {
  Core = 'core',
  Expansion = 'expansion',
  Masters = 'masters',
  Alchemy = 'alchemy',
  Masterpiece = 'masterpiece',
  Arsenal = 'arsenal',
  FromTheVault = 'from_the_vault',
  Spellbook = 'spellbook',
  PremiumDeck = 'premium_deck',
  DuelDeck = 'duel_deck',
  DraftInnovation = 'draft_innovation',
  TreasureChest = 'treasure_chest',
  Commander = 'commander',
  Planechase = 'planechase',
  Archenemy = 'archenemy',
  Vanguard = 'vanguard',
  Funny = 'funny',
  Starter = 'starter',
  Box = 'box',
  Promo = 'promo',
  Token = 'token',
  Memorabilia = 'memorabilia',
  Minigame = 'minigame',
}

const SetTypeSchema = z.nativeEnum(SetType);

export { SetType, SetTypeSchema };
