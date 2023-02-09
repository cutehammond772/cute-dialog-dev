import { useCallback, useContext } from "react";
import DialogContext from "@lib/contexts/DialogContext";
import { IDialogContext } from "@lib/types/context";
import { DialogID } from "@lib/types/essential";
import { useDialogCreator } from "@lib/hooks";

// 일반적으로 Dialog Element 내에서 사용할 수 있는 Hook입니다.
const useDialog = (id: DialogID) => {
  const { _getHandle } = useContext<IDialogContext>(DialogContext);
  const { removeDialog } = useDialogCreator();

  const getHandle = useCallback(() => {
    return _getHandle(id);
  }, [_getHandle, id]);

  const remove = useCallback(() => removeDialog(id), [id, removeDialog]);

  return { getHandle, remove };
};

export default useDialog;
