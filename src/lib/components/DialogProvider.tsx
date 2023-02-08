import { useDialogContainer } from "@lib/hooks";
import DialogContext from "@lib/contexts/DialogContext";
import * as React from "react";

const DialogProvider = ({ children }: React.PropsWithChildren) => {
  const { container, add, remove } = useDialogContainer();

  return (
    <DialogContext.Provider value={{ addDialog: add, removeDialog: remove }}>
      {children}
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        {Object.keys(container).map((id) => (
          <React.Fragment key={id}>{container[id]}</React.Fragment>
        ))}
      </div>
    </DialogContext.Provider>
  );
};

export default DialogProvider;
