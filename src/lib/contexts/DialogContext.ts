import * as React from "react";
import { IDialogContext } from "@lib/types/context";

const DialogContext = React.createContext<IDialogContext>(null as any);

export default DialogContext;