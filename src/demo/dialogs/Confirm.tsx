import { DialogElement, DialogTemplate } from "@lib/types/essential";
import { useDialog } from "@lib/hooks";

import "@demo/dialogs/Confirm.style.css";

const Element: DialogElement = () => {
  const { removeDialog, addStyles, resetStyles } = useDialog();
  
  return (
    <>
      <h3>Press remove to close this Dialog.</h3>
      <button onClick={() => addStyles("confirm-wide")}>Wider</button>
      <button onClick={resetStyles}>Reset Style</button>
      <button onClick={removeDialog}>Remove</button>
    </>
  );
};

const Confirm: DialogTemplate = [{ defaultStyle: { className: "confirm" } }, Element];

export default Confirm;
