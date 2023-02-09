import { Dialog, DialogID, DialogTemplate } from "@lib/types/essential";

export interface IDialogContext {
  // Add Dialog to Container
  addDialog: (dialog: DialogTemplate) => DialogID;

  // Remove Dialog from Container
  removeDialog: (id: DialogID) => void;

  // Fetch Handle
  getHandle: (id: DialogID) => HTMLDivElement | undefined;
}

export interface IDialogContainer {
  [id: DialogID]: Dialog;
}
