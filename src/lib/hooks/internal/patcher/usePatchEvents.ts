import { PatchSignature } from "@lib/types/patch";
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

  const memoCallback = useCallback(<T>(signature: PatchSignature, name: string, callback?: T) => {
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
    if (events.length === 0) return;
    
    events.forEach((event) => {
      const callbackFn = receivers.current[event];

      // 특정 event에 대한 receiver의 callback을 호출합니다.
      if (callbackFn) callbackFn();
    });

    setEvents((evs) => evs.slice(events.length));
  }, [events]);

  return { subscribeEvent, publishEvent, memoCallback };
};

export default usePatchEvents;
