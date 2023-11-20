interface CardIdentifier {
  id: string;
}

interface CardCollectionRequest {
  identifiers: CardIdentifier[];
  pretty?: boolean;
}

export { type CardCollectionRequest };
