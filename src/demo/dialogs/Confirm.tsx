import { useEffect } from "react";
import { DialogElement, DialogTemplate } from "@lib/types/essential";
import { useDialog } from "@lib/hooks";

import "@demo/dialogs/Confirm.style.css";

const Element: DialogElement = () => {
  const { getHandle, remove } = useDialog();

  useEffect(() => {
    setTimeout(() => {
      const handle = getHandle();
      if (!handle) return;

      handle.style.opacity = "1";
    }, 0);
  }, [getHandle]);

  return (
    <>
      <h3>Press remove to close this Dialog.</h3>
      <button onClick={remove}>REMOVE</button>
    </>
  );
};

const Confirm: DialogTemplate = [{ defaultStyle: { className: "confirm" } }, Element];

export default Confirm;
