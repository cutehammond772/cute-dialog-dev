import { DialogIDRef } from "@lib/types/essential";
import { useCallback, useRef } from "react";

// Dialog의 Ref 객체를 관리하는 Hook입니다.
const useDialogHandles = () => {
  const refs = useRef<WeakMap<DialogIDRef, HTMLDivElement>>(new WeakMap());

  // Dialog의 레퍼런스를 키로 하여 Ref 객체를 저장합니다.
  const register = useCallback((reference: DialogIDRef, ref: HTMLDivElement) => {
    if (refs.current.has(reference)) {
      // 이미 저장된 경우 오류가 발생합니다.
      throw new Error();
    }

    refs.current.set(reference, ref);
    return ref;
  }, []);

  // Dialog의 레퍼런스를 통해 Ref 객체를 가져옵니다.
  const get = useCallback((reference: DialogIDRef) => {
    return refs.current.get(reference);
  }, []);

  return { register, get };
};

export default useDialogHandles;
