import { routes } from '..';
import { RouterButton } from '../../components/common/RouterButton';

export const MainMenuView = () => {
  return (
    <div>
      <RouterButton label="Card View" to={routes.CardView} />
      <RouterButton label="Collection View" to={routes.CollectionView} />
    </div>
  );
};
