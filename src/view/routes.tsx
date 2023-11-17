import { RouteObject } from 'react-router-dom';
import { CardView } from './CardView';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <CardView />,
  },
];
