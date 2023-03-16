import React, { memo, useContext, useMemo } from "react";

import libs from "@dev/dialogs/updates/libs";
import LibraryContext from "@dev/dialogs/updates/context";
import { Libraries } from "@dev/dialogs/updates/types";

import * as S from "@dev/dialogs/updates/components/Menu.style";
import Selector from "./Selector";

const Menu = memo(() => {
  const context = useContext(LibraryContext);

  const libraries = useMemo(
    () =>
      (Object.keys(libs) as Libraries[]).map((lib) => ({
        lib,
        name: `@cute-dialog/${lib.toLowerCase()}`,
      })),
    []
  );

  return (
    <S.Menu>
      {libraries.map(({ lib, name }) => (
        <Selector
          key={lib}
          library={lib}
          selected={context?.current === lib}
          text={name}
          onClick={context?.setCurrent ?? (() => {})}
        />
      ))}
    </S.Menu>
  );
});

export default Menu;
