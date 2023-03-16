import React, { memo } from "react";
import LibraryContext from "@dev/dialogs/updates/context";
import { Libraries } from "@dev/dialogs/updates/types";
import libs from "@dev/dialogs/updates/libs";

import * as S from "@dev/dialogs/updates/components/Logs.style";
import Log from "@dev/dialogs/updates/components/Log";

const Fallback = memo(() => (
  <S.Fallback>위의 라이브러리를 선택하여 업데이트 기록을 확인하세요.</S.Fallback>
));

const MemoizedLogs = memo(({ library }: { library: Libraries }) => (
  <S.Logs>
    {libs[library].map(({ version, contents, contentKey }) => (
      <Log contentKey={contentKey} key={contentKey} version={version} contents={contents} />
    ))}
  </S.Logs>
));

const Logs = memo(() => (
  <LibraryContext.Consumer>
    {(value) => (value?.current ? <MemoizedLogs library={value.current} /> : <Fallback />)}
  </LibraryContext.Consumer>
));

export default Logs;
