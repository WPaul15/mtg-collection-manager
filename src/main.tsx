import { PrimeReactProvider } from 'primereact/api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/soho-light/theme.css';
import './main.scss';
import { ScryfallProvider } from './providers/ScryfallProvider';
import { routes } from './view';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider
      value={{
        ripple: true,
      }}
    >
      <ScryfallProvider>
        <RouterProvider router={createBrowserRouter(Object.values(routes))} />
      </ScryfallProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
