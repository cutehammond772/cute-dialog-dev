import { useCallback, useContext, useEffect } from "react";
import { IDialogProviderContext } from "@lib/types/context";
import { DialogReferenceKey } from "@lib/types/essential";
import { Patcher, PatchSignature } from "@lib/types/patch";

import DialogProviderContext from "@lib/contexts/DialogProviderContext";

import usePatchRegistrations from "./usePatchRegistrations";
import usePatchStores from "./usePatchStores";
import usePatchRequests from "./usePatchRequests";
import usePatchEvents from "./usePatchEvents";

const usePatcher = (reference: DialogReferenceKey): Patcher => {
  const provider = useContext<IDialogProviderContext>(DialogProviderContext);

  // Patch를 등록 및 관리합니다.
  const { nodes, register, ...patchRegistration } = usePatchRegistrations();

  // 각 Patch에서 사용되는 데이터를 담습니다.
  const { stores, ...patchStore } = usePatchStores();

  // Patch 요청을 관리합니다.
  const { request, ...patchRequest } = usePatchRequests();

  // Patch Event를 관리합니다.
  const { receive, ...patchEvent } = usePatchEvents();

  // 예약된 Patch를 등록 요청 시 같이 onInit()를 수행하여 Store를 초기화합니다.
  patchRegistration.setCallback(
    useCallback(
      (patches) => {
        const handle = provider.getHandle(reference);

        if (!handle) {
          throw new Error("Patch의 onInit() 과정에서 Dialog의 Handle을 가져오지 못했습니다.");
        }

        const initedStores: Record<PatchSignature, any> = {};
        patches.forEach(
          ({ signature, patch }) =>
            (initedStores[signature] = patch.onInit({
              handle,
              emit: patchEvent.emit,
              callback: <T>(name: string, callback?: T) =>
                patchEvent.callback(signature, name, callback),
            }))
        );

        patchStore.applyAll(initedStores);
      },
      [provider, reference, patchStore, patchEvent]
    )
  );

  // Patch 요청을 받아 onRequest()를 수행합니다.
  patchRequest.setCallback(
    useCallback(
      (patches) => {
        const reducedStores: Record<PatchSignature, any> = {};

        nodes.forEach(({ signature, patch }) => {
          patches
            .filter((req) => req.signature === signature)
            .forEach(({ request }) => {
              const store = stores[signature];

              if (!store) {
                throw new Error("초기화되지 않은 Patch에 대해 onRequest() 호출을 시도했습니다.");
              }

              const reducedStore = patch.onRequest({
                request,
                store,
                emit: patchEvent.emit,
                callback: <T>(name: string, callback?: T) =>
                  patchEvent.callback(signature, name, callback),
              });

              if (store === reducedStore) {
                throw new Error("Patch 요청에 대해 Store 반환 시 새로운 객체로 반환되어야 합니다.");
              }

              reducedStores[signature] = reducedStore;
            });
        });

        patchStore.applyAll(reducedStores);
      },
      [nodes, stores, patchStore, patchEvent]
    )
  );

  // Mount 또는 Re-render 때 onResolve()를 수행합니다.
  useEffect(() => {
    const handle = provider.getHandle(reference);

    if (!handle) {
      throw new Error("Patch의 onResolve() 과정에서 Dialog의 Handle을 가져오지 못했습니다.");
    }

    nodes.forEach(({ signature, patch }) => {
      const store = stores[signature];

      if (!store) {
        throw new Error("초기화되지 않은 Patch에 대해 onResolve() 호출을 시도했습니다.");
      }

      patch.onResolve({
        handle,
        store,
        emit: patchEvent.emit,
        callback: <T>(name: string, callback?: T) => patchEvent.callback(signature, name, callback),
      });
    });
  }, [provider, reference, nodes, stores, patchEvent]);

  // Unmount 또는 Re-render 전에 onCleanUp()을 수행합니다.
  useEffect(
    () => () => {
      const handle = provider.getHandle(reference);

      if (!handle) {
        throw new Error("Patch의 onCleanUp() 과정에서 Dialog의 Handle을 가져오지 못했습니다.");
      }

      nodes.forEach(({ signature, patch }) => {
        const store = stores[signature];

        if (!store) {
          throw new Error("초기화되지 않은 Patch에 대해 onCleanUp() 호출을 시도했습니다.");
        }

        patch.onCleanUp({
          handle,
          store,
          emit: patchEvent.emit,
          callback: <T>(name: string, callback?: T) =>
            patchEvent.callback(signature, name, callback),
        });
      });
    },
    [provider, reference, nodes, stores, patchEvent]
  );

  return { register, request, receive };
};

export default usePatcher;
