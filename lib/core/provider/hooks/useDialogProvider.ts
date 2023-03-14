import Context from "@core/provider/context";
import { DialogProviderContext } from "@core/provider";
import { useContext } from "react";

const useDialogProvider = () => {
  return useContext<DialogProviderContext>(Context);
};

export default useDialogProvider;
