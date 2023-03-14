import React, { useCallback } from "react";
import { DialogReferenceKey } from "@core/common";
import { usePatcher } from "@core/patcher/hooks";

import DialogResolverContext from "@core/resolver/context";
import { useDialogProvider } from "@core/provider/hooks";

/**
 * 특정 Dialog에서,
 *
 * 1. 리렌더링이 필요한 연산은 이 컴포넌트에서 수행됩니다.
 * 2. 고유의 Context를 제공합니다.
 */
const DialogResolver = ({
  reference,
  children,
}: React.PropsWithChildren<{ reference: DialogReferenceKey }>) => {
  const { removeDialog } = useDialogProvider();

  // Patch를 통해 Handle을 관리하거나, Dialog에 Event를 발생시킵니다.
  const { has, request, reserve, subscribe } = usePatcher(reference);

  // Dialog를 삭제합니다.
  const remove = useCallback(() => removeDialog(reference), [reference, removeDialog]);

  return (
    <DialogResolverContext.Provider value={{ request, subscribe, remove, reserve, has }}>
      {children}
    </DialogResolverContext.Provider>
  );
};

export default DialogResolver;
