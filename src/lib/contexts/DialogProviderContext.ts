import * as React from "react";
import { IDialogProviderContext } from "@lib/types/context";

// DialogProvider의 Context를 생성합니다.
const DialogProviderContext = React.createContext<IDialogProviderContext>(null as any);

export default DialogProviderContext;