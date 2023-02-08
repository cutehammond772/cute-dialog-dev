import { IDialogContainer } from "@lib/types/context";
import { Dialog, DialogID } from "@lib/types/essential";
import { createDialogID } from "@lib/utils/creator";
import { useCallback, useState } from "react";

const useDialogContainer = () => {
  const [container, setContainer] = useState<IDialogContainer>({});

  const add = useCallback((dialog: Dialog, id?: DialogID) => {
    const dialogID = id ?? createDialogID();
    setContainer((container) => ({ ...container, [dialogID]: dialog }));
  }, []);

  const remove = useCallback((id: DialogID) => {
    setContainer((container) => ({ ...container, [id]: undefined }));
  }, []);

  return { container, add, remove };
};

export default useDialogContainer;
