import { PointerEvent } from "@lib/patches/pointer";
import { useCallback } from "react";
import { useDialog } from "@lib/hooks";
import { HandleEventHandler } from "@lib/types/patch";

const usePointer = () => {
  const { subscribe } = useDialog();

  const onHover: HandleEventHandler<MouseEvent> = useCallback(
    (callback) => subscribe(PointerEvent.HOVER, callback),
    [subscribe]
  );

  const onClick: HandleEventHandler<MouseEvent> = useCallback(
    (callback) => subscribe(PointerEvent.CLICK, callback),
    [subscribe]
  );

  return { onHover, onClick };
};

export default usePointer;
