import React, { memo } from "react";
import { useDialogProvider } from "@cute-dialog/core";
import { INTRODUCTION } from "@dev/info";

import * as S from "@dev/components/articles/Introduction.style";
import Updates from "@dev/dialogs/updates/Updates";

const UpdateLog = memo(() => {
  const { addDialog } = useDialogProvider();
  return <S.UpdateLog onClick={() => addDialog(Updates)}>✅ 업데이트 로그 확인</S.UpdateLog>;
});

const Introduction = memo(() => (
  <S.Introduction title={INTRODUCTION}>
    <S.Content>
      @cute-dialog 라이브러리에 관심을 주셔서 감사드립니다. <br />
      이 페이지에는 다양한 실험적 기능과 예시가 마련되어 있습니다. <br />
      라이브러리의 최신 기능을 가장 먼저 체험해보세요!
    </S.Content>
    <UpdateLog />
  </S.Introduction>
));

export default Introduction;
