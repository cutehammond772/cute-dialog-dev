import { Patch, Patcher } from "@lib/types/patch/patcher";
import { useRef } from "react";

const usePatch = <R extends object>(patcher: Patcher, patch: Patch<any, R>) => {
  const registered = useRef<boolean>(false);

  if (!registered.current) {
    patcher.reserve(patch);
    registered.current = true;
  }
};

export default usePatch;
