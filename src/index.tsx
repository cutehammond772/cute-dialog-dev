import React from "react";
import ReactDOM from "react-dom/client";
import { DialogProvider } from "@cute-dialog/core";

import App from "./components/App";
import { area } from "./global";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DialogProvider className={area}>
    <App />
  </DialogProvider>
);
