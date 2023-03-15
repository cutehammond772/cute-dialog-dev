import React from "react";

export interface ModalContext {
  close: () => void;
}

const outOfContext: ModalContext = {
  close() {
    throw new Error("Modal 외부에서는 close()를 사용할 수 없습니다.");
  },
};

const Context = React.createContext<ModalContext>(outOfContext);

export default Context;
