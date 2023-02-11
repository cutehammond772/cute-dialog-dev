import { DialogReferenceKey } from "@lib/types/essential";
import { useCallback, useRef } from "react";

// Dialog의 Ref 객체를 관리하는 Hook입니다.
const useDialogHandles = () => {
  const refs = useRef<WeakMap<DialogReferenceKey, HTMLDivElement>>(new WeakMap());

  // Dialog의 레퍼런스를 키로 하여 Ref 객체를 저장합니다.
  const register = useCallback((reference: DialogReferenceKey, ref: HTMLDivElement) => {
    if (refs.current.has(reference)) {
      throw new Error();
    }

    refs.current.set(reference, ref);
    return ref;
  }, []);

  const get = useCallback((reference: DialogReferenceKey) => {
    return refs.current.get(reference);
  }, []);

  return { register, get };
};

export default useDialogHandles;
