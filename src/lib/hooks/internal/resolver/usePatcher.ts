import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { IDialogProviderContext } from "@lib/types/context";
import { DialogReferenceKey } from "@lib/types/essential";
import {
  Patcher,
  PatcherRegisterFn,
  PatcherRequestFn,
  PatchNode,
  PatchRequest,
  PatchUID,
} from "@lib/types/patch";
import { createPatchUID } from "@lib/utils/creator";

import DialogProviderContext from "@lib/contexts/DialogProviderContext";

const usePatcher = (reference: DialogReferenceKey): Patcher => {
  const provider = useContext<IDialogProviderContext>(DialogProviderContext);

  // 등록된 Patch의 목록입니다. 등록된 순서대로 Patch됩니다.
  const [nodes, setNodes] = useState<Array<PatchNode<any, any>>>([]);

  // 각 Patch의 데이터를 담는 store입니다.
  const stores = useRef<Record<PatchUID, any>>({});

  // 특정 Patch에 대한 요청 목록입니다. 한 번의 렌더링 과정에서 모두 처리됩니다.
  const requests = useRef<Array<PatchRequest<any>>>([]);

  // Patch 요청 시 카운트가 1씩 증가합니다. 리렌더 요청을 위해 사용됩니다.
  const [count, setCount] = useState<number>(0);

  const register: PatcherRegisterFn = useCallback((patch) => {
    const uid = createPatchUID();
    setNodes((nodes) => nodes.concat({ uid, patch }));
    return uid;
  }, []);

  const request: PatcherRequestFn = useCallback((uid, request) => {
    requests.current = requests.current.concat({ uid, request });
    setCount((count) => count + 1);
  }, []);

  // 마운트 또는 리렌더링 때 수행
  useEffect(() => {
    const handle = provider.getHandle(reference);

    if (!handle) {
      throw new Error("마운트 또는 리렌더 후 Dialog의 Handle을 가져오지 못했습니다.");
    }

    // Patch가 초기화되지 않은 경우 먼저 onInit()를 수행하여 초기화합니다.
    nodes.forEach(({ uid, patch }) => {
      if (!stores.current[uid]) {
        stores.current[uid] = patch.onInit({ handle });
      }
    });

    // 특정 Patch에 대한 요청에 대해 onResolve()를 수행합니다.
    nodes.forEach(({ uid, patch }) => {
      requests.current
        .filter((req) => req.uid === uid)
        .forEach(({ request }) => {
          const currentStore = stores.current[uid];

          if (!currentStore) {
            throw new Error("초기화되지 않은 Patch에 대해 onResolve() 호출을 시도했습니다.");
          }

          const store = patch.onResolve({ handle, request, store: currentStore });

          if (store instanceof Object) {
            if (currentStore === store) {
              throw new Error("onResolve()에서 store 반환 시 immutable한 객체여야 합니다.");
            }

            // 새로운 store 객체를 저장합니다.
            stores.current[uid] = store;
          }
        });
    });

    requests.current = [];
  }, [provider, reference, nodes, count]);

  // 언마운트 또는 리렌더링 전에 수행
  useEffect(
    () => () => {
      const handle = provider.getHandle(reference);

      if (!handle) {
        throw new Error("언마운트 또는 리렌더 전 Dialog의 Handle을 가져오지 못했습니다.");
      }

      nodes.forEach(({ uid, patch }) => {
        const currentStore = stores.current[uid];

        if (!currentStore) {
          throw new Error("초기화되지 않은 Patch에 대해 onCleanUp() 호출을 시도했습니다.");
        }

        patch.onCleanUp({ handle, store: currentStore });
      });
    },
    [provider, reference, nodes, count]
  );

  return { register, request };
};

export default usePatcher;
