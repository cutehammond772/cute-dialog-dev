import * as React from "react";
import { useCallback } from "react";
import { useDialogContainer, useDialogHandles, useDialogProfiles } from "@lib/hooks";
import { DialogID, DialogTemplate } from "@lib/types/essential";
import DialogArea from "@lib/components/DialogArea";
import DialogContext from "@lib/contexts/DialogContext";

const DialogProvider = ({ children }: React.PropsWithChildren) => {
  // Dialog의 Element 객체를 저장합니다.
  const container = useDialogContainer();

  // Dialog의 Ref 객체를 저장합니다. 하위 컴포넌트에서 가져온 뒤 수정할 수 있습니다.
  const handles = useDialogHandles();

  // Dialog의 기본 Profile 객체를 저장합니다.
  const profiles = useDialogProfiles();

  // DialogTemplate를 통해 새로운 Dialog를 생성합니다.
  const addDialog = useCallback(
    (dialog: DialogTemplate) => {
      const [profile, element] = dialog;

      // Element를 Container에 추가하면서 레퍼런스와 DialogID를 가져옵니다.
      const { reference, dialogID } = container.add(element);

      // 레퍼런스를 키로 하여 Profile을 저장합니다.
      profiles.register(reference, profile);

      return dialogID;
    },
    [container, profiles]
  );

  // DialogID를 이용해 해당 Dialog의 Ref 객체를 가져옵니다.
  const getHandle = useCallback(
    (id: DialogID) => {
      const reference = container.ref(id);

      // Ref 객체가 초기화되는 시점은 렌더링 이후이므로 nullable을 허용합니다.
      return reference ? handles.get(reference) : undefined;
    },
    [container, handles]
  );

  return (
    <DialogContext.Provider
      value={{ _addDialog: addDialog, _removeDialog: container.remove, _getHandle: getHandle }}
    >
      {children}
      <DialogArea>
        {container.handler((id, Dialog) => {
          // 특정 Dialog에 대한 레퍼런스를 가져옵니다.
          const reference = container.ref(id);

          if (!reference) {
            // 레퍼런스가 존재하지 않는 경우 이미 만료된 Dialog입니다.
            throw new Error();
          }

          // Profile을 가져옵니다.
          const profile = profiles.get(reference);

          if (!profile) {
            // Profile이 존재하지 않는 경우 이미 만료된 Dialog입니다.
            throw new Error();
          }

          // Dialog의 Element는, "div" 또는 "div"를 기반으로 하는 Element여야 합니다.
          const Component = profile.element ?? "div";

          return (
            <Component
              key={id}
              style={profile.css}
              className={profile.className}
              ref={(ref) => !ref || (handles.get(reference) ?? handles.register(reference, ref))}
            >
              <Dialog id={id} />
            </Component>
          );
        })}
      </DialogArea>
    </DialogContext.Provider>
  );
};

export default DialogProvider;
