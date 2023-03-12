import { useCallback, useState } from "react";
import { PatchSignature } from "@/patch/common";

const usePatchStores = () => {
  const [stores, setStores] = useState<Record<PatchSignature, any>>({});

  const getStore = useCallback(
    <S extends object>(signature: PatchSignature): S => {
      const store = stores[signature];

      if (!store) {
        throw new Error(`[signature: ${signature}]에 대한 기존 store가 존재하지 않습니다.`);
      }

      return store;
    },
    [stores]
  );

  /**
   * Patch 내부에서 사용하는 Store의 값을 변경합니다.
   */
  const applyStore = useCallback(
    <S extends object>(signature: PatchSignature, apply: ((store: S) => S) | S) => {
      let store;
      const reducedStore =
        typeof apply === "object" ? apply : apply((store = getStore<S>(signature)));

      if (store === reducedStore) {
        throw new Error(
          "applyToStore()에서 apply 전과 후의 store 객체는 다른 Reference를 가져야 합니다."
        );
      }

      setStores((curStores) => ({ ...curStores, [signature]: reducedStore }));
    },
    [getStore]
  );

  return { getStore, applyStore };
};

export default usePatchStores;
