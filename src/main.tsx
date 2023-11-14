import { PrimeReactProvider } from "primereact/api";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/soho-light/theme.css";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider
      value={{
        ripple: true,
      }}
    >
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
