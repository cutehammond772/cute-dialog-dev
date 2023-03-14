import React, { useCallback } from "react";
import { DialogReferenceKey, DialogTemplate } from "@core/common";
import { DialogAreaProfile } from "@core/provider";
import DialogArea from "@core/provider/components/DialogArea";
import DialogProviderContext from "@core/provider/context";
import DialogResolver from "@core/resolver/components/DialogResolver";

import useReferences from "@core/provider/hooks/useReferences";
import useElements from "@core/provider/hooks/useElements";
import useProfiles from "@core/provider/hooks/useProfiles";
import useHandles from "@core/provider/hooks/useHandles";

/**
 * Dialog를 관리하는 최상위 컴포넌트입니다.
 */
const DialogProvider = ({ children, className }: React.PropsWithChildren<DialogAreaProfile>) => {
  const { createRef, removeRef, references } = useReferences();

  const { registerElement, getElement } = useElements();
  const { registerProfile, getProfile } = useProfiles();

  // Dialog의 Ref 객체를 저장합니다. 하위 컴포넌트에서 가져온 뒤 수정할 수 있습니다.
  const { registerHandle, getHandle, hasHandle } = useHandles();

  const addDialog = useCallback(
    (dialog: DialogTemplate) => {
      const reference = createRef();
      const [profile, element] = dialog;

      registerProfile(reference, profile);
      registerElement(reference, element);
      return reference;
    },
    [createRef, registerElement, registerProfile]
  );

  const removeDialog = useCallback(
    (reference: DialogReferenceKey) => removeRef(reference),
    [removeRef]
  );

  // 렌더 시 Ref 객체를 가져와 handles에 등록합니다.
  const handleRef = useCallback(
    (reference: DialogReferenceKey, ref: HTMLDivElement | null) => {
      if (!ref) return null;
      if (hasHandle(reference)) return getHandle(reference);

      registerHandle(reference, ref);
      return ref;
    },
    [getHandle, hasHandle, registerHandle]
  );

  return (
    <DialogProviderContext.Provider
      value={{
        addDialog,
        removeDialog,
        getHandle,
        getProfile,
      }}
    >
      {children}
      <DialogArea className={className}>
        {references
          .map((reference) => ({
            reference,
            element: getElement(reference),
            profile: getProfile(reference),
          }))
          .map(({ reference, element: DialogElement, profile }) => {
            // DialogComponent는, "div" 또는 "div"를 기반으로 하는 Component여야 합니다.
            const DialogComponent = profile?.baseComponent ?? "div";

            return (
              <DialogComponent
                key={reference.uid}
                className={profile?.className}
                ref={(ref) => handleRef(reference, ref)}
              >
                <DialogResolver reference={reference}>
                  <DialogElement />
                </DialogResolver>
              </DialogComponent>
            );
          })}
      </DialogArea>
    </DialogProviderContext.Provider>
  );
};

export default DialogProvider;
