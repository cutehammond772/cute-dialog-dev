import { PatchSignature } from "@lib/types/patch";
import { useCallback, useEffect, useRef, useState } from "react";

const usePatchEvents = () => {
  const receivers = useRef<Record<string, () => void>>({});
  const callbacks = useRef<Record<PatchSignature, Record<string, any>>>({});

  const events = useRef<Array<string>>([]);
  const [eventCount, setEventCount] = useState<number>(0);

  const receive = useCallback((event: string, callbackFn: () => void) => {
    receivers.current[event] = callbackFn;
  }, []);

  const emit = useCallback((event: string) => {
    events.current = events.current.concat(event);
    setEventCount((count) => count + 1);
  }, []);

  const callback = useCallback(<T>(signature: PatchSignature, name: string, callback?: T) => {
    if (!callback) {
      if (!callbacks.current[signature] || !callbacks.current[signature][name]) {
        throw new Error(
          `존재하지 않는 Patch Callback 함수를 호출하였습니다. [${signature}::${name}]`
        );
      }

      return callbacks.current[signature][name];
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

  useEffect(() => {
    events.current.forEach((event) => {
      const callbackFn = receivers.current[event];

      // 특정 event에 대한 receiver의 callback을 호출합니다.
      if (callbackFn) callbackFn();
    });

    events.current = [];
  }, [eventCount]);

  return { receive, emit, callback };
};

export default usePatchEvents;
