import { DialogElement, DialogTemplate } from "@lib/types/essential";
import { useDialog } from "@lib/hooks";

import "@demo/dialogs/chat/Chat.style.css";

const Element: DialogElement = () => {
  const { removeDialog, addStyles, resetStyles } = useDialog();

  return (
    <>
      <div className="title">🐿 cutehammond</div>
      <div className="notification">+99</div>
    </>
  );
};

const Chat: DialogTemplate = [{ defaultStyle: { className: "chat" } }, Element];

export default Chat;
