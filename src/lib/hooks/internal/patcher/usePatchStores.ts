import { PatchSignature } from "@lib/types/patch";
import { useCallback, useState } from "react";

const usePatchStores = () => {
  const [stores, setStores] = useState<Record<PatchSignature, any>>({});

  // clearStores는 먼저 모든 로직이 완성된 다음에 구현한다.

  const applyStore = useCallback(<S extends object>(signature: PatchSignature, store: S) => {
    setStores((stores) => ({ ...stores, [signature]: store }));
  }, []);

  return { stores, applyStore };
};

export default usePatchStores;
