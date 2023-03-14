import { Patch } from "@cute-dialog/core";

import {
  AnimationPatchEvent,
  AnimationPatchRequest,
  AnimationPatchStore,
} from "@effect/types/animation";

const Animation: Patch<AnimationPatchStore, AnimationPatchRequest> = {
  signature: "@cute-dialog/effect/patch/animation",
  events: {
    animationstart: AnimationPatchEvent.ANIMATION_START,
    animationend: AnimationPatchEvent.ANIMATION_END,
  },
  onInit: () => ({}),
  onRequest: () => ({}),
  onResolve() {},
  onCleanUp() {},
};

export default Animation;
