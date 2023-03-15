import { useContext } from "react";
import Context, { ModalContext } from "@modal/context";

const useModal = () => {
  return useContext<ModalContext>(Context);
};

export default useModal;
