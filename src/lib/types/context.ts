import {
  DialogProfile,
  DialogReferenceFunction,
  DialogReferenceKey,
  DialogTemplate,
} from "@lib/types/essential";
import { PatchRequest, PatchSubscribe } from "@lib/types/patch/patcher";

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

export type IDialogProviderContext = DialogContainerFeatures &
  DialogHandleFeatures &
  DialogProfileFeatures;

export interface IDialogContext {
  // Dialog 자기 자신을 삭제합니다.
  // Note: 직접 호출을 지양합니다. 이후 request()로 통합될 수 있습니다.
  remove: () => void;

  // 등록된 Patch에 요청을 보냅니다. 등록되지 않은 Patch인 경우 요청은 무시됩니다.
  request: <R extends object>(request: PatchRequest<R>) => void;

  // Patch에서 발생된 Event를 받아 콜백 함수를 호출합니다.
  subscribe: <T>(subscribe: PatchSubscribe<T>) => void;
}
