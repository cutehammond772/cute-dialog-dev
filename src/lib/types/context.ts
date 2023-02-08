import { Dialog, DialogID } from "@lib/types/essential";

export interface IDialogContext {
  addDialog: (dialog: Dialog) => void;
  removeDialog: (id: DialogID) => void;
}

export interface IDialogContainer {
  [id: DialogID]: Dialog;
}
