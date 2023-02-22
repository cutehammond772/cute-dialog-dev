import { Patch } from "@lib/types/patch";

export interface AnimationPatchRequest {}

export interface AnimationPatchStore {}

export const AnimationTimingEvent = {
  ANIMATION_START: "ANIMATION_START",
  ANIMATION_END: "ANIMATION_END",
} as const;

const startHandler = (emit: (event: string) => void) => () => emit(AnimationTimingEvent.ANIMATION_START);
const endHandler = (emit: (event: string) => void) => () => emit(AnimationTimingEvent.ANIMATION_END);

// Note: animationstart, animationend 이벤트 콜백은 언제 호출될까?
// Note: animationstart 이벤트가 간헐적으로 발생되지 않는 이슈 있음.
export const Animation: Patch<AnimationPatchStore, AnimationPatchRequest> = {
  signature: "@cute/dialog/core/patch/animation",
  onInit: () => ({}),
  onRequest: () => ({}),
  onResolve({ handle, emit, callback }) {
    handle.addEventListener("animationstart", callback("animationstart", startHandler(emit)));
    handle.addEventListener("animationend", callback("animationend", endHandler(emit)));
  },
  onCleanUp({ handle, callback }) {
    handle.removeEventListener("animationstart", callback("animationstart"));
    handle.removeEventListener("animationend", callback("animationend"));
  },
};
