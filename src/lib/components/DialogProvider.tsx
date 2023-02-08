import * as React from "react";
import { useState, useCallback } from "react";
import { IDialogContainer, IDialogContext } from "../types/provider";

export const DialogContext = React.createContext<IDialogContext>(null as any);

const DialogProvider = ({ children }: React.PropsWithChildren) => {
  const [container, setContainer] = useState<IDialogContainer>({});

  const addDialog = useCallback((dialog: React.ReactNode) => {
    const uuid = crypto.randomUUID();
    setContainer((container) => ({ ...container, [uuid]: dialog }));
  }, []);

  const removeDialog = useCallback(
    (id: string) => {
      if (!container[id]) {
        throw new Error();
      }

      setContainer((container) =>
        Object.keys(container)
          .filter((cid) => cid !== id)
          .reduce((accu, id) => {
            accu[id] = container[id];
            return accu;
          }, {} as IDialogContainer)
      );
    },
    [container]
  );

  return (
    <DialogContext.Provider value={{ addDialog, removeDialog }}>
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
