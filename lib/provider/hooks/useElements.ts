import { DialogElement } from "@/common";
import { useReferenceContainer } from "@provider/hooks";

/**
 * Dialog Element를 관리함과 동시에 해당 Dialog의 레퍼런스를 관리하는 Hook입니다.
 * 레퍼런스의 존재 여부에 따라, 이 레퍼런스를 이용하는 다른 영역에서 GC가 자동으로 일어납니다.
 */
const useElements = () => {
  const { register, has, get } = useReferenceContainer<DialogElement>();

  // 아직 부가 기능 구현 X

  return { registerElement: register, hasElement: has, getElement: get };
};

export default useElements;
