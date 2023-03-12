import {
  DialogProfile,
  DialogReferenceFunction,
  DialogReferenceKey,
  DialogTemplate,
} from "@/common";

interface DialogContainerFeatures {
  addDialog: (dialog: DialogTemplate) => DialogReferenceKey;
  removeDialog: DialogReferenceFunction<void>;
}

interface DialogHandleFeatures {
  getHandle: DialogReferenceFunction<HTMLDivElement>;
}

interface DialogProfileFeatures {
  getProfile: DialogReferenceFunction<DialogProfile>;
}

export type DialogProviderContext = DialogContainerFeatures &
  DialogHandleFeatures &
  DialogProfileFeatures;

export interface DialogAreaProfile {
  className: string;
}
