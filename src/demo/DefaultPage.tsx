import { useDialog } from "@lib/hooks";
import Confirm from "./dialogs/Confirm";

const DefaultPage = () => {
  const { addDialog } = useDialog();

  return (
    <div>
      <button onClick={() => addDialog(<Confirm />)}>Add Confirm Dialog</button>
    </div>
  );
};

export default DefaultPage;
