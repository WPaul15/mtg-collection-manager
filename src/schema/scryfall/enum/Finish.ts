import { z } from 'zod';

enum Finish {
  Nonfoil = 'nonfoil',
  Foil = 'foil',
  Etched = 'etched',
}

const FinishSchema = z.nativeEnum(Finish);

export { Finish, FinishSchema };
