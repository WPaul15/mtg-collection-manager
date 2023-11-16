import { z } from 'zod';
import camelize from '../camelize';
import { ColorSchema } from './enum/Color';

const ManaCostSchema = z
  .object({
    object: z.literal('mana_cost'),
    cost: z.string(),
    cmc: z.number(),
    colors: z.array(ColorSchema),
    colorless: z.boolean(),
    monocolored: z.boolean(),
    multicolored: z.boolean(),
  })
  .transform(camelize);

type ManaCost = z.infer<typeof ManaCostSchema>;

export { ManaCostSchema, type ManaCost };
