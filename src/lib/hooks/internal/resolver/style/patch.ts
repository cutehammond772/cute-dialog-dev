import { Patch } from "@lib/types/patch";

export const StylePatchRequestType = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  RESET: "RESET",
} as const;

export interface StylePatchRequest {
  classNames: Array<string>;
  type: typeof StylePatchRequestType[keyof typeof StylePatchRequestType];
}

export interface StylePatchStore {
  initialClassName: string;
  resolvedClassNames: Array<string>;
}

const StylePatch: Patch<StylePatchStore, StylePatchRequest> = {
  onInit({ handle }) {
    return { initialClassName: handle.className, resolvedClassNames: [] };
  },
  onRequest({ store, request }) {
    const { classNames, type } = request;
    const { resolvedClassNames } = store;

    switch (type) {
      case StylePatchRequestType.ADD:
        const uniqueClassNames = resolvedClassNames.concat(
          classNames.filter(
            (className) => !resolvedClassNames.find((current) => current === className)
          )
        );

        return { ...store, resolvedClassNames: uniqueClassNames };
      case StylePatchRequestType.REMOVE:
        const filteredClassNames = resolvedClassNames.filter(
          (className) => !classNames.find((removal) => removal === className)
        );

        return { ...store, resolvedClassNames: filteredClassNames };
      case StylePatchRequestType.RESET:
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

export default StylePatch;
