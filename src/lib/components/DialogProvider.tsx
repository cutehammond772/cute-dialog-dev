import * as React from "react";
import { useCallback } from "react";
import { useDialogContainer, useDialogHandle, useDialogProfile } from "@lib/hooks";
import { DialogID, DialogTemplate } from "@lib/types/essential";
import DialogArea from "@lib/components/DialogArea";
import DialogContext from "@lib/contexts/DialogContext";

const DialogProvider = ({ children }: React.PropsWithChildren) => {
  const container = useDialogContainer();
  const handle = useDialogHandle();
  const profiles = useDialogProfile();

  const addDialog = useCallback(
    (dialog: DialogTemplate) => {
      const [profile, element] = dialog;

      // Add Dialog to Container
      const { reference, dialogID } = container.add(element);

      // Register Dialog Profile
      profiles.register(reference, profile);

      return dialogID;
    },
    [container, profiles]
  );

  const getHandle = useCallback(
    (id: DialogID) => {
      const reference = container.ref(id);
      return reference ? handle.get(reference) : undefined;
    },
    [container, handle]
  );

  return (
    <DialogContext.Provider value={{ addDialog, removeDialog: container.remove, getHandle }}>
      {children}
      <DialogArea>
        {container.handler((id, Dialog) => {
          // Dialog Reference with DialogID
          const reference = container.ref(id);

          if (!reference) {
            // When Dialog is Expired
            throw new Error();
          }

          // DialogProfile
          const profile = profiles.get(reference);

          if (!profile) {
            // When Dialog Profile is Expired
            throw new Error();
          }

          // "DivElement" OR "Div-Based Element"
          const Component = profile.element ?? "div";

          return (
            <Component
              key={id}
              style={profile.css}
              className={profile.className}
              ref={(ref) => !ref || (handle.get(reference) ?? handle.register(reference, ref))}
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
