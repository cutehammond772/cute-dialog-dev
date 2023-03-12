import { useCallback, useEffect, useRef, useState } from "react";
import { PatchSignature } from "@/patch/common";
import { Patch, PatchRegisterCallback } from "@/patch/patcher";

const usePatchNodes = () => {
  const [nodes, setNodes] = useState<Array<Patch<any, any>>>([]);
  const [reservations, setReservations] = useState<Array<Patch<any, any>>>([]);

  const signatures = useRef<Set<PatchSignature>>(new Set());
  const callback = useRef<PatchRegisterCallback>(() => {});

  /**
   * Patch를 예약합니다.
   */
  const reservePatch = useCallback((patch: Patch<any, any>) => {
    if (signatures.current.has(patch.signature)) {
      throw new Error(`Patch '${patch.signature}'는 이미 등록 또는 예약된 상태입니다.`);
    }

    setReservations((rvs) => rvs.concat(patch));

    // 예약된 Patch의 Signature를 저장합니다.
    signatures.current = signatures.current.add(patch.signature);
  }, []);

  /**
   * Patch를 등록할 때 호출되는 콜백을 설정합니다.
   *
   * 이 함수는 컴포넌트의 Top-Level에서만 호출해야 합니다.
   */
  const onPatchRegister = useCallback((callbackFn: PatchRegisterCallback) => {
    callback.current = callbackFn;
  }, []);

  useEffect(() => {
    if (reservations.length === 0) return;

    // 예약된 Patch를 등록 요청합니다.
    setNodes((registeredNodes) => registeredNodes.concat(reservations));
    // 예약된 Patch에 대해 콜백을 호출합니다.
    callback.current(reservations);
    // 등록 요청된 Patch 목록만 삭제합니다.
    setReservations((rvs) => rvs.slice(reservations.length));
  }, [reservations]);

  return { reservePatch, onPatchRegister, nodes };
};

export default usePatchNodes;
