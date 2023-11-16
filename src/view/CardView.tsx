import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useScryfall } from '../providers/ScryfallProvider';

export const CardView = () => {
  const { getCardsByQuery, getRulings, getSet, getError } = useScryfall();

  const getAndLogCard = () => {
    getCardsByQuery({
      q: 'solphim',
    }).then((res) => {
      console.log({ res });
    });
  };

  const getAndLogRulings = () => {
    getRulings().then((res) => {
      console.log({ res });
    });
  };

  const getAndLogSet = () => {
    getSet().then((res) => {
      console.log({ res });
    });
  };

  const getAndLogError = () => {
    getError().then((res) => {
      console.log({ res });
    });
  };

  return (
    <div className="flex justify-content-center">
      <div className="flex-grow-1">
        <p>Test</p>
      </div>
      <Divider layout="vertical" />
      <div className="flex-grow-1">
        <Button label="Solphim" onClick={getAndLogCard} />
        <Button label="Derevi's Rulings" onClick={getAndLogRulings} />
        <Button label="Aether Revolt" onClick={getAndLogSet} />
        <Button label="Error" onClick={getAndLogError} />
      </div>
    </div>
  );
};
