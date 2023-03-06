import { useCallback, useContext, useEffect } from "react";
import { IDialogProviderContext } from "@lib/types/context";
import { DialogReferenceKey } from "@lib/types/essential";
import { Patcher } from "@lib/types/patch/patcher";

import DialogProviderContext from "@lib/contexts/DialogProviderContext";

import usePatchNodes from "./usePatchNodes";
import usePatchStores from "./usePatchStores";
import usePatchRequests from "./usePatchRequests";
import usePatchEvents from "./usePatchEvents";

const usePatcher = (reference: DialogReferenceKey): Patcher => {
  const provider = useContext<IDialogProviderContext>(DialogProviderContext);

  // Patch를 등록 및 관리합니다.
  const { nodes, onPatchRegister, reservePatch } = usePatchNodes();

  // 각 Patch 내부에서 사용하는 Store를 관리합니다.
  const { getStore, applyStore } = usePatchStores();

  // Patch 요청을 관리합니다.
  const { requestPatch, onPatchRequest } = usePatchRequests();

  // Patch Event를 관리합니다.
  const { subscribeEvent, publishEvent, mapEvents, unmapEvents } = usePatchEvents();

  // 예약된 Patch를 등록 요청 시 같이 onInit()를 수행하여 Store를 초기화합니다.
  onPatchRegister(
    useCallback(
      (patches) => {
        const handle = provider.getHandle(reference);

        patches.forEach(({ signature, onInit, events }) => {
          /**
           * useEffect Logic 중에서 Patch에 처음 접근하는 때인 onInit() 호출 시기에
           * Event Mapping을 참조하여 각각의 Event를 Handle에 등록합니다.
           * 이러한 과정이 필요한 이유는, 페이지가 로드되자마자 실행되는 이벤트에 대응하기 위함입니다.
           */
          if (events) mapEvents(signature, events, handle);

          applyStore(
            signature,
            onInit({
              handle,
              publish: publishEvent,
            })
          );
        });
      },
      [provider, reference, applyStore, mapEvents, publishEvent]
    )
  );

  // Patch 요청을 받아 onRequest()를 수행합니다.
  onPatchRequest(
    useCallback(
      (requests) => {
        nodes.forEach(({ signature, onRequest }) => {
          requests
            .filter((req) => req.signature === signature)
            .forEach(({ request }) =>
              applyStore(signature, (store) =>
                onRequest({
                  request,
                  store,
                  publish: publishEvent,
                })
              )
            );
        });
      },
      [nodes, applyStore, publishEvent]
    )
  );

  // Mount 또는 Re-render 때 onResolve()를 수행합니다.
  useEffect(() => {
    const handle = provider.getHandle(reference);

    nodes.forEach(({ signature, onResolve, events }) => {
      const store = getStore(signature);
      if (events) mapEvents(signature, events, handle);

      onResolve({
        handle,
        store,
        publish: publishEvent,
      });
    });
  }, [provider, reference, nodes, getStore, mapEvents, publishEvent]);

  // Unmount 또는 Re-render 전에 onCleanUp()을 수행합니다.
  useEffect(
    () => () => {
      const handle = provider.getHandle(reference);

      nodes.forEach(({ signature, onCleanUp, events }) => {
        const store = getStore(signature);
        if (events) unmapEvents(signature, events, handle);

        onCleanUp({
          handle,
          store,
          publish: publishEvent,
        });
      });
    },
    [provider, reference, nodes, getStore, unmapEvents, publishEvent]
  );

  return {
    reserve: reservePatch,
    request: requestPatch,
    subscribe: subscribeEvent,
  };
};

export default usePatcher;
