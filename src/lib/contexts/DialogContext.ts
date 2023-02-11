import * as React from "react";
import { IDialogContext } from "@lib/types/context";

// 특정한 Dialog의 Context를 나타냅니다.
const DialogContext = React.createContext<IDialogContext>(null as any);

export default DialogContext;