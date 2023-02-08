import { DialogID } from "@lib/types/essential";

export const createDialogID = (): DialogID => {
  const uuid = crypto.randomUUID();
  return uuid;
};