import { useDialogCreator } from "@lib/hooks";
import Confirm from "@demo/dialogs/Confirm";

const DefaultPage = () => {
  const { addDialog } = useDialogCreator();

  return (
    <div style={{ position: "absolute" }}>
      <button onClick={() => addDialog(Confirm)}>Add Confirm Dialog</button>
    </div>
  );
};

export default DefaultPage;
