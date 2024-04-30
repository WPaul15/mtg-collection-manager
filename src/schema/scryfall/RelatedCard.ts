import { z } from 'zod';
import camelize from '../camelize';
import { ComponentSchema } from './enum/Component';

const RelatedCardSchema = z
  .object({
    id: z.string().uuid(),
    object: z.literal('related_card'),
    component: ComponentSchema,
    name: z.string(),
    type_line: z.string(),
    uri: z.string().url(),
  })
  .transform(camelize);

type RelatedCard = z.infer<typeof RelatedCardSchema>;

export { RelatedCardSchema, type RelatedCard };
