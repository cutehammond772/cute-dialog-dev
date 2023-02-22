import { useCallback, useRef } from "react";
import { Patcher, PatchUID } from "@lib/types/patch";
import StylePatch, { StylePatchRequest } from "@lib/hooks/internal/resolver/style/patch";

const useDynamicStyles = (patcher: Patcher) => {
  const uid = useRef<PatchUID>();

  if (!uid.current) {
    uid.current = patcher.register(StylePatch);
  }

  // 요청할 수 있는 시기가 정확히 언제부터인지 분석해야 한다.
  const request = useCallback((request: StylePatchRequest) => {
    patcher.request(uid.current!, request);
  }, [patcher]);

  return { request };
};

export default useDynamicStyles;
