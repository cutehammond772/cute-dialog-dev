import { memo } from "react";
import * as S from "$/Header.style";

interface HeaderProps {
  version: string;
  items: Array<string>;
}

const GitHub = memo(() => (
  <S.GitHub href="https://github.com/cutehammond772/cute-dialog-dev">GitHub</S.GitHub>
));

const Header = memo(({ version, items }: HeaderProps) => (
  <S.Header>
    <S.Content>
      <S.Title>
        <span className="main">@cute/dialog</span>
        <span className="version">{version}-DEV</span>
      </S.Title>
      <S.Menu>
        {items.map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`}>{item}</a>
          </li>
        ))}
        <li>
          <GitHub />
        </li>
      </S.Menu>
    </S.Content>
  </S.Header>
));

export default Header;
