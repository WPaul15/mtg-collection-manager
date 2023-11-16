import { z } from 'zod';
import camelize from '../camelize';

const ScryfallErrorSchema = z
  .object({
    object: z.literal('error'),
    status: z.number().int(),
    code: z.string(),
    details: z.string(),
    type: z.string().nullish(),
    warnings: z.array(z.string()).nullish(),
  })
  .transform(camelize);

type ScryfallError = z.infer<typeof ScryfallErrorSchema>;

export { ScryfallErrorSchema, type ScryfallError };
