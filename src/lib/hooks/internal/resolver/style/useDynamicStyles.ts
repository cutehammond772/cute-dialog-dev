import { useCallback, useRef } from "react";
import { Patcher, PatchUID } from "@lib/types/patch";
import StylePatch, { StylePatchRequest } from "@lib/hooks/internal/resolver/style/patch";

const useDynamicStyles = (patcher: Patcher) => {
  const uid = useRef<PatchUID>();

  if (!uid.current) {
    uid.current = patcher.register(StylePatch);
  }

  const request = useCallback((request: StylePatchRequest) => {
    patcher.request(uid.current!, request);
  }, [patcher]);

  return { request };
};

export default useDynamicStyles;
