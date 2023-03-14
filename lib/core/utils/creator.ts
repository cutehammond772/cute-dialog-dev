import { DialogUID } from "@core/common";

export const createDialogUID = (): DialogUID => {
  const uuid = crypto.randomUUID();
  return uuid;
};
