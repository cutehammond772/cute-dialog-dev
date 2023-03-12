import { memo } from "react";
import * as S from "$/Footer.style";

interface FooterProps {
  version: string;
}

interface ItemProps {
  title: string;
  content: string;
}

const Item = memo(({ title, content }: ItemProps) => (
  <S.Item>
    <span className="title">{title}</span>
    <span className="content">{content}</span>
  </S.Item>
));

const Footer = memo(({ version }: FooterProps) => (
  <S.Footer>
    <S.Content>
      <Item title="Based on" content={version} />
      <Item title="Contract" content="cutehammond772@gmail.com" />
    </S.Content>
  </S.Footer>
));

export default Footer;
