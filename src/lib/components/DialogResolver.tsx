import { useCallback, useContext } from "react";
import { IDialogProviderContext } from "@lib/types/context";
import { DialogReferenceKey } from "@lib/types/essential";
import DialogContext from "@lib/contexts/DialogContext";
import DialogProviderContext from "@lib/contexts/DialogProviderContext";

/**
 * 특정 Dialog를 관리하는 컴포넌트입니다.
 * 특정 Dialog에서 리렌더링이 필요한 연산은 이 컴포넌트에서 수행됩니다.
 */
const DialogResolver = ({
  reference,
  children,
}: React.PropsWithChildren<{ reference: DialogReferenceKey }>) => {
  // DialogProvider의 Context를 가져옵니다.
  const provider = useContext<IDialogProviderContext>(DialogProviderContext);

  const getHandle = useCallback(() => provider.getHandle(reference), [provider, reference]);
  const remove = useCallback(() => provider.removeDialog(reference), [provider, reference]);

  return (
    <DialogContext.Provider value={{ reference, getHandle, remove }}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogResolver;
