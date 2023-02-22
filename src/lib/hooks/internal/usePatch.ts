import { Patch, Patcher, PatchUID } from "@lib/types/patch";
import { useCallback, useRef } from "react";

const usePatch = <R extends object>(patcher: Patcher, patch: Patch<any, R>) => {
  const uid = useRef<PatchUID>();

  if (!uid.current) {
    uid.current = patcher.register(patch);
  }

  // 요청할 수 있는 시기가 정확히 언제부터인지 분석해야 한다.
  const request = useCallback(
    (request: R) => {
      patcher.request(uid.current!, request);
    },
    [patcher]
  );

  return { request };
};

export default usePatch;
