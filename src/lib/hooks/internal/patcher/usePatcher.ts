import { useCallback, useContext, useEffect } from "react";
import { IDialogProviderContext } from "@lib/types/context";
import { DialogReferenceKey } from "@lib/types/essential";
import { Patcher, PatchUID } from "@lib/types/patch";

import DialogProviderContext from "@lib/contexts/DialogProviderContext";

import usePatchRegistration from "./usePatchRegistration";
import usePatchStore from "./usePatchStore";
import usePatchRequest from "./usePatchRequest";

const usePatcher = (reference: DialogReferenceKey): Patcher => {
  const provider = useContext<IDialogProviderContext>(DialogProviderContext);

  // Patch를 등록 및 관리합니다.
  const { nodes, register, ...registration } = usePatchRegistration();

  // 각 Patch에서 사용되는 데이터를 담습니다.
  const { stores, ...patchStore } = usePatchStore();

  // Patch 요청을 관리합니다.
  const { request, ...patchRequest } = usePatchRequest();

  // 예약된 Patch를 등록 요청 시 같이 onInit()를 수행하여 Store를 초기화합니다.
  registration.setCallback(
    useCallback(
      (patches) => {
        const handle = provider.getHandle(reference);

        if (!handle) {
          throw new Error("Patch의 onInit() 과정에서 Dialog의 Handle을 가져오지 못했습니다.");
        }

        const initedStores: Record<PatchUID, any> = {};
        patches.forEach(({ uid, patch }) => (initedStores[uid] = patch.onInit({ handle })));

        patchStore.applyAll(initedStores);
      },
      [provider, reference, patchStore]
    )
  );

  // Patch 요청을 받아 onRequest()를 수행합니다.
  patchRequest.setCallback(
    useCallback(
      (patches) => {
        const reducedStores: Record<PatchUID, any> = {};

        // Patch 요청에 대해 onRequest()를 수행합니다.
        nodes.forEach(({ uid, patch }) => {
          patches
            .filter((req) => req.uid === uid)
            .forEach(({ request }) => {
              const store = stores[uid];

              if (!store) {
                throw new Error("초기화되지 않은 Patch에 대해 onRequest() 호출을 시도했습니다.");
              }

              const reducedStore = patch.onRequest({ request, store });

              if (store === reducedStore) {
                throw new Error("Patch 요청에 대해 Store 반환 시 새로운 객체로 반환되어야 합니다.");
              }

              reducedStores[uid] = reducedStore;
            });
        });

        patchStore.applyAll(reducedStores);
      },
      [nodes, stores, patchStore]
    )
  );

  // Mount 또는 Re-render 때 onResolve()를 수행합니다.
  useEffect(() => {
    const handle = provider.getHandle(reference);

    if (!handle) {
      throw new Error("Patch의 onResolve() 과정에서 Dialog의 Handle을 가져오지 못했습니다.");
    }

    // 등록된 Patch 순서대로 onResolve()를 수행합니다.
    nodes.forEach(({ uid, patch }) => {
      const store = stores[uid];

      if (!store) {
        throw new Error("초기화되지 않은 Patch에 대해 onResolve() 호출을 시도했습니다.");
      }

      patch.onResolve({ handle, store });
    });
  }, [provider, reference, nodes, stores]);

  // Unmount 또는 Re-render 전에 onCleanUp()을 수행합니다.
  useEffect(
    () => () => {
      const handle = provider.getHandle(reference);

      if (!handle) {
        throw new Error("Patch의 onCleanUp() 과정에서 Dialog의 Handle을 가져오지 못했습니다.");
      }

      nodes.forEach(({ uid, patch }) => {
        const store = stores[uid];

        if (!store) {
          throw new Error("초기화되지 않은 Patch에 대해 onCleanUp() 호출을 시도했습니다.");
        }

        patch.onCleanUp({ handle, store });
      });
    },
    [provider, reference, nodes, stores]
  );

  return { register, request };
};

export default usePatcher;
