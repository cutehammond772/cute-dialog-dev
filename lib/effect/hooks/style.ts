import { useCallback } from "react";
import { useDialog, usePatches } from "@cute-dialog/core";

import { StyleRequest, StyleRequestType } from "@effect/types/style";
import Style from "@effect/patches/style";

/**
 * Style Patch를 적용하여 이 Dialog의 Style을 자유자재로 다룰 수 있게 합니다.
 *
 * 단, 이 Hook을 사용하면 자동으로 Patch가 적용되며
 * 이를 원치 않을 경우 매개변수 { autoRegister: false }를 지정하세요.
 */
const useStyle = (autoRegister = true) => {
  const { request } = useDialog();

  // 자동으로 Patch를 적용합니다.
  usePatches(autoRegister ? [Style] : []);

  const addStyles = useCallback(
    (...classNames: Array<string>) =>
      request<StyleRequest>({
        signature: Style.signature,
        request: { type: StyleRequestType.ADD, classNames },
      }),
    [request]
  );

  const removeStyles = useCallback(
    (...classNames: Array<string>) =>
      request<StyleRequest>({
        signature: Style.signature,
        request: {
          type: StyleRequestType.REMOVE,
          classNames,
        },
      }),
    [request]
  );

  const resetStyles = useCallback(
    () =>
      request<StyleRequest>({
        signature: Style.signature,
        request: {
          type: StyleRequestType.RESET,
          classNames: [],
        },
      }),
    [request]
  );

  return { addStyles, removeStyles, resetStyles };
};

export default useStyle;
