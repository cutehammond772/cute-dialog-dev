import React, { memo } from "react";
import * as S from "@dev/components/Header.style";

interface HeaderProps {
  items: Array<string>;
}

const GitHub = memo(() => (
  <S.GitHub href="https://github.com/cutehammond772/cute-dialog-dev">GitHub</S.GitHub>
));

const Header = memo(({ items }: HeaderProps) => (
  <S.Header>
    <S.Title>
      <span className="main">@cute-dialog</span>
      <span className="version">DEV</span>
    </S.Title>
    <S.Menu>
      {items.map((item) => (
        <a href={`#${item.toLowerCase()}`} key={item}>
          {item}
        </a>
      ))}
      <GitHub />
    </S.Menu>
  </S.Header>
));

export default Header;
