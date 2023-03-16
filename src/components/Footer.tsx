import React, { memo } from "react";
import * as S from "@dev/components/Footer.style";

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

const Footer = memo(() => (
  <S.Footer>
    <S.Content>
      <Item title="Contract" content="cutehammond772@gmail.com" />
    </S.Content>
  </S.Footer>
));

export default Footer;
