import { z } from 'zod';
import camelize from '../camelize';
import { ColorSchema } from './enum/Color';
import { ImageFormatSchema } from './enum/ImageFormat';
import { LayoutSchema } from './enum/Layout';

const CardFaceSchema = z
  .object({
    artist: z.string().nullish(),
    artist_id: z.string().uuid().nullish(),
    cmc: z.number().nullish(),
    color_indicator: z.array(ColorSchema).nullish(),
    colors: z.array(ColorSchema).nullish(),
    defense: z.string().nullish(),
    flavor_text: z.string().nullish(),
    illustration_id: z.string().uuid().nullish(),
    image_uris: z.record(ImageFormatSchema, z.string().url()).transform(camelize).nullish(),
    layout: LayoutSchema.nullish(),
    mana_cost: z.string().nullish(),
    name: z.string(),
    object: z.literal('card_face'),
    oracle_id: z.string().uuid().nullish(),
    oracle_text: z.string().nullish(),
    power: z.string().nullish(),
    printed_name: z.string().nullish(),
    printed_text: z.string().nullish(),
    printed_type_line: z.string().nullish(),
    toughness: z.string().nullish(),
    type_line: z.string().nullish(),
    watermark: z.string().nullish(),
  })
  .transform(camelize);

type CardFace = z.infer<typeof CardFaceSchema>;

export { CardFaceSchema, type CardFace };
