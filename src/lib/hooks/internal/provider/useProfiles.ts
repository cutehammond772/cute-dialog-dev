import { DialogProfile } from "@lib/types/essential";
import { useReferenceContainer } from "@lib/hooks";

// Dialog의 기본 Profile을 관리하는 Hook입니다.
const useDialogProfiles = () => {
  const { register, has, get } = useReferenceContainer<DialogProfile>();

  // 아직 부가 기능 구현 X

  return { register, has, get };
};

export default useDialogProfiles;