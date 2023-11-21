interface CollectionEntry {
  numRegular: number;
  numFoil: number;
}

interface Collection {
  [key: string]: CollectionEntry;
}

export { type Collection, type CollectionEntry };
