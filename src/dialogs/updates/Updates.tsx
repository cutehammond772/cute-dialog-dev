import React, { memo, useState } from "react";
import { useModal, createModal } from "@cute-dialog/modal";

import { Libraries } from "@dev/dialogs/updates/types";
import LibraryContext from "@dev/dialogs/updates/context";

import * as S from "@dev/dialogs/updates/Updates.style";
import * as Library from "@dev/dialogs/updates/components";

const Component = memo(() => {
  const { close } = useModal();
  const [current, setCurrent] = useState<Libraries>();

  return (
    <LibraryContext.Provider value={{ current, setCurrent }}>
      <S.Body>
        <S.Area>
          <S.Header>
            <S.Title>Update Logs</S.Title>
            <S.Close onClick={close}>Close</S.Close>
            <Library.Menu />
          </S.Header>
          <Library.Logs />
        </S.Area>
      </S.Body>
    </LibraryContext.Provider>
  );
});

export default createModal({ Component });
