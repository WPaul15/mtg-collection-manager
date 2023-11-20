enum UniqueMode {
  Cards = 'cards',
  Art = 'art',
  Prints = 'prints',
}

enum SortOrder {
  Name = 'name',
  Set = 'set',
  Released = 'released',
  Rarity = 'rarity',
  Color = 'color',
  Usd = 'usd',
  Tix = 'tix',
  Eur = 'eur',
  Cmc = 'cmc',
  Power = 'power',
  Toughness = 'toughness',
  EdhRec = 'edhrec',
  Penny = 'penny',
  Artist = 'artist',
  Review = 'review',
}

enum SortDirection {
  Auto = 'auto',
  Asc = 'asc',
  Desc = 'desc',
}

interface CardQueryRequest {
  q: string;
  unique?: UniqueMode;
  order?: SortOrder;
  dir?: SortDirection;
  includeExtras?: boolean;
  includeMultilingual?: boolean;
  includeVariations?: boolean;
  page?: number;
  format?: string;
  pretty?: boolean;
}

export { SortDirection, SortOrder, UniqueMode, type CardQueryRequest };
