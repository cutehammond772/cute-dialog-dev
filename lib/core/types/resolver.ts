import { PatchSignature } from "@core/patch/common";
import { Patch, PatchRequest, PatchSubscribe } from "@core/patch/patcher";

export interface DialogResolverContext {
  // Dialog 자신을 삭제합니다.
  remove: () => void;

  // 등록된 Patch에 요청을 보냅니다. 등록되지 않은 Patch인 경우 요청은 무시됩니다.
  request: <R extends object>(request: PatchRequest<R>) => void;

  // Patch에서 발생된 Event를 받아 콜백 함수를 호출합니다.
  subscribe: <T>(subscribe: PatchSubscribe<T>) => void;

  // Patch 등록을 예약합니다.
  reserve: <S extends object, R extends object>(patch: Patch<S, R>) => void;

  // Patch가 예약 중이거나 이미 등록된 상태인지 확인합니다.
  has: (signature: PatchSignature) => boolean;
}
