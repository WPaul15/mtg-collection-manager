import { z } from 'zod';

enum Game {
  Paper = 'paper',
  Arena = 'arena',
  Mtgo = 'mtgo',
}

const GameSchema = z.nativeEnum(Game);

export { Game, GameSchema };
