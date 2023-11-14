import { z } from 'zod';

enum SecurityStamp {
  Oval = 'oval',
  Triangle = 'triangle',
  Acorn = 'acorn',
  Circle = 'circle',
  Arena = 'arena',
  Heart = 'heart',
}

const SecurityStampSchema = z.nativeEnum(SecurityStamp);

export { SecurityStamp, SecurityStampSchema };
