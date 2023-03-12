import { useCallback, useRef } from "react";
import { DialogReferenceKey } from "@/common";

const useReferenceContainer = <T>() => {
  const container = useRef<WeakMap<DialogReferenceKey, T>>(new WeakMap());

  const register = useCallback((reference: DialogReferenceKey, element: T) => {
    if (container.current.has(reference)) {
      throw new Error("이미 존재하는 Reference에 대해 등록을 시도했습니다.");
    }

    container.current.set(reference, element);
  }, []);

  const has = useCallback((reference: DialogReferenceKey) => container.current.has(reference), []);

  const get = useCallback(
    (reference: DialogReferenceKey) => {
      if (!has(reference)) {
        throw new Error("존재하지 않는 Reference입니다.");
      }

      return container.current.get(reference)!;
    },
    [has]
  );

  return { register, has, get };
};

export default useReferenceContainer;
