import { IDialogContainer } from "@lib/types/context";
import { Dialog, DialogID, DialogIDRef } from "@lib/types/essential";
import { createDialogID } from "@lib/utils/creator";
import { useCallback, useRef, useState } from "react";

const filtered = (container: IDialogContainer, dialogID: DialogID) =>
  Object.keys(container)
    .filter((id) => id !== dialogID)
    .reduce((accumulation, id) => {
      accumulation[id] = container[id];
      return accumulation;
    }, {} as IDialogContainer);

const useDialogContainer = () => {
  const [container, setContainer] = useState<IDialogContainer>({});
  const references = useRef<Array<DialogIDRef>>([]);

  const add = useCallback((dialog: Dialog, id?: DialogID) => {
    // Creating Dialog ID
    const dialogID = id ?? createDialogID();

    // Creating Reference
    const reference: DialogIDRef = { id: dialogID };

    // Add Dialog to Container
    setContainer((container) => ({ ...container, [dialogID]: dialog }));

    // Register Reference
    references.current = references.current.concat(reference);

    return { reference, dialogID };
  }, []);

  const remove = useCallback((id: DialogID) => {
    // Remove Dialog
    setContainer((container) => filtered(container, id));

    // Unregister Reference
    references.current = references.current.filter((ref) => ref.id !== id);
  }, []);

  const ref = useCallback((id: DialogID) => {
    return references.current.find((ref) => ref.id === id);
  }, []);

  const handler = useCallback(
    <T>(handler: (id: DialogID, dialog: Dialog) => T): T[] => {
      return Object.keys(container).map((id: DialogID) => handler(id, container[id]));
    },
    [container]
  );

  return { container, add, remove, ref, handler };
};

export default useDialogContainer;
