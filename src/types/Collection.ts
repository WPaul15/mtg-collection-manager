interface CardCountMetadata {
  numRegular: number;
  numFoil: number;
}

interface Collection {
  name: string;
  cards: {
    [key: string]: CardCountMetadata;
  };
}

export { type CardCountMetadata, type Collection };
