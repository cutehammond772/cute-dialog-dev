export { usePatches } from "@core/patcher/hooks";

export { default as DialogProvider } from "@core/provider/components/DialogProvider";

export { default as DialogArea } from "@core/provider/components/DialogArea";

export { useDialogProvider } from "@core/provider/hooks";

export { useDialog } from "@core/resolver/hooks";

export type { Patch } from "@core/patch/patcher";

export type {
  HandleEventHandler,
  PatchEventCallback,
  DefaultEventHandler,
} from "@core/patch/event";

export type { DialogElement, DialogProfile, DialogTemplate, DialogComponent } from "@core/common";
