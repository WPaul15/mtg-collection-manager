import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useScryfall } from '../providers/ScryfallProvider';

export const CardView = () => {
  const { searchCards, getRulings } = useScryfall();

  const getAndLogCard = () => {
    searchCards().then((res) => {
      console.log({ res });
    });
  };

  const getAndLogRulings = () => {
    getRulings().then((res) => {
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
        <Button label="Search for Solphim" onClick={getAndLogCard} />
        <Button label="Derevi's Rulings" onClick={getAndLogRulings} />
      </div>
    </div>
  );
};
