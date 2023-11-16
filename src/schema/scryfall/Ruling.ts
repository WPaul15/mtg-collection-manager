import { z } from 'zod';
import camelize from '../camelize';
import { RulingSourceSchema } from './enum/RulingSource';

const RulingSchema = z
  .object({
    object: z.literal('ruling'),
    oracle_id: z.string().uuid(),
    source: RulingSourceSchema,
    published_at: z.coerce.date(),
    comment: z.string(),
  })
  .transform(camelize);

type Ruling = z.infer<typeof RulingSchema>;

export { RulingSchema, type Ruling };
