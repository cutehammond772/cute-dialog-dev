import { useEffect } from "react";
import { Patch } from "@core/patch/patcher";
import { useDialog } from "@core/resolver/hooks";

const usePatches = (patches: Array<Patch<any, any>>) => {
  const { has, reserve } = useDialog();

  useEffect(() => {
    // 아직 등록되지 않거나 예약 상태가 아닌 Patch를 예약합니다.
    patches.filter(({ signature }) => !has(signature)).forEach(reserve);
  }, [has, reserve, patches]);
};

export default usePatches;
