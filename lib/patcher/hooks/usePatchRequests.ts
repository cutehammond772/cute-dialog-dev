import { useCallback, useEffect, useRef, useState } from "react";
import { PatchRequest, PatchRequestCallback } from "@/patch/patcher";

const usePatchRequests = () => {
  const [requests, setRequests] = useState<Array<PatchRequest<any>>>([]);

  const callback = useRef<PatchRequestCallback>(() => {});

  const onPatchRequest = useCallback((callbackFn: PatchRequestCallback) => {
    callback.current = callbackFn;
  }, []);

  const requestPatch = useCallback(<R extends object>({ signature, request }: PatchRequest<R>) => {
    setRequests((rqs) => rqs.concat({ signature, request }));
  }, []);

  useEffect(() => {
    if (requests.length === 0) return;

    // 요청에 대한 정보를 콜백 함수로 넘겨 처리합니다.
    callback.current(requests);

    // 수행된 요청 목록만 삭제합니다.
    setRequests((rqs) => rqs.slice(requests.length));
  }, [requests]);

  return { requestPatch, onPatchRequest };
};

export default usePatchRequests;
