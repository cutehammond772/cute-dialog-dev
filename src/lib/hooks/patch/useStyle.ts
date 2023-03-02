import { useCallback } from "react";
import { useDialog } from "@lib/hooks";
import { Style, StylePatchRequest, StylePatchRequestType } from "@lib/patches/style";

const useStyle = () => {
  const { request } = useDialog();

  const addStyles = useCallback(
    (...classNames: Array<string>) =>
      request<StylePatchRequest>(Style.signature, { type: StylePatchRequestType.ADD, classNames }),
    [request]
  );

  const removeStyles = useCallback(
    (...classNames: Array<string>) =>
      request<StylePatchRequest>(Style.signature, {
        type: StylePatchRequestType.REMOVE,
        classNames,
      }),
    [request]
  );

  const resetStyles = useCallback(
    () =>
      request<StylePatchRequest>(Style.signature, {
        type: StylePatchRequestType.RESET,
        classNames: [],
      }),
    [request]
  );

  return { addStyles, removeStyles, resetStyles };
};

export default useStyle;
