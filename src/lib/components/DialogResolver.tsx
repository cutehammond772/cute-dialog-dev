import { useCallback, useContext } from "react";
import { IDialogProviderContext } from "@lib/types/context";
import { DialogReferenceKey } from "@lib/types/essential";
import { usePatch, usePatcher } from "@lib/hooks";

import DialogContext from "@lib/contexts/DialogContext";
import DialogProviderContext from "@lib/contexts/DialogProviderContext";
import StylePatch, { StylePatchRequestType } from "@lib/patches/StylePatch";

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

  // DialogProvider의 함수를 특정 Dialog에 맞게 가공합니다.
  const removeDialog = useCallback(() => provider.removeDialog(reference), [provider, reference]);

  // 이 Dialog의 Handle 관리를 담당합니다.
  const patcher = usePatcher(reference);

  // 특정 Dialog의 Style을 동적으로 관리합니다.
  const styles = usePatch(patcher, StylePatch);

  const addStyles = useCallback(
    (...classNames: Array<string>) => {
      styles.request({ type: StylePatchRequestType.ADD, classNames });
    },
    [styles]
  );

  const removeStyles = useCallback(
    (...classNames: Array<string>) => {
      styles.request({ type: StylePatchRequestType.REMOVE, classNames });
    },
    [styles]
  );

  const resetStyles = useCallback(() => {
    styles.request({ type: StylePatchRequestType.RESET, classNames: [] });
  }, [styles]);

  return (
    <DialogContext.Provider
      value={{ removeDialog, addStyles, removeStyles, resetStyles }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export default DialogResolver;
