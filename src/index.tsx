import React from "react";
import ReactDOM from "react-dom/client";
import "./translations";
import { RouterProvider } from "./components/Router";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider />
  </React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
