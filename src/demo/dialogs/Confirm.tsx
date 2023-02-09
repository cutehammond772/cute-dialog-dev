import { useDialogView } from "@lib/hooks";
import { Dialog, DialogTemplate } from "@lib/types/essential";
import { useEffect } from "react";

import "@demo/dialogs/Confirm.style.css";

const Element: Dialog = ({ id }) => {
  const view = useDialogView(id);

  useEffect(() => {
    const interval = setInterval(() => {
      const handle = view.getHandle();
      if (!handle) return;

      handle.style.top = `${Math.random() * 1000}px`;
      handle.style.left = `${Math.random() * 1000}px`;
    }, 1000);

    return () => clearInterval(interval);
  }, [view]);

  return (
    <>
      <h3>This is a test confirm dialog.</h3>
      <h4>Are you understand?</h4>
    </>
  );
};

const Confirm: DialogTemplate = [{ className: "confirm" }, Element];

export default Confirm;
