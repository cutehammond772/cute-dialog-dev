import { DialogReferenceKey, DialogTemplate } from "@lib/types/essential";

export interface IDialogProviderContext {
  addDialog: (dialog: DialogTemplate) => DialogReferenceKey;
  removeDialog: (reference: DialogReferenceKey) => void;
  getHandle: (reference: DialogReferenceKey) => HTMLDivElement | undefined;
}

export interface IDialogContext {
  reference: DialogReferenceKey;
  getHandle: () => HTMLDivElement | undefined;
  remove: () => void;
}
