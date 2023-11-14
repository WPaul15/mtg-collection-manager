import { z } from 'zod';

enum Price {
  Usd = 'usd',
  UsdFoil = 'usd_foil',
  UsdEtched = 'usd_etched',
  Eur = 'eur',
  EurFoil = 'eur_foil',
  EurEtched = 'eur_etched',
  Tix = 'tix',
}

const PriceSchema = z.nativeEnum(Price);

export { Price, PriceSchema };
