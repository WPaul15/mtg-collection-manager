import { z } from 'zod';
import camelize from '../camelize';
import { ColorSchema } from './enum/Color';

const CardSymbolSchema = z
  .object({
    object: z.literal('card_symbol'),
    symbol: z.string(),
    loose_variant: z.string().nullish(),
    english: z.string(),
    transposable: z.boolean(),
    represents_mana: z.boolean(),
    mana_value: z.number().nullish(),
    appears_in_mana_costs: z.boolean(),
    funny: z.boolean(),
    colors: z.array(ColorSchema),
    gatherer_alternates: z.array(z.string()).nullish(),
    svg_uri: z.string().url().nullish(),
  })
  .transform(camelize);

type CardSymbol = z.infer<typeof CardSymbolSchema>;

export { CardSymbolSchema, type CardSymbol };
