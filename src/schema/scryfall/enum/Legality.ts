import { z } from 'zod';

enum Legality {
  Legal = 'legal',
  NotLegal = 'not_legal',
  Restricted = 'restricted',
  Banned = 'banned',
}

const LegalitySchema = z.nativeEnum(Legality);

export { Legality, LegalitySchema };
