import { useCallback } from "react";
import { DialogElement, DialogTemplate } from "@lib/types/essential";
import { useAnimation, usePointer, useStyle } from "@lib/hooks";

import "@demo/dialogs/chat/Chat.style.css";

const Element: DialogElement = () => {
  const { addStyles, removeStyles } = useStyle();
  const { onAnimationEnd } = useAnimation();
  const { onClick } = usePointer();

  onClick(useCallback(() => removeStyles("chat-wider"), [removeStyles]));
  onAnimationEnd(useCallback(() => addStyles("chat-wider"), [addStyles]));

  return (
    <>
      <div className="title">🐿 cutehammond</div>
      <div className="notification">+99</div>
    </>
  );
};

const Chat: DialogTemplate = [{ defaultStyle: { className: "chat" } }, Element];

export default Chat;
