import { Button } from 'primereact/button';
import { Card as PRCard } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Image } from 'primereact/image';
import { ReactNode, useState } from 'react';
import { useScryfall } from '../../providers/ScryfallProvider';
import { Card } from '../../schema';
import { CardQueryRequest } from '../../types/request';

import styles from './CardView.module.scss';

interface StatLineProps {
  title: string;
  value: ReactNode | ReactNode[];
}

const StatLine = ({ title, value }: StatLineProps) => {
  return (
    <p className="m-0">
      <span className="font-bold">{title}</span> | {value}
    </p>
  );
};

export const CardView = () => {
  const [card, setCard] = useState<Card>();
  const { getCardsByQuery, replaceSymbols } = useScryfall();

  const getCard = (query: CardQueryRequest) => {
    getCardsByQuery(query).then((cards) => {
      console.log({ cards });
      setCard(cards.data[0]);
    });
  };

  return (
    <div className="flex justify-content-center">
      <div className="flex-grow-1">
        <Button
          label="Mondrak"
          onClick={() => {
            getCard({ q: 'mondrak' });
          }}
        />
        <Button
          label="Solphim"
          onClick={() => {
            getCard({ q: 'solphim' });
          }}
        />
        <Button
          label="Liliana"
          onClick={() => {
            getCard({ q: 'liliana of the veil' });
          }}
        />
        {card && (
          <PRCard title={card.name} subTitle={card.typeLine}>
            <StatLine title="Mana Cost" value={replaceSymbols(card.manaCost)} />
            <Divider />
            {card.oracleText?.split('\n').map((line, i) => {
              return (
                <p key={i} className={`m-0 mb-3`}>
                  {replaceSymbols(line)}
                </p>
              );
            })}
            <Divider />
            {card.typeLine.match(/Creature/) && (
              <>
                <StatLine title="Power / Toughness" value={`${card.power} / ${card.toughness}`} />
                <Divider />
              </>
            )}
            {card.typeLine.match(/Planeswalker/) && (
              <>
                <StatLine title="Loyalty" value={card.loyalty} />
                <Divider />
              </>
            )}
            <StatLine
              title={`${card.setName} (${card.set})`}
              value={`#${card.collectorNumber} | ${card.rarity.displayValue}`}
            />
            <Divider />
            <StatLine title="Artist" value={card.artist} />
          </PRCard>
        )}
      </div>
      <Divider layout="vertical" />
      <div className="flex-grow-1">{card && <Image src={card.imageUris?.png} className={styles.cardImage} />}</div>
    </div>
  );
};
