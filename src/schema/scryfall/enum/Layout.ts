import { z } from 'zod';

enum Layout {
  Normal = 'normal',
  Split = 'split',
  Flip = 'flip',
  Transform = 'transform',
  ModalDfc = 'modal_dfc',
  Meld = 'meld',
  Leveler = 'leveler',
  Class = 'class',
  Saga = 'saga',
  Adventure = 'adventure',
  Mutate = 'mutate',
  Prototype = 'prototype',
  Battle = 'battle',
  Planar = 'planar',
  Scheme = 'scheme',
  Vanguard = 'vanguard',
  Token = 'token',
  DoubleFacedToken = 'double_faced_token',
  Emblem = 'emblem',
  Augment = 'augment',
  Host = 'host',
  ArtSeries = 'art_series',
  ReversibleCard = 'reversible_card',
}

const LayoutSchema = z.nativeEnum(Layout);

export { Layout, LayoutSchema };
