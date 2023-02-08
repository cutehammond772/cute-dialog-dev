import * as React from "react";

export interface IDialogContext {
  addDialog: (dialog: React.ReactNode) => void;
  removeDialog: (id: string) => void;
}

export interface IDialogContainer {
  [id: string]: React.ReactNode;
}