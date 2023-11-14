import { z } from 'zod';

enum Format {
  Standard = 'standard',
  Future = 'future',
  Historic = 'historic',
  Gladiator = 'gladiator',
  Pioneer = 'pioneer',
  Explorer = 'explorer',
  Modern = 'modern',
  Legacy = 'legacy',
  Pauper = 'pauper',
  Vintage = 'vintage',
  Penny = 'penny',
  Commander = 'commander',
  Oathbreaker = 'oathbreaker',
  Brawl = 'brawl',
  HistoricBrawl = 'historicbrawl',
  Alchemy = 'alchemy',
  PauperCommander = 'paupercommander',
  Duel = 'duel',
  OldSchool = 'oldschool',
  PreModern = 'premodern',
  Predh = 'predh',
}

const FormatSchema = z.nativeEnum(Format);

export { Format, FormatSchema };
