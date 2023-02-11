import * as React from "react";
import { useCallback } from "react";
import { useDialogContainer, useDialogHandles, useDialogProfiles } from "@lib/hooks";
import { DialogTemplate } from "@lib/types/essential";
import DialogArea from "@lib/components/DialogArea";
import DialogResolver from "@lib/components/DialogResolver";
import DialogProviderContext from "@lib/contexts/DialogProviderContext";

/**
 * Dialog를 관리하는 최상위 컴포넌트입니다.
 */
const DialogProvider = ({ children }: React.PropsWithChildren) => {
  // Dialog의 Element 객체와 레퍼런스를 저장합니다.
  // TODO: 분리 필요
  const container = useDialogContainer();

  // Dialog의 Ref 객체를 저장합니다. 하위 컴포넌트에서 가져온 뒤 수정할 수 있습니다.
  const handles = useDialogHandles();

  // Dialog의 기본 Profile를 저장합니다.
  const profiles = useDialogProfiles();

  const addDialog = useCallback(
    (dialog: DialogTemplate) => {
      const [profile, element] = dialog;
      const { reference } = container.add(element);

      profiles.register(reference, profile);

      return reference;
    },
    [container, profiles]
  );

  /**
   * Note:
   * 각 Dialog의 Re-render가 필요할 때, DialogProvider부터 Re-render가 진행되지 않도록 "역할"을 분담해야 합니다.
   * DialogProvider가 Re-render되는 경우는, 새로운 Dialog의 추가 또는 기존 Dialog의 삭제만 존재하도록 합니다.
   */
  return (
    <DialogProviderContext.Provider
      value={{ addDialog, removeDialog: container.remove, getHandle: handles.get }}
    >
      {children}
      <DialogArea>
        {container.entries.map(({ reference, element: DialogElement }) => {

          // 기본 Profile을 가져옵니다.
          const profile = profiles.get(reference);

          if (!profile) {
            // 기본 Profile이 존재하지 않는 경우, 이미 만료된 Dialog임을 의미합니다.
            throw new Error();
          }

          // Dialog의 Element는, "div" 또는 "div"를 기반으로 하는 Element여야 합니다.
          const DialogComponent = profile?.customElement ?? "div";

          return (
            <DialogComponent
              key={reference.uid}
              style={profile?.defaultStyle?.css}
              className={profile.defaultStyle?.className}
              ref={(ref) => !ref || (handles.get(reference) ?? handles.register(reference, ref))}
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
