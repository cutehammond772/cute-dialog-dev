import { PatcherRegisterFn, PatchNode, PatchRegistrationCallbackFn } from "@lib/types/patch";
import { createPatchUID } from "@lib/utils/creator";
import { useCallback, useEffect, useRef, useState } from "react";

const usePatchRegistration = () => {
  const [nodes, setNodes] = useState<Array<PatchNode<any, any>>>([]);

  const reserved = useRef<Array<PatchNode<any, any>>>([]);
  const [reservedCount, setReservedCount] = useState<number>(0);

  const callback = useRef<PatchRegistrationCallbackFn>();

  const setCallback = useCallback(
    (callbackFn: PatchRegistrationCallbackFn) => (callback.current = callbackFn),
    []
  );

  const register: PatcherRegisterFn = useCallback((patch) => {
    const uid = createPatchUID();

    reserved.current = reserved.current.concat({ uid, patch });
    setReservedCount((count) => count + 1);
    return uid;
  }, []);

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

export default usePatchRegistration;
