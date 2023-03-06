import { useCallback, useEffect, useState } from "react";
import { DialogElement, DialogTemplate } from "@lib/types/essential";
import { usePointer, useStyle } from "@lib/hooks";

import "@demo/dialogs/chat/Chat.style.css";

const Element: DialogElement = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { addStyles, removeStyles } = useStyle();
  const { onClick } = usePointer();

  onClick(useCallback(() => setOpen((open) => !open), []));

  useEffect(() => {
    if (open) addStyles("chat-wider");
    if (!open) removeStyles("chat-wider");
  }, [open, addStyles, removeStyles]);

  return (
    <>
      <div className="title">🐿 cutehammond</div>
      <div className="notification">+99</div>
    </>
  );
};

const Chat: DialogTemplate = [{ defaultStyle: { className: "chat" } }, Element];

export default Chat;
