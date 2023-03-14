import { useCallback } from "react";
import { HandleEventHandler, useDialog, usePatches } from "@cute-dialog/core";

import { AnimationPatchEvent } from "@effect/types/animation";
import Animation from "@effect/patches/animation";

/**
 * Animation Patch를 적용하여 이 Dialog의 Animation Event를 자유자재로 다룰 수 있게 합니다.
 *
 * 단, 이 Hook을 사용하면 자동으로 Patch가 적용되며
 * 이를 원치 않을 경우 매개변수 { autoRegister: false }를 지정하세요.
 */
const useAnimation = (autoRegister = true) => {
  const { subscribe } = useDialog();

  // 자동으로 Patch를 적용합니다.
  usePatches(autoRegister ? [Animation] : []);

  const onAnimationStart: HandleEventHandler = useCallback(
    (callback) => subscribe({ event: AnimationPatchEvent.ANIMATION_START, callback }),
    [subscribe]
  );

  const onAnimationEnd: HandleEventHandler = useCallback(
    (callback) => subscribe({ event: AnimationPatchEvent.ANIMATION_END, callback }),
    [subscribe]
  );

  return { onAnimationStart, onAnimationEnd };
};

export default useAnimation;
