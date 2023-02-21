import { useContext } from "react";
import { IDialogProviderContext } from "@lib/types/context";

import DialogProviderContext from "@lib/contexts/DialogProviderContext";

const useDialogCreator = () => {
  const { addDialog } = useContext<IDialogProviderContext>(DialogProviderContext);
  return { addDialog };
};

export default useDialogCreator;
