import React from "react";

import { LibrarySelectorProps } from "@dev/dialogs/updates/types";
import * as S from "@dev/dialogs/updates/components/Selector.style";

const Selector = ({ library, onClick, selected, text }: LibrarySelectorProps) => (
  <S.Selector onClick={() => onClick(library)} className={selected ? "selected" : ""}>
    {text}
  </S.Selector>
);

export default Selector;
