import { DataView } from 'primereact/dataview';
import { Skeleton } from 'primereact/skeleton';
import { ReactNode, useEffect, useState } from 'react';
import { useScryfall } from '../../providers/ScryfallProvider';
import { Card } from '../../schema';
import { CardCountMetadata, Collection } from '../../types/Collection';

const collection: Collection = {
  name: 'My collection',
  cards: {
    '01ed59b1-968b-4297-9e98-42d940f9478c': {
      numRegular: 2,
      numFoil: 0,
    },
    '20cd8b8b-b800-44f6-a395-0ba032c09646': {
      numRegular: 0,
      numFoil: 1,
    },
    '49f219db-b6e2-48bf-a316-b57736e09ae9': {
      numRegular: 3,
      numFoil: 1,
    },
    'aae6fb12-b252-453b-bca7-1ea2a0d6c8dc': {
      numRegular: 0,
      numFoil: 1,
    },
    '3f5acc0d-33a6-476f-95ca-a1ad788334dd': {
      numRegular: 1,
      numFoil: 0,
    },
    'c6d6876e-7d83-44bd-b721-5070f4087325': {
      numRegular: 5,
      numFoil: 0,
    },
    '1728ad2d-c8a6-49e4-85bb-29934fa26208': {
      numRegular: 0,
      numFoil: 1,
    },
    'ba16bfb3-dbd3-4b3a-b155-08b613268d57': {
      numRegular: 3,
      numFoil: 0,
    },
    '098c976b-6096-4ac7-8d52-2f219ae21d1f': {
      numRegular: 0,
      numFoil: 1,
    },
  },
};

interface CollectionEntry {
  card: Card;
  cardCountMetadata: CardCountMetadata;
}

const ItemTemplate = ({ card, cardCountMetadata }: CollectionEntry) => {
  const { replaceSymbols } = useScryfall();
  const [manaCost, setManaCost] = useState<ReactNode[]>();
  const [imageUri, setImageUri] = useState<string>();

  useEffect(() => {
    if (card.manaCost) {
      setManaCost(replaceSymbols(card.manaCost));
    } else if (card.cardFaces) {
      const manaCost = card.cardFaces
        .filter((cardFace) => {
          return !!cardFace.manaCost;
        })
        .map((cardFace) => cardFace.manaCost)
        .join(' // ');

      setManaCost(replaceSymbols(manaCost));
    }
  }, []);

  useEffect(() => {
    if (card.imageUris) {
      setImageUri(card.imageUris.artCrop);
    } else if (card.cardFaces) {
      setImageUri(card.cardFaces[0].imageUris?.artCrop);
    }
  }, []);

  return (
    <div className="col-12">
      <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
        {imageUri ? (
          <img className="w-10rem shadow-2 block xl:block mx-auto border-round" src={imageUri} alt={`${card.name}`} />
        ) : (
          <Skeleton className="w-10rem shadow-2 h-7rem block xl:block mx-auto border-round" />
        )}
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
          <div className="flex flex-column align-items-center sm:align-items-start gap-2">
            <div className="text-2xl font-bold text-900">{card.name}</div>
            <span>{card.typeLine}</span>
            {manaCost && <div>{manaCost}</div>}
            <span>{`${card.setName} | ${card.rarity.displayValue}`}</span>
          </div>
          <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
            <div className="text-xl">
              <span className="font-semibold">Nonfoil:</span>&nbsp;{cardCountMetadata.numRegular}
            </div>
            <div className="text-xl">
              <span className="font-semibold">Foil:</span>
              &nbsp;{cardCountMetadata.numFoil}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CollectionView = () => {
  const [value, setValue] = useState<CollectionEntry[]>([]);
  const { getCardsByCollection } = useScryfall();

  useEffect(() => {
    getCardsByCollection({
      identifiers: [
        ...Object.keys(collection.cards).map((item) => {
          return { id: item };
        }),
      ],
    }).then((res) => {
      const entries: CollectionEntry[] = [];
      console.log({ res });

      res.data.forEach((card) => {
        entries.push({
          card,
          cardCountMetadata: collection.cards[card.id],
        });
      });

      setValue(entries);
    });
  }, []);

  return <DataView value={value} itemTemplate={ItemTemplate} />;
};
