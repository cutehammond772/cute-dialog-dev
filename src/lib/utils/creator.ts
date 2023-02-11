import { DialogUID } from "@lib/types/essential";

export const createDialogUID = (): DialogUID => {
  const uuid = crypto.randomUUID();
  return uuid;
};