import { PatcherRequestFn, PatchRequest, PatchRequestCallbackFn } from "@lib/types/patch";
import { useCallback, useEffect, useRef, useState } from "react";

const usePatchRequest = () => {
  const requests = useRef<Array<PatchRequest<any>>>([]);

  // Patch 요청 시 카운트가 증가합니다. Re-render 요청을 위해 사용됩니다.
  const [requestCount, setRequestCount] = useState<number>(0);

  const callback = useRef<PatchRequestCallbackFn>();

  const setCallback = useCallback(
    (callbackFn: PatchRequestCallbackFn) => (callback.current = callbackFn),
    []
  );

  // 요청을 수행할 때, 등록되지 않은 Patch로 요청 시 무시됩니다.
  const request: PatcherRequestFn = useCallback((uid, request) => {
    requests.current = requests.current.concat({ uid, request });
    setRequestCount((count) => count + 1);
  }, []);

  useEffect(() => {
    if (requests.current.length === 0) return;
    // 요청에 대한 정보를 콜백 함수로 넘겨 처리합니다.
    if (callback.current) callback.current(requests.current);

    // 요청 목록을 초기화합니다.
    requests.current = [];
  }, [requestCount]);

  return { request, setCallback };
};

export default usePatchRequest;
