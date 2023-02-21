import { useCallback, useRef } from "react";
import { DialogReferenceKey } from "@lib/types/essential";

const useReferenceContainer = <T>() => {
  const container = useRef<WeakMap<DialogReferenceKey, T>>(new WeakMap());

  const register = useCallback((reference: DialogReferenceKey, element: T) => {
    if (container.current.has(reference)) {
      throw new Error();
    }

    container.current.set(reference, element);
  }, []);

  const has = useCallback((reference: DialogReferenceKey) => container.current.has(reference), []);

  const get = useCallback((reference: DialogReferenceKey) => {
    if (!has(reference)) {
      throw new Error();
    }

    return container.current.get(reference)!;
  }, [has]);
  
  return { register, has, get };
};

export default useReferenceContainer;
