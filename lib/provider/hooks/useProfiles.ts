import { DialogProfile } from "@/common";
import { useReferenceContainer } from "@provider/hooks";

// Dialog의 기본 Profile을 관리하는 Hook입니다.
const useProfiles = () => {
  const { register, has, get } = useReferenceContainer<DialogProfile>();

  // 아직 부가 기능 구현 X

  return { registerProfile: register, hasProfile: has, getProfile: get };
};

export default useProfiles;
