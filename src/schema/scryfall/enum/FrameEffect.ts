import { z } from 'zod';

enum FrameEffect {
  Legendary = 'legendary',
  Miracle = 'miracle',
  Nyxtouched = 'nyxtouched',
  Draft = 'draft',
  Devoid = 'devoid',
  Tombstone = 'tombstone',
  Colorshifted = 'colorshifted',
  Inverted = 'inverted',
  SunMoonDfc = 'sunmoondfc',
  CompassLandDfc = 'compasslanddfc',
  OriginPlaneswalkerDfc = 'originpwdfc',
  MoonEldraziDfc = 'mooneldrazidfc',
  WaxingWaningMoonDfc = 'waxingandwaningmoondfc',
  Showcase = 'showcase',
  ExtendedArt = 'extendedart',
  Companion = 'companion',
  Etched = 'etched',
  Snow = 'snow',
  Lesson = 'lesson',
  ShatteredGlass = 'shatteredglass',
  ConvertDfc = 'convertdfc',
  FanDfc = 'fandfc',
  UpsideDownDfc = 'upsidedowndfc',
}

const FrameEffectSchema = z.nativeEnum(FrameEffect);

export { FrameEffect, FrameEffectSchema };
