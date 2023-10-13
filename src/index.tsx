import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "./components/Router";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./translations";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RouterProvider />
  </React.StrictMode>,
);

serviceWorkerRegistration.register();

reportWebVitals();
