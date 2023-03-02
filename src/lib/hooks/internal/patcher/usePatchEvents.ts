import { PatchEventMappings, PatchSignature } from "@lib/types/patch";
import { useCallback, useEffect, useRef, useState } from "react";

const usePatchEvents = () => {
  const receivers = useRef<Record<string, () => void>>({});
  const [events, setEvents] = useState<Array<string>>([]);

  const callbacks = useRef<Record<PatchSignature, Record<string, any>>>({});

  const subscribeEvent = useCallback((event: string, callbackFn: () => void) => {
    receivers.current[event] = callbackFn;
  }, []);

  const publishEvent = useCallback((event: string) => {
    setEvents((events) => events.concat(event));
  }, []);

  // Hook 내부에서만 사용하는 함수로, callback 매개변수의 여부에 따라 콜백 함수를 "저장 후 반환" / "가져온 후 제거" 합니다.
  const memoCallback = useCallback(<T>(signature: PatchSignature, name: string, callback?: T) => {
    if (!callback) {
      if (!callbacks.current[signature] || !callbacks.current[signature][name]) {
        // 저장된 콜백 함수가 존재하지 않는 경우 undefined를 반환합니다.
        return undefined;
      }

      const { [name]: poppedCallback, ...rest } = callbacks.current[signature];
      callbacks.current = { ...callbacks.current, [signature]: rest };

      return poppedCallback;
    }

    if (!callbacks.current[signature]) {
      callbacks.current = { ...callbacks.current, [signature]: {} };
    }

    callbacks.current = {
      ...callbacks.current,
      [signature]: { ...callbacks.current[signature], [name]: callback },
    };

    return callback;
  }, []);

  /**
   * Handle Event와의 매핑을 해제합니다.
   */
  const unmapEvents = useCallback(
    (signature: PatchSignature, mappings: PatchEventMappings, handle: HTMLDivElement) =>
      Object.keys(mappings).forEach((event) => {
        const callback = memoCallback(signature, event);
        if (callback) handle.removeEventListener(event, callback);
      }),
    [memoCallback]
  );

  /**
   * Handle Event와의 매핑을 설정합니다.
   * 예를 들어, "onclick" Event가 발생할 시 이에 매핑되는 Patch Event가 발생되도록 합니다.
   */
  const mapEvents = useCallback(
    (signature: PatchSignature, mappings: PatchEventMappings, handle: HTMLDivElement) => {
      Object.keys(mappings).forEach((event) => {
        const callback = memoCallback(signature, event);
        if (callback) handle.removeEventListener(event, callback);

        handle.addEventListener(
          event,
          memoCallback(signature, event, () => publishEvent(mappings[event]))
        );
      });
    },
    [memoCallback, publishEvent]
  );

  useEffect(() => {
    if (events.length === 0) return;

    events.forEach((event) => {
      const callbackFn = receivers.current[event];

      // 특정 event에 대한 receiver의 callback을 호출합니다.
      if (callbackFn) callbackFn();
    });

    setEvents((evs) => evs.slice(events.length));
  }, [events]);

  return { subscribeEvent, publishEvent, mapEvents, unmapEvents };
};

export default usePatchEvents;
