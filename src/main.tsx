import { PrimeReactProvider } from "primereact/api";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/soho-light/theme.css";
import "./main.css";
import { routes } from "./view";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider
      value={{
        ripple: true,
      }}
    >
      <RouterProvider router={createBrowserRouter(routes)} />
    </PrimeReactProvider>
  </React.StrictMode>
);
