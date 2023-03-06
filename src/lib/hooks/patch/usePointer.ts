import { PointerEvent } from "@lib/patches/pointer";
import { useCallback } from "react";
import { useDialog } from "@lib/hooks";
import { HandleEventHandler, PatchEventCallback } from "@lib/types/patch/event";

interface ElementPoint {
  x: number;
  y: number;
}

const usePointer = () => {
  const { subscribe } = useDialog();

  const onHover = useCallback(
    (callback: PatchEventCallback<ElementPoint>) => {
      const handleCallback: PatchEventCallback<MouseEvent> = ({ payload }) =>
        callback({ payload: { x: payload.offsetX, y: payload.offsetY } });

      subscribe({ event: PointerEvent.HOVER, callback: handleCallback });
    },
    [subscribe]
  );

  const onClick: HandleEventHandler<MouseEvent> = useCallback(
    (callback) => subscribe({ event: PointerEvent.CLICK, callback }),
    [subscribe]
  );

  return { onHover, onClick };
};

export default usePointer;
