import { PatchUID } from "@lib/types/patch";
import { useCallback, useState } from "react";

const usePatchStore = () => {
  const [stores, setStores] = useState<Record<PatchUID, any>>({});

  // clearStores는 먼저 모든 로직이 완성된 다음에 구현한다.

  const apply = useCallback(<S extends object>(uid: PatchUID, store: S) => {
    setStores((stores) => ({ ...stores, [uid]: store }));
  }, []);

  const applyAll = useCallback((stores: Record<PatchUID, any>) => {
    setStores((currentStores) => ({ ...currentStores, ...stores }));
  }, []);

  return { stores, apply, applyAll };
};

export default usePatchStore;
