import Context from "@provider/context";
import { DialogProviderContext } from "@/provider";
import { useContext } from "react";

const useDialogProvider = () => {
  return useContext<DialogProviderContext>(Context);
};

export default useDialogProvider;
