import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "./components/Router";
import "./translations";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RouterProvider />
  </React.StrictMode>,
);
