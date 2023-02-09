import DialogContext from "@lib/contexts/DialogContext";
import { IDialogContext } from "@lib/types/context";
import { DialogID } from "@lib/types/essential";
import { useCallback, useContext } from "react";

const useDialogView = (id: DialogID) => {
  const { getHandle: _getHandle } = useContext<IDialogContext>(DialogContext);

  const getHandle = useCallback(() => {
    return _getHandle(id);
  }, [_getHandle, id]);

  return { getHandle };
};

export default useDialogView;
