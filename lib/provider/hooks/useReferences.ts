import { useCallback, useState } from "react";
import { DialogReferenceKey } from "@/common";
import { createDialogUID } from "@utils/creator";

/**
 * Dialog의 레퍼런스 객체를 관리하는 Hook입니다.
 * 레퍼런스의 존재 여부에 따라, 이 레퍼런스를 이용하는 다른 영역에서 GC가 자동으로 일어납니다.
 */
const useReferences = () => {
  const [references, setReferences] = useState<Array<DialogReferenceKey>>([]);

  const createRef = useCallback(() => {
    const uid = createDialogUID();
    const reference: DialogReferenceKey = { uid };

    setReferences((refs) => refs.concat(reference));
    return reference;
  }, []);

  const removeRef = useCallback((reference: DialogReferenceKey) => {
    setReferences((refs) => refs.filter((ref) => ref !== reference));
  }, []);

  return { createRef, removeRef, references };
};

export default useReferences;
