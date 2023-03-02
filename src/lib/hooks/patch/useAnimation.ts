import { useCallback } from "react";
import { useDialog } from "@lib/hooks";
import { AnimationTimingEvent } from "@lib/patches/animation";

const useAnimation = () => {
  const { subscribe } = useDialog();

  const onAnimationStart = useCallback((callbackFn: () => void) => {
    subscribe(AnimationTimingEvent.ANIMATION_START, callbackFn);
  }, [subscribe]);

  const onAnimationEnd = useCallback((callbackFn: () => void) => {
    subscribe(AnimationTimingEvent.ANIMATION_END, callbackFn);
  }, [subscribe]);

  return { onAnimationStart, onAnimationEnd };
};

export default useAnimation;