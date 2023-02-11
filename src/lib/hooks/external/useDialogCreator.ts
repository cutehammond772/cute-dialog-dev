import { useContext } from "react";
import { IDialogProviderContext } from "@lib/types/context";
import DialogProviderContext from "@lib/contexts/DialogProviderContext";

const useDialogCreator = () => {
  const { addDialog, removeDialog } = useContext<IDialogProviderContext>(DialogProviderContext);

  return { addDialog, removeDialog };
};

export default useDialogCreator;
