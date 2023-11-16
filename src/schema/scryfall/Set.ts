import { z } from 'zod';
import camelize from '../camelize';
import { SetTypeSchema } from './enum/SetType';

const SetSchema = z
  .object({
    object: z.literal('set'),
    id: z.string().uuid(),
    code: z.string(),
    mtgo_code: z.string().nullish(),
    arena_code: z.string().nullish(),
    tcgplayer_id: z.number().int().nullish(),
    name: z.string(),
    set_type: SetTypeSchema,
    released_at: z.coerce.date().nullish(),
    block_code: z.string().nullish(),
    block: z.string().nullish(),
    parent_set_code: z.string().nullish(),
    card_count: z.number().int(),
    printed_size: z.number().int().nullish(),
    digital: z.boolean(),
    foil_only: z.boolean(),
    nonfoil_only: z.boolean(),
    scryfall_uri: z.string().url(),
    uri: z.string().url(),
    icon_svg_uri: z.string().url(),
    search_uri: z.string().url(),
  })
  .transform(camelize);

type Set = z.infer<typeof SetSchema>;

export { SetSchema, type Set };
