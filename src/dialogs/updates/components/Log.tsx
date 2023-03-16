import React, { memo } from "react";
import { ContentProps, isKeySpecificLog, LibraryLog } from "@dev/dialogs/updates/types";

import * as S from "@dev/dialogs/updates/components/Log.style";

const RecursiveLogs = ({ contentKey, contents }: ContentProps) => (
  <ul key={contentKey}>
    {contents.map((log) => {
      const { key, title } = log;

      if (isKeySpecificLog(log)) {
        // Specific Log인 경우
        return (
          <React.Fragment key={key}>
            <li>{title}</li>
            <RecursiveLogs contentKey={log.contentKey} contents={log.contents} />
          </React.Fragment>
        );
      }

      // Default Log인 경우
      return <li key={key}>{title}</li>;
    })}
  </ul>
);

const Log = memo(({ contentKey, version, contents }: LibraryLog) => (
  <S.Log>
    <S.Version>{version}</S.Version>
    <S.Content>
      <RecursiveLogs contentKey={contentKey} contents={contents} />
    </S.Content>
  </S.Log>
));

export default Log;
