import { PatchSignature } from "@/patch/common";
import { Patch, PatchRequest, PatchSubscribe } from "@/patch/patcher";

export interface DialogResolverContext {
  // Dialog 자신을 삭제합니다.
  remove: () => void;

  // 등록된 Patch에 요청을 보냅니다. 등록되지 않은 Patch인 경우 요청은 무시됩니다.
  request: <R extends object>(request: PatchRequest<R>) => void;

  // Patch에서 발생된 Event를 받아 콜백 함수를 호출합니다.
  subscribe: <T>(subscribe: PatchSubscribe<T>) => void;

  // Patch를 동적으로 주입합니다. (예약 형태로 주입됩니다.)
  inject?: <S extends object, R extends object>(patch: Patch<S, R>) => void;

  // Patch를 동적으로 삭제합니다.
  // Note: '초기에 설정된' Patch는 일단 삭제되지 않도록 합니다.
  reject?: (signature: PatchSignature) => void;
}
