import { useEffect } from "react";
import { Dialog, DialogTemplate } from "@lib/types/essential";
import { useDialog } from "@lib/hooks";

import "@demo/dialogs/Confirm.style.css";

const Element: Dialog = ({ id }) => {
  const view = useDialog(id);

  useEffect(() => {
    setTimeout(() => {
      const handle = view.getHandle();
      if (!handle) return;

      handle.style.opacity = "1";
    }, 0);
  }, [view]);

  return (
    <>
      <h3>Press remove to close this Dialog.</h3>
      <button onClick={() => view.remove()}>REMOVE</button>
    </>
  );
};

const Confirm: DialogTemplate = [{ className: "confirm" }, Element];

export default Confirm;
