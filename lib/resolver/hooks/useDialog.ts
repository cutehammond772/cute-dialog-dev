import { DialogResolverContext } from "@/resolver";
import Context from "@resolver/context";
import { useContext } from "react";

/**
 * DialogResolver 내부에서 사용하는 Hook입니다.
 */
const useDialog = () => {
  return useContext<DialogResolverContext>(Context);
};

export default useDialog;
