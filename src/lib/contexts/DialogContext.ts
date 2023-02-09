import * as React from "react";
import { IDialogContext } from "@lib/types/context";

// Dialog Context를 생성합니다.
const DialogContext = React.createContext<IDialogContext>(null as any);

export default DialogContext;