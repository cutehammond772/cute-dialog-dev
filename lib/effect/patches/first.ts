import { Patch } from "@cute-dialog/core";
import {
  FirstEvent,
  FirstEventPayload,
  FirstPatchRequest,
  FirstPatchStore,
} from "@effect/types/first";

const First: Patch<FirstPatchStore, FirstPatchRequest> = {
  signature: "@cute-dialog/effect/patch/first",
  onInit: ({ publish }) => {
    publish<FirstEventPayload>({ eventName: FirstEvent.FIRST_INIT, payload: {} });
    return {};
  },
  onRequest: () => ({}),
  onResolve() {},
  onCleanUp() {},
};

export default First;
