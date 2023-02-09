import { DialogIDRef, DialogProfile } from "@lib/types/essential";
import { useRef, useCallback } from "react";

const useDialogProfile = () => {
  const profiles = useRef<WeakMap<DialogIDRef, DialogProfile>>(new WeakMap());

  const register = useCallback((reference: DialogIDRef, profile: DialogProfile) => {
    if (profiles.current.has(reference)) {
      throw new Error();
    }

    profiles.current.set(reference, profile);
    return profile;
  }, []);

  const get = useCallback((reference: DialogIDRef) => {
    return profiles.current.get(reference);
  }, []);

  return { register, get };
};

export default useDialogProfile;