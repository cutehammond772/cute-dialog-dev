import { useCallback } from "react";
import { useDialog } from "@lib/hooks";
import { AnimationTimingEvent } from "@lib/patches/animation";
import { HandleEventHandler } from "@lib/types/patch";

const useAnimation = () => {
  const { subscribe } = useDialog();

  const onAnimationStart: HandleEventHandler = useCallback(
    (callback) => subscribe(AnimationTimingEvent.ANIMATION_START, callback),
    [subscribe]
  );

  const onAnimationEnd: HandleEventHandler = useCallback(
    (callback) => subscribe(AnimationTimingEvent.ANIMATION_END, callback),
    [subscribe]
  );

  return { onAnimationStart, onAnimationEnd };
};

export default useAnimation;
