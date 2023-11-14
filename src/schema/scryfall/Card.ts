import { z } from 'zod';
import camelize from '../camelize';
import { CardFaceSchema } from './CardFace';
import { RelatedCardSchema } from './RelatedCard';
import { BorderSchema } from './enum/Border';
import { ColorSchema } from './enum/Color';
import { FinishSchema } from './enum/Finish';
import { FormatSchema } from './enum/Format';
import { FrameSchema } from './enum/Frame';
import { FrameEffectSchema } from './enum/FrameEffect';
import { GameSchema } from './enum/Game';
import { ImageFormatSchema } from './enum/ImageFormat';
import { ImageStatusSchema } from './enum/ImageStatus';
import { LanguageSchema } from './enum/Language';
import { LayoutSchema } from './enum/Layout';
import { LegalitySchema } from './enum/Legality';
import { PriceSchema } from './enum/Price';
import { RaritySchema } from './enum/Rarity';
import { SecurityStampSchema } from './enum/SecurityStamp';

const CardSchema = z
  .object({
    // Core Fields
    arena_id: z.number().int().nullish(),
    id: z.string().uuid(),
    lang: LanguageSchema,
    mtgo_id: z.number().int().nullish(),
    mtgo_foil_id: z.number().int().nullish(),
    multiverse_ids: z.array(z.number().int()).nullish(),
    tcgplayer_id: z.number().int().nullish(),
    tcgplayer_etched_id: z.number().int().nullish(),
    cardmarket_id: z.number().int().nullish(),
    object: z.literal('card'),
    layout: LayoutSchema,
    oracle_id: z.string().uuid().nullish(),
    prints_search_uri: z.string().url(),
    rulings_uri: z.string().url(),
    scryfall_uri: z.string().url(),
    uri: z.string().url(),
    // Gameplay Fields
    all_parts: z.array(RelatedCardSchema).nullish(),
    card_faces: z.array(CardFaceSchema).nullish(),
    cmc: z.number(),
    color_identity: z.array(ColorSchema),
    color_indicator: z.array(ColorSchema).nullish(),
    colors: z.array(ColorSchema).nullish(),
    defense: z.string().nullish(),
    edhrec_rank: z.number().int().nullish(),
    hand_modifier: z.string().nullish(),
    keywords: z.array(z.string()),
    legalities: z.record(FormatSchema, LegalitySchema),
    life_modifier: z.string().nullish(),
    loyalty: z.string().nullish(),
    mana_cost: z.string().nullish(),
    name: z.string(),
    oracle_text: z.string().nullish(),
    penny_rank: z.number().int().nullish(),
    power: z.string().nullish(),
    produced_mana: z.array(ColorSchema).nullish(),
    reserved: z.boolean(),
    toughness: z.string().nullish(),
    type_line: z.string(),
    // Print Fields
    artist: z.string().nullish(),
    artist_ids: z.array(z.string().uuid()).nullish(),
    attraction_lights: z.array(z.number().int()).nullish(),
    booster: z.boolean(),
    border_color: BorderSchema,
    card_back_id: z.string().uuid(),
    collector_number: z.string(),
    content_warning: z.boolean().nullish(),
    digital: z.boolean(),
    finishes: z.array(FinishSchema),
    flavor_name: z.string().nullish(),
    flavor_text: z.string().nullish(),
    frame_effects: z.array(FrameEffectSchema).nullish(),
    frame: FrameSchema,
    full_art: z.boolean(),
    games: z.array(GameSchema),
    highres_image: z.boolean(),
    illustration_id: z.string().uuid().nullish(),
    image_status: ImageStatusSchema,
    image_uris: z.record(ImageFormatSchema, z.string().url()).nullish(),
    oversized: z.boolean(),
    prices: z.record(PriceSchema, z.string().nullable()),
    printed_name: z.string().nullish(),
    printed_text: z.string().nullish(),
    printed_type_line: z.string().nullish(),
    promo: z.boolean(),
    promo_types: z.array(z.string()).nullish(),
    purchase_uris: z.record(z.string(), z.string().url()).nullish(),
    rarity: RaritySchema,
    related_uris: z.record(z.string(), z.string().url()),
    released_at: z.date(),
    reprint: z.boolean(),
    scryfall_set_uri: z.string().url(),
    set_name: z.string(),
    set_search_uri: z.string().url(),
    set_type: z.string(),
    set_uri: z.string().url(),
    set: z.string(),
    set_id: z.string().uuid(),
    story_spotlight: z.boolean(),
    textless: z.boolean(),
    variation: z.boolean(),
    variation_of: z.string().uuid().nullish(),
    security_stamp: SecurityStampSchema.nullish(),
    watermark: z.string().nullish(),
    'preview.previewed_at': z.date().nullish(),
    'preview.source_uri': z.string().url().nullish(),
    'preview.source': z.string().nullish(),
  })
  .transform(camelize);

type Card = z.infer<typeof CardSchema>;

export { CardSchema, type Card };
