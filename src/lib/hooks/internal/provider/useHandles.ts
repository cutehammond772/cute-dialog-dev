import { useReferenceContainer } from "@lib/hooks";
import { DialogReferenceKey } from "@lib/types/essential";
import { useCallback } from "react";

// Dialog의 Ref 객체를 관리하는 Hook입니다.
const useHandles = () => {
  // 실질적인 변경 대상인 Ref 객체를 저장합니다.
  const handles = useReferenceContainer<HTMLDivElement>();

  const get = useCallback((reference: DialogReferenceKey) => {
    // handle은 컴포넌트가 렌더링하는 과정에서 생성되므로 nullable을 허용합니다.
    return handles.has(reference) ? handles.get(reference) : undefined;
  }, [handles]);

  return { register: handles.register, has: handles.has, get };
};

export default useHandles;