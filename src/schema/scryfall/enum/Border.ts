import { z } from 'zod';

enum Border {
  Black = 'black',
  White = 'white',
  Borderless = 'borderless',
  Silver = 'silver',
  Gold = 'gold',
}

const BorderSchema = z.nativeEnum(Border);

export { Border, BorderSchema };
