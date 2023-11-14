import { z } from 'zod';

enum Color {
  White = 'W',
  Blue = 'U',
  Black = 'B',
  Red = 'R',
  Green = 'G',
}

const ColorSchema = z.nativeEnum(Color);

export { Color, ColorSchema };
