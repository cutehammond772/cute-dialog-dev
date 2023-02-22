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
  addedClassNames: Array<string>;
}

const StylePatch: Patch<StylePatchStore, StylePatchRequest> = {
  onInit({ handle }) {
    return { initialClassName: handle.className, addedClassNames: [] };
  },
  onResolve({ handle, request, store }) {
    const { classNames, type } = request;
    const { initialClassName, addedClassNames } = store;

    if (type === StylePatchRequestType.ADD) {
      const uniqueClassNames = addedClassNames.concat(
        classNames.filter((className) => !addedClassNames.find((current) => current === className))
      );

      handle.className = `${initialClassName} ${uniqueClassNames.join(" ")}`;
      return { ...store, addedClassNames: uniqueClassNames };
    }

    if (type === StylePatchRequestType.REMOVE) {
      const filteredClassNames = addedClassNames.filter(
        (className) => !classNames.find((removal) => removal === className)
      );

      handle.className = `${initialClassName} ${filteredClassNames.join(" ")}`;
      return { ...store, addedClassNames: filteredClassNames };
    }

    if (type === StylePatchRequestType.RESET) {
      handle.className = initialClassName;
      return { ...store, addedClassNames: [] };
    }

    throw new Error("StylePatch의 타입은 ADD, REMOVE, RESET 중 하나여야 합니다.");
  },
  onCleanUp({ handle, store }) {
    handle.className = store.initialClassName;
  },
};

export default StylePatch;
