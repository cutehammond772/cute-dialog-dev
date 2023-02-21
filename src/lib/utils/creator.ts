import { DialogUID } from "@lib/types/essential";
import { PatchUID } from "@lib/types/patch";

export const createDialogUID = (): DialogUID => {
  const uuid = crypto.randomUUID();
  return uuid;
};

export const createPatchUID = (): PatchUID => {
  const uuid = crypto.randomUUID();
  return uuid;
};
