import { useCallback, useMemo, useRef, useState } from "react";
import { DialogElement, DialogReferenceKey, DialogUID } from "@lib/types/essential";
import { createDialogUID } from "@lib/utils/creator";

/**
 * Dialog Element를 관리함과 동시에 해당 Dialog의 레퍼런스를 관리하는 Hook입니다.
 * 레퍼런스의 존재 여부에 따라, 이 레퍼런스를 이용하는 다른 영역에서 GC가 자동으로 일어납니다.
 */
const useDialogContainer = () => {
  const [references, setReferences] = useState<Array<DialogReferenceKey>>([]);
  const container = useRef<WeakMap<DialogReferenceKey, DialogElement>>(new WeakMap());

  const add = useCallback((element: DialogElement) => {
    const uid = createDialogUID();
    const reference: DialogReferenceKey = { uid };

    // Container에 Dialog Element를 저장합니다.
    container.current.set(reference, element);

    setReferences((references) => references.concat(reference));
    return { reference };
  }, []);

  const remove = useCallback((reference: DialogReferenceKey) => {
    // 레퍼런스를 삭제합니다. 이 레퍼런스를 이용하는 다른 영역에서 자동으로 GC가 일어납니다.
    setReferences((references) => references.filter(({ uid }) => uid !== reference.uid));
  }, []);

  // 일반적으로는 사용하지 않는 것을 권장합니다.
  const getReference = useCallback(
    (uid: DialogUID) => {
      return references.find((ref) => ref.uid === uid);
    },
    [references]
  );

  // 레퍼런스와 Element의 쌍을 반환합니다.
  const entries = useMemo(
    () =>
      references.map((reference) => ({ reference, element: container.current.get(reference)! })),
    [references]
  );

  return { container, add, remove, getReference, entries };
};

export default useDialogContainer;
