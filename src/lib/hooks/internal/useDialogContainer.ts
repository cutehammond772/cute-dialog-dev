import { IDialogContainer } from "@lib/types/context";
import { Dialog, DialogID, DialogIDRef } from "@lib/types/essential";
import { createDialogID } from "@lib/utils/creator";
import { useCallback, useRef, useState } from "react";

// 특정 Dialog를 걸러냅니다.
const filtered = (container: IDialogContainer, dialogID: DialogID) =>
  Object.keys(container)
    .filter((id) => id !== dialogID)
    .reduce((accumulation, id) => {
      accumulation[id] = container[id];
      return accumulation;
    }, {} as IDialogContainer);

/**
 * Dialog Element를 관리함과 동시에 해당 Dialog의 레퍼런스를 관리하는 Hook입니다.
 * 레퍼런스의 존재 여부에 따라, 이 레퍼런스를 이용하는 다른 영역에서 GC가 자동으로 일어납니다.
 */
const useDialogContainer = () => {
  const [container, setContainer] = useState<IDialogContainer>({});
  const references = useRef<Array<DialogIDRef>>([]);

  // Dialog Element를 저장합니다.
  const add = useCallback((dialog: Dialog, id?: DialogID) => {
    // DialogID를 생성합니다.
    const dialogID = id ?? createDialogID();

    // 특정 Dialog에 대한 레퍼런스를 생성합니다.
    const reference: DialogIDRef = { id: dialogID };

    // Container에 Dialog Element를 저장합니다.
    setContainer((container) => ({ ...container, [dialogID]: dialog }));

    // 레퍼런스를 등록합니다.
    references.current = references.current.concat(reference);

    return { reference, dialogID };
  }, []);

  // Dialog Element를 삭제합니다.
  const remove = useCallback((id: DialogID) => {
    // Container에서 Dialog Element를 삭제합니다.
    setContainer((container) => filtered(container, id));

    // 레퍼런스를 삭제합니다. 이 레퍼런스를 이용하는 다른 영역에서 자동으로 GC가 일어납니다.
    references.current = references.current.filter((ref) => ref.id !== id);
  }, []);

  // 특정 Dialog에 대한 레퍼런스를 반환합니다.
  const ref = useCallback((id: DialogID) => {
    return references.current.find((ref) => ref.id === id);
  }, []);

  // 이 Container를 이용하여 일련의 과정을 수행합니다.
  const handler = useCallback(
    <T>(handler: (id: DialogID, dialog: Dialog) => T): T[] => {
      return Object.keys(container).map((id: DialogID) => handler(id, container[id]));
    },
    [container]
  );

  return { container, add, remove, ref, handler };
};

export default useDialogContainer;
