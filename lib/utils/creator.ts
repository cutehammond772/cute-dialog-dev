import { DialogUID } from "@/common";

export const createDialogUID = (): DialogUID => {
  const uuid = crypto.randomUUID();
  return uuid;
};
