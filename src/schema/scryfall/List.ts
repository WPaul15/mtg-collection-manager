import { ZodType, z } from 'zod';
import camelize from '../camelize';

const ListSchema = <E extends ZodType>(dataSchema: E) =>
  z
    .object({
      object: z.literal('list'),
      data: z.array(dataSchema),
      has_more: z.boolean().nullish(),
      next_page: z.string().url().nullish(),
      total_cards: z.number().int().nullish(),
      warnings: z.array(z.string()).nullish(),
    })
    .transform(camelize);

type List<E> = z.infer<ReturnType<typeof ListSchema<ZodType<E>>>>;

export { ListSchema, type List };
