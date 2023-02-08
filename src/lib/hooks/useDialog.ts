import { useContext } from "react";
import DialogContext from "@lib/contexts/DialogContext";
import { IDialogContext } from "@lib/types/context";

const useDialog = () => {
  const { addDialog, removeDialog } = useContext<IDialogContext>(DialogContext);
  return { addDialog, removeDialog };
};

export default useDialog;
