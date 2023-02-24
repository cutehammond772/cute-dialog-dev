import { useCallback, useContext, useEffect } from "react";
import { IDialogProviderContext } from "@lib/types/context";
import { DialogReferenceKey } from "@lib/types/essential";
import { Patcher } from "@lib/types/patch";

import DialogProviderContext from "@lib/contexts/DialogProviderContext";

import usePatchNodes from "./usePatchNodes";
import usePatchStores from "./usePatchStores";
import usePatchRequests from "./usePatchRequests";
import usePatchEvents from "./usePatchEvents";

const usePatcher = (reference: DialogReferenceKey): Patcher => {
  const provider = useContext<IDialogProviderContext>(DialogProviderContext);

  // Patch를 등록 및 관리합니다.
  const { nodes, onPatchRegister, reservePatch } = usePatchNodes();

  // 각 Patch에서 사용되는 데이터를 담습니다.
  const { stores, applyStore } = usePatchStores();

  // Patch 요청을 관리합니다.
  const { requestPatch, onPatchRequest } = usePatchRequests();

  // Patch Event를 관리합니다.
  const { subscribeEvent, publishEvent, memoCallback } = usePatchEvents();

  // 예약된 Patch를 등록 요청 시 같이 onInit()를 수행하여 Store를 초기화합니다.
  onPatchRegister(
    useCallback(
      (patches) => {
        const handle = provider.getHandle(reference);

        if (!handle) {
          throw new Error("Patch의 onInit() 과정에서 Dialog의 Handle을 가져오지 못했습니다.");
        }

        patches
          .map(({ signature, onInit, events }) => {
            /**
             * useEffect Logic 중에서 Patch에 처음 접근하는 때인 onInit() 호출 시기에
             * Event Mapping을 참조하여 각각의 Event를 Handle에 등록합니다.
             * 이러한 과정이 필요한 이유는, 페이지가 로드되자마자 실행되는 이벤트에 대응하기 위함입니다.
             */
            if (events) {
              Object.keys(events).forEach((event) =>
                handle.addEventListener(
                  event,
                  memoCallback(signature, event, () => publishEvent(events[event]))
                )
              );
            }

            return {
              signature,
              store: onInit({
                handle,
                publish: publishEvent,
              }),
            };
          })
          .forEach(({ signature, store }) => applyStore(signature, store));
      },
      [provider, reference, applyStore, memoCallback, publishEvent]
    )
  );

  // Patch 요청을 받아 onRequest()를 수행합니다.
  onPatchRequest(
    useCallback(
      (requests) => {
        nodes.forEach(({ signature, onRequest }) => {
          requests
            .filter((req) => req.signature === signature)
            .forEach(({ request }) => {
              const store = stores[signature];

              if (!store) {
                throw new Error("초기화되지 않은 Patch에 대해 onRequest() 호출을 시도했습니다.");
              }

              const reducedStore = onRequest({
                request,
                store,
                publish: publishEvent,
              });

              if (store === reducedStore) {
                throw new Error("Patch 요청에 대해 Store 반환 시 새로운 객체로 반환되어야 합니다.");
              }

              applyStore(signature, reducedStore);
            });
        });
      },
      [nodes, stores, applyStore, publishEvent]
    )
  );

  // Mount 또는 Re-render 때 onResolve()를 수행합니다.
  useEffect(() => {
    const handle = provider.getHandle(reference);

    if (!handle) {
      throw new Error("Patch의 onResolve() 과정에서 Dialog의 Handle을 가져오지 못했습니다.");
    }

    nodes.forEach(({ signature, onResolve, events }) => {
      const store = stores[signature];

      if (!store) {
        throw new Error("초기화되지 않은 Patch에 대해 onResolve() 호출을 시도했습니다.");
      }

      if (events) {
        Object.keys(events).forEach((event) => {
          if (memoCallback(signature, event)) {
            // onInit()에 등록된 Event Listener를 제거합니다.
            handle.removeEventListener(event, memoCallback(signature, event));
          }

          handle.addEventListener(
            event,
            memoCallback(signature, event, () => publishEvent(events[event]))
          );
        });
      }

      onResolve({
        handle,
        store,
        publish: publishEvent,
      });
    });
  }, [provider, reference, nodes, stores, memoCallback, publishEvent]);

  // Unmount 또는 Re-render 전에 onCleanUp()을 수행합니다.
  useEffect(
    () => () => {
      const handle = provider.getHandle(reference);

      if (!handle) {
        throw new Error("Patch의 onCleanUp() 과정에서 Dialog의 Handle을 가져오지 못했습니다.");
      }

      nodes.forEach(({ signature, onCleanUp, events }) => {
        const store = stores[signature];

        if (!store) {
          throw new Error("초기화되지 않은 Patch에 대해 onCleanUp() 호출을 시도했습니다.");
        }

        if (events) {
          Object.keys(events).forEach((event) =>
            handle.removeEventListener(event, memoCallback(signature, event))
          );
        }

        onCleanUp({
          handle,
          store,
          publish: publishEvent,
        });
      });
    },
    [provider, reference, nodes, stores, memoCallback, publishEvent]
  );

  return { reserve: reservePatch, request: requestPatch, subscribe: subscribeEvent };
};

export default usePatcher;
