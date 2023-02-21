import {
  DialogProfile,
  DialogReferenceFunction,
  DialogReferenceKey,
  DialogTemplate,
} from "@lib/types/essential";

interface DialogContainerFeatures {
  addDialog: (dialog: DialogTemplate) => DialogReferenceKey;
  removeDialog: DialogReferenceFunction<void>;
}

interface DialogHandleFeatures {
  getHandle: DialogReferenceFunction<HTMLDivElement | undefined>;
}

interface DialogProfileFeatures {
  getProfile: DialogReferenceFunction<DialogProfile>;
}

export type IDialogProviderContext = DialogContainerFeatures &
  DialogHandleFeatures &
  DialogProfileFeatures;

export interface IDialogContext {
  // Dialog 삭제
  removeDialog: () => void;

  // 동적 Style 관리
  addStyles: (...classNames: string[]) => void;
  removeStyles: (...classNames: string[]) => void;
  resetStyles: () => void;
}
