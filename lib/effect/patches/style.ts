import { Patch } from "@cute-dialog/core";
import { StylePatchStore, StyleRequest, StyleRequestType } from "@effect/types/style";

const Style: Patch<StylePatchStore, StyleRequest> = {
  signature: "@cute-dialog/effect/patch/style",
  onInit({ handle }) {
    return { initialClassName: handle.className, resolvedClassNames: [] };
  },
  onRequest({ store, request }) {
    const { classNames, type } = request;
    const { resolvedClassNames } = store;

    const uniqueClassNames = resolvedClassNames.concat(
      classNames.filter((className) => !resolvedClassNames.find((current) => current === className))
    );
    const filteredClassNames = resolvedClassNames.filter(
      (className) => !classNames.find((removal) => removal === className)
    );

    switch (type) {
      case StyleRequestType.ADD:
        return { ...store, resolvedClassNames: uniqueClassNames };
      case StyleRequestType.REMOVE:
        return { ...store, resolvedClassNames: filteredClassNames };
      case StyleRequestType.RESET:
        return { ...store, resolvedClassNames: [] };
      default:
        throw new Error("StylePatch의 타입은 ADD, REMOVE, RESET 중 하나여야 합니다.");
    }
  },
  onResolve({ handle, store }) {
    const { initialClassName, resolvedClassNames } = store;
    handle.className = [initialClassName, ...resolvedClassNames].join(" ");
  },
  onCleanUp({ handle, store }) {
    handle.className = store.initialClassName;
  },
};

export default Style;
