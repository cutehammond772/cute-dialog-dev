import * as React from "react";
import { DialogProviderContext } from "@/provider";

const outOfContext: DialogProviderContext = {
  addDialog() {
    throw new Error("DialogProvider 외부에서는 addDialog()를 사용할 수 없습니다.");
  },
  getHandle() {
    throw new Error("DialogProvider 외부에서는 getHandle()를 사용할 수 없습니다.");
  },
  getProfile() {
    throw new Error("DialogProvider 외부에서는 getProfile()를 사용할 수 없습니다.");
  },
  removeDialog() {
    throw new Error("DialogProvider 외부에서는 removeDialog()를 사용할 수 없습니다.");
  },
};

const Context = React.createContext<DialogProviderContext>(outOfContext);

export default Context;
