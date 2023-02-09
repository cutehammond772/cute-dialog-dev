import { useContext } from "react";
import DialogContext from "@lib/contexts/DialogContext";
import { IDialogContext } from "@lib/types/context";

// Dialog를 생성할 수 있는 Hook입니다.
const useDialogCreator = () => {
  const { _addDialog, _removeDialog } = useContext<IDialogContext>(DialogContext);

  return { addDialog: _addDialog, removeDialog: _removeDialog };
};

export default useDialogCreator;
