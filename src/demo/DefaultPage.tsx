import { useContext } from "react";
import { DialogContext } from "../lib/components/DialogProvider";
import { IDialogContext } from "../lib/types/provider";
import Confirm from "./dialogs/Confirm";

const DefaultPage = () => {
  const { addDialog } = useContext<IDialogContext>(DialogContext);

  return (
    <div>
      <button onClick={() => addDialog(<Confirm />)}>Add Confirm Dialog</button>
    </div>
  );
};

export default DefaultPage;
