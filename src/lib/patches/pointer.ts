import { Patch } from "@lib/types/patch/patcher";

export interface PointerPatchRequest {}

export interface PointerPatchStore {}

export const PointerEvent = {
  HOVER: "HOVER",
  CLICK: "CLICK",
} as const;

export const Pointer: Patch<PointerPatchStore, PointerPatchRequest> = {
  signature: "@cute/dialog/core/patch/pointer",
  events: {
    mouseenter: PointerEvent.HOVER,
    click: PointerEvent.CLICK,
  },
  onInit: () => ({}),
  onRequest: () => ({}),
  onResolve() {},
  onCleanUp() {},
};
