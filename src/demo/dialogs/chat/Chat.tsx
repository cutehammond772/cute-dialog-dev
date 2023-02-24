import { useCallback } from "react";
import { DialogElement, DialogTemplate } from "@lib/types/essential";
import { AnimationTimingEvent } from "@lib/patches/animation";
import { useDialog } from "@lib/hooks";

import "@demo/dialogs/chat/Chat.style.css";
import { Style, StylePatchRequest, StylePatchRequestType } from "@lib/patches/style";

const Element: DialogElement = () => {
  const { subscribe, request } = useDialog();

  subscribe(
    AnimationTimingEvent.ANIMATION_START,
    useCallback(() => {
      console.log("chat animation started!");
    }, [])
  );

  subscribe(
    AnimationTimingEvent.ANIMATION_END,
    useCallback(() => {
      console.log("chat animation ended!");
      request<StylePatchRequest>(Style.signature, {
        type: StylePatchRequestType.ADD,
        classNames: ["chat-wider"],
      });
    }, [request])
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
