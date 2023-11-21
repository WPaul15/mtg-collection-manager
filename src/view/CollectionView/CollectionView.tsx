import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { useScryfall } from '../../providers/ScryfallProvider';
import { Card } from '../../schema';
import { Collection, CollectionEntry } from '../../types/Collection';

import styles from './CollectionView.module.scss';

const collection: Collection = {
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
};

interface TableRow {
  card: Card;
  collectionInfo: CollectionEntry;
}

export const CollectionView = () => {
  const [rows, setRows] = useState<TableRow[]>([]);
  const { getCardsByCollection, replaceSymbols } = useScryfall();

  useEffect(() => {
    getCardsByCollection({
      identifiers: [
        ...Object.keys(collection).map((item) => {
          return { id: item };
        }),
      ],
    }).then((res) => {
      const entries: TableRow[] = [];
      console.log({ res });

      res.data.forEach((card) => {
        entries.push({
          card,
          collectionInfo: collection[card.id],
        });
      });

      setRows(entries);
    });
  }, []);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Collection</span>
    </div>
  );

  return (
    <>
      <DataTable header={header} value={rows} stripedRows scrollable>
        <Column header="Name" field="card.name" frozen className="font-bold" />
        <Column
          header="Mana Cost"
          body={(row: TableRow) => {
            if (row.card.manaCost) {
              return replaceSymbols(row.card.manaCost);
            } else if (row.card.cardFaces) {
              const manaCost = row.card.cardFaces
                .filter((cardFace) => {
                  return !!cardFace.manaCost;
                })
                .map((cardFace) => cardFace.manaCost)
                .join(' // ');

              return replaceSymbols(manaCost);
            }

            return '';
          }}
        />
        <Column
          header="Type"
          body={(row: TableRow) => {
            return row.card.typeLine;
          }}
        />
        <Column
          header="Rarity"
          body={(row: TableRow) => {
            return (
              <Tag value={row.card.rarity.displayValue} className={styles[`rarityTag-${row.card.rarity.apiValue}`]} />
            );
          }}
        />
        <Column
          header="Set"
          body={(row: TableRow) => {
            return `${row.card.setName} (${row.card.set})`;
          }}
        />
        <Column
          header="Number"
          body={(row: TableRow) => {
            return <p className="m-0 text-right">{row.card.collectorNumber.padStart(4, '0')}</p>;
          }}
        />
        <Column
          header="Regular"
          body={(row: TableRow) => {
            return <p className="m-0 text-right">{row.collectionInfo.numRegular}</p>;
          }}
        />
        <Column
          header="Foil"
          body={(row: TableRow) => {
            return <p className="m-0 text-right">{row.collectionInfo.numFoil}</p>;
          }}
        />
      </DataTable>
    </>
  );
};
