import { useCallback, useContext } from "react";
import { IDialogProviderContext } from "@lib/types/context";
import { DialogReferenceKey } from "@lib/types/essential";
import { usePatch, usePatcher } from "@lib/hooks";

import DialogContext from "@lib/contexts/DialogContext";
import DialogProviderContext from "@lib/contexts/DialogProviderContext";

import { Style } from "@lib/patches/style";
import { Animation } from "@lib/patches/animation";
import { Pointer } from "@lib/patches/pointer";

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
  const provider = useContext<IDialogProviderContext>(DialogProviderContext);

  // Patch를 통해 Handle을 관리하거나, Dialog에 Event를 발생시킵니다.
  const patcher = usePatcher(reference);

  // Patch를 등록합니다.
  // Note: 추후 usePatch는 사라질 예정입니다.
  usePatch(patcher, Animation);
  usePatch(patcher, Style);
  usePatch(patcher, Pointer);

  // Dialog를 삭제합니다.
  const remove = useCallback(() => provider.removeDialog(reference), [provider, reference]);

  return (
    <DialogContext.Provider
      value={{ remove, request: patcher.request, subscribe: patcher.subscribe }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export default DialogResolver;
