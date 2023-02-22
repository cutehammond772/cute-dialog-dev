import { PatchSignature } from "@lib/types/patch";
import { useCallback, useState } from "react";

const usePatchStores = () => {
  const [stores, setStores] = useState<Record<PatchSignature, any>>({});

  // clearStores는 먼저 모든 로직이 완성된 다음에 구현한다.

  const apply = useCallback(<S extends object>(signature: PatchSignature, store: S) => {
    setStores((stores) => ({ ...stores, [signature]: store }));
  }, []);

  const applyAll = useCallback((stores: Record<PatchSignature, any>) => {
    setStores((currentStores) => ({ ...currentStores, ...stores }));
  }, []);

  return { stores, apply, applyAll };
};

export default usePatchStores;
