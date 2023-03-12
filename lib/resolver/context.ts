import React from "react";
import { DialogResolverContext } from "@/resolver";

const outOfContext: DialogResolverContext = {
  remove() {
    throw new Error("DialogResolver 외부에서는 remove()를 사용할 수 없습니다.");
  },
  request() {
    throw new Error("DialogResolver 외부에서는 request()를 사용할 수 없습니다.");
  },
  subscribe() {
    throw new Error("DialogResolver 외부에서는 subscribe()를 사용할 수 없습니다.");
  },
};

// '특정한' Dialog의 Context입니다.
const Context = React.createContext<DialogResolverContext>(outOfContext);

export default Context;
