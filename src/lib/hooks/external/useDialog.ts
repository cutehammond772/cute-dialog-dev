import { useContext } from "react";
import { IDialogContext } from "@lib/types/context";

import DialogContext from "@lib/contexts/DialogContext";

/**
 * DialogResolver 내부에서 사용하는 Hook입니다.
 * 이 이외의 영역에서는 사용할 수 없습니다.
 */
const useDialog = () => {
  const context = useContext<IDialogContext>(DialogContext);

  if (!context) {
    // DialogResolver 외부에서 사용된 경우 오류가 발생합니다.
    throw new Error();
  }

  return { ...context };
};

export default useDialog;
