import React from "react";
import DialogProvider from "@lib/components/DialogProvider";
import DefaultPage from "@demo/DefaultPage";

const App = () => (
  <DialogProvider>
    <DefaultPage />
  </DialogProvider>
);

export default App;
