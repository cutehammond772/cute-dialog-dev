import { DialogIDRef } from "@lib/types/essential";
import { useCallback, useRef } from "react";

const useDialogHandle = () => {
  const refs = useRef<WeakMap<DialogIDRef, HTMLDivElement>>(new WeakMap());

  const register = useCallback((reference: DialogIDRef, ref: HTMLDivElement) => {
    if (refs.current.has(reference)) {
      throw new Error();
    }

    refs.current.set(reference, ref);
    return ref;
  }, []);

  const get = useCallback((reference: DialogIDRef) => {
    return refs.current.get(reference);
  }, []);

  return { register, get };
};

export default useDialogHandle;
