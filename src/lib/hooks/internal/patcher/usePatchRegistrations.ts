import { PatcherRegisterFn, PatchNode, PatchRegistrationCallbackFn } from "@lib/types/patch";
import { useCallback, useEffect, useRef, useState } from "react";

const usePatchRegistrations = () => {
  const [nodes, setNodes] = useState<Array<PatchNode<any, any>>>([]);

  const reserved = useRef<Array<PatchNode<any, any>>>([]);
  const [reservedCount, setReservedCount] = useState<number>(0);

  const callback = useRef<PatchRegistrationCallbackFn>();

  const setCallback = useCallback(
    (callbackFn: PatchRegistrationCallbackFn) => (callback.current = callbackFn),
    []
  );

  const register: PatcherRegisterFn = useCallback(
    (patch) => {
      if (
        nodes.map(({ signature }) => signature).find((signature) => signature === patch.signature)
      ) {
        throw new Error("등록된 Patch 중에 동일한 Patch가 존재합니다.");
      }

      if (
        reserved.current
          .map(({ signature }) => signature)
          .find((signature) => signature === patch.signature)
      ) {
        throw new Error("등록이 예약된 Patch 중에 동일한 Patch가 존재합니다.");
      }

      reserved.current = reserved.current.concat({ signature: patch.signature, patch });
      setReservedCount((count) => count + 1);
    },
    [nodes]
  );

  useEffect(() => {
    if (reserved.current.length === 0) return;

    // 예약된 Patch를 등록합니다.
    setNodes((nodes) => nodes.concat([...reserved.current]));
    // 등록 후 이전에 등록된 콜백 함수를 호출합니다.
    if (callback.current) callback.current(reserved.current);
    // 예약 목록을 초기화합니다.
    reserved.current = [];
  }, [reservedCount]);

  return { register, nodes, setCallback };
};

export default usePatchRegistrations;
