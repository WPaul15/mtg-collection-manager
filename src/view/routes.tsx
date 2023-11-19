import { RouteObject } from 'react-router-dom';
import { CardView } from './CardView';
import { MainMenuView } from './MainMenuView';

enum Route {
  MainMenuView = 'MainMenuView',
  CardView = 'CardView',
  CollectionView = 'CollectionView',
}

export const routes: Record<Route, RouteObject> = {
  MainMenuView: {
    path: '/',
    element: <MainMenuView />,
  },
  CardView: {
    path: '/card',
    element: <CardView />,
  },
  CollectionView: {
    path: '/collection',
    element: <CardView />,
  },
} as const;
