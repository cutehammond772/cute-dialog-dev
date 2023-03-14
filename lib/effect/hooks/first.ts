import { useCallback } from "react";
import { useDialog, usePatches } from "@cute-dialog/core";
import First from "@effect/patches/first";
import { FirstEvent } from "@effect/types/first";

/**
 * First Patch를 적용하여, 이 Dialog가 로드되는 시점을 캐치할 수 있게 합니다.
 *
 * 단, 이 Hook을 사용하면 자동으로 Patch가 적용되며
 * 이를 원치 않을 경우 매개변수 { autoRegister: false }를 지정하세요.
 */
const useFirst = (autoRegister = true) => {
  const { subscribe } = useDialog();

  // 자동으로 Patch를 적용합니다.
  usePatches(autoRegister ? [First] : []);

  const onLoad = useCallback(
    (callback: () => void) => subscribe({ event: FirstEvent.FIRST_INIT, callback }),
    [subscribe]
  );

  return { onLoad };
};

export default useFirst;
