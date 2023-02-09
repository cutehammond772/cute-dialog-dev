import { DialogIDRef, DialogProfile } from "@lib/types/essential";
import { useRef, useCallback } from "react";

// Dialog의 기본 Profile 객체를 관리하는 Hook입니다.
const useDialogProfiles = () => {
  const profiles = useRef<WeakMap<DialogIDRef, DialogProfile>>(new WeakMap());

  // Dialog의 레퍼런스를 키로 하여 Profile 객체를 저장합니다.
  const register = useCallback((reference: DialogIDRef, profile: DialogProfile) => {
    if (profiles.current.has(reference)) {
      // 이미 저장된 경우 오류가 발생합니다.
      throw new Error();
    }

    profiles.current.set(reference, profile);
    return profile;
  }, []);

  // Dialog의 레퍼런스를 통해 Profile 객체를 가져옵니다.
  const get = useCallback((reference: DialogIDRef) => {
    return profiles.current.get(reference);
  }, []);

  return { register, get };
};

export default useDialogProfiles;