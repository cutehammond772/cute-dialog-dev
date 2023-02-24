import { Patch } from "@lib/types/patch";

export interface AnimationPatchRequest {}

export interface AnimationPatchStore {}

export const AnimationTimingEvent = {
  ANIMATION_START: "ANIMATION_START",
  ANIMATION_END: "ANIMATION_END",
} as const;

// Note: animationstart, animationend 이벤트 콜백은 언제 호출될까?
export const Animation: Patch<AnimationPatchStore, AnimationPatchRequest> = {
  signature: "@cute/dialog/core/patch/animation",
  events: {
    animationstart: AnimationTimingEvent.ANIMATION_START,
    animationend: AnimationTimingEvent.ANIMATION_END,
  },
  onInit: () => ({}),
  onRequest: () => ({}),
  onResolve() {},
  onCleanUp() {},
};
