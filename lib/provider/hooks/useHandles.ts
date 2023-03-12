import { useReferenceContainer } from "@provider/hooks";

// Dialog의 Ref 객체를 관리하는 Hook입니다.
const useHandles = () => {
  // 실질적인 변경 대상인 Ref 객체를 저장합니다.
  const { register, has, get } = useReferenceContainer<HTMLDivElement>();

  // getHandle의 경우 첫 렌더링 이전에 호출할 시 예외가 발생합니다.
  return { registerHandle: register, hasHandle: has, getHandle: get };
};

export default useHandles;
