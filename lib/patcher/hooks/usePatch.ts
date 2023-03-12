import { useRef } from "react";
import { Patch, Patcher } from "@/patch/patcher";

const usePatch = <R extends object>(patcher: Patcher, patch: Patch<any, R>) => {
  const registered = useRef<boolean>(false);

  if (!registered.current) {
    patcher.reserve(patch);
    registered.current = true;
  }
};

export default usePatch;
