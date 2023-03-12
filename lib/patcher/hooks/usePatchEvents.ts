import { useCallback, useEffect, useRef, useState } from "react";
import { PatchEventSignature, PatchSignature } from "@/patch/common";
import { HandleEventMappings, PatchEvent, PatchEventCallback } from "@/patch/event";
import { PatchSubscribe } from "@/patch/patcher";

const usePatchEvents = () => {
  const subscribers = useRef<Record<PatchEventSignature, PatchEventCallback<any>>>({});
  const [events, setEvents] = useState<Array<PatchEvent<any>>>([]);

  const handleCallbacks = useRef<Record<PatchSignature, Record<PatchEventSignature, any>>>({});

  /**
   * 특정 Event를 받도록 합니다.
   *
   * - 단, 컴포넌트 로직의 Top-Level에서 호출해야 합니다. (= Hook의 위치와 동등함)
   * - 한 Event 당 하나의 콜백 함수만 매핑됩니다.
   * - useCallback() Hook을 같이 사용하는 것을 권장합니다.
   */
  const subscribeEvent = useCallback(<T>({ event, callback }: PatchSubscribe<T>) => {
    subscribers.current[event] = callback;
  }, []);

  /**
   * Event를 발생시킵니다.
   */
  const publishEvent = useCallback(<T>(event: PatchEvent<T>) => {
    setEvents((evs) => evs.concat(event));
  }, []);

  // Hook 내부에서만 사용하는 함수로, callback 매개변수의 여부에 따라 콜백 함수를 "저장 후 반환" / "가져온 후 제거" 합니다.
  const memoizeCallback = useCallback(
    <T extends Event>(
      signature: PatchSignature,
      name: string,
      callback?: (event: T) => void
    ): ((event: T) => void) | undefined => {
      if (!callback) {
        if (!handleCallbacks.current[signature] || !handleCallbacks.current[signature][name]) {
          // 저장된 콜백 함수가 존재하지 않는 경우 undefined를 반환합니다.
          return undefined;
        }

        const { [name]: poppedCallback, ...rest } = handleCallbacks.current[signature];
        handleCallbacks.current = { ...handleCallbacks.current, [signature]: rest };

        return poppedCallback;
      }

      if (!handleCallbacks.current[signature]) {
        handleCallbacks.current = { ...handleCallbacks.current, [signature]: {} };
      }

      handleCallbacks.current = {
        ...handleCallbacks.current,
        [signature]: { ...handleCallbacks.current[signature], [name]: callback },
      };

      return callback;
    },
    []
  );

  /**
   * Handle Event와의 매핑을 해제합니다.
   */
  const unmapEvents = useCallback(
    (signature: PatchSignature, mappings: HandleEventMappings, handle: HTMLDivElement) =>
      Object.keys(mappings).forEach((event) => {
        const callback = memoizeCallback(signature, event);
        if (callback) handle.removeEventListener(event, callback);
      }),
    [memoizeCallback]
  );

  /**
   * Handle Event와의 매핑을 설정합니다.
   * 예를 들어, "onclick" Event가 발생할 시 이에 매핑되는 Patch Event가 발생되도록 합니다.
   *
   * Note: React에서 매핑된 Event가 아닌 DOM Event를 직접 가져옵니다.
   */
  const mapEvents = useCallback(
    (signature: PatchSignature, mappings: HandleEventMappings, handle: HTMLDivElement) => {
      Object.keys(mappings).forEach((handleEvent) => {
        const callback = memoizeCallback(signature, handleEvent);
        if (callback) handle.removeEventListener(handleEvent, callback);

        handle.addEventListener(
          handleEvent,
          memoizeCallback(signature, handleEvent, (eventObj) =>
            publishEvent({ eventName: mappings[handleEvent], payload: eventObj })
          )!
        );
      });
    },
    [memoizeCallback, publishEvent]
  );

  useEffect(() => {
    if (events.length === 0) return;

    events.forEach(({ eventName, payload }) => {
      const callbackFn = subscribers.current[eventName];

      // 특정 event에 대한 subscriber의 callback을 호출합니다.
      if (callbackFn) callbackFn({ payload });
    });

    setEvents((evs) => evs.slice(events.length));
  }, [events]);

  return { subscribeEvent, publishEvent, mapEvents, unmapEvents };
};

export default usePatchEvents;
