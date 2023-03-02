import { useCallback } from "react";
import { DialogElement, DialogTemplate } from "@lib/types/essential";
import { useAnimation, useStyle } from "@lib/hooks";

import "@demo/dialogs/chat/Chat.style.css";

const Element: DialogElement = () => {
  const { onAnimationStart, onAnimationEnd } = useAnimation();
  const { addStyles } = useStyle();

  onAnimationStart(
    useCallback(() => {
      console.log("[ chat animation started ]");
    }, [])
  );

  onAnimationEnd(
    useCallback(() => {
      console.log("[ chat animation ended ]");
      addStyles("chat-wider");
    }, [addStyles])
  );

  return (
    <>
      <div className="title">🐿 cutehammond</div>
      <div className="notification">+99</div>
    </>
  );
};

const Chat: DialogTemplate = [{ defaultStyle: { className: "chat" } }, Element];

export default Chat;
