import { PointerEvent } from "@lib/patches/pointer";
import { useCallback } from "react";
import { useDialog } from "@lib/hooks";

const usePointer = () => {
  const { subscribe } = useDialog();

  const onHover = useCallback(
    (callbackFn: <MouseEvent>(data: { payload: MouseEvent }) => void) =>
      subscribe(PointerEvent.HOVER, callbackFn),
    [subscribe]
  );

  const onClick = useCallback(
    (callbackFn: <MouseEvent>(data: { payload: MouseEvent }) => void) =>
      subscribe(PointerEvent.CLICK, callbackFn),
    [subscribe]
  );

  return { onHover, onClick };
};

export default usePointer;
