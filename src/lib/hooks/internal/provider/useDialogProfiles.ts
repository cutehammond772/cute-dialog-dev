import { DialogReferenceKey, DialogProfile } from "@lib/types/essential";
import { useRef, useCallback } from "react";

// Dialog의 기본 Profile을 관리하는 Hook입니다.
const useDialogProfiles = () => {
  const profiles = useRef<WeakMap<DialogReferenceKey, DialogProfile>>(new WeakMap());

  // Dialog의 레퍼런스를 키로 하여 기본 Profile을 저장합니다.
  const register = useCallback((reference: DialogReferenceKey, profile: DialogProfile) => {
    if (profiles.current.has(reference)) {
      throw new Error();
    }

    profiles.current.set(reference, profile);
    return profile;
  }, []);

  // Dialog의 레퍼런스를 통해 기본 Profile을 가져옵니다.
  const get = useCallback((reference: DialogReferenceKey) => {
    return profiles.current.get(reference);
  }, []);

  return { register, get };
};

export default useDialogProfiles;