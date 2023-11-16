import { z } from 'zod';

enum RulingSource {
  Wotc = 'wotc',
  Scryfall = 'scryfall',
}

const RulingSourceSchema = z.nativeEnum(RulingSource);

export { RulingSource, RulingSourceSchema };
