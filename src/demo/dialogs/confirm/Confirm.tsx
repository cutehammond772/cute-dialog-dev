import { DialogElement, DialogTemplate } from "@lib/types/essential";
import { useDialog } from "@lib/hooks";

import "@demo/dialogs/confirm/Confirm.style.css";
import { useCallback } from "react";
import { Style, StylePatchRequest, StylePatchRequestType } from "@lib/patches/style";

const Element: DialogElement = () => {
  const { remove, request } = useDialog();

  const addStyle = useCallback(
    (className: string) =>
      request<StylePatchRequest>(Style.signature, {
        type: StylePatchRequestType.ADD,
        classNames: [className],
      }),
    [request]
  );

  const resetStyle = useCallback(
    () =>
      request<StylePatchRequest>(Style.signature, {
        type: StylePatchRequestType.RESET,
        classNames: [],
      }),
    [request]
  );

  return (
    <>
      <h3>✅ 간단한 Confirm Dialog입니다. 아래의 버튼을 통해 Dialog를 동적으로 관리해보세요.</h3>
      <div className="button-group">
        <button onClick={() => addStyle("confirm-wide")}>이 Dialog를 더 크게 만들기</button>
        <button onClick={resetStyle}>현재 Style을 초기화하기</button>
        <button onClick={remove}>이 Dialog를 바로 삭제하기</button>
      </div>
    </>
  );
};

const Confirm: DialogTemplate = [{ defaultStyle: { className: "confirm" } }, Element];

export default Confirm;
